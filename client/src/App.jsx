import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Kanban from "./Kanban";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";

//  Route Guard using localStorage
const ProtectedRoute = ({ children }) => {
  // Always allow access to the kanban board (no login required)
  return children;
};

function App() {
  // Set login flag automatically when app loads
  localStorage.setItem("isLoggedIn", "true");
  
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Kanban route - no longer protected */}
          <Route
            path="/kanban"
            element={
              <ProtectedRoute>
                <Kanban />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;