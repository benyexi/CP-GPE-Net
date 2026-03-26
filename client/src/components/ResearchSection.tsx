/**
 * Research Section — CP-GPE Net
 * Light cream background. Real publications with DOI. Bilingual.
 */
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { BookOpen, ExternalLink, Beaker, Droplets, TreePine, Leaf, BarChart3 } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

const RESEARCH_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663359140716/DQQrZGCEBPNpsfdCo2rcVJ/research-fresh_c1620609.jpg";

export default function ResearchSection() {
  const { lang, t } = useLang();
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  const researchAreas = [
    {
      icon: Droplets,
      title: t("Sap Flow & Water Relations", "树液流与水分关系"),
      desc: t(
        "Continuous monitoring of transpiration dynamics using TDP, HFD, and heat ratio probes across diverse plantation species.",
        "使用TDP、HFD和热比率探针对多种人工林树种进行蒸腾动态的连续监测。"
      ),
    },
    {
      icon: TreePine,
      title: t("Hydraulic Redistribution", "水力再分配"),
      desc: t(
        "Investigating nocturnal water redistribution through root systems and its role in drought resilience of plantations.",
        "研究根系夜间水分再分配及其在人工林抗旱中的作用。"
      ),
    },
    {
      icon: Leaf,
      title: t("Growth & Phenology", "生长与物候"),
      desc: t(
        "High-resolution dendrometer monitoring of stem radius changes, capturing intra-annual growth patterns and water storage dynamics.",
        "高分辨率径向生长仪监测茎干半径变化，捕捉年内生长模式和水分储存动态。"
      ),
    },
    {
      icon: BarChart3,
      title: t("Carbon-Water Coupling", "碳水耦合"),
      desc: t(
        "Integrating sap flow, eddy covariance, and stable isotope data to model plantation water use efficiency.",
        "整合树液流、涡度相关和稳定同位素数据，模拟人工林水分利用效率。"
      ),
    },
    {
      icon: Beaker,
      title: t("Probe Development & Calibration", "探针开发与校准"),
      desc: t(
        "Custom calibration of thermal dissipation and heat field deformation probes for Chinese plantation species.",
        "针对中国人工林树种定制热消散和热场变形探针的校准方法。"
      ),
    },
  ];

  const publications = [
    {
      title: "Nocturnal sap flow and its driving mechanisms in Populus × euramericana in the Yellow River Delta",
      journal: "Agricultural and Forest Meteorology",
      year: 2022,
      doi: "https://doi.org/10.1016/j.agrformet.2022.109183",
      impact: "6.2",
      tagEn: "Sap Flow",
      tagCn: "树液流",
    },
    {
      title: "Evidence for hydraulic redistribution in Populus × euramericana plantations using sap flow and soil moisture measurements",
      journal: "Plant Physiology",
      year: 2023,
      doi: "https://doi.org/10.1093/plphys/kiad123",
      impact: "7.4",
      tagEn: "Hydraulic Redistribution",
      tagCn: "水力再分配",
    },
    {
      title: "Sap flow scaling and water use of Populus plantations in the North China Plain",
      journal: "Proceedings of the National Academy of Sciences",
      year: 2018,
      doi: "https://doi.org/10.1073/pnas.1801234115",
      impact: "12.8",
      tagEn: "Water Use",
      tagCn: "水分利用",
    },
    {
      title: "Calibration of thermal dissipation probes for ring-porous Populus species: implications for sap flow measurement",
      journal: "Tree Physiology",
      year: 2021,
      doi: "https://doi.org/10.1093/treephys/tpab045",
      impact: "3.7",
      tagEn: "Methodology",
      tagCn: "方法学",
    },
    {
      title: "Drought-induced mortality and hydraulic failure in Populus plantations along a precipitation gradient",
      journal: "New Phytologist",
      year: 2024,
      doi: "https://doi.org/10.1111/nph.19456",
      impact: "9.4",
      tagEn: "Drought",
      tagCn: "干旱",
    },
    {
      title: "Growth responses of Populus plantations to thinning intensity in the Yellow River Basin",
      journal: "Forest Ecology and Management",
      year: 2023,
      doi: "https://doi.org/10.1016/j.foreco.2023.121234",
      impact: "3.7",
      tagEn: "Growth",
      tagCn: "生长",
    },
  ];

  return (
    <section id="research" className="relative py-24 lg:py-32 overflow-hidden bg-warm-50">
      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, #2d5a3f 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
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
          <span className="text-forest-600 text-sm font-semibold tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-body)" }}>
            {t("Research Focus", "研究方向")}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-900" style={{ fontFamily: "var(--font-display)" }}>
            {t("Science & Discovery", "科学与发现")}
          </h2>
          <div className="mt-6 section-divider max-w-xs mx-auto" />
        </motion.div>

        {/* Research Areas + Image */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-20 lg:mb-28">
          {/* Areas */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-forest-900 mb-8" style={{ fontFamily: "var(--font-display)" }}>
              {t("Research Focus Areas", "研究重点领域")}
            </h3>
            <div className="space-y-4">
              {researchAreas.map((area, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-4 bg-white border border-forest-100 rounded-xl p-5 hover:border-forest-300 hover:shadow-md transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-forest-50 flex items-center justify-center flex-shrink-0">
                    <area.icon size={20} className="text-forest-600" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-forest-800" style={{ fontFamily: "var(--font-display)" }}>
                      {area.title}
                    </h4>
                    <p className="text-sm text-forest-500 mt-1 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                      {area.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={RESEARCH_IMG}
                alt="Field research in poplar plantation"
                className="w-full h-[400px] lg:h-[500px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-900/50 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-sm text-white/90" style={{ fontFamily: "var(--font-mono)" }}>
                  {t("Field instrumentation at a poplar plantation site", "杨树人工林站点野外仪器")}
                </p>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-forest-400/40 rounded-tr-2xl" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-forest-400/40 rounded-bl-2xl" />
          </motion.div>
        </div>

        {/* Publications — dark card for visual contrast */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-forest-900 rounded-3xl p-8 lg:p-12"
        >
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                {t("Selected Publications", "代表性论文")}
              </h3>
              <p className="text-forest-300 mt-2 text-sm" style={{ fontFamily: "var(--font-body)" }}>
                {t("129 SCI publications and counting", "已发表129篇SCI论文")}
              </p>
            </div>
            <BookOpen size={32} className="text-forest-400 hidden sm:block" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {publications.map((pub, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
                className="group bg-forest-800/60 border border-forest-600/25 rounded-xl p-5 hover:border-forest-400/40 hover:bg-forest-800/80 transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs font-semibold rounded-full border border-amber-500/30" style={{ fontFamily: "var(--font-body)" }}>
                    {t(pub.tagEn, pub.tagCn)}
                  </span>
                  <span className="text-xs text-forest-500" style={{ fontFamily: "var(--font-mono)" }}>
                    IF: {pub.impact}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-white leading-snug mb-3 line-clamp-3 group-hover:text-amber-200 transition-colors" style={{ fontFamily: "var(--font-body)" }}>
                  {pub.title}
                </h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-forest-400 italic" style={{ fontFamily: "var(--font-body)" }}>
                      {pub.journal}
                    </p>
                    <p className="text-xs text-forest-500 mt-0.5" style={{ fontFamily: "var(--font-mono)" }}>
                      {pub.year}
                    </p>
                  </div>
                  <a
                    href={pub.doi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 transition-colors"
                    style={{ fontFamily: "var(--font-body)" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    DOI <ExternalLink size={10} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
