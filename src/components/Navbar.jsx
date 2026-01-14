import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Home, NotebookText, User, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isDark, setIsDark] = useState(true);
  const [lang, setLang] = useState("EN");
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const navLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "Projects", path: "/projects", icon: NotebookText },
    { name: "Skills", path: "/skills", icon: User },
  ];

  const buttonBaseClass =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-12";

  const inactiveClass =
    "hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50";

  const activeClass =
    "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50";

  return (
    <div classNameclassName="backdrop-blur-md bg-white/70 dark:bg-neutral-900/70 border border-gray-200 dark:border-white/10 px-2 py-2 rounded-xl shadow-sm">
      <div className="fixed inset-x-0 bottom-0 h-16 w-full backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] md:hidden"></div>

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 mt-8 w-max justify-center gap-2 rounded-2xl border border-neutral-200 dark:border-white/10 p-2 backdrop-blur-md bg-white/50 dark:bg-black/50 pointer-events-auto relative z-50 mx-auto flex h-full min-h-full transform-gpu px-1 shadow-[0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] md:mt-1 dark:shadow-[0_-20px_80px_-20px_#ffffff1f_inset] items-center"
      >
        {/* 1. Navigation Links with Hover Spacing */}
        {navLinks.map((link, index) => {
          const isHovered = hoveredIndex === index;
          const isAdjacent = hoveredIndex === index - 1 || hoveredIndex === index + 1;

          return (
            <motion.div
              key={link.path}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              animate={{
                marginLeft: isHovered ? 12 : isAdjacent ? 6 : 0,
                marginRight: isHovered ? 12 : isAdjacent ? 6 : 0,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex aspect-square cursor-pointer items-center justify-center rounded-full"
              style={{ padding: "8px", width: "40px", height: "40px" }}
            >
              <NavLink
                to={link.path}
                aria-label={link.name}
                className={({ isActive }) =>
                  `${buttonBaseClass} ${isActive ? activeClass : inactiveClass}`
                }
              >
                <link.icon className="size-4" />
              </NavLink>
            </motion.div>
          );
        })}

        {/* Divider */}
        <div
          data-orientation="vertical"
          role="none"
          className="bg-neutral-200 dark:bg-white/10 shrink-0 w-px h-full mx-1"
        ></div>

        {/* Theme Toggle */}
        <motion.div
          whileHover={{ marginLeft: 10, marginRight: 10 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex aspect-square cursor-pointer items-center justify-center rounded-full"
          style={{ padding: "8px", width: "40px", height: "40px" }}
        >
          <button
            type="button"
            aria-label="Toggle theme"
            onClick={() => setIsDark(!isDark)}
            className={`${buttonBaseClass} ${inactiveClass} size-9 px-2`}
          >
            {isDark ? (
              <Moon className="size-4 text-neutral-800 dark:text-neutral-200" />
            ) : (
              <Sun className="size-4 text-neutral-800 dark:text-neutral-200" />
            )}
          </button>
        </motion.div>

        {/* Language Toggle */}
        <motion.div
          whileHover={{ marginLeft: 10, marginRight: 10 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex aspect-square cursor-pointer items-center justify-center rounded-full"
          style={{ padding: "8px", width: "40px", height: "40px" }}
        >
          <button
            type="button"
            aria-label="Toggle language"
            onClick={() => setLang(lang === "EN" ? "JP" : "EN")}
            className={`${buttonBaseClass} ${inactiveClass} size-9 px-2`}
          >
            <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
              {lang}
            </span>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Navbar;
