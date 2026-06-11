"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Custom inline SVG icons to prevent Turbopack compilation errors with brand icons
const GithubIcon = ({ size = 18, color = "currentColor" }) => (
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

const LinkedinIcon = ({ size = 18, color = "currentColor" }) => (
  <svg
    height={size}
    width={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: "inline-block", verticalAlign: "middle" }}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Projects", id: "projects" },
    { label: "Skills", id: "skills" },
    { label: "Achievements", id: "achievements" },
    { label: "Contact", id: "contact" }
  ];

  useEffect(() => {
    const sections = navItems.map(item => item.id);
    
    const handleScroll = () => {
      // Morph navbar on scroll
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Scroll Spy logic
      let currentSection = "home";
      const scrollPos = window.scrollY + 120; // offset for nav height

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          if (scrollPos >= elementTop) {
            currentSection = sectionId;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run immediately on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of floating navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Stagger variants for mobile terminal navigation lines
  const menuContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -25, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className={`portfolio-navbar ${isScrolled ? "scrolled" : ""}`}
      >
        <div className="nav-container">
          {/* Left: Minimal Monospace Logo */}
          <div className="nav-left">
            <motion.div
              whileHover={{ 
                scale: 1.06, 
                rotate: 5,
                boxShadow: "0 0 15px rgba(0, 212, 255, 0.4)",
                borderColor: "rgba(0, 212, 255, 0.5)"
              }}
              className="logo-container"
              onClick={() => handleNavClick("home")}
            >
              &lt;AK /&gt;
            </motion.div>
          </div>

          {/* Center: Desktop Navigation Links */}
          <div className="nav-center">
            <div className="nav-links-list">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <div
                    key={item.id}
                    className={`nav-link-wrapper ${isActive ? "active" : ""}`}
                    onClick={() => handleNavClick(item.id)}
                  >
                    <span className="nav-link-text">
                      {isActive && (
                        <motion.span 
                          layoutId="activeBracketLeft" 
                          className="bracket-glow"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        >
                          [{" "}
                        </motion.span>
                      )}
                      {item.label}
                      {isActive && (
                        <motion.span 
                          layoutId="activeBracketRight" 
                          className="bracket-glow"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        >
                          {" "}]
                        </motion.span>
                      )}
                    </span>
                    {isActive && (
                      <motion.span
                        layoutId="activeUnderline"
                        className="active-underline"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="hover-light" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Socials, Resume, Status */}
          <div className="nav-right">
            {/* Status indicator */}
            <div className="status-pill">
              <span className="status-dot" />
              <span className="status-text">OPEN TO OPPORTUNITIES</span>
            </div>

            {/* Social link buttons */}
            <div className="social-links">
              <motion.a
                href="https://github.com/Akhil3517"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, scale: 1.05 }}
                className="social-btn"
                aria-label="GitHub"
              >
                <GithubIcon size={16} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/akhil-kumar-reddy-ambati-a34a792a9/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, scale: 1.05 }}
                className="social-btn"
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={16} />
              </motion.a>
            </div>

            <motion.a
              href="https://drive.google.com/file/d/1VhFwAV6XulngkFbd9FcH-78fWxoMFiDl/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 0 15px rgba(0, 212, 255, 0.25)"
              }}
              className="resume-btn"
            >
              Resume
            </motion.a>

            {/* Mobile Terminal Menu Button */}
            <button 
              className={`mobile-menu-btn ${mobileMenuOpen ? "open" : ""}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              <span className="terminal-menu-symbol">
                {mobileMenuOpen ? ">_ CLOSE" : ">_ MENU"}
              </span>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Terminal Command Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mobile-menu-overlay"
          >
            <div className="overlay-blur" onClick={() => setMobileMenuOpen(false)} />
            
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="mobile-terminal-panel"
            >
              <div className="terminal-header">
                <span className="terminal-dot red"></span>
                <span className="terminal-dot yellow"></span>
                <span className="terminal-dot green"></span>
                <span className="terminal-title">navigation_cli.sh</span>
              </div>
              <motion.div
                variants={menuContainerVariants}
                initial="hidden"
                animate="visible"
                className="terminal-menu-body"
              >
                <div className="terminal-log">
                  $ chmod +x menu_navigator.sh && ./menu_navigator.sh
                  <br />
                  [SYSTEM] Initializing navigation commands...
                </div>

                {navItems.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={menuItemVariants}
                    whileHover={{ x: 6, color: "var(--accent-blue)" }}
                    onClick={() => handleNavClick(item.id)}
                    className={`terminal-menu-item ${activeSection === item.id ? "active" : ""}`}
                  >
                    <span className="prompt-indicator">&gt;</span>
                    <span className="command-prefix">navigate </span>
                    <span className="command-arg">{item.id}</span>
                  </motion.div>
                ))}

                <div className="terminal-footer">
                  <span className="blinking-prompt-cursor">&gt; <span>_</span></span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
