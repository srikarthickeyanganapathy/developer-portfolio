import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Contact from "./pages/Contact";
import ProjectDetail from "./pages/ProjectDetail";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-gray-900 dark:text-gray-100 antialiased">
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-12 md:py-20">
        {children}
      </main>
    </div>
  );
}

const pageTransition = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.3, ease: "easeOut" },
};

export default function App() {
  return (
    <Router>
      <Layout>
        <AnimatePresence mode="wait">
          <Routes>
            <Route
              path="/"
              element={<motion.div {...pageTransition}><Home /></motion.div>}
            />
            <Route
              path="/projects"
              element={<motion.div {...pageTransition}><Projects /></motion.div>}
            />
            <Route
              path="/projects/:slug"
              element={<motion.div {...pageTransition}><ProjectDetail /></motion.div>}
            />
            <Route
              path="/skills"
              element={<motion.div {...pageTransition}><Skills /></motion.div>}
            />
            <Route
              path="/contact"
              element={<motion.div {...pageTransition}><Contact /></motion.div>}
            />
          </Routes>
        </AnimatePresence>
      </Layout>
    </Router>
  );
}
