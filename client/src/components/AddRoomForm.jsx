import React, { useState } from "react";
import axios from "../helper/axios";
import Swal from "sweetalert2";

function AddRoomForm({ onSuccess }) {
  const [roomName, setRoomName] = useState("");
  const [costPerHour, setCostPerHour] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!roomName.trim() || !costPerHour) {
      Swal.fire({ icon: "warning", title: "Please fill all fields", timer: 1500, showConfirmButton: false });
      return;
    }
    setLoading(true);
    axios({
      method: "POST",
      url: "rooms",
      data: { roomName, costPerHour: Number(costPerHour) },
      headers: { access_token: localStorage.getItem("access_token") },
    })
      .then(({ data }) => {
        Swal.fire({ icon: "success", title: "Room added!", timer: 1500, showConfirmButton: false });
        setRoomName("");
        setCostPerHour("");
        onSuccess();
      })
      .catch((error) => {
        const msg = error.response?.data?.message || "Failed to add room";
        Swal.fire({ icon: "error", title: msg, showConfirmButton: true });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="add-room-form">
      <h4 style={{ marginBottom: "1rem", fontSize: "1rem" }}>New Room</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="roomName">Room Name</label>
          <input
            id="roomName"
            type="text"
            className="form-control"
            placeholder="e.g. Conference Room A"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="costPerHour">Cost per Hour ($)</label>
          <input
            id="costPerHour"
            type="number"
            className="form-control"
            placeholder="e.g. 25"
            min="0"
            step="0.01"
            value={costPerHour}
            onChange={(e) => setCostPerHour(e.target.value)}
          />
        </div>
        <button type="submit" className="btn-add" disabled={loading} style={{ width: "100%", justifyContent: "center" }}>
          {loading ? "Adding..." : "Add Room"}
        </button>
      </form>
    </div>
  );
}

export default AddRoomForm;
