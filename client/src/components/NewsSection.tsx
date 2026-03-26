/**
 * News Section — Dark Canopy Theme
 * Blog-style news cards with placeholder content.
 */
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Calendar, ArrowRight } from "lucide-react";

const newsItems = [
  {
    date: "2025-12-15",
    category: "Network Expansion",
    title: "CP-GPE Net Expands to 22 Monitoring Sites",
    excerpt: "With the addition of new monitoring stations in Xinjiang and Inner Mongolia, our network now covers 22 sites across China's major plantation regions, strengthening our capacity for comprehensive ecological monitoring.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop",
  },
  {
    date: "2025-09-20",
    category: "Publication",
    title: "New Paper Published in Agricultural and Forest Meteorology",
    excerpt: "Our latest research on sap flow scaling methods in poplar plantations of the Yellow River Basin has been published in AFM, providing new insights into plantation water use estimation.",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop",
  },
  {
    date: "2025-06-10",
    category: "International Collaboration",
    title: "Partnership with Washington State University Established",
    excerpt: "CP-GPE Net has formalized a research partnership with WSU for comparative studies on poplar water relations across continental climates, marking our first international monitoring site.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop",
  },
];

export default function NewsSection() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="news" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1f17] via-[#0a1a12] to-[#0d1f17]" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="text-[#c8963e] text-sm font-[family-name:var(--font-body)] font-semibold tracking-[0.2em] uppercase">
            Latest Updates
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#e8e4dd]">
            News & Announcements
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
              className="group bg-[#1a3a2a]/30 border border-[#2d5a3f]/30 rounded-xl overflow-hidden hover:border-[#c8963e]/30 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f17] via-transparent to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 bg-[#c8963e]/90 text-[#0d1f17] text-xs font-[family-name:var(--font-body)] font-semibold rounded-full">
                  {news.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar size={14} className="text-[#8a9a8f]" />
                  <span className="text-xs text-[#8a9a8f] font-[family-name:var(--font-mono)]">
                    {news.date}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#e8e4dd] font-[family-name:var(--font-display)] mb-3 leading-snug group-hover:text-[#c8963e] transition-colors">
                  {news.title}
                </h3>
                <p className="text-sm text-[#a8b4ac] font-[family-name:var(--font-body)] leading-relaxed mb-4 line-clamp-3">
                  {news.excerpt}
                </p>
                <span className="inline-flex items-center gap-1 text-sm text-[#c8963e] font-[family-name:var(--font-body)] font-medium group-hover:gap-2 transition-all">
                  Read more <ArrowRight size={14} />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
