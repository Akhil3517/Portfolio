"use client";

import { motion } from "framer-motion";

export default function ExploreIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.6 }}
      transition={{ delay: 2.2, duration: 1 }}
      style={{
        position: "absolute",
        bottom: "40px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "6px",
        cursor: "pointer",
        userSelect: "none",
        zIndex: 10,
      }}
      whileHover={{ opacity: 0.9, y: 2 }}
    >
      <style>{`
        @keyframes slowBounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(8px);
          }
        }
        .bounce-arrow {
          animation: slowBounce 2s ease-in-out infinite;
        }
      `}</style>
      
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
          color: "var(--text-secondary)",
          letterSpacing: "1px",
          textTransform: "uppercase",
        }}
      >
        Explore My Journey
      </span>
      <span
        className="bounce-arrow"
        style={{
          fontSize: "1.2rem",
          color: "var(--accent-blue)",
          fontWeight: "bold",
        }}
      >
        ↓
      </span>
    </motion.div>
  );
}
