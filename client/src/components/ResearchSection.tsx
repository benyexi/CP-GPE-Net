/**
 * Research Section — Fresh Forest Theme
 * Focus areas, key publications, and methodology. Bilingual.
 */
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Droplets, GitBranch, BarChart3, TrendingUp, Thermometer, Microscope, Radio, Leaf } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

const RESEARCH_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663359140716/DQQrZGCEBPNpsfdCo2rcVJ/research-fresh_8b0b381c.jpg";

export default function ResearchSection() {
  const { t } = useLang();
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  const focusAreas = [
    { icon: Droplets, title: t("Sap Flow & Tree Water Relations", "树液流与树木水分关系"), desc: t("Quantifying whole-tree water use and transpiration dynamics across plantation species using custom-developed thermal dissipation probes.", "使用自主研发的热消散探针量化人工林树种的整树水分利用和蒸腾动态。") },
    { icon: GitBranch, title: t("Hydraulic Redistribution", "水力再分配"), desc: t("Understanding nocturnal water redistribution through root systems and its role in plantation drought resilience.", "研究根系夜间水分再分配及其在人工林抗旱中的作用。") },
    { icon: BarChart3, title: t("Water-Carbon Balance", "水碳平衡"), desc: t("Integrating sap flow, eddy covariance, and stable isotope data to model plantation water use efficiency.", "整合树液流、涡度相关和稳定同位素数据，模拟人工林水分利用效率。") },
    { icon: TrendingUp, title: t("Plantation Growth Dynamics", "人工林生长动态"), desc: t("Continuous dendrometer monitoring of stem radius changes to understand growth phenology and climate sensitivity.", "通过连续树木径向生长仪监测茎干半径变化，了解生长物候和气候敏感性。") },
    { icon: Thermometer, title: t("Climate Change Responses", "气候变化响应"), desc: t("Assessing how rising temperatures and altered precipitation patterns affect plantation physiology and productivity.", "评估升温和降水格局变化对人工林生理和生产力的影响。") },
  ];

  const publications = [
    { journal: "Agricultural and Forest Meteorology", abbr: "AFM", color: "#3d9a5a", desc: t("Sap flow scaling methods for poplar plantations in semi-arid regions", "半干旱地区杨树人工林树液流尺度转换方法") },
    { journal: "New Phytologist", abbr: "New Phyt", color: "#4a8ab5", desc: t("Hydraulic redistribution in plantation root systems under drought stress", "干旱胁迫下人工林根系水力再分配") },
    { journal: "Plant Physiology", abbr: "Plant Physiol", color: "#b5704a", desc: t("Nocturnal sap flow and stem water refilling in Populus species", "杨属树种夜间树液流和茎干补水") },
    { journal: "Forest Ecology and Management", abbr: "FEM", color: "#7a5ab5", desc: t("Water-carbon coupling in Three-North Shelterbelt plantations", "三北防护林人工林水碳耦合") },
  ];

  const methods = [
    { icon: Radio, label: t("Custom TDP/HFD/Heat Ratio Sap Flow Probes", "自研TDP/HFD/热比率树液流探针") },
    { icon: Microscope, label: t("Point Dendrometers & Band Dendrometers", "点式和环式树木径向生长仪") },
    { icon: Leaf, label: t("Eddy Covariance Flux Towers", "涡度相关通量塔") },
    { icon: Droplets, label: t("Stable Isotope Analysis (δ²H, δ¹⁸O)", "稳定同位素分析（δ²H, δ¹⁸O）") },
  ];

  return (
    <section id="research" className="relative py-24 lg:py-32 overflow-hidden bg-warm-50">
      {/* Background image with light overlay */}
      <div className="absolute inset-0">
        <img src={RESEARCH_BG} alt="" className="w-full h-full object-cover opacity-[0.06]" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-warm-50 via-warm-50/95 to-warm-50" />
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="text-forest-600 text-sm font-[family-name:var(--font-body)] font-semibold tracking-[0.2em] uppercase">
            {t("Research Focus", "研究方向")}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-900">
            {t("Advancing Plantation Science", "推进人工林科学")}
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
              className={`group relative bg-white border border-forest-100 rounded-xl p-6 hover:border-forest-300 hover:shadow-lg transition-all duration-300 ${
                i === 4 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-forest-50 flex items-center justify-center flex-shrink-0 group-hover:bg-forest-100 transition-colors">
                  <area.icon size={22} className="text-forest-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-forest-900 font-[family-name:var(--font-display)] mb-2">
                    {area.title}
                  </h3>
                  <p className="text-sm text-forest-600 font-[family-name:var(--font-body)] leading-relaxed">
                    {area.desc}
                  </p>
                </div>
              </div>
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
          <h3 className="text-2xl lg:text-3xl font-bold text-forest-900 text-center mb-12">
            {t("Key Publications", "代表性论文")}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {publications.map((pub, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + i * 0.1 }}
                className="group bg-white border border-forest-100 rounded-xl p-6 hover:border-forest-300 hover:shadow-lg transition-all duration-300"
              >
                <div
                  className="w-full h-1.5 rounded-full mb-4"
                  style={{ background: `linear-gradient(90deg, ${pub.color}, ${pub.color}40)` }}
                />
                <h4 className="text-sm font-bold text-forest-800 font-[family-name:var(--font-body)] uppercase tracking-wider mb-2">
                  {pub.abbr}
                </h4>
                <p className="text-xs text-forest-500 font-[family-name:var(--font-body)] mb-3">
                  {pub.journal}
                </p>
                <p className="text-sm text-forest-700 font-[family-name:var(--font-body)] leading-relaxed italic">
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
          <h3 className="text-2xl lg:text-3xl font-bold text-forest-900 text-center mb-12">
            {t("Methodology & Instrumentation", "方法与仪器")}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {methods.map((m, i) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-white border border-forest-100 rounded-lg p-4 hover:border-forest-300 hover:shadow-md transition-all"
              >
                <m.icon size={20} className="text-forest-600 flex-shrink-0" />
                <span className="text-sm text-forest-700 font-[family-name:var(--font-body)]">
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
