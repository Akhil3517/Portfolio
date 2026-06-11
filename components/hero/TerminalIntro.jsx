"use client";

import { useEffect, useState, useRef } from "react";
import { Terminal, Check, Square } from "lucide-react";

export default function TerminalIntro({ onComplete }) {
  const [lines, setLines] = useState([]);
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const [isSkipped, setIsSkipped] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const skipRef = useRef(false);

  useEffect(() => {
    setIsMounted(true);
    // Check if intro has already played in this session
    const hasPlayed = sessionStorage.getItem("heroIntroPlayed") === "true";

    if (hasPlayed) {
      // Short 0.5s fast-path version
      setLines([
        "> INITIALIZING DEVELOPER PROFILE...",
        "PROGRESS: 100%",
        "> LOADING PROJECTS...",
        "✓ DONE",
        "> LOADING ACHIEVEMENTS...",
        "✓ DONE",
        "> VERIFYING SKILLS...",
        "✓ DONE",
        "> ACCESS GRANTED"
      ]);
      setProgress(100);
      setShowProgress(true);
      
      const timer = setTimeout(() => {
        onComplete();
      }, 600);
      return () => clearTimeout(timer);
    }

    // Full animation sequence
    const sequence = async () => {
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

      const addLine = async (text, typeDelay = 20) => {
        if (skipRef.current) return;
        let typedText = "";
        // Create an empty line placeholder
        setLines((prev) => [...prev, ""]);
        
        for (let i = 0; i < text.length; i++) {
          if (skipRef.current) return;
          typedText += text[i];
          setLines((prev) => {
            const next = [...prev];
            next[next.length - 1] = typedText;
            return next;
          });
          await delay(typeDelay);
        }
        await delay(100);
      };

      // 1. Initializing profile
      await addLine("> INITIALIZING DEVELOPER PROFILE...", 15);
      if (skipRef.current) return;

      // 2. Loading progress bar
      setShowProgress(true);
      const steps = 10;
      for (let i = 1; i <= steps; i++) {
        if (skipRef.current) return;
        setProgress(i * 10);
        await delay(120);
      }
      await delay(200);

      // 3. Projects
      await addLine("> LOADING PROJECTS...", 15);
      if (skipRef.current) return;
      await delay(150);
      await addLine("✓ DONE", 10);
      if (skipRef.current) return;

      // 4. Achievements
      await addLine("> LOADING ACHIEVEMENTS...", 15);
      if (skipRef.current) return;
      await delay(150);
      await addLine("✓ DONE", 10);
      if (skipRef.current) return;

      // 5. Skills
      await addLine("> VERIFYING SKILLS...", 15);
      if (skipRef.current) return;
      await delay(150);
      await addLine("✓ DONE", 10);
      if (skipRef.current) return;
      await delay(250);

      // 6. Access Granted
      await addLine("> ACCESS GRANTED", 25);
      if (skipRef.current) return;
      await delay(800);

      // Finish intro
      sessionStorage.setItem("heroIntroPlayed", "true");
      onComplete();
    };

    sequence();

    return () => {
      // Clean up in case component unmounts early
    };
  }, [onComplete]);

  // Handle manual skip on click
  const handleSkip = () => {
    if (skipRef.current || sessionStorage.getItem("heroIntroPlayed") === "true") return;
    
    skipRef.current = true;
    setIsSkipped(true);
    
    // Instantly fill state
    setLines([
      "> INITIALIZING DEVELOPER PROFILE...",
      "PROGRESS: 100%",
      "> LOADING PROJECTS...",
      "✓ DONE",
      "> LOADING ACHIEVEMENTS...",
      "✓ DONE",
      "> VERIFYING SKILLS...",
      "✓ DONE",
      "> ACCESS GRANTED"
    ]);
    setProgress(100);
    setShowProgress(true);
    
    sessionStorage.setItem("heroIntroPlayed", "true");
    setTimeout(() => {
      onComplete();
    }, 500);
  };

  // Render progress bar blocks
  const renderProgressBar = () => {
    const totalBlocks = 20;
    const filledBlocks = Math.round((progress / 100) * totalBlocks);
    const emptyBlocks = totalBlocks - filledBlocks;
    
    return (
      <span style={{ color: "#64748b" }}>
        [{"█".repeat(filledBlocks)}{" ".repeat(emptyBlocks)}] {progress}%
      </span>
    );
  };

  return (
    <div
      onClick={handleSkip}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#02040a",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        padding: "20px",
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: "100%",
          maxWidth: "600px",
          fontFamily: "var(--font-mono)",
          fontSize: "0.85rem",
          lineHeight: "1.6",
          textAlign: "left",
          overflow: "hidden",
          background: "#080b12",
          border: "1px solid rgba(255, 255, 255, 0.05)",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8)",
          transition: "transform 0.3s ease",
        }}
        onClick={(e) => e.stopPropagation()} // Prevent bubble so we can use container click for skip
      >
        {/* Terminal Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "rgba(10, 15, 30, 0.9)",
            padding: "10px 16px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
            userSelect: "none",
          }}
        >
          {/* OS Window Buttons */}
          <div style={{ display: "flex", gap: "8px" }}>
            <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ff5f56", display: "inline-block" }}></span>
            <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ffbd2e", display: "inline-block" }}></span>
            <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#27c93f", display: "inline-block" }}></span>
          </div>
          
          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--text-secondary)", fontSize: "0.75rem" }}>
            <Terminal size={14} style={{ color: "var(--accent-green)" }} />
            <span>developer@console: ~</span>
          </div>
          
          <div style={{ width: "52px" }}></div> {/* Balance spacers */}
        </div>

        {/* Terminal Body */}
        <div
          style={{
            padding: "24px",
            minHeight: "260px",
            color: "var(--text-primary)",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {lines.map((line, idx) => {
            const isDone = line === "✓ DONE";
            const isAccess = line === "> ACCESS GRANTED";
            let color = "var(--text-primary)";
            let marginLeft = "0px";

            if (isDone) {
              color = "var(--accent-green)";
              marginLeft = "12px";
            } else if (isAccess) {
              color = "var(--accent-green)";
            } else if (line.startsWith(">")) {
              color = "#64748b"; // Subtle slate-gray commands at start
            }

            return (
              <div key={idx} style={{ color, marginLeft, fontWeight: isAccess ? "bold" : "normal" }}>
                {line}
              </div>
            );
          })}

          {showProgress && progress < 100 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <div>{renderProgressBar()}</div>
            </div>
          )}

          {/* Cursor */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{
                width: "8px",
                height: "15px",
                background: "#64748b",
                display: "inline-block",
                animation: "blink 1s step-end infinite",
                marginLeft: "2px",
              }}
            />
          </div>

          <style>{`
            @keyframes blink {
              0%, 100% { opacity: 1; }
              50% { opacity: 0; }
            }
          `}</style>
        </div>

        {/* Footer skip helper */}
        {isMounted && sessionStorage.getItem("heroIntroPlayed") !== "true" && (
          <div
            style={{
              padding: "10px 16px",
              textAlign: "center",
              fontSize: "0.7rem",
              color: "var(--text-secondary)",
              borderTop: "1px solid rgba(255, 255, 255, 0.03)",
              background: "rgba(5, 8, 22, 0.4)",
              userSelect: "none",
            }}
          >
            Click anywhere to skip initialization sequence
          </div>
        )}
      </div>
    </div>
  );
}
