import type { ITickets } from '../types/tickets';

export const sortTickets = (tickets: ITickets[], sortPreference: string) => {
    if (sortPreference === "High to Low") {
        return [...tickets].sort((a, b) => b.priority - a.priority);
    } else if (sortPreference === "Low to High") {
        return [...tickets].sort((a, b) => a.priority - b.priority);
    } else {
        return tickets;
    }
}