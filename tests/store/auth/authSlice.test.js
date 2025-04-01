import { authSlice, clearErrorMessage, onChecking, onLogin, onLogout } from "../../../src/store/auth/authSlice";
import { authenticatedState, initialState } from "../../fixtures/authStates";
import { testUserCredentials } from "../../fixtures/testUser";

describe('Pruebas en authSlice', () => { 
    
    test('debe de regresar el estado inicial', () => { 
        expect(authSlice.getInitialState() ).toEqual( initialState ); //en caso de cambiar el estado inicial en authSlice.js, se debe cambiar el fixture también
     });

     test('debe de realizar el login correctamente', () => { 
        
        const state = authSlice.reducer( initialState, onLogin( testUserCredentials ) );

        expect( state).toEqual({
            status: 'authenticated',
            user: testUserCredentials,
            errorMessage: undefined
        })
      });

      test('debe de realizar el logout', () => { 
        
        const errorMessage = 'Credenciales no válidas';
        const state = authSlice.reducer( authenticatedState, onLogout( errorMessage ) );

        expect( state ).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: errorMessage
            });
       });

       test('debe de limpiar el mensaje de error', () => { 
           
        const errorMessage = 'Credenciales no válidas';
        const state = authSlice.reducer( authenticatedState, onLogout( errorMessage ) );
        const newState = authSlice.reducer( state, clearErrorMessage() );

        expect( newState.errorMessage ).toBe( undefined );

        });

        test('debe de cambiar a checking cuando esta pendiente', () => { 
            
            const state = authSlice.reducer( initialState, onChecking() );
            expect(state.status).toBe('checking');

         });

 });