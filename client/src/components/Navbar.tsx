/**
 * Navbar — Fresh Forest Theme
 * Clean top navigation with glass effect, smooth scroll, EN/CN toggle, and search.
 */
import { useState, useEffect } from "react";
import { Menu, X, Globe, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";
import SearchOverlay from "./SearchOverlay";

const navLinks = [
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

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ctrl+K / Cmd+K shortcut
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.getElementById(href.slice(1));
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/85 backdrop-blur-xl border-b border-forest-200/60 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <button onClick={() => scrollTo("#home")} className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-forest-600 to-forest-700 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <span className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-body)" }}>CP</span>
              </div>
              <div className="hidden sm:block">
                <span className={`font-semibold text-sm tracking-wide transition-colors ${
                  scrolled ? "text-forest-900" : "text-white"
                }`} style={{ fontFamily: "var(--font-body)" }}>
                  CP-GPE Net
                </span>
              </div>
            </button>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 rounded-md ${
                    activeSection === link.href.slice(1)
                      ? scrolled ? "text-forest-700" : "text-white"
                      : scrolled ? "text-forest-600/70 hover:text-forest-800" : "text-white/70 hover:text-white"
                  }`}
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {lang === "en" ? link.en : link.cn}
                  {activeSection === link.href.slice(1) && (
                    <motion.div
                      layoutId="nav-indicator"
                      className={`absolute bottom-0 left-2 right-2 h-0.5 rounded-full ${
                        scrolled ? "bg-forest-600" : "bg-white"
                      }`}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}

              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className={`ml-2 p-2 rounded-lg transition-all duration-300 ${
                  scrolled
                    ? "text-forest-500 hover:text-forest-700 hover:bg-forest-50"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
                title={t("Search (Ctrl+K)", "搜索 (Ctrl+K)")}
              >
                <Search size={16} />
              </button>

              {/* Language Toggle */}
              <button
                onClick={() => setLang(lang === "en" ? "cn" : "en")}
                className={`ml-1 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-300 ${
                  scrolled
                    ? "border-forest-300 text-forest-700 hover:bg-forest-50"
                    : "border-white/30 text-white hover:bg-white/10"
                }`}
                style={{ fontFamily: "var(--font-body)" }}
              >
                <Globe size={13} />
                {lang === "en" ? "中文" : "EN"}
              </button>
            </div>

            {/* Mobile toggle + lang */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className={`p-2 transition-colors ${scrolled ? "text-forest-500" : "text-white/70"}`}
              >
                <Search size={18} />
              </button>
              <button
                onClick={() => setLang(lang === "en" ? "cn" : "en")}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  scrolled
                    ? "border-forest-300 text-forest-700"
                    : "border-white/30 text-white"
                }`}
                style={{ fontFamily: "var(--font-body)" }}
              >
                <Globe size={12} />
                {lang === "en" ? "中文" : "EN"}
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`p-2 transition-colors ${scrolled ? "text-forest-700" : "text-white"}`}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-forest-200/60 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className={`block w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      activeSection === link.href.slice(1)
                        ? "text-forest-700 bg-forest-50"
                        : "text-forest-600 hover:text-forest-800 hover:bg-forest-50/50"
                    }`}
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {lang === "en" ? link.en : link.cn}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
