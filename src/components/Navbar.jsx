import React, { useState, useEffect, useRef } from "react";
import { Home, NotebookText, User, FileText, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { name: "Home", index: 0, icon: Home },
  { name: "About", index: 1, icon: User },
  { name: "Work", index: 2, icon: NotebookText },
  { name: "Contact", index: 3, icon: MessageCircle },
];

export default function Navbar({ activeSection, onNavigate }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY.current && currentY > 80) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const buttonBaseClass =
    "relative inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors size-12 cursor-pointer";

  const inactiveClass =
    "text-[var(--warm-dim)] hover:text-[var(--warm-white)]";

  const activeClass =
    "text-[var(--accent)]";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: isMobile ? 40 : -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: isMobile ? 40 : -40, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="pointer-events-none fixed inset-x-0 bottom-6 md:bottom-auto md:top-8 z-[100] mx-auto flex justify-center"
        >
          {/* Dock */}
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="pointer-events-auto relative mx-auto flex items-center p-1 sm:p-1.5 rounded-2xl sm:rounded-full bg-[rgba(20,20,20,0.6)] backdrop-blur-3xl border border-[rgba(255,255,255,0.15)] shadow-[0_8px_32px_rgba(0,0,0,0.5)] gap-1 sm:gap-1"
          >
            {/* NAV ITEMS */}
            {NAV_ITEMS.map((link, idx) => {
              const isHovered = hoveredIndex === idx;
              const isAdjacent =
                hoveredIndex === idx - 1 || hoveredIndex === idx + 1;
              const isActive = activeSection === link.index;

              return (
                <motion.div
                  key={link.name}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  animate={{
                    scale: isHovered ? 1.2 : isAdjacent ? 1.1 : 1,
                    margin: isHovered ? "0 8px" : isAdjacent ? "0 4px" : "0 0px",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex items-center justify-center relative"
                >
                  <button
                    onClick={() => onNavigate(link.index)}
                    aria-label={link.name}
                    className={`relative flex items-center justify-center w-12 h-10 sm:w-14 sm:h-12 rounded-xl sm:rounded-2xl transition-colors ${
                      isActive ? "bg-white/10 text-white shadow-inner" : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <link.icon className="size-5 relative z-10" strokeWidth={isActive ? 2.5 : 2} />

                    {/* ACTIVE GLOW UNDERLINE */}
                    {isActive && (
                      <motion.span
                        layoutId="active-underline"
                        className="absolute -bottom-1 sm:-bottom-1.5 left-1/2 -translate-x-1/2 h-[2px] w-5 sm:w-6 rounded-full bg-[var(--accent)]"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}

                    {/* GLOW BLUR */}
                    {isActive && (
                      <motion.span
                        layoutId="active-glow"
                        className="absolute -bottom-1 sm:-bottom-1.5 left-1/2 -translate-x-1/2 h-3 w-8 sm:w-10 rounded-full bg-[var(--accent)] blur-lg opacity-60"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </button>
                </motion.div>
              );
            })}

            {/* Divider */}
            <div className="mx-1 sm:mx-2 h-6 w-px bg-white/10" />

            {/* RESUME BUTTON */}
            <motion.div
              onMouseEnter={() => setHoveredIndex(99)}
              onMouseLeave={() => setHoveredIndex(null)}
              animate={{
                scale: hoveredIndex === 99 ? 1.2 : hoveredIndex === NAV_ITEMS.length - 1 ? 1.1 : 1,
                margin: hoveredIndex === 99 ? "0 8px" : hoveredIndex === NAV_ITEMS.length - 1 ? "0 4px" : "0 0px",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex items-center justify-center"
            >
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                aria-label="View Résumé"
                className="relative flex items-center justify-center w-12 h-10 sm:w-14 sm:h-12 rounded-xl sm:rounded-2xl text-white/60 hover:text-[var(--accent)] hover:bg-[var(--accent)]/10 transition-colors"
              >
                <FileText className="size-5" strokeWidth={2} />
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}