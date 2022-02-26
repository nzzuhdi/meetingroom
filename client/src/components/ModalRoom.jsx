import React from "react";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../helper/axios";
function ModalRoom(props) {
  const { clients, roomId } = props.data;
  const [inputs, setInputs] = useState({ roomId });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (event) => {
    const name = event.target.name;
    // console.log(name);
    const value = event.target.value;
    // console.log(value);

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
    return axios({
      method: "POST",
      url: `roomusages`,
      data: inputs,
      headers: {
        access_token: localStorage.access_token,
      },
    })
      .then(({ data }) => {
        console.log(data);
        Swal.fire({
          icon: "success",
          title: `Success Booking `,
          showConfirmButton: false,
          timer: 1500,
        });
        setInputs({ roomId });
        window.location.reload();
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: error.response.data.message,
          showConfirmButton: true,
        });
        console.log(error.response.data);
      });
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Booking
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
          <Modal.Title>New Booking</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <FloatingLabel
              controlId="floatingSelect"
              label="Select Client"
              className="mb-2"
            >
              <Form.Select
                aria-label="Floating label select example"
                name="clientId"
                onChange={handleChange}
              >
                <option>--Chose--</option>
                {clients.map((client, index) => {
                  return (
                    <option key={index} value={client.id}>
                      {client.name}
                    </option>
                  );
                })}
              </Form.Select>
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput"
              label="Room Id"
              className="mb-2"
            >
              <Form.Control
                type="text"
                defaultValue={roomId}
                readOnly
                name="roomId"
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput"
              label="Start Time"
              className="mb-2"
            >
              <Form.Control
                type="time"
                placeholder="24 H Format"
                name="startTime"
                value={inputs.name}
                onChange={handleChange}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingEndTime"
              label="End Time"
              className="mb-2"
            >
              <Form.Control
                type="time"
                placeholder="24H Format"
                name="endTime"
                onChange={handleChange}
                value={inputs.name}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingBookingDate"
              label="Booking Date"
              className="mb-2"
            >
              <Form.Control
                type="date"
                placeholder="date"
                name="bookingDate"
                onChange={handleChange}
                value={inputs.name}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingQuota"
              label="Quota"
              className="mb-2"
            >
              <Form.Control
                type="number"
                placeholder="Quota"
                name="quotaUsed"
                onChange={handleChange}
                value={inputs.name}
              />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit" onClick={handleClose}>
              Book!
            </Button>
            <Button variant="danger" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default ModalRoom;
