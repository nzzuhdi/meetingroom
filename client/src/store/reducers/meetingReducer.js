import { CLIENTS, LOGIN, ROOM, ROOMUSAGE } from "../actionType";

const initialState = {
  clients: [],
  rooms: [],
  roomUsages: [],
  isLogin: false,
};

export default function meetingReducer(state = initialState, action) {
  switch (action.type) {
    case CLIENTS:
      return {
        ...state,
        clients: action.payload,
      };
    case LOGIN:
      return {
        ...state,
        isLogin: action.payload,
      };
    case ROOM:
      return {
        ...state,
        rooms: action.payload,
      };
    case ROOMUSAGE:
      return {
        ...state,
        roomUsages: action.payload,
      };
    default:
      return state;
  }
}
