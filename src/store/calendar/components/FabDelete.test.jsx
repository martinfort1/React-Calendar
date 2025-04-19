import { cleanup, fireEvent, render, screen } from "@testing-library/react/pure";
import { FabDelete } from "../../../calendar/components/FabDelete";
import { useCalendarStore } from "../../../hooks/useCalendarStore";

jest.mock("../../../hooks/useCalendarStore");

describe('Pruebas en <FabDelete />', () => { 

    const mockStartDeletingEvent = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks()
        cleanup();
    });
    
    test('debe de mostrar el componente correctamente', () => { 
        
        useCalendarStore.mockReturnValue({
            hasEventSelected: false,
        });

        render(<FabDelete />);

        const btn = screen.getByLabelText('btn-delete');
        expect(btn.classList).toContain('btn');
        expect(btn.classList).toContain('btn-danger');
        expect(btn.classList).toContain('fab-danger');
        expect(btn.style.display).toBe('none');
     });

     test('debe de llamar startDeletingEvent si hay evento activo', () => { 
        
        useCalendarStore.mockReturnValue({
            hasEventSelected: true,
            startDeletingEvent: mockStartDeletingEvent,
        });

        render(<FabDelete />);

        const btn = screen.getByLabelText('btn-delete');
        fireEvent.click(btn);
        
        expect(mockStartDeletingEvent).toHaveBeenCalled();

      });


 });