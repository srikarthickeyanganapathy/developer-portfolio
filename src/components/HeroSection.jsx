import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Github, Linkedin, Mail, ArrowRight, ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profileImage from "../assets/mypic_cut.png";
import StatusBadge from "./StatusBadge";
import SplitHeadline from "./SplitHeadline";
import ScrambleText from "./ScrambleText";
import OrbitBadges from "./OrbitBadges";

gsap.registerPlugin(ScrollTrigger);

const easeOut = [0.22, 1, 0.36, 1];

const socials = [
  { icon: Github, href: "https://github.com/srikarthickeyanganapathy", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/sri-karthickeyan-ganapathy-597773261/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:srikarthickeyang@gmail.com", label: "Email" },
];

const techStack = ["Java", "System Design", "React", "Spring Boot"];

const roles = [
  "Full-Stack Developer",
  "Blockchain Engineer",
  "ML Enthusiast",
  "Systems Architect",
];

/* ── Magnetic element ── */
function Magnetic({ children, className }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouse = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.3);
    y.set((e.clientY - cy) * 0.3);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Cursor-reactive 3D tilt (tracks mouse across the whole section) ── */
function ParallaxTilt({ children, sectionRef, strength = 1 }) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 80, damping: 15 });
  const sry = useSpring(ry, { stiffness: 80, damping: 15 });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      ry.set(px * 14 * strength);
      rx.set(-py * 14 * strength);
    };
    const handleLeave = () => {
      rx.set(0);
      ry.set(0);
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [sectionRef, strength, rx, ry]);

  return (
    <motion.div
      style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
}

export default function HeroSection({ visible }) {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (!visible) return;

    const ctx = gsap.context(() => {
      // Stagger entrance
      gsap.from(".hero-animate", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.2,
      });

      gsap.from(imageRef.current, {
        scale: 0.85,
        opacity: 0,
        rotation: -3,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.4,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [visible]);

  return (
    <section ref={sectionRef} id="hero" className="section section--hero relative overflow-hidden">
      <div className="mx-auto max-w-[1200px] w-full px-6 sm:px-10 lg:px-16 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-20 relative z-10">
        {/* LEFT — Text */}
        <div ref={contentRef}>
          {/* Eyebrow */}
          <div className="hero-animate mb-6 inline-block">
            <StatusBadge />
          </div>

          {/* Title */}
          <h1 className="hero-animate text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight mb-4 leading-[1.05]">
            <SplitHeadline text="Sri Karthickeyan" />
            <br />
            <SplitHeadline text="Ganapathy" className="text-[var(--accent)]" />
          </h1>

          {/* Scrambling role line */}
          <p className="hero-animate font-mono text-xs sm:text-sm text-[var(--accent)] tracking-[0.15em] mb-4 h-5">
            <span className="text-[var(--warm-dim)]">&lt;</span>
            <ScrambleText words={roles} />
            <span className="text-[var(--warm-dim)]"> /&gt;</span>
          </p>

          {/* Subtitle */}
          <p className="hero-animate text-lg sm:text-xl text-[var(--warm-muted)] leading-relaxed max-w-lg mb-6">
            Full-Stack Developer crafting enterprise backends,
            smart-contract systems, and interfaces that breathe.
          </p>

          {/* Tech badges (mobile/tablet only — desktop shows them orbiting the portrait) */}
          <div className="hero-animate flex flex-wrap gap-2 mb-8 lg:hidden">
            {techStack.map((tech) => (
              <span key={tech} className="tech-badge">{tech}</span>
            ))}
          </div>

          {/* Social links */}
          <div className="hero-animate flex gap-5 mb-8">
            {socials.map(({ icon: Icon, href, label }) => (
              <Magnetic key={label} className="inline-block">
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="text-[var(--warm-dim)] hover:text-[var(--accent)] transition-colors duration-500"
                >
                  <Icon size={20} strokeWidth={1.5} />
                </a>
              </Magnetic>
            ))}
          </div>

          {/* CTA row */}
          <div className="flex flex-wrap items-center gap-4">
            <Magnetic className="inline-block">
              <a
                href="#projects"
                data-cursor-text="View"
                className="hero-animate group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[var(--warm-white)] text-[var(--warm-black)] font-semibold text-sm hover:bg-[var(--warm-cream)] transition-colors duration-500"
              >
                View My Work
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </Magnetic>

            <Magnetic className="inline-block">
              <a
                href="/resume.pdf"
                download
                data-cursor-text="Get"
                className="hero-animate group inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-[var(--warm-white)]/15 text-[var(--warm-white)] font-semibold text-sm hover:border-[var(--accent)]/50 hover:text-[var(--accent)] transition-colors duration-500"
              >
                Download Résumé
              </a>
            </Magnetic>
          </div>

          {/* Quick-glance stat strip */}
          <div className="hero-animate flex flex-wrap gap-x-8 gap-y-3 mt-10 pt-6 border-t border-[var(--warm-white)]/[0.07]">
            {[
              { label: "Projects Shipped", value: "7+" },
              { label: "Currently", value: "Open to work" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-lg font-bold text-[var(--warm-white)]">{stat.value}</p>
                <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--warm-dim)] mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Cutout portrait standing against the site background */}
        <div ref={imageRef} className="relative flex justify-center lg:justify-center">
          <div className="relative group" style={{ perspective: "1200px" }}>
            {/* Orbiting tech badges (desktop only) */}
            <OrbitBadges items={techStack} radius={230} />

            <ParallaxTilt sectionRef={sectionRef} strength={0.6}>
              {/* Ambient glow grounding the figure — replaces the glass orb */}
              <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,_var(--accent)_0%,_transparent_70%)] blur-[80px] opacity-20 group-hover:opacity-35 transition-opacity duration-700 pointer-events-none" />

              {/* Contact-shadow ellipse for a "standing on ground" feel */}
              <div className="absolute left-1/2 bottom-4 -translate-x-1/2 w-56 h-8 rounded-full bg-black/50 blur-xl opacity-60 pointer-events-none" />

              {/* Cutout figure — no frame, no clip, drop shadow does the grounding */}
              <div className="relative w-[260px] sm:w-[300px] md:w-[340px] h-[420px] sm:h-[480px] md:h-[540px] flex items-end justify-center">
                <img
                  src={profileImage}
                  alt="Sri Karthickeyan Ganapathy"
                  className="max-w-full max-h-full object-contain object-bottom drop-shadow-[0_25px_35px_rgba(0,0,0,0.55)] scale-100 group-hover:scale-[1.03] transition-transform duration-700"
                  style={{
                    filter: "drop-shadow(0 0 40px rgba(200,184,160,0.12))",
                  }}
                />
              </div>
            </ParallaxTilt>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="hero-animate absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-[var(--warm-dim)]">Scroll</span>
        <ChevronDown size={16} className="text-[var(--warm-dim)]" strokeWidth={1.5} />
      </motion.div>
    </section>
  );
}