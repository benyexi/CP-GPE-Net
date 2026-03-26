/**
 * Join / Collaborate Section — Dark Canopy Theme
 * Call to action + contact form + what we offer.
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Send, GraduationCap, Wrench, Share2, FileText, Mail, MessageSquare } from "lucide-react";
import { toast } from "sonner";

const COLLAB_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663359140716/DQQrZGCEBPNpsfdCo2rcVJ/collaborate-bg-2knUm2QAeWHaQ8Cj29WV9u.webp";

const offerings = [
  { icon: GraduationCap, title: "Methodology Training", desc: "Hands-on training in sap flow measurement techniques and data analysis" },
  { icon: Wrench, title: "Probe Calibration", desc: "Custom calibration of TDP/HFD probes for your specific tree species" },
  { icon: Share2, title: "Data Sharing", desc: "Access to our comprehensive plantation physiology database" },
  { icon: FileText, title: "Co-authorship", desc: "Collaborative publication opportunities in high-impact journals" },
];

export default function JoinSection() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  const [formData, setFormData] = useState({
    name: "",
    institution: "",
    country: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for your interest! We will get back to you soon.", {
      description: "Your message has been recorded.",
    });
    setFormData({ name: "", institution: "", country: "", email: "", message: "" });
  };

  return (
    <section id="join" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={COLLAB_BG} alt="" className="w-full h-full object-cover opacity-8" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1f17] via-[#0d1f17]/97 to-[#0d1f17]" />
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="text-[#c8963e] text-sm font-[family-name:var(--font-body)] font-semibold tracking-[0.2em] uppercase">
            Join the Network
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#e8e4dd]">
            Collaborate With Us
          </h2>
          <p className="mt-6 text-lg text-[#a8b4ac] font-[family-name:var(--font-body)] max-w-2xl mx-auto">
            We welcome international and domestic institutions to join CP-GPE Net. Together, we can advance our understanding of plantation ecosystems.
          </p>
          <div className="mt-6 section-divider max-w-xs mx-auto" />
        </motion.div>

        {/* What We Offer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 lg:mb-20"
        >
          {offerings.map((item, i) => (
            <div
              key={i}
              className="bg-[#1a3a2a]/30 border border-[#2d5a3f]/30 rounded-xl p-6 text-center hover:border-[#c8963e]/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-[#c8963e]/10 flex items-center justify-center mx-auto mb-4">
                <item.icon size={22} className="text-[#c8963e]" />
              </div>
              <h4 className="text-base font-bold text-[#e8e4dd] font-[family-name:var(--font-display)] mb-2">
                {item.title}
              </h4>
              <p className="text-sm text-[#a8b4ac] font-[family-name:var(--font-body)]">
                {item.desc}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Contact Form + Info */}
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-[#a8b4ac] font-[family-name:var(--font-body)] font-medium mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-[#1a3a2a]/40 border border-[#2d5a3f]/40 rounded-lg text-[#e8e4dd] font-[family-name:var(--font-body)] placeholder-[#5a6a5f] focus:border-[#c8963e]/50 focus:outline-none focus:ring-1 focus:ring-[#c8963e]/30 transition-colors"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#a8b4ac] font-[family-name:var(--font-body)] font-medium mb-2">
                    Institution *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    className="w-full px-4 py-3 bg-[#1a3a2a]/40 border border-[#2d5a3f]/40 rounded-lg text-[#e8e4dd] font-[family-name:var(--font-body)] placeholder-[#5a6a5f] focus:border-[#c8963e]/50 focus:outline-none focus:ring-1 focus:ring-[#c8963e]/30 transition-colors"
                    placeholder="University or organization"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-[#a8b4ac] font-[family-name:var(--font-body)] font-medium mb-2">
                    Country *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-4 py-3 bg-[#1a3a2a]/40 border border-[#2d5a3f]/40 rounded-lg text-[#e8e4dd] font-[family-name:var(--font-body)] placeholder-[#5a6a5f] focus:border-[#c8963e]/50 focus:outline-none focus:ring-1 focus:ring-[#c8963e]/30 transition-colors"
                    placeholder="Your country"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#a8b4ac] font-[family-name:var(--font-body)] font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-[#1a3a2a]/40 border border-[#2d5a3f]/40 rounded-lg text-[#e8e4dd] font-[family-name:var(--font-body)] placeholder-[#5a6a5f] focus:border-[#c8963e]/50 focus:outline-none focus:ring-1 focus:ring-[#c8963e]/30 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-[#a8b4ac] font-[family-name:var(--font-body)] font-medium mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-[#1a3a2a]/40 border border-[#2d5a3f]/40 rounded-lg text-[#e8e4dd] font-[family-name:var(--font-body)] placeholder-[#5a6a5f] focus:border-[#c8963e]/50 focus:outline-none focus:ring-1 focus:ring-[#c8963e]/30 transition-colors resize-none"
                  placeholder="Tell us about your research interests and how you'd like to collaborate..."
                />
              </div>
              <button
                type="submit"
                className="group inline-flex items-center gap-3 px-8 py-3.5 bg-[#c8963e] text-[#0d1f17] font-[family-name:var(--font-body)] font-semibold rounded-lg hover:shadow-[0_0_30px_rgba(200,150,62,0.3)] transition-all duration-300"
              >
                <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="bg-[#1a3a2a]/40 border border-[#2d5a3f]/40 rounded-xl p-6 lg:p-8 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-[#e8e4dd] font-[family-name:var(--font-display)] mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#c8963e]/10 flex items-center justify-center flex-shrink-0">
                    <Mail size={18} className="text-[#c8963e]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#8a9a8f] font-[family-name:var(--font-body)]">Email</p>
                    <p className="text-[#e8e4dd] font-[family-name:var(--font-body)]">xibenye@bjfu.edu.cn</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#c8963e]/10 flex items-center justify-center flex-shrink-0">
                    <MessageSquare size={18} className="text-[#c8963e]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#8a9a8f] font-[family-name:var(--font-body)]">WeChat</p>
                    <div className="mt-2 w-32 h-32 bg-[#0d1f17] border border-[#2d5a3f]/30 rounded-lg flex items-center justify-center">
                      <span className="text-xs text-[#5a6a5f] font-[family-name:var(--font-body)]">QR Code</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#2d5a3f]/30">
                  <p className="text-sm text-[#a8b4ac] font-[family-name:var(--font-body)] leading-relaxed">
                    <strong className="text-[#e8e4dd]">Prof. Xi Benye</strong><br />
                    Plantation Water Relations Lab (PWRlab)<br />
                    College of Forestry<br />
                    Beijing Forestry University<br />
                    Beijing 100083, China
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
