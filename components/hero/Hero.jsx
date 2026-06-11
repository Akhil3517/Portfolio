"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import TerminalIntro from "./TerminalIntro";
import DecryptedText from "./DecryptedText";
import BackgroundGrid from "./BackgroundGrid";
import FloatingSnippets from "./FloatingSnippets";
import Laptop3D from "./Laptop3D";
import FloatingCards from "./FloatingCards";
import ExploreIndicator from "./ExploreIndicator";
import Navbar from "../navbar/Navbar";

export default function Hero() {
  const [step, setStep] = useState("intro"); // "intro" | "decrypting" | "main"
  const [decryptionSubStep, setDecryptionSubStep] = useState("space"); // "space" | "verified"
  const [showMainContents, setShowMainContents] = useState(false);
  const [sessionIntroPlayed, setSessionIntroPlayed] = useState(false);
  const [titleDecrypted, setTitleDecrypted] = useState(false);
  
  // Parallax Scroll Tracking for Hero fade-out
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 110]);
  const heroOpacity = useTransform(scrollY, [0, 450], [1, 0]);

  useEffect(() => {
    // Check session play state
    const hasPlayed = sessionStorage.getItem("heroIntroPlayed") === "true";
    setSessionIntroPlayed(hasPlayed);
    
    // Ambient Cursor Glow coordinate tracker
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
      document.documentElement.style.setProperty("--glow-radius", `220px`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleIntroComplete = () => {
    if (sessionIntroPlayed) {
      // Skip interstitial decryption overlay for returning visits
      setStep("main");
      setShowMainContents(true);
    } else {
      setStep("decrypting");
    }
  };

  const handleSpaceComplete = () => {
    // After "WELCOME TO MY DIGITAL SPACE" completes, wait 1s then show "IDENTITY VERIFIED"
    setTimeout(() => {
      setDecryptionSubStep("verified");
    }, 1000);
  };

  const handleVerifiedComplete = () => {
    // After "IDENTITY VERIFIED" completes, wait 1.2s then transition to the main profile
    setTimeout(() => {
      setStep("main");
      // Set played flag
      sessionStorage.setItem("heroIntroPlayed", "true");
      // Delayed fade-in of other main elements
      setTimeout(() => {
        setShowMainContents(true);
      }, 100);
    }, 1200);
  };

  // Stagger configurations for titles and badges
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      {/* 1. Ambient Glow layers (active once main profile mounts) */}
      {step === "main" && (
        <>
          <div className="ambient-glow-1" />
          <div className="ambient-glow-2" />
          <div className="cursor-glow" />
        </>
      )}

      {/* 2. Interactive Canvas Background & Particles */}
      {step === "main" && (
        <>
          <BackgroundGrid />
          <FloatingSnippets />
        </>
      )}

      <AnimatePresence mode="wait">
        {/* PHASE 1: Terminal Intro Sequence */}
        {step === "intro" && (
          <motion.div
            key="intro"
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <TerminalIntro onComplete={handleIntroComplete} />
          </motion.div>
        )}

        {/* PHASE 2: Interstitial Screen for Scramble Text Decryption */}
        {step === "decrypting" && (
          <motion.div
            key="decrypting"
            className="decryption-overlay"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div style={{ width: "100%", maxWidth: "800px" }}>
              {decryptionSubStep === "space" && (
                <div className="decryption-text" style={{ color: "var(--accent-blue)" }}>
                  <DecryptedText
                    text="WELCOME TO MY DIGITAL SPACE"
                    speed={25}
                    onComplete={handleSpaceComplete}
                  />
                </div>
              )}
              {decryptionSubStep === "verified" && (
                <div className="decryption-text" style={{ color: "var(--accent-green)" }}>
                  <DecryptedText
                    text="IDENTITY VERIFIED"
                    speed={30}
                    onComplete={handleVerifiedComplete}
                  />
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* PHASE 3: Main Portfolio Layout */}
        {step === "main" && (
          <>
            <Navbar />
            <motion.main
              key="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="hero-section"
              id="home"
              style={{ y: heroY, opacity: heroOpacity }}
            >
            <div className="hero-container">
              {/* Left Column: Headings & Navigation Controls */}
              <motion.div
                className="hero-left"
                variants={containerVariants}
                initial="hidden"
                animate={showMainContents ? "visible" : "hidden"}
              >
                {/* Cyber Decryption Main Heading */}
                <h1 className="hero-title">
                  {showMainContents ? (
                    <DecryptedText
                      text="Hi, I'm Akhil Kumar Reddy Ambati"
                      speed={25}
                      delay={100}
                      onComplete={() => setTitleDecrypted(true)}
                    >
                      <span className={`typing-cursor ${titleDecrypted ? 'blinking' : ''}`}>|</span>
                    </DecryptedText>
                  ) : (
                    ""
                  )}
                </h1>

                {/* Subtitle description */}
                <motion.p className="hero-subtitle" variants={itemVariants}>
                  Building scalable web applications and AI-powered products.
                </motion.p>

                {/* Staggered Achievement badging */}
                <motion.div className="badge-container" variants={itemVariants}>
                  <motion.span className="badge-pill">
                    Tech Enthusiast
                  </motion.span>
                  <motion.span className="badge-pill">
                    Full Stack Developer
                  </motion.span>
                  <motion.span className="badge-pill">
                    AI Explorer
                  </motion.span>
                </motion.div>
              </motion.div>

              {/* Right Column: 3D Scene Viewer & Orbiting widgets */}
              <motion.div
                className="hero-right"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={showMainContents ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1.0, ease: "easeOut", delay: 0.3 }}
              >
                {/* Custom 3D Laptop mesh */}
                <Laptop3D />

                {/* Absolute Floating Glass Cards */}
                {showMainContents && <FloatingCards />}
              </motion.div>
            </div>

            {/* Scroll Indication helper */}
            <ExploreIndicator />
          </motion.main>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
