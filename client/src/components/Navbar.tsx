/**
 * Navbar Component — Dark Canopy Theme
 * Fixed top navigation with glass-morphism effect.
 * Smooth scroll to sections on click.
 */
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Network", href: "#network" },
  { label: "Research", href: "#research" },
  { label: "Data", href: "#data" },
  { label: "News", href: "#news" },
  { label: "Join Us", href: "#join" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect active section
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
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0d1f17]/90 backdrop-blur-xl border-b border-[#2d5a3f]/30 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button
            onClick={() => scrollTo("#home")}
            className="flex items-center gap-3 group"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#c8963e] to-[#8a6a2e] flex items-center justify-center shadow-lg shadow-[#c8963e]/20 group-hover:shadow-[#c8963e]/40 transition-shadow">
              <span className="text-[#0d1f17] font-bold text-sm font-[family-name:var(--font-body)]">CP</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-[#e8e4dd] font-semibold text-sm tracking-wide font-[family-name:var(--font-body)]">
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
                    ? "text-[#c8963e]"
                    : "text-[#a8b4ac] hover:text-[#e8e4dd]"
                }`}
              >
                {link.label}
                {activeSection === link.href.slice(1) && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#c8963e] rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-[#a8b4ac] hover:text-[#e8e4dd] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0d1f17]/95 backdrop-blur-xl border-b border-[#2d5a3f]/30 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`block w-full text-left px-4 py-3 text-sm font-[family-name:var(--font-body)] font-medium rounded-lg transition-colors ${
                    activeSection === link.href.slice(1)
                      ? "text-[#c8963e] bg-[#c8963e]/10"
                      : "text-[#a8b4ac] hover:text-[#e8e4dd] hover:bg-[#1a3a2a]/50"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
