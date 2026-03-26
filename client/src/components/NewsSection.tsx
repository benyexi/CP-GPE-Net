/**
 * News Section — Fresh Forest Theme
 * Blog-style news cards with bilingual support.
 */
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Calendar, ArrowRight } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

export default function NewsSection() {
  const { t } = useLang();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const newsItems = [
    {
      date: "2025-12-15",
      category: t("Network Expansion", "网络扩展"),
      title: t("CP-GPE Net Expands to 22 Monitoring Sites", "CP-GPE Net扩展至22个监测站点"),
      excerpt: t(
        "With the addition of new monitoring stations in Xinjiang and Inner Mongolia, our network now covers 22 sites across China's major plantation regions.",
        "随着新疆和内蒙古新监测站的加入，我们的网络现已覆盖中国主要人工林区域的22个站点。"
      ),
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop",
    },
    {
      date: "2025-09-20",
      category: t("Publication", "论文发表"),
      title: t("New Paper Published in Agricultural and Forest Meteorology", "新论文发表于Agricultural and Forest Meteorology"),
      excerpt: t(
        "Our latest research on sap flow scaling methods in poplar plantations of the Yellow River Basin has been published in AFM.",
        "我们关于黄河流域杨树人工林树液流尺度转换方法的最新研究已发表于AFM。"
      ),
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop",
    },
    {
      date: "2025-06-10",
      category: t("International Collaboration", "国际合作"),
      title: t("Partnership with Washington State University Established", "与华盛顿州立大学建立合作伙伴关系"),
      excerpt: t(
        "CP-GPE Net has formalized a research partnership with WSU for comparative studies on poplar water relations across continental climates.",
        "CP-GPE Net与WSU正式建立研究合作伙伴关系，开展不同大陆性气候下杨树水分关系的比较研究。"
      ),
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop",
    },
  ];

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
          <span className="text-forest-600 text-sm font-[family-name:var(--font-body)] font-semibold tracking-[0.2em] uppercase">
            {t("Latest Updates", "最新动态")}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-900">
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
                  alt={news.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-900/30 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 bg-forest-600 text-white text-xs font-[family-name:var(--font-body)] font-semibold rounded-full">
                  {news.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar size={14} className="text-forest-400" />
                  <span className="text-xs text-forest-400 font-[family-name:var(--font-mono)]">
                    {news.date}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-forest-900 font-[family-name:var(--font-display)] mb-3 leading-snug group-hover:text-forest-600 transition-colors">
                  {news.title}
                </h3>
                <p className="text-sm text-forest-600 font-[family-name:var(--font-body)] leading-relaxed mb-4 line-clamp-3">
                  {news.excerpt}
                </p>
                <span className="inline-flex items-center gap-1 text-sm text-forest-600 font-[family-name:var(--font-body)] font-medium group-hover:gap-2 transition-all">
                  {t("Read more", "阅读更多")} <ArrowRight size={14} />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
