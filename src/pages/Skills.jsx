import { motion } from "framer-motion";
import { useState } from "react";
import {
  Code2, Server, Layout, Database, Link as Chain, BookOpen, Wrench
} from "lucide-react";

const skillCategories = [
  {
    title: "Languages",
    icon: <Code2 className="text-indigo-500" size={28} />,
    skills: [
      { name: "Java", level: 90 },
      { name: "Python", level: 85 },
      { name: "JavaScript", level: 85 },
      { name: "SQL", level: 80 },
      { name: "Solidity", level: 75 },
      { name: "C++", level: 70 }
    ],
    details: "Strong foundation for backend systems, blockchain development, and performance-oriented programming."
  },
  {
    title: "Backend Development",
    icon: <Server className="text-fuchsia-500" size={28} />,
    skills: [
      { name: "Spring Boot", level: 90 },
      { name: "Node.js", level: 80 },
      { name: "Express.js", level: 85 },
      { name: "REST APIs", level: 90 },
      { name: "Microservices", level: 80 }
    ],
    details: "Designing scalable APIs, service orchestration, and enterprise-grade backend architecture."
  },
  {
    title: "Frontend Development",
    icon: <Layout className="text-blue-500" size={28} />,
    skills: [
      { name: "React", level: 85 },
      { name: "HTML5", level: 90 },
      { name: "CSS3", level: 85 },
      { name: "JavaScript", level: 85 },
      { name: "DOM", level: 80 }
    ],
    details: "Building performant UI with strong component architecture and state management."
  },
  {
    title: "Databases",
    icon: <Database className="text-emerald-500" size={28} />,
    skills: [
      { name: "MySQL", level: 85 },
      { name: "MongoDB", level: 80 },
      { name: "Schema Design", level: 85 },
      { name: "Optimization", level: 75 }
    ],
    details: "Normalized schema design, indexing strategies, and data-layer performance tuning."
  },
  {
    title: "Blockchain",
    icon: <Chain className="text-amber-500" size={28} />,
    skills: [
      { name: "Solidity", level: 80 },
      { name: "Web3j", level: 75 },
      { name: "Smart Contracts", level: 85 },
      { name: "Ethereum", level: 80 },
      { name: "Polygon", level: 75 }
    ],
    details: "Trustless systems, asset tokenization, and backend-first blockchain integrations."
  },
  {
    title: "Core CS",
    icon: <BookOpen className="text-purple-500" size={28} />,
    skills: [
      { name: "DSA", level: 85 },
      { name: "OOP", level: 90 },
      { name: "DBMS", level: 85 },
      { name: "OS", level: 80 },
      { name: "Computer Networks", level: 80 }
    ],
    details: "Strong fundamentals that drive architecture, scalability, and system reliability."
  },
  {
    title: "Tools & Cloud",
    icon: <Wrench className="text-gray-500" size={28} />,
    skills: [
      { name: "Git", level: 90 },
      { name: "Postman", level: 85 },
      { name: "JWT Auth", level: 85 },
      { name: "AWS", level: 75 },
      { name: "Debugging", level: 90 }
    ],
    details: "Developer tooling, secure authentication flows, and cloud-ready deployments."
  }
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } }
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 }
};

export default function Skills() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="max-w-6xl mx-auto px-6 py-24">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
          Technical Skills
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          A focused engineering toolkit centered on scalable backend systems,
          blockchain infrastructure, and production-grade software design.
        </p>
      </motion.div>

      {/* GRID */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
      >
        {skillCategories.map((cat, idx) => {
          const isOpen = openIndex === idx;

          return (
            <motion.div
              key={idx}
              variants={item}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="relative group rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-neutral-950 p-8 shadow-sm hover:shadow-xl transition-all"
            >
              {/* SCROLL FOCUS GLOW */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-indigo-500/10 to-fuchsia-500/10 opacity-0 group-hover:opacity-100 blur-xl transition pointer-events-none" />

              {/* HEADER */}
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="relative w-full text-left"
              >
                <div className="flex items-center gap-4 mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
                  <div className="p-2 rounded-lg bg-gray-50 dark:bg-neutral-900">
                    {cat.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {cat.title}
                  </h3>
                </div>
              </button>

              {/* SHORT DESCRIPTION */}
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                {cat.details}
              </p>

              {/* SKILL BARS */}
              <div className="space-y-3">
                {cat.skills.map(skill => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700 dark:text-gray-300">
                        {skill.name}
                      </span>
                      <span className="text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* EXPANDABLE SECTION */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: isOpen ? "auto" : 0,
                  opacity: isOpen ? 1 : 0
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="overflow-hidden mt-6 border-t border-gray-100 dark:border-gray-800 pt-4"
              >
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  I don’t just use these tools — I focus on how they fit into real-world systems:
                  maintainability, performance, security, and long-term scalability.
                </p>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
