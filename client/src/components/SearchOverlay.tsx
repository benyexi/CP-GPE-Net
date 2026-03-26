/**
 * Search Overlay — CP-GPE Net
 * Full-screen search overlay with fuzzy matching across sites, sections, and content.
 * Inspired by TreeNet's search functionality.
 */
import { useState, useEffect, useMemo, useRef } from "react";
import { Search, X, MapPin, FileText, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { monitoringSites, regionsCn } from "@/lib/siteData";
import { useLang } from "@/contexts/LanguageContext";

interface SearchResult {
  type: "site" | "section" | "content";
  titleEn: string;
  titleCn: string;
  descEn: string;
  descCn: string;
  action: () => void;
}

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
  onOpenSiteDetail?: (siteId: number) => void;
}

export default function SearchOverlay({ open, onClose, onOpenSiteDetail }: SearchOverlayProps) {
  const { lang, t } = useLang();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const sections: SearchResult[] = useMemo(() => [
    { type: "section", titleEn: "Home", titleCn: "首页", descEn: "Hero section and network overview", descCn: "首页横幅和网络概览", action: () => { document.getElementById("home")?.scrollIntoView({ behavior: "smooth" }); onClose(); } },
    { type: "section", titleEn: "About", titleCn: "关于", descEn: "Network introduction and goals", descCn: "网络介绍和目标", action: () => { document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }); onClose(); } },
    { type: "section", titleEn: "Network Map", titleCn: "监测网络", descEn: "Interactive map of all monitoring sites", descCn: "所有监测站点的交互式地图", action: () => { document.getElementById("network")?.scrollIntoView({ behavior: "smooth" }); onClose(); } },
    { type: "section", titleEn: "Research", titleCn: "研究", descEn: "Research focus areas and publications", descCn: "研究方向和论文", action: () => { document.getElementById("research")?.scrollIntoView({ behavior: "smooth" }); onClose(); } },
    { type: "section", titleEn: "Methods", titleCn: "方法学", descEn: "Instruments and data processing", descCn: "仪器和数据处理", action: () => { document.getElementById("methods")?.scrollIntoView({ behavior: "smooth" }); onClose(); } },
    { type: "section", titleEn: "Team", titleCn: "团队", descEn: "People behind the network", descCn: "网络背后的团队", action: () => { document.getElementById("team")?.scrollIntoView({ behavior: "smooth" }); onClose(); } },
    { type: "section", titleEn: "Data Portal", titleCn: "数据门户", descEn: "Data access and sharing", descCn: "数据访问和共享", action: () => { document.getElementById("data")?.scrollIntoView({ behavior: "smooth" }); onClose(); } },
    { type: "section", titleEn: "News", titleCn: "新闻", descEn: "Latest updates and announcements", descCn: "最新动态和公告", action: () => { document.getElementById("news")?.scrollIntoView({ behavior: "smooth" }); onClose(); } },
    { type: "section", titleEn: "Join Us", titleCn: "合作", descEn: "Collaboration opportunities", descCn: "合作机会", action: () => { document.getElementById("join")?.scrollIntoView({ behavior: "smooth" }); onClose(); } },
  ], [onClose]);

  const siteResults: SearchResult[] = useMemo(() =>
    monitoringSites.map((site) => ({
      type: "site" as const,
      titleEn: site.nameEn,
      titleCn: site.nameCn,
      descEn: `${site.region} · ${site.speciesEn || ""} · ${site.elevationM || ""}m`,
      descCn: `${regionsCn[site.region] || site.region} · ${site.speciesCn || ""} · ${site.elevationM || ""}m`,
      action: () => {
        if (onOpenSiteDetail) {
          onOpenSiteDetail(site.id);
        }
        onClose();
      },
    })),
    [onClose, onOpenSiteDetail]
  );

  const contentResults: SearchResult[] = useMemo(() => [
    { type: "content", titleEn: "Sap Flow", titleCn: "树液流", descEn: "TDP, HFD, and heat ratio sap flow measurement techniques", descCn: "TDP、HFD和热比率液流测量技术", action: () => { document.getElementById("methods")?.scrollIntoView({ behavior: "smooth" }); onClose(); } },
    { type: "content", titleEn: "Dendrometer", titleCn: "径向生长仪", descEn: "Point and band dendrometers for stem growth monitoring", descCn: "点式和环式径向生长仪用于茎干生长监测", action: () => { document.getElementById("methods")?.scrollIntoView({ behavior: "smooth" }); onClose(); } },
    { type: "content", titleEn: "Yellow River Basin", titleCn: "黄河流域", descEn: "Monitoring sites in the Yellow River watershed", descCn: "黄河流域的监测站点", action: () => { document.getElementById("network")?.scrollIntoView({ behavior: "smooth" }); onClose(); } },
    { type: "content", titleEn: "Hydraulic Redistribution", titleCn: "水力再分配", descEn: "Nocturnal water redistribution through root systems", descCn: "根系夜间水分再分配", action: () => { document.getElementById("research")?.scrollIntoView({ behavior: "smooth" }); onClose(); } },
    { type: "content", titleEn: "Stable Isotope", titleCn: "稳定同位素", descEn: "δ²H and δ¹⁸O analysis for water source tracing", descCn: "δ²H和δ¹⁸O分析用于水分来源追踪", action: () => { document.getElementById("methods")?.scrollIntoView({ behavior: "smooth" }); onClose(); } },
    { type: "content", titleEn: "Eddy Covariance", titleCn: "涡度相关", descEn: "Ecosystem CO₂ and H₂O flux measurements", descCn: "生态系统CO₂和H₂O通量测量", action: () => { document.getElementById("methods")?.scrollIntoView({ behavior: "smooth" }); onClose(); } },
    { type: "content", titleEn: "Three-North Shelterbelt", titleCn: "三北防护林", descEn: "China's major ecological restoration program", descCn: "中国重大生态恢复工程", action: () => { document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }); onClose(); } },
  ], [onClose]);

  const allResults = useMemo(() => [...sections, ...siteResults, ...contentResults], [sections, siteResults, contentResults]);

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allResults.filter((r) =>
      r.titleEn.toLowerCase().includes(q) ||
      r.titleCn.includes(q) ||
      r.descEn.toLowerCase().includes(q) ||
      r.descCn.includes(q)
    ).slice(0, 10);
  }, [query, allResults]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] bg-forest-900/60 backdrop-blur-sm flex items-start justify-center pt-[15vh]"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-2xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-forest-100">
              <Search size={20} className="text-forest-400 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("Search sites, topics, methods...", "搜索站点、主题、方法...")}
                className="flex-1 text-lg text-forest-800 bg-transparent outline-none placeholder-forest-300"
                style={{ fontFamily: "var(--font-body)" }}
              />
              <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-forest-50 text-forest-400 hover:text-forest-600 transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[50vh] overflow-y-auto">
              {query.trim() === "" ? (
                <div className="px-6 py-8 text-center">
                  <p className="text-sm text-forest-400" style={{ fontFamily: "var(--font-body)" }}>
                    {t("Type to search across all content", "输入关键词搜索全部内容")}
                  </p>
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {["Sap Flow", "Populus", "Yellow River", "TDP", "Beijing"].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setQuery(tag)}
                        className="px-3 py-1.5 text-xs bg-forest-50 text-forest-600 rounded-full hover:bg-forest-100 transition-colors"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              ) : filtered.length === 0 ? (
                <div className="px-6 py-8 text-center">
                  <p className="text-sm text-forest-400" style={{ fontFamily: "var(--font-body)" }}>
                    {t("No results found", "未找到结果")}
                  </p>
                </div>
              ) : (
                <div className="py-2">
                  {filtered.map((result, i) => (
                    <button
                      key={i}
                      onClick={result.action}
                      className="w-full flex items-center gap-4 px-6 py-3 hover:bg-forest-50 transition-colors text-left"
                    >
                      <div className="w-8 h-8 rounded-lg bg-forest-50 flex items-center justify-center flex-shrink-0">
                        {result.type === "site" ? (
                          <MapPin size={14} className="text-forest-500" />
                        ) : result.type === "section" ? (
                          <ArrowRight size={14} className="text-forest-500" />
                        ) : (
                          <FileText size={14} className="text-forest-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-forest-800 truncate" style={{ fontFamily: "var(--font-body)" }}>
                          {lang === "en" ? result.titleEn : result.titleCn}
                        </div>
                        <div className="text-xs text-forest-400 truncate" style={{ fontFamily: "var(--font-body)" }}>
                          {lang === "en" ? result.descEn : result.descCn}
                        </div>
                      </div>
                      <span className="text-[10px] text-forest-300 uppercase tracking-wider px-2 py-0.5 bg-forest-50 rounded-full flex-shrink-0" style={{ fontFamily: "var(--font-mono)" }}>
                        {result.type === "site" ? t("Site", "站点") : result.type === "section" ? t("Page", "页面") : t("Topic", "主题")}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Footer hint */}
            <div className="px-6 py-3 border-t border-forest-100 flex items-center justify-between">
              <span className="text-xs text-forest-300" style={{ fontFamily: "var(--font-body)" }}>
                {t("Press ESC to close", "按 ESC 关闭")}
              </span>
              <span className="text-xs text-forest-300" style={{ fontFamily: "var(--font-mono)" }}>
                {filtered.length > 0 ? `${filtered.length} ${t("results", "条结果")}` : ""}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
