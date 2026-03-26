/**
 * Partner Logo Wall — CP-GPE Net
 * Auto-scrolling marquee of partner institution logos.
 * Sits between Team and Data sections (or at bottom of Team).
 * Light cream bg to match Team section.
 */
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLang } from "@/contexts/LanguageContext";

interface PartnerLogo {
  nameEn: string;
  nameCn: string;
  abbr: string;
  logo: string;
}

const partners: PartnerLogo[] = [
  {
    nameEn: "Beijing Forestry University",
    nameCn: "北京林业大学",
    abbr: "BFU",
    logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663359140716/DQQrZGCEBPNpsfdCo2rcVJ/bfu_cd8738a9.png",
  },
  {
    nameEn: "Northwest A&F University",
    nameCn: "西北农林科技大学",
    abbr: "NWAFU",
    logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663359140716/DQQrZGCEBPNpsfdCo2rcVJ/nwafu_0b7a1883.png",
  },
  {
    nameEn: "Nanjing Forestry University",
    nameCn: "南京林业大学",
    abbr: "NFU",
    logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663359140716/DQQrZGCEBPNpsfdCo2rcVJ/nfu_7f7cb6a9.jpg",
  },
  {
    nameEn: "Northeast Forestry University",
    nameCn: "东北林业大学",
    abbr: "NEFU",
    logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663359140716/DQQrZGCEBPNpsfdCo2rcVJ/nefu_8385ff22.png",
  },
  {
    nameEn: "Shenyang Agricultural University",
    nameCn: "沈阳农业大学",
    abbr: "SYAU",
    logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663359140716/DQQrZGCEBPNpsfdCo2rcVJ/syau_24463e8f.png",
  },
  {
    nameEn: "Shanxi Agricultural University",
    nameCn: "山西农业大学",
    abbr: "SXAU",
    logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663359140716/DQQrZGCEBPNpsfdCo2rcVJ/sxau_b51e0e92.png",
  },
  {
    nameEn: "Inner Mongolia University",
    nameCn: "内蒙古大学",
    abbr: "IMU",
    logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663359140716/DQQrZGCEBPNpsfdCo2rcVJ/imu_e05ff377.png",
  },
  {
    nameEn: "Jilin Agricultural University",
    nameCn: "吉林农业大学",
    abbr: "JLAU",
    logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663359140716/DQQrZGCEBPNpsfdCo2rcVJ/jlau_01b01f58.jpg",
  },
  {
    nameEn: "Gansu Forestry Polytechnic",
    nameCn: "甘肃林业职业技术学院",
    abbr: "GSFP",
    logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663359140716/DQQrZGCEBPNpsfdCo2rcVJ/gsfp_62e1fb75.jpg",
  },
  {
    nameEn: "Chinese Academy of Forestry",
    nameCn: "中国林业科学研究院",
    abbr: "CAF",
    logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663359140716/DQQrZGCEBPNpsfdCo2rcVJ/caf2_6a099072.png",
  },
  {
    nameEn: "University of Idaho",
    nameCn: "爱达荷大学",
    abbr: "UI",
    logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663359140716/DQQrZGCEBPNpsfdCo2rcVJ/uidaho_10ab1e54.png",
  },
];

export default function PartnerLogoWall() {
  const { lang, t } = useLang();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  // Duplicate for infinite scroll
  const allLogos = [...partners, ...partners];

  return (
    <section className="relative py-16 lg:py-20 overflow-hidden bg-warm-50 border-t border-forest-100">
      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="text-forest-500 text-sm font-semibold tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-body)" }}>
            {t("Collaborating Institutions", "合作机构")}
          </span>
          <h3 className="mt-3 text-2xl sm:text-3xl font-bold text-forest-900" style={{ fontFamily: "var(--font-display)" }}>
            {t("Our Partners", "合作伙伴")}
          </h3>
          <div className="mt-4 w-16 h-0.5 bg-amber-500/60 mx-auto" />
        </motion.div>
      </div>

      {/* Marquee container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative"
      >
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-warm-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-warm-50 to-transparent z-10 pointer-events-none" />

        {/* Scrolling track */}
        <div className="flex animate-marquee">
          {allLogos.map((partner, i) => (
            <div
              key={`${partner.abbr}-${i}`}
              className="flex-shrink-0 mx-6 group"
            >
              <div className="flex flex-col items-center justify-center w-40 h-40 bg-white rounded-xl border border-forest-100 shadow-sm hover:shadow-md hover:border-forest-300 transition-all duration-300 p-4">
                <div className="w-20 h-20 flex items-center justify-center mb-2">
                  <img
                    src={partner.logo}
                    alt={lang === "en" ? partner.nameEn : partner.nameCn}
                    className="max-w-full max-h-full object-contain opacity-75 group-hover:opacity-100 transition-opacity duration-300"
                    loading="lazy"
                  />
                </div>
                <span className="text-[10px] text-forest-500 text-center leading-tight font-medium group-hover:text-forest-700 transition-colors" style={{ fontFamily: "var(--font-body)" }}>
                  {lang === "en" ? partner.nameEn : partner.nameCn}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
