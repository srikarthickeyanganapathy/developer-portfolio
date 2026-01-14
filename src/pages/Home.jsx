import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-12"
    >
      {/* Intro */}
      <section>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Sri Karthickeyan Ganapathy
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          Full-stack developer integrating Machine Learning and Blockchain into real-world systems. 
          I focus on simplicity, security, and architectures that actually get used.
        </p>
      </section>

      {/* Social Links */}
      <div className="flex gap-5">
        <a href="https://github.com/srikarthickeyanganapathy" target="_blank" className="text-gray-400 hover:text-black dark:hover:text-white transition-colors"><Github size={20} /></a>
        <a href="https://linkedin.com" target="_blank" className="text-gray-400 hover:text-black dark:hover:text-white transition-colors"><Linkedin size={20} /></a>
        <a href="mailto:srikarthickeyang@gmail.com" className="text-gray-400 hover:text-black dark:hover:text-white transition-colors"><Mail size={20} /></a>
      </div>

      <hr className="border-gray-200 dark:border-gray-800" />

      {/* Philosophy */}
      <section className="prose prose-gray dark:prose-invert max-w-none">
        <p>
          I prefer discovery over invention and simplicity over complexity. I use
          <strong> Machine Learning</strong> and <strong>Blockchain</strong> as tools — not trends —
          to design systems that solve real problems without unnecessary abstraction.
        </p>
        <p>
          Right now, I’m focused on building full-stack systems with strong backend architecture,
          and exploring how decentralized systems and ML can be applied to industrial and data-driven applications.
        </p>
      </section>

      {/* Action */}
      <div>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          View Selected Work <ArrowRight size={16} />
        </Link>
      </div>
    </motion.div>
  );
}
