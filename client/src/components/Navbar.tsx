/**
 * Navbar — Fresh Forest Theme
 * Clean top navigation with glass effect, smooth scroll, and EN/CN toggle.
 */
import { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";

const navLinks = [
  { en: "Home", cn: "首页", href: "#home" },
  { en: "About", cn: "关于", href: "#about" },
  { en: "Network", cn: "监测网络", href: "#network" },
  { en: "Research", cn: "研究", href: "#research" },
  { en: "Data", cn: "数据", href: "#data" },
  { en: "News", cn: "动态", href: "#news" },
  { en: "Join Us", cn: "合作", href: "#join" },
];

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

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

  const scrollTo = (href: string) => {
    const el = document.getElementById(href.slice(1));
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
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
              <span className="text-white font-bold text-sm font-[family-name:var(--font-body)]">CP</span>
            </div>
            <div className="hidden sm:block">
              <span className={`font-semibold text-sm tracking-wide font-[family-name:var(--font-body)] transition-colors ${
                scrolled ? "text-forest-900" : "text-white"
              }`}>
                CP-GPE Net
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`relative px-4 py-2 text-sm font-[family-name:var(--font-body)] font-medium transition-colors duration-300 rounded-md ${
                  activeSection === link.href.slice(1)
                    ? scrolled ? "text-forest-700" : "text-white"
                    : scrolled ? "text-forest-600/70 hover:text-forest-800" : "text-white/70 hover:text-white"
                }`}
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

            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === "en" ? "cn" : "en")}
              className={`ml-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-[family-name:var(--font-body)] font-semibold border transition-all duration-300 ${
                scrolled
                  ? "border-forest-300 text-forest-700 hover:bg-forest-50"
                  : "border-white/30 text-white hover:bg-white/10"
              }`}
            >
              <Globe size={13} />
              {lang === "en" ? "中文" : "EN"}
            </button>
          </div>

          {/* Mobile toggle + lang */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setLang(lang === "en" ? "cn" : "en")}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-[family-name:var(--font-body)] font-semibold border transition-all ${
                scrolled
                  ? "border-forest-300 text-forest-700"
                  : "border-white/30 text-white"
              }`}
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
                  className={`block w-full text-left px-4 py-3 text-sm font-[family-name:var(--font-body)] font-medium rounded-lg transition-colors ${
                    activeSection === link.href.slice(1)
                      ? "text-forest-700 bg-forest-50"
                      : "text-forest-600 hover:text-forest-800 hover:bg-forest-50/50"
                  }`}
                >
                  {lang === "en" ? link.en : link.cn}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
