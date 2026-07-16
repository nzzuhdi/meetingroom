import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoomsUsages, fetchRooms, fetchClients } from "../store/actionCreator/meetingCreator";
import AddClientForm from "../components/AddClientForm";

function Bookings() {
  const dispatch = useDispatch();
  const { roomUsages, rooms, clients } = useSelector((state) => state.meetingReducer);
  const [showAddClient, setShowAddClient] = useState(false);

  useEffect(() => {
    dispatch(fetchRoomsUsages());
    dispatch(fetchRooms());
    dispatch(fetchClients());
  }, [dispatch]);

  function formatDate(input) {
    const options = { weekday: "short", year: "numeric", month: "short", day: "numeric" };
    return new Date(input).toLocaleDateString("en-US", options);
  }

  function getRoomName(roomId) {
    const room = rooms.find((r) => r.id === roomId);
    return room ? room.roomName : `Room #${roomId}`;
  }

  function getClientName(clientId) {
    const client = clients.find((c) => c.id === clientId);
    return client ? client.name : `Client #${clientId}`;
  }

  return (
    <div className="main-content">
      <div className="page-header">
        <h2>Bookings</h2>
        <button className="btn-add" onClick={() => setShowAddClient(!showAddClient)}>
          {showAddClient ? "Cancel" : "+ Add Client"}
        </button>
      </div>

      {showAddClient && (
        <div style={{ marginBottom: "1.5rem" }}>
          <AddClientForm onSuccess={() => {
            setShowAddClient(false);
            dispatch(fetchClients());
          }} />
        </div>
      )}

      {/* Clients List */}
      {clients.length > 0 && (
        <div style={{ marginBottom: "1.5rem" }}>
          <h4 style={{ fontSize: "1rem", marginBottom: "0.75rem", color: "#495057" }}>Registered Clients</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {clients.map((client) => (
              <span key={client.id} style={{
                background: "#e8eeff",
                color: "#4361ee",
                padding: "0.35rem 0.75rem",
                borderRadius: "20px",
                fontSize: "0.8rem",
                fontWeight: 500
              }}>
                {client.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Bookings Table */}
      {roomUsages.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📅</div>
          <h4>No bookings yet</h4>
          <p>Go to Rooms to create your first booking.</p>
        </div>
      ) : (
        <div className="booking-table-wrapper">
          <table className="booking-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Room</th>
                <th>Client</th>
                <th>Date</th>
                <th>Start</th>
                <th>End</th>
                <th>People</th>
              </tr>
            </thead>
            <tbody>
              {roomUsages.map((booking, index) => (
                <tr key={booking.id || index}>
                  <td>{index + 1}</td>
                  <td>{getRoomName(booking.roomId)}</td>
                  <td>{getClientName(booking.clientId)}</td>
                  <td>{formatDate(booking.bookingDate)}</td>
                  <td>{booking.startTime}</td>
                  <td>{booking.endTime}</td>
                  <td>{booking.quotaUsed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Bookings;
