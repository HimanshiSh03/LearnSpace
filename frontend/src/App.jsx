import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Kanban from "./Kanban";
import Home from "./pages/Home";
import Books from "./pages/Books";
import BookPreview from "./pages/BookPreview";
import Contributors from "./pages/Contributors";
import About from "./pages/About";
import Whiteboard from "./components/Whiteboard"; // Added Whiteboard import



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
    
        <Routes>
          <Route path="/" element={<Home />} />   
          
          {/* Contributors route */}
          <Route
            path="/contributors"
            element={
              <ProtectedRoute>
                <Contributors />
              </ProtectedRoute>
            }
          />
          
          {/* About/Owner route */}
          <Route
            path="/owner"
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />

          {/* Kanban route - no longer protected */}
          <Route
            path="/kanban"
            element={
              <ProtectedRoute>
                <Kanban />
              </ProtectedRoute>
            }
          />
          
          {/* Books route */}
          <Route
            path="/books"
            element={
              <ProtectedRoute>
                <Books />
              </ProtectedRoute>
            }
          />
          
          {/* Book Preview route */}
          <Route
            path="/book/:id"
            element={
              <ProtectedRoute>
                <BookPreview />
              </ProtectedRoute>
            }
          />
          
          {/* Whiteboard route */}
          <Route
            path="/whiteboard"
            element={
              <ProtectedRoute>
                <Whiteboard />
              </ProtectedRoute>
            }
          />
          
          {/* Contributors route */}
          <Route
            path="/contributors"
            element={
              <ProtectedRoute>
                <Contributors />
              </ProtectedRoute>
            }
          />
          
          {/* Owner/About route */}
          <Route
            path="/owner"
            element={
              <ProtectedRoute>
                <Owner />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;