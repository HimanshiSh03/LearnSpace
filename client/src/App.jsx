import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Kanban from "./Kanban";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Contributors from "./pages/contributors.jsx";

// Route Guard
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root path */}
        <Route path="/" element={<Navigate to="/register" />} />

        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contributors" element={<Contributors />} />

        {/* Protected Route */}
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
