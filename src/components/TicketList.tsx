import type { ITickets, TicketAction } from "../types/tickets";
import TicketItem from "./TicketItem";

export default function TicketList({ tickets, dispatch }: { tickets: ITickets[], dispatch: React.Dispatch<TicketAction> }) {
    return (
        <div className="ticket-list">
            {
                tickets.map((ticket) => {
                    return <TicketItem key={ticket.id} dispatch={dispatch} ticket={ticket} />
                })
            }
        </div>
    )
}