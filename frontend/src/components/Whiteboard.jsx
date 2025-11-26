import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Palette, Square, Circle, Type, Eraser, Trash2, Download } from "lucide-react";

const Whiteboard = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const [tool, setTool] = useState("pen"); // pen, eraser
  const [snapshot, setSnapshot] = useState(null);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.7;
    
    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.strokeStyle = color;
    context.lineWidth = brushSize;
    contextRef.current = context;

    // Set initial background
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  // Update context when color or brush size changes
  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = tool === "eraser" ? "#FFFFFF" : color;
      contextRef.current.lineWidth = brushSize;
    }
  }, [color, brushSize, tool]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
    setSnapshot(contextRef.current.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height));
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    
    if (tool === "pen" || tool === "eraser") {
      contextRef.current.lineTo(offsetX, offsetY);
      contextRef.current.stroke();
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">WHITEBOARD</h1>
        <Link 
          to="/" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
        >
          Back to Home
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          {/* Tool Selection */}
          <div className="flex gap-2">
            <button 
              onClick={handlePen}
              className={`p-2 rounded-lg ${tool === "pen" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              title="Pen"
            >
              <Palette size={20} />
            </button>
            <button 
              onClick={handleEraser}
              className={`p-2 rounded-lg ${tool === "eraser" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              title="Eraser"
            >
              <Eraser size={20} />
            </button>
          </div>

          {/* Color Palette */}
          <div className="flex gap-2">
            {["#000000", "#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"].map((c) => (
              <button
                key={c}
                onClick={() => handleColorChange(c)}
                className={`w-8 h-8 rounded-full border-2 ${color === c && tool === "pen" ? "border-gray-800" : "border-gray-300"}`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>

          {/* Brush Size */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Size:</span>
            <input
              type="range"
              min="1"
              max="50"
              value={brushSize}
              onChange={(e) => setBrushSize(e.target.value)}
              className="w-24"
            />
            <span className="text-sm w-6">{brushSize}</span>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={clearCanvas}
              className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg"
            >
              <Trash2 size={16} />
              <span>Clear</span>
            </button>
            <button
              onClick={saveCanvas}
              className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg"
            >
              <Download size={16} />
              <span>Save</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseMove={draw}
          className="border border-gray-300 rounded-lg shadow-lg cursor-crosshair bg-white"
        />
      </div>
    </div>
  );
};

export default Whiteboard;