import { useState, useCallback, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Preloader from "./components/Preloader";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import AboutToProjectsTransition from "./components/AboutToProjectsTransition";
import ProjectsSection from "./components/ProjectsSection";
import BirdTransition from "./components/BirdTransition";
import ContactSection from "./components/ContactSection";
import ProjectOverlay from "./components/ProjectOverlay";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import GlobalScene from "./components/GlobalScene";
import ScrollProgress from "./components/ScrollProgress";

gsap.registerPlugin(ScrollTrigger);

// Mobile browsers resize the viewport when the address bar collapses/expands
// on scroll. Without this, GSAP would treat that as a real resize and
// recalculate every ScrollTrigger mid-scroll, causing visible jumps.
ScrollTrigger.config({ ignoreMobileResize: true });

export default function App() {
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeSection, setActiveSection] = useState(0);
  const mainRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);

  const handlePreloaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  const handleProjectClick = useCallback((project) => {
    setSelectedProject(project);
  }, []);

  const handleOverlayClose = useCallback(() => {
    setSelectedProject(null);
  }, []);

  const handleNavigate = useCallback((index) => {
    const sections = ["#hero", ".section--about", "#projects", "#contact"];
    const target = sections[index];
    if (target) {
      const el = document.querySelector(target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  useEffect(() => {
    if (!loading && mainRef.current) {
      const ctx = gsap.context(() => {
        const sections = gsap.utils.toArray('main > section');

        sections.forEach((section, i) => {
          ScrollTrigger.create({
            trigger: section,
            start: "top center",
            end: "bottom center",
            onToggle: (self) => {
              if (self.isActive) setActiveSection(i);
            }
          });
        });

        setTimeout(() => ScrollTrigger.refresh(), 300);
      }, mainRef);

      return () => ctx.revert();
    }
  }, [loading]);

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      <div className="noise relative min-h-screen text-[var(--warm-white)] overflow-x-hidden">
        <GlobalScene />
        
        <AnimatePresence>
          {loading && <Preloader onComplete={handlePreloaderComplete} />}
        </AnimatePresence>

        <main ref={mainRef} className="relative z-10 transition-opacity duration-700" style={{ opacity: loading ? 0 : 1, visibility: loading ? 'hidden' : 'visible', height: loading ? '100vh' : 'auto', overflow: loading ? 'hidden' : 'visible' }}>
          <HeroSection visible={!loading} />
          <AboutSection ref={aboutRef} />
          <AboutToProjectsTransition aboutRef={aboutRef} projectsRef={projectsRef} />
          <ProjectsSection ref={projectsRef} onProjectClick={handleProjectClick} />
          <BirdTransition />
          <ContactSection />
        </main>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectOverlay project={selectedProject} onClose={handleOverlayClose} />
        )}
      </AnimatePresence>
    </>
  );
}