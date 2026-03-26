/**
 * Footer — Dark Canopy Theme
 * Logo, tagline, quick links, affiliations, copyright.
 */
import { TreePine } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Network", href: "#network" },
  { label: "Research", href: "#research" },
  { label: "Data", href: "#data" },
  { label: "News", href: "#news" },
  { label: "Join Us", href: "#join" },
];

const affiliations = [
  "Beijing Forestry University",
  "National Key R&D Program",
  "Three-North Shelterbelt Program",
];

export default function Footer() {
  const scrollTo = (href: string) => {
    const el = document.getElementById(href.slice(1));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#0a1a12] border-t border-[#2d5a3f]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Logo & Tagline */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c8963e] to-[#8a6a2e] flex items-center justify-center shadow-lg shadow-[#c8963e]/20">
                <TreePine size={20} className="text-[#0d1f17]" />
              </div>
              <div>
                <span className="text-[#e8e4dd] font-bold text-lg font-[family-name:var(--font-display)]">
                  CP-GPE Net
                </span>
              </div>
            </div>
            <p className="text-sm text-[#8a9a8f] font-[family-name:var(--font-body)] leading-relaxed max-w-xs">
              Monitoring Plantation Water, Growth, and Ecology Across China and Beyond
            </p>
            <p className="mt-4 text-xs text-[#5a6a5f] font-[family-name:var(--font-body)]">
              Plantation Water Relations Lab (PWRlab)<br />
              Beijing Forestry University
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm text-[#c8963e] font-[family-name:var(--font-body)] font-semibold tracking-[0.15em] uppercase mb-6">
              Quick Links
            </h4>
            <nav className="grid grid-cols-2 gap-2">
              {quickLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-left text-sm text-[#a8b4ac] font-[family-name:var(--font-body)] hover:text-[#c8963e] transition-colors py-1"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Affiliations */}
          <div>
            <h4 className="text-sm text-[#c8963e] font-[family-name:var(--font-body)] font-semibold tracking-[0.15em] uppercase mb-6">
              Affiliations
            </h4>
            <div className="space-y-3">
              {affiliations.map((a, i) => (
                <p key={i} className="text-sm text-[#a8b4ac] font-[family-name:var(--font-body)]">
                  {a}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[#2d5a3f]/20">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-[#5a6a5f] font-[family-name:var(--font-body)]">
              &copy; {new Date().getFullYear()} CP-GPE Net | PWRlab, Beijing Forestry University. All rights reserved.
            </p>
            <p className="text-xs text-[#5a6a5f] font-[family-name:var(--font-body)]">
              Built for advancing plantation science worldwide.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
