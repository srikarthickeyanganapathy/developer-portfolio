import { useRef, useEffect, forwardRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import InteractiveFolderGallery from "./ui/InteractiveFolderGallery";

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = forwardRef(({ onProjectClick }, ref) => {
  const internalRef = useRef(null);
  const resolvedRef = ref || internalRef;
  const headerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation on scroll
      ScrollTrigger.create({
        trigger: headerRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.from(".projects-animate", {
            y: 40,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.1,
          });
        },
      });
    }, resolvedRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={resolvedRef} id="projects" className="section section--projects py-20 sm:py-28 overflow-hidden relative">
      {/* Glow Blob */}
      <div className="glow-blob w-[500px] h-[500px] -left-64 top-1/2 bg-[var(--glow-primary)] mix-blend-screen" />
      
      {/* Header */}
      <div data-transition-target id="projects-header" ref={headerRef} className="mx-auto max-w-[1200px] px-6 sm:px-10 lg:px-16 mb-8 relative z-10">
        <p className="projects-animate font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--warm-dim)] mb-5">
          Selected Work
        </p>
        <h2 className="projects-animate text-[clamp(2rem,4vw,3.5rem)] font-display font-extrabold leading-[0.95] tracking-tight text-[var(--warm-white)]">
          Projects that{" "}
          <span className="text-[var(--accent)]">shipped.</span>
        </h2>
        <p className="projects-animate mt-3 max-w-md text-sm text-[var(--warm-dim)]">
          Click the folder to open · Select a file to explore the case study
        </p>
      </div>

      {/* Interactive Folder Gallery replacing CascadingProjectCards */}
      <div className="w-full relative z-10">
        <InteractiveFolderGallery onProjectClick={onProjectClick} />
      </div>
    </section>
  );
});

export default ProjectsSection;
