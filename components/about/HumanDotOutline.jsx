"use client";

import { useEffect, useRef, useState } from "react";

// Helper to generate rounded rectangle outline points
function generateRoundedRectPoints(x, y, width, height, radius, step = 6) {
  const points = [];
  
  // top edge
  for (let px = x + radius; px <= x + width - radius; px += step) {
    points.push({ x: px, y: y });
  }
  // bottom edge
  for (let px = x + radius; px <= x + width - radius; px += step) {
    points.push({ x: px, y: y + height });
  }
  // left edge
  for (let py = y + radius; py <= y + height - radius; py += step) {
    points.push({ x: x, y: py });
  }
  // right edge
  for (let py = y + radius; py <= y + height - radius; py += step) {
    points.push({ x: x + width, y: py });
  }

  // Draw corners
  const drawCorner = (cx, cy, startAngle, endAngle) => {
    const numSteps = Math.ceil((radius * (endAngle - startAngle)) / step);
    for (let i = 0; i <= numSteps; i++) {
      const angle = startAngle + (endAngle - startAngle) * (i / numSteps);
      points.push({
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius,
      });
    }
  };

  // top-left
  drawCorner(x + radius, y + radius, Math.PI, Math.PI * 1.5);
  // top-right
  drawCorner(x + width - radius, y + radius, Math.PI * 1.5, Math.PI * 2);
  // bottom-right
  drawCorner(x + width - radius, y + height - radius, 0, Math.PI * 0.5);
  // bottom-left
  drawCorner(x + radius, y + height - radius, Math.PI * 0.5, Math.PI);

  return points;
}

export default function HumanDotOutline({ gesture = "normal" }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 200, y: 200, active: false });
  const pointsRef = useRef([]);

  // Generate the robot dot coordinates on mount
  useEffect(() => {
    const points = [];

    // Monochrome Gray Palette (Slate scales for dark theme focus)
    const colorPrimary = "rgba(148, 163, 184, 0.75)"; // Slate-400 (limbs/body)
    const colorSecondary = "rgba(100, 116, 139, 0.85)"; // Slate-500 (screen bezel)
    const colorWhite = "rgba(248, 250, 252, 0.95)"; // Slate-50 (eyes)
    
    // Faint grays for chest buttons
    const colorBtn1 = "rgba(148, 163, 184, 0.9)";
    const colorBtn2 = "rgba(100, 116, 139, 0.9)";
    const colorBtn3 = "rgba(71, 85, 105, 0.9)";
    const colorBtn4 = "rgba(51, 65, 85, 0.9)";

    // 1. Robot Head screen outer bezel (Green screen, rounded)
    const bezelPoints = generateRoundedRectPoints(135, 55, 130, 105, 22, 6);
    bezelPoints.forEach((p) => {
      points.push({
        baseX: p.x,
        baseY: p.y,
        x: p.x,
        y: p.y,
        vx: 0,
        vy: 0,
        type: "head",
        size: 2.2,
        opacity: 0.9,
        color: colorSecondary,
      });
    });

    // 2. Torso (Cyan body, rounded)
    const torsoPoints = generateRoundedRectPoints(155, 190, 90, 80, 16, 6);
    torsoPoints.forEach((p) => {
      points.push({
        baseX: p.x,
        baseY: p.y,
        x: p.x,
        y: p.y,
        vx: 0,
        vy: 0,
        type: "torso",
        size: 2.0,
        opacity: 0.8,
        color: colorPrimary,
      });
    });

    // 3. Neck
    for (let y = 160; y <= 190; y += 6) {
      points.push({
        baseX: 194,
        baseY: y,
        x: 194,
        y,
        vx: 0,
        vy: 0,
        type: "neck",
        size: 2.0,
        opacity: 0.7,
        color: colorPrimary,
      });
      points.push({
        baseX: 206,
        baseY: y,
        x: 206,
        y,
        vx: 0,
        vy: 0,
        type: "neck",
        size: 2.0,
        opacity: 0.7,
        color: colorPrimary,
      });
    }

    // 4. Chest Buttons (Pink, Yellow, Cyan, Green block grids)
    const drawBtn = (cx, cy, color) => {
      const offsets = [
        { dx: -3, dy: -3 },
        { dx: 3, dy: -3 },
        { dx: -3, dy: 3 },
        { dx: 3, dy: 3 },
      ];
      offsets.forEach((o) => {
        points.push({
          baseX: cx + o.dx,
          baseY: cy + o.dy,
          x: cx + o.dx,
          y: cy + o.dy,
          vx: 0,
          vy: 0,
          type: "torso",
          size: 2.0,
          opacity: 0.95,
          color,
        });
      });
    };
    drawBtn(182, 215, colorBtn1);
    drawBtn(218, 215, colorBtn2);
    drawBtn(182, 245, colorBtn3);
    drawBtn(218, 245, colorBtn4);

    // 5. Left Leg & Foot
    for (let y = 270; y <= 315; y += 6) {
      points.push({
        baseX: 184,
        baseY: y,
        x: 184,
        y,
        vx: 0,
        vy: 0,
        type: "leg-left",
        size: 2.0,
        opacity: 0.75,
        color: colorPrimary,
      });
    }
    // Left Foot
    for (let x = 172; x <= 196; x += 6) {
      points.push({
        baseX: x,
        baseY: 320,
        x,
        y: 320,
        vx: 0,
        vy: 0,
        type: "leg-left",
        size: 2.2,
        opacity: 0.95,
        color: colorPrimary,
      });
    }

    // 6. Right Leg & Foot
    for (let y = 270; y <= 315; y += 6) {
      points.push({
        baseX: 216,
        baseY: y,
        x: 216,
        y,
        vx: 0,
        vy: 0,
        type: "leg-right",
        size: 2.0,
        opacity: 0.75,
        color: colorPrimary,
      });
    }
    // Right Foot
    for (let x = 204; x <= 228; x += 6) {
      points.push({
        baseX: x,
        baseY: 320,
        x,
        y: 320,
        vx: 0,
        vy: 0,
        type: "leg-right",
        size: 2.2,
        opacity: 0.95,
        color: colorPrimary,
      });
    }

    // 7. Left Arm (Shoulder: 155, 200)
    // Left hand base positions
    const leftShoulderX = 155, leftShoulderY = 200;
    const leftHandNormalX = 95, leftHandNormalY = 250;
    const leftHandHappyX = 90, leftHandHappyY = 100; // Hand raised high!
    const leftElbowNormalX = 120, leftElbowNormalY = 230;
    const leftElbowHappyX = 115, leftElbowHappyY = 145;

    // We generate 12 points for the Left Arm segment
    const numArmPoints = 8;
    for (let i = 1; i <= numArmPoints; i++) {
      const t = i / numArmPoints;
      // Normal arm path
      let nX, nY;
      if (t <= 0.5) {
        const subT = t * 2;
        nX = leftShoulderX + (leftElbowNormalX - leftShoulderX) * subT;
        nY = leftShoulderY + (leftElbowNormalY - leftShoulderY) * subT;
      } else {
        const subT = (t - 0.5) * 2;
        nX = leftElbowNormalX + (leftHandNormalX - leftElbowNormalX) * subT;
        nY = leftElbowNormalY + (leftHandNormalY - leftElbowNormalY) * subT;
      }

      // Happy arm path
      let hX, hY;
      if (t <= 0.5) {
        const subT = t * 2;
        hX = leftShoulderX + (leftElbowHappyX - leftShoulderX) * subT;
        hY = leftShoulderY + (leftElbowHappyY - leftShoulderY) * subT;
      } else {
        const subT = (t - 0.5) * 2;
        hX = leftElbowHappyX + (leftHandHappyX - leftElbowHappyX) * subT;
        hY = leftElbowHappyY + (leftHandHappyY - leftElbowHappyY) * subT;
      }

      points.push({
        baseX: nX,
        baseY: nY,
        happyX: hX,
        happyY: hY,
        x: nX,
        y: nY,
        vx: 0,
        vy: 0,
        type: "arm-left",
        jointT: t,
        size: 1.8,
        opacity: 0.7,
        color: colorPrimary,
      });
    }

    // 8. Left Hand (Normal hand center: 95, 250 | Happy hand center: 90, 100)
    for (let a = 0; a < Math.PI * 2; a += 1.2) {
      const hX = Math.cos(a) * 6;
      const hY = Math.sin(a) * 6;
      points.push({
        baseX: leftHandNormalX + hX,
        baseY: leftHandNormalY + hY,
        happyX: leftHandHappyX + hX,
        happyY: leftHandHappyY + hY,
        x: leftHandNormalX + hX,
        y: leftHandNormalY + hY,
        vx: 0,
        vy: 0,
        type: "hand-left",
        size: 2.2,
        opacity: 0.95,
        color: colorPrimary,
      });
    }

    // 9. Right Arm (Shoulder: 245, 200)
    const rightShoulderX = 245, rightShoulderY = 200;
    const rightHandNormalX = 305, rightHandNormalY = 250;
    const rightHandHappyX = 310, rightHandHappyY = 100; // Hand raised high!
    const rightElbowNormalX = 280, rightElbowNormalY = 230;
    const rightElbowHappyX = 285, rightElbowHappyY = 145;

    for (let i = 1; i <= numArmPoints; i++) {
      const t = i / numArmPoints;
      // Normal arm path
      let nX, nY;
      if (t <= 0.5) {
        const subT = t * 2;
        nX = rightShoulderX + (rightElbowNormalX - rightShoulderX) * subT;
        nY = rightShoulderY + (rightElbowNormalY - rightShoulderY) * subT;
      } else {
        const subT = (t - 0.5) * 2;
        nX = rightElbowNormalX + (rightHandNormalX - rightElbowNormalX) * subT;
        nY = rightElbowNormalY + (rightHandNormalY - rightElbowNormalY) * subT;
      }

      // Happy arm path
      let hX, hY;
      if (t <= 0.5) {
        const subT = t * 2;
        hX = rightShoulderX + (rightElbowHappyX - rightShoulderX) * subT;
        hY = rightShoulderY + (rightElbowHappyY - rightShoulderY) * subT;
      } else {
        const subT = (t - 0.5) * 2;
        hX = rightElbowHappyX + (rightHandHappyX - rightElbowHappyX) * subT;
        hY = rightElbowHappyY + (rightHandHappyY - rightElbowHappyY) * subT;
      }

      points.push({
        baseX: nX,
        baseY: nY,
        happyX: hX,
        happyY: hY,
        x: nX,
        y: nY,
        vx: 0,
        vy: 0,
        type: "arm-right",
        jointT: t,
        size: 1.8,
        opacity: 0.7,
        color: colorPrimary,
      });
    }

    // 10. Right Hand (Normal hand center: 305, 250 | Happy hand center: 310, 100)
    for (let a = 0; a < Math.PI * 2; a += 1.2) {
      const hX = Math.cos(a) * 6;
      const hY = Math.sin(a) * 6;
      points.push({
        baseX: rightHandNormalX + hX,
        baseY: rightHandNormalY + hY,
        happyX: rightHandHappyX + hX,
        happyY: rightHandHappyY + hY,
        x: rightHandNormalX + hX,
        y: rightHandNormalY + hY,
        vx: 0,
        vy: 0,
        type: "hand-right",
        size: 2.2,
        opacity: 0.95,
        color: colorPrimary,
      });
    }

    // 11. Eyes (Normal: 9 dots block | Happy: Arch curve ^)
    const leftEyeCx = 175, leftEyeCy = 105;
    const rightEyeCx = 225, rightEyeCy = 105;
    
    // Left Eye 9 points
    const eyeOffsets = [
      { dx: -4, dy: -6 }, { dx: 0, dy: -6 }, { dx: 4, dy: -6 },
      { dx: -4, dy: 0 },  { dx: 0, dy: 0 },  { dx: 4, dy: 0 },
      { dx: -4, dy: 6 },  { dx: 0, dy: 6 },  { dx: 4, dy: 6 },
    ];
    // Left eye happy arch points ^
    const archOffsets = [
      { dx: -8, dy: 4 },
      { dx: -6, dy: 1 },
      { dx: -4, dy: -2 },
      { dx: -2, dy: -5 },
      { dx: 0,  dy: -6 },
      { dx: 2,  dy: -5 },
      { dx: 4,  dy: -2 },
      { dx: 6,  dy: 1 },
      { dx: 8,  dy: 4 },
    ];

    eyeOffsets.forEach((o, index) => {
      // Left eye
      points.push({
        baseX: leftEyeCx + o.dx,
        baseY: leftEyeCy + o.dy,
        happyX: leftEyeCx + archOffsets[index].dx,
        happyY: leftEyeCy + archOffsets[index].dy,
        x: leftEyeCx + o.dx,
        y: leftEyeCy + o.dy,
        vx: 0,
        vy: 0,
        type: "eye-left",
        size: 2.0,
        opacity: 0.95,
        color: colorWhite,
      });

      // Right eye
      points.push({
        baseX: rightEyeCx + o.dx,
        baseY: rightEyeCy + o.dy,
        happyX: rightEyeCx + archOffsets[index].dx,
        happyY: rightEyeCy + archOffsets[index].dy,
        x: rightEyeCx + o.dx,
        y: rightEyeCy + o.dy,
        vx: 0,
        vy: 0,
        type: "eye-right",
        size: 2.0,
        opacity: 0.95,
        color: colorWhite,
      });
    });

    pointsRef.current = points;
  }, []);

  // Animation Loop using requestAnimationFrame
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;

    // spring physics constants
    const spring = 0.08;
    const friction = 0.83;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Mouse displacements calculations
      let headShiftX = 0;
      let headShiftY = 0;
      let faceShiftX = 0;
      let faceShiftY = 0;
      let leftHandShiftX = 0;
      let leftHandShiftY = 0;
      let rightHandShiftX = 0;
      let rightHandShiftY = 0;

      if (mouse.active) {
        // 1. Head displacement (screen tilt)
        const hdx = mouse.x - 200;
        const hdy = mouse.y - 110;
        const hdist = Math.sqrt(hdx * hdx + hdy * hdy) || 1;
        
        // head bezel moves up to 15px
        headShiftX = (hdx / hdist) * Math.min(hdist * 0.07, 15);
        headShiftY = (hdy / hdist) * Math.min(hdist * 0.07, 15);

        // face features (eyes) tilt further (24px) for 3D parallax depth
        faceShiftX = (hdx / hdist) * Math.min(hdist * 0.12, 24);
        faceShiftY = (hdy / hdist) * Math.min(hdist * 0.12, 24);

        // 2. Left Hand mouse attract (only when not in happy waving state)
        if (gesture !== "happy") {
          const lhdx = mouse.x - 95;
          const lhdy = mouse.y - 250;
          const lhdist = Math.sqrt(lhdx * lhdx + lhdy * lhdy) || 1;
          if (lhdist < 260) {
            leftHandShiftX = (lhdx / lhdist) * Math.min(lhdist * 0.25, 50);
            leftHandShiftY = (lhdy / lhdist) * Math.min(lhdist * 0.25, 50);
          }

          // 3. Right Hand mouse attract
          const rhdx = mouse.x - 305;
          const rhdy = mouse.y - 250;
          const rhdist = Math.sqrt(rhdx * rhdx + rhdy * rhdy) || 1;
          if (rhdist < 260) {
            rightHandShiftX = (rhdx / rhdist) * Math.min(rhdist * 0.25, 50);
            rightHandShiftY = (rhdy / rhdist) * Math.min(rhdist * 0.25, 50);
          }
        }
      }

      // Update particle positions with spring damping and draw them
      pointsRef.current.forEach((p) => {
        // 1. Resolve base coordinate based on gesture state
        let targetX = (gesture === "happy" && p.happyX !== undefined) ? p.happyX : p.baseX;
        let targetY = (gesture === "happy" && p.happyY !== undefined) ? p.happyY : p.baseY;

        // 2. Add mouse tracking parallax offset
        if (p.type === "head") {
          targetX += headShiftX;
          targetY += headShiftY;
        } else if (p.type.startsWith("eye-")) {
          targetX += faceShiftX;
          targetY += faceShiftY;
        } else if (p.type === "neck") {
          targetX += headShiftX * 0.6;
          targetY += headShiftY * 0.6;
        } else if (p.type === "shoulder") {
          targetX += headShiftX * 0.2;
          targetY += headShiftY * 0.2;
        } else if (p.type === "torso") {
          const swayFactor = (270 - p.baseY) / 80; // lower body sways less
          targetX += headShiftX * 0.1 * Math.max(swayFactor, 0);
          targetY += headShiftY * 0.1 * Math.max(swayFactor, 0);
        } else if (p.type === "arm-left") {
          // Normal/Happy path is already computed, we just apply joint tracking
          const armT = p.jointT; // 0 at shoulder, 1 at hand
          targetX += (headShiftX * 0.2) * (1 - armT) + leftHandShiftX * armT;
          targetY += (headShiftY * 0.2) * (1 - armT) + leftHandShiftY * armT;
        } else if (p.type === "hand-left") {
          targetX += leftHandShiftX;
          targetY += leftHandShiftY;
        } else if (p.type === "arm-right") {
          const armT = p.jointT;
          targetX += (headShiftX * 0.2) * (1 - armT) + rightHandShiftX * armT;
          targetY += (headShiftY * 0.2) * (1 - armT) + rightHandShiftY * armT;
        } else if (p.type === "hand-right") {
          targetX += rightHandShiftX;
          targetY += rightHandShiftY;
        }

        // 3. Spring equations
        const dx = targetX - p.x;
        const dy = targetY - p.y;
        p.vx = (p.vx + dx * spring) * friction;
        p.vy = (p.vy + dy * spring) * friction;
        p.x += p.vx;
        p.y += p.vy;

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        // Styling particles (matte dark theme slate dots, no glow)
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      // Joint connections for wireframe details
      if (pointsRef.current.length > 0) {
        ctx.strokeStyle = "rgba(0, 212, 255, 0.05)";
        ctx.lineWidth = 0.5;

        const drawLink = (idxA, idxB) => {
          const ptA = pointsRef.current[idxA];
          const ptB = pointsRef.current[idxB];
          if (ptA && ptB) {
            ctx.beginPath();
            ctx.moveTo(ptA.x, ptA.y);
            ctx.lineTo(ptB.x, ptB.y);
            ctx.stroke();
          }
        };

        // Draw structural links (shoulders to screen side joints)
        // Bezel points are indices 0-47 (approx 48 points)
        // Neck lines are around indices 128-137
        // Simply draw connecting elements to create structural wireframe feel
        drawLink(128, 130); // neck left to right
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [mouse, gesture]);

  // Global mouse coordinates listeners relative to section
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      
      const relativeX = e.clientX - rect.left;
      const relativeY = e.clientY - rect.top;
      
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      const section = document.getElementById("about");
      if (section) {
        const sectRect = section.getBoundingClientRect();
        if (
          e.clientY >= sectRect.top - 120 &&
          e.clientY <= sectRect.bottom + 120
        ) {
          setMouse({
            x: relativeX * scaleX,
            y: relativeY * scaleY,
            active: true,
          });
          return;
        }
      }
      
      setMouse({ x: 200, y: 200, active: false });
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="canvas-outline-container"
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden"
      }}
    >
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          background: "transparent",
        }}
      />
    </div>
  );
}
