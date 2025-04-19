import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks";

export const FabDelete = () => {
    
    const { startDeletingEvent, hasEventSelected } = useCalendarStore();

    const handleDelete = () => {
      startDeletingEvent();
    };
    
    return (
      <button
      aria-label="btn-delete"
      className="btn btn-danger fab fab-danger"
      onClick={ handleDelete }
      style={{
        display: hasEventSelected ? '' : 'none'
      }}
      >
        <i className="fas fa-trash-alt"></i>
    </button>
  )
}
  
