/**
 * Methods Section — CP-GPE Net
 * DARK forest-900 background for visual rhythm (deep-light alternation).
 * Instruments: TDP, HFD, Dendrometers, Deep Soil Moisture System (NO eddy covariance, NO stable isotope).
 * Bilingual.
 */
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Radio, Thermometer, Droplets, Microscope, Cpu, BarChart3, ArrowRight, GitBranch, Database } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

export default function MethodsSection() {
  const { lang, t } = useLang();
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  const instruments = [
    {
      icon: Radio,
      titleEn: "Thermal Dissipation Probes (TDP)",
      titleCn: "热消散探针 (TDP)",
      descEn: "Custom-built Granier-type probes measuring sap flux density. Each probe consists of a heated and reference needle inserted into the sapwood, with temperature difference proportional to sap flow velocity.",
      descCn: "自研Granier型探针测量液流通量密度。每个探针由插入边材的加热针和参考针组成，温差与液流速度成正比。",
      specEn: "Resolution: 0.1 L/day | Sampling: 10-min intervals | Needle length: 20mm standard",
      specCn: "分辨率：0.1 L/天 | 采样：10分钟间隔 | 针长：20mm标准",
    },
    {
      icon: Thermometer,
      titleEn: "Heat Field Deformation (HFD)",
      titleCn: "热场变形探针 (HFD)",
      descEn: "Multi-point HFD sensors measuring radial sap flow profiles. Capable of detecting reverse flow and radial variation in sap velocity across the sapwood.",
      descCn: "多点HFD传感器测量径向液流剖面。能够检测反向流和边材中液流速度的径向变化。",
      specEn: "Radial points: 8 | Detects reverse flow | Sapwood depth: up to 80mm",
      specCn: "径向测点：8个 | 可检测反向流 | 边材深度：最大80mm",
    },
    {
      icon: Microscope,
      titleEn: "Point & Band Dendrometers",
      titleCn: "点式和环式径向生长仪",
      descEn: "High-precision electronic dendrometers continuously recording stem diameter changes at micrometer resolution, capturing growth, water storage, and bark shrinkage dynamics.",
      descCn: "高精度电子径向生长仪以微米分辨率连续记录茎干直径变化，捕捉生长、水分储存和树皮收缩动态。",
      specEn: "Resolution: 1 μm | Sampling: 15-min | Operating range: -30°C to +60°C",
      specCn: "分辨率：1 μm | 采样：15分钟 | 工作范围：-30°C 至 +60°C",
    },
    {
      icon: Droplets,
      titleEn: "Deep Soil Moisture Monitoring System",
      titleCn: "深层土壤水分测定系统",
      descEn: "Multi-depth soil moisture sensor arrays installed at depths from 0 to 10 meters, continuously monitoring soil water content profiles to understand deep root water uptake and groundwater recharge dynamics.",
      descCn: "多深度土壤水分传感器阵列安装于0至10米深度，持续监测土壤含水量剖面，了解深层根系吸水和地下水补给动态。",
      specEn: "Depth range: 0–10 m | Sensors per profile: 10–15 | Accuracy: ±2% VWC",
      specCn: "深度范围：0–10 m | 每剖面传感器：10–15个 | 精度：±2% 体积含水量",
    },
  ];

  const pipeline = [
    { icon: Cpu, labelEn: "Data Logger Collection", labelCn: "数据采集器采集", descEn: "CR1000X/CR6 loggers with cellular telemetry", descCn: "CR1000X/CR6采集器配蜂窝遥测" },
    { icon: Database, labelEn: "Raw Data QC", labelCn: "原始数据质控", descEn: "Automated spike detection & gap flagging", descCn: "自动尖峰检测和缺失标记" },
    { icon: GitBranch, labelEn: "Signal Processing", labelCn: "信号处理", descEn: "Baseline correction, zero-flow extraction", descCn: "基线校正、零流量提取" },
    { icon: BarChart3, labelEn: "Flux Calculation", labelCn: "通量计算", descEn: "Species-specific calibration equations", descCn: "树种特异性标定方程" },
  ];

  return (
    <section id="methods" className="relative py-24 lg:py-32 overflow-hidden bg-forest-900">
      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="text-forest-300 text-sm font-semibold tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-body)" }}>
            {t("Methodology", "方法学")}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
            {t("Instruments & Data Processing", "仪器与数据处理")}
          </h2>
          <p className="mt-6 text-lg text-forest-300 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
            {t(
              "Our network employs state-of-the-art instrumentation and rigorous data processing pipelines to ensure high-quality, comparable datasets across all sites.",
              "我们的网络采用最先进的仪器和严格的数据处理流程，确保所有站点的高质量、可比较数据集。"
            )}
          </p>
          <div className="mt-6 w-20 h-0.5 bg-amber-500/60 mx-auto" />
        </motion.div>

        {/* Instruments */}
        <div className="space-y-6 mb-20 lg:mb-28">
          {instruments.map((inst, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className="group bg-forest-800/60 border border-forest-600/25 rounded-xl p-6 lg:p-8 hover:border-forest-400/40 hover:bg-forest-800/80 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row items-start gap-5">
                <div className="w-14 h-14 rounded-xl bg-forest-700/50 flex items-center justify-center flex-shrink-0 group-hover:bg-forest-600/50 transition-colors">
                  <inst.icon size={28} className="text-forest-300" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>
                    {lang === "en" ? inst.titleEn : inst.titleCn}
                  </h3>
                  <p className="text-sm text-forest-300 leading-relaxed mb-3" style={{ fontFamily: "var(--font-body)" }}>
                    {lang === "en" ? inst.descEn : inst.descCn}
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-forest-700/40 rounded-lg border border-forest-600/20">
                    <span className="text-xs text-amber-400/90" style={{ fontFamily: "var(--font-mono)" }}>
                      {lang === "en" ? inst.specEn : inst.specCn}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Data Processing Pipeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-2xl lg:text-3xl font-bold text-white text-center mb-12" style={{ fontFamily: "var(--font-display)" }}>
            {t("Data Processing Pipeline", "数据处理流程")}
          </h3>
          <div className="flex flex-col sm:flex-row items-stretch gap-4">
            {pipeline.map((step, i) => (
              <div key={i} className="flex-1 flex flex-col sm:flex-row items-center gap-4">
                <div className="flex-1 bg-forest-800/60 border border-forest-600/25 rounded-xl p-5 text-center hover:border-forest-400/40 hover:bg-forest-800/80 transition-all">
                  <div className="w-12 h-12 rounded-full bg-forest-700/50 flex items-center justify-center mx-auto mb-3">
                    <step.icon size={22} className="text-forest-300" />
                  </div>
                  <div className="text-xs font-bold text-amber-500/80 uppercase tracking-wider mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                    {t("Step", "步骤")} {i + 1}
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1" style={{ fontFamily: "var(--font-body)" }}>
                    {lang === "en" ? step.labelEn : step.labelCn}
                  </h4>
                  <p className="text-xs text-forest-400" style={{ fontFamily: "var(--font-body)" }}>
                    {lang === "en" ? step.descEn : step.descCn}
                  </p>
                </div>
                {i < pipeline.length - 1 && (
                  <ArrowRight size={20} className="text-forest-500 hidden sm:block flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
