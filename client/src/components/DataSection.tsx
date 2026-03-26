/**
 * Data Section — Fresh Forest Theme
 * Data access portal placeholder. Bilingual.
 */
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Lock, Database, Activity, Thermometer, Droplets, BarChart3 } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

const DATA_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663359140716/DQQrZGCEBPNpsfdCo2rcVJ/data-fresh_dde30f84.jpg";

export default function DataSection() {
  const { t } = useLang();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const dataTypes = [
    { icon: Activity, label: t("Sap Flow Time Series", "树液流时间序列"), desc: t("Continuous thermal dissipation probe measurements at sub-hourly resolution", "亚小时分辨率的连续热消散探针测量数据") },
    { icon: BarChart3, label: t("Stem Radius Changes", "茎干半径变化"), desc: t("High-precision dendrometer data capturing growth and water storage dynamics", "高精度径向生长仪数据，捕捉生长和水分储存动态") },
    { icon: Thermometer, label: t("Microclimate Data", "微气候数据"), desc: t("Air temperature, humidity, radiation, wind speed, and precipitation", "气温、湿度、辐射、风速和降水") },
    { icon: Droplets, label: t("Soil Moisture Profiles", "土壤水分剖面"), desc: t("Multi-depth soil water content and soil temperature measurements", "多层土壤含水量和土壤温度测量") },
    { icon: Database, label: t("Carbon Flux Data", "碳通量数据"), desc: t("Eddy covariance measurements of ecosystem CO₂ and H₂O exchange", "生态系统CO₂和H₂O交换的涡度相关测量") },
  ];

  return (
    <section id="data" className="relative py-24 lg:py-32 overflow-hidden bg-cream">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={DATA_IMG} alt="" className="w-full h-full object-cover opacity-[0.04]" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-cream via-cream/98 to-cream" />
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
            {t("Data Portal", "数据门户")}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-900">
            {t("Open Data for Plantation Science", "人工林科学开放数据")}
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
            <h3 className="text-xl font-bold text-forest-900 font-[family-name:var(--font-display)] mb-8">
              {t("Available Data Types", "可用数据类型")}
            </h3>
            <div className="space-y-4">
              {dataTypes.map((dt, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-4 bg-white border border-forest-100 rounded-lg p-4 hover:border-forest-300 hover:shadow-md transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-forest-50 flex items-center justify-center flex-shrink-0">
                    <dt.icon size={18} className="text-forest-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-forest-800 font-[family-name:var(--font-body)]">
                      {dt.label}
                    </h4>
                    <p className="text-xs text-forest-500 font-[family-name:var(--font-body)] mt-1 leading-relaxed">
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
              <div className="bg-white border border-forest-200 rounded-2xl p-8 lg:p-10 text-center shadow-sm">
                <div className="relative inline-flex items-center justify-center mb-8">
                  <div className="absolute w-24 h-24 rounded-full bg-forest-100 animate-pulse" />
                  <div className="relative w-20 h-20 rounded-full bg-forest-50 border-2 border-forest-200 flex items-center justify-center">
                    <Lock size={32} className="text-forest-600" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-forest-900 font-[family-name:var(--font-display)] mb-3">
                  {t("Data Portal", "数据门户")}
                </h3>
                <p className="text-forest-600 font-[family-name:var(--font-body)] font-semibold text-sm tracking-wider uppercase mb-4">
                  {t("Coming Soon", "即将上线")}
                </p>
                <p className="text-sm text-forest-500 font-[family-name:var(--font-body)] leading-relaxed mb-8">
                  {t(
                    "Our data sharing platform is currently under development. Access to CP-GPE Net datasets will be available through collaboration agreements.",
                    "我们的数据共享平台正在开发中。CP-GPE Net数据集将通过合作协议提供访问。"
                  )}
                </p>

                <div className="w-full bg-forest-50 rounded-full h-2 mb-3">
                  <div className="bg-gradient-to-r from-forest-500 to-forest-400 h-2 rounded-full" style={{ width: "65%" }} />
                </div>
                <p className="text-xs text-forest-400 font-[family-name:var(--font-mono)]">
                  {t("Development Progress: 65%", "开发进度：65%")}
                </p>
              </div>

              <div className="absolute -top-3 -right-3 w-16 h-16 border-t-2 border-r-2 border-forest-200 rounded-tr-xl" />
              <div className="absolute -bottom-3 -left-3 w-16 h-16 border-b-2 border-l-2 border-forest-200 rounded-bl-xl" />
            </div>

            <p className="mt-8 text-sm text-forest-500 font-[family-name:var(--font-body)] text-center max-w-sm italic">
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
