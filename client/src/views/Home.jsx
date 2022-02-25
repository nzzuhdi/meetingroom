import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchRooms,
  setIsLogin,
  fetchClients,
} from "../store/actionCreator/meetingCreator";
import ModalRoom from "../components/ModalRoom";
import { Form, FloatingLabel } from "react-bootstrap";
function Home() {
  const dispatch = useDispatch();
  const { rooms, isLogin, clients } = useSelector(
    (state) => state.meetingReducer
  );
  useEffect(() => {
    dispatch(fetchRooms());
    dispatch(fetchClients());

    dispatch(setIsLogin(true));
  }, []);
  console.log(rooms);
  return (
    <div className="container-md">
      <div className="d-flex flex-row bd-highlight ">
        <h2 style={{ marginTop: "30px" }}>BOOKING OUR ROOM HERE</h2>
      </div>
      <div className="table-responsive-sm">
        <table className="table table-light table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col">No</th>
              <th scope="col">Room</th>
              <th scope="col">Cost per Hour</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{room.roomName}</td>
                  <td>{room.costPerHour}</td>
                  <td>
                    <ModalRoom data={{ clients: clients, roomId: room.id }} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
