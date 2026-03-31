import React, { useState, useEffect } from "react";
import '../styles.css'
import type { ITickets, TicketAction } from "../types/tickets";


export default function TicketForm({ dispatch, editingTicket }: { dispatch: React.Dispatch<TicketAction>, editingTicket: ITickets }) {
    const [title, setTitle] = useState<string>(editingTicket?.title ?? "");
    const [description, setDescription] = useState<string>(editingTicket?.description ?? "");
    const [priority, setPriority] = useState<number>(editingTicket?.priority ?? 1);

    useEffect(() => {
        setTitle(editingTicket?.title ?? "");
        setDescription(editingTicket?.description ?? "");
        setPriority(editingTicket?.priority ?? 1);
    }, [editingTicket]);

    const PriorityLabels: Record<number, string> = {
        1: "Low",
        2: "Medium",
        3: "High",
    };

    const clearForm = (): void => {
        setTitle("");
        setDescription("");
        setPriority(1);
    }

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const ticketData: ITickets = {
            id: editingTicket && editingTicket.id ? editingTicket.id : new Date().toISOString(),
            title, description, priority
        };

        dispatch({
            type: editingTicket && editingTicket.id ? "UPDATE_TICKET" : "ADD_TICKET",
            data: ticketData
        });
        clearForm();
        if (editingTicket && editingTicket.id) {
            dispatch({ type: "CLEAR_EDITING_TICKET" });
        }
    }

    const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }

    const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.currentTarget.value);
    }

    const handlePriority = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.currentTarget.value);
        if (!Number.isNaN(value)) {
            setPriority(value);
        }
    }

    const handleCancel = ()=>{
        if(editingTicket && editingTicket.id){
            dispatch({ type: "CLEAR_EDITING_TICKET" });
        }
        clearForm();    }

    return (
        <>
            <form action="" onSubmit={handleSubmit} className="ticket-form">
                <div>
                    <label>
                        Title
                        <input type="text" value={title} className="form-input" onChange={handleTitle} required />
                    </label>
                </div>
                <div>
                    <label>
                        Description
                        <textarea value={description} className="form-input" onChange={handleDescription} required></textarea>
                    </label>
                </div>
                <fieldset className="priority-fieldset">
                    <legend className="">Priority</legend>
                    {
                        Object.entries(PriorityLabels).map(([value, label]) => {
                            const numValue = Number(value);
                            return (
                                <>
                                    <label key={value} className="priority-label">
                                        <input type="radio" checked={priority === numValue} value={value} onChange={handlePriority} />
                                        {label}</label>
                                </>
                            );
                        })
                    }
                </fieldset>
                <button type="submit" className="button">Submit</button>
                {editingTicket && editingTicket.id && <button type="button" className="button" onClick={handleCancel}>Cancel</button>}
            </form>
        </>
    )
}