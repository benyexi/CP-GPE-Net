/**
 * Site Detail Modal — CP-GPE Net
 * Displays detailed information about a monitoring site in a dialog.
 * Inspired by TreeNet's site detail pages.
 */
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MapPin, Mountain, TreePine, Thermometer, Wrench, Building2, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { monitoringSites, regionsCn, type MonitoringSite } from "@/lib/siteData";

interface SiteDetailModalProps {
  site: MonitoringSite | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate?: (site: MonitoringSite) => void;
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-forest-100 last:border-0">
      <div className="mt-0.5 text-forest-500 shrink-0">{icon}</div>
      <div className="min-w-0">
        <div className="text-xs font-semibold text-forest-400 uppercase tracking-wider mb-0.5" style={{ fontFamily: "var(--font-body)" }}>
          {label}
        </div>
        <div className="text-sm text-forest-800" style={{ fontFamily: "var(--font-body)" }}>
          {value}
        </div>
      </div>
    </div>
  );
}

export default function SiteDetailModal({ site, open, onOpenChange, onNavigate }: SiteDetailModalProps) {
  const { lang, t } = useLang();

  if (!site) return null;

  const currentIndex = monitoringSites.findIndex((s) => s.id === site.id);
  const prevSite = currentIndex > 0 ? monitoringSites[currentIndex - 1] : null;
  const nextSite = currentIndex < monitoringSites.length - 1 ? monitoringSites[currentIndex + 1] : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg sm:max-w-2xl max-h-[85vh] overflow-y-auto bg-white border-forest-200 p-0 z-[9999]">
        {/* Header with gradient */}
        <div className="relative bg-gradient-to-br from-forest-700 via-forest-600 to-forest-800 px-6 pt-6 pb-5 text-white">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-block px-2.5 py-0.5 text-[10px] font-semibold rounded-full bg-white/20 backdrop-blur-sm tracking-wider uppercase" style={{ fontFamily: "var(--font-body)" }}>
                {lang === "en" ? site.region : regionsCn[site.region] || site.region}
              </span>
              <span className="text-white/60 text-xs" style={{ fontFamily: "var(--font-mono)" }}>
                #{String(site.id).padStart(2, "0")}
              </span>
            </div>
            <DialogTitle className="text-xl sm:text-2xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
              {lang === "en" ? site.nameEn : site.nameCn}
            </DialogTitle>
            <p className="text-sm text-white/70 mt-1" style={{ fontFamily: "var(--font-body)" }}>
              {lang === "en" ? site.nameCn : site.nameEn}
            </p>
          </DialogHeader>

          {/* Navigation arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-1 pointer-events-none">
            {prevSite ? (
              <button
                onClick={(e) => { e.stopPropagation(); onNavigate?.(prevSite); }}
                className="pointer-events-auto w-8 h-8 flex items-center justify-center rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-sm transition-colors"
                title={lang === "en" ? prevSite.nameEn : prevSite.nameCn}
              >
                <ChevronLeft size={16} />
              </button>
            ) : <div />}
            {nextSite ? (
              <button
                onClick={(e) => { e.stopPropagation(); onNavigate?.(nextSite); }}
                className="pointer-events-auto w-8 h-8 flex items-center justify-center rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-sm transition-colors"
                title={lang === "en" ? nextSite.nameEn : nextSite.nameCn}
              >
                <ChevronRight size={16} />
              </button>
            ) : <div />}
          </div>
        </div>

        {/* Description */}
        {(site.descriptionEn || site.descriptionCn) && (
          <div className="px-6 pt-5 pb-2">
            <p className="text-sm leading-relaxed text-forest-700" style={{ fontFamily: "var(--font-body)" }}>
              {lang === "en" ? site.descriptionEn : site.descriptionCn}
            </p>
          </div>
        )}

        {/* Info Grid */}
        <div className="px-6 pb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
            {/* Left column */}
            <div>
              <InfoRow
                icon={<MapPin size={15} />}
                label={t("Coordinates", "坐标")}
                value={
                  <span style={{ fontFamily: "var(--font-mono)" }}>
                    {site.latitude.toFixed(4)}°N, {site.longitude.toFixed(4)}°E
                  </span>
                }
              />
              {site.elevationM !== undefined && (
                <InfoRow
                  icon={<Mountain size={15} />}
                  label={t("Elevation", "海拔")}
                  value={
                    <span style={{ fontFamily: "var(--font-mono)" }}>
                      {site.elevationM} m
                    </span>
                  }
                />
              )}
              {(site.speciesEn || site.speciesCn) && (
                <InfoRow
                  icon={<TreePine size={15} />}
                  label={t("Species", "树种")}
                  value={
                    <span className="italic">
                      {lang === "en" ? site.speciesEn : site.speciesCn}
                    </span>
                  }
                />
              )}
              {(site.climateEn || site.climateCn) && (
                <InfoRow
                  icon={<Thermometer size={15} />}
                  label={t("Climate", "气候类型")}
                  value={lang === "en" ? site.climateEn : site.climateCn}
                />
              )}
            </div>

            {/* Right column */}
            <div>
              {(site.instrumentsEn || site.instrumentsCn) && (
                <InfoRow
                  icon={<Wrench size={15} />}
                  label={t("Instruments", "监测设备")}
                  value={
                    <ul className="list-none space-y-1">
                      {(lang === "en" ? site.instrumentsEn : site.instrumentsCn)?.map((inst, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-forest-400 shrink-0" />
                          {inst}
                        </li>
                      ))}
                    </ul>
                  }
                />
              )}
              {(site.partnerEn || site.partnerCn) && (
                <InfoRow
                  icon={<Building2 size={15} />}
                  label={t("Partner Institution", "合作机构")}
                  value={lang === "en" ? site.partnerEn : site.partnerCn}
                />
              )}
              {site.established && (
                <InfoRow
                  icon={<Calendar size={15} />}
                  label={t("Established", "建站年份")}
                  value={
                    <span style={{ fontFamily: "var(--font-mono)" }}>
                      {site.established}
                    </span>
                  }
                />
              )}
            </div>
          </div>
        </div>

        {/* Footer navigation hint */}
        <div className="px-6 pb-4 flex items-center justify-between text-xs text-forest-400" style={{ fontFamily: "var(--font-body)" }}>
          <span>
            {t("Site", "站点")} {currentIndex + 1} / {monitoringSites.length}
          </span>
          <span className="hidden sm:inline">
            {t("Use ← → arrows to navigate between sites", "使用 ← → 箭头在站点间切换")}
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
