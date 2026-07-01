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

gsap.registerPlugin(ScrollTrigger);

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

  // Set up ScrollTrigger for App transitions and Navbar active state
  useEffect(() => {
    if (!loading && mainRef.current) {
      const ctx = gsap.context(() => {
        const sections = gsap.utils.toArray('main > section');

        sections.forEach((section, i) => {
          // Update active section for Navbar
          ScrollTrigger.create({
            trigger: section,
            start: "top center",
            end: "bottom center",
            onToggle: (self) => {
              if (self.isActive) setActiveSection(i);
            }
          });
        });

        // Delay to ensure layout is ready after DOM paints
        setTimeout(() => ScrollTrigger.refresh(), 300);
      }, mainRef);

      return () => ctx.revert();
    }
  }, [loading]);

  return (
    <>
      <CustomCursor />
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      <div className="noise relative min-h-screen bg-[var(--warm-black)] text-[var(--warm-white)] overflow-x-hidden">
        <AnimatePresence>
          {loading && <Preloader onComplete={handlePreloaderComplete} />}
        </AnimatePresence>

        {!loading && (
          <main ref={mainRef} className="relative z-10">
            <HeroSection visible={!loading} />
            <AboutSection ref={aboutRef} />
            <AboutToProjectsTransition aboutRef={aboutRef} projectsRef={projectsRef} />
            <ProjectsSection ref={projectsRef} onProjectClick={handleProjectClick} />
            <BirdTransition />
            <ContactSection />
          </main>
        )}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectOverlay project={selectedProject} onClose={handleOverlayClose} />
        )}
      </AnimatePresence>
    </>
  );
}
