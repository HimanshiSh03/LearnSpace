import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Kanban from "./Kanban";
import Register from "./pages/Register";
import Login from "./pages/Login";

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
      <Routes>
        <Route path="/" element={<Navigate to="/kanban" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

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
    </Router>
  );
}

export default App;