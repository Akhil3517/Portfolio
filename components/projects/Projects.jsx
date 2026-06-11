"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

export default function Projects() {
  const triggerRef = useRef(null);
  const cardsRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const projects = [
    {
      id: "01_civicroute",
      file: "CIVICROUTE.EXE",
      badge: "FEATURED PROJECT",
      title: "CivicRoute",
      subtitle: "AI-Powered Grievance Redressal Platform",
      description: "Built an LLM-powered complaint routing platform that intelligently classifies citizen grievances and maps them to the appropriate government portal across 50+ portals in 7+ Indian cities.",
      features: [
        "AI complaint classification",
        "Personalized complaint generation",
        "Portal-specific submission guidance",
        "Feedback-driven portal ranking"
      ],
      tech: ["React.js", "Node.js", "Express.js", "MongoDB", "LLM Integration"],
      previewType: "civicroute",
      githubUrl: "https://github.com/Akhil3517/redressal-hub"
    },
    {
      id: "02_portfolio_builder",
      file: "PORTFOLIO_BUILDER.EXE",
      badge: "CREATIVE TOOLS",
      title: "3D Portfolio Builder",
      subtitle: "Dynamic Live Editor with R3F",
      description: "Built interactive 3D portfolio templates with a live editor allowing users to add, remove, and reorder sections in real-time.",
      features: [
        "Real-time section editor",
        "Interactive 3D templates",
        "Unique portfolio URLs",
        "JWT authentication"
      ],
      tech: ["React.js", "React Three Fiber", "Node.js", "MongoDB", "JWT"],
      previewType: "builder",
      githubUrl: "https://github.com/Akhil3517/portfolio-builder"
    },
    {
      id: "03_histochat",
      file: "HISTOCHAT.EXE",
      badge: "AI EXPERIMENTS",
      title: "HistoChat",
      subtitle: "AI Historical Figure Debate Platform",
      description: "Debate with dynamically generated historical, fictional, and real-world characters through an AI-powered conversational system.",
      features: [
        "Dynamic character generation",
        "Real-time debate engine",
        "AI scoring and feedback",
        "Voice-enabled interaction"
      ],
      tech: ["React.js", "Node.js", "MongoDB", "WebSocket", "Wikipedia API", "LLM Integration"],
      previewType: "histochat",
      githubUrl: "https://github.com/Akhil3517/Cascade-Debate"
    }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = cardsRef.current;
    if (!cards || cards.length === 0) return;

    // Set initial state for Card 2 and Card 3 (offscreen, rotated, transparent)
    gsap.set(cards.slice(1), { opacity: 0, x: 350, rotationY: 8 });

    // GSAP ScrollTrigger timeline pinned to viewport scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        pin: true,
        scrub: 0.5,
        start: "top top",
        end: () => `+=${window.innerHeight * 2.2}`, // scroll distance
        onUpdate: (self) => {
          const progress = self.progress;
          let idx = 0;
          if (progress > 0.38 && progress <= 0.72) {
            idx = 1;
          } else if (progress > 0.72) {
            idx = 2;
          }
          setActiveIndex(idx);
        }
      }
    });

    // Phase 1: Card 1 exits, Card 2 enters
    tl.to(cards[0], {
      opacity: 0,
      x: -350,
      rotationY: -10,
      duration: 1,
      ease: "power2.inOut"
    }, 0);

    tl.to(cards[1], {
      opacity: 1,
      x: 0,
      rotationY: 0,
      duration: 1,
      ease: "power2.inOut"
    }, 0);

    // Phase 2: Card 2 exits, Card 3 enters
    tl.to(cards[1], {
      opacity: 0,
      x: -350,
      rotationY: -10,
      duration: 1,
      ease: "power2.inOut"
    }, 1.5);

    tl.to(cards[2], {
      opacity: 1,
      x: 0,
      rotationY: 0,
      duration: 1,
      ease: "power2.inOut"
    }, 1.5);

    return () => {
      // Clean up triggers on unmount
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const handleSidebarClick = (idx) => {
    // Scroll programmatically to trigger index section position Y
    const scrollPos = window.scrollY + triggerRef.current.getBoundingClientRect().top;
    const distancePerCard = window.innerHeight * 1.1; // proportional scroll trigger distance
    window.scrollTo({
      top: scrollPos + idx * distancePerCard,
      behavior: "smooth"
    });
  };

  return (
    <section id="projects" ref={triggerRef} className="projects-section">
      {/* Background decorations - consistent with hero but faint */}
      <div className="projects-bg-grid" />
      <div className="projects-glow-radial" />

      {/* Section Header */}
      <div className="projects-header">
        <span className="projects-badge">[ PROJECTS ]</span>
        <h2 className="projects-title">
          Things I've Built<span className="projects-cursor">_</span>
        </h2>
        <p className="projects-subtitle">Full-stack applications. Real problems solved.</p>
      </div>

      <div className="projects-workspace">
        {/* Left Sidebar persistent terminal explorer */}
        <div className="projects-sidebar">
          <div className="sidebar-path">&gt; user@akhil:~$</div>
          <div className="sidebar-command">&gt; ls projects/</div>
          <div className="sidebar-list">
            {projects.map((p, idx) => (
              <div
                key={p.id}
                onClick={() => handleSidebarClick(idx)}
                className={`sidebar-item ${activeIndex === idx ? "active" : ""}`}
              >
                <span className="item-cursor">{activeIndex === idx ? "● " : "  "}</span>
                {p.id}
              </div>
            ))}
          </div>

          <div className="sidebar-status-box">
            <div className="status-label">&gt; status</div>
            <div className="status-log">Building products</div>
            <div className="status-log">Solving problems</div>
            <div className="status-log">Making impact</div>
            <div className="status-log active">&gt; []</div>
          </div>

          <div className="scroll-indicator-mouse">
            <div className="mouse-icon">
              <span className="scroll-wheel" />
            </div>
            <span className="mouse-txt">SCROLL</span>
          </div>
        </div>

        {/* Central absolute stacked cards viewport */}
        <div className="projects-viewport">
          {projects.map((p, idx) => (
            <div
              key={p.id}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="project-card-wrapper"
              style={{ 
                zIndex: projects.length - idx,
                pointerEvents: activeIndex === idx ? "auto" : "none"
              }}
            >
              {/* OS Terminal window wrapper */}
              <div className="project-card">
                <div className="card-window-bar">
                  <div className="window-controls">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                  </div>
                  <div className="window-filename">{p.file}</div>
                  <div className="window-featured">[{p.badge}]</div>
                </div>

                <div className="card-body">
                  {/* Left Column: Details */}
                  <div className="card-details">
                    <h3 className="project-name">{p.title} <span className="subtitle-desc">— {p.subtitle}</span></h3>
                    <p className="project-desc">{p.description}</p>
                    
                    <div className="project-features">
                      {p.features.map((f, i) => (
                        <div key={i} className="feature-item">
                          <span className="feature-arrow">→</span> {f}
                        </div>
                      ))}
                    </div>

                    <div className="project-tech-title">TECH STACK:</div>
                    <div className="project-tech-list">
                      {p.tech.map((t, i) => (
                        <span key={i} className="tech-badge">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="project-cta-row">
                      <a 
                        href={p.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="project-cta-btn"
                      >
                        &gt; run_project.exe <ArrowUpRight size={14} className="cta-icon" />
                      </a>
                    </div>
                  </div>

                  {/* Right Column: HTML/CSS Mockups */}
                  <div className="card-preview">
                    {p.previewType === "civicroute" && <CivicRoutePreview />}
                    {p.previewType === "builder" && <BuilderPreview />}
                    {p.previewType === "histochat" && <HistoChatPreview />}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Sidebar HUD progress rail */}
        <div className="projects-hud">
          {projects.map((p, idx) => {
            const isActive = activeIndex === idx;
            return (
              <div key={p.id} className="hud-node-wrapper">
                <span className={`hud-number ${isActive ? "active" : ""}`}>
                  {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                </span>
                {idx < projects.length - 1 && (
                  <div className={`hud-line ${activeIndex > idx ? "passed" : ""}`}>
                    {isActive && (
                      <motion.div 
                        layoutId="activeHudDot" 
                        className="hud-active-glow-dot" 
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// --------------------------------------------------------------------------
// MOCKUPS HTML/CSS
// --------------------------------------------------------------------------

function CivicRoutePreview() {
  return (
    <div className="mockup-browser">
      <div className="browser-header">
        <span className="browser-dot" />
        <span className="browser-dot" />
        <span className="browser-dot" />
        <div className="browser-url">civicroute.org/dashboard</div>
      </div>
      <div className="browser-content civicroute-layout">
        <div className="dashboard-grid">
          <div className="dashboard-left">
            <h4 className="mockup-heading">Find the right <span className="highlight">portal.</span> File it <span className="highlight">right.</span></h4>
            <p className="mockup-p">We route your complaint to the right government department and guide you to resolution.</p>
            <div className="mockup-input-box">
              <span className="mockup-placeholder">Describe your issue...</span>
              <button className="mockup-action-btn">Route Now</button>
            </div>
          </div>
          <div className="dashboard-right">
            <div className="mockup-svg-map">
              {/* Procedural India Nodes illustration */}
              <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", opacity: 0.8 }}>
                <path d="M 50 15 L 75 40 L 70 70 L 50 90 L 30 70 L 25 40 Z" fill="rgba(0, 255, 136, 0.03)" stroke="rgba(0, 255, 136, 0.15)" strokeWidth="0.8" />
                <circle cx="50" cy="45" r="3" fill="#00ff88" />
                <line x1="50" y1="45" x2="35" y2="60" stroke="#00ff88" strokeWidth="0.5" strokeDasharray="1,1" />
                <circle cx="35" cy="60" r="2" fill="#00ff88" opacity="0.6" />
                <line x1="50" y1="45" x2="65" y2="35" stroke="#00ff88" strokeWidth="0.5" strokeDasharray="1,1" />
                <circle cx="65" cy="35" r="2" fill="#00ff88" opacity="0.6" />
                <line x1="50" y1="45" x2="55" y2="78" stroke="#00d4ff" strokeWidth="0.8" />
                <circle cx="55" cy="78" r="3" fill="#00d4ff" />
              </svg>
            </div>
          </div>
        </div>
        <div className="mockup-stats-row">
          <div className="stat-pill-item"><span className="val">50+</span><span className="lbl">Government Portals</span></div>
          <div className="stat-pill-item"><span className="val">7+</span><span className="lbl">Indian Cities</span></div>
          <div className="stat-pill-item"><span className="val">98.2%</span><span className="lbl">Routing Accuracy</span></div>
          <div className="stat-pill-item"><span className="val">1200+</span><span className="lbl">Complaints Resolved</span></div>
        </div>
      </div>
    </div>
  );
}

function BuilderPreview() {
  return (
    <div className="mockup-browser">
      <div className="browser-header">
        <span className="browser-dot" />
        <span className="browser-dot" />
        <span className="browser-dot" />
        <div className="browser-url">3d-portfolio.io/editor</div>
      </div>
      <div className="browser-content builder-layout">
        <div className="editor-left-sidebar">
          <div className="editor-label">★ Templates</div>
          <div className="editor-list-item active">3D Globe</div>
          <div className="editor-list-item">Interactive Room</div>
          <div className="editor-list-item">Floating Nodes</div>
          <div className="editor-spacer" />
          <div className="editor-label">⚙ Sections</div>
          <div className="editor-list-item-drag"><span className="drag-icon">⠿</span> Header</div>
          <div className="editor-list-item-drag"><span className="drag-icon">⠿</span> About</div>
          <div className="editor-list-item-drag"><span className="drag-icon">⠿</span> Projects</div>
          <div className="editor-list-item-drag"><span className="drag-icon">⠿</span> Contact</div>
        </div>
        <div className="editor-preview-panel">
          <div className="grid-overlay" />
          {/* Wireframe Rotating Globe Mockup using CSS animation */}
          <div className="procedural-wireframe-globe">
            <svg viewBox="0 0 100 100" style={{ width: "130px", height: "130px", animation: "spin 12s linear infinite" }}>
              <style>{`
                @keyframes spin {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
                }
              `}</style>
              <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(0, 212, 255, 0.15)" strokeWidth="0.8" />
              <ellipse cx="50" cy="50" rx="45" ry="12" fill="none" stroke="rgba(0, 212, 255, 0.4)" strokeWidth="0.8" />
              <ellipse cx="50" cy="50" rx="12" ry="45" fill="none" stroke="rgba(0, 212, 255, 0.3)" strokeWidth="0.8" />
              <line x1="5" y1="50" x2="95" y2="50" stroke="rgba(0, 212, 255, 0.15)" strokeWidth="0.5" />
              <line x1="50" y1="5" x2="50" y2="95" stroke="rgba(0, 212, 255, 0.15)" strokeWidth="0.5" />
            </svg>
            <div className="preview-label">Your Name</div>
            <div className="preview-sub">Full Stack Developer</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HistoChatPreview() {
  return (
    <div className="mockup-browser">
      <div className="browser-header">
        <span className="browser-dot" />
        <span className="browser-dot" />
        <span className="browser-dot" />
        <div className="browser-url">histochat.ai/debate-room</div>
      </div>
      <div className="browser-content histochat-layout">
        <div className="chat-container">
          <div className="chat-bubbles-list">
            <div className="chat-bubble character">
              <span className="char-name">Albert Einstein</span>
              <p className="bubble-text">"Imagination is more important than knowledge. For knowledge is limited, whereas imagination embraces the entire world."</p>
            </div>
            <div className="chat-bubble user">
              <span className="user-name">You</span>
              <p className="bubble-text">What do you think about time travel? Is it possible using relativity?</p>
            </div>
          </div>
          
          <div className="debate-score-widget">
            <div className="score-header">
              <span>Debate Score</span>
              <span className="score-val">8.7/10</span>
            </div>
            <div className="score-bar"><div className="score-fill" style={{ width: "87%" }}></div></div>
            <p className="score-feedback">You used strong logic and supported your points well.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
