import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink } from "lucide-react";
import TiltCard from "./ui/TiltCard";

const ease = [0.76, 0, 0.24, 1];
const easeOut = [0.22, 1, 0.36, 1];

function SectionLabel({ text, number, id, onVisible }) {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && onVisible) {
          onVisible(id);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [id, onVisible]);

  return (
    <motion.div
      ref={ref}
      id={id}
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: easeOut }}
      className="flex items-center gap-4 mb-6"
    >
      <div className="glass-chip px-3 py-1 flex items-center gap-3">
        <span className="font-mono text-[10px] text-[var(--accent)] tracking-[0.3em]">{number}</span>
        <div className="h-px w-6 bg-[var(--warm-muted)] opacity-30" />
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--warm-white)]">{text}</span>
      </div>
    </motion.div>
  );
}

function FadeIn({ children, className, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: easeOut }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function ProjectOverlay({ project, onClose }) {
  const overlayRef = useRef(null);
  const [activeSection, setActiveSection] = useState("01");
  const [allowTilt, setAllowTilt] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    
    // Enable tilt after clipPath animation finishes
    const timer = setTimeout(() => setAllowTilt(true), 800);
    
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
      clearTimeout(timer);
    };
  }, [onClose]);

  if (!project) return null;

  const stackTags = project.stack.split(/\s*[/·•]\s*/).filter(Boolean);
  
  // Progress rail sections
  const sections = [];
  if (project.problem) sections.push("01");
  if (project.approach) sections.push("02");
  if (project.architecture) sections.push("03");
  if (project.learned) sections.push("04");

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[8000] bg-[var(--warm-black)]"
        initial={{ clipPath: "circle(0% at 50% 50%)" }}
        animate={{ clipPath: "circle(150% at 50% 50%)" }}
        exit={{ clipPath: "circle(0% at 50% 50%)" }}
        transition={{ duration: 0.8, ease }}
      >
        {/* Scroll Progress Rail Portaled out of clipPath wrapper */}
        {sections.length > 0 && createPortal(
          <div className="hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 z-[8100] h-[40vh] w-[3px] bg-white/5 rounded-full">
            <div className="absolute top-0 left-0 w-full bg-[var(--accent)] transition-all duration-500 rounded-full" 
                 style={{ 
                   height: `${((sections.indexOf(activeSection) + 1) / sections.length) * 100}%` 
                 }} 
            />
            {sections.map((num, idx) => (
              <div 
                key={num} 
                className={`absolute w-2 h-2 rounded-full -left-[2.5px] transition-all duration-300 ${activeSection === num ? 'bg-[var(--accent)] shadow-[0_0_10px_var(--accent)] scale-125' : 'bg-white/20'}`} 
                style={{ top: `${(idx / (sections.length - 1 || 1)) * 100}%`, marginTop: '-4px' }} 
              />
            ))}
          </div>,
          document.body
        )}

        <button onClick={onClose} className="fixed top-8 right-8 z-[8100] w-12 h-12 rounded-full glass-chip flex items-center justify-center hover:bg-white/10 hover:border-[var(--accent)]/30 hover:scale-105 transition-all text-[var(--warm-white)]">
          <X size={18} />
        </button>

        {/* Scrollable Content */}
        <div ref={overlayRef} className="absolute inset-0 overflow-y-auto overflow-x-hidden">
          {/* Hero Image Boxed */}
          <div className="relative pt-24 px-6 sm:px-10 lg:px-16 max-w-6xl mx-auto">
            {project.image && (
              <div className="relative h-[40vh] sm:h-[50vh] w-full rounded-2xl overflow-hidden shadow-2xl glass-panel">
                {allowTilt ? (
                  <TiltCard intensity={0.05} maxTilt={8} className="w-full h-full">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      initial={{ scale: 1.15 }}
                      animate={{ scale: 1.05 }} 
                      transition={{ duration: 1.2, ease: easeOut }}
                      className="w-full h-full object-cover brightness-[0.75]"
                    />
                  </TiltCard>
                ) : (
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    initial={{ scale: 1.15 }}
                    animate={{ scale: 1.05 }}
                    transition={{ duration: 1.2, ease: easeOut }}
                    className="w-full h-full object-cover brightness-[0.75]"
                  />
                )}
              </div>
            )}
          </div>

          {/* Title Area (Below Image) */}
          <div className="max-w-4xl lg:ml-24 px-6 sm:px-10 lg:px-16 pt-12 pb-10">
            <FadeIn delay={0.3}>
              <div className="flex items-center gap-4 mb-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--accent)]">
                  {project.tag}
                </span>
                <span className="w-5 h-px bg-[var(--warm-muted)] opacity-30" />
                <span className="font-mono text-[10px] text-[var(--warm-dim)]">{project.year}</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight leading-[0.95] text-[var(--warm-white)]">
                {project.title}
              </h2>
            </FadeIn>

            <FadeIn delay={0.5}>
              <p className="text-base sm:text-lg text-[var(--warm-muted)] leading-relaxed max-w-2xl mt-6">
                {project.description}
              </p>
            </FadeIn>
          </div>

          {/* Stack + Actions bar */}
          <div className="border-y border-[var(--warm-white)]/[0.03] relative z-10">
            <div className="max-w-4xl lg:ml-24 px-6 sm:px-10 lg:px-16 py-5 flex flex-wrap items-center justify-between gap-6">
              <div className="flex flex-wrap gap-2 flex-1 min-w-[200px]">
                {stackTags.map((t) => (
                  <span key={t} className="glass-chip px-3 py-1.5 text-[10px] font-mono tracking-widest uppercase text-[var(--warm-white)] rounded-full">{t.trim()}</span>
                ))}
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--warm-white)] text-[var(--warm-black)] font-medium text-[12px] tracking-wide hover:bg-[var(--warm-cream)] transition-colors"
                  >
                    <Github size={13} /> Source
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-chip text-[var(--warm-white)] font-medium text-[12px] tracking-wide hover:border-[var(--accent)]/50 hover:text-[var(--accent)] transition-colors"
                  >
                    <ExternalLink size={13} /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Content sections */}
          <div className="max-w-4xl lg:ml-24 px-6 sm:px-10 lg:px-16 pt-16 pb-32 space-y-20 relative z-10">
            {/* Problem */}
            {project.problem && (
              <FadeIn delay={0.1}>
                <SectionLabel text="The Problem" number="01" id="01" onVisible={setActiveSection} />
                <div className="pl-6 border-l border-[var(--accent)]/20">
                  <p className="text-base sm:text-lg text-[var(--warm-cream)] leading-[1.8] font-light">
                    {project.problem}
                  </p>
                </div>
              </FadeIn>
            )}

            {/* Approach */}
            {project.approach && (
              <FadeIn delay={0.15}>
                <SectionLabel text="The Approach" number="02" id="02" onVisible={setActiveSection} />
                <div className="pl-6 border-l border-[var(--accent)]/20">
                  <p className="text-base sm:text-lg text-[var(--warm-cream)] leading-[1.8] font-light">
                    {project.approach}
                  </p>
                </div>
              </FadeIn>
            )}

            {/* Architecture */}
            {project.architecture && (
              <FadeIn delay={0.2}>
                <SectionLabel text="System Architecture" number="03" id="03" onVisible={setActiveSection} />
                <div className="pl-6 border-l border-[var(--accent)]/20">
                  <p className="text-base sm:text-lg text-[var(--warm-cream)] leading-[1.8] font-light mb-10">
                    {project.architecture}
                  </p>
                </div>

                {/* Challenges + Learnings glass grid */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="glass-panel p-6 rounded-xl hover:border-[var(--accent)]/20 transition-colors">
                    <div className="glass-chip inline-block px-3 py-1.5 rounded-full mb-4">
                      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--warm-dim)]">
                        Core Challenges
                      </p>
                    </div>
                    <p className="text-sm text-[var(--warm-muted)] leading-relaxed">
                      {project.challenges}
                    </p>
                  </div>
                  <div className="glass-panel p-6 rounded-xl hover:border-[var(--accent)]/20 transition-colors">
                    <div className="glass-chip inline-block px-3 py-1.5 rounded-full mb-4">
                      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--warm-dim)]">
                        Key Learnings
                      </p>
                    </div>
                    <p className="text-sm text-[var(--warm-muted)] leading-relaxed">
                      {project.learned}
                    </p>
                  </div>
                </div>
              </FadeIn>
            )}

            {/* Reflection */}
            {project.learned && (
              <FadeIn delay={0.25}>
                <SectionLabel text="Reflection" number="04" id="04" onVisible={setActiveSection} />
                <div className="relative rounded-2xl glass-panel p-8 sm:p-10 overflow-hidden border-[var(--accent)]/20">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--accent)]/[0.05] rounded-full blur-[60px] pointer-events-none" />
                  <div className="relative">
                    <div className="glass-chip inline-block px-3 py-1.5 rounded-full mb-5">
                      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--accent)] opacity-90">
                        Final Thoughts
                      </p>
                    </div>
                    <p className="text-base sm:text-lg text-[var(--warm-cream)] leading-[1.8] font-light">
                      {project.learned}
                    </p>
                  </div>
                </div>
              </FadeIn>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
