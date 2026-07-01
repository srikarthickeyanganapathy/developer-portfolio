import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

export default function GlassContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle, submitting, success
  const buttonRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);

  // Magnetic Pull State (Matching StatusBadge pattern)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (touch || reducedMotion) setIsTouch(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("submitting");
    
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        setStatus("idle");
        setFormData({ name: "", email: "", message: "" });
      }, 3000);
    }, 1500);
  };

  const handleMouseMove = (e) => {
    if (isTouch || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    // Magnetic pull
    x.set((e.clientX - centerX) * 0.15);
    y.set((e.clientY - centerY) * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="relative w-full">
      <AnimatePresence>
        {status === "success" && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-0 z-50 flex items-center justify-center"
          >
            <div className="glass-panel p-8 rounded-2xl flex flex-col items-center justify-center text-center w-full h-full">
              <div className="w-16 h-16 rounded-full glass-chip flex items-center justify-center mb-4 border-[var(--accent)]/30 shadow-[0_0_20px_rgba(200,184,160,0.15)]">
                <svg className="w-8 h-8 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-display text-2xl font-bold text-[var(--warm-white)] mb-2">Message Sent</h3>
              <p className="text-[var(--warm-dim)] font-mono text-sm">I'll get back to you soon.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <form 
        onSubmit={handleSubmit}
        className={`space-y-6 transition-opacity duration-300 ${status === "success" ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        <div className="relative group">
          <input
            type="text"
            id="name"
            required
            className="glass-input w-full px-5 py-4 rounded-xl text-[var(--warm-white)] outline-none peer placeholder-transparent"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <label 
            htmlFor="name" 
            className="absolute left-5 top-4 text-[var(--warm-dim)] transition-all duration-300 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-[var(--accent)] peer-focus:bg-[var(--warm-black)] peer-focus:px-2 peer-valid:-top-2.5 peer-valid:text-xs peer-valid:text-[var(--accent)] peer-valid:bg-[var(--warm-black)] peer-valid:px-2"
          >
            Name
          </label>
        </div>

        <div className="relative group">
          <input
            type="email"
            id="email"
            required
            className="glass-input w-full px-5 py-4 rounded-xl text-[var(--warm-white)] outline-none peer placeholder-transparent"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <label 
            htmlFor="email" 
            className="absolute left-5 top-4 text-[var(--warm-dim)] transition-all duration-300 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-[var(--accent)] peer-focus:bg-[var(--warm-black)] peer-focus:px-2 peer-valid:-top-2.5 peer-valid:text-xs peer-valid:text-[var(--accent)] peer-valid:bg-[var(--warm-black)] peer-valid:px-2"
          >
            Email
          </label>
        </div>

        <div className="relative group">
          <textarea
            id="message"
            required
            rows={5}
            className="glass-input w-full px-5 py-4 rounded-xl text-[var(--warm-white)] outline-none peer placeholder-transparent resize-none"
            placeholder="Message"
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
          />
          <label 
            htmlFor="message" 
            className="absolute left-5 top-4 text-[var(--warm-dim)] transition-all duration-300 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-[var(--accent)] peer-focus:bg-[var(--warm-black)] peer-focus:px-2 peer-valid:-top-2.5 peer-valid:text-xs peer-valid:text-[var(--accent)] peer-valid:bg-[var(--warm-black)] peer-valid:px-2"
          >
            Message
          </label>
        </div>

        <div className="flex justify-end pt-2">
          <motion.button
            ref={buttonRef}
            type="submit"
            disabled={status !== "idle"}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: isTouch ? 0 : springX, y: isTouch ? 0 : springY }}
            whileHover={!isTouch && status === "idle" ? { scale: 1.05 } : {}}
            whileTap={!isTouch && status === "idle" ? { scale: 0.95 } : {}}
            className="glass-chip relative overflow-hidden group px-8 py-4 rounded-full font-mono text-sm tracking-widest text-[var(--warm-white)] transition-colors duration-300 hover:text-[var(--accent)] hover:border-[var(--accent)]/40 hover:shadow-[0_0_20px_rgba(200,184,160,0.15)] disabled:opacity-50"
          >
            {status === "submitting" ? "SENDING..." : "SEND MESSAGE"}
          </motion.button>
        </div>
      </form>
    </div>
  );
}
