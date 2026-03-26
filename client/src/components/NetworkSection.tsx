/**
 * Network Section — CP-GPE Net
 * Dark basemap (CartoDB Dark Matter), pulsing amber markers,
 * China-focused default view, Yellow River Basin overlay, site detail modal.
 */
import { useState, useMemo, useEffect, useCallback } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip, Polygon, useMap } from "react-leaflet";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MapPin, Filter, ExternalLink } from "lucide-react";
import { monitoringSites, regions, regionsCn, yellowRiverBasinCoords, type MonitoringSite } from "@/lib/siteData";
import { useLang } from "@/contexts/LanguageContext";
import SiteDetailModal from "./SiteDetailModal";
import "leaflet/dist/leaflet.css";

function FitBounds({ sites, showChina }: { sites: MonitoringSite[]; showChina: boolean }) {
  const map = useMap();
  useEffect(() => {
    if (sites.length > 0) {
      if (showChina) {
        map.flyTo([35, 105], 4, { duration: 1.2 });
      } else {
        const bounds = sites.map((s) => [s.latitude, s.longitude] as [number, number]);
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 5 });
      }
    }
  }, [sites, showChina, map]);
  return null;
}

/* Pulsing marker with CSS animation */
function PulsingMarker({ site, lang, onClick }: { site: MonitoringSite; lang: string; onClick: (site: MonitoringSite) => void }) {
  return (
    <>
      {/* Outer pulse ring */}
      <CircleMarker
        center={[site.latitude, site.longitude]}
        radius={14}
        pathOptions={{
          color: "transparent",
          fillColor: "#e8920d",
          fillOpacity: 0.2,
          weight: 0,
          className: "pulse-ring",
        }}
      />
      {/* Inner solid marker */}
      <CircleMarker
        center={[site.latitude, site.longitude]}
        radius={6}
        pathOptions={{
          color: "#f5a623",
          fillColor: "#e8920d",
          fillOpacity: 0.9,
          weight: 2,
          opacity: 0.9,
        }}
        eventHandlers={{
          click: () => onClick(site),
        }}
      >
        <Tooltip direction="top" offset={[0, -12]} opacity={0.95}>
          <div className="text-center px-1">
            <div className="font-semibold text-sm text-forest-800" style={{ fontFamily: "'Playfair Display', serif" }}>
              {lang === "en" ? site.nameEn : site.nameCn}
            </div>
            <div className="text-xs text-forest-500 mt-0.5" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              {lang === "en" ? "Click for details" : "点击查看详情"}
            </div>
          </div>
        </Tooltip>
      </CircleMarker>
    </>
  );
}

export default function NetworkSection() {
  const { lang, t } = useLang();
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  const [activeRegion, setActiveRegion] = useState("All");
  const [selectedSite, setSelectedSite] = useState<MonitoringSite | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const isChina = activeRegion === "China";
  const isChinaSubRegion = ["North China", "Northeast", "Northwest", "Central China", "East China"].includes(activeRegion);
  const showYellowRiver = isChina || isChinaSubRegion;

  const filteredSites = useMemo(() => {
    if (activeRegion === "All") return monitoringSites;
    if (activeRegion === "China") return monitoringSites.filter((s) => s.region !== "International");
    return monitoringSites.filter((s) => s.region === activeRegion);
  }, [activeRegion]);

  const handleSiteClick = useCallback((site: MonitoringSite) => {
    setSelectedSite(site);
    setModalOpen(true);
  }, []);

  const handleNavigate = useCallback((site: MonitoringSite) => {
    setSelectedSite(site);
  }, []);

  return (
    <section id="network" className="relative py-24 lg:py-32 overflow-hidden bg-cream">
      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 lg:mb-16"
        >
          <span className="text-forest-600 text-sm font-semibold tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-body)" }}>
            {t("Monitoring Network", "监测网络")}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-900" style={{ fontFamily: "var(--font-display)" }}>
            {t("22 Sites Across China & Beyond", "覆盖中国及海外的22个站点")}
          </h2>
          <div className="mt-6 section-divider max-w-xs mx-auto" />
        </motion.div>

        {/* Region Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          <Filter size={16} className="text-forest-400 mt-2 mr-1" />
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => setActiveRegion(region)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeRegion === region
                  ? "bg-forest-600 text-white shadow-md"
                  : "bg-white text-forest-600 border border-forest-200 hover:border-forest-400 hover:text-forest-800"
              }`}
              style={{ fontFamily: "var(--font-body)" }}
            >
              {lang === "en" ? region : regionsCn[region] || region}
            </button>
          ))}
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative rounded-2xl overflow-hidden border border-forest-700/30 shadow-2xl"
        >
          <div className="h-[450px] sm:h-[500px] lg:h-[600px]">
            <MapContainer
              center={[35, 105]}
              zoom={4}
              className="h-full w-full"
              zoomControl={true}
              scrollWheelZoom={true}
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
              />
              <FitBounds sites={filteredSites} showChina={isChina || isChinaSubRegion} />

              {/* Yellow River Basin overlay */}
              {showYellowRiver && (
                <Polygon
                  positions={yellowRiverBasinCoords}
                  pathOptions={{
                    color: "#daa520",
                    fillColor: "#daa520",
                    fillOpacity: 0.10,
                    weight: 2,
                    dashArray: "8 5",
                    opacity: 0.7,
                  }}
                />
              )}

              {filteredSites.map((site) => (
                <PulsingMarker key={site.id} site={site} lang={lang} onClick={handleSiteClick} />
              ))}
            </MapContainer>
          </div>

          {/* Map overlay info */}
          <div className="absolute top-4 right-4 z-[1000] bg-forest-900/80 backdrop-blur-sm border border-forest-600/30 rounded-lg px-4 py-2 shadow-lg">
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-amber-400" />
              <span className="text-sm text-white" style={{ fontFamily: "var(--font-mono)" }}>
                {filteredSites.length} {t("sites", "站点")}
              </span>
            </div>
          </div>

          {/* Yellow River legend */}
          {showYellowRiver && (
            <div className="absolute bottom-4 left-4 z-[1000] bg-forest-900/80 backdrop-blur-sm border border-forest-600/30 rounded-lg px-3 py-2 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-4 h-3 rounded-sm border border-amber-500/60" style={{ background: "rgba(218, 165, 32, 0.25)" }} />
                <span className="text-xs text-white/80" style={{ fontFamily: "var(--font-body)" }}>
                  {t("Yellow River Basin", "黄河流域")}
                </span>
              </div>
            </div>
          )}

          {/* Click hint */}
          <div className="absolute bottom-4 right-4 z-[1000] bg-forest-900/80 backdrop-blur-sm border border-forest-600/30 rounded-lg px-3 py-2 shadow-lg">
            <span className="text-xs text-white/60" style={{ fontFamily: "var(--font-body)" }}>
              {t("Click a marker for site details", "点击标记查看站点详情")}
            </span>
          </div>
        </motion.div>

        {/* Site Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 overflow-x-auto bg-white rounded-xl border border-forest-200 shadow-sm"
        >
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-forest-100 bg-forest-50/50">
                <th className="text-left py-4 px-4 text-sm font-semibold text-forest-700 tracking-wide uppercase" style={{ fontFamily: "var(--font-body)" }}>#</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-forest-700 tracking-wide uppercase" style={{ fontFamily: "var(--font-body)" }}>{t("Site", "站点")}</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-forest-700 tracking-wide uppercase hidden sm:table-cell" style={{ fontFamily: "var(--font-body)" }}>{t("Species", "树种")}</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-forest-700 tracking-wide uppercase hidden md:table-cell" style={{ fontFamily: "var(--font-body)" }}>{t("Elevation", "海拔")}</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-forest-700 tracking-wide uppercase hidden lg:table-cell" style={{ fontFamily: "var(--font-body)" }}>{t("Established", "建站")}</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-forest-700 tracking-wide uppercase" style={{ fontFamily: "var(--font-body)" }}>{t("Region", "区域")}</th>
                <th className="text-center py-4 px-4 text-sm font-semibold text-forest-700 tracking-wide uppercase" style={{ fontFamily: "var(--font-body)" }}>{t("Details", "详情")}</th>
              </tr>
            </thead>
            <tbody>
              {filteredSites.map((site, i) => (
                <tr
                  key={site.id}
                  className="border-b border-forest-50 hover:bg-forest-50/50 transition-colors cursor-pointer"
                  onClick={() => handleSiteClick(site)}
                >
                  <td className="py-3 px-4 text-sm text-forest-400" style={{ fontFamily: "var(--font-mono)" }}>{String(i + 1).padStart(2, "0")}</td>
                  <td className="py-3 px-4">
                    <div className="text-sm font-semibold text-forest-800" style={{ fontFamily: "var(--font-body)" }}>{lang === "en" ? site.nameEn : site.nameCn}</div>
                    <div className="text-xs text-forest-400 mt-0.5" style={{ fontFamily: "var(--font-body)" }}>{lang === "en" ? site.nameCn : site.nameEn}</div>
                  </td>
                  <td className="py-3 px-4 text-sm text-forest-600 italic hidden sm:table-cell" style={{ fontFamily: "var(--font-body)" }}>{lang === "en" ? (site.speciesEn || "—") : (site.speciesCn || "—")}</td>
                  <td className="py-3 px-4 text-sm text-forest-500 hidden md:table-cell" style={{ fontFamily: "var(--font-mono)" }}>{site.elevationM !== undefined ? `${site.elevationM} m` : "—"}</td>
                  <td className="py-3 px-4 text-sm text-forest-500 hidden lg:table-cell" style={{ fontFamily: "var(--font-mono)" }}>{site.established || "—"}</td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-forest-50 text-forest-600 border border-forest-200" style={{ fontFamily: "var(--font-body)" }}>
                      {lang === "en" ? site.region : regionsCn[site.region] || site.region}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-forest-100 transition-colors text-forest-500 hover:text-forest-700"
                      onClick={(e) => { e.stopPropagation(); handleSiteClick(site); }}
                    >
                      <ExternalLink size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>

      {/* Site Detail Modal */}
      <SiteDetailModal
        site={selectedSite}
        open={modalOpen}
        onOpenChange={setModalOpen}
        onNavigate={handleNavigate}
      />
    </section>
  );
}
