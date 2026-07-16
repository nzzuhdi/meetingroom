import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRooms,
  setIsLogin,
  fetchClients,
  fetchRoomsUsages,
} from "../store/actionCreator/meetingCreator";
import ModalRoom from "../components/ModalRoom";
import ModalSchedule from "../components/ModalSchedule";
import AddRoomForm from "../components/AddRoomForm";

function Home() {
  const dispatch = useDispatch();
  const { rooms, clients } = useSelector((state) => state.meetingReducer);
  const [showAddRoom, setShowAddRoom] = useState(false);

  useEffect(() => {
    dispatch(fetchRooms());
    dispatch(fetchClients());
    dispatch(fetchRoomsUsages());
    dispatch(setIsLogin(true));
  }, [dispatch]);

  return (
    <div className="main-content">
      <div className="page-header">
        <h2>Meeting Rooms</h2>
        <button className="btn-add" onClick={() => setShowAddRoom(!showAddRoom)}>
          {showAddRoom ? "Cancel" : "+ Add Room"}
        </button>
      </div>

      {showAddRoom && (
        <div style={{ marginBottom: "1.5rem" }}>
          <AddRoomForm onSuccess={() => {
            setShowAddRoom(false);
            dispatch(fetchRooms());
          }} />
        </div>
      )}

      {rooms.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🏢</div>
          <h4>No rooms yet</h4>
          <p>Click "Add Room" to create your first meeting room.</p>
        </div>
      ) : (
        <div className="card-grid">
          {rooms.map((room) => (
            <div className="room-card" key={room.id}>
              <div className="room-card-header">
                <div className="room-card-title">{room.roomName}</div>
                <div className="room-card-badge">Room #{room.id}</div>
              </div>
              <div className="room-card-cost">
                ${room.costPerHour} <span>/ hour</span>
              </div>
              <div className="room-card-actions">
                <ModalRoom data={{ clients, roomId: room.id }} />
                <ModalSchedule roomId={room.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
