"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate, useScroll, useTransform } from "framer-motion";
import HumanDotOutline from "./HumanDotOutline";

// Custom high-performance Counter using Framer Motion's animate function
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

export default function AboutMe() {
  const [gesture, setGesture] = useState("normal");
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-100px" });

  // Scroll Parallax for background blobs
  const { scrollY } = useScroll();
  const blob1Y = useTransform(scrollY, [200, 1500], [-30, 70]);
  const blob2Y = useTransform(scrollY, [200, 1500], [30, -70]);

  const stats = [
    {
      value: "350",
      suffix: "+",
      label: "DSA Problems Solved",
      isFloat: false,
    },
    {
      value: "8.74",
      suffix: "",
      label: "Cumulative CGPA",
      isFloat: true,
    },
    {
      value: "5",
      suffix: "+",
      label: "Major Projects Built",
      isFloat: false,
    },
  ];

  return (
    <section id="about" className="about-section">
      {/* Ambient background decoration - less technical, more organic */}
      <motion.div className="about-glow-blob blob-purple" style={{ y: blob1Y }} />
      <motion.div className="about-glow-blob blob-cyan" style={{ y: blob2Y }} />
      <div className="about-glow-radial" />

      <div className="about-container">
        
        {/* Left Column: Visual graphic workspace */}
        <motion.div
          initial={{ opacity: 0, x: -50, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="about-left"
        >
          <div className="workspace-image-frame">
            <div className="frame-overlay-glow" />
            <div className="frame-border-line" />
            
            {/* Ambient visual decorations */}
            <div className="glass-chip top-left">
              <span className="dot" /> Avatar.sys
            </div>
            
            <HumanDotOutline gesture={gesture} />
          </div>
        </motion.div>

        {/* Right Column: Narrative & Stats */}
        <div className="about-right">
          <motion.div
            ref={titleRef}
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">
              About Me
            </h2>
            <div className="section-title-line" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="about-text"
          >
            <p>
              I'm a Final Year Computer Science student passionate about building 
              scalable web applications and AI-powered solutions.
            </p>
            <p>
              My journey started with curiosity about how software works and evolved 
              into building full-stack products, participating in hackathons, and 
              solving hundreds of data structures and algorithms problems.
            </p>
          </motion.div>

          {/* Stats Glass Cards grid */}
          <div className="about-stats-grid">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ 
                  type: "spring", 
                  stiffness: 110, 
                  damping: 14, 
                  delay: 0.15 + index * 0.12 
                }}
                whileHover={{ y: -4, borderColor: "rgba(255, 255, 255, 0.15)" }}
                onMouseEnter={() => setGesture("happy")}
                onMouseLeave={() => setGesture("normal")}
                className="stat-card"
              >
                <div className="stat-value">
                  <Counter value={stat.value} isFloat={stat.isFloat} />
                  <span className="stat-suffix">{stat.suffix}</span>
                </div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-card-glow" />
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
