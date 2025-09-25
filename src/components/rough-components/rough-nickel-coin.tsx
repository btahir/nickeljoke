"use client";

import { useEffect, useRef } from "react";
import rough from "roughjs";

interface RoughNickelCoinProps {
  width?: number;
  height?: number;
  className?: string;
}

export function RoughNickelCoin({ width = 100, height = 100, className = "" }: RoughNickelCoinProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rc = rough.canvas(canvas);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, width, height);
    
    // Draw outer coin circle
    rc.circle(width * 0.5, height * 0.5, width * 0.8, {
      stroke: '#6b7280',
      strokeWidth: 3,
      roughness: 1.2,
      fill: 'rgba(156, 163, 175, 0.3)',
      fillStyle: 'solid'
    });
    
    // Draw inner circle
    rc.circle(width * 0.5, height * 0.5, width * 0.65, {
      stroke: '#4b5563',
      strokeWidth: 2,
      roughness: 1.0,
      fill: 'none'
    });
    
    // Add "5¢" text
    ctx.font = 'bold 18px serif';
    ctx.fillStyle = '#374151';
    ctx.textAlign = 'center';
    ctx.fillText('5¢', width * 0.5, height * 0.55);
    
    // Add decorative ridges around the edge
    for (let i = 0; i < 12; i++) {
      const angle = (i * 30) * Math.PI / 180;
      const innerR = width * 0.35;
      const outerR = width * 0.4;
      const x1 = width * 0.5 + Math.cos(angle) * innerR;
      const y1 = height * 0.5 + Math.sin(angle) * innerR;
      const x2 = width * 0.5 + Math.cos(angle) * outerR;
      const y2 = height * 0.5 + Math.sin(angle) * outerR;
      
      rc.line(x1, y1, x2, y2, {
        stroke: '#6b7280',
        strokeWidth: 1,
        roughness: 0.8
      });
    }
    
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