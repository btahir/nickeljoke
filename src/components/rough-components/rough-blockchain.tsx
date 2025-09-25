"use client";

import { useEffect, useRef } from "react";
import rough from "roughjs";

interface RoughBlockchainProps {
  width?: number;
  height?: number;
  className?: string;
}

export function RoughBlockchain({ width = 160, height = 120, className = "" }: RoughBlockchainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rc = rough.canvas(canvas);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, width, height);
    
    const blockWidth = width * 0.25;
    const blockHeight = height * 0.4;
    
    // Draw single block with "402"
    const x = width * 0.35;
    const y = height * 0.3;
    
    // Draw block rectangle
    rc.rectangle(x, y, blockWidth, blockHeight, {
      stroke: '#3b82f6',
      strokeWidth: 2,
      roughness: 1.3,
      fill: 'rgba(59, 130, 246, 0.1)',
      fillStyle: 'hachure',
      hachureAngle: 45,
      hachureGap: 6
    });
    
    // Add "402" text
    ctx.font = 'bold 12px monospace';
    ctx.fillStyle = '#1e40af';
    ctx.textAlign = 'center';
    ctx.fillText('402', x + blockWidth / 2, y + blockHeight / 2 + 4);
    
  }, [width, height]);
  
  return (
    <canvas 
      ref={canvasRef} 
      width={width} 
      height={height}
      className={className}
      style={{ maxWidth: '100%', height: 'auto' }}
    />
  );
}