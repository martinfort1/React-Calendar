import { configureStore } from "@reduxjs/toolkit";
import { act, renderHook, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { useAuthStore } from "../../src/hooks";
import { initialState, notAuthenticatedState } from "../fixtures/authStates";
import { authSlice } from "../../src/store";
import { testUserCredentials } from "../fixtures/testUser";
import { calendarApi } from "../../src/api";

describe('Pruebas en useAuthStore', () => { 

    beforeEach(() => {
        localStorage.clear();
    });

    const getMockStore = ( initialState ) => {
        return configureStore({

            reducer: {
                auth: authSlice.reducer
            },
            preloadedState: {
                auth: { ...initialState }
            }
        })
    }
    
    test('debe de regresar los valores por defecto', () => { 
        
        const mockStore = getMockStore({ ...initialState });

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        })

        expect(result.current).toEqual({
            status: 'checking',
            user: {},
            errorMessage: undefined,
            startLogin: expect.any(Function),
            startRegister: expect.any(Function),
            checkAuthToken: expect.any(Function),
            startLogout: expect.any(Function)
          });
        });

    test('startLogin debe de realizar el login correctamente', async () => { 
        
        const mockStore = getMockStore({ ...notAuthenticatedState });

        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        })

        await act( async() => {
            await result.current.startLogin( testUserCredentials );
        })

        const { errorMessage, status, user } = result.current;
        expect( {errorMessage, status, user} ).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'Test User', uid: '67d83a685ee93b60a58d5361' }
        })

        expect( localStorage.getItem('token') ).toEqual( expect.any(String) );
        expect( localStorage.getItem('token-init-date') ).toEqual( expect.any(String) );

    });

    test('startLogin debe de fallar la autenticación', async() => { 

        const mockStore = getMockStore({ ...notAuthenticatedState });

        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        })

        await act( async () => {
            await result.current.startLogin({ email: 'novalido@google.com', password: '123456' });
        });

        const { errorMessage, status, user } = result.current;
        expect( localStorage.getItem('token') ).toBeNull();
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: 'Credenciales incorrectas' || expect.any(String),
            status: 'not-authenticated',
            user: {}
        });

        await waitFor(
            () => expect( result.current.errorMessage ).toBe( undefined )
        );
     });

    test('startRegister debe de crear un usuario', async() => { 
        
        const newUser = { email: '', password: '123456', name: 'Test User' };
        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        })

        const spy = jest.spyOn( calendarApi, 'post' ).mockReturnValue({
            data: {
                ok: true,
                uid: 'user-id-mock',
                name: 'Test User',
                token: 'token.mock'
            }
        });

        await act( async () => {
            await result.current.startRegister( newUser);
        });

        const { errorMessage, status, user } = result.current;

        expect( {errorMessage, status, user} ).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'Test User', uid: 'user-id-mock' }
        });
        
        expect( localStorage.getItem('token') ).toEqual( 'token.mock' );
        
        spy.mockRestore();
      });

    test('startRegister debe de fallar la creacion', async() => { 
        
        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        })

        await act( async () => {
            await result.current.startRegister( testUserCredentials );
        });

        const { errorMessage, status, user } = result.current;
        expect( {errorMessage, status, user} ).toEqual({
            errorMessage: 'Ya existe un usuario con ese correo',
            status: 'not-authenticated',
            user: {}
        });
        
        expect( localStorage.getItem('token') ).toBeNull();

       });

    test('checkAuthToken debe de fallar si no hay token', async () => { 
        
            const mockStore = getMockStore({ ...initialState });
            const { result } = renderHook( () => useAuthStore(), {
                wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
            });

            console.log('token', localStorage.getItem('token'));

            await act(async() => {
                await result.current.checkAuthToken();
            });
            const {errorMessage, status, user} = result.current;

            expect({ errorMessage, status, user }).toEqual({
                errorMessage: undefined,
                status: 'not-authenticated',
                user: {}
            });

        });

    test('checkAuthToken debe de autenticar el usuario si hay token', async () => {
    
        const { data } = await calendarApi.post('/auth', testUserCredentials);
        localStorage.setItem('token', data.token );

        const mockStore = getMockStore({ ...initialState });
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        });

        await act(async() => {
            await result.current.checkAuthToken();
        });

        const { errorMessage, status, user } = result.current;
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'Test User', uid: '67d83a685ee93b60a58d5361' }
        });
    });
});
