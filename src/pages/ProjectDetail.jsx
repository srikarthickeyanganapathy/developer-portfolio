import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Github,
  ExternalLink,
  AlertTriangle,
  Lightbulb,
  Cpu,
  Layers,
} from "lucide-react";
import { projects } from "../data/projects";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function ProjectDetail() {
    const { slug } = useParams();
    const projectIndex = projects.findIndex((p) => p.slug === slug);
    const project = projects[projectIndex];
    const prev = projects[projectIndex - 1];
    const next = projects[projectIndex + 1];

    const { scrollYProgress } = useScroll();
    const heroY = useTransform(scrollYProgress, [0, 0.4], [0, -80]);
    const [activeSection, setActiveSection] = useState("problem");

    useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
        (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            }
        });
        },
        {
        rootMargin: "-40% 0px -50% 0px",
        threshold: 0
        }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!project) {
        return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Project not found
            </h2>
            <Link to="/projects" className="mt-4 text-indigo-600 hover:underline">
            Back to Projects
            </Link>
        </div>
        );
    }

    return (
        <article className="px-6 pt-12 sm:pt-16 md:pt-24 pb-32 relative">

        {/* Scroll Progress Indicator */}
        <motion.div
            style={{ scaleX: scrollYProgress }}
            className="fixed top-0 left-0 right-0 h-[3px] origin-left bg-gradient-to-r from-indigo-500 to-fuchsia-500 z-50 scroll-mt-21"
        />

        {/* Back Button */}
        <Link
            to="/projects"
            className="inline-flex items-center text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition mb-12"
        >
            <ArrowLeft size={18} className="mr-2" /> Back to Gallery
        </Link>

        {/* HERO */}
        <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.6 }}
            className="mb-16 scroll-mt-21"
        >
            <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-semibold mb-4">
            {project.tag}
            </span>

            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight max-w-4xl">
            {project.title}
            </h1>

            <div className="flex flex-wrap gap-4">
            {project.github && (
                <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition"
                >
                <Github size={18} /> GitHub Repo
                </a>
            )}
            {project.demo && (
                <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition"
                >
                <ExternalLink size={18} /> Live Demo
                </a>
            )}
            </div>
        </motion.div>

        {/* PARALLAX HERO IMAGE */}
        {project.image && (
            <motion.div
            style={{ y: heroY }}
            className="rounded-2xl overflow-hidden shadow-2xl mb-24 border border-gray-100 dark:border-gray-800 scroll-mt-21"
            >
            <img
                src={project.image}
                alt={project.title}
                className="w-full max-h-[520px] object-cover"
            />
            </motion.div>
        )}

        {/* GRID WITH STICKY SIDEBAR */}
        <div className="grid lg:grid-cols-[260px_1fr] gap-12">

            {/* STICKY SIDEBAR */}
            <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-6">

                <div className="text-sm font-mono text-gray-400 dark:text-gray-500">
                {project.year}
                </div>

                <div className="space-y-3 text-sm">
                <p className="text-gray-500 dark:text-gray-400">Tech Stack</p>
                <p className="text-gray-800 dark:text-gray-200 font-medium">
                    {project.stack}
                </p>
                </div>

                {/* SECTION LINKS */}
                <div className="relative space-y-2 text-sm">

                {[
                    { id: "problem", label: "Problem" },
                    { id: "approach", label: "Approach" },
                    { id: "architecture", label: "Architecture" },
                    { id: "learned", label: "Learnings" },
                ].map((item) => {
                    const isActive = activeSection === item.id;

                    return (
                    <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`block pl-4 transition-all ${
                        isActive
                            ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                            : "text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400"
                        }`}
                    >
                        {/* Active Indicator */}
                        {isActive && (
                        <motion.span
                            layoutId="active-indicator"
                            className="absolute left-0 w-[2px] h-5 bg-indigo-500 rounded-full"
                        />
                        )}
                        {item.label}
                    </a>
                    );
                })}

                </div>
            </div>
            </aside>



            {/* MAIN CONTENT */}
            <div className="space-y-20">

            {/* PROBLEM */}
            <motion.section
                id="problem"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="scroll-mt-21"
            >
                <h3 className="flex items-center gap-3 text-xl font-bold mb-4">
                <AlertTriangle className="text-amber-500" /> The Problem
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {project.problem}
                </p>
            </motion.section>

            {/* APPROACH */}
            <motion.section
                id="approach"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="scroll-mt-21"
            >
                <h3 className="flex items-center gap-3 text-xl font-bold mb-4">
                <Lightbulb className="text-yellow-500" /> The Approach
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {project.approach}
                </p>
            </motion.section>

            {/* ARCHITECTURE VISUAL */}
            <motion.section
                id="architecture"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-white dark:bg-neutral-950 border border-gray-100 dark:border-gray-800 rounded-2xl p-8 shadow-sm scroll-mt-21"
            >
                <h3 className="flex items-center gap-3 text-xl font-bold mb-6">
                <Cpu className="text-indigo-500" /> System Architecture
                </h3>

                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                {project.architecture}
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h4 className="font-semibold mb-2">Core Challenges</h4>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {project.challenges}
                    </p>
                </div>

                <div>
                    <h4 className="font-semibold mb-2">Key Learnings</h4>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {project.learned}
                    </p>
                </div>
                </div>
            </motion.section>

            {/* NEXT / PREVIOUS */}
            <div className="flex justify-between gap-6 pt-16">
                {prev ? (
                <Link
                    to={`/projects/${prev.slug}`}
                    className="group flex items-center gap-2 text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                >
                    <ArrowLeft size={16} />
                    <span className="group-hover:underline">{prev.title}</span>
                </Link>
                ) : <div />}

                {next && (
                <Link
                    to={`/projects/${next.slug}`}
                    className="group flex items-center gap-2 text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                >
                    <span className="group-hover:underline">{next.title}</span>
                    <ArrowRight size={16} />
                </Link>
                )}
            </div>

            </div>
        </div>
        </article>
    );
}