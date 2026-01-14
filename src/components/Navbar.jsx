import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Home, NotebookText, User, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isDark, setIsDark] = useState(true);
  const [lang, setLang] = useState("EN");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const location = useLocation();

  // Theme toggle
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

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

  const navLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "Projects", path: "/projects", icon: NotebookText },
    { name: "Skills", path: "/skills", icon: User },
  ];

  const buttonBaseClass =
    "relative inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors size-12";

  const inactiveClass =
    "text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white";

  const activeClass =
    "text-black dark:text-white";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="pointer-events-none fixed inset-x-0 bottom-0 z-40 mx-auto mb-12 flex h-full max-h-14 origin-bottom md:top-0 md:mb-0 md:mt-6"
        >
          {/* Mobile blur */}
          <div className="fixed inset-x-0 bottom-0 h-16 w-full backdrop-blur-lg md:hidden"></div>

          {/* Dock */}
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="
              pointer-events-auto relative z-50 mx-auto flex items-center
              rounded-2xl border border-gray-200 dark:border-white/10
              bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md
              px-3 py-2 shadow-sm
            "
          >
            {/* NAV ITEMS */}
            {navLinks.map((link, index) => {
              const isHovered = hoveredIndex === index;
              const isAdjacent =
                hoveredIndex === index - 1 || hoveredIndex === index + 1;
              const isActive = location.pathname === link.path;

              return (
                <motion.div
                  key={link.path}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  animate={{
                    scale: isHovered ? 1.15 : isAdjacent ? 1.05 : 1,
                    marginLeft: isHovered ? 10 : isAdjacent ? 5 : 0,
                    marginRight: isHovered ? 10 : isAdjacent ? 5 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex items-center justify-center"
                  style={{ width: 40, height: 40 }}
                >
                  <NavLink
                    to={link.path}
                    aria-label={link.name}
                    className={`${buttonBaseClass} ${
                      isActive ? activeClass : inactiveClass
                    }`}
                  >
                    {/* Icon */}
                    <link.icon className="size-4 relative z-10" />

                    {/* ACTIVE GLOW UNDERLINE */}
                    {isActive && (
                      <motion.span
                        layoutId="active-underline"
                        className="
                          absolute -bottom-1 left-1/2 -translate-x-1/2
                          h-[2px] w-6 rounded-full
                          bg-gradient-to-r from-indigo-500 to-fuchsia-500
                        "
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}

                    {/* GLOW BLUR */}
                    {isActive && (
                      <motion.span
                        layoutId="active-glow"
                        className="
                          absolute -bottom-1 left-1/2 -translate-x-1/2
                          h-2 w-8 rounded-full
                          bg-gradient-to-r from-indigo-500 to-fuchsia-500
                          blur-md opacity-60
                        "
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </NavLink>
                </motion.div>
              );
            })}

            {/* Divider */}
            <div className="mx-2 h-6 w-px bg-gray-200 dark:bg-white/10" />

            {/* THEME TOGGLE */}
            <motion.div
              whileHover={{ scale: 1.1, marginLeft: 8, marginRight: 8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex items-center justify-center"
              style={{ width: 40, height: 40 }}
            >
              <button
                aria-label="Toggle theme"
                onClick={() => setIsDark(!isDark)}
                className={`${buttonBaseClass} ${inactiveClass}`}
              >
                {isDark ? <Moon className="size-4" /> : <Sun className="size-4" />}
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
