/**
 * Network Section — CP-GPE Net
 * CartoDB Voyager basemap, dark section bg,
 * golden pulsing markers, China-focused default view, Yellow River Basin overlay.
 * Default view: China center [35, 105] zoom 4. "All" shows all sites but stays China-focused.
 */
import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip, Polygon, useMap } from "react-leaflet";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MapPin, Filter, ExternalLink } from "lucide-react";
import { monitoringSites, regions, regionsCn, yellowRiverBasinCoords, type MonitoringSite } from "@/lib/siteData";
import { useLang } from "@/contexts/LanguageContext";
import SiteDetailModal from "./SiteDetailModal";
import "leaflet/dist/leaflet.css";

/**
 * MapController — handles view changes when region filter changes.
 * On initial load ("All"), stays at China center [35, 105] zoom 4.
 * When user selects a specific region, flies to fit those sites.
 */
function MapController({ activeRegion, sites }: { activeRegion: string; sites: MonitoringSite[] }) {
  const map = useMap();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip first render — MapContainer already sets center/zoom
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (sites.length === 0) return;

    if (activeRegion === "All") {
      // "All" — show China-centered view (most sites are in China)
      map.flyTo([35, 105], 4, { duration: 1.2 });
    } else if (activeRegion === "China") {
      map.flyTo([35, 105], 4, { duration: 1.2 });
    } else if (activeRegion === "International") {
      // Fit to show all international sites
      const bounds = sites.map((s) => [s.latitude, s.longitude] as [number, number]);
      map.flyToBounds(bounds, { padding: [80, 80], maxZoom: 5, duration: 1.2 });
    } else {
      // Sub-region — fit to those sites
      const bounds = sites.map((s) => [s.latitude, s.longitude] as [number, number]);
      if (bounds.length === 1) {
        map.flyTo(bounds[0], 8, { duration: 1.2 });
      } else {
        map.flyToBounds(bounds, { padding: [60, 60], maxZoom: 8, duration: 1.2 });
      }
    }
  }, [activeRegion, sites, map]);

  return null;
}

function PulsingMarker({ site, lang, onClick }: { site: MonitoringSite; lang: string; onClick: (site: MonitoringSite) => void }) {
  return (
    <>
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
      <CircleMarker
        center={[site.latitude, site.longitude]}
        radius={7}
        pathOptions={{
          color: "#f5a623",
          fillColor: "#e8920d",
          fillOpacity: 0.9,
          weight: 2,
          opacity: 0.9,
        }}
        eventHandlers={{ click: () => onClick(site) }}
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
    <section id="network" className="relative py-24 lg:py-32 overflow-hidden bg-forest-900">
      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 lg:mb-16"
        >
          <span className="text-forest-300 text-sm font-semibold tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-body)" }}>
            {t("Monitoring Network", "监测网络")}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
            {t("22 Sites Across China & Beyond", "覆盖中国及海外的22个站点")}
          </h2>
          <p className="mt-4 text-lg text-forest-300 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
            {t(
              "From the Yellow River Delta to the Taklamakan Desert edge, our network covers China's major plantation regions.",
              "从黄河三角洲到塔克拉玛干沙漠边缘，我们的网络覆盖中国主要人工林区域。"
            )}
          </p>
          <div className="mt-6 w-20 h-0.5 bg-amber-500/60 mx-auto" />
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
                  ? "bg-amber-500 text-forest-900 shadow-[0_0_12px_rgba(245,166,35,0.3)]"
                  : "bg-forest-800/60 text-forest-300 border border-forest-600/30 hover:border-amber-500/40 hover:text-white"
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
          className="relative rounded-2xl overflow-hidden border border-forest-600/30 shadow-2xl"
        >
          <div className="h-[450px] sm:h-[500px] lg:h-[600px]">
            <MapContainer
              center={[35, 105]}
              zoom={4}
              className="h-full w-full"
              zoomControl={true}
              scrollWheelZoom={true}
            >
              {/* CartoDB Voyager — professional, balanced, detail-rich */}
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
              />
              <MapController activeRegion={activeRegion} sites={filteredSites} />

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
          <div className="absolute top-4 right-4 z-[1000] bg-white/90 backdrop-blur-sm border border-forest-200 rounded-lg px-4 py-2 shadow-lg">
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-amber-500" />
              <span className="text-sm text-forest-800 font-medium" style={{ fontFamily: "var(--font-mono)" }}>
                {filteredSites.length} {t("sites", "站点")}
              </span>
            </div>
          </div>

          {/* Yellow River legend */}
          {showYellowRiver && (
            <div className="absolute bottom-4 left-4 z-[1000] bg-white/90 backdrop-blur-sm border border-forest-200 rounded-lg px-3 py-2 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-4 h-3 rounded-sm border border-amber-500/60" style={{ background: "rgba(218, 165, 32, 0.25)" }} />
                <span className="text-xs text-forest-700" style={{ fontFamily: "var(--font-body)" }}>
                  {t("Yellow River Basin", "黄河流域")}
                </span>
              </div>
            </div>
          )}

          {/* Click hint */}
          <div className="absolute bottom-4 right-4 z-[1000] bg-white/90 backdrop-blur-sm border border-forest-200 rounded-lg px-3 py-2 shadow-lg">
            <span className="text-xs text-forest-500" style={{ fontFamily: "var(--font-body)" }}>
              {t("Click a marker for site details", "点击标记查看站点详情")}
            </span>
          </div>
        </motion.div>

        {/* Site Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 overflow-x-auto bg-forest-800/40 rounded-xl border border-forest-600/30 shadow-sm"
        >
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-forest-600/30">
                <th className="text-left py-4 px-4 text-xs font-semibold text-forest-400 tracking-wide uppercase" style={{ fontFamily: "var(--font-body)" }}>#</th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-forest-400 tracking-wide uppercase" style={{ fontFamily: "var(--font-body)" }}>{t("Site", "站点")}</th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-forest-400 tracking-wide uppercase hidden sm:table-cell" style={{ fontFamily: "var(--font-body)" }}>{t("Species", "树种")}</th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-forest-400 tracking-wide uppercase hidden md:table-cell" style={{ fontFamily: "var(--font-body)" }}>{t("Elevation", "海拔")}</th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-forest-400 tracking-wide uppercase hidden lg:table-cell" style={{ fontFamily: "var(--font-body)" }}>{t("Established", "建站")}</th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-forest-400 tracking-wide uppercase" style={{ fontFamily: "var(--font-body)" }}>{t("Region", "区域")}</th>
                <th className="text-center py-4 px-4 text-xs font-semibold text-forest-400 tracking-wide uppercase" style={{ fontFamily: "var(--font-body)" }}>{t("Details", "详情")}</th>
              </tr>
            </thead>
            <tbody>
              {filteredSites.map((site, i) => (
                <tr
                  key={site.id}
                  className={`border-b border-forest-700/20 hover:bg-forest-700/30 transition-colors cursor-pointer ${i % 2 === 0 ? "bg-forest-800/20" : ""}`}
                  onClick={() => handleSiteClick(site)}
                >
                  <td className="py-3 px-4 text-sm text-forest-500" style={{ fontFamily: "var(--font-mono)" }}>{String(i + 1).padStart(2, "0")}</td>
                  <td className="py-3 px-4">
                    <div className="text-sm font-semibold text-white" style={{ fontFamily: "var(--font-body)" }}>{lang === "en" ? site.nameEn : site.nameCn}</div>
                    <div className="text-xs text-forest-400 mt-0.5" style={{ fontFamily: "var(--font-body)" }}>{lang === "en" ? site.nameCn : site.nameEn}</div>
                  </td>
                  <td className="py-3 px-4 text-sm text-forest-300 italic hidden sm:table-cell" style={{ fontFamily: "var(--font-body)" }}>{lang === "en" ? (site.speciesEn || "—") : (site.speciesCn || "—")}</td>
                  <td className="py-3 px-4 text-sm text-forest-400 hidden md:table-cell" style={{ fontFamily: "var(--font-mono)" }}>{site.elevationM !== undefined ? `${site.elevationM} m` : "—"}</td>
                  <td className="py-3 px-4 text-sm text-forest-400 hidden lg:table-cell" style={{ fontFamily: "var(--font-mono)" }}>{site.established || "—"}</td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-forest-700/40 text-forest-300 border border-forest-600/30" style={{ fontFamily: "var(--font-body)" }}>
                      {lang === "en" ? site.region : regionsCn[site.region] || site.region}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-forest-600/40 transition-colors text-forest-400 hover:text-amber-400"
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
