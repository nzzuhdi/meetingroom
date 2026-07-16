import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./views/Login";
import Register from "./views/Register";
import Home from "./views/Home";
import Bookings from "./views/Bookings";
import Header from "./components/Header";
import { Authentication } from "./components/navguard";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Authentication>
              <Home />
            </Authentication>
          }
        />
        <Route
          path="/bookings"
          element={
            <Authentication>
              <Bookings />
            </Authentication>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
