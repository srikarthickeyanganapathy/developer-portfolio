import { motion } from "framer-motion";
import { Code2, Server, Layout, Database, Link, BookOpen, Wrench, Cloud } from "lucide-react";

const skillCategories = [
  {
    title: "Languages",
    icon: <Code2 className="text-indigo-600" size={24} />,
    skills: ["Java", "Python", "JavaScript", "SQL", "Solidity", "C++"]
  },
  {
    title: "Backend Development",
    icon: <Server className="text-fuchsia-600" size={24} />,
    skills: ["Spring Boot", "Node.js", "Express.js", "RESTful APIs", "Microservices"]
  },
  {
    title: "Frontend Development",
    icon: <Layout className="text-blue-500" size={24} />,
    skills: ["React", "HTML5", "CSS3", "JavaScript", "DOM Manipulation"]
  },
  {
    title: "Databases",
    icon: <Database className="text-emerald-600" size={24} />,
    skills: ["MySQL", "MongoDB", "Database Design", "Optimization"]
  },
  {
    title: "Blockchain",
    icon: <Link className="text-amber-600" size={24} />,
    skills: ["Solidity", "Web3j", "Smart Contracts", "Ethereum", "Polygon"]
  },
  {
    title: "Core CS",
    icon: <BookOpen className="text-purple-600" size={24} />,
    skills: ["Data Structures & Algorithms", "OOP", "DBMS", "OS", "Computer Networks"]
  },
  {
    title: "Tools & Cloud",
    icon: <Wrench className="text-gray-700" size={24} />,
    skills: ["Git", "Postman", "JWT Authentication", "AWS (Cloud Practitioner)", "Debugging"]
  }
];

export default function Skills() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-extrabold mb-4">Technical Skills</h1>
        <p className="text-xl text-gray-600">
          A comprehensive toolkit focused on scalable backend systems and blockchain architecture.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillCategories.map((cat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
              <div className="p-2 bg-gray-50 rounded-lg">
                {cat.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900">{cat.title}</h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {cat.skills.map(skill => (
                <span 
                  key={skill} 
                  className="px-3 py-1.5 bg-gray-50 text-gray-700 rounded-md text-sm font-medium border border-gray-100 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-100 transition cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}