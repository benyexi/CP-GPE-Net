/**
 * Data Section — CP-GPE Net
 * DARK forest-900 background for visual rhythm (deep-light alternation). Bilingual.
 * Data types: Sap Flow, Stem Diameter Changes, Microclimate, Soil Moisture, Groundwater Level.
 * NO carbon flux.
 */
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Lock, Database, Activity, Thermometer, Droplets, BarChart3, Waves } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

export default function DataSection() {
  const { t } = useLang();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const dataTypes = [
    { icon: Activity, label: t("Sap Flow Time Series", "树液流时间序列"), desc: t("Continuous thermal dissipation probe measurements at sub-hourly resolution", "亚小时分辨率的连续热消散探针测量数据") },
    { icon: BarChart3, label: t("Stem Diameter Changes", "茎干直径变化"), desc: t("High-precision dendrometer data capturing growth and water storage dynamics", "高精度径向生长仪数据，捕捉生长和水分储存动态") },
    { icon: Thermometer, label: t("Microclimate Data", "微气候数据"), desc: t("Air temperature, humidity, radiation, wind speed, and precipitation", "气温、湿度、辐射、风速和降水") },
    { icon: Droplets, label: t("Soil Moisture Profiles", "土壤水分剖面"), desc: t("Multi-depth soil water content and soil temperature measurements (0–10 m)", "多层土壤含水量和土壤温度测量（0–10 m）") },
    { icon: Waves, label: t("Groundwater Level Data", "地下水位数据"), desc: t("Continuous groundwater table monitoring for understanding root-zone water dynamics and deep water uptake", "连续地下水位监测，了解根区水分动态和深层水分吸收") },
  ];

  return (
    <section id="data" className="relative py-24 lg:py-32 overflow-hidden bg-forest-900">
      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="text-forest-300 text-sm font-semibold tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-body)" }}>
            {t("Data Portal", "数据门户")}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
            {t("Open Data for Plantation Science", "人工林科学开放数据")}
          </h2>
          <div className="mt-6 w-20 h-0.5 bg-amber-500/60 mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Data Types */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold text-white mb-8" style={{ fontFamily: "var(--font-display)" }}>
              {t("Available Data Types", "可用数据类型")}
            </h3>
            <div className="space-y-4">
              {dataTypes.map((dt, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-4 bg-forest-800/60 border border-forest-600/25 rounded-lg p-4 hover:border-forest-400/40 hover:bg-forest-800/80 transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-forest-700/50 flex items-center justify-center flex-shrink-0">
                    <dt.icon size={18} className="text-forest-300" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white" style={{ fontFamily: "var(--font-body)" }}>
                      {dt.label}
                    </h4>
                    <p className="text-xs text-forest-400 mt-1 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
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
              <div className="bg-forest-800/60 border border-forest-600/25 rounded-2xl p-8 lg:p-10 text-center">
                <div className="relative inline-flex items-center justify-center mb-8">
                  <div className="absolute w-24 h-24 rounded-full bg-amber-500/10 animate-pulse" />
                  <div className="relative w-20 h-20 rounded-full bg-forest-700/50 border-2 border-forest-600/30 flex items-center justify-center">
                    <Lock size={32} className="text-amber-400" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>
                  {t("Data Portal", "数据门户")}
                </h3>
                <p className="text-amber-400 font-semibold text-sm tracking-wider uppercase mb-4" style={{ fontFamily: "var(--font-body)" }}>
                  {t("Coming Soon", "即将上线")}
                </p>
                <p className="text-sm text-forest-300 leading-relaxed mb-8" style={{ fontFamily: "var(--font-body)" }}>
                  {t(
                    "Our data sharing platform is currently under development. Access to CP-GPE Net datasets will be available through collaboration agreements.",
                    "我们的数据共享平台正在开发中。CP-GPE Net数据集将通过合作协议提供访问。"
                  )}
                </p>

                <div className="w-full bg-forest-700/50 rounded-full h-2 mb-3">
                  <div className="bg-gradient-to-r from-amber-500 to-amber-400 h-2 rounded-full" style={{ width: "65%" }} />
                </div>
                <p className="text-xs text-forest-400" style={{ fontFamily: "var(--font-mono)" }}>
                  {t("Development Progress: 65%", "开发进度：65%")}
                </p>
              </div>

              <div className="absolute -top-3 -right-3 w-16 h-16 border-t-2 border-r-2 border-forest-600/30 rounded-tr-xl" />
              <div className="absolute -bottom-3 -left-3 w-16 h-16 border-b-2 border-l-2 border-forest-600/30 rounded-bl-xl" />
            </div>

            <p className="mt-8 text-sm text-forest-400 text-center max-w-sm italic" style={{ fontFamily: "var(--font-body)" }}>
              {t(
                "Data sharing is available via collaboration agreement. Please contact us through the Join section below.",
                "数据共享可通过合作协议获取。请通过下方的合作栏目联系我们。"
              )}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
