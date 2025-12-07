import React, { useRef, useEffect, useState } from "react";
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
  MousePointer
} from "lucide-react";

const Whiteboard = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const [tool, setTool] = useState("pen"); // pen, eraser, shape, text
  const [snapshot, setSnapshot] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyStep, setHistoryStep] = useState(-1);
  const [shapes, setShapes] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [textInput, setTextInput] = useState({ active: false, x: 0, y: 0, text: "" });
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  // Initialize canvas
  useEffect(() => {
    const updateCanvasSize = () => {
      const width = window.innerWidth * 0.9;
      const height = window.innerHeight * 0.7;
      setCanvasSize({ width, height });
      
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = width;
        canvas.height = height;
        
        const context = canvas.getContext("2d");
        context.lineCap = "round";
        context.strokeStyle = color;
        context.lineWidth = brushSize;
        contextRef.current = context;

        // Set initial background
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        // Redraw if we have history
        if (historyStep >= 0 && history[historyStep]) {
          const img = new Image();
          img.onload = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, 0, 0);
          };
          img.src = history[historyStep];
        }
      }
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);
    
    return () => {
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, [history, historyStep]);

  // Update context when color or brush size changes
  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = tool === "eraser" ? "#FFFFFF" : color;
      contextRef.current.lineWidth = brushSize;
      contextRef.current.fillStyle = color;
    }
  }, [color, brushSize, tool]);

  // Save current state to history
  const saveToHistory = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dataUrl = canvas.toDataURL();
      const newHistory = history.slice(0, historyStep + 1);
      newHistory.push(dataUrl);
      setHistory(newHistory);
      setHistoryStep(newHistory.length - 1);
    }
  };

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    
    if (tool === "move") {
      setIsDragging(true);
      setDragStart({ x: offsetX, y: offsetY });
      return;
    }
    
    if (tool === "text") {
      setTextInput({ active: true, x: offsetX, y: offsetY, text: "" });
      return;
    }
    
    const context = contextRef.current;
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);
    setSnapshot(context.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height));
  };

  const finishDrawing = () => {
    if (isDrawing) {
      contextRef.current.closePath();
      setIsDrawing(false);
      saveToHistory();
    }
    setIsDragging(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!canvasRef.current) return;
    
    const { offsetX, offsetY } = nativeEvent;
    const context = contextRef.current;
    const canvas = canvasRef.current;
    
    if (isDragging && tool === "move") {
      const dx = offsetX - dragStart.x;
      const dy = offsetY - dragStart.y;
      setPan(prev => ({ x: prev.x + dx, y: prev.y + dy }));
      setDragStart({ x: offsetX, y: offsetY });
      return;
    }
    
    if (!isDrawing) return;
    
    if (tool === "pen" || tool === "eraser") {
      context.lineTo(offsetX, offsetY);
      context.stroke();
    } else if (tool === "shape") {
      // For shape preview, we'll redraw the snapshot and draw the shape
      context.putImageData(snapshot, 0, 0);
      context.beginPath();
      context.rect(dragStart.x, dragStart.y, offsetX - dragStart.x, offsetY - dragStart.y);
      context.stroke();
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    saveToHistory();
  };

  const saveCanvas = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = "whiteboard-drawing.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const handleColorChange = (newColor) => {
    setColor(newColor);
    setTool("pen");
  };

  const handleEraser = () => {
    setTool("eraser");
  };

  const handlePen = () => {
    setTool("pen");
  };

  const handleShapeTool = () => {
    setTool("shape");
  };

  const handleTextTool = () => {
    setTool("text");
  };

  const handleMoveTool = () => {
    setTool("move");
  };

  const undo = () => {
    if (historyStep > 0) {
      setHistoryStep(historyStep - 1);
      const canvas = canvasRef.current;
      const context = contextRef.current;
      const img = new Image();
      img.onload = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0);
      };
      img.src = history[historyStep - 1];
    }
  };

  const redo = () => {
    if (historyStep < history.length - 1) {
      setHistoryStep(historyStep + 1);
      const canvas = canvasRef.current;
      const context = contextRef.current;
      const img = new Image();
      img.onload = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0);
      };
      img.src = history[historyStep + 1];
    }
  };

  const zoomIn = () => {
    setZoom(prev => Math.min(prev + 0.1, 3));
  };

  const zoomOut = () => {
    setZoom(prev => Math.max(prev - 0.1, 0.5));
  };

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const addText = () => {
    if (textInput.text.trim()) {
      const context = contextRef.current;
      context.font = `${brushSize * 4}px Arial`;
      context.fillStyle = color;
      context.fillText(textInput.text, textInput.x, textInput.y);
      saveToHistory();
    }
    setTextInput({ active: false, x: 0, y: 0, text: "" });
  };

  const insertImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = canvasRef.current;
          const context = contextRef.current;
          context.drawImage(img, 50, 50, 200, 200);
          saveToHistory();
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4 md:mb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">WHITEBOARD</h1>
          <p className="text-gray-600 text-sm md:text-base">Draw, sketch, and brainstorm your ideas</p>
        </div>
        <Link 
          to="/" 
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center gap-2"
        >
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-xl shadow-lg p-4 mb-4 md:mb-6">
        <div className="flex flex-wrap items-center gap-3 md:gap-4">
          {/* Tool Selection */}
          <div className="flex flex-wrap gap-1 md:gap-2 p-2 bg-gray-100 rounded-lg">
            <button 
              onClick={handlePen}
              className={`p-2 rounded-lg transition-all ${tool === "pen" ? "bg-indigo-500 text-white shadow" : "bg-white hover:bg-gray-200"}`}
              title="Pen"
            >
              <Palette size={18} />
            </button>
            <button 
              onClick={handleEraser}
              className={`p-2 rounded-lg transition-all ${tool === "eraser" ? "bg-indigo-500 text-white shadow" : "bg-white hover:bg-gray-200"}`}
              title="Eraser"
            >
              <Eraser size={18} />
            </button>
            <button 
              onClick={handleShapeTool}
              className={`p-2 rounded-lg transition-all ${tool === "shape" ? "bg-indigo-500 text-white shadow" : "bg-white hover:bg-gray-200"}`}
              title="Rectangle"
            >
              <Square size={18} />
            </button>
            <button 
              onClick={handleTextTool}
              className={`p-2 rounded-lg transition-all ${tool === "text" ? "bg-indigo-500 text-white shadow" : "bg-white hover:bg-gray-200"}`}
              title="Text"
            >
              <Type size={18} />
            </button>
            <button 
              onClick={handleMoveTool}
              className={`p-2 rounded-lg transition-all ${tool === "move" ? "bg-indigo-500 text-white shadow" : "bg-white hover:bg-gray-200"}`}
              title="Move"
            >
              <Move size={18} />
            </button>
          </div>

          {/* Color Palette */}
          <div className="flex flex-wrap gap-1 md:gap-2">
            {["#000000", "#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff", "#ffa500"].map((c) => (
              <button
                key={c}
                onClick={() => handleColorChange(c)}
                className={`w-6 h-6 md:w-7 md:h-7 rounded-full border-2 transition-transform hover:scale-110 ${color === c && tool === "pen" ? "border-gray-800 scale-110" : "border-gray-300"}`}
                style={{ backgroundColor: c }}
                title={c}
              />
            ))}
          </div>

          {/* Brush Size */}
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
            <span className="text-xs md:text-sm font-medium text-gray-700">Size:</span>
            <input
              type="range"
              min="1"
              max="50"
              value={brushSize}
              onChange={(e) => setBrushSize(e.target.value)}
              className="w-16 md:w-24"
            />
            <span className="text-xs md:text-sm w-6 text-gray-700">{brushSize}</span>
          </div>

          {/* Zoom Controls */}
          <div className="flex gap-1 md:gap-2 p-2 bg-gray-100 rounded-lg">
            <button
              onClick={zoomIn}
              className="p-2 rounded-lg bg-white hover:bg-gray-200 transition-colors"
              title="Zoom In"
            >
              <ZoomIn size={18} />
            </button>
            <button
              onClick={zoomOut}
              className="p-2 rounded-lg bg-white hover:bg-gray-200 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut size={18} />
            </button>
            <button
              onClick={resetView}
              className="px-2 text-xs md:text-sm font-medium bg-white hover:bg-gray-200 rounded-lg transition-colors"
            >
              {Math.round(zoom * 100)}%
            </button>
          </div>

          {/* History Controls */}
          <div className="flex gap-1 md:gap-2 p-2 bg-gray-100 rounded-lg">
            <button
              onClick={undo}
              disabled={historyStep <= 0}
              className={`p-2 rounded-lg transition-colors ${historyStep <= 0 ? "opacity-50 cursor-not-allowed" : "bg-white hover:bg-gray-200"}`}
              title="Undo"
            >
              <Undo size={18} />
            </button>
            <button
              onClick={redo}
              disabled={historyStep >= history.length - 1}
              className={`p-2 rounded-lg transition-colors ${historyStep >= history.length - 1 ? "opacity-50 cursor-not-allowed" : "bg-white hover:bg-gray-200"}`}
              title="Redo"
            >
              <Redo size={18} />
            </button>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-1 md:gap-2">
            <button
              onClick={clearCanvas}
              className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-colors"
            >
              <Trash2 size={16} />
              <span className="hidden md:inline">Clear</span>
            </button>
            <button
              onClick={saveCanvas}
              className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg transition-colors"
            >
              <Download size={16} />
              <span className="hidden md:inline">Save</span>
            </button>
            <label className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition-colors cursor-pointer">
              <ImageIcon size={16} />
              <span className="hidden md:inline">Image</span>
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={insertImage}
              />
            </label>
          </div>
        </div>
      </div>

      {/* Canvas Container */}
      <div className="flex justify-center">
        <div 
          className="border border-gray-300 rounded-xl shadow-lg bg-gray-50 overflow-hidden relative"
          style={{ 
            width: canvasSize.width,
            height: canvasSize.height,
            cursor: tool === "move" ? "grab" : tool === "text" ? "text" : "crosshair"
          }}
        >
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={draw}
            className="bg-white"
            style={{ 
              transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
              transformOrigin: "0 0"
            }}
          />
          
          {/* Text Input Overlay */}
          {textInput.active && (
            <div 
              className="absolute bg-white border border-gray-300 rounded p-2 shadow-lg"
              style={{ 
                left: textInput.x, 
                top: textInput.y,
                transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
                transformOrigin: "0 0"
              }}
            >
              <input
                type="text"
                value={textInput.text}
                onChange={(e) => setTextInput({...textInput, text: e.target.value})}
                onKeyDown={(e) => e.key === 'Enter' && addText()}
                onBlur={addText}
                autoFocus
                className="outline-none"
                placeholder="Type text..."
              />
            </div>
          )}
          
          {/* Zoom Indicator */}
          <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
            Zoom: {Math.round(zoom * 100)}%
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-6 bg-white rounded-xl shadow-lg p-4 max-w-4xl mx-auto">
        <h3 className="font-bold text-gray-800 mb-2">Tips:</h3>
        <ul className="text-sm text-gray-600 grid grid-cols-1 md:grid-cols-2 gap-2">
          <li className="flex items-start gap-2">
            <MousePointer className="w-4 h-4 mt-0.5 text-indigo-500" />
            <span>Select tools from the toolbar above</span>
          </li>
          <li className="flex items-start gap-2">
            <Palette className="w-4 h-4 mt-0.5 text-indigo-500" />
            <span>Choose colors and adjust brush size</span>
          </li>
          <li className="flex items-start gap-2">
            <Move className="w-4 h-4 mt-0.5 text-indigo-500" />
            <span>Use move tool to pan around the canvas</span>
          </li>
          <li className="flex items-start gap-2">
            <ZoomIn className="w-4 h-4 mt-0.5 text-indigo-500" />
            <span>Zoom in/out to work on details</span>
          </li>
          <li className="flex items-start gap-2">
            <Undo className="w-4 h-4 mt-0.5 text-indigo-500" />
            <span>Undo/redo your changes</span>
          </li>
          <li className="flex items-start gap-2">
            <Save className="w-4 h-4 mt-0.5 text-indigo-500" />
            <span>Save your work when finished</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Whiteboard;