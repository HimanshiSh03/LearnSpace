import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Kanban from "./Kanban";
import Home from "./pages/Home";
import Books from "./pages/Books";
import BookPreview from "./pages/BookPreview";
import Contributors from "./pages/Contributors";
import About from "./pages/About";
import Whiteboard from "./components/Whiteboard";

// Route Guard (but currently always allows)
const ProtectedRoute = ({ children }) => {
  return children;
};

function App() {
  // Temporary: auto-login
  localStorage.setItem("isLoggedIn", "true");

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">

        {/* Navbar */}
        <nav className="shadow-md bg-white py-4 px-6 md:px-10 flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-600">
            <Link to="/">LearnSpace</Link>
          </div>

          <div className="flex flex-wrap gap-6 md:gap-8 text-lg">
            <Link to="/">Home</Link>
            <Link to="/kanban">Kanban</Link>
            <Link to="/books">BookSpace</Link>
            <Link to="/whiteboard">Whiteboard</Link>
            <Link to="/contributors">Contributors</Link>
            <Link to="/about">About</Link>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/contributors"
            element={
              <ProtectedRoute>
                <Contributors />
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

          {/* FIXED: About route correctly placed inside <Routes> */}
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
