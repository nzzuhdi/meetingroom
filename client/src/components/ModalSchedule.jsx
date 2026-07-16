import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";

function ModalSchedule({ roomId }) {
  const [show, setShow] = useState(false);
  const { roomUsages } = useSelector((state) => state.meetingReducer);
  const schedule = roomUsages.filter((item) => item.roomId === roomId);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function formatDate(input) {
    const options = { weekday: "short", year: "numeric", month: "short", day: "numeric" };
    return new Date(input).toLocaleDateString("en-US", options);
  }

  return (
    <>
      <button className="btn-schedule" onClick={handleShow}>
        Schedule
      </button>

      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Schedule - Room #{roomId}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {schedule.length === 0 ? (
            <div className="empty-state" style={{ padding: "2rem" }}>
              <p>No bookings for this room yet.</p>
            </div>
          ) : (
            <div className="booking-table-wrapper" style={{ boxShadow: "none", padding: 0 }}>
              <table className="booking-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>People</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{formatDate(item.bookingDate)}</td>
                      <td>{item.startTime}</td>
                      <td>{item.endTime}</td>
                      <td>{item.quotaUsed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn-schedule" onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalSchedule;
