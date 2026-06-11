"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Mail, FileText, ArrowRight } from "lucide-react";

// Custom inline SVG icons to prevent Turbopack compilation errors with brand icons
const GithubIcon = ({ size = 22, color = "currentColor" }) => (
  <svg
    height={size}
    width={size}
    viewBox="0 0 16 16"
    fill={color}
    style={{ display: "inline-block", verticalAlign: "middle" }}
    className="social-icon"
  >
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

const LinkedinIcon = ({ size = 22, color = "currentColor" }) => (
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
    className="social-icon"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Contact() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [entryLogs, setEntryLogs] = useState([]);
  const [entryComplete, setEntryComplete] = useState(false);
  const [hoveredOrbitId, setHoveredOrbitId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formState, setFormState] = useState("idle"); // "idle" | "submitting" | "success"
  const [submitLogs, setSubmitLogs] = useState([]);

  const socialLinks = {
    email: {
      id: "email",
      label: "Email",
      val: "akhil35177@gmail.com",
      url: "mailto:akhil35177@gmail.com",
      icon: <Mail size={22} className="social-icon" />,
      cx: 14,
      cy: 16,
      action: "send_message.exe"
    },
    linkedin: {
      id: "linkedin",
      label: "LinkedIn",
      val: "akhil-kumar-reddy-ambati",
      url: "https://www.linkedin.com/in/akhil-kumar-reddy-ambati-a34a792a9/",
      icon: <LinkedinIcon size={22} />,
      cx: 86,
      cy: 16,
      action: "open_profile.exe"
    },
    github: {
      id: "github",
      label: "GitHub",
      val: "Akhil3517",
      url: "https://github.com/Akhil3517",
      icon: <GithubIcon size={22} />,
      cx: 14,
      cy: 84,
      action: "view_projects.exe"
    },
    resume: {
      id: "resume",
      label: "Resume",
      val: "Google Drive PDF",
      url: "https://drive.google.com/file/d/1VhFwAV6XulngkFbd9FcH-78fWxoMFiDl/view?usp=sharing",
      icon: <FileText size={22} className="social-icon" />,
      cx: 86,
      cy: 84,
      action: "download_resume.exe"
    }
  };

  // Entry sequence
  useEffect(() => {
    if (!isInView) return;

    const sequence = [
      { text: "> loading_contact.exe", delay: 0 },
      { text: "> establishing_connection...", delay: 350 },
      { text: "✓ connection established.", delay: 750 }
    ];

    sequence.forEach((s) => {
      setTimeout(() => {
        setEntryLogs((prev) => [...prev, s.text]);
      }, s.delay);
    });

    setTimeout(() => {
      setEntryComplete(true);
    }, 1100);
  }, [isInView]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormState("submitting");
    setSubmitLogs(["> compiling request...", "> connecting to SMTP portal..."]);

    setTimeout(() => {
      setSubmitLogs((prev) => [...prev, "> resolving mail_gateway.sh...", "> transmitting data streams..."]);
    }, 550);

    setTimeout(() => {
      setFormState("success");
      setFormData({ name: "", email: "", message: "" });
    }, 1500);
  };

  const handleResetForm = () => {
    setFormState("idle");
    setSubmitLogs([]);
  };

  const handleInitiateClick = () => {
    const inputEl = document.getElementById("form-name-input");
    if (inputEl) inputEl.focus();
  };

  return (
    <section id="contact" className="contact-section" ref={containerRef}>
      <div className="contact-bg-grid" />
      <div className="contact-glow-radial" />

      <div className="contact-container">
        
        {/* Entry Sequence Panel */}
        <AnimatePresence>
          {!entryComplete && (
            <motion.div
              key="contact-intro"
              exit={{ opacity: 0, scale: 0.98, filter: "blur(6px)" }}
              transition={{ duration: 0.5 }}
              className="contact-intro-overlay"
            >
              <div className="contact-terminal-intro">
                {entryLogs.map((log, i) => (
                  <div key={i} className="log-line">{log}</div>
                ))}
                <div className="log-line prompt">&gt; <span className="blink-cursor">_</span></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {entryComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="contact-workspace"
          >
            {/* Header */}
            <div className="contact-header">
              <h2 className="contact-title">
                Let's Build Something Amazing Together<span className="contact-title-cursor">_</span>
              </h2>
              <p className="contact-subtitle">
                Whether it's a project, internship opportunity, collaboration, or just a conversation about technology, I'm always open to connecting.
              </p>
            </div>

            {/* Main Interactive Split grid */}
            <div className="contact-grid">
              
              {/* Left Column: Communication Terminal info */}
              <div className="contact-terminal-column">
                <div className="contact-mac-bar">
                  <span className="mac-dot red" />
                  <span className="mac-dot yellow" />
                  <span className="mac-dot green" />
                  <span className="mac-title">contact.sh</span>
                </div>
                
                <div className="contact-mac-body">
                  <div className="term-line cmd">&gt; status</div>
                  <div className="term-line val success">AVAILABLE FOR OPPORTUNITIES</div>
                  
                  <div className="term-line cmd">&gt; role</div>
                  <div className="term-line val">FULL STACK DEVELOPER</div>

                  <div className="term-line cmd">&gt; interests</div>
                  <div className="term-line val flex-col">
                    <span>• WEB DEVELOPMENT</span>
                    <span>• AI APPLICATIONS</span>
                    <span>• PRODUCT BUILDING</span>
                  </div>

                  <div className="term-line cmd">&gt; response_time</div>
                  <div className="term-line val yellow">WITHIN 24 HOURS</div>

                  <div className="term-line cmd prompt">&gt; <span className="blink-cursor">_</span></div>
                </div>
              </div>

              {/* Right Column: Alternate Terminal Form */}
              <div className="contact-form-column">
                <div className="contact-mac-bar">
                  <span className="mac-dot red" />
                  <span className="mac-dot yellow" />
                  <span className="mac-dot green" />
                  <span className="mac-title">message_sender.sh</span>
                </div>

                <div className="contact-form-body">
                  <AnimatePresence mode="wait">
                    {formState === "idle" && (
                      <motion.form 
                        key="form"
                        onSubmit={handleFormSubmit} 
                        className="cli-form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <div className="form-field-line">
                          <label htmlFor="form-name-input" className="form-label">&gt; name:</label>
                          <input
                            required
                            type="text"
                            name="name"
                            id="form-name-input"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter your name"
                            className="form-input"
                          />
                        </div>

                        <div className="form-field-line">
                          <label htmlFor="form-email-input" className="form-label">&gt; email:</label>
                          <input
                            required
                            type="email"
                            name="email"
                            id="form-email-input"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                            className="form-input"
                          />
                        </div>

                        <div className="form-field-line">
                          <label htmlFor="form-message-input" className="form-label">&gt; message:</label>
                          <textarea
                            required
                            name="message"
                            id="form-message-input"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Type your message..."
                            className="form-input text-area"
                          />
                        </div>

                        <button type="submit" className="form-submit-btn">
                          &gt; execute_send_message()
                        </button>
                      </motion.form>
                    )}

                    {formState === "submitting" && (
                      <motion.div 
                        key="submitting"
                        className="cli-form-logs"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {submitLogs.map((log, index) => (
                          <div key={index} className="log-line">{log}</div>
                        ))}
                        <div className="log-line loader-line">&gt; transmitting data packets... <span className="blink-cursor">_</span></div>
                      </motion.div>
                    )}

                    {formState === "success" && (
                      <motion.div 
                        key="success"
                        className="cli-form-success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", stiffness: 150, damping: 15 }}
                      >
                        <div className="success-icon-check">✓</div>
                        <h4 className="success-title-text">Message Sent Successfully</h4>
                        <p className="success-body-text">
                          Your message packet has been transmitted into Akhil's mail inbox. A reply will be routed to your email address within 24 hours.
                        </p>
                        
                        <button onClick={handleResetForm} className="success-reset-btn">
                          &gt; clear_terminal.exe
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Social Network Orbit Panel */}
            <div className="social-orbit-container">
              <div className="orbit-canvas-frame">
                
                {/* SVG Connections line mesh */}
                <svg className="orbit-svg-mesh" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {Object.values(socialLinks).map((link) => {
                    const active = hoveredOrbitId === link.id;
                    return (
                      <line
                        key={link.id}
                        x1="50%"
                        y1="50%"
                        x2={`${link.cx}%`}
                        y2={`${link.cy}%`}
                        stroke="rgba(255, 255, 255, 0.08)"
                        strokeWidth={active ? "0.4" : "0.18"}
                        strokeDasharray={active ? "1, 1" : "2, 4"}
                        className={`orbit-line ${active ? "active" : ""}`}
                        style={{ transition: "stroke-width 0.3s, stroke-dasharray 0.3s" }}
                      />
                    );
                  })}
                </svg>

                {/* Center Core Node */}
                <div className="orbit-center-node" style={{ left: "50%", top: "50%" }}>
                  <div className="center-inner-core">
                    <span className="core-txt">AKHIL.EXE</span>
                  </div>
                </div>

                {/* Orbit Social Node Elements */}
                {Object.values(socialLinks).map((link) => {
                  const active = hoveredOrbitId === link.id;
                  return (
                    <motion.a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`orbit-social-node ${active ? "active" : ""}`}
                      style={{ left: `${link.cx}%`, top: `${link.cy}%` }}
                      onMouseEnter={() => setHoveredOrbitId(link.id)}
                      onMouseLeave={() => setHoveredOrbitId(null)}
                      whileHover={{ scale: 1.08 }}
                    >
                      <div className="node-icon-wrapper">
                        {link.icon}
                      </div>
                      <div className="node-label-box">
                        <span className="node-name">{link.label}</span>
                        <span className="node-action">&gt; {link.action}</span>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Final CTA Section */}
            <div className="final-cta-section">
              <h3 className="final-cta-text">Ready to turn ideas into reality?</h3>
              <button onClick={handleInitiateClick} className="final-cta-btn">
                &gt; initiate_collaboration.exe
              </button>
            </div>

            {/* System Shutdown Footer */}
            <footer className="portfolio-footer">
              <div className="footer-shutdown-line">&gt; shutdown_system</div>
              <div className="footer-credits-box">
                <p className="copyright-line">© 2026 Akhil Kumar Reddy Amati</p>
                <p className="credits-desc-line">
                  Built with Next.js, React Three Fiber, Framer Motion, and a lot of coffee ☕
                  <span className="footer-blink-cursor">_</span>
                </p>
              </div>
            </footer>

          </motion.div>
        )}
      </div>
    </section>
  );
}
