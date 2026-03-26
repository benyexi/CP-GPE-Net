/**
 * News Section — Fresh Forest Theme
 * Blog-style news cards with expandable detail view. Bilingual.
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Calendar, ArrowRight, X, Tag } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

interface NewsItem {
  date: string;
  categoryEn: string;
  categoryCn: string;
  titleEn: string;
  titleCn: string;
  excerptEn: string;
  excerptCn: string;
  bodyEn: string;
  bodyCn: string;
  image: string;
  tags: string[];
}

const newsItems: NewsItem[] = [
  {
    date: "2025-12-15",
    categoryEn: "Network Expansion",
    categoryCn: "网络扩展",
    titleEn: "CP-GPE Net Expands to 22 Monitoring Sites",
    titleCn: "CP-GPE Net扩展至22个监测站点",
    excerptEn: "With the addition of new monitoring stations in Xinjiang and Inner Mongolia, our network now covers 22 sites across China's major plantation regions.",
    excerptCn: "随着新疆和内蒙古新监测站的加入，我们的网络现已覆盖中国主要人工林区域的22个站点。",
    bodyEn: "The CP-GPE Net has reached a significant milestone with the establishment of two new monitoring stations. The Ili, Xinjiang site focuses on Populus euphratica (desert poplar) water relations and groundwater dependency in the Ili River valley, while the Dengkou, Inner Mongolia site compares water use strategies between poplar plantations and native xerophytic shrubs at the Ulan Buh Desert edge.\n\nThese additions bring our total to 22 monitoring sites spanning from the northeastern Heilongjiang province to the northwestern Xinjiang region, and from the Yellow River Delta to the Qinghai-Tibet Plateau margin. The expanded network now covers an unprecedented range of climatic conditions, from humid subtropical to extreme continental arid environments.\n\nEach new site is equipped with our standard instrumentation package including TDP sap flow probes, point dendrometers, and meteorological stations, ensuring data comparability across the entire network.",
    bodyCn: "CP-GPE Net随着两个新监测站的建立达到了一个重要里程碑。新疆伊犁站点专注于胡杨的水分关系和伊犁河谷的地下水依赖性，而内蒙古磴口站点则比较乌兰布和沙漠边缘杨树人工林和本地旱生灌木的水分利用策略。\n\n这些新增使我们的总数达到22个监测站点，从东北的黑龙江省延伸到西北的新疆地区，从黄河三角洲到青藏高原边缘。扩展后的网络现在覆盖了前所未有的气候条件范围，从湿润亚热带到极端大陆性干旱环境。\n\n每个新站点都配备了我们的标准仪器包，包括TDP液流探针、点式径向生长仪和气象站，确保整个网络的数据可比性。",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop",
    tags: ["Expansion", "Xinjiang", "Inner Mongolia"],
  },
  {
    date: "2025-09-20",
    categoryEn: "Publication",
    categoryCn: "论文发表",
    titleEn: "New Paper Published in Agricultural and Forest Meteorology",
    titleCn: "新论文发表于Agricultural and Forest Meteorology",
    excerptEn: "Our latest research on sap flow scaling methods in poplar plantations of the Yellow River Basin has been published in AFM.",
    excerptCn: "我们关于黄河流域杨树人工林树液流尺度转换方法的最新研究已发表于AFM。",
    bodyEn: "We are pleased to announce the publication of our latest research paper in Agricultural and Forest Meteorology (IF: 6.2). The study presents a novel approach to scaling individual tree sap flow measurements to stand-level transpiration in poplar plantations across the Yellow River Basin.\n\nUsing data from 8 monitoring sites within the basin, we developed species-specific allometric relationships that account for the radial variation in sap velocity measured by our HFD probes. The results demonstrate that traditional scaling methods can underestimate stand transpiration by 15-25% in fast-growing poplar plantations.\n\nThe paper also introduces a new open-source R package for automated sap flow data processing and quality control, which is now available for download by the research community.",
    bodyCn: "我们很高兴宣布最新研究论文发表于Agricultural and Forest Meteorology（影响因子：6.2）。该研究提出了一种将黄河流域杨树人工林单木液流测量尺度转换到林分蒸腾的新方法。\n\n利用流域内8个监测站点的数据，我们开发了考虑HFD探针测量的液流速度径向变化的树种特异性异速关系。结果表明，传统尺度转换方法在速生杨树人工林中可能低估林分蒸腾15-25%。\n\n论文还介绍了一个新的开源R包，用于自动化液流数据处理和质量控制，现已可供研究界下载使用。",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop",
    tags: ["SCI Paper", "Sap Flow", "Yellow River"],
  },
  {
    date: "2025-06-10",
    categoryEn: "International Collaboration",
    categoryCn: "国际合作",
    titleEn: "Partnership with Washington State University Established",
    titleCn: "与华盛顿州立大学建立合作伙伴关系",
    excerptEn: "CP-GPE Net has formalized a research partnership with WSU for comparative studies on poplar water relations across continental climates.",
    excerptCn: "CP-GPE Net与WSU正式建立研究合作伙伴关系，开展不同大陆性气候下杨树水分关系的比较研究。",
    bodyEn: "CP-GPE Net is proud to announce a formal research partnership with Washington State University (WSU), marking our first international collaboration site in the network.\n\nThe partnership establishes a comparative study framework between Chinese and North American Populus species, focusing on water use efficiency, drought responses, and hydraulic architecture. The WSU site in Washington State monitors Populus trichocarpa (black cottonwood) under a Pacific Northwest maritime climate, providing a unique contrast to our Chinese sites.\n\nInitial collaborative projects include a cross-continental comparison of sap flow dynamics, joint development of improved TDP calibration protocols, and student exchange programs between Beijing Forestry University and WSU.",
    bodyCn: "CP-GPE Net自豪地宣布与华盛顿州立大学（WSU）正式建立研究合作伙伴关系，这标志着我们网络中第一个国际合作站点的建立。\n\n该合作建立了中国和北美杨属树种之间的比较研究框架，重点关注水分利用效率、干旱响应和水力结构。WSU位于华盛顿州的站点在太平洋西北海洋性气候下监测毛果杨，为我们的中国站点提供了独特的对比。\n\n初步合作项目包括跨大陆液流动态比较、联合开发改进的TDP标定方案，以及北京林业大学和WSU之间的学生交流项目。",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop",
    tags: ["International", "WSU", "Partnership"],
  },
];

export default function NewsSection() {
  const { lang, t } = useLang();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section id="news" className="relative py-24 lg:py-32 overflow-hidden bg-warm-50">
      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="text-forest-600 text-sm font-semibold tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-body)" }}>
            {t("Latest Updates", "最新动态")}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-900" style={{ fontFamily: "var(--font-display)" }}>
            {t("News & Announcements", "新闻与公告")}
          </h2>
          <div className="mt-6 section-divider max-w-xs mx-auto" />
        </motion.div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((news, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className="group bg-white border border-forest-100 rounded-xl overflow-hidden hover:border-forest-300 hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={news.image}
                  alt={lang === "en" ? news.titleEn : news.titleCn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-900/30 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 bg-forest-600 text-white text-xs font-semibold rounded-full" style={{ fontFamily: "var(--font-body)" }}>
                  {lang === "en" ? news.categoryEn : news.categoryCn}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar size={14} className="text-forest-400" />
                  <span className="text-xs text-forest-400" style={{ fontFamily: "var(--font-mono)" }}>
                    {news.date}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-forest-900 mb-3 leading-snug group-hover:text-forest-600 transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                  {lang === "en" ? news.titleEn : news.titleCn}
                </h3>
                <p className="text-sm text-forest-600 leading-relaxed mb-4 line-clamp-3" style={{ fontFamily: "var(--font-body)" }}>
                  {lang === "en" ? news.excerptEn : news.excerptCn}
                </p>
                <button
                  onClick={() => setExpandedIndex(i)}
                  className="inline-flex items-center gap-1 text-sm text-forest-600 font-medium hover:gap-2 transition-all"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {t("Read more", "阅读更多")} <ArrowRight size={14} />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Expanded News Detail Overlay */}
      <AnimatePresence>
        {expandedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[90] bg-forest-900/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setExpandedIndex(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Detail Image */}
              <div className="relative h-56 sm:h-72">
                <img
                  src={newsItems[expandedIndex].image}
                  alt={lang === "en" ? newsItems[expandedIndex].titleEn : newsItems[expandedIndex].titleCn}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-900/60 via-forest-900/20 to-transparent" />
                <button
                  onClick={() => setExpandedIndex(null)}
                  className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-colors"
                >
                  <X size={18} />
                </button>
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="inline-block px-3 py-1 bg-forest-600 text-white text-xs font-semibold rounded-full mb-3" style={{ fontFamily: "var(--font-body)" }}>
                    {lang === "en" ? newsItems[expandedIndex].categoryEn : newsItems[expandedIndex].categoryCn}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                    {lang === "en" ? newsItems[expandedIndex].titleEn : newsItems[expandedIndex].titleCn}
                  </h2>
                </div>
              </div>

              {/* Detail Body */}
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-forest-100">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-forest-400" />
                    <span className="text-sm text-forest-500" style={{ fontFamily: "var(--font-mono)" }}>
                      {newsItems[expandedIndex].date}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {newsItems[expandedIndex].tags.map((tag) => (
                      <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 bg-forest-50 text-forest-600 text-xs rounded-full border border-forest-100" style={{ fontFamily: "var(--font-body)" }}>
                        <Tag size={10} />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="prose prose-sm max-w-none">
                  {(lang === "en" ? newsItems[expandedIndex].bodyEn : newsItems[expandedIndex].bodyCn)
                    .split("\n\n")
                    .map((paragraph, pi) => (
                      <p key={pi} className="text-sm text-forest-700 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
                        {paragraph}
                      </p>
                    ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
