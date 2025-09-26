"use client";

import { useEffect, useRef } from "react";
import rough from "roughjs";

interface RoughCreatorProps {
  width?: number;
  height?: number;
  className?: string;
}

export function RoughCreator({ width = 120, height = 140, className = "" }: RoughCreatorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rc = rough.canvas(canvas);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, width, height);
    
    // Add hand-drawn "Meet the Creator" text at top
    ctx.font = '20px serif';
    ctx.fillStyle = '#374151';
    ctx.textAlign = 'center';
    ctx.save();
    ctx.translate(width * 0.5, height * 0.1);
    ctx.rotate(-0.05); // Slight rotation for hand-drawn feel
    ctx.fillText('Meet the', 0, 0);
    ctx.restore();
    
    ctx.save();
    ctx.translate(width * 0.5, height * 0.22);
    ctx.rotate(0.03); // Slight rotation in opposite direction
    ctx.fillText('Creator', 0, 0);
    ctx.restore();
    
    // Draw head (circle) - moved down to make space for text
    rc.circle(width * 0.5, height * 0.45, width * 0.4, {
      stroke: '#6b7280',
      strokeWidth: 2,
      roughness: 1.2,
      fill: 'rgba(254, 240, 138, 0.8)',
      fillStyle: 'solid'
    });
    
    // Draw body (rectangle)
    rc.rectangle(width * 0.35, height * 0.62, width * 0.3, height * 0.25, {
      stroke: '#6b7280',
      strokeWidth: 2,
      roughness: 1.2,
      fill: 'rgba(147, 197, 253, 0.7)',
      fillStyle: 'solid'
    });
    
    // Draw arms (lines)
    rc.line(width * 0.35, height * 0.7, width * 0.15, height * 0.82, {
      stroke: '#6b7280',
      strokeWidth: 2,
      roughness: 1.0
    });
    rc.line(width * 0.65, height * 0.7, width * 0.85, height * 0.82, {
      stroke: '#6b7280',
      strokeWidth: 2,
      roughness: 1.0
    });
    
    // Draw legs (lines)
    rc.line(width * 0.42, height * 0.87, width * 0.35, height * 0.98, {
      stroke: '#6b7280',
      strokeWidth: 2,
      roughness: 1.0
    });
    rc.line(width * 0.58, height * 0.87, width * 0.65, height * 0.98, {
      stroke: '#6b7280',
      strokeWidth: 2,
      roughness: 1.0
    });
    
    // Draw eyes (small circles)
    rc.circle(width * 0.45, height * 0.42, 3, {
      stroke: '#374151',
      strokeWidth: 1,
      fill: '#374151',
      fillStyle: 'solid'
    });
    rc.circle(width * 0.55, height * 0.42, 3, {
      stroke: '#374151',
      strokeWidth: 1,
      fill: '#374151',
      fillStyle: 'solid'
    });
    
    // Draw smile (arc)
    rc.arc(width * 0.5, height * 0.46, 15, 15, 0.2, 2.94, false, {
      stroke: '#374151',
      strokeWidth: 2,
      roughness: 1.0
    });
    
    // Draw laptop/computer (rectangle)
    rc.rectangle(width * 0.75, height * 0.75, width * 0.2, height * 0.12, {
      stroke: '#6b7280',
      strokeWidth: 1.5,
      roughness: 1.0,
      fill: 'rgba(107, 114, 128, 0.5)',
      fillStyle: 'solid'
    });
    
    // Draw screen (smaller rectangle)
    rc.rectangle(width * 0.77, height * 0.77, width * 0.16, height * 0.06, {
      stroke: '#374151',
      strokeWidth: 1,
      roughness: 0.8,
      fill: 'rgba(34, 197, 94, 0.3)',
      fillStyle: 'solid'
    });
    
    // Add speech bubble with X
    rc.ellipse(width * 0.25, height * 0.35, width * 0.18, height * 0.12, {
      stroke: '#6b7280',
      strokeWidth: 1.5,
      roughness: 1.2,
      fill: 'rgba(255, 255, 255, 0.9)',
      fillStyle: 'solid'
    });
    
    // Add "X" text in speech bubble
    ctx.font = 'bold 14px serif';
    ctx.fillStyle = '#1d4ed8';
    ctx.textAlign = 'center';
    ctx.fillText('𝕏', width * 0.25, height * 0.38);
    
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