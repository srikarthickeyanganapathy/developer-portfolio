import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { projects } from "../../data/projects";

const CATEGORIES = ["All", "Featured", "ML", "Blockchain", "Full-Stack", "Tools"];

export default function ProjectFilterGrid({ onProjectClick }) {
  const [active, setActive] = useState("All");

  const filtered = useMemo(() => {
    if (active === "All") return projects;
    if (active === "Featured") return projects.filter((p) => p.featured);
    return projects.filter((p) => p.category === active);
  }, [active]);

  return (
    <div className="mx-auto max-w-[1200px] w-full px-6 sm:px-10 lg:px-16 mt-16 sm:mt-24 relative z-10">
      {/* Filter chips */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`font-mono text-[11px] uppercase tracking-[0.15em] px-4 py-2 rounded-full border transition-colors duration-300 ${
              active === cat
                ? "bg-[var(--accent)] text-[var(--warm-black)] border-[var(--accent)]"
                : "border-[var(--warm-white)]/15 text-[var(--warm-dim)] hover:text-[var(--warm-white)] hover:border-[var(--warm-white)]/30"
            }`}
          >
            {cat}
          </button>
        ))}
        <span className="ml-auto font-mono text-[10px] text-[var(--warm-dim)] uppercase tracking-widest">
          {filtered.length} project{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <motion.button
              key={p.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              onClick={() => onProjectClick(p)}
              className="glass-panel glass-hover text-left rounded-xl p-5 flex flex-col gap-3 group"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--accent)]">{p.tag}</p>
                  <h3 className="font-display font-semibold text-[var(--warm-white)] mt-1.5 leading-snug">
                    {p.title}
                  </h3>
                </div>
                <ArrowUpRight
                  size={16}
                  className="text-[var(--warm-dim)] group-hover:text-[var(--accent)] transition-colors flex-shrink-0 mt-1"
                />
              </div>
              <p className="text-xs text-[var(--warm-muted)] leading-relaxed line-clamp-2">{p.description}</p>
              <div className="flex items-center justify-between mt-auto pt-2 border-t border-[var(--warm-white)]/[0.06]">
                <span className="font-mono text-[10px] text-[var(--warm-dim)]">{p.year}</span>
                {p.github && <Github size={13} className="text-[var(--warm-dim)]" />}
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}