import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Github, ExternalLink, AlertTriangle, Lightbulb, Cpu, Layers } from "lucide-react";
import { projects } from "../data/projects";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800">Project not found</h2>
        <Link to="/projects" className="mt-4 text-indigo-600 hover:underline">Back to Projects</Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-6 py-12">
      {/* Back Button */}
      <Link 
        to="/projects" 
        className="inline-flex items-center text-gray-500 hover:text-indigo-600 transition-colors mb-8"
      >
        <ArrowLeft size={18} className="mr-2" /> Back to Gallery
      </Link>

      {/* Hero Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-semibold mb-4">
          {project.tag}
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
          {project.title}
        </h1>
        
        {/* Links */}
        <div className="flex gap-4">
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition">
              <Github size={18} /> GitHub Repo
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition">
              <ExternalLink size={18} /> Live Demo
            </a>
          )}
        </div>
      </motion.div>

      {/* Main Image (Optional Banner) */}
      {project.image && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl overflow-hidden shadow-2xl mb-16 border border-gray-100"
        >
          <img src={project.image} alt={project.title} className="w-full object-cover max-h-[500px]" />
        </motion.div>
      )}

      {/* Case Study Content */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid md:grid-cols-[1fr_2px_1fr] gap-8 md:gap-12 relative"
      >
        {/* Left Column */}
        <div className="space-y-12">
          <section>
            <h3 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-4">
              <AlertTriangle className="text-amber-500" /> The Problem
            </h3>
            <p className="text-gray-600 leading-relaxed">{project.problem}</p>
          </section>

          <section>
            <h3 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-4">
              <Cpu className="text-indigo-500" /> Tech Stack
            </h3>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-gray-700 font-medium">
              {project.stack}
            </div>
          </section>
        </div>

        {/* Divider Line (Visual) */}
        <div className="hidden md:block bg-gradient-to-b from-transparent via-gray-200 to-transparent w-full h-full"></div>

        {/* Right Column */}
        <div className="space-y-12">
          <section>
            <h3 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-4">
              <Lightbulb className="text-yellow-500" /> The Approach
            </h3>
            <p className="text-gray-600 leading-relaxed">{project.approach}</p>
          </section>

          <section>
            <h3 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-4">
              <Layers className="text-green-500" /> Key Learnings
            </h3>
            <p className="text-gray-600 leading-relaxed">{project.learned}</p>
          </section>
        </div>
      </motion.div>

      {/* Full Width Architecture Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 bg-white border border-gray-100 rounded-2xl p-8 shadow-sm"
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-6">System Architecture & Challenges</h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Technical Architecture</h4>
            <p className="text-gray-600 leading-relaxed mb-6">{project.architecture}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Core Challenges</h4>
            <p className="text-gray-600 leading-relaxed">{project.challenges}</p>
          </div>
        </div>
      </motion.section>

    </article>
  );
}