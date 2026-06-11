"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate, AnimatePresence } from "framer-motion";
import { Calendar, Award, Trophy, Users, Clock, ArrowRight } from "lucide-react";

// Count up Counter component utilizing framer-motion animate helper
function Counter({ value, isFloat = false }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    const node = ref.current;
    if (!node) return;

    const target = parseFloat(value);
    
    const controls = animate(0, target, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1], // easeOutExpo
      onUpdate(latestValue) {
        node.textContent = isFloat ? latestValue.toFixed(2) : Math.round(latestValue);
      },
    });

    return () => controls.stop();
  }, [isInView, value, isFloat]);

  return <span ref={ref}>0</span>;
}

export default function Achievements() {
  const [activePhoto, setActivePhoto] = useState("team"); // "team" | "certificate"
  const [hoveredYear, setHoveredYear] = useState("Ongoing"); // Default focus on the current ongoing CSE B.Tech

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const timelineData = [
    {
      year: "2021",
      title: "CBSE 10th Grade — 90%",
      subtitle: "Vikas The Concept School",
      description: "Completed secondary school curriculum (CBSE) scoring 90% in Hyderabad, India (Jun 2020 – Apr 2021), laying strong analytical and science foundations."
    },
    {
      year: "2023",
      title: "Intermediate (MPC) — 96.4%",
      subtitle: "Resonance Junior College",
      description: "Graduated with 96.4% in intermediate education specializing in Mathematics, Physics, and Chemistry (MPC) in Hyderabad, India (May 2021 – Jun 2023)."
    },
    {
      year: "Ongoing",
      title: "B.Tech in Computer Science & Engineering",
      subtitle: "BV Raju Institute of Technology",
      description: "Pursuing B.Tech in CSE at BV Raju Institute of Technology (Aug 2023 – Aug 2027) in Hyderabad, India. Currently holding a GPA of 8.74 and building full-stack products."
    }
  ];

  return (
    <section id="achievements" className="achievements-section" ref={containerRef}>
      {/* Visual background decorations */}
      <div className="achievements-bg-grid" />
      <div className="achievements-glow-radial" />
      
      {/* Floating Trophy Outline SVG decoration */}
      <div className="floating-trophy-dec">
        <svg viewBox="0 0 24 24" width="220" height="220" fill="none" stroke="rgba(255, 255, 255, 0.015)" strokeWidth="0.5">
          <path d="M6 9H4.5a2.5 2.5 0 010-5H6M18 9h1.5a2.5 2.5 0 000-5H18M4 22h16M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34M12 2a6 6 0 016 6v5a6 6 0 01-6 6 6 6 0 01-6-6V8a6 6 0 016-6z" />
        </svg>
      </div>

      <div className="achievements-container">
        {/* Section Header */}
        <div className="achievements-header">
          <span className="achievements-badge">&gt; achievements.log</span>
          <h2 className="achievements-title">
            Milestones & Achievements<span className="achievements-cursor">_</span>
          </h2>
          <p className="achievements-subtitle">
            Moments that shaped my journey as a developer.
          </p>
        </div>

        {/* Featured hackathon achievement panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="featured-achievement-card"
        >
          <div className="featured-badge">[🏆 FEATURED ACHIEVEMENT]</div>
          
          <div className="achievement-layout-grid">
            
            {/* Left side: Interactive image container */}
            <div className="achievement-left-showcase">
              <div className="slideshow-frame">
                <AnimatePresence mode="wait">
                  {activePhoto === "team" ? (
                    <motion.img
                      key="team"
                      src="/images/krithoathon_team.png"
                      alt="Akhil and Team at KRITHOATHON 3.0"
                      initial={{ opacity: 0, scale: 1.02, filter: "blur(4px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                      transition={{ duration: 0.4 }}
                      className="showcase-img"
                    />
                  ) : (
                    <motion.img
                      key="certificate"
                      src="/images/krithoathon_certificate.jpg"
                      alt="Certificate of Merit - 2nd Place"
                      initial={{ opacity: 0, scale: 1.02, filter: "blur(4px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                      transition={{ duration: 0.4 }}
                      className="showcase-img"
                    />
                  )}
                </AnimatePresence>

                {/* Slideshow image overlay scanline */}
                <div className="slideshow-scanline" />
              </div>

              {/* Slider image toggle buttons */}
              <div className="slideshow-controls">
                <button
                  className={`toggle-btn ${activePhoto === "team" ? "active" : ""}`}
                  onClick={() => setActivePhoto("team")}
                >
                  &gt; view_team_photo.sh
                </button>
                <button
                  className={`toggle-btn ${activePhoto === "certificate" ? "active" : ""}`}
                  onClick={() => setActivePhoto("certificate")}
                >
                  &gt; view_certificate.exe
                </button>
              </div>
            </div>

            {/* Right side: Trophy Details */}
            <div className="achievement-right-details">
              <div className="trophy-row">
                <div className="trophy-glowing-badge">
                  <Trophy size={28} className="trophy-icon" />
                </div>
                <div className="trophy-meta">
                  <h3 className="achievement-title-text">Secured 2nd Place at KRITHOATHON 3.0</h3>
                  <span className="event-date-badge"><Calendar size={12} className="meta-icon" /> April 2025</span>
                </div>
              </div>

              <p className="achievement-desc-text">
                Achieved 2nd Place at KRITHOATHON 3.0, a 24-hour national-level hackathon hosted at VNR VJIET. Collaborated in a fast-paced environment to design, build, and present an innovative solution under strict time constraints.
              </p>

              <div className="tag-badges-title">PROJECT SPECIFICATIONS:</div>
              <div className="tag-badges-list">
                <span className="spec-tag">24-Hour Hackathon</span>
                <span className="spec-tag">National Level Event</span>
                <span className="spec-tag">Team Collaboration</span>
                <span className="spec-tag">Rapid Prototyping</span>
              </div>
            </div>
          </div>

          {/* Event Statistics Panel */}
          <div className="event-stats-panel">
            <div className="stats-metric-card">
              <div className="metric-header">
                <Award size={18} className="metric-icon" />
                <span className="metric-title">Position</span>
              </div>
              <div className="metric-value">
                <Counter value="2" />nd Place
              </div>
            </div>

            <div className="stats-metric-card">
              <div className="metric-header">
                <Clock size={18} className="metric-icon" />
                <span className="metric-title">Duration</span>
              </div>
              <div className="metric-value">
                <Counter value="24" /> Hours
              </div>
            </div>

            <div className="stats-metric-card">
              <div className="metric-header">
                <Trophy size={18} className="metric-icon" />
                <span className="metric-title">Category</span>
              </div>
              <div className="metric-value text-small">
                National Event
              </div>
            </div>

            <div className="stats-metric-card">
              <div className="metric-header">
                <Users size={18} className="metric-icon" />
                <span className="metric-title">Format</span>
              </div>
              <div className="metric-value text-small">
                Team Competition
              </div>
            </div>
          </div>
        </motion.div>

        {/* Developer Journey Timeline */}
        <div className="timeline-block-section">
          <div className="timeline-section-header">
            <span className="timeline-badge">&gt; developer_journey.timeline</span>
          </div>

          <div className="horizontal-timeline-track">
            {/* Horizontal Line connector */}
            <div className="timeline-connecting-line" />

            <div className="timeline-nodes-row">
              {timelineData.map((node) => {
                const isFocused = hoveredYear === node.year;
                return (
                  <div
                    key={node.year}
                    className={`timeline-node ${isFocused ? "focused" : ""}`}
                    onMouseEnter={() => setHoveredYear(node.year)}
                  >
                    <div className="timeline-dot-wrapper">
                      <div className="timeline-year-label">{node.year}</div>
                      <div className="timeline-indicator-dot" />
                    </div>
                    
                    <div className="timeline-node-card-min">
                      <div className="node-min-title">{node.title}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Expanded timeline active panel detail */}
          <div className="timeline-active-detail-panel">
            <AnimatePresence mode="wait">
              {timelineData.map((node) => {
                if (node.year !== hoveredYear) return null;
                return (
                  <motion.div
                    key={node.year}
                    initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="timeline-expanded-card"
                  >
                    <div className="timeline-expanded-header">
                      <h4 className="expanded-year-badge">{node.year}</h4>
                      <div className="expanded-meta">
                        <div className="expanded-title">{node.title}</div>
                        <div className="expanded-subtitle">{node.subtitle}</div>
                      </div>
                    </div>
                    <p className="expanded-desc">{node.description}</p>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Section Exit log */}
        <div className="achievements-section-exit-row">
          <span className="exit-prompt">
            &gt; loading_contact.exe<span className="blink-cursor">_</span>
          </span>
        </div>

      </div>
    </section>
  );
}
