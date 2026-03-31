import type { TicketAction, TicketState } from "../types/tickets";

export default function TicketReducer(state: TicketState, action: TicketAction): TicketState {
    switch (action.type) {
        case "ADD_TICKET":
            return { ...state, tickets: [...state.tickets, action.data] };
        case "UPDATE_TICKET":
            return {
                ...state,
                tickets: state.tickets.map(
                    ticket =>
                        ticket.id === action.data.id ? action.data : ticket
                )
            };
        case "DELETE_TICKET":
            if(state.editingTicket && state.editingTicket.id === action.data.id) {
                return {
                    ...state, 
                    tickets: state.tickets.filter(ticket => ticket.id !== action.data.id), 
                    editingTicket: { id: "", title: "", description: "", priority: 1 }
                }
            }
            else{
                return {
                    ...state, 
                    tickets: state.tickets.filter(ticket => ticket.id !== action.data.id)
                }
            }
        case "SET_EDITING_TICKET":
            return {
                ...state, editingTicket: action.data
            }

        case "CLEAR_EDITING_TICKET":
            return {
                ...state, editingTicket: { id: "", title: "", description: "", priority: 1 }
            }
        case "SET_SORTING":
            return {
                ...state, sortPreference: action.data
            };
        default:
            return state;
    }
}