/**
 * Network Section — Dark Canopy Theme
 * Interactive dark-themed Leaflet map with all 22 monitoring sites.
 * Pulsing markers + popup info + filterable site table.
 */
import { useState, useMemo } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MapPin, Filter } from "lucide-react";
import { monitoringSites, regions, type MonitoringSite } from "@/lib/siteData";
import "leaflet/dist/leaflet.css";

function FitBounds({ sites }: { sites: MonitoringSite[] }) {
  const map = useMap();
  useMemo(() => {
    if (sites.length > 0) {
      const bounds = sites.map((s) => [s.latitude, s.longitude] as [number, number]);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 5 });
    }
  }, [sites, map]);
  return null;
}

function SiteMarker({ site }: { site: MonitoringSite }) {
  return (
    <CircleMarker
      center={[site.latitude, site.longitude]}
      radius={8}
      pathOptions={{
        color: "#c8963e",
        fillColor: "#c8963e",
        fillOpacity: 0.7,
        weight: 2,
        opacity: 0.9,
      }}
    >
      <Popup>
        <div className="min-w-[200px]">
          <h4 className="text-base font-bold text-[#c8963e] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
            {site.nameEn}
          </h4>
          <p className="text-sm text-[#e8e4dd] mb-2" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
            {site.nameCn}
          </p>
          <div className="flex gap-4 text-xs text-[#a8b4ac]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            <span>Lon: {site.longitude.toFixed(2)}</span>
            <span>Lat: {site.latitude.toFixed(2)}</span>
          </div>
          <div className="mt-2 text-xs text-[#8a9a8f]" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
            Region: {site.region}
          </div>
        </div>
      </Popup>
    </CircleMarker>
  );
}

export default function NetworkSection() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  const [activeRegion, setActiveRegion] = useState("All");

  const filteredSites = useMemo(
    () => activeRegion === "All" ? monitoringSites : monitoringSites.filter((s) => s.region === activeRegion),
    [activeRegion]
  );

  return (
    <section id="network" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1f17] via-[#0a1a12] to-[#0d1f17]" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 lg:mb-16"
        >
          <span className="text-[#c8963e] text-sm font-[family-name:var(--font-body)] font-semibold tracking-[0.2em] uppercase">
            Monitoring Network
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#e8e4dd]">
            22 Sites Across China & Beyond
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
          <Filter size={16} className="text-[#8a9a8f] mt-2 mr-1" />
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => setActiveRegion(region)}
              className={`px-4 py-2 rounded-full text-sm font-[family-name:var(--font-body)] font-medium transition-all duration-300 ${
                activeRegion === region
                  ? "bg-[#c8963e] text-[#0d1f17]"
                  : "bg-[#1a3a2a]/40 text-[#a8b4ac] border border-[#2d5a3f]/30 hover:border-[#c8963e]/30 hover:text-[#e8e4dd]"
              }`}
            >
              {region}
            </button>
          ))}
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative rounded-2xl overflow-hidden border border-[#2d5a3f]/30 shadow-2xl shadow-black/40"
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
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
              />
              <FitBounds sites={filteredSites} />
              {filteredSites.map((site) => (
                <SiteMarker key={site.id} site={site} />
              ))}
            </MapContainer>
          </div>

          {/* Map overlay info */}
          <div className="absolute top-4 right-4 z-[1000] bg-[#0d1f17]/80 backdrop-blur-sm border border-[#2d5a3f]/30 rounded-lg px-4 py-2">
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-[#c8963e]" />
              <span className="text-sm text-[#e8e4dd] font-[family-name:var(--font-mono)]">
                {filteredSites.length} sites
              </span>
            </div>
          </div>
        </motion.div>

        {/* Site Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 overflow-x-auto"
        >
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[#2d5a3f]/50">
                <th className="text-left py-4 px-4 text-sm font-[family-name:var(--font-body)] font-semibold text-[#c8963e] tracking-wide uppercase">
                  #
                </th>
                <th className="text-left py-4 px-4 text-sm font-[family-name:var(--font-body)] font-semibold text-[#c8963e] tracking-wide uppercase">
                  Site (Chinese)
                </th>
                <th className="text-left py-4 px-4 text-sm font-[family-name:var(--font-body)] font-semibold text-[#c8963e] tracking-wide uppercase">
                  Site (English)
                </th>
                <th className="text-left py-4 px-4 text-sm font-[family-name:var(--font-body)] font-semibold text-[#c8963e] tracking-wide uppercase">
                  Longitude
                </th>
                <th className="text-left py-4 px-4 text-sm font-[family-name:var(--font-body)] font-semibold text-[#c8963e] tracking-wide uppercase">
                  Latitude
                </th>
                <th className="text-left py-4 px-4 text-sm font-[family-name:var(--font-body)] font-semibold text-[#c8963e] tracking-wide uppercase">
                  Region
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredSites.map((site, i) => (
                <tr
                  key={site.id}
                  className="border-b border-[#2d5a3f]/20 hover:bg-[#1a3a2a]/30 transition-colors"
                >
                  <td className="py-3 px-4 text-sm font-[family-name:var(--font-mono)] text-[#8a9a8f]">
                    {String(i + 1).padStart(2, "0")}
                  </td>
                  <td className="py-3 px-4 text-sm font-[family-name:var(--font-body)] text-[#e8e4dd]">
                    {site.nameCn}
                  </td>
                  <td className="py-3 px-4 text-sm font-[family-name:var(--font-body)] text-[#c8c4bc]">
                    {site.nameEn}
                  </td>
                  <td className="py-3 px-4 text-sm font-[family-name:var(--font-mono)] text-[#a8b4ac]">
                    {site.longitude.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-sm font-[family-name:var(--font-mono)] text-[#a8b4ac]">
                    {site.latitude.toFixed(2)}
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-3 py-1 text-xs font-[family-name:var(--font-body)] font-medium rounded-full bg-[#2d5a3f]/30 text-[#a8b4ac] border border-[#2d5a3f]/30">
                      {site.region}
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
