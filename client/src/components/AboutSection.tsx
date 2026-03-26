/**
 * About Section — CP-GPE Net
 * Light cream background (bg-warm-50). Full content on both sides — no empty space.
 * Network Goals in a dark forest card for contrast. Bilingual.
 */
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { BookOpen, FlaskConical, Globe, TreePine, Users, Award, MapPin, Microscope } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

const ABOUT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663359140716/DQQrZGCEBPNpsfdCo2rcVJ/about-fresh_8ba82c54.jpg";

export default function AboutSection() {
  const { t, lang } = useLang();
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  const highlights = [
    { icon: MapPin, value: "22", label: t("Monitoring Sites", "监测站点") },
    { icon: Award, value: "129", label: t("SCI Publications", "SCI论文") },
    { icon: Microscope, value: "15+", label: t("Years of Data", "年数据积累") },
    { icon: Globe, value: "5+", label: t("International Partners", "国际合作") },
  ];

  const goals = [
    {
      icon: TreePine,
      title: t("Long-term Monitoring", "长期监测"),
      desc: t(
        "Continuous sap flow, growth, and microclimate monitoring across China's major plantation ecosystems.",
        "对中国主要人工林生态系统进行持续的树液流、生长和微气候监测。"
      ),
    },
    {
      icon: Globe,
      title: t("Open Data & Collaboration", "开放数据与合作"),
      desc: t(
        "Building an open-access database for plantation physiology research with international partners.",
        "与国际合作伙伴共建人工林生理学研究开放数据库。"
      ),
    },
    {
      icon: FlaskConical,
      title: t("Methodological Innovation", "方法创新"),
      desc: t(
        "Developing and calibrating custom TDP/HFD/heat ratio sap flow probes for diverse plantation species.",
        "开发和校准适用于多种人工林树种的定制TDP/HFD/热比率树液流探针。"
      ),
    },
    {
      icon: Users,
      title: t("Ecological Security", "生态安全"),
      desc: t(
        "Supporting China's Three-North Shelterbelt Program and national ecological restoration strategies.",
        "支持中国三北防护林工程和国家生态恢复战略。"
      ),
    },
  ];

  const partners = [
    t("Beijing Forestry University", "北京林业大学"),
    t("Chinese Academy of Sciences", "中国科学院"),
    t("National Key R&D Program", "国家重点研发计划"),
    t("Three-North Shelterbelt Program", "三北防护林工程"),
    t("Washington State University", "华盛顿州立大学"),
  ];

  return (
    <section id="about" className="relative py-24 lg:py-32 overflow-hidden bg-warm-50">
      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #4a8a5a 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
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
            {t("About the Network", "关于监测网络")}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-900" style={{ fontFamily: "var(--font-display)" }}>
            {t("What is CP-GPE Net?", "什么是CP-GPE Net？")}
          </h2>
          <div className="mt-6 section-divider max-w-xs mx-auto" />
        </motion.div>

        {/* Intro + Image — two columns */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch mb-20 lg:mb-28">
          {/* Left: Full content — no empty space */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col"
          >
            <p className="text-lg text-forest-700 leading-relaxed mb-5" style={{ fontFamily: "var(--font-body)" }}>
              {t(
                "CP-GPE Net (China Plantation Growth, Physiology & Ecology Network) is a national-level monitoring network dedicated to understanding the physiology and ecology of China's plantation ecosystems. Focusing on water relations, sap flow dynamics, hydraulic redistribution, and growth patterns, the network spans 22 monitoring sites across North China, the Yellow River Basin, and beyond.",
                "CP-GPE Net（中国人工林生长、生理与生态监测网络）是一个国家级监测网络，致力于理解中国人工林生态系统的生理学和生态学。网络聚焦水分关系、树液流动态、水力再分配和生长模式，覆盖华北、黄河流域等地区的22个监测站点。"
              )}
            </p>
            <p className="text-lg text-forest-700 leading-relaxed mb-5" style={{ fontFamily: "var(--font-body)" }}>
              {t(
                "Established by the Plantation Water Relations Lab (PWRlab) at Beijing Forestry University, CP-GPE Net integrates advanced sap flow instrumentation with long-term ecological monitoring to address critical questions about plantation water-carbon balance under climate change.",
                "由北京林业大学人工林水分关系实验室（PWRlab）建立，CP-GPE Net将先进的树液流仪器与长期生态监测相结合，解决气候变化下人工林水碳平衡的关键问题。"
              )}
            </p>

            {/* Quick Stats — 2x2 grid */}
            <div className="grid grid-cols-2 gap-4 mb-5">
              {highlights.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="bg-white border border-forest-100 rounded-xl p-4 text-center hover:border-forest-300 hover:shadow-md transition-all"
                >
                  <h.icon size={20} className="text-forest-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-forest-900" style={{ fontFamily: "var(--font-mono)" }}>{h.value}</div>
                  <div className="text-xs text-forest-500 mt-1" style={{ fontFamily: "var(--font-body)" }}>{h.label}</div>
                </motion.div>
              ))}
            </div>

            {/* PI Card */}
            <div className="bg-white border border-forest-200 rounded-xl p-5 shadow-sm flex-1">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-forest-500 to-forest-700 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <BookOpen size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-forest-900" style={{ fontFamily: "var(--font-display)" }}>
                    Prof. Xi Benye <span className="text-forest-600 text-base">席本野</span>
                  </h3>
                  <p className="text-sm text-forest-600 mt-1" style={{ fontFamily: "var(--font-body)" }}>
                    {t(
                      "Principal Investigator | Beijing Forestry University, College of Forestry",
                      "首席研究员 | 北京林业大学林学院"
                    )}
                  </p>
                  <p className="text-sm text-forest-500 mt-2 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                    {t(
                      "Expert in plantation water relations, sap flow instrumentation (TDP/HFD/heat ratio probes), and hydraulic redistribution. 129 SCI publications. National Key R&D Program PI.",
                      "人工林水分关系、树液流仪器（TDP/HFD/热比率探针）和水力再分配专家。发表129篇SCI论文。国家重点研发计划首席科学家。"
                    )}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl h-full min-h-[500px]">
              <img
                src={ABOUT_IMG}
                alt="Sap flow measurement instruments on a poplar tree"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-900/50 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-sm text-white/90" style={{ fontFamily: "var(--font-mono)" }}>
                  {t("TDP sap flow probe installation on Populus × euramericana", "欧美杨TDP树液流探针安装")}
                </p>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-forest-400/40 rounded-tr-2xl" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-forest-400/40 rounded-bl-2xl" />
          </motion.div>
        </div>

        {/* Network Goals — dark forest card for visual contrast */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-forest-900 rounded-3xl p-8 lg:p-12"
        >
          <h3 className="text-2xl lg:text-3xl font-bold text-white text-center mb-12" style={{ fontFamily: "var(--font-display)" }}>
            {t("Network Goals", "网络目标")}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {goals.map((goal, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 + i * 0.1 }}
                className="group bg-forest-800/60 border border-forest-600/25 rounded-xl p-6 hover:border-forest-400/40 hover:bg-forest-800/80 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-forest-700/50 flex items-center justify-center mb-4 group-hover:bg-forest-600/50 transition-colors">
                  <goal.icon size={24} className="text-forest-300" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>
                  {goal.title}
                </h4>
                <p className="text-sm text-forest-300 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
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
          className="mt-16 text-center"
        >
          <h3 className="text-sm text-forest-500 font-semibold tracking-[0.2em] uppercase mb-8" style={{ fontFamily: "var(--font-body)" }}>
            {t("Partnering Institutions", "合作机构")}
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {partners.map((p, i) => (
              <span
                key={i}
                className="px-5 py-2.5 bg-white border border-forest-200 rounded-full text-sm text-forest-700 shadow-sm hover:border-forest-400 hover:shadow-md transition-all"
                style={{ fontFamily: "var(--font-body)" }}
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
