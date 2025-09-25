"use client";

import { useEffect, useRef } from "react";
import rough from "roughjs";

interface RoughWalletProps {
  width?: number;
  height?: number;
  className?: string;
}

export function RoughWallet({ width = 160, height = 120, className = "" }: RoughWalletProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rc = rough.canvas(canvas);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, width, height);
    
    // Draw wallet body
    rc.rectangle(width * 0.2, height * 0.3, width * 0.6, height * 0.5, {
      stroke: '#7c3aed',
      strokeWidth: 2,
      roughness: 1.4,
      fill: 'rgba(124, 58, 237, 0.1)',
      fillStyle: 'hachure',
      hachureAngle: -45,
      hachureGap: 6
    });
    
    // Draw wallet flap/closure
    rc.rectangle(width * 0.25, height * 0.25, width * 0.5, height * 0.15, {
      stroke: '#7c3aed',
      strokeWidth: 2,
      roughness: 1.2,
      fill: 'rgba(124, 58, 237, 0.2)',
      fillStyle: 'solid'
    });
    
    // Draw connection symbol (wifi-like)
    const centerX = width * 0.5;
    const centerY = height * 0.55;
    
    // Three curved lines representing connection
    for (let i = 0; i < 3; i++) {
      const radius = 15 + (i * 8);
      const points: [number, number][] = [];
      for (let angle = -45; angle <= 45; angle += 5) {
        const radian = (angle * Math.PI) / 180;
        const x = centerX + Math.cos(radian) * radius;
        const y = centerY + Math.sin(radian) * radius * 0.6;
        points.push([x, y]);
      }
      
      rc.curve(points, {
        stroke: '#10b981',
        strokeWidth: 2,
        roughness: 1.0
      });
    }
    
    // Add "WALLET" text
    ctx.font = 'bold 10px sans-serif';
    ctx.fillStyle = '#7c3aed';
    ctx.textAlign = 'center';
    ctx.fillText('WALLET', width * 0.5, height * 0.75);
    
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