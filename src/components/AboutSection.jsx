import { useEffect, useRef, useState, forwardRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cpu, Database, Shield, GraduationCap } from "lucide-react";
import { motion, useInView, animate } from "framer-motion";
import SkillCardGrid from "./SkillCardGrid";
import TiltCard from "./ui/TiltCard";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    category: "Backend",
    items: [
      { name: "Java", level: 3 },
      { name: "Spring Boot", level: 3 },
      { name: "Python", level: 3 },
      { name: "FastAPI", level: 2 },
      { name: "Node.js", level: 2 },
      { name: "Express", level: 2 },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "React", level: 3 },
      { name: "JavaScript", level: 3 },
      { name: "Tailwind CSS", level: 3 },
      { name: "Framer Motion", level: 2 },
    ],
  },
  {
    category: "Blockchain",
    items: [
      { name: "Solidity", level: 3 },
      { name: "Web3j", level: 2 },
      { name: "Ethereum", level: 2 },
      { name: "Polygon", level: 2 },
    ],
  },
  {
    category: "Data & ML",
    items: [
      { name: "PyTorch", level: 2 },
      { name: "OpenCV", level: 2 },
      { name: "MongoDB", level: 2 },
      { name: "Redis", level: 2 },
      { name: "PostgreSQL", level: 3 },
    ],
  },
];

const nowExploring = ["Physics-informed ML", "Private/permissioned chains", "Distributed systems tracing"];

function CounterCard({ val, label, suffix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, val, {
        duration: 2,
        ease: "easeOut",
        onUpdate(value) {
          setCount(Math.floor(value));
        }
      });
      return () => controls.stop();
    }
  }, [isInView, val]);

  return (
    <div ref={ref} className="glass-panel glass-hover px-5 py-4 rounded-xl text-center min-w-[100px]">
      <span className="font-display text-2xl sm:text-3xl font-bold text-[var(--accent)]">
        {count.toString().padStart(2, '0')}{suffix}
      </span>
      <p className="text-[9px] text-[var(--warm-dim)] uppercase tracking-[0.25em] mt-1 font-mono">{label}</p>
    </div>
  );
}

const AboutSection = forwardRef((props, ref) => {
  const internalRef = useRef(null);
  const resolvedRef = ref || internalRef;
  const contentRef = useRef(null);
  const diveRef = useRef(null);
  const bgGlowRef = useRef(null);
  const headingRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Enhanced Dive-in transition: multi-layer depth for a true "falling into the screen" feel
      const diveTl = gsap.timeline({
        scrollTrigger: {
          trigger: diveRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
          refreshPriority: 2,
        },
      });

      // Vignette + chromatic/blur "warp" — sharpest right as content lands
      diveTl.fromTo(
        ".dive-vignette",
        {
          opacity: 0,
          boxShadow: "inset 0 0 20px 10px rgba(8, 8, 8, 0)",
          filter: "blur(0px) hue-rotate(0deg)",
        },
        {
          opacity: 0.8,
          boxShadow: "inset 0 0 80px 40px rgba(8, 8, 8, 0.8)",
          filter: "blur(6px) hue-rotate(8deg)",
          duration: 0.35,
          ease: "none",
        }
      );

      // Layer 1 (furthest back) — ambient glow, slowest / largest scale swing
      diveTl.fromTo(
        bgGlowRef.current,
        { scale: 1.6, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.9, ease: "power2.out" },
        0.05
      );

      // Layer 2 (mid) — heading, arrives first and fastest
      diveTl.fromTo(
        headingRef.current,
        { scale: 0.8, opacity: 0, z: -60, filter: "blur(4px)" },
        { scale: 1, opacity: 1, z: 0, filter: "blur(0px)", duration: 0.7, ease: "power3.out" },
        0.15
      );

      // Layer 3 (nearest) — body copy + skill cards, deepest start, lands last
      diveTl.fromTo(
        bodyRef.current,
        { scale: 0.7, opacity: 0, z: -140, filter: "blur(8px)" },
        { scale: 1, opacity: 1, z: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out" },
        0.28
      );

      // Skill cards: 3D flip-in, staggered, tied to the same scrub
      diveTl.fromTo(
        ".skill-card",
        { rotateY: 90, opacity: 0, transformPerspective: 800 },
        { rotateY: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power2.out" },
        0.4
      );

      // Vignette clears once everything has landed
      diveTl.to(
        ".dive-vignette",
        { opacity: 0, filter: "blur(0px) hue-rotate(0deg)", duration: 0.4, ease: "none" },
        0.65
      );
    }, resolvedRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={resolvedRef}>
      <div ref={diveRef} className="dive-trigger">
        <div className="dive-wrapper">
          <div className="dive-vignette" />

          <div ref={contentRef} className="section section--about relative" style={{ perspective: "1200px" }}>
            {/* Depth layer 0 — ambient background glow, furthest back */}
            <div
              ref={bgGlowRef}
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(circle at 30% 20%, var(--accent-glow) 0%, transparent 55%)",
              }}
            />

            <div data-transition-target className="mx-auto max-w-[1200px] w-full px-6 sm:px-10 lg:px-16 py-20 relative">

              <div className="flex items-center gap-4 mb-12">
                <div className="h-px w-10 bg-[var(--accent)] opacity-40" />
                <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--warm-dim)]">
                  About
                </span>
              </div>

              <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-20">
                <div>
                  {/* Depth layer 1 — heading, lands first */}
                  <h2 ref={headingRef} className="text-[clamp(2rem,4vw,3.5rem)] font-display font-extrabold leading-[0.95] tracking-tight text-[var(--warm-white)] mb-8">
                    Building systems
                    <br />
                    <span className="text-[var(--accent)]">that matter.</span>
                  </h2>

                  {/* Depth layer 2 — body copy, cards, stats: deepest start, lands last */}
                  <div ref={bodyRef}>
                    <p className="text-base sm:text-lg text-[var(--warm-muted)] leading-relaxed mb-6">
                      I'm a Software Engineer pursuing my B.Tech. in Artificial Intelligence and Machine Learning, bridging the gap
                      between enterprise-grade backends and decentralized systems. Whether it's
                      architecting a Spring Boot microservice or deploying ERC-20 tokens on Polygon,
                      I view technology as a tool to solve real human problems.
                    </p>

                    <p className="text-base text-[var(--warm-dim)] leading-relaxed mb-10">
                      I care deeply about code that reads as well as it runs. Every project I build is
                      designed to be used, maintained, and scaled — not just demonstrated.
                    </p>

                    <div className="flex items-start gap-4 p-5 rounded-xl glass-panel glass-hover mb-10">
                      <GraduationCap size={20} className="text-[var(--accent)] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-[var(--warm-white)] font-display">B.Tech - Artificial Intelligence and Machine Learning</p>
                        <p className="text-xs text-[var(--warm-dim)] mt-1 font-mono tracking-wide">Saveetha Engineering College · 2022 – 2026</p>
                      </div>
                    </div>

                    {/* Glass Counter Stats — now with tilt micro-interaction */}
                    <div className="flex flex-wrap gap-4 sm:gap-6 mt-10">
                      <TiltCard intensity={0.12} maxTilt={10}>
                        <CounterCard val={7} suffix="+" label="Projects Shipped" />
                      </TiltCard>
                      <TiltCard intensity={0.12} maxTilt={10}>
                        <CounterCard val={5} label="Tech Domains" />
                      </TiltCard>
                      <TiltCard intensity={0.12} maxTilt={10}>
                        <CounterCard val={8} suffix="+" label="Languages" />
                      </TiltCard>
                      <TiltCard intensity={0.12} maxTilt={10}>
                        <CounterCard val={20} suffix="+" label="GitHub Repos" />
                      </TiltCard>
                    </div>

                    {/* Now exploring */}
                    <div className="flex items-center gap-3 mt-8 flex-wrap">
                      <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--warm-dim)]">
                        Now exploring
                      </span>
                      {nowExploring.map((topic) => (
                        <span
                          key={topic}
                          className="text-[11px] font-mono px-3 py-1 rounded-full border border-[var(--accent)]/25 text-[var(--accent)]"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Interactive Skill Cards Grid — flip-in driven by the dive scrub timeline */}
                <SkillCardGrid skills={skills} />

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default AboutSection;