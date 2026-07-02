import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.025, delayChildren: 0.3 },
  },
};

const letter = {
  hidden: { y: "110%", opacity: 0, rotateX: -70 },
  show: {
    y: "0%",
    opacity: 1,
    rotateX: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Renders a line of text as individually-animated letters (3D flip + rise).
 * Wrap each word in its own <span className="inline-block overflow-hidden">
 * externally is handled internally per-word so wrapping stays natural.
 */
export default function SplitHeadline({ text, className }) {
  const words = text.split(" ");

  return (
    <motion.span
      className={className}
      style={{ display: "inline-block", perspective: "800px" }}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {words.map((word, wi) => (
        <span key={wi} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
          {word.split("").map((char, ci) => (
            <span
              key={ci}
              style={{ display: "inline-block", overflow: "hidden" }}
            >
              <motion.span
                variants={letter}
                style={{ display: "inline-block" }}
              >
                {char}
              </motion.span>
            </span>
          ))}
          {wi < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </motion.span>
  );
}
