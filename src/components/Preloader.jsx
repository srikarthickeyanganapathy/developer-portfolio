import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader({ onComplete }) {
  const [count, setCount] = useState(0);
  const containerRef = useRef(null);
  const diamondRef = useRef(null);
  const lettersRef = useRef([]);
  const nameText = "Sri Karthickeyan Ganapathy";
  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;
    done.current = true;

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

    // 2. Counter animation
    const counter = { val: 0 };
    gsap.to(counter, {
      val: 100,
      duration: 2.5,
      ease: "power2.inOut",
      onUpdate: () => setCount(Math.floor(counter.val)),
    });

    // 3. Exit animation at ~3s
    tl.to(diamondRef.current, {
      scale: 30,
      opacity: 0,
      duration: 1,
      ease: "power4.inOut",
      delay: 0.3,
    }, "+=0.2");

    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => onComplete?.(),
    }, "-=0.4");
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
