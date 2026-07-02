import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!<>-_\\/[]{}—=+*^?#0123456789";

/**
 * Cycles through a list of words, "scrambling" random characters
 * before resolving into each target word — terminal/hacker style.
 */
export default function ScrambleText({ words, className, speed = 30, hold = 1800 }) {
  const [display, setDisplay] = useState(words[0]);
  const frameRef = useRef(null);
  const wordIndexRef = useRef(0);

  useEffect(() => {
    let cancelled = false;

    const scrambleTo = (target) => {
      let iteration = 0;
      const totalIterations = target.length * 3;

      clearInterval(frameRef.current);
      frameRef.current = setInterval(() => {
        if (cancelled) return;

        setDisplay(
          target
            .split("")
            .map((char, idx) => {
              if (char === " ") return " ";
              if (idx < iteration / 3) return target[idx];
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );

        iteration += 1;

        if (iteration > totalIterations) {
          clearInterval(frameRef.current);
          setDisplay(target);
          setTimeout(() => {
            if (cancelled) return;
            wordIndexRef.current = (wordIndexRef.current + 1) % words.length;
            scrambleTo(words[wordIndexRef.current]);
          }, hold);
        }
      }, speed);
    };

    const initialHold = setTimeout(() => {
      wordIndexRef.current = (wordIndexRef.current + 1) % words.length;
      scrambleTo(words[wordIndexRef.current]);
    }, hold);

    return () => {
      cancelled = true;
      clearInterval(frameRef.current);
      clearTimeout(initialHold);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [words, speed, hold]);

  return <span className={className}>{display}</span>;
}
