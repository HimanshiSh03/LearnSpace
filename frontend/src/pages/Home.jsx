import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
//  Route Guard using localStorage
import { Link } from "react-router-dom";
import Kanban from "./Kanban";
import Home from "./pages/Home";
import Books from "./pages/Books";
import BookPreview from "./pages/BookPreview";
import Contributors from "./pages/Contributors";
import About from "./pages/About";
import Whiteboard from "./components/Whiteboard";



const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("auth-token");

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    <Router>
      {/* Navbar */}
      <nav className="shadow-md bg-white py-4 px-6 md:px-10 flex items-center justify-between">
        <div className="text-2xl font-bold text-blue-600">
          <Link to="/">LearnSpace</Link>
        </div>

        {/* FIXED: flex-wrap + responsive gap */}
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
          path="/kanban"
          element={
            <ProtectedRoute>
              <Kanban />
            </ProtectedRoute>
          }
        />
        <Route path="/books" element={<Books />} />
        <Route path="/book/:id" element={<BookPreview />} />
        <Route path="/contributors" element={<Contributors />} />
        <Route path="/about" element={<About />} />
        <Route path="/whiteboard" element={<Whiteboard />} />
      </Routes>
    </Router>
  );
}

export default App;
