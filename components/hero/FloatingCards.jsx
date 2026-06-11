"use client";

import { motion } from "framer-motion";
import { Code2, Binary } from "lucide-react";

export default function FloatingCards() {
  const cards = [
    {
      icon: <Code2 size={18} style={{ color: "var(--accent-green)" }} />,
      label: "Projects Built",
      value: "5+",
      className: "card-projects",
      floatDuration: 5,
      floatDelay: 0,
      glowColor: "rgba(0, 255, 136, 0.15)",
    },
    {
      icon: <Binary size={18} style={{ color: "var(--accent-blue)" }} />,
      label: "DSA Problems",
      value: "350+",
      className: "card-dsa",
      floatDuration: 5.5,
      floatDelay: 0.8,
      glowColor: "rgba(0, 212, 255, 0.15)",
    },
  ];

  return (
    <div className="floating-cards-wrapper">
      <style>{`
        .floating-cards-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 5;
        }

        .glass-stat-card {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 20px;
          border-radius: 12px;
          background: rgba(10, 15, 30, 0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4);
          pointer-events: auto; /* Re-enable hover states */
          user-select: none;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .glass-stat-card:hover {
          border-color: rgba(255, 255, 255, 0.18);
        }

        /* Desktop Spacing (attached to the diagonal corners of the editor) */
        @media (min-width: 1025px) {
          .card-projects {
            top: -20px;
            left: -25px;
          }
          .card-dsa {
            bottom: -20px;
            right: -25px;
          }
        }

        /* Mobile & Tablet Spacing (lay out underneath side by side) */
        @media (max-width: 1024px) {
          .floating-cards-wrapper {
            position: relative !important;
            width: 100% !important;
            height: auto !important;
            display: flex !important;
            justify-content: center !important;
            gap: 12px !important;
            flex-wrap: wrap !important;
            margin-top: 28px !important;
            z-index: 10 !important;
            pointer-events: auto !important;
          }

          .glass-stat-card {
            position: relative !important;
            top: auto !important;
            left: auto !important;
            right: auto !important;
            bottom: auto !important;
            margin: 0 !important;
            width: calc(50% - 6px) !important;
            min-width: 150px !important;
            max-width: 180px !important;
            justify-content: flex-start !important;
          }
        }
      `}</style>

      {cards.map((card, idx) => (
        <motion.div
          key={idx}
          className={`glass-stat-card ${card.className}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: 1,
            y: [0, -10, 0], // Oscillation float animation
          }}
          transition={{
            opacity: { duration: 0.8, delay: 0.3 * idx },
            y: {
              duration: card.floatDuration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: card.floatDelay,
            },
          }}
          whileHover={{
            scale: 1.03,
            boxShadow: `0 8px 32px 0 ${card.glowColor}`,
          }}
        >
          {/* Card Icon container */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
            }}
          >
            {card.icon}
          </div>

          {/* Stats Text */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <span
              style={{
                fontSize: "0.75rem",
                color: "var(--text-secondary)",
                fontWeight: 500,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
              }}
            >
              {card.label}
            </span>
            <span
              style={{
                fontSize: "1.35rem",
                color: "var(--text-primary)",
                fontWeight: 700,
                lineHeight: "1.1",
              }}
            >
              {card.value}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
