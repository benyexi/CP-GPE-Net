/**
 * Network Section — Fresh Forest Theme
 * Interactive Leaflet map with China filter, Yellow River Basin overlay,
 * and filterable site table. Bilingual support.
 */
import { useState, useMemo, useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, Polygon, useMap } from "react-leaflet";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MapPin, Filter } from "lucide-react";
import { monitoringSites, regions, regionsCn, yellowRiverBasinCoords, type MonitoringSite } from "@/lib/siteData";
import { useLang } from "@/contexts/LanguageContext";
import "leaflet/dist/leaflet.css";

function FitBounds({ sites, showChina }: { sites: MonitoringSite[]; showChina: boolean }) {
  const map = useMap();
  useEffect(() => {
    if (sites.length > 0) {
      if (showChina) {
        // Zoom to China region
        map.fitBounds([[18, 73], [54, 135]], { padding: [30, 30], maxZoom: 5 });
      } else {
        const bounds = sites.map((s) => [s.latitude, s.longitude] as [number, number]);
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 5 });
      }
    }
  }, [sites, showChina, map]);
  return null;
}

function SiteMarker({ site, lang }: { site: MonitoringSite; lang: string }) {
  return (
    <CircleMarker
      center={[site.latitude, site.longitude]}
      radius={8}
      pathOptions={{
        color: "#2d7a4a",
        fillColor: "#3d9a5a",
        fillOpacity: 0.75,
        weight: 2,
        opacity: 0.9,
      }}
    >
      <Popup>
        <div className="min-w-[200px]">
          <h4 className="text-base font-bold text-forest-800 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
            {lang === "en" ? site.nameEn : site.nameCn}
          </h4>
          <p className="text-sm text-forest-600 mb-2" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
            {lang === "en" ? site.nameCn : site.nameEn}
          </p>
          <div className="flex gap-4 text-xs text-forest-500" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            <span>Lon: {site.longitude.toFixed(2)}</span>
            <span>Lat: {site.latitude.toFixed(2)}</span>
          </div>
          <div className="mt-2 text-xs text-forest-400" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
            {lang === "en" ? site.region : regionsCn[site.region] || site.region}
          </div>
        </div>
      </Popup>
    </CircleMarker>
  );
}

export default function NetworkSection() {
  const { lang, t } = useLang();
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  const [activeRegion, setActiveRegion] = useState("All");

  const isChina = activeRegion === "China";
  const isChinaSubRegion = ["North China", "Northeast", "Northwest", "Central China", "East China"].includes(activeRegion);
  const showYellowRiver = isChina || isChinaSubRegion;

  const filteredSites = useMemo(() => {
    if (activeRegion === "All") return monitoringSites;
    if (activeRegion === "China") return monitoringSites.filter((s) => s.region !== "International");
    return monitoringSites.filter((s) => s.region === activeRegion);
  }, [activeRegion]);

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
          <span className="text-forest-600 text-sm font-[family-name:var(--font-body)] font-semibold tracking-[0.2em] uppercase">
            {t("Monitoring Network", "监测网络")}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-900">
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
              className={`px-4 py-2 rounded-full text-sm font-[family-name:var(--font-body)] font-medium transition-all duration-300 ${
                activeRegion === region
                  ? "bg-forest-600 text-white shadow-md"
                  : "bg-white text-forest-600 border border-forest-200 hover:border-forest-400 hover:text-forest-800"
              }`}
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
          className="relative rounded-2xl overflow-hidden border border-forest-200 shadow-xl bg-white"
        >
          <div className="h-[450px] sm:h-[500px] lg:h-[600px]">
            <MapContainer
              center={[36, 105]}
              zoom={4}
              className="h-full w-full"
              zoomControl={true}
              scrollWheelZoom={true}
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
              />
              <FitBounds sites={filteredSites} showChina={isChina || isChinaSubRegion} />

              {/* Yellow River Basin overlay */}
              {showYellowRiver && (
                <Polygon
                  positions={yellowRiverBasinCoords}
                  pathOptions={{
                    color: "#b8860b",
                    fillColor: "#daa520",
                    fillOpacity: 0.12,
                    weight: 2,
                    dashArray: "6 4",
                    opacity: 0.6,
                  }}
                />
              )}

              {filteredSites.map((site) => (
                <SiteMarker key={site.id} site={site} lang={lang} />
              ))}
            </MapContainer>
          </div>

          {/* Map overlay info */}
          <div className="absolute top-4 right-4 z-[1000] bg-white/90 backdrop-blur-sm border border-forest-200 rounded-lg px-4 py-2 shadow-sm">
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-forest-600" />
              <span className="text-sm text-forest-800 font-[family-name:var(--font-mono)]">
                {filteredSites.length} {t("sites", "站点")}
              </span>
            </div>
          </div>

          {/* Yellow River legend */}
          {showYellowRiver && (
            <div className="absolute bottom-4 left-4 z-[1000] bg-white/90 backdrop-blur-sm border border-forest-200 rounded-lg px-3 py-2 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-3 rounded-sm border border-amber-600/60" style={{ background: "rgba(218, 165, 32, 0.2)" }} />
                <span className="text-xs text-forest-700 font-[family-name:var(--font-body)]">
                  {t("Yellow River Basin", "黄河流域")}
                </span>
              </div>
            </div>
          )}
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
                <th className="text-left py-4 px-4 text-sm font-[family-name:var(--font-body)] font-semibold text-forest-700 tracking-wide uppercase">
                  #
                </th>
                <th className="text-left py-4 px-4 text-sm font-[family-name:var(--font-body)] font-semibold text-forest-700 tracking-wide uppercase">
                  {t("Site (Chinese)", "站点（中文）")}
                </th>
                <th className="text-left py-4 px-4 text-sm font-[family-name:var(--font-body)] font-semibold text-forest-700 tracking-wide uppercase">
                  {t("Site (English)", "站点（英文）")}
                </th>
                <th className="text-left py-4 px-4 text-sm font-[family-name:var(--font-body)] font-semibold text-forest-700 tracking-wide uppercase">
                  {t("Longitude", "经度")}
                </th>
                <th className="text-left py-4 px-4 text-sm font-[family-name:var(--font-body)] font-semibold text-forest-700 tracking-wide uppercase">
                  {t("Latitude", "纬度")}
                </th>
                <th className="text-left py-4 px-4 text-sm font-[family-name:var(--font-body)] font-semibold text-forest-700 tracking-wide uppercase">
                  {t("Region", "区域")}
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredSites.map((site, i) => (
                <tr
                  key={site.id}
                  className="border-b border-forest-50 hover:bg-forest-50/50 transition-colors"
                >
                  <td className="py-3 px-4 text-sm font-[family-name:var(--font-mono)] text-forest-400">
                    {String(i + 1).padStart(2, "0")}
                  </td>
                  <td className="py-3 px-4 text-sm font-[family-name:var(--font-body)] text-forest-800">
                    {site.nameCn}
                  </td>
                  <td className="py-3 px-4 text-sm font-[family-name:var(--font-body)] text-forest-600">
                    {site.nameEn}
                  </td>
                  <td className="py-3 px-4 text-sm font-[family-name:var(--font-mono)] text-forest-500">
                    {site.longitude.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-sm font-[family-name:var(--font-mono)] text-forest-500">
                    {site.latitude.toFixed(2)}
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-3 py-1 text-xs font-[family-name:var(--font-body)] font-medium rounded-full bg-forest-50 text-forest-600 border border-forest-200">
                      {lang === "en" ? site.region : regionsCn[site.region] || site.region}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
