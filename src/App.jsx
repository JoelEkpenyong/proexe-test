import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import AddUser from "./pages/AddUser";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.min.css";

function App() {
  return (
    <div className="container-xxl">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/user/:action" element={<AddUser />} />
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
