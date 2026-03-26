/**
 * Hero Section — CP-GPE Net
 * Fresh forest background, very strong text-shadow + dark overlay,
 * glowing CTA, stats bar at bottom with proper z-index (no navbar overlap).
 */
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { stats } from "@/lib/siteData";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663359140716/DQQrZGCEBPNpsfdCo2rcVJ/hero-fresh_c1620609.jpg";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const startTime = performance.now();
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} style={{ fontFamily: "var(--font-mono)" }} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">
      {count}{suffix}
    </span>
  );
}

function LeafParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number; rotation: number; rotSpeed: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 25; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: Math.random() * 0.3 + 0.1,
        size: Math.random() * 4 + 2,
        opacity: Math.random() * 0.3 + 0.1,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;

        if (p.y > canvas.height + 10) { p.y = -10; p.x = Math.random() * canvas.width; }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
        ctx.restore();
      });
      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />;
}

export default function HeroSection() {
  const { lang, t } = useLang();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background with parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          transform: `scale(1.1) translateY(${scrollY * 0.25}px)`,
        }}
      />
      {/* Very strong dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
      {/* Extra dark band at top for navbar area */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/40 to-transparent z-[5]" />

      <LeafParticles />

      {/* Main Content — centered vertically with generous top padding for navbar clearance */}
      <div className="relative z-20 flex-1 flex items-center justify-center pt-28 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/40 border border-white/20 backdrop-blur-sm mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white/90 text-sm font-medium tracking-wide" style={{ fontFamily: "var(--font-body)" }}>
                {t("Beijing Forestry University · PWRlab", "北京林业大学 · 人工林水分关系实验室")}
              </span>
            </motion.div>

            {/* Title — very strong text-shadow for readability on green bg */}
            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-[1.05] tracking-tight mb-6"
              style={{
                fontFamily: "var(--font-display)",
                textShadow: "0 4px 30px rgba(0,0,0,0.9), 0 2px 10px rgba(0,0,0,0.8), 0 0 80px rgba(0,0,0,0.5)",
              }}
            >
              <span className="block">CP-GPE</span>
              <span
                className="block text-amber-300"
                style={{
                  textShadow: "0 4px 30px rgba(0,0,0,0.9), 0 2px 10px rgba(0,0,0,0.8), 0 0 50px rgba(200,160,50,0.4)",
                }}
              >
                Net
              </span>
            </h1>

            {/* Full name */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-base sm:text-lg md:text-xl text-white font-medium tracking-[0.15em] uppercase mb-5 max-w-3xl mx-auto"
              style={{
                fontFamily: "var(--font-body)",
                textShadow: "0 2px 15px rgba(0,0,0,0.9), 0 0 30px rgba(0,0,0,0.6)",
              }}
            >
              {t(
                "China Plantation Growth, Physiology & Ecology Network",
                "中国人工林生长、生理与生态监测网络"
              )}
            </motion.p>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-lg sm:text-xl md:text-2xl text-white/90 italic max-w-2xl mx-auto mb-10"
              style={{
                fontFamily: "var(--font-display)",
                textShadow: "0 2px 15px rgba(0,0,0,0.9), 0 0 30px rgba(0,0,0,0.6)",
              }}
            >
              {t(
                "Monitoring Plantation Water, Growth, and Ecology Across China and Beyond",
                "监测中国及全球人工林水分、生长与生态"
              )}
            </motion.p>

            {/* Glowing CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <button
                onClick={() => document.getElementById("network")?.scrollIntoView({ behavior: "smooth" })}
                className="group relative inline-flex items-center gap-3 px-10 py-4 bg-amber-500 text-forest-900 font-bold text-lg rounded-xl overflow-hidden transition-all duration-300 hover:bg-amber-400 shadow-[0_0_30px_rgba(245,166,35,0.4)] hover:shadow-[0_0_60px_rgba(245,166,35,0.6)]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {/* Animated glow border */}
                <span className="absolute inset-0 rounded-xl border-2 border-amber-300/60 animate-pulse" />
                <span className="absolute inset-[-2px] rounded-xl bg-gradient-to-r from-amber-400/0 via-amber-300/30 to-amber-400/0 animate-pulse" />
                <span className="relative z-10">{t("Explore the Network", "探索监测网络")}</span>
                <ChevronDown size={20} className="relative z-10 group-hover:translate-y-1 transition-transform" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Stats Bar — at very bottom, clear of main content */}
      <div className="relative z-20 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 bg-black/50 backdrop-blur-xl border border-white/15 rounded-2xl p-6 lg:p-8"
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                <p className="mt-2 text-xs sm:text-sm text-white/75 font-medium tracking-wide uppercase" style={{ fontFamily: "var(--font-body)" }}>
                  {lang === "en" ? stat.labelEn : stat.labelCn}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
          <ChevronDown size={24} className="text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
