"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileCode2, 
  Terminal, 
  Files, 
  Search, 
  GitBranch, 
  Settings,
  ChevronDown,
  FolderOpen
} from "lucide-react";

// Inline custom SVG GitHub icon to prevent Lucide brand icon import failures
const GithubIcon = ({ size = 12, color = "currentColor" }) => (
  <svg
    height={size}
    width={size}
    viewBox="0 0 16 16"
    fill={color}
    style={{ display: "inline-block", verticalAlign: "middle" }}
  >
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

export default function Laptop3D() {
  const [mounted, setMounted] = useState(false);
  const [activeScreen, setActiveScreen] = useState(1); // 1: developer.js | 2: terminal | 3: github

  useEffect(() => {
    setMounted(true);
    
    // Cycle screens/tabs every 5 seconds
    const interval = setInterval(() => {
      setActiveScreen((prev) => (prev % 3) + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ 
        opacity: 1, 
        y: [0, -10, 0] // Slow float physics
      }}
      transition={{
        opacity: { duration: 0.8 },
        y: {
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
      style={{
        width: "100%",
        maxWidth: "600px",
        height: "380px",
        position: "relative",
        zIndex: 4,
      }}
    >
      <style>{`
        .ide-container {
          width: 100%;
          height: 100%;
          background: rgba(8, 11, 20, 0.82);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 212, 255, 0.03);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-primary);
        }

        /* Ambient Glow plate behind the IDE mockup card */
        .ide-glow-plate {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80%;
          height: 70%;
          border-radius: 40px;
          background: radial-gradient(circle, rgba(0, 212, 255, 0.12) 0%, rgba(0, 255, 136, 0.02) 60%, transparent 100%);
          filter: blur(40px);
          pointer-events: none;
          z-index: -1;
        }

        .ide-window-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 16px;
          background: rgba(5, 7, 13, 0.95);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          user-select: none;
        }

        .ide-body {
          display: flex;
          flex: 1;
          overflow: hidden;
        }

        /* Activity sidebar - VS Code Style */
        .ide-activity-bar {
          width: 48px;
          background: rgba(3, 5, 9, 0.95);
          border-right: 1px solid rgba(255, 255, 255, 0.04);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 16px 0;
          color: #475569;
        }

        .ide-activity-icon {
          cursor: pointer;
          transition: color 0.2s ease;
          padding: 8px;
        }

        .ide-activity-icon.active {
          color: var(--accent-blue);
          border-left: 2px solid var(--accent-blue);
        }

        .ide-activity-icon:hover {
          color: var(--text-primary);
        }

        /* Folder tree sidebar */
        .ide-sidebar {
          width: 140px;
          background: rgba(6, 8, 15, 0.9);
          border-right: 1px solid rgba(255, 255, 255, 0.04);
          padding: 16px 12px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          user-select: none;
        }

        .sidebar-section-header {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          color: #475569;
          letter-spacing: 0.5px;
        }

        .file-item {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 4px 6px;
          border-radius: 4px;
          cursor: pointer;
          color: var(--text-secondary);
          transition: all 0.2s ease;
          font-size: 11px;
        }

        .file-item.active {
          background: rgba(255, 255, 255, 0.04);
          color: var(--text-primary);
        }

        .file-item:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.02);
        }

        /* Editor window */
        .ide-editor {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: rgba(8, 11, 20, 0.4);
        }

        .editor-tabs {
          display: flex;
          background: rgba(5, 7, 13, 0.9);
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
          overflow-x: auto;
        }

        .editor-tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          border-right: 1px solid rgba(255, 255, 255, 0.04);
          color: var(--text-secondary);
          cursor: pointer;
          user-select: none;
          transition: all 0.2s ease;
          font-size: 11px;
        }

        .editor-tab.active {
          background: rgba(8, 11, 20, 0.82);
          color: var(--text-primary);
          border-top: 2px solid var(--accent-blue);
        }

        .editor-content {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
          text-align: left;
          line-height: 1.6;
        }

        .editor-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6px 16px;
          background: rgba(5, 7, 13, 0.95);
          border-top: 1px solid rgba(255, 255, 255, 0.04);
          font-size: 10px;
          color: #475569;
          user-select: none;
        }

        /* Hide sidebars on smaller viewports */
        @media (max-width: 600px) {
          .ide-activity-bar, .ide-sidebar {
            display: none;
          }
          .ide-container {
            border-radius: 12px;
          }
        }
      `}</style>

      {/* Glowing neon backplate */}
      <div className="ide-glow-plate" />

      {/* VS Code IDE Panel UI */}
      <div className="ide-container">
        {/* Window controls bar */}
        <div className="ide-window-bar">
          <div style={{ display: "flex", gap: "6px" }}>
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ff5f56" }}></span>
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ffbd2e" }}></span>
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#27c93f" }}></span>
          </div>
          <div style={{ fontSize: "10px", color: "#475569", letterSpacing: "0.5px" }}>
            workspace - akhil-portfolio
          </div>
          <div style={{ width: "42px" }}></div>
        </div>

        {/* Workspace Body */}
        <div className="ide-body">
          {/* Activity Bar icons */}
          <div className="ide-activity-bar">
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "center" }}>
              <Files size={18} className="ide-activity-icon active" />
              <Search size={18} className="ide-activity-icon" />
              <GitBranch size={18} className="ide-activity-icon" />
            </div>
            <Settings size={18} className="ide-activity-icon" />
          </div>

          {/* Folder Tree Sidebar */}
          <div className="ide-sidebar">
            <div className="sidebar-section-header">
              <ChevronDown size={10} />
              <span>Explorer</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--text-primary)", fontSize: "11px", fontWeight: "600", marginBottom: "4px" }}>
                <FolderOpen size={12} style={{ color: "var(--accent-blue)" }} />
                <span>portfolio</span>
              </div>
              
              <div 
                className={`file-item ${activeScreen === 1 ? 'active' : ''}`}
                onClick={() => setActiveScreen(1)}
              >
                <FileCode2 size={12} style={{ color: "#e2b826" }} />
                <span>developer.js</span>
              </div>
              <div 
                className={`file-item ${activeScreen === 2 ? 'active' : ''}`}
                onClick={() => setActiveScreen(2)}
              >
                <Terminal size={12} style={{ color: "var(--accent-green)" }} />
                <span>terminal</span>
              </div>
              <div 
                className={`file-item ${activeScreen === 3 ? 'active' : ''}`}
                onClick={() => setActiveScreen(3)}
              >
                <GithubIcon size={12} color="var(--accent-blue)" />
                <span>activity.md</span>
              </div>
            </div>
          </div>

          {/* Main Code Editor pane */}
          <div className="ide-editor">
            {/* Horizontal Editor tabs */}
            <div className="editor-tabs">
              <div 
                className={`editor-tab ${activeScreen === 1 ? 'active' : ''}`}
                onClick={() => setActiveScreen(1)}
              >
                <FileCode2 size={11} style={{ color: "#e2b826" }} />
                <span>developer.js</span>
              </div>
              <div 
                className={`editor-tab ${activeScreen === 2 ? 'active' : ''}`}
                onClick={() => setActiveScreen(2)}
              >
                <Terminal size={11} style={{ color: "var(--accent-green)" }} />
                <span>terminal</span>
              </div>
              <div 
                className={`editor-tab ${activeScreen === 3 ? 'active' : ''}`}
                onClick={() => setActiveScreen(3)}
              >
                <GithubIcon size={11} color="var(--accent-blue)" />
                <span>activity.md</span>
              </div>
            </div>

            {/* Active Content area (animated cross-fades) */}
            <div className="editor-content">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeScreen}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  style={{ height: "100%" }}
                >
                  {activeScreen === 1 && <DeveloperCodeTab />}
                  {activeScreen === 2 && <TerminalLogsTab />}
                  {activeScreen === 3 && <GitHubGraphTab />}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Editor Footer Status bar */}
            <div className="editor-footer">
              <span>LF &nbsp; UTF-8 &nbsp; JS</span>
              <span style={{ color: "var(--accent-green)", display: "flex", alignItems: "center", gap: "4px" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--accent-green)", display: "inline-block" }}></span>
                ✓ live compilation
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// 2a. Content View 1: Syntax Highlighted Profile Code
function DeveloperCodeTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px", fontFamily: "var(--font-mono)", fontSize: "12.5px", lineHeight: "1.5", color: "var(--text-primary)" }}>
      <div>
        <span className="syntax-keyword">const</span> developer = &#123;
      </div>
      <div style={{ paddingLeft: "18px" }}>
        name: <span className="syntax-string">"Akhil Kumar"</span>,
      </div>
      <div style={{ paddingLeft: "18px" }}>
        role: <span className="syntax-string">"Final Year CSE Student"</span>,
      </div>
      <div style={{ paddingLeft: "18px" }}>
        stack: [<span className="syntax-string">"React"</span>, <span className="syntax-string">"Node.js"</span>, <span className="syntax-string">"Java"</span>]
      </div>
      <div>
        &#125;;
      </div>
      <div style={{ height: "4px" }} />
      <div>
        <span className="syntax-keyword">export default</span> developer;
      </div>
    </div>
  );
}

// 2b. Content View 2: Successful Terminal Build log
function TerminalLogsTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "12.5px" }}>
      <div style={{ color: "#475569", display: "flex", gap: "8px" }}>
        <span>$</span>
        <span>npm run build</span>
      </div>
      <div style={{ color: "var(--accent-green)", fontWeight: "600", display: "flex", alignItems: "center", gap: "6px" }}>
        <span>✓</span>
        <span>Compiled Successfully</span>
      </div>
      <div style={{ color: "#64748b", fontSize: "11px", lineHeight: "1.5", borderLeft: "2px solid rgba(255,255,255,0.06)", paddingLeft: "10px" }}>
        File sizes checked. Production build optimized.<br/>
        Deploying page bundle static routes to Vercel...
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ color: "var(--accent-green)", marginRight: "6px" }}>$</span>
        <span
          style={{
            width: "6px",
            height: "12px",
            background: "var(--accent-green)",
            display: "inline-block",
            animation: "blink 1s step-end infinite",
          }}
        />
      </div>
    </div>
  );
}

// 2c. Content View 3: GitHub contributions board mockup
function GitHubGraphTab() {
  const rows = 7;
  const cols = 26; // expanded to fit nicely in 2D card width
  
  const getColor = (r, c) => {
    const rand = Math.sin(r * 2.5 + c * 4.2) * 5 + Math.cos(c - r) * 2.1;
    const val = Math.abs(Math.floor(rand)) % 5;
    switch (val) {
      case 0: return "#101625"; 
      case 1: return "#0e4429"; 
      case 2: return "#006d32"; 
      case 3: return "#26a641"; 
      case 4: return "#39d353"; 
      default: return "#101625";
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", height: "100%", justifyContent: "center" }}>
      <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginBottom: "4px" }}>
        Consistent Contributions in the past year
      </div>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} style={{ display: "flex", gap: "3px" }}>
            {Array.from({ length: cols }).map((_, c) => (
              <div
                key={c}
                style={{
                  width: "11px",
                  height: "11px",
                  borderRadius: "2px",
                  backgroundColor: getColor(r, c),
                }}
              />
            ))}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "8px", fontSize: "10px", color: "#475569", marginTop: "12px", alignItems: "center" }}>
        <span>Less</span>
        <div style={{ width: "9px", height: "9px", background: "#101625", borderRadius: "1px" }} />
        <div style={{ width: "9px", height: "9px", background: "#0e4429", borderRadius: "1px" }} />
        <div style={{ width: "9px", height: "9px", background: "#006d32", borderRadius: "1px" }} />
        <div style={{ width: "9px", height: "9px", background: "#26a641", borderRadius: "1px" }} />
        <div style={{ width: "9px", height: "9px", background: "#39d353", borderRadius: "1px" }} />
        <span>More</span>
      </div>
    </div>
  );
}
