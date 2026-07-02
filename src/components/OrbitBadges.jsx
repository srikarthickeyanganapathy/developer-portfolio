import { motion } from "framer-motion";

/**
 * Arranges labels in a slow-rotating ring around a center point.
 * Desktop-only decorative layer — sits behind/around the portrait.
 */
export default function OrbitBadges({ items, radius = 190 }) {
  const angleStep = 360 / items.length;

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none hidden lg:block"
      style={{ transformStyle: "preserve-3d" }}
      animate={{ rotate: 360 }}
      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
    >
      {items.map((label, i) => {
        const angle = angleStep * i;
        return (
          <motion.div
            key={label}
            className="absolute left-1/2 top-1/2 pointer-events-auto"
            style={{
              transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`,
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            <span
              className="tech-badge whitespace-nowrap select-none"
              style={{ transform: "translate(-50%, -50%)", display: "inline-block" }}
            >
              {label}
            </span>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
