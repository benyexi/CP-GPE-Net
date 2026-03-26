/**
 * Team Section — CP-GPE Net
 * Light cream background (bg-cream) for deep-light alternation.
 * Displays PI and key team members, inspired by TreeNet's About Us page.
 */
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { BookOpen, GraduationCap, FlaskConical, Users } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

interface TeamMember {
  nameEn: string;
  nameCn: string;
  roleEn: string;
  roleCn: string;
  affiliationEn: string;
  affiliationCn: string;
  focusEn: string;
  focusCn: string;
  icon: React.ElementType;
}

const teamMembers: TeamMember[] = [
  {
    nameEn: "Prof. Xi Benye",
    nameCn: "席本野 教授",
    roleEn: "Principal Investigator & Network Director",
    roleCn: "首席研究员 & 网络负责人",
    affiliationEn: "Beijing Forestry University, College of Forestry",
    affiliationCn: "北京林业大学 林学院",
    focusEn: "Plantation water relations, sap flow instrumentation (TDP/HFD/heat ratio), hydraulic redistribution. 129 SCI publications. National Key R&D Program PI.",
    focusCn: "人工林水分关系、树液流仪器（TDP/HFD/热比率）、水力再分配。129篇SCI论文。国家重点研发计划首席科学家。",
    icon: BookOpen,
  },
  {
    nameEn: "Research Team",
    nameCn: "科研团队",
    roleEn: "PhD Students & Postdocs",
    roleCn: "博士生 & 博士后",
    affiliationEn: "PWRlab, Beijing Forestry University",
    affiliationCn: "北京林业大学 人工林水分关系实验室",
    focusEn: "Sap flow data analysis, dendrometer signal processing, stable isotope tracing, and eddy covariance measurements across the network.",
    focusCn: "液流数据分析、径向生长仪信号处理、稳定同位素示踪和网络涡度相关测量。",
    icon: GraduationCap,
  },
  {
    nameEn: "Field Technicians",
    nameCn: "野外技术团队",
    roleEn: "Instrumentation & Maintenance",
    roleCn: "仪器安装与维护",
    affiliationEn: "Distributed across 22 monitoring sites",
    affiliationCn: "分布在22个监测站点",
    focusEn: "Probe installation, sensor calibration, data logger maintenance, and quality control across all network sites.",
    focusCn: "探针安装、传感器标定、数据采集器维护和全网站点质量控制。",
    icon: FlaskConical,
  },
  {
    nameEn: "Partner Investigators",
    nameCn: "合作研究员",
    roleEn: "Collaborating PIs",
    roleCn: "合作PI",
    affiliationEn: "15+ partner institutions across China & USA",
    affiliationCn: "中国和美国15+合作机构",
    focusEn: "Regional expertise in plantation ecology, hydrology, and climate science, contributing local knowledge and site management.",
    focusCn: "人工林生态学、水文学和气候科学的区域专业知识，贡献本地知识和站点管理。",
    icon: Users,
  },
];

const institutions = [
  { en: "Beijing Forestry University", cn: "北京林业大学", abbr: "BFU" },
  { en: "Chinese Academy of Sciences", cn: "中国科学院", abbr: "CAS" },
  { en: "Washington State University", cn: "华盛顿州立大学", abbr: "WSU" },
  { en: "Northwest A&F University", cn: "西北农林科技大学", abbr: "NWAFU" },
  { en: "Chinese Academy of Forestry", cn: "中国林业科学研究院", abbr: "CAF" },
  { en: "Nanjing Forestry University", cn: "南京林业大学", abbr: "NFU" },
  { en: "Northeast Forestry University", cn: "东北林业大学", abbr: "NEFU" },
  { en: "Shandong Agricultural University", cn: "山东农业大学", abbr: "SDAU" },
  { en: "Ningxia University", cn: "宁夏大学", abbr: "NXU" },
  { en: "Qinghai University", cn: "青海大学", abbr: "QHU" },
];

export default function TeamSection() {
  const { lang, t } = useLang();
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section id="team" className="relative py-24 lg:py-32 overflow-hidden bg-cream">
      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="text-forest-600 text-sm font-semibold tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-body)" }}>
            {t("Our Team", "我们的团队")}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-900" style={{ fontFamily: "var(--font-display)" }}>
            {t("People Behind the Network", "网络背后的团队")}
          </h2>
          <div className="mt-6 section-divider max-w-xs mx-auto" />
        </motion.div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {teamMembers.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className={`group bg-white border border-forest-100 rounded-xl p-6 lg:p-8 hover:border-forest-300 hover:shadow-lg transition-all duration-300 ${
                i === 0 ? "md:col-span-2 md:flex md:items-start md:gap-8" : ""
              }`}
            >
              <div className={`flex-shrink-0 ${i === 0 ? "mb-0" : "mb-4"}`}>
                <div className={`${i === 0 ? "w-20 h-20" : "w-14 h-14"} rounded-xl bg-gradient-to-br from-forest-500 to-forest-700 flex items-center justify-center shadow-md`}>
                  <member.icon size={i === 0 ? 32 : 24} className="text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className={`${i === 0 ? "text-2xl" : "text-lg"} font-bold text-forest-900 mb-1`} style={{ fontFamily: "var(--font-display)" }}>
                  {lang === "en" ? member.nameEn : member.nameCn}
                </h3>
                <p className="text-sm font-semibold text-forest-600 mb-1" style={{ fontFamily: "var(--font-body)" }}>
                  {lang === "en" ? member.roleEn : member.roleCn}
                </p>
                <p className="text-xs text-forest-400 mb-3" style={{ fontFamily: "var(--font-body)" }}>
                  {lang === "en" ? member.affiliationEn : member.affiliationCn}
                </p>
                <p className={`${i === 0 ? "text-base" : "text-sm"} text-forest-600 leading-relaxed`} style={{ fontFamily: "var(--font-body)" }}>
                  {lang === "en" ? member.focusEn : member.focusCn}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Partner Institutions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-20"
        >
          <h3 className="text-sm text-forest-500 font-semibold tracking-[0.2em] uppercase text-center mb-10" style={{ fontFamily: "var(--font-body)" }}>
            {t("Partner Institutions", "合作机构")}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {institutions.map((inst, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center bg-white border border-forest-100 rounded-xl p-4 hover:border-forest-300 hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-forest-50 flex items-center justify-center mb-2">
                  <span className="text-xs font-bold text-forest-700" style={{ fontFamily: "var(--font-mono)" }}>
                    {inst.abbr}
                  </span>
                </div>
                <span className="text-xs text-forest-600 text-center leading-tight" style={{ fontFamily: "var(--font-body)" }}>
                  {lang === "en" ? inst.en : inst.cn}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
