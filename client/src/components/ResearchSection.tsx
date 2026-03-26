/**
 * Research Section — Dark Canopy Theme
 * Focus areas, key publications, and methodology.
 */
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Droplets, GitBranch, BarChart3, TrendingUp, Thermometer, Microscope, Radio, Leaf } from "lucide-react";

const RESEARCH_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663359140716/DQQrZGCEBPNpsfdCo2rcVJ/research-bg-SJy8Brw3uteCz9ze9vo89b.webp";

const focusAreas = [
  { icon: Droplets, title: "Sap Flow & Tree Water Relations", desc: "Quantifying whole-tree water use and transpiration dynamics across plantation species using custom-developed thermal dissipation probes." },
  { icon: GitBranch, title: "Hydraulic Redistribution", desc: "Understanding nocturnal water redistribution through root systems and its role in plantation drought resilience." },
  { icon: BarChart3, title: "Water-Carbon Balance", desc: "Integrating sap flow, eddy covariance, and stable isotope data to model plantation water use efficiency." },
  { icon: TrendingUp, title: "Plantation Growth Dynamics", desc: "Continuous dendrometer monitoring of stem radius changes to understand growth phenology and climate sensitivity." },
  { icon: Thermometer, title: "Climate Change Responses", desc: "Assessing how rising temperatures and altered precipitation patterns affect plantation physiology and productivity." },
];

const publications = [
  { journal: "Agricultural and Forest Meteorology", abbr: "AFM", color: "#4a9e6f", desc: "Sap flow scaling methods for poplar plantations in semi-arid regions" },
  { journal: "New Phytologist", abbr: "New Phyt", color: "#6b8fc4", desc: "Hydraulic redistribution in plantation root systems under drought stress" },
  { journal: "Plant Physiology", abbr: "Plant Physiol", color: "#c47a6b", desc: "Nocturnal sap flow and stem water refilling in Populus species" },
  { journal: "Forest Ecology and Management", abbr: "FEM", color: "#8b6bc4", desc: "Water-carbon coupling in Three-North Shelterbelt plantations" },
];

const methods = [
  { icon: Radio, label: "Custom TDP/HFD/Heat Ratio Sap Flow Probes" },
  { icon: Microscope, label: "Point Dendrometers & Band Dendrometers" },
  { icon: Leaf, label: "Eddy Covariance Flux Towers" },
  { icon: Droplets, label: "Stable Isotope Analysis (δ²H, δ¹⁸O)" },
];

export default function ResearchSection() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section id="research" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img src={RESEARCH_BG} alt="" className="w-full h-full object-cover opacity-10" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1f17] via-[#0d1f17]/95 to-[#0d1f17]" />
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
            Research Focus
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#e8e4dd]">
            Advancing Plantation Science
          </h2>
          <div className="mt-6 section-divider max-w-xs mx-auto" />
        </motion.div>

        {/* Focus Areas */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 lg:mb-28">
          {focusAreas.map((area, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className={`group relative bg-[#1a3a2a]/30 border border-[#2d5a3f]/30 rounded-xl p-6 hover:border-[#c8963e]/30 transition-all duration-300 ${
                i === 4 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#c8963e]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#c8963e]/20 transition-colors">
                  <area.icon size={22} className="text-[#c8963e]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#e8e4dd] font-[family-name:var(--font-display)] mb-2">
                    {area.title}
                  </h3>
                  <p className="text-sm text-[#a8b4ac] font-[family-name:var(--font-body)] leading-relaxed">
                    {area.desc}
                  </p>
                </div>
              </div>
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                boxShadow: "inset 0 0 30px rgba(200,150,62,0.05)",
              }} />
            </motion.div>
          ))}
        </div>

        {/* Publications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-20 lg:mb-28"
        >
          <h3 className="text-2xl lg:text-3xl font-bold text-[#e8e4dd] text-center mb-12">
            Key Publications
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {publications.map((pub, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + i * 0.1 }}
                className="group bg-[#1a3a2a]/30 border border-[#2d5a3f]/30 rounded-xl p-6 hover:border-[#c8963e]/20 transition-all duration-300"
              >
                <div
                  className="w-full h-2 rounded-full mb-4"
                  style={{ background: `linear-gradient(90deg, ${pub.color}, ${pub.color}40)` }}
                />
                <h4 className="text-sm font-bold text-[#c8963e] font-[family-name:var(--font-body)] uppercase tracking-wider mb-2">
                  {pub.abbr}
                </h4>
                <p className="text-xs text-[#8a9a8f] font-[family-name:var(--font-body)] mb-3">
                  {pub.journal}
                </p>
                <p className="text-sm text-[#c8c4bc] font-[family-name:var(--font-body)] leading-relaxed italic">
                  "{pub.desc}"
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Methodology */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h3 className="text-2xl lg:text-3xl font-bold text-[#e8e4dd] text-center mb-12">
            Methodology & Instrumentation
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {methods.map((m, i) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-[#1a3a2a]/20 border border-[#2d5a3f]/20 rounded-lg p-4 hover:border-[#c8963e]/20 transition-colors"
              >
                <m.icon size={20} className="text-[#c8963e] flex-shrink-0" />
                <span className="text-sm text-[#c8c4bc] font-[family-name:var(--font-body)]">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
