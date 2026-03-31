export interface ITickets {
    id: string,
    title: string,
    description: string,
    priority: number
}

export type TicketAction =
    | { type: "ADD_TICKET"; data: ITickets }
    | { type: "UPDATE_TICKET"; data: ITickets }
    | { type: "DELETE_TICKET"; data: { id: string } }
    | { type: "SET_EDITING_TICKET"; data: ITickets | { id: "", title: "", description: "", priority: 1 } }
    | { type: "CLEAR_EDITING_TICKET" }
    | { type: "SET_SORTING"; data: string };

export type TicketState = {
    tickets: ITickets[];
    editingTicket: ITickets | { id: "", title: "", description: "", priority: 1 };
    sortPreference: string;
};