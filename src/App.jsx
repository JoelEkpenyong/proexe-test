import Dashboard from "./pages/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="container-xxl">
      <Dashboard />
      <ToastContainer />
    </div>
  );
}

export default App;
