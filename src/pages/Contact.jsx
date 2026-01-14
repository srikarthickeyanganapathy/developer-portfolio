import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { motion } from "framer-motion";
import { Send, Mail, User, MessageSquare, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const container = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.1, duration: 0.6, ease: "easeOut" }
  }
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); 

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const { error } = await supabase
      .from("contact_messages")
      .insert([form]);

    if (error) {
      console.error(error);
      setStatus("error");
    } else {
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 pt-24 sm:pt-32 pb-32">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-14"
      >
        {/* HEADER */}
        <motion.div variants={item} className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
            Have a project, idea, or opportunity? Drop me a message and let’s build something meaningful.
          </p>
        </motion.div>

        {/* FORM CARD */}
        <motion.div
          variants={item}
          className="bg-white dark:bg-neutral-950 border border-gray-200 dark:border-gray-800 p-8 sm:p-10 rounded-2xl shadow-sm"
        >
          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            
            {/* NAME */}
            <motion.div variants={item}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
                <input 
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required 
                  className="
                    w-full pl-10 pr-4 py-3 text-base
                    bg-gray-50 dark:bg-neutral-900
                    border border-gray-200 dark:border-gray-700
                    rounded-xl
                    focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-neutral-950
                    outline-none transition-all
                  "
                />
              </div>
            </motion.div>

            {/* EMAIL */}
            <motion.div variants={item}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
                <input 
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@email.com"
                  required 
                  className="
                    w-full pl-10 pr-4 py-3 text-base
                    bg-gray-50 dark:bg-neutral-900
                    border border-gray-200 dark:border-gray-700
                    rounded-xl
                    focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-neutral-950
                    outline-none transition-all
                  "
                />
              </div>
            </motion.div>

            {/* MESSAGE */}
            <motion.div variants={item}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Message
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3.5 text-gray-400" size={18} />
                <textarea 
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows="5"
                  required 
                  className="
                    w-full pl-10 pr-4 py-3 text-base
                    bg-gray-50 dark:bg-neutral-900
                    border border-gray-200 dark:border-gray-700
                    rounded-xl
                    focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-neutral-950
                    outline-none resize-none transition-all
                  "
                />
              </div>
            </motion.div>

            {/* BUTTON */}
            <motion.div variants={item}>
              <button 
                type="submit" 
                disabled={status === "sending" || status === "success"}
                className={`
                  w-full py-3.5 rounded-xl font-medium text-white
                  flex justify-center items-center gap-2
                  transition-all shadow-lg text-base
                  ${status === "success" ? "bg-green-500 hover:bg-green-600" : "bg-gray-900 hover:bg-gray-800"}
                  ${status === "sending" ? "opacity-75 cursor-wait" : ""}
                `}
              >
                {status === "idle" && <><Send size={18} /> Send Message</>}
                {status === "sending" && <><Loader2 size={18} className="animate-spin" /> Sending...</>}
                {status === "success" && <><CheckCircle size={18} /> Sent Successfully</>}
                {status === "error" && <><AlertCircle size={18} /> Failed. Try Again</>}
              </button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}