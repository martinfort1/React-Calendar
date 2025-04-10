import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from "../../../src/store/calendar/calendarSlice";
import { calendarWithActiveEventState, calendarWithEventsState, events, initialState } from "../../fixtures/calendarStates";

describe('Pruebas en calendarSlice', () => { 
    
    test('debe de regresar el estado inicial por defecto', () => { 
        
        const state = calendarSlice.getInitialState();
        expect( state ).toEqual( initialState );

     });

     test('onSetActiveEvent debe de activar el evento', () => { 

        const state = calendarSlice.reducer( calendarWithEventsState, onSetActiveEvent( events[0] ) );
        expect( state.activeEvent ).toEqual( events[0] );
      });

      test('onAddNewEvent debe de añadir un nuevo evento', () => { 
        const newEvent = {
            id: '3',
            start: new Date('2025-3-22 10:00:00'),
            end:  new Date('2025-3-22 12:00:00'),
            title: 'Cumpleaños de Pedro',
            notes: 'Test notes Pedro'
        }
        const state = calendarSlice.reducer( calendarWithEventsState, onAddNewEvent( newEvent ));

        expect( state.events ).toEqual( [...events, newEvent] );
       });

       test('onUpdateEvent debe de actualizar el evento', () => { 
        
        const updatedEvent = {
            id: '1',
            start: new Date('2025-3-20 10:00:00'),
            end:  new Date('2025-3-20 12:00:00'),
            title: 'Cumpleaños de Juan onUpdateEvent',
            notes: 'Test notes updated'
        }
        const state = calendarSlice.reducer( calendarWithEventsState, onUpdateEvent(updatedEvent) );
        expect( state.events ).toContain( updatedEvent );
        });


        test('onDeleteEvent debe borrar el evento activo', () => { 
            
            const state = calendarSlice.reducer( calendarWithActiveEventState, onDeleteEvent() );
            expect( state.activeEvent ).toBe( null );
            expect( state.events ).not.toContain( events[0] );

         });

         test('onLoadEvents debe de establecer los eventos', () => { 

            const state = calendarSlice.reducer( initialState, onLoadEvents(events));
            expect( state.isLoadingEvents ).toBeFalsy();
            expect( state.events ).toEqual( events );

            const newState = calendarSlice.reducer( state, onLoadEvents(events) );
            expect( state.events.length ).toBe( events.length );
          });

          test('onLogoutCalendar debe de limpiar el estado', () => { 

            const state = calendarSlice.reducer( calendarWithActiveEventState, onLogoutCalendar() );
            expect( state ). toEqual( initialState );
            
           });
 });