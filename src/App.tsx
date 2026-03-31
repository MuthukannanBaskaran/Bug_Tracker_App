import { useReducer } from 'react';
import './App.css';
import TicketForm from './components/TicketForm';
import TicketReducer from './reducers/ticketReducer';
import './styles.css';
import TicketList from './components/TicketList';
import { sortTickets } from './utilities/sortingUtilities';

function App() {
  const initialState = { tickets: [], editingTicket: { id: "", title: "", description: "", priority: 1 }, sortPreference: "High to Low" };
  const [state, dispatch] = useReducer(TicketReducer, initialState);
  const sortedTickets = sortTickets(state.tickets, state.sortPreference);
  return (
    <>
      <div className="App">
        <div className="container">
          <h1>Bug Tracker Application</h1>
          <TicketForm dispatch={dispatch} editingTicket={state.editingTicket} />
          {
            sortedTickets.length > 0
            &&
            (
              <>
                <h2>All Tickets</h2>
                <select value={state.sortPreference} onChange={(e) => dispatch({ type: "SET_SORTING", data: e.currentTarget.value })} className="sorting-dropdown">
                  <option value="High to Low">Priority: High to Low</option>
                  <option value="Low to High">Priority: Low to High</option>
                </select>
                <TicketList tickets={sortedTickets} dispatch={dispatch} />
              </>
            )}
        </div>
      </div>
    </>
  )
}

export default App;