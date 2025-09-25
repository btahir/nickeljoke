"use client";

import { useEffect, useRef } from "react";
import rough from "roughjs";

interface RoughStarProps {
  width?: number;
  height?: number;
  text?: string;
  className?: string;
}

export function RoughStar({ width = 160, height = 120, text = "Ha Ha!", className = "" }: RoughStarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rc = rough.canvas(canvas);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, width, height);
    
    // Draw star shape
    const centerX = width * 0.5;
    const centerY = height * 0.4;
    const outerRadius = width * 0.25;
    const innerRadius = outerRadius * 0.4;
    const spikes = 6;
    
    const starPoints: [number, number][] = [];
    for (let i = 0; i < spikes * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i * Math.PI) / spikes;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      starPoints.push([x, y]);
    }
    
    rc.polygon(starPoints, {
      stroke: '#f43f5e',
      strokeWidth: 2,
      roughness: 1.5,
      fill: 'rgba(255, 255, 255, 0.9)',
      fillStyle: 'solid'
    });
    
    // Add text in center of star
    ctx.font = 'bold 16px sans-serif';
    ctx.fillStyle = '#f43f5e';
    ctx.textAlign = 'center';
    ctx.fillText('LOL', centerX, centerY + 5);
    
  }, [width, height, text]);
  
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