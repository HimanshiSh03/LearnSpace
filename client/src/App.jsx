import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Kanban from "./Kanban";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Contributors from "./pages/contributors.jsx";

// Route Guard Component
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

function App() {
  // ------------------ THEME LOGIC ------------------
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  // ---------------------------------------------------

  return (
    <Router>
      {/* Navbar gets theme + toggle function */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <Routes>

        <Route path="/" element={<Navigate to="/register" replace />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contributors" element={<Contributors />} />

        <Route
          path="/kanban"
          element={
            <ProtectedRoute>
              <Kanban />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/register" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
