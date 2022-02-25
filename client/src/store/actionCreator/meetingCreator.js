import { CLIENTS, LOGIN, ROOM, ROOMUSAGE } from "../actionType";
import axios from "../../helper/axios";

export function setIsLogin(payload) {
  return {
    type: LOGIN,
    payload,
  };
}

function setClients(payload) {
  return {
    type: CLIENTS,
    payload,
  };
}

function setRooms(payload) {
  return {
    type: ROOM,
    payload,
  };
}

function setRoomUsage(payload) {
  return {
    type: ROOMUSAGE,
    payload,
  };
}

export function fetchClients() {
  return function (dispatch, getState) {
    // dispatch(itemsLoading());
    axios({
      method: "GET",
      url: "clients",
      headers: {
        access_token: localStorage.access_token,
      },
    })
      .then(({ data }) => {
        console.log(data, "CLIENTS");
        dispatch(setClients(data));
      })

      .catch((error) => {
        console.log(error);
      });
  };
}

export function fetchRooms() {
  return function (dispatch, getState) {
    // dispatch(itemsLoading());
    axios({
      method: "GET",
      url: "rooms",
      headers: {
        access_token: localStorage.access_token,
      },
    })
      .then(({ data }) => {
        console.log(data, "ROOMs");
        dispatch(setRooms(data));
      })

      .catch((error) => {
        console.log(error);
      });
  };
}
