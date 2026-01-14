import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { projects } from "../data/projects"; 

export default function Projects() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }}
      className="space-y-12"
    >
      <h1 className="text-3xl font-bold tracking-tight text-black dark:text-white">
        Selected Projects
      </h1>

      <div className="flex flex-col space-y-10">
        {projects.map((p) => (
          <Link 
            key={p.id} 
            to={`/projects/${p.slug}`}
            className="group block"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-2">
              <h2 className="text-lg font-semibold text-black dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {p.title}
              </h2>
              <span className="text-xs font-mono text-gray-400 dark:text-gray-500 whitespace-nowrap border border-gray-100 dark:border-gray-800 px-2 py-1 rounded">
                {p.tag}
              </span>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-3">
              {p.description}
            </p>
            
            <div className="text-xs text-gray-400 dark:text-gray-500 font-mono">
              {p.stack}
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}