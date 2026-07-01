import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profileImage from "../assets/mypic.jpg";
import StatusBadge from "./StatusBadge";
import GlassOrb from "./GlassOrb";

gsap.registerPlugin(ScrollTrigger);

const easeOut = [0.22, 1, 0.36, 1];

const socials = [
  { icon: Github, href: "https://github.com/srikarthickeyanganapathy", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/sri-karthickeyan-ganapathy-597773261/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:srikarthickeyang@gmail.com", label: "Email" },
];

const techStack = ["Java", "System Design", "React", "Spring Boot"];

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
            Sri Karthickeyan
            <br />
            <span className="text-[var(--accent)]">Ganapathy</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-animate text-lg sm:text-xl text-[var(--warm-muted)] leading-relaxed max-w-lg mb-6">
            Full-Stack Developer crafting enterprise backends,
            smart-contract systems, and interfaces that breathe.
          </p>

          {/* Tech badges */}
          <div className="hero-animate flex flex-wrap gap-2 mb-8">
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

          {/* CTA */}
          <Magnetic className="inline-block">
            <a
              href="#projects"
              className="hero-animate group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[var(--warm-white)] text-[var(--warm-black)] font-semibold text-sm hover:bg-[var(--warm-cream)] transition-colors duration-500"
            >
              View My Work
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </Magnetic>
        </div>

        {/* RIGHT — Portrait */}
        <div ref={imageRef} className="relative flex justify-center lg:justify-center">
          <div className="relative group">
            {/* Glass Orb placed strictly behind portrait container */}
            <GlassOrb />
            
            {/* Glow */}
            <div className="absolute -inset-12 rounded-full bg-gradient-to-tr from-[var(--accent)]/10 to-[var(--warm-cream)]/5 blur-[60px] opacity-50 group-hover:opacity-80 transition-opacity duration-700" />

            {/* Portrait */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden border border-[var(--warm-white)]/[0.06] shadow-2xl shadow-[var(--accent)]/5">
              <img
                src={profileImage}
                alt="Sri Karthickeyan Ganapathy"
                className="w-full h-full object-cover object-top grayscale-[20%] group-hover:grayscale-0 scale-[1.06] group-hover:scale-100 transition-all duration-700"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--warm-black)]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <div>
                  <p className="text-[var(--warm-white)] font-display font-semibold text-sm">Sri Karthickeyan</p>
                  <p className="text-[var(--warm-muted)] text-xs tracking-widest uppercase mt-0.5 font-mono">Full-Stack · Blockchain · ML</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
