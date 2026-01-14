import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";

export default function Projects() {
  const [preview, setPreview] = useState({
    visible: false,
    x: 0,
    y: 0,
    image: null
  });

  const handleMouseMove = (e, image) => {
    setPreview({
      visible: true,
      x: e.clientX + 32,
      y: e.clientY + 32,
      image
    });
  };

  const handleMouseLeave = () => {
    setPreview({ visible: false, x: 0, y: 0, image: null });
  };

  return (
    <div className="space-y-24 pt-20 sm:pt-28 md:pt-36">
      {/* Header */}
      <div className="max-w-4xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-black dark:text-white">
          Selected Projects
        </h1>
        <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
          A focused collection of systems I’ve built around backend engineering,
          blockchain architecture, and applied machine learning.
        </p>
      </div>

      {/* Project List */}
      <div className="flex flex-col space-y-24">
        {projects.map((p) => (
          <div key={p.id}>
            <Link
              to={`/projects/${p.slug}`}
              className="group block relative"
              onMouseMove={(e) => handleMouseMove(e, p.image)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-4 mb-4">
                <h2 className="text-2xl font-semibold text-black dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {p.title}
                </h2>
                <span className="text-sm font-mono text-gray-400 dark:text-gray-500 whitespace-nowrap border border-gray-100 dark:border-gray-800 px-3 py-1 rounded">
                  {p.tag}
                </span>
              </div>

              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-4 max-w-3xl">
                {p.description}
              </p>

              <div className="text-sm text-gray-400 dark:text-gray-500 font-mono">
                {p.stack}
              </div>

              {/* Underline on hover */}
              <span className="absolute left-0 bottom-[-10px] h-[2px] w-0 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>
        ))}
      </div>

      {/* Cursor Preview */}
      <AnimatePresence>
        {preview.visible && preview.image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: preview.x,
              y: preview.y
            }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="fixed top-0 left-0 z-50 pointer-events-none hidden md:block"
            style={{ transform: "translate(-50%, -50%)" }}
          >
            <div className="w-80 overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-neutral-950 shadow-2xl">
              <img
                src={preview.image}
                alt="Preview"
                className="w-full h-48 object-cover"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
