import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./pages/Home";
import Books from "./pages/Books";
import BookPreview from "./pages/BookPreview";
import Contributors from "./pages/Contributors";
import About from "./pages/About";
import Feedback from "./pages/Feedback";

import Whiteboard from "./components/Whiteboard";
import TaskManager from "./components/TaskManager";
import Kanban from "./Kanban";

const SESSION_KEY = "app_session";

const createMockSession = () => {
  const session = {
    token: crypto.randomUUID(),
    user: {
      id: "u_1021",
      name: "Guest User",
      role: "reader",
    },
    expiresAt: Date.now() + 1000 * 60 * 60 * 24, // 24h
  };

  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
};

const getSession = () => {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;

    const session = JSON.parse(raw);
    if (!session.expiresAt || Date.now() > session.expiresAt) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }

    return session;
  } catch {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
};

const ProtectedRoute = ({ children }) => {
  let session = getSession();

  if (!session) {
    session = createMockSession();
  }

  if (!session) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<About />} />

          <Route
            path="/contributors"
            element={
              <ProtectedRoute>
                <Contributors />
              </ProtectedRoute>
            }
          />

          <Route
            path="/owner"
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />

          <Route
            path="/kanban"
            element={
              <ProtectedRoute>
                <Kanban />
              </ProtectedRoute>
            }
          />

          <Route
            path="/books"
            element={
              <ProtectedRoute>
                <Books />
              </ProtectedRoute>
            }
          />

          <Route
            path="/book/:id"
            element={
              <ProtectedRoute>
                <BookPreview />
              </ProtectedRoute>
            }
          />

          <Route
            path="/whiteboard"
            element={
              <ProtectedRoute>
                <Whiteboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <TaskManager />
              </ProtectedRoute>
            }
          />

          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
