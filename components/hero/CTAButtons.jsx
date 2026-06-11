"use client";

import { ArrowRight, FileText } from "lucide-react";

export default function CTAButtons() {
  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        marginTop: "32px",
        flexWrap: "wrap",
        zIndex: 10,
        position: "relative",
      }}
    >
      <style>{`
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 28px;
          font-family: var(--font-sans);
          font-size: 0.95rem;
          font-weight: 600;
          color: #050816;
          background: linear-gradient(90deg, var(--accent-green) 0%, var(--accent-blue) 100%);
          border: none;
          border-radius: 8px;
          cursor: pointer;
          position: relative;
          z-index: 1;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          box-shadow: 0 4px 20px rgba(0, 255, 136, 0.25);
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, var(--accent-blue) 0%, var(--accent-green) 100%);
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0, 255, 136, 0.45), 0 0 15px rgba(0, 212, 255, 0.3);
          color: #050816;
        }

        .btn-primary:hover::before {
          opacity: 1;
        }

        .btn-primary:active {
          transform: translateY(0);
        }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 28px;
          font-family: var(--font-sans);
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: var(--accent-blue);
          box-shadow: 0 0 20px rgba(0, 212, 255, 0.15);
          transform: translateY(-2px);
        }

        .btn-secondary:active {
          transform: translateY(0);
        }

        .btn-icon-pulse {
          transition: transform 0.3s ease;
        }

        .btn-primary:hover .btn-icon-pulse {
          transform: translateX(4px);
        }
      `}</style>
      
      <button className="btn-primary">
        <span>View My Work</span>
        <ArrowRight size={16} className="btn-icon-pulse" />
      </button>

      <button className="btn-secondary">
        <FileText size={16} style={{ color: "var(--accent-blue)" }} />
        <span>Resume</span>
      </button>
    </div>
  );
}
