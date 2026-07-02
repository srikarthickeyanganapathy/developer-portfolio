import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

/**
 * Custom cursor with a dot + ring, that MORPHS on hover:
 * - Grows and shows a short label when hovering an element with
 *   a `data-cursor-text="View"` (or similar) attribute.
 * - Falls back to a plain enlarged ring for generic links/buttons.
 *
 * Usage on any element you want a labeled cursor for:
 *   <a href="..." data-cursor-text="View">...</a>
 *   <button data-cursor-text="Talk">...</button>
 */
export default function CustomCursor() {
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(useMotionValue(-100), { stiffness: 150, damping: 20 });
  const ringY = useSpring(useMotionValue(-100), { stiffness: 150, damping: 20 });
  const ringRef = useRef(null);
  const [label, setLabel] = useState(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const move = (e) => {
      dotX.set(e.clientX - 3);
      dotY.set(e.clientY - 3);
      ringX.set(e.clientX - 16);
      ringY.set(e.clientY - 16);
    };

    const over = (e) => {
      const el = e.target;
      const labelTarget = el.closest("[data-cursor-text]");
      const genericTarget = el.closest("a, button") || el.dataset?.cursor;

      if (labelTarget) {
        setIsHovering(true);
        setLabel(labelTarget.getAttribute("data-cursor-text"));
        if (ringRef.current) ringRef.current.classList.add("hovered", "hovered-label");
      } else if (genericTarget) {
        setIsHovering(true);
        setLabel(null);
        if (ringRef.current) ringRef.current.classList.add("hovered");
      }
    };

    const out = (e) => {
      const el = e.target;
      const stillInside =
        el.closest("[data-cursor-text]") || el.closest("a, button");
      if (stillInside) return;

      setIsHovering(false);
      setLabel(null);
      if (ringRef.current) ringRef.current.classList.remove("hovered", "hovered-label");
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
      <motion.div className="cursor-dot" style={{ x: dotX, y: dotY, opacity: label ? 0 : 1 }} />
      <motion.div
        ref={ringRef}
        className="cursor-ring"
        style={{ x: ringX, y: ringY }}
      >
        <AnimatePresence>
          {label && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="cursor-label"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}