import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(useMotionValue(-100), { stiffness: 150, damping: 20 });
  const ringY = useSpring(useMotionValue(-100), { stiffness: 150, damping: 20 });
  const hovered = useRef(false);
  const ringRef = useRef(null);

  useEffect(() => {
    const move = (e) => {
      dotX.set(e.clientX - 3);
      dotY.set(e.clientY - 3);
      ringX.set(e.clientX - 16);
      ringY.set(e.clientY - 16);
    };

    const over = (e) => {
      const el = e.target;
      if (el.tagName === "A" || el.tagName === "BUTTON" || el.closest("a") || el.closest("button") || el.dataset.cursor) {
        hovered.current = true;
        if (ringRef.current) ringRef.current.classList.add("hovered");
      }
    };
    const out = () => {
      hovered.current = false;
      if (ringRef.current) ringRef.current.classList.remove("hovered");
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
    };
  }, []);

  return (
    <>
      <motion.div className="cursor-dot" style={{ x: dotX, y: dotY }} />
      <motion.div ref={ringRef} className="cursor-ring" style={{ x: ringX, y: ringY }} />
    </>
  );
}
