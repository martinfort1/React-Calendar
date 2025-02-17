import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks";

export const FabAddNew = () => {
    
    const { openDateModal } = useUiStore();
    const { setActiveEvent } = useCalendarStore();

    const handleNewClick = () => {
        setActiveEvent({
                title: '',
                notes: '',
                start: new Date(),
                end: addHours( new Date(), 2),
                bgColor: '#fafafa',
                user: {
                  _id: '123',
                  name: 'Martin'
                }
            });
        openDateModal();
    }

  return (
    <button
        className="btn btn-primary fab"
        onClick={ handleNewClick }
    >
        <i className="fas fa-plus"></i>
    </button>
  )
}
