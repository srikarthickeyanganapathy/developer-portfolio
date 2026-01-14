import { Link } from "react-router-dom";
import { ArrowRight, Github, Linkedin, Mail, Cpu, Shield, Database } from "lucide-react";
import profileImage from "../assets/mypic.jpg";
import { motion, useScroll, useTransform } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

function FloatingPortrait() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.4], [0, -40]);

  return (
    <motion.div
      style={{ y }}
      className="relative group"
    >
      {/* Soft Glow */}
      <div className="absolute -inset-6 rounded-full bg-gradient-to-tr from-indigo-500/20 to-fuchsia-500/20 blur-2xl opacity-70 group-hover:opacity-100 transition" />

      {/* Circular Frame */}
      <motion.div
        whileHover={{ rotateX: 6, rotateY: -6 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border border-gray-200 dark:border-gray-800 shadow-2xl bg-white dark:bg-neutral-950"
      >
        {/* Image */}
        <img
          src={profileImage}
          alt="Sri Karthickeyan Ganapathy"
          className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-center px-4">
          <div>
            <p className="text-white text-lg font-semibold">
              Sri Karthickeyan
            </p>
            <p className="text-white/80 text-sm tracking-wide">
              Full-Stack Engineer · Blockchain · ML
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
    return (
        <motion.div
        initial="initial"
        animate="animate"
        className="space-y-24 pt-20 sm:pt-28 md:pt-36"
        >
        {/* HERO */}
        <motion.section
        variants={fadeUp}
        className="grid lg:grid-cols-2 gap-16 items-center"
        >
            {/* LEFT: TEXT */}
            <div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-8">
                Sri Karthickeyan Ganapathy
                </h1>

                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
                Software Engineer bridging <strong>Enterprise Java</strong> and{" "}
                <strong>Smart Contracts</strong>. I build secure digital infrastructure—from
                tokenized assets to smart monitoring systems—with a focus on
                reliability, performance, and real-world utility.
                </p>

                {/* Social Links */}
                <motion.div variants={fadeUp} className="flex gap-8 mt-10">
                <a
                    href="https://github.com/srikarthickeyanganapathy"
                    target="_blank"
                    className="text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                >
                    <Github size={24} />
                </a>
                <a
                    href="https://www.linkedin.com/in/sri-karthickeyan-ganapathy-597773261/"
                    target="_blank"
                    className="text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                >
                    <Linkedin size={24} />
                </a>
                <a
                    href="mailto:srikarthickeyang@gmail.com"
                    className="text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                >
                    <Mail size={24} />
                </a>
                </motion.div>
            </div>

            {/* RIGHT: IMAGE */}
            <motion.div
            initial={{ opacity: 1, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex justify-center lg:justify-end"
            >
            <FloatingPortrait />
            </motion.div>
        </motion.section>


        <hr className="border-gray-200 dark:border-gray-800" />

        {/* Philosophy */}
        <motion.section
            variants={fadeUp}
            className="prose prose-lg prose-gray dark:prose-invert max-w-4xl"
        >
            <p>
            I prefer <strong>discovery over invention</strong> and <strong>utility over hype</strong>. 
            Whether I'm architecting a <strong>Spring Boot</strong> backend or deploying an 
            <strong> ERC-20 token</strong>, I view technology as a tool to solve human problems.
            </p>
            <p>
            My approach is grounded in precision: normalizing databases for long-term health, 
            optimizing gas fees for accessibility, and ensuring that every API endpoint 
            serves a clear, secure purpose. I build systems meant to be used, maintained, and scaled.
            </p>
        </motion.section>

        {/* Technical Focus */}
        <motion.section variants={fadeUp} className="space-y-12">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Technical Focus
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            {[
                {
                icon: <Database className="text-indigo-500" size={28} />,
                title: "Enterprise Backends",
                text: "Building scalable APIs and microservices using Java & Spring Boot with strong cloud-native design."
                },
                {
                icon: <Shield className="text-fuchsia-500" size={28} />,
                title: "Decentralized Trust",
                text: "Designing secure Solidity smart contracts for digital assets, DeFi, and tamper-proof systems."
                },
                {
                icon: <Cpu className="text-emerald-500" size={28} />,
                title: "IoT & Intelligence",
                text: "Integrating real-time data with predictive logic to bridge physical systems with digital control."
                }
            ].map((item, i) => (
                <motion.div
                key={i}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="rounded-2xl border border-gray-200 dark:border-gray-800 p-8 bg-white dark:bg-neutral-950 shadow-sm"
                >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.text}
                </p>
                </motion.div>
            ))}
            </div>
        </motion.section>

        {/* Action */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row gap-6 items-start"
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-3 text-base font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            View Selected Work <ArrowRight size={18} />
          </Link>

          <Link
            to="/contact"
            className="
              inline-flex items-center gap-3 text-base font-medium
              text-gray-600 dark:text-gray-400
              hover:text-indigo-600 dark:hover:text-indigo-400
              transition-colors
            "
          >
            Get in Touch <Mail size={20} />
          </Link>
        </motion.div>
    </motion.div>
  );
}