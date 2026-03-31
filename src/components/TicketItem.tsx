import type { ITickets, TicketAction } from "../types/tickets";

export default function TicketItems({ ticket, dispatch }: { ticket: ITickets, dispatch: React.Dispatch<TicketAction> }) {
    const { id, title, description } = ticket;

    const priorityClass: Record<number, string> = {
        1: "priority-low", 2: "priority-medium", 3: "priority-high"
    }

    const handleDelete = () => {
        dispatch({ type: "DELETE_TICKET", data: { id } })
    }

    const handleEdit = () => {
        dispatch({ type: "SET_EDITING_TICKET", data: ticket })
    }

    return (
        <>
            <div className="ticket-item">
                <div className={`priority-dot ${priorityClass[ticket.priority]}`}></div>
                <h3>{title}</h3>
                <p>{description}</p>
                <button className="button" onClick={handleDelete}>Delete</button>
                <button className="button" onClick={handleEdit}>Edit</button>
            </div>
        </>
    );
}