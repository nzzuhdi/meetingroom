import logo from "./logo.svg";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./views/Login";
import Register from "./views/Register";
import Header from "./components/Header";
import { Authentication } from "./components/navguard";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./views/Home";
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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
