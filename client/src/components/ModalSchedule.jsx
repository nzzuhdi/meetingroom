import React from "react";
import { Button, Modal, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../helper/axios";
function ModalSchedule(props) {
  const [show, setShow] = useState(false);
  const { roomUsages } = useSelector((state) => state.meetingReducer);
  const schedule = roomUsages.filter(
    (filtered) => props.roomId === filtered.roomId
  );
  console.log(schedule, "ini modalschedule");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function date(input) {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const date = new Date(input);
    return `${date.toLocaleDateString("en-EN", options)}`;
  }
  return (
    <div>
      <Button variant="info" onClick={handleShow}>
        Check
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{`List Schedule Meetin by Room`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>No</th>
                <th>Client </th>
                <th>Booking Date</th>
                <th>Start</th>
                <th>End</th>
                <th>Quota</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((data, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{data.clientId}</td>
                    <td>{date(data.bookingDate)}</td>
                    <td>{data.startTime}</td>
                    <td>{data.endTime}</td>
                    <td>{data.quotaUsed}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalSchedule;
