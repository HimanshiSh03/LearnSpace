import { Routes, Route } from "react-router-dom";
import Kanban from "./Kanban";
import Home from "./pages/Home";
import Books from "./pages/Books";
import BookPreview from "./pages/BookPreview";
import Contributors from "./pages/Contributors";
import About from "./pages/About";
import Owner from "./pages/Owner";
import Whiteboard from "./components/Whiteboard";

function App() {
  // Set login flag automatically when app loads
  localStorage.setItem("isLoggedIn", "true");
  
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<Home />} />   
        
        {/* Contributors route */}
        <Route path="/contributors" element={<Contributors />} />
        
        {/* About/Owner route */}
        <Route path="/owner" element={<Owner />} />
        
        {/* Kanban route */}
        <Route path="/kanban" element={<Kanban />} />
        
        {/* Books route */}
        <Route path="/books" element={<Books />} />
        
        {/* Book Preview route */}
        <Route path="/book/:id" element={<BookPreview />} />
        
        {/* Whiteboard route */}
        <Route path="/whiteboard" element={<Whiteboard />} />
      </Routes>
    </div>
  );
}

export default App;