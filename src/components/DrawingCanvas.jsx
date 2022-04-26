import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const DrawingCanvas = ({
  color = "black",
  initial,
  canvasRef,
  canvasContextRef,
}) => {
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;

    const canvasContext = canvas.getContext("2d");
    canvasContext.scale(2, 2);
    canvasContext.lineCap = "round";
    canvasContext.lineWidth = 5;

    canvasContextRef.current = canvasContext;
  }, []);

  useEffect(() => {
    if (initial !== null) {
      canvasContextRef.current.clearRect(
        0,
        0,
        canvasRef.width,
        canvasRef.height
      );
    }
  }, [initial]);

  useEffect(() => {
    canvasContextRef.current.strokeStyle = color;
  }, [color]);

  const startDrawing = (event) => {
    const x = event.nativeEvent.offsetX;
    const y = event.nativeEvent.offsetY;
    canvasContextRef.current.beginPath();
    canvasContextRef.current.moveTo(x, y);
    setIsDrawing(true);
  };

  const stopDrawing = () => {
    canvasContextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = (event) => {
    if (!isDrawing) {
      return;
    }
    const x = event.nativeEvent.offsetX;
    const y = event.nativeEvent.offsetY;
    canvasContextRef.current.lineTo(x, y);
    canvasContextRef.current.stroke();
  };

  return (
    <motion.canvas
      id="drawing-board"
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(e) => startDrawing(e)}
      onMouseUp={() => stopDrawing()}
      onMouseMove={(e) => draw(e)}
      onMouseEnter={() => {
        document.querySelector(".custom-cursor").classList.add("brush");
        document.querySelector(".custom-cursor").style.backgroundColor = color;
      }}
      onMouseLeave={() => {
        document.querySelector(".custom-cursor").classList.remove("brush");
        document.querySelector(".custom-cursor").style.backgroundColor =
          "#e2e3ff";
      }}
    ></motion.canvas>
  );
};

export default DrawingCanvas;
