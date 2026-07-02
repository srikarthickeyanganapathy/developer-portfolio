import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

import { subscribeProgress } from "../lib/loadingProgress";

export default function Preloader({ onComplete }) {
  const [count, setCount] = useState(0);
  const containerRef = useRef(null);
  const diamondRef = useRef(null);
  const lettersRef = useRef([]);
  const nameText = "Sri Karthickeyan Ganapathy";
  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;
    
    // We will only mark done when the exit animation starts.
    const tl = gsap.timeline();

    // 1. Animate letters from random positions to their places
    lettersRef.current.forEach((el) => {
      if (!el) return;
      gsap.set(el, {
        x: gsap.utils.random(-400, 400),
        y: gsap.utils.random(-200, 200),
        rotation: gsap.utils.random(-180, 180),
        opacity: 0,
        scale: gsap.utils.random(0.3, 1.5),
      });
    });

    tl.to(lettersRef.current.filter(Boolean), {
      x: 0,
      y: 0,
      rotation: 0,
      opacity: 1,
      scale: 1,
      duration: 2.2,
      ease: "power3.out",
      stagger: {
        each: 0.04,
        from: "random",
      },
    });

    // We will blend a fake time-based progress (up to 30%) 
    // with the real WebGL progress (up to 70%).
    // But if we're on mobile/reduced-motion, WebGL won't load, so we use a fallback timer.
    const counter = { val: 0, target: 0 };
    let hasCompleted = false;

    const completePreloader = () => {
      if (hasCompleted) return;
      hasCompleted = true;
      done.current = true;
      
      const exitTl = gsap.timeline();
      exitTl.to(diamondRef.current, {
        scale: 30,
        opacity: 0,
        duration: 1,
        ease: "power4.inOut",
        delay: 0.3,
      });

      exitTl.to(containerRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => onComplete?.(),
      }, "-=0.4");
    };

    // Update internal counter smoothly towards the target
    const interval = setInterval(() => {
      if (counter.val < counter.target) {
        counter.val += (counter.target - counter.val) * 0.1;
        if (counter.target >= 99 && counter.val > 99) counter.val = 100;
        setCount(Math.floor(counter.val));
      }
      
      if (counter.val >= 99 && !hasCompleted) {
        completePreloader();
      }
    }, 16);

    // Subscribe to real progress
    const unsubscribe = subscribeProgress((realProgress) => {
      // realProgress is 0-100 based on checkpoints
      counter.target = Math.max(counter.target, realProgress);
    });

    // Fallback: If 3 seconds pass and we still aren't done (e.g. mobile bypassed the canvases), force target to 100
    const fallbackTimer = setTimeout(() => {
      counter.target = 100;
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(fallbackTimer);
      unsubscribe();
    };
  }, [onComplete]);

  return (
    <div ref={containerRef} className="preloader">
      {/* Diamond with counter */}
      <div ref={diamondRef} className="preloader__diamond">
        <span className="preloader__counter">{count}</span>
      </div>

      {/* Name letters */}
      <div className="preloader__name">
        {nameText.split("").map((char, i) => (
          <span
            key={i}
            ref={(el) => (lettersRef.current[i] = el)}
            className="preloader__letter"
            style={{
              width: char === " " ? "0.5em" : "auto",
              display: "inline-block",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>
    </div>
  );
}
