/**
 * Network Section — CP-GPE Net
 * Esri World Topo Map basemap, dark section bg,
 * red pulsing markers with POPUP (not tooltip) showing site details.
 * Default view: China center [35, 105] zoom 4.
 */
import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MapPin, Filter, ExternalLink, TreePine, Mountain, Calendar, Wrench } from "lucide-react";
import { monitoringSites, regions, regionsCn, type MonitoringSite } from "@/lib/siteData";
import { useLang } from "@/contexts/LanguageContext";
import SiteDetailModal from "./SiteDetailModal";
import "leaflet/dist/leaflet.css";

function MapController({ activeRegion, sites }: { activeRegion: string; sites: MonitoringSite[] }) {
  const map = useMap();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (sites.length === 0) return;

    if (activeRegion === "All" || activeRegion === "China") {
      map.flyTo([35, 105], 4, { duration: 1.2 });
    } else if (activeRegion === "International") {
      const bounds = sites.map((s) => [s.latitude, s.longitude] as [number, number]);
      map.flyToBounds(bounds, { padding: [80, 80], maxZoom: 5, duration: 1.2 });
    } else {
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

function PulsingMarker({ site, lang, onDetailClick }: { site: MonitoringSite; lang: string; onDetailClick: (site: MonitoringSite) => void }) {
  return (
    <>
      <CircleMarker
        center={[site.latitude, site.longitude]}
        radius={18}
        pathOptions={{
          color: "transparent",
          fillColor: "#d4380d",
          fillOpacity: 0.15,
          weight: 0,
          className: "pulse-ring",
        }}
      />
      <CircleMarker
        center={[site.latitude, site.longitude]}
        radius={8}
        pathOptions={{
          color: "#ffffff",
          fillColor: "#d4380d",
          fillOpacity: 0.95,
          weight: 2.5,
          opacity: 1,
        }}
      >
        <Popup maxWidth={320} minWidth={240} className="site-popup">
          <div className="p-1">
            {/* Site Name */}
            <h3 className="text-base font-bold text-forest-900 mb-0.5" style={{ fontFamily: "'Playfair Display', serif" }}>
              {lang === "en" ? site.nameEn : site.nameCn}
            </h3>
            <p className="text-xs text-forest-500 mb-3" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              {lang === "en" ? site.nameCn : site.nameEn}
            </p>

            {/* Info Grid */}
            <div className="space-y-2">
              {/* Species */}
              <div className="flex items-center gap-2">
                <TreePine size={13} className="text-forest-500 flex-shrink-0" />
                <span className="text-xs text-forest-700 italic" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                  {lang === "en" ? site.speciesEn : site.speciesCn}
                </span>
              </div>

              {/* Elevation */}
              {site.elevationM !== undefined && (
                <div className="flex items-center gap-2">
                  <Mountain size={13} className="text-forest-500 flex-shrink-0" />
                  <span className="text-xs text-forest-700" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {site.elevationM} m a.s.l.
                  </span>
                </div>
              )}

              {/* Established */}
              {site.established && (
                <div className="flex items-center gap-2">
                  <Calendar size={13} className="text-forest-500 flex-shrink-0" />
                  <span className="text-xs text-forest-700" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                    {lang === "en" ? `Est. ${site.established}` : `${site.established}年建站`}
                  </span>
                </div>
              )}

              {/* Instruments */}
              {(site.instrumentsEn || site.instrumentsCn) && (
                <div className="flex items-start gap-2">
                  <Wrench size={13} className="text-forest-500 flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-forest-700 leading-relaxed" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                    {(lang === "en" ? site.instrumentsEn : site.instrumentsCn)?.join(" · ")}
                  </div>
                </div>
              )}
            </div>

            {/* View Details Button */}
            <button
              onClick={(e) => { e.stopPropagation(); onDetailClick(site); }}
              className="mt-3 w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-forest-700 text-white text-xs font-medium hover:bg-forest-800 transition-colors"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              <ExternalLink size={12} />
              {lang === "en" ? "Full Details" : "查看完整详情"}
            </button>
          </div>
        </Popup>
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


  const filteredSites = useMemo(() => {
    if (activeRegion === "All") return monitoringSites;
    if (activeRegion === "China") return monitoringSites.filter((s) => s.region !== "International");
    return monitoringSites.filter((s) => s.region === activeRegion);
  }, [activeRegion]);

  const handleDetailClick = useCallback((site: MonitoringSite) => {
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
          <div className="h-[550px] sm:h-[650px] lg:h-[80vh] min-h-[600px]">
            <MapContainer
              center={[35, 105]}
              zoom={4}
              className="h-full w-full"
              zoomControl={true}
              scrollWheelZoom={true}
            >
              <TileLayer
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
                attribution='&copy; Esri, HERE, Garmin, OpenStreetMap contributors'
              />
              <MapController activeRegion={activeRegion} sites={filteredSites} />

              {filteredSites.map((site) => (
                <PulsingMarker key={site.id} site={site} lang={lang} onDetailClick={handleDetailClick} />
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

          {/* Click hint */}
          <div className="absolute bottom-4 right-4 z-[1000] bg-white/90 backdrop-blur-sm border border-forest-200 rounded-lg px-3 py-2 shadow-lg">
            <span className="text-xs text-forest-500" style={{ fontFamily: "var(--font-body)" }}>
              {t("Click a marker for site info", "点击标记查看站点信息")}
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
                  onClick={() => handleDetailClick(site)}
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
                      onClick={(e) => { e.stopPropagation(); handleDetailClick(site); }}
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
