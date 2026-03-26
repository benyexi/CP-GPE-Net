/**
 * Data Section — Dark Canopy Theme
 * Data access portal placeholder with elegant locked-icon design.
 */
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Lock, Database, Activity, Thermometer, Droplets, BarChart3 } from "lucide-react";

const DATA_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663359140716/DQQrZGCEBPNpsfdCo2rcVJ/data-section-kipaViZ8PCDB9LeafuAVnG.webp";

const dataTypes = [
  { icon: Activity, label: "Sap Flow Time Series", desc: "Continuous thermal dissipation probe measurements at sub-hourly resolution" },
  { icon: BarChart3, label: "Stem Radius Changes", desc: "High-precision dendrometer data capturing growth and water storage dynamics" },
  { icon: Thermometer, label: "Microclimate Data", desc: "Air temperature, humidity, radiation, wind speed, and precipitation" },
  { icon: Droplets, label: "Soil Moisture Profiles", desc: "Multi-depth soil water content and soil temperature measurements" },
  { icon: Database, label: "Carbon Flux Data", desc: "Eddy covariance measurements of ecosystem CO₂ and H₂O exchange" },
];

export default function DataSection() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="data" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={DATA_IMG} alt="" className="w-full h-full object-cover opacity-8" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1f17] via-[#0a1a12]/98 to-[#0d1f17]" />
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
            Data Portal
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#e8e4dd]">
            Open Data for Plantation Science
          </h2>
          <div className="mt-6 section-divider max-w-xs mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Data Types */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold text-[#e8e4dd] font-[family-name:var(--font-display)] mb-8">
              Available Data Types
            </h3>
            <div className="space-y-4">
              {dataTypes.map((dt, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-4 bg-[#1a3a2a]/20 border border-[#2d5a3f]/20 rounded-lg p-4 hover:border-[#c8963e]/20 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#c8963e]/10 flex items-center justify-center flex-shrink-0">
                    <dt.icon size={18} className="text-[#c8963e]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#e8e4dd] font-[family-name:var(--font-body)]">
                      {dt.label}
                    </h4>
                    <p className="text-xs text-[#8a9a8f] font-[family-name:var(--font-body)] mt-1 leading-relaxed">
                      {dt.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Data Portal Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col items-center"
          >
            <div className="relative w-full max-w-md">
              {/* Locked Portal Card */}
              <div className="bg-[#1a3a2a]/40 border border-[#2d5a3f]/40 rounded-2xl p-8 lg:p-10 text-center backdrop-blur-sm">
                {/* Lock icon with glow */}
                <div className="relative inline-flex items-center justify-center mb-8">
                  <div className="absolute w-24 h-24 rounded-full bg-[#c8963e]/10 animate-pulse" />
                  <div className="relative w-20 h-20 rounded-full bg-[#1a3a2a] border-2 border-[#c8963e]/30 flex items-center justify-center">
                    <Lock size={32} className="text-[#c8963e]" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-[#e8e4dd] font-[family-name:var(--font-display)] mb-3">
                  Data Portal
                </h3>
                <p className="text-[#c8963e] font-[family-name:var(--font-body)] font-semibold text-sm tracking-wider uppercase mb-4">
                  Coming Soon
                </p>
                <p className="text-sm text-[#a8b4ac] font-[family-name:var(--font-body)] leading-relaxed mb-8">
                  Our data sharing platform is currently under development. Access to CP-GPE Net datasets will be available through collaboration agreements.
                </p>

                {/* Fake progress bar */}
                <div className="w-full bg-[#0d1f17] rounded-full h-2 mb-3">
                  <div className="bg-gradient-to-r from-[#c8963e] to-[#d4a84b] h-2 rounded-full" style={{ width: "65%" }} />
                </div>
                <p className="text-xs text-[#8a9a8f] font-[family-name:var(--font-mono)]">
                  Development Progress: 65%
                </p>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-3 -right-3 w-16 h-16 border-t-2 border-r-2 border-[#c8963e]/20 rounded-tr-xl" />
              <div className="absolute -bottom-3 -left-3 w-16 h-16 border-b-2 border-l-2 border-[#c8963e]/20 rounded-bl-xl" />
            </div>

            {/* Note */}
            <p className="mt-8 text-sm text-[#8a9a8f] font-[family-name:var(--font-body)] text-center max-w-sm italic">
              Data sharing is available via collaboration agreement. Please contact us through the Join section below.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
