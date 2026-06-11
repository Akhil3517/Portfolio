"use client";

import { useEffect, useRef } from "react";

export default function BackgroundGrid() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, tx: -1000, ty: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Constellation Particle System (30 slow-moving technical nodes)
    const particles = [];
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2, // slow drift speed
        vy: (Math.random() - 0.5) * 0.2,
        radius: Math.random() * 1.5 + 1,
        blinkSpeed: 0.02 + Math.random() * 0.03,
        blinkPhase: Math.random() * Math.PI * 2,
        baseOpacity: 0.1 + Math.random() * 0.2,
      });
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      
      // Readjust particle positions to make sure they are within bounds
      particles.forEach(p => {
        if (p.x > width) p.x = Math.random() * width;
        if (p.y > height) p.y = Math.random() * height;
      });
    };

    const handleMouseMove = (e) => {
      mouseRef.current.tx = e.clientX;
      mouseRef.current.ty = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.tx = -1000;
      mouseRef.current.ty = -1000;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    mouseRef.current.x = -1000;
    mouseRef.current.y = -1000;

    const gridSpacing = 65;
    let pulseTime = 0;

    const draw = () => {
      pulseTime += 0.008;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      const mouse = mouseRef.current;
      if (mouse.tx > -500) {
        mouse.x += (mouse.tx - mouse.x) * 0.08;
        mouse.y += (mouse.ty - mouse.y) * 0.08;
      } else {
        mouse.x = -1000;
        mouse.y = -1000;
      }

      // Draw background layout color to preserve visual stack blending
      ctx.fillStyle = "#050816";
      ctx.fillRect(0, 0, width, height);

      // 1. Draw grid coordinate lines
      ctx.lineWidth = 1;
      
      // Vertical lines
      for (let x = 0; x < width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);

        const distToMouse = Math.abs(x - mouse.x);
        let opacity = 0.02; // very subtle baseline
        if (distToMouse < 200 && mouse.x > 0) {
          const ratio = 1 - distToMouse / 200;
          opacity = 0.02 + ratio * 0.03;
        }

        ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y < height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);

        const distToMouse = Math.abs(y - mouse.y);
        let opacity = 0.02;
        if (distToMouse < 200 && mouse.y > 0) {
          const ratio = 1 - distToMouse / 200;
          opacity = 0.02 + ratio * 0.03;
        }

        ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
        ctx.stroke();
      }

      // 2. Draw static grid intersection nodes
      for (let x = 0; x < width; x += gridSpacing) {
        for (let y = 0; y < height; y += gridSpacing) {
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          let dotRadius = 0.75;
          let dotOpacity = 0.06;

          if (dist < 180 && mouse.x > 0) {
            const ratio = 1 - dist / 180;
            dotRadius = 0.75 + ratio * 1.0;
            dotOpacity = 0.06 + ratio * 0.2;
          }

          ctx.beginPath();
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 255, 136, ${dotOpacity})`;
          ctx.fill();
        }
      }

      // 3. Update and draw drifting particle constellation
      particles.forEach((p) => {
        // Update positions
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around bounds
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Blinking phase math
        p.blinkPhase += p.blinkSpeed;
        const blinkValue = Math.sin(p.blinkPhase) * 0.5 + 0.5; // Oscillation 0 to 1
        const activeOpacity = p.baseOpacity * (0.3 + blinkValue * 0.7);

        // Interact with cursor proximity
        let hoverMultiplier = 1;
        let isCursorClose = false;
        
        if (mouse.x > 0) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distToMouse = Math.sqrt(dx * dx + dy * dy);
          
          if (distToMouse < 180) {
            isCursorClose = true;
            hoverMultiplier = 1.8;
            
            // Draw brief connecting line to cursor
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(0, 255, 136, ${0.03 * (1 - distToMouse / 180)})`;
            ctx.stroke();
          }
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * (isCursorClose ? 1.3 : 1), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${activeOpacity * hoverMultiplier})`;
        ctx.fill();
      });

      // Draw lines between particles that are close (mesh network)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const ratio = 1 - dist / 120;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.035 * ratio})`;
            ctx.stroke();
          }
        }
      }

      // 4. Subtle ambient spotlight cursor glow on the grid mesh
      if (mouse.x > 0) {
        const glowGrad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          200
        );
        glowGrad.addColorStop(0, "rgba(0, 212, 255, 0.05)");
        glowGrad.addColorStop(0.5, "rgba(0, 255, 136, 0.015)");
        glowGrad.addColorStop(1, "rgba(5, 8, 22, 0)");
        
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 200, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        display: "block",
      }}
    />
  );
}
