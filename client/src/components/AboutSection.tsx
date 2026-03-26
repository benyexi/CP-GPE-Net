/**
 * About Section — Dark Canopy Theme
 * Network introduction + PI profile + network goals.
 */
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { BookOpen, FlaskConical, Globe, TreePine, Users } from "lucide-react";

const ABOUT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663359140716/DQQrZGCEBPNpsfdCo2rcVJ/about-section-2TDS9THtjxJyovUT9o3mc2.webp";

const goals = [
  {
    icon: TreePine,
    title: "Long-term Monitoring",
    desc: "Continuous sap flow, growth, and microclimate monitoring across China's major plantation ecosystems.",
  },
  {
    icon: Globe,
    title: "Open Data & Collaboration",
    desc: "Building an open-access database for plantation physiology research with international partners.",
  },
  {
    icon: FlaskConical,
    title: "Methodological Innovation",
    desc: "Developing and calibrating custom TDP/HFD/heat ratio sap flow probes for diverse plantation species.",
  },
  {
    icon: Users,
    title: "Ecological Security",
    desc: "Supporting China's Three-North Shelterbelt Program and national ecological restoration strategies.",
  },
];

const partners = [
  "Beijing Forestry University",
  "Chinese Academy of Sciences",
  "National Key R&D Program",
  "Three-North Shelterbelt Program",
  "Washington State University",
];

export default function AboutSection() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="about" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #2d5a3f 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />
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
            About the Network
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#e8e4dd]">
            What is CP-GPE Net?
          </h2>
          <div className="mt-6 section-divider max-w-xs mx-auto" />
        </motion.div>

        {/* Intro + Image */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20 lg:mb-28">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-lg text-[#c8c4bc] font-[family-name:var(--font-body)] leading-relaxed mb-6">
              CP-GPE Net is a national-level monitoring network dedicated to understanding the physiology and ecology of China's plantation ecosystems. Focusing on water relations, sap flow dynamics, hydraulic redistribution, and growth patterns, the network spans 22 monitoring sites across North China, the Yellow River Basin, and beyond.
            </p>
            <p className="text-lg text-[#c8c4bc] font-[family-name:var(--font-body)] leading-relaxed mb-8">
              Established by the Plantation Water Relations Lab (PWRlab) at Beijing Forestry University, CP-GPE Net integrates advanced sap flow instrumentation with long-term ecological monitoring to address critical questions about plantation water-carbon balance under climate change.
            </p>

            {/* PI Card */}
            <div className="bg-[#1a3a2a]/50 border border-[#2d5a3f]/40 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#c8963e] to-[#8a6a2e] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#c8963e]/20">
                  <BookOpen size={24} className="text-[#0d1f17]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#e8e4dd] font-[family-name:var(--font-display)]">
                    Prof. Xi Benye <span className="text-[#c8963e]">席本野</span>
                  </h3>
                  <p className="text-sm text-[#a8b4ac] font-[family-name:var(--font-body)] mt-1">
                    Principal Investigator | Beijing Forestry University, College of Forestry
                  </p>
                  <p className="text-sm text-[#8a9a8f] font-[family-name:var(--font-body)] mt-3 leading-relaxed">
                    Expert in plantation water relations, sap flow instrumentation (TDP/HFD/heat ratio probes), and hydraulic redistribution. 129 SCI publications. National Key R&D Program PI.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
              <img
                src={ABOUT_IMG}
                alt="Sap flow measurement instruments on a poplar tree"
                className="w-full h-[400px] lg:h-[500px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f17]/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-sm text-[#c8963e] font-[family-name:var(--font-mono)]">
                  TDP sap flow probe installation
                </p>
              </div>
            </div>
            {/* Decorative corner */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-[#c8963e]/30 rounded-tr-2xl" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-[#c8963e]/30 rounded-bl-2xl" />
          </motion.div>
        </div>

        {/* Network Goals */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-2xl lg:text-3xl font-bold text-[#e8e4dd] text-center mb-12">
            Network Goals
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {goals.map((goal, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 + i * 0.1 }}
                className="group bg-[#1a3a2a]/30 border border-[#2d5a3f]/30 rounded-xl p-6 hover:border-[#c8963e]/30 hover:bg-[#1a3a2a]/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-[#c8963e]/10 flex items-center justify-center mb-4 group-hover:bg-[#c8963e]/20 transition-colors">
                  <goal.icon size={24} className="text-[#c8963e]" />
                </div>
                <h4 className="text-lg font-bold text-[#e8e4dd] font-[family-name:var(--font-display)] mb-2">
                  {goal.title}
                </h4>
                <p className="text-sm text-[#a8b4ac] font-[family-name:var(--font-body)] leading-relaxed">
                  {goal.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Partners */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-20 text-center"
        >
          <h3 className="text-sm text-[#8a9a8f] font-[family-name:var(--font-body)] font-semibold tracking-[0.2em] uppercase mb-8">
            Partnering Institutions
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {partners.map((p, i) => (
              <span
                key={i}
                className="px-5 py-2.5 bg-[#1a3a2a]/40 border border-[#2d5a3f]/30 rounded-full text-sm text-[#a8b4ac] font-[family-name:var(--font-body)]"
              >
                {p}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
