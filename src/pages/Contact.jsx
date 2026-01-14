import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { motion } from "framer-motion";
import { Send, Mail, User, MessageSquare, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

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
    <div className="max-w-xl mx-auto px-6 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Get in Touch</h1>
          <p className="text-gray-600">
            Have a project in mind? Let's build something together.
          </p>
        </div>

        <div className="bg-white dark:bg-neutral-950 border border-gray-200 dark:border-gray-800 p-8 rounded-xl">
          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" size={18} />
                <input 
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required 
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                <input 
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required 
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 text-gray-400" size={18} />
                <textarea 
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows="4"
                  required 
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none resize-none transition"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={status === "sending" || status === "success"}
              className={`w-full py-3 rounded-lg font-medium text-white flex justify-center items-center gap-2 transition-all shadow-lg
                ${status === "success" ? "bg-green-500 hover:bg-green-600" : "bg-gray-900 hover:bg-gray-800"}
                ${status === "sending" ? "opacity-75 cursor-wait" : ""}
              `}
            >
              {status === "idle" && <><Send size={18} /> Send Message</>}
              {status === "sending" && <><Loader2 size={18} className="animate-spin" /> Sending...</>}
              {status === "success" && <><CheckCircle size={18} /> Sent Successfully</>}
              {status === "error" && <><AlertCircle size={18} /> Failed. Try Again</>}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}