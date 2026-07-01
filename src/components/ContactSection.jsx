import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Github, Linkedin, ExternalLink, ArrowUpRight } from "lucide-react";
import GlassContactForm from "./GlassContactForm";

gsap.registerPlugin(ScrollTrigger);

const links = [
  { label: "Email", value: "srikarthickeyang@gmail.com", href: "mailto:srikarthickeyang@gmail.com", icon: Mail },
  { label: "GitHub", value: "srikarthickeyanganapathy", href: "https://github.com/srikarthickeyanganapathy", icon: Github },
  { label: "LinkedIn", value: "sri-karthickeyan-ganapathy", href: "https://www.linkedin.com/in/sri-karthickeyan-ganapathy-597773261/", icon: Linkedin },
  { label: "Résumé", value: "Download PDF", href: "/resume.pdf", icon: ExternalLink },
];

/* Paper Airplane SVG */
function PaperAirplane({ className }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 8L42 24L6 40L12 24L6 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 24H42" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/* Trail particle */
function TrailDot({ delay, x, y }) {
  return (
    <div
      className="airplane-trail-dot"
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width: 3,
        height: 3,
        borderRadius: "50%",
        background: "var(--accent)",
        opacity: 0,
      }}
      data-delay={delay}
    />
  );
}

export default function ContactSection() {
  const sectionRef = useRef(null);
  const airplaneRef = useRef(null);
  const contentRef = useRef(null);
  const trailRef = useRef(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 60%",
        once: true,
        onEnter: () => {
          if (animated) return;
          setAnimated(true);

          const tl = gsap.timeline();

          // Initial state - show envelope/paper at starting point
          tl.set(airplaneRef.current, {
            opacity: 0,
            x: window.innerWidth * 0.1,
            y: window.innerHeight * 0.7,
            rotation: 0,
            scale: 0.5
          });

          // 1. Paper unfolds/prepares (scale up slightly)
          tl.to(airplaneRef.current, {
            scale: 1.2,
            rotation: 5,
            duration: 0.4,
            ease: "power2.out"
          });

          // 2. Paper folds into airplane
          tl.to(airplaneRef.current, {
            rotation: -5,
            scale: 1,
            duration: 0.3,
            ease: "power2.in"
          });

          // 3. Airplane takes off
          tl.to(airplaneRef.current, {
            opacity: 1,
            duration: 0.3,
            ease: "power3.out"
          });

          tl.to(airplaneRef.current, {
            duration: 2.2,
            ease: "power2.inOut",
            keyframes: [
              { x: window.innerWidth * 0.3, y: window.innerHeight * 0.4, rotation: 10, duration: 0.5 },
              { x: window.innerWidth * 0.5, y: window.innerHeight * 0.2, rotation: -5, duration: 0.6 },
              { x: window.innerWidth * 0.7, y: window.innerHeight * 0.4, rotation: 0, duration: 0.6 },
              { x: window.innerWidth * 0.85, y: window.innerHeight * 0.5, rotation: 2, duration: 0.5 }
            ],
            onStart: () => {
              gsap.to(".airplane-trail-dot", {
                opacity: 0.4,
                duration: 0.3,
                stagger: 0.04,
                ease: "power1.out",
              });
            },
            onComplete: () => {
              gsap.to(".airplane-trail-dot", {
                opacity: 0,
                duration: 0.6,
                stagger: 0.02,
                ease: "power2.in",
              });

              gsap.to(airplaneRef.current, {
                y: window.innerHeight * 0.52,
                rotation: 0,
                duration: 0.4,
                ease: "elastic.out(1, 0.5)",
                onComplete: () => {
                  gsap.to(airplaneRef.current, {
                    y: window.innerHeight * 0.5,
                    duration: 0.3,
                    ease: "power2.out"
                  });
                }
              });
            }
          });

          // 4. Content fades in after airplane arrives
          tl.from(contentRef.current, {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          }, "-=0.6");

          // Stagger form elements
          tl.from(".contact-animate", {
            y: 25,
            opacity: 0,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.06,
          }, "-=0.4");
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [animated]);

  // Generate trail dots along the arc path
  const trailDots = Array.from({ length: 20 }, (_, i) => ({
    x: (i / 20) * 80 + 5,
    y: 50 - Math.sin((i / 20) * Math.PI) * 20,
    delay: i * 0.05,
  }));

  return (
    <section ref={sectionRef} id="contact" className="section section--contact relative overflow-hidden">
      {/* Glow Blob */}
      <div className="glow-blob w-[600px] h-[600px] -right-64 -bottom-64 bg-[var(--glow-primary)] mix-blend-screen" />
      
      {/* Airplane animation container */}
      <div className="airplane-container pointer-events-none" ref={trailRef}>
        {/* Trail dots */}
        {trailDots.map((dot, i) => (
          <TrailDot key={i} {...dot} />
        ))}

        {/* Paper airplane */}
        <div ref={airplaneRef} className="airplane absolute">
          <PaperAirplane className="w-10 h-10 text-[var(--accent)]" />
        </div>
      </div>

      {/* Main content */}
      <div ref={contentRef} className="mx-auto max-w-[1200px] w-full px-6 sm:px-10 lg:px-16 py-20 sm:py-28 relative z-10">

        {/* Eyebrow */}
        <p className="contact-animate font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--warm-dim)] mb-8">
          Contact
        </p>

        {/* Heading */}
        <div className="contact-animate mb-14">
          <h2 className="text-[clamp(2.5rem,5.5vw,5rem)] font-display font-extrabold leading-[0.9] tracking-tight text-[var(--warm-white)]">
            Got a project?
            <br />
            <span className="text-[var(--accent)]">Let's build it.</span>
          </h2>
          <p className="mt-4 max-w-md text-base text-[var(--warm-dim)]">
            Open to full-time roles, freelance projects, and interesting ideas.
            I read every message — reach out and let's talk.
          </p>
        </div>

        {/* Grid: Form + Links */}
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-14 lg:gap-16">

          {/* Form */}
          <div className="contact-animate z-20">
            <GlassContactForm />
          </div>

          {/* Links */}
          <div className="space-y-3 contact-animate z-20">
            {links.map(({ label, value, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
                className="flex items-center justify-between py-4 border-b border-[var(--warm-white)]/[0.05] group hover:translate-x-1 transition-transform duration-500 glass-hover px-4 rounded-lg -mx-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full glass-chip flex items-center justify-center group-hover:border-[var(--accent)]/30 transition-colors duration-500">
                    <Icon size={16} strokeWidth={1.5} className="text-[var(--warm-dim)] group-hover:text-[var(--accent)] transition-colors duration-500" />
                  </div>
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-widest text-[var(--warm-dim)]">{label}</p>
                    <p className="text-sm text-[var(--warm-muted)] group-hover:text-[var(--warm-white)] transition-colors duration-500">{value}</p>
                  </div>
                </div>
                <ArrowUpRight size={14} className="text-[var(--warm-dim)] group-hover:text-[var(--accent)] transition-colors duration-500" />
              </a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="contact-animate mt-24 pt-5 border-t border-[var(--warm-white)]/[0.05] flex flex-col sm:flex-row items-center justify-between gap-3 text-[var(--warm-dim)] text-[11px] font-mono">
          <span>© 2026 Sri Karthickeyan Ganapathy</span>
          <span className="tracking-widest uppercase opacity-50">Built with React · Three.js · GSAP</span>
        </div>
      </div>
    </section>
  );
}
