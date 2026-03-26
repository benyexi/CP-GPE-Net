/**
 * Data Section — CP-GPE Net
 * DARK forest-900 background. Left: data types list. Right: example data visualization
 * using Recharts (sap flow density + precipitation seasonal, sap flow + VPD diurnal).
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Activity, Thermometer, Droplets, BarChart3, Waves, TrendingUp, Info } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  ComposedChart,
  Bar,
} from "recharts";

/* ---------- simulated monthly data for Wen County (Henan) ---------- */
const monthlyData = (() => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthsCn = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
  const sapFlow = [0.8, 1.2, 4.5, 12.3, 22.8, 35.4, 42.1, 38.6, 24.2, 10.5, 3.2, 0.6];
  const precip = [8, 12, 25, 35, 55, 85, 145, 120, 65, 40, 18, 10];
  return months.map((m, i) => ({
    month: m,
    monthCn: monthsCn[i],
    sapFlow: sapFlow[i],
    precip: precip[i],
  }));
})();

/* ---------- simulated diurnal data for a summer day ---------- */
const diurnalData = (() => {
  const hours: { hour: string; sapFlow: number; vpd: number }[] = [];
  for (let h = 0; h < 24; h++) {
    const label = `${String(h).padStart(2, "0")}:00`;
    const sf = Math.max(0, 42 * Math.exp(-0.5 * Math.pow((h - 13) / 3.5, 2)) + (Math.random() - 0.5) * 2);
    const vpd = Math.max(0.1, 2.8 * Math.exp(-0.5 * Math.pow((h - 14) / 4, 2)) + (Math.random() - 0.5) * 0.15);
    hours.push({ hour: label, sapFlow: Math.round(sf * 10) / 10, vpd: Math.round(vpd * 100) / 100 });
  }
  return hours;
})();

type ChartView = "seasonal" | "diurnal";

export default function DataSection() {
  const { lang, t } = useLang();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [chartView, setChartView] = useState<ChartView>("seasonal");

  const dataTypes = [
    { icon: Activity, label: t("Sap Flow Time Series", "树液流时间序列"), desc: t("Continuous thermal dissipation probe measurements at sub-hourly resolution", "亚小时分辨率的连续热消散探针测量数据") },
    { icon: BarChart3, label: t("Stem Diameter Changes", "茎干直径变化"), desc: t("High-precision dendrometer data capturing growth and water storage dynamics", "高精度径向生长仪数据，捕捉生长和水分储存动态") },
    { icon: Thermometer, label: t("Microclimate Data", "微气候数据"), desc: t("Air temperature, humidity, radiation, wind speed, and precipitation", "气温、湿度、辐射、风速和降水") },
    { icon: Droplets, label: t("Soil Moisture Profiles", "土壤水分剖面"), desc: t("Multi-depth soil water content and soil temperature measurements (0–10 m)", "多层土壤含水量和土壤温度测量（0–10 m）") },
    { icon: Waves, label: t("Groundwater Level Data", "地下水位数据"), desc: t("Continuous groundwater table monitoring for understanding root-zone water dynamics", "连续地下水位监测，了解根区水分动态") },
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
          {/* Left: Data Types */}
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

            {/* Access note */}
            <div className="mt-6 bg-forest-800/40 border border-amber-500/20 rounded-lg p-4 flex items-start gap-3">
              <Info size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-forest-300 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                {t(
                  "Data sharing is available via collaboration agreement. Contact us through the Join section below.",
                  "数据共享可通过合作协议获取。请通过下方的合作栏目联系我们。"
                )}
              </p>
            </div>
          </motion.div>

          {/* Right: Example Data Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-forest-800/60 border border-forest-600/25 rounded-2xl overflow-hidden">
              {/* Chart Header */}
              <div className="px-5 pt-5 pb-3">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={16} className="text-amber-400" />
                    <h3 className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                      {t("Example Data Preview", "示例数据预览")}
                    </h3>
                  </div>
                </div>
                <p className="text-xs text-forest-400 mb-3" style={{ fontFamily: "var(--font-body)" }}>
                  {t(
                    "Wen County, Henan — Populus × euramericana (simulated)",
                    "河南温县 — 欧美杨（模拟数据）"
                  )}
                </p>

                {/* Chart Toggle */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setChartView("seasonal")}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                      chartView === "seasonal"
                        ? "bg-amber-500 text-forest-900"
                        : "bg-forest-700/50 text-forest-300 hover:text-white"
                    }`}
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {t("Seasonal Pattern", "季节模式")}
                  </button>
                  <button
                    onClick={() => setChartView("diurnal")}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                      chartView === "diurnal"
                        ? "bg-amber-500 text-forest-900"
                        : "bg-forest-700/50 text-forest-300 hover:text-white"
                    }`}
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {t("Diurnal Cycle", "日变化")}
                  </button>
                </div>
              </div>

              {/* Chart Area */}
              <div className="px-2 pb-4">
                {chartView === "seasonal" ? (
                  <SeasonalChart lang={lang} />
                ) : (
                  <DiurnalChart lang={lang} />
                )}
              </div>

              {/* Chart Footer */}
              <div className="px-5 pb-4 border-t border-forest-700/30 pt-3">
                <p className="text-[10px] text-forest-500 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                  {t(
                    "Note: Data shown are simulated examples for demonstration purposes. Actual datasets are available through collaboration agreements.",
                    "注：所示数据为模拟示例，仅供展示。实际数据集可通过合作协议获取。"
                  )}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Seasonal Chart Component ---------- */
function SeasonalChart({ lang }: { lang: string }) {
  const t = (en: string, cn: string) => (lang === "en" ? en : cn);

  return (
    <div className="w-full" style={{ height: 320 }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={monthlyData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
          <XAxis
            dataKey={lang === "en" ? "month" : "monthCn"}
            tick={{ fontSize: 10, fill: "#8fae8b" }}
            axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
            tickLine={false}
          />
          <YAxis
            yAxisId="left"
            tick={{ fontSize: 10, fill: "#8fae8b" }}
            axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
            tickLine={false}
            label={{
              value: t("Sap Flow (g cm⁻² h⁻¹)", "液流密度 (g cm⁻² h⁻¹)"),
              angle: -90,
              position: "insideLeft",
              offset: 20,
              style: { fontSize: 9, fill: "#6bbf59" },
            }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 10, fill: "#8fae8b" }}
            axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
            tickLine={false}
            label={{
              value: t("Precip. (mm)", "降水 (mm)"),
              angle: 90,
              position: "insideRight",
              offset: 15,
              style: { fontSize: 9, fill: "#5b9bd5" },
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(20,40,25,0.95)",
              border: "1px solid rgba(107,191,89,0.3)",
              borderRadius: 8,
              fontSize: 11,
              color: "#e0eed8",
              fontFamily: "'Source Sans 3', sans-serif",
            }}
            labelStyle={{ color: "#fff", fontWeight: 600 }}
            formatter={(value: number, name: string) => {
              if (name === "sapFlow") return [value.toFixed(1), t("Sap Flow (g cm⁻² h⁻¹)", "液流密度")];
              if (name === "precip") return [value, t("Precipitation (mm)", "降水 (mm)")];
              return [value, name];
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: 10, color: "#8fae8b", fontFamily: "'Source Sans 3', sans-serif" }}
            formatter={(value: string) => {
              if (value === "sapFlow") return t("Sap Flow Density", "液流密度");
              if (value === "precip") return t("Precipitation", "降水量");
              return value;
            }}
          />
          <Bar
            yAxisId="right"
            dataKey="precip"
            fill="rgba(91,155,213,0.35)"
            radius={[3, 3, 0, 0]}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="sapFlow"
            stroke="#6bbf59"
            strokeWidth={2.5}
            dot={{ r: 3, fill: "#6bbf59", stroke: "#fff", strokeWidth: 1 }}
            activeDot={{ r: 5, fill: "#6bbf59", stroke: "#fff", strokeWidth: 2 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ---------- Diurnal Chart Component ---------- */
function DiurnalChart({ lang }: { lang: string }) {
  const t = (en: string, cn: string) => (lang === "en" ? en : cn);

  return (
    <div className="w-full" style={{ height: 320 }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={diurnalData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
          <XAxis
            dataKey="hour"
            tick={{ fontSize: 10, fill: "#8fae8b" }}
            axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
            tickLine={false}
            interval={2}
          />
          <YAxis
            yAxisId="left"
            tick={{ fontSize: 10, fill: "#8fae8b" }}
            axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
            tickLine={false}
            label={{
              value: t("Sap Flow (g cm⁻² h⁻¹)", "液流密度 (g cm⁻² h⁻¹)"),
              angle: -90,
              position: "insideLeft",
              offset: 20,
              style: { fontSize: 9, fill: "#6bbf59" },
            }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 10, fill: "#8fae8b" }}
            axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
            tickLine={false}
            domain={[0, 3.5]}
            label={{
              value: t("VPD (kPa)", "饱和水汽压差 (kPa)"),
              angle: 90,
              position: "insideRight",
              offset: 15,
              style: { fontSize: 9, fill: "#e8a838" },
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(20,40,25,0.95)",
              border: "1px solid rgba(107,191,89,0.3)",
              borderRadius: 8,
              fontSize: 11,
              color: "#e0eed8",
              fontFamily: "'Source Sans 3', sans-serif",
            }}
            labelStyle={{ color: "#fff", fontWeight: 600 }}
            formatter={(value: number, name: string) => {
              if (name === "sapFlow") return [value.toFixed(1), t("Sap Flow (g cm⁻² h⁻¹)", "液流密度")];
              if (name === "vpd") return [value.toFixed(2), t("VPD (kPa)", "饱和水汽压差")];
              return [value, name];
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: 10, color: "#8fae8b", fontFamily: "'Source Sans 3', sans-serif" }}
            formatter={(value: string) => {
              if (value === "sapFlow") return t("Sap Flow Density", "液流密度");
              if (value === "vpd") return t("VPD", "饱和水汽压差");
              return value;
            }}
          />
          <Area
            yAxisId="right"
            type="monotone"
            dataKey="vpd"
            fill="rgba(232,168,56,0.15)"
            stroke="#e8a838"
            strokeWidth={1.5}
            strokeDasharray="4 3"
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="sapFlow"
            stroke="#6bbf59"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4, fill: "#6bbf59", stroke: "#fff", strokeWidth: 2 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
