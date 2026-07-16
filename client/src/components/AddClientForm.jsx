import React, { useState } from "react";
import axios from "../helper/axios";
import Swal from "sweetalert2";

function AddClientForm({ onSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [credit, setCredit] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      Swal.fire({ icon: "warning", title: "Name and email are required", timer: 1500, showConfirmButton: false });
      return;
    }
    setLoading(true);
    axios({
      method: "POST",
      url: "clients",
      data: { name, email, phone, credit: Number(credit) || 0 },
      headers: { access_token: localStorage.getItem("access_token") },
    })
      .then(({ data }) => {
        Swal.fire({ icon: "success", title: "Client added!", timer: 1500, showConfirmButton: false });
        setName("");
        setEmail("");
        setPhone("");
        setCredit("");
        onSuccess();
      })
      .catch((error) => {
        const msg = error.response?.data?.message || "Failed to add client";
        Swal.fire({ icon: "error", title: msg, showConfirmButton: true });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="add-room-form">
      <h4 style={{ marginBottom: "1rem", fontSize: "1rem" }}>New Client</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="clientName">Name</label>
          <input
            id="clientName"
            type="text"
            className="form-control"
            placeholder="e.g. John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="clientEmail">Email</label>
          <input
            id="clientEmail"
            type="email"
            className="form-control"
            placeholder="e.g. john@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
          <div className="form-group">
            <label htmlFor="clientPhone">Phone</label>
            <input
              id="clientPhone"
              type="text"
              className="form-control"
              placeholder="Optional"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="clientCredit">Credit</label>
            <input
              id="clientCredit"
              type="number"
              className="form-control"
              placeholder="0"
              min="0"
              value={credit}
              onChange={(e) => setCredit(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" className="btn-add" disabled={loading} style={{ width: "100%", justifyContent: "center" }}>
          {loading ? "Adding..." : "Add Client"}
        </button>
      </form>
    </div>
  );
}

export default AddClientForm;
