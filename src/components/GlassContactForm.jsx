import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";

/* ── Field wrapper: floating label + expanding focus-ripple underline ── */
function GlowField({ id, label, value, onChange, type = "text", isTextarea = false, rows }) {
  const [focused, setFocused] = useState(false);
  const Tag = isTextarea ? "textarea" : "input";

  return (
    <div className="relative group">
      <Tag
        type={isTextarea ? undefined : type}
        id={id}
        required
        rows={isTextarea ? rows : undefined}
        className={`glass-input w-full px-5 py-4 rounded-xl text-[var(--warm-white)] outline-none peer placeholder-transparent transition-shadow duration-300 ${isTextarea ? "resize-none" : ""}`}
        placeholder={label}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          boxShadow: focused
            ? "0 0 0 1px var(--accent), 0 0 24px rgba(200,184,160,0.18)"
            : "0 0 0 0 transparent",
        }}
      />
      <label
        htmlFor={id}
        className="absolute left-5 top-4 text-[var(--warm-dim)] transition-all duration-300 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-[var(--accent)] peer-focus:bg-[var(--warm-black)] peer-focus:px-2 peer-valid:-top-2.5 peer-valid:text-xs peer-valid:text-[var(--accent)] peer-valid:bg-[var(--warm-black)] peer-valid:px-2"
      >
        {label}
      </label>

      {/* Expanding ripple underline — grows from center on focus */}
      <span
        className="absolute left-1/2 -bottom-[1px] h-[2px] bg-[var(--accent)] rounded-full pointer-events-none transition-all duration-500 ease-out"
        style={{
          width: focused ? "100%" : "0%",
          transform: "translateX(-50%)",
          opacity: focused ? 0.8 : 0,
        }}
      />
    </div>
  );
}

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

  // Cursor-follow glow position inside the button (CSS custom properties)
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glowBackground = useMotionTemplate`radial-gradient(120px circle at ${glowX}% ${glowY}%, rgba(200,184,160,0.35), transparent 70%)`;

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

    // Cursor-follow glow, as a % within the button bounds
    glowX.set(((e.clientX - rect.left) / rect.width) * 100);
    glowY.set(((e.clientY - rect.top) / rect.height) * 100);
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
        <GlowField
          id="name"
          label="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        <GlowField
          id="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <GlowField
          id="message"
          label="Message"
          isTextarea
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />

        <div className="flex justify-end pt-2">
          <motion.button
            ref={buttonRef}
            type="submit"
            disabled={status !== "idle"}
            data-cursor-text="Send"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: isTouch ? 0 : springX, y: isTouch ? 0 : springY }}
            whileHover={!isTouch && status === "idle" ? { scale: 1.05 } : {}}
            whileTap={!isTouch && status === "idle" ? { scale: 0.95 } : {}}
            className="glass-chip relative overflow-hidden group px-8 py-4 rounded-full font-mono text-sm tracking-widest text-[var(--warm-white)] transition-colors duration-300 hover:text-[var(--accent)] hover:border-[var(--accent)]/40 disabled:opacity-50"
          >
            {/* Cursor-following radial glow */}
            {!isTouch && (
              <motion.span
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: glowBackground }}
              />
            )}
            <span className="relative z-10">
              {status === "submitting" ? "SENDING..." : "SEND MESSAGE"}
            </span>
          </motion.button>
        </div>
      </form>
    </div>
  );
}