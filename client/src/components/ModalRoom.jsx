import React, { useState } from "react";
import { Modal, Form, FloatingLabel } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fetchRoomsUsages } from "../store/actionCreator/meetingCreator";
import Swal from "sweetalert2";
import axios from "../helper/axios";

function ModalRoom({ data }) {
  const { clients, roomId } = data;
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({ roomId });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputs.clientId || !inputs.startTime || !inputs.endTime || !inputs.bookingDate) {
      Swal.fire({ icon: "warning", title: "Please fill all fields", timer: 1500, showConfirmButton: false });
      return;
    }
    setLoading(true);
    axios({
      method: "POST",
      url: "roomusages",
      data: { ...inputs, quotaUsed: inputs.quotaUsed || 1 },
      headers: { access_token: localStorage.getItem("access_token") },
    })
      .then(({ data }) => {
        Swal.fire({ icon: "success", title: "Booking created!", timer: 1500, showConfirmButton: false });
        setInputs({ roomId });
        handleClose();
        dispatch(fetchRoomsUsages());
      })
      .catch((error) => {
        const msg = error.response?.data?.message || "Booking failed";
        Swal.fire({ icon: "error", title: msg, showConfirmButton: true });
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <button className="btn-book" onClick={handleShow}>
        Book
      </button>

      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>New Booking - Room #{roomId}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <FloatingLabel controlId="selectClient" label="Select Client" className="mb-3">
              <Form.Select name="clientId" onChange={handleChange} value={inputs.clientId || ""}>
                <option value="">-- Choose Client --</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name} ({client.email})
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>

            <FloatingLabel controlId="bookingDate" label="Booking Date" className="mb-3">
              <Form.Control
                type="date"
                name="bookingDate"
                value={inputs.bookingDate || ""}
                onChange={handleChange}
              />
            </FloatingLabel>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              <FloatingLabel controlId="startTime" label="Start Time">
                <Form.Control
                  type="time"
                  name="startTime"
                  value={inputs.startTime || ""}
                  onChange={handleChange}
                />
              </FloatingLabel>
              <FloatingLabel controlId="endTime" label="End Time">
                <Form.Control
                  type="time"
                  name="endTime"
                  value={inputs.endTime || ""}
                  onChange={handleChange}
                />
              </FloatingLabel>
            </div>

            <FloatingLabel controlId="quota" label="Number of People" className="mt-3">
              <Form.Control
                type="number"
                name="quotaUsed"
                placeholder="1"
                min="1"
                value={inputs.quotaUsed || ""}
                onChange={handleChange}
              />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <button type="button" className="btn-schedule" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="btn-book" disabled={loading}>
              {loading ? "Booking..." : "Confirm Booking"}
            </button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default ModalRoom;
