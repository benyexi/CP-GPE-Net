/**
 * Footer — CP-GPE Net
 * Deep forest green, enlarged text. Bilingual.
 */
import { TreePine } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

export default function Footer() {
  const { lang, t } = useLang();

  const quickLinks = [
    { en: "Home", cn: "首页", href: "#home" },
    { en: "About", cn: "关于", href: "#about" },
    { en: "Network", cn: "监测网络", href: "#network" },
    { en: "Research", cn: "研究", href: "#research" },
    { en: "Methods", cn: "方法", href: "#methods" },
    { en: "Team", cn: "团队", href: "#team" },
    { en: "Data", cn: "数据", href: "#data" },
    { en: "News", cn: "动态", href: "#news" },
    { en: "Join Us", cn: "合作", href: "#join" },
  ];

  const affiliations = [
    t("Beijing Forestry University", "北京林业大学"),
    t("National Key R&D Program", "国家重点研发计划"),
    t("Three-North Shelterbelt Program", "三北防护林工程"),
  ];

  const scrollTo = (href: string) => {
    const el = document.getElementById(href.slice(1));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative bg-forest-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-3 gap-14">
          {/* Logo & Tagline */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-forest-400 to-forest-600 flex items-center justify-center shadow-lg">
                <TreePine size={24} className="text-white" />
              </div>
              <span className="text-white font-bold text-xl" style={{ fontFamily: "var(--font-display)" }}>
                CP-GPE Net
              </span>
            </div>
            <p className="text-base text-forest-200 leading-relaxed max-w-xs" style={{ fontFamily: "var(--font-body)" }}>
              {t(
                "Monitoring Plantation Water, Growth, and Ecology Across China and Beyond",
                "监测中国及全球人工林水分、生长与生态"
              )}
            </p>
            <p className="mt-5 text-sm text-forest-300 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              {t("Plantation Water Relations Lab (PWRlab)", "人工林水分关系实验室（PWRlab）")}<br />
              {t("Beijing Forestry University", "北京林业大学")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base text-forest-200 font-semibold tracking-[0.15em] uppercase mb-7" style={{ fontFamily: "var(--font-body)" }}>
              {t("Quick Links", "快速导航")}
            </h4>
            <nav className="grid grid-cols-2 gap-3">
              {quickLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-left text-base text-forest-300 hover:text-white transition-colors py-1"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {lang === "en" ? link.en : link.cn}
                </button>
              ))}
            </nav>
          </div>

          {/* Affiliations */}
          <div>
            <h4 className="text-base text-forest-200 font-semibold tracking-[0.15em] uppercase mb-7" style={{ fontFamily: "var(--font-body)" }}>
              {t("Affiliations", "隶属机构")}
            </h4>
            <div className="space-y-4">
              {affiliations.map((a, i) => (
                <p key={i} className="text-base text-forest-300" style={{ fontFamily: "var(--font-body)" }}>
                  {a}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-forest-700/50">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-forest-400" style={{ fontFamily: "var(--font-body)" }}>
              &copy; {new Date().getFullYear()} CP-GPE Net | PWRlab, {t("Beijing Forestry University", "北京林业大学")}. {t("All rights reserved.", "版权所有。")}
            </p>
            <p className="text-sm text-forest-400" style={{ fontFamily: "var(--font-body)" }}>
              {t("Built for advancing plantation science worldwide.", "致力于推进全球人工林科学发展。")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
