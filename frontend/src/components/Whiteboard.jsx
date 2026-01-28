import React, { useRef, useEffect, useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import {
  Palette,
  Square,
  Circle,
  Type,
  Eraser,
  Trash2,
  Download,
  Undo,
  Redo,
  Move,
  ZoomIn,
  ZoomOut,
  Save,
  Image as ImageIcon,
  MousePointer,
  Hand
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Whiteboard = () => {
  const canvasRef = useRef(null);
  const [elements, setElements] = useState([]);
  const [history, setHistory] = useState([[]]);
  const [historyStep, setHistoryStep] = useState(0);
  const [action, setAction] = useState("none"); // none, drawing, moving, panning, resizing
  const [tool, setTool] = useState("pen"); // pen, line, rectangle, circle, text, selection, pan
  const [selectedElement, setSelectedElement] = useState(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [points, setPoints] = useState([]); // For freehand drawing
  const [currentElement, setCurrentElement] = useState(null);

  // Configuration state
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(2);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Main drawing logic
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const { width, height } = windowSize;

    // Adjust canvas size for retina displays
    canvas.width = width * 0.9;
    canvas.height = height * 0.7;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.save();
    // Apply zoom and pan
    context.translate(pan.x, pan.y);
    context.scale(zoom, zoom);

    // Draw all elements
    elements.forEach(element => {
      drawElement(context, element);
    });

    // Draw element currently being created
    if (action === "drawing" && currentElement) {
      drawElement(context, currentElement);
    }

    context.restore();
  }, [elements, action, currentElement, pan, zoom, windowSize]);

  // History management
  useEffect(() => {
    // When elements change, if it's a committed change (not dragging), update history
    if (action === "none") {
      // Debounce or check logic could go here, but for now we simply rely on 
      // manual calls to saveHistory() when actions complete to avoid 
      // excessive updates during drags
    }
  }, [elements, action]);

  const updateHistory = (newElements) => {
    const newHistory = history.slice(0, historyStep + 1);
    newHistory.push(newElements);
    setHistory(newHistory);
    setHistoryStep(newHistory.length - 1);
  };

  const undo = () => {
    if (historyStep > 0) {
      setHistoryStep(prev => prev - 1);
      setElements(history[historyStep - 1]);
    }
  };

  const redo = () => {
    if (historyStep < history.length - 1) {
      setHistoryStep(prev => prev + 1);
      setElements(history[historyStep + 1]);
    }
  };

  const drawElement = (context, element) => {
    const { type, x, y, width, height, points, color, strokeWidth } = element;
    context.strokeStyle = color;
    context.lineWidth = strokeWidth;
    context.lineCap = "round";
    context.lineJoin = "round";

    context.beginPath();

    if (type === "pen" || type === "eraser") {
      context.strokeStyle = type === "eraser" ? "#ffffff" : color;
      if (points.length > 0) {
        context.moveTo(points[0].x, points[0].y);
        points.forEach(point => context.lineTo(point.x, point.y));
      }
    } else if (type === "rectangle") {
      context.strokeRect(x, y, width, height);
    } else if (type === "circle") {
      // Using simpler circle logic: center at x,y with radius based on width/height
      const radiusX = Math.abs(width) / 2;
      const radiusY = Math.abs(height) / 2;
      context.ellipse(x + width / 2, y + height / 2, radiusX, radiusY, 0, 0, 2 * Math.PI);
    } else if (type === "text") {
      context.font = `${strokeWidth * 10}px sans-serif`;
      context.fillStyle = color;
      context.fillText(element.text, x, y);
    } else if (type === "image" && element.img) {
      context.drawImage(element.img, x, y, width, height);
    }

    context.stroke();
  };

  const insertImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const id = Date.now().toString();
          const newElement = {
            id,
            type: "image",
            x: 100, // Default position
            y: 100,
            width: 200,
            height: 200 * (img.height / img.width),
            img: img // Store image object for rendering
          };
          setElements(prev => [...prev, newElement]);
          updateHistory([...elements, newElement]);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const getMouseCoordinates = (event) => {
    const clientX = event.clientX || event.touches[0].clientX;
    const clientY = event.clientY || event.touches[0].clientY;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    // Raw coordinates relative to canvas
    const rawX = clientX - rect.left;
    const rawY = clientY - rect.top;
    // Transformed coordinates (accounting for zoom/pan)
    return {
      x: (rawX - pan.x) / zoom,
      y: (rawY - pan.y) / zoom,
      rawX, // Need raw for pan logic sometimes
      rawY
    };
  };

  // Check if a point is within an element (for selection)
  const isWithinElement = (x, y, element) => {
    const { type, x: ex, y: ey, width, height, points } = element;

    if (type === "rectangle" || type === "image") {
      const minX = Math.min(ex, ex + width);
      const maxX = Math.max(ex, ex + width);
      const minY = Math.min(ey, ey + height);
      const maxY = Math.max(ey, ey + height);
      return x >= minX && x <= maxX && y >= minY && y <= maxY;
    }
    if (type === "circle") {
      // Approximating circle hit detection as rectangle for simplicity
      const minX = Math.min(ex, ex + width);
      const maxX = Math.max(ex, ex + width);
      const minY = Math.min(ey, ey + height);
      const maxY = Math.max(ey, ey + height);
      return x >= minX && x <= maxX && y >= minY && y <= maxY;
    }
    if (type === "pen") {
      // Simple distance check to any point in the path
      return points.some(p => Math.hypot(p.x - x, p.y - y) < 10);
    }
    if (type === "text") {
      return x >= ex && x <= ex + (element.text.length * element.strokeWidth * 6) && y >= ey - 20 && y <= ey;
    }
    return false;
  };

  const getElementAtPosition = (x, y, elements) => {
    return elements.map(el => ({ ...el, active: false }))
      .slice().reverse()
      .find(element => isWithinElement(x, y, element));
  };

  const handleMouseDown = (event) => {
    const { x, y } = getMouseCoordinates(event);

    if (tool === "selection") {
      const element = getElementAtPosition(x, y, elements);
      if (element) {
        const offsetX = x - element.x; // Keep offset for smooth dragging
        const offsetY = y - element.y;
        setSelectedElement({ ...element, offsetX, offsetY });
        setElements(prev => prev.map(el => el.id === element.id ? { ...el, active: true } : el));

        if (element.type === "pen") {
          // For pen, we need to offset all points
          const offsetPoints = element.points.map(p => ({ x: x - p.x, y: y - p.y }));
          setSelectedElement({ ...element, offsetPoints });
        }
        setAction("moving");
      } else {
        setSelectedElement(null);
      }
    } else if (tool === "pan") {
      setAction("panning");
      setPoints([{ x: event.clientX, y: event.clientY }]); // Store screen coords for panning
    } else {
      // creating new element
      const id = Date.now().toString();
      const newElement = {
        id,
        type: tool,
        x,
        y,
        width: 0,
        height: 0,
        color,
        strokeWidth: brushSize,
        points: tool === "pen" || tool === "eraser" ? [{ x, y }] : []
      };
      // For text, we might want to handle it differently (prompt immediately)
      if (tool === "text") {
        const text = prompt("Enter text:");
        if (!text) return;
        newElement.text = text;
        setElements(prev => [...prev, newElement]);
        updateHistory([...elements, newElement]);
        return;
      }

      setAction("drawing");
      setCurrentElement(newElement);
    }
  };

  const handleMouseMove = (event) => {
    const { x, y } = getMouseCoordinates(event);

    if (action === "panning") {
      // Delta from last raw mouse position
      const deltaX = event.clientX - points[0].x;
      const deltaY = event.clientY - points[0].y;
      setPan(prev => ({ x: prev.x + deltaX, y: prev.y + deltaY }));
      setPoints([{ x: event.clientX, y: event.clientY }]); // reset reference
      return;
    }

    if (action === "drawing") {
      if (tool === "pen" || tool === "eraser") {
        const newPoints = [...currentElement.points, { x, y }];
        setCurrentElement({ ...currentElement, points: newPoints });
      } else if (tool === "rectangle" || tool === "circle") {
        setCurrentElement({
          ...currentElement,
          width: x - currentElement.x,
          height: y - currentElement.y
        });
      } else if (tool === "image" && selectedElement) {
        // Resize image if needed, for now just allow moving via selection tool, 
        // but if we were "drawing" an image it would be dragging to resize.
        // Current insertImage implementation adds it at fixed size.
      }
    } else if (action === "moving" && selectedElement) {
      const { id, type, offsetX, offsetY, offsetPoints } = selectedElement;
      const newX = x - offsetX;
      const newY = y - offsetY;

      const updatedElement = {
        ...selectedElement,
        x: newX,
        y: newY
      };

      if (type === "pen") {
        updatedElement.points = selectedElement.points.map((p, i) => ({
          x: x - offsetPoints[i].x,
          y: y - offsetPoints[i].y
        }));
      }

      // Live update the elements list creating a drag effect
      const updatedElements = elements.map(el => el.id === id ? updatedElement : el);
      setElements(updatedElements);
    }
  };

  const handleMouseUp = () => {
    if (action === "drawing") {
      // Commit new element
      if (currentElement) {
        setElements(prev => [...prev, currentElement]);
        updateHistory([...elements, currentElement]);
      }
    } else if (action === "moving") {
      // Commit move
      updateHistory(elements);
    }

    setAction("none");
    setCurrentElement(null);
    setPoints([]); // Clear temp points
  };

  const clearCanvas = () => {
    setElements([]);
    updateHistory([]);
  };

  const saveCanvas = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = "whiteboard.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center transition-colors duration-300">
      {/* UI Header & Toolbar */}
      <div className="w-full bg-white dark:bg-gray-800 shadow-sm p-4 flex flex-wrap justify-between items-center z-10 transition-colors duration-300">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">Whiteboard</h1>
          <div className="flex gap-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
            <button onClick={() => setTool("selection")} className={`p-2 rounded ${tool === "selection" ? "bg-white dark:bg-gray-600 shadow text-blue-600 dark:text-blue-400" : "hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300"}`} title="Select & Move"><MousePointer size={18} /></button>
            <button onClick={() => setTool("pan")} className={`p-2 rounded ${tool === "pan" ? "bg-white dark:bg-gray-600 shadow text-blue-600 dark:text-blue-400" : "hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300"}`} title="Pan Hand"><Hand size={18} /></button>
          </div>

          <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-2"></div>

          <div className="flex gap-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
            <button onClick={() => setTool("pen")} className={`p-2 rounded ${tool === "pen" ? "bg-white dark:bg-gray-600 shadow text-blue-600 dark:text-blue-400" : "hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300"}`}><Palette size={18} /></button>
            <button onClick={() => setTool("eraser")} className={`p-2 rounded ${tool === "eraser" ? "bg-white dark:bg-gray-600 shadow text-blue-600 dark:text-blue-400" : "hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300"}`}><Eraser size={18} /></button>
            <button onClick={() => setTool("rectangle")} className={`p-2 rounded ${tool === "rectangle" ? "bg-white dark:bg-gray-600 shadow text-blue-600 dark:text-blue-400" : "hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300"}`}><Square size={18} /></button>
            <button onClick={() => setTool("circle")} className={`p-2 rounded ${tool === "circle" ? "bg-white dark:bg-gray-600 shadow text-blue-600 dark:text-blue-400" : "hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300"}`}><Circle size={18} /></button>
            <button onClick={() => setTool("text")} className={`p-2 rounded ${tool === "text" ? "bg-white dark:bg-gray-600 shadow text-blue-600 dark:text-blue-400" : "hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300"}`}><Type size={18} /></button>
            <label className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer text-gray-600 dark:text-gray-300" title="Insert Image">
              <ImageIcon size={18} />
              <input type="file" accept="image/*" className="hidden" onChange={insertImage} />
            </label>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-2 md:mt-0">
          {/* Styling Controls */}
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0" />
          <input type="range" min="1" max="20" value={brushSize} onChange={(e) => setBrushSize(parseInt(e.target.value))} className="w-24" />

          <div className="flex gap-2">
            <button onClick={undo} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-300" title="Undo"><Undo size={18} /></button>
            <button onClick={redo} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-300" title="Redo"><Redo size={18} /></button>
          </div>

          <div className="flex gap-2">
            <button onClick={() => setZoom(z => Math.max(0.1, z - 0.1))} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-300"><ZoomOut size={18} /></button>
            <span className="flex items-center text-sm w-12 justify-center text-gray-600 dark:text-gray-300">{Math.round(zoom * 100)}%</span>
            <button onClick={() => setZoom(z => Math.min(5, z + 0.1))} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-300"><ZoomIn size={18} /></button>
          </div>

          <div className="flex gap-2">
            <button onClick={clearCanvas} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded" title="Clear All"><Trash2 size={18} /></button>
            <button onClick={saveCanvas} className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded" title="Download"><Download size={18} /></button>
          </div>

          <div className="flex items-center gap-4 ml-4">
            <ThemeToggle />
            <Link to="/" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">Exit</Link>
          </div>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 w-full bg-gray-100 dark:bg-gray-900 overflow-hidden flex justify-center items-center relative cursor-crosshair">
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
          style={{
            cursor: tool === "pan" ? (action === "panning" ? "grabbing" : "grab") :
              tool === "selection" ? "default" : "crosshair",
            boxShadow: "0 0 20px rgba(0,0,0,0.1)"
          }}
          className="bg-white rounded"
        />
      </div>
    </div>
  );
};

export default Whiteboard;