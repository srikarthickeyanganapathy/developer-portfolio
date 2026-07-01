import { useEffect, useRef, useState, forwardRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cpu, Database, Shield, GraduationCap } from "lucide-react";
import { motion, useInView, animate } from "framer-motion";
import SkillCardGrid from "./SkillCardGrid";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { category: "Backend", items: ["Java", "Spring Boot", "Python", "FastAPI", "Node.js", "Express"] },
  { category: "Frontend", items: ["React", "JavaScript", "Tailwind CSS", "Framer Motion"] },
  { category: "Blockchain", items: ["Solidity", "Web3j", "Ethereum", "Polygon"] },
  { category: "Data & ML", items: ["PyTorch", "OpenCV", "MongoDB", "Redis", "PostgreSQL"] },
];

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Enhanced Dive-in transition: strong Z-axis movement for "moving into screen" effect
      const diveTl = gsap.timeline({
        scrollTrigger: {
          trigger: diveRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
        },
      });

      diveTl.fromTo(
        ".dive-vignette",
        { opacity: 0, boxShadow: "inset 0 0 20px 10px rgba(8, 8, 8, 0)" },
        {
          opacity: 0.8,
          boxShadow: "inset 0 0 80px 40px rgba(8, 8, 8, 0.8)",
          duration: 0.4,
          ease: "none"
        }
      );

      diveTl.fromTo(
        contentRef.current,
        {
          scale: 0.85,
          opacity: 0,
          z: -100,
          perspective: "1000px"
        },
        {
          scale: 1,
          opacity: 1,
          z: 0,
          duration: 0.8,
          ease: "power3.out"
        },
        0.2
      );

      diveTl.to(
        ".dive-vignette",
        { opacity: 0, duration: 0.4, ease: "none" },
        0.6
      );

    }, resolvedRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={resolvedRef}>
      <div ref={diveRef} className="dive-trigger">
        <div className="dive-wrapper">
          <div className="dive-vignette" />

          <div ref={contentRef} className="section section--about" style={{ opacity: 0 }}>
            <div data-transition-target className="mx-auto max-w-[1200px] w-full px-6 sm:px-10 lg:px-16 py-20">
              
              <div className="flex items-center gap-4 mb-12">
                <div className="h-px w-10 bg-[var(--accent)] opacity-40" />
                <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--warm-dim)]">
                  About
                </span>
              </div>

              <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-20">
                <div>
                  <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-display font-extrabold leading-[0.95] tracking-tight text-[var(--warm-white)] mb-8">
                    Building systems
                    <br />
                    <span className="text-[var(--accent)]">that matter.</span>
                  </h2>

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

                  {/* Glass Counter Stats */}
                  <div className="flex flex-wrap gap-4 sm:gap-6 mt-10">
                    <CounterCard val={7} suffix="+" label="Projects Shipped" />
                    <CounterCard val={5} label="Tech Domains" />
                    <CounterCard val={8} suffix="+" label="Languages" />
                  </div>
                </div>

                {/* Interactive Skill Cards Grid */}
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
