"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// Platform inline SVG logos for clean performance
const LeetCodeLogo = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="#F59E0B">
    <path d="M13.483 0a1.374 1.374 0 00-.961.411l-3.02 3.021a1.09 1.09 0 000 1.542l3.411 3.411a1.09 1.09 0 001.542 0l3.02-3.02a1.374 1.374 0 000-1.944L14.444.41A1.374 1.374 0 0013.483 0zm-5.467 5.467a1.09 1.09 0 00-.77.32l-5.7 5.7a1.374 1.374 0 000 1.944l3.02 3.02a1.374 1.374 0 001.944 0l5.7-5.7a1.09 1.09 0 000-1.542l-3.411-3.411a1.09 1.09 0 00-.775-.321zm2.392 6.78a.82.82 0 00-.58.24l-3.02 3.02a.82.82 0 000 1.16l3.411 3.411a.82.82 0 001.16 0l3.02-3.02a.82.82 0 000-1.16l-3.411-3.411a.82.82 0 00-.58-.24z" />
  </svg>
);

const CodeforcesLogo = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" style={{ display: "inline-block" }}>
    <rect x="2" y="8" width="5" height="13" rx="1.5" fill="#3B82F6" />
    <rect x="9.5" y="2" width="5" height="19" rx="1.5" fill="#EF4444" />
    <rect x="17" y="11" width="5" height="10" rx="1.5" fill="#F59E0B" />
  </svg>
);

const CodeChefLogo = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="#D97706">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5zm-1.5-3.5c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm-4-3c-.55 0-1-.45-1-1V8.5c0-.55.45-1 1-1s1 .45 1 1V10c0 .55-.45 1-1 1z" />
  </svg>
);

export default function Skills() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const [terminalLogs, setTerminalLogs] = useState([]);
  const [logsComplete, setLogsComplete] = useState(false);
  const [hoveredNodeId, setHoveredNodeId] = useState(null);

  const categories = {
    languages: { label: "Languages", color: "#FFFFFF" },
    frontend: { label: "Frontend", color: "#00D4FF" },
    backend: { label: "Backend", color: "#00FF88" },
    databases: { label: "Databases", color: "#A855F7" },
    tools: { label: "Tools", color: "#F59E0B" }
  };

  const nodes = [
    // Languages
    { id: "js", label: "JavaScript", category: "languages", cx: 43, cy: 62, projects: ["CivicRoute", "HistoChat", "3D Portfolio Builder"] },
    { id: "java", label: "Java", category: "languages", cx: 57, cy: 62, projects: ["LeetCode Problem Solving", "Data Structures"] },
    // Frontend
    { id: "react", label: "React.js", category: "frontend", cx: 33, cy: 45, projects: ["CivicRoute", "HistoChat", "3D Portfolio Builder"] },
    { id: "reactnative", label: "React Native", category: "frontend", cx: 21, cy: 37, projects: ["Mobile Grievance App Prototype"] },
    { id: "r3f", label: "React Three Fiber", category: "frontend", cx: 28, cy: 54, projects: ["3D Portfolio Builder"] },
    { id: "html", label: "HTML5", category: "frontend", cx: 18, cy: 47, projects: ["CivicRoute", "HistoChat", "3D Portfolio Builder"] },
    { id: "css", label: "CSS3", category: "frontend", cx: 13, cy: 57, projects: ["CivicRoute", "HistoChat", "3D Portfolio Builder"] },
    { id: "tailwind", label: "Tailwind CSS", category: "frontend", cx: 20, cy: 67, projects: ["CivicRoute", "HistoChat"] },
    // Backend
    { id: "node", label: "Node.js", category: "backend", cx: 50, cy: 28, projects: ["CivicRoute", "HistoChat", "3D Portfolio Builder"] },
    { id: "express", label: "Express.js", category: "backend", cx: 40, cy: 20, projects: ["CivicRoute", "HistoChat"] },
    { id: "rest", label: "REST APIs", category: "backend", cx: 60, cy: 20, projects: ["CivicRoute", "3D Portfolio Builder"] },
    { id: "websockets", label: "WebSockets", category: "backend", cx: 50, cy: 12, projects: ["HistoChat Debate Engine"] },
    // Databases
    { id: "mongodb", label: "MongoDB", category: "databases", cx: 67, cy: 45, projects: ["CivicRoute", "HistoChat", "3D Portfolio Builder"] },
    { id: "mysql", label: "MySQL", category: "databases", cx: 79, cy: 37, projects: ["Student Grievance Database"] },
    // Tools
    { id: "git", label: "Git", category: "tools", cx: 65, cy: 54, projects: ["Version Control System"] },
    { id: "github", label: "GitHub", category: "tools", cx: 75, cy: 62, projects: ["Collaborative Repositories"] }
  ];

  const connections = [
    // Primary ecosystems
    { from: "react", to: "node" },
    { from: "node", to: "mongodb" },
    { from: "r3f", to: "react" },
    { from: "express", to: "rest" },
    
    // Core attachments
    { from: "core", to: "react" },
    { from: "core", to: "node" },
    { from: "core", to: "mongodb" },
    { from: "core", to: "js" },
    { from: "core", to: "git" },

    // Secondary nodes link
    { from: "react", to: "reactnative" },
    { from: "react", to: "html" },
    { from: "html", to: "css" },
    { from: "css", to: "tailwind" },
    { from: "node", to: "express" },
    { from: "node", to: "rest" },
    { from: "rest", to: "websockets" },
    { from: "mongodb", to: "mysql" },
    { from: "git", to: "github" },
    { from: "js", to: "java" }
  ];

  // Terminal loading sequence
  useEffect(() => {
    if (!isInView) return;

    const sequence = [
      { text: "> loading_languages...", delay: 0 },
      { text: "✓ complete", delay: 200 },
      { text: "> loading_frontend...", delay: 450 },
      { text: "✓ complete", delay: 650 },
      { text: "> loading_backend...", delay: 900 },
      { text: "✓ complete", delay: 1100 },
      { text: "> loading_databases...", delay: 1350 },
      { text: "✓ complete", delay: 1550 },
      { text: "> loading_tools...", delay: 1800 },
      { text: "✓ complete", delay: 2000 }
    ];

    sequence.forEach((step) => {
      setTimeout(() => {
        setTerminalLogs((prev) => [...prev, step.text]);
      }, step.delay);
    });

    setTimeout(() => {
      setLogsComplete(true);
    }, 2400);
  }, [isInView]);

  // Check if target is connected to current hovered node
  const isConnected = (nodeId) => {
    if (!hoveredNodeId) return false;
    if (nodeId === hoveredNodeId) return true;
    return connections.some(
      (c) => 
        (c.from === hoveredNodeId && c.to === nodeId) ||
        (c.to === hoveredNodeId && c.from === nodeId)
    );
  };

  const getCoordinates = (nodeId) => {
    if (nodeId === "core") return { x: 50, y: 50 };
    const node = nodes.find((n) => n.id === nodeId);
    return node ? { x: node.cx, y: node.cy } : { x: 50, y: 50 };
  };

  return (
    <section id="skills" ref={containerRef} className="skills-section">
      <div className="skills-bg-grid" />
      <div className="skills-glow-radial" />

      <div className="skills-container">
        
        {/* Terminal Loading Overlay */}
        <AnimatePresence>
          {!logsComplete && (
            <motion.div 
              key="terminal-entry"
              exit={{ opacity: 0, scale: 0.98, filter: "blur(6px)" }}
              transition={{ duration: 0.6 }}
              className="skills-intro-overlay"
            >
              <div className="intro-terminal-box">
                <div className="intro-terminal-bar">
                  <div className="window-controls">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                  </div>
                  <span className="bar-title">loader.sh</span>
                </div>
                <div className="intro-terminal-body">
                  {terminalLogs.map((log, index) => (
                    <div key={index} className={`log-line ${log.startsWith("✓") ? "success" : "loading"}`}>
                      {log}
                    </div>
                  ))}
                  <div className="log-line prompt">&gt; <span className="loader-cursor">_</span></div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Section Content (Tech Arsenal Map) */}
        {logsComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="skills-workspace-layout"
          >
            {/* Header */}
            <div className="skills-header">
              <span className="skills-badge">&gt; load_skills.exe</span>
              <h2 className="skills-title">
                Tech Arsenal<span className="skills-title-cursor">_</span>
              </h2>
              <p className="skills-subtitle">
                Technologies I use to build scalable products and immersive digital experiences.
              </p>
            </div>

            {/* Core Visualization Desk */}
            <div className="tech-map-canvas-container">
              {/* Interactive SVG Connection Network */}
              <svg className="tech-connections-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  {Object.entries(categories).map(([key, cat]) => (
                    <linearGradient key={key} id={`grad-${key}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={cat.color} stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#000000" stopOpacity="0.2" />
                    </linearGradient>
                  ))}
                </defs>

                {connections.map((c, idx) => {
                  const start = getCoordinates(c.from);
                  const end = getCoordinates(c.to);
                  const isHighlighted = hoveredNodeId && (c.from === hoveredNodeId || c.to === hoveredNodeId);
                  
                  // Color line based on connected category
                  const nodeFrom = nodes.find(n => n.id === c.from);
                  const nodeTo = nodes.find(n => n.id === c.to);
                  const category = (nodeFrom && nodeFrom.category) || (nodeTo && nodeTo.category) || "languages";
                  const color = categories[category]?.color || "#ffffff";

                  return (
                    <line
                      key={idx}
                      x1={`${start.x}%`}
                      y1={`${start.y}%`}
                      x2={`${end.x}%`}
                      y2={`${end.y}%`}
                      stroke={color}
                      strokeWidth={isHighlighted ? "0.35" : "0.15"}
                      strokeOpacity={isHighlighted ? "0.85" : "0.22"}
                      strokeDasharray={isHighlighted ? "1, 0.5" : "2, 3"}
                      className={`conn-path ${isHighlighted ? "active-pulse" : ""}`}
                      style={{
                        transition: "stroke-width 0.3s, stroke-opacity 0.3s, stroke-dasharray 0.3s"
                      }}
                    />
                  );
                })}
              </svg>

              {/* Developer Center Core */}
              <div 
                className={`developer-center-core ${hoveredNodeId === "core" ? "core-expand" : ""}`}
                style={{ left: "50%", top: "50%" }}
              >
                <div className="core-orbit-ring ring-1"></div>
                <div className="core-orbit-ring ring-2"></div>
                <div className="core-glow-body">
                  <span className="core-text">AKHIL.EXE</span>
                </div>
              </div>

              {/* Orbiting technology nodes */}
              {nodes.map((node) => {
                const catInfo = categories[node.category];
                const active = hoveredNodeId === node.id;
                const connectedToHover = isConnected(node.id) && !active;

                return (
                  <div
                    key={node.id}
                    className={`tech-node-wrapper ${active ? "node-active" : ""} ${connectedToHover ? "node-connected-hover" : ""}`}
                    style={{
                      left: `${node.cx}%`,
                      top: `${node.cy}%`,
                      "--node-accent-color": catInfo.color
                    }}
                    onMouseEnter={() => setHoveredNodeId(node.id)}
                    onMouseLeave={() => setHoveredNodeId(null)}
                  >
                    {/* Floating Glass Node Orb */}
                    <div className="tech-node-orb">
                      <span className="node-icon" style={{ borderColor: catInfo.color }}>
                        {node.label.charAt(0)}
                      </span>
                      <span className="node-label">{node.label}</span>
                    </div>

                    {/* Expand Detail Pop Card */}
                    <AnimatePresence>
                      {active && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="node-expand-detail-card"
                          style={{ borderColor: catInfo.color }}
                        >
                          <h4 className="detail-node-name" style={{ color: catInfo.color }}>
                            {node.label}
                          </h4>
                          
                          <div className="detail-meta-row">
                            <span className="detail-label">CATEGORY:</span>
                            <span className="detail-val" style={{ color: catInfo.color }}>
                              {catInfo.label}
                            </span>
                          </div>

                          <div className="detail-projects-list">
                            <span className="detail-label">PROJECTS:</span>
                            {node.projects.map((proj, pIdx) => (
                              <div key={pIdx} className="detail-project-item">
                                <span className="bullet">→</span> {proj}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Competitive Programming Dashboard */}
            <div className="competitive-dashboard-section">
              <div className="cp-header">
                <span className="cp-badge">&gt; competitive_programming.stats</span>
                <h3 className="cp-title">Competitive Programming</h3>
                <p className="cp-subtitle">Problem solving, algorithms, and continuous learning.</p>
              </div>

              <div className="cp-dashboard-grid">
                {/* LeetCode Card */}
                <div className="cp-card-wrapper">
                  <div className="cp-card">
                    <div className="cp-card-scanline" />
                    
                    {/* Background low-opacity code snippet */}
                    <pre className="cp-code-snippet">
                      {`vector<int> dp(n);
for (int i = 1; i < n; i++) {
    dp[i] = max(dp[i-1], dp[i] + val);
}`}
                    </pre>

                    <div className="cp-card-inner">
                      <div className="cp-platform-row">
                        <LeetCodeLogo />
                        <h4 className="cp-platform-title">LeetCode</h4>
                      </div>

                      <div className="cp-stats-grid">
                        <div className="cp-stat-item">
                          <span className="val">350+</span>
                          <span className="lbl">Solved</span>
                        </div>
                        <div className="cp-stat-item">
                          <span className="val">1705</span>
                          <span className="lbl">Max Rating</span>
                        </div>
                        <div className="cp-stat-item">
                          <span className="val">Active</span>
                          <span className="lbl">Badges</span>
                        </div>
                      </div>

                      <a 
                        href="https://leetcode.com/u/Akhil_kumar_3517/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="cp-terminal-cta"
                      >
                        &gt; open_profile.exe <ArrowUpRight size={13} className="cta-icon" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Codeforces Card */}
                <div className="cp-card-wrapper">
                  <div className="cp-card codeforces-theme">
                    <div className="cp-card-scanline" />
                    
                    <pre className="cp-code-snippet">
                      {`int solve() {
    int n; cin >> n;
    vector<int> a(n);
    for (int &x : a) cin >> x;
    sort(a.begin(), a.end());
    return a[n-1] - a[0];
}`}
                    </pre>

                    <div className="cp-card-inner">
                      <div className="cp-platform-row">
                        <CodeforcesLogo />
                        <h4 className="cp-platform-title">Codeforces</h4>
                      </div>

                      <div className="cp-stats-grid">
                        <div className="cp-stat-item">
                          <span className="val">150+</span>
                          <span className="lbl">Solved</span>
                        </div>
                        <div className="cp-stat-item">
                          <span className="val">1251</span>
                          <span className="lbl">Max Rating</span>
                        </div>
                        <div className="cp-stat-item">
                          <span className="val">Newbie</span>
                          <span className="lbl">Rank</span>
                        </div>
                      </div>

                      <a 
                        href="https://codeforces.com/profile/Akhil3517" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="cp-terminal-cta"
                      >
                        &gt; open_profile.exe <ArrowUpRight size={13} className="cta-icon" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* CodeChef Card */}
                <div className="cp-card-wrapper">
                  <div className="cp-card codechef-theme">
                    <div className="cp-card-scanline" />
                    
                    <pre className="cp-code-snippet">
                      {`while(t--) {
    int x, y;
    cin >> x >> y;
    cout << (x * 10 + y * 5) << "\\n";
}`}
                    </pre>

                    <div className="cp-card-inner">
                      <div className="cp-platform-row">
                        <CodeChefLogo />
                        <h4 className="cp-platform-title">CodeChef</h4>
                      </div>

                      <div className="cp-stats-grid">
                        <div className="cp-stat-item">
                          <span className="val">100+</span>
                          <span className="lbl">Solved</span>
                        </div>
                        <div className="cp-stat-item">
                          <span className="val">1488</span>
                          <span className="lbl">Rating (2★)</span>
                        </div>
                        <div className="cp-stat-item">
                          <span className="val">1488</span>
                          <span className="lbl">Max Rating</span>
                        </div>
                      </div>

                      <a 
                        href="https://www.codechef.com/users/akhil_3517" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="cp-terminal-cta"
                      >
                        &gt; open_profile.exe <ArrowUpRight size={13} className="cta-icon" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section Exit log */}
            <div className="skills-section-exit-row">
              <span className="exit-prompt">&gt; loading_achievements.exe<span className="blink-cursor">_</span></span>
            </div>

          </motion.div>
        )}
      </div>
    </section>
  );
}
