"use client";

import { useState, useEffect, useRef } from "react";

const GLYPHS = "!@#$%^&*()_+-=[]{}|;':\",./<>?~`";

export default function DecryptedText({
  text,
  speed = 30, // speed of reveals (ms)
  scrambleSpeed = 30, // speed of glyph swapping (ms)
  delay = 0, // delay before starting (ms)
  className = "",
  style = {},
  onComplete,
  children,
}) {
  const [displayText, setDisplayText] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef(null);

  useEffect(() => {
    let delayTimer;

    const startAnimation = () => {
      setIsAnimating(true);
      
      let currentStep = 0;
      const totalSteps = text.length;
      
      // Initialize with full length of random glyphs
      let result = text
        .split("")
        .map((char) => (char === " " ? " " : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]));
      
      setDisplayText(result.join(""));

      const runScramble = () => {
        if (currentStep >= totalSteps) {
          setDisplayText(text);
          setIsAnimating(false);
          if (onComplete) onComplete();
          return;
        }

        // Randomly choose characters to decrypt or maintain scramble
        result = result.map((char, idx) => {
          if (idx < currentStep) {
            return text[idx]; // Already decrypted
          }
          if (text[idx] === " ") {
            return " "; // Keep spaces
          }
          // Scramble with new random glyph
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        });

        setDisplayText(result.join(""));
        
        // Progressively decrypt 1 character (or more for longer text)
        currentStep += 1;
        
        animationRef.current = setTimeout(runScramble, speed);
      };

      runScramble();
    };

    delayTimer = setTimeout(startAnimation, delay);

    return () => {
      clearTimeout(delayTimer);
      if (animationRef.current) clearTimeout(animationRef.current);
    };
  }, [text, speed, scrambleSpeed, delay, onComplete]);

  return (
    <span className={className} style={{ ...style, display: "inline" }}>
      {displayText}
      {children}
    </span>
  );
}
