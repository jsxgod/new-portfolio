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
    let x = event.nativeEvent.offsetX;
    let y = event.nativeEvent.offsetY;
    if (event.nativeEvent.type === "touchstart") {
      const rect = event.target.getBoundingClientRect();
      x =
        ((event.touches[0].clientX - rect.x) / rect.width) *
        event.target.offsetWidth;
      y =
        ((event.touches[0].clientY - rect.y) / rect.height) *
        event.target.offsetHeight;
    }
    canvasContextRef.current.beginPath();
    canvasContextRef.current.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (event) => {
    if (!isDrawing) {
      return;
    }
    let x = event.nativeEvent.offsetX;
    let y = event.nativeEvent.offsetY;
    if (event.nativeEvent.type === "touchmove") {
      const rect = event.target.getBoundingClientRect();
      x =
        ((event.touches[0].clientX - rect.x) / rect.width) *
        event.target.offsetWidth;
      y =
        ((event.touches[0].clientY - rect.y) / rect.height) *
        event.target.offsetHeight;
    }
    canvasContextRef.current.lineTo(x, y);
    canvasContextRef.current.stroke();
  };

  const stopDrawing = () => {
    canvasContextRef.current.closePath();
    setIsDrawing(false);
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
      onTouchStart={(e) => startDrawing(e)}
      onTouchMove={(e) => draw(e)}
      onTouchEnd={() => stopDrawing()}
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
