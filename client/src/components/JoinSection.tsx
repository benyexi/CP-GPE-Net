/**
 * Join / Collaborate Section — CP-GPE Net
 * Contact form + offerings + collaboration process. Bilingual.
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Send, GraduationCap, Wrench, Share2, FileText, Mail, MessageSquare, CheckCircle2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useLang } from "@/contexts/LanguageContext";

export default function JoinSection() {
  const { t } = useLang();
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  const [formData, setFormData] = useState({
    name: "",
    institution: "",
    country: "",
    email: "",
    message: "",
  });

  const offerings = [
    { icon: GraduationCap, title: t("Methodology Training", "方法培训"), desc: t("Hands-on training in sap flow measurement techniques and data analysis", "树液流测量技术和数据分析的实操培训") },
    { icon: Wrench, title: t("Probe Calibration", "探针校准"), desc: t("Custom calibration of TDP/HFD probes for your specific tree species", "针对特定树种的TDP/HFD探针定制校准") },
    { icon: Share2, title: t("Data Sharing", "数据共享"), desc: t("Access to our comprehensive plantation physiology database", "访问我们全面的人工林生理数据库") },
    { icon: FileText, title: t("Co-authorship", "合作发表"), desc: t("Collaborative publication opportunities in high-impact journals", "在高影响力期刊上的合作发表机会") },
  ];

  const steps = [
    { num: "01", title: t("Initial Contact", "初步联系"), desc: t("Reach out via email or the form below to express your interest in collaboration.", "通过邮件或下方表单表达您的合作意向。") },
    { num: "02", title: t("Discussion & Planning", "讨论与规划"), desc: t("We will discuss research goals, site selection, and instrumentation requirements.", "我们将讨论研究目标、站点选择和仪器需求。") },
    { num: "03", title: t("Agreement & Setup", "协议与建设"), desc: t("Sign a collaboration agreement and begin site instrumentation installation.", "签署合作协议并开始站点仪器安装。") },
    { num: "04", title: t("Data Collection & Sharing", "数据采集与共享"), desc: t("Start monitoring and contribute data to the CP-GPE Net shared database.", "开始监测并将数据贡献到CP-GPE Net共享数据库。") },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(t("Thank you for your interest!", "感谢您的关注！"), {
      description: t("Your message has been recorded.", "您的消息已记录。"),
    });
    setFormData({ name: "", institution: "", country: "", email: "", message: "" });
  };

  return (
    <section id="join" className="relative py-24 lg:py-32 overflow-hidden bg-cream">
      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="text-forest-600 text-sm font-semibold tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-body)" }}>
            {t("Join the Network", "加入网络")}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-900" style={{ fontFamily: "var(--font-display)" }}>
            {t("Collaborate With Us", "与我们合作")}
          </h2>
          <p className="mt-6 text-lg text-forest-600 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
            {t(
              "We welcome international and domestic institutions to join CP-GPE Net. Together, we can advance our understanding of plantation ecosystems.",
              "我们欢迎国内外机构加入CP-GPE Net。携手推进对人工林生态系统的认知。"
            )}
          </p>
          <div className="mt-6 section-divider max-w-xs mx-auto" />
        </motion.div>

        {/* What We Offer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 lg:mb-20"
        >
          {offerings.map((item, i) => (
            <div
              key={i}
              className="bg-white border border-forest-100 rounded-xl p-6 text-center hover:border-forest-300 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-forest-50 flex items-center justify-center mx-auto mb-4">
                <item.icon size={22} className="text-forest-600" />
              </div>
              <h4 className="text-base font-bold text-forest-900 mb-2" style={{ fontFamily: "var(--font-display)" }}>
                {item.title}
              </h4>
              <p className="text-sm text-forest-500" style={{ fontFamily: "var(--font-body)" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Collaboration Process */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-16 lg:mb-20"
        >
          <h3 className="text-2xl lg:text-3xl font-bold text-forest-900 text-center mb-12" style={{ fontFamily: "var(--font-display)" }}>
            {t("How to Join", "如何加入")}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="relative bg-white border border-forest-100 rounded-xl p-6 hover:border-forest-300 hover:shadow-md transition-all"
              >
                <div className="text-3xl font-bold text-forest-200 mb-3" style={{ fontFamily: "var(--font-mono)" }}>
                  {step.num}
                </div>
                <h4 className="text-base font-bold text-forest-800 mb-2" style={{ fontFamily: "var(--font-display)" }}>
                  {step.title}
                </h4>
                <p className="text-sm text-forest-500 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                  {step.desc}
                </p>
                {i < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-4 w-8 items-center justify-center text-forest-300">
                    <ArrowRight size={16} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Form + Info */}
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="lg:col-span-3"
          >
            <h3 className="text-2xl font-bold text-forest-900 mb-8" style={{ fontFamily: "var(--font-display)" }}>
              {t("Get in Touch", "联系我们")}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-forest-700 font-medium mb-2" style={{ fontFamily: "var(--font-body)" }}>
                    {t("Name *", "姓名 *")}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-forest-200 rounded-lg text-forest-800 placeholder-forest-300 focus:border-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-200 transition-all"
                    style={{ fontFamily: "var(--font-body)" }}
                    placeholder={t("Your full name", "您的姓名")}
                  />
                </div>
                <div>
                  <label className="block text-sm text-forest-700 font-medium mb-2" style={{ fontFamily: "var(--font-body)" }}>
                    {t("Institution *", "单位 *")}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-forest-200 rounded-lg text-forest-800 placeholder-forest-300 focus:border-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-200 transition-all"
                    style={{ fontFamily: "var(--font-body)" }}
                    placeholder={t("University or organization", "大学或研究机构")}
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-forest-700 font-medium mb-2" style={{ fontFamily: "var(--font-body)" }}>
                    {t("Country *", "国家 *")}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-forest-200 rounded-lg text-forest-800 placeholder-forest-300 focus:border-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-200 transition-all"
                    style={{ fontFamily: "var(--font-body)" }}
                    placeholder={t("Your country", "您的国家")}
                  />
                </div>
                <div>
                  <label className="block text-sm text-forest-700 font-medium mb-2" style={{ fontFamily: "var(--font-body)" }}>
                    {t("Email *", "邮箱 *")}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-forest-200 rounded-lg text-forest-800 placeholder-forest-300 focus:border-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-200 transition-all"
                    style={{ fontFamily: "var(--font-body)" }}
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-forest-700 font-medium mb-2" style={{ fontFamily: "var(--font-body)" }}>
                  {t("Message", "留言")}
                </label>
                <textarea
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-forest-200 rounded-lg text-forest-800 placeholder-forest-300 focus:border-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-200 transition-all resize-none"
                  style={{ fontFamily: "var(--font-body)" }}
                  placeholder={t("Tell us about your research interests...", "请介绍您的研究兴趣...")}
                />
              </div>
              <button
                type="submit"
                className="group inline-flex items-center gap-3 px-8 py-3.5 bg-forest-600 text-white font-semibold rounded-xl hover:bg-forest-700 hover:shadow-lg transition-all duration-300"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                {t("Send Message", "发送消息")}
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="bg-white border border-forest-200 rounded-xl p-6 lg:p-8 shadow-sm mb-6">
              <h3 className="text-xl font-bold text-forest-900 mb-6" style={{ fontFamily: "var(--font-display)" }}>
                {t("Contact Information", "联系方式")}
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-forest-50 flex items-center justify-center flex-shrink-0">
                    <Mail size={18} className="text-forest-600" />
                  </div>
                  <div>
                    <p className="text-sm text-forest-500" style={{ fontFamily: "var(--font-body)" }}>{t("Email", "邮箱")}</p>
                    <p className="text-forest-800" style={{ fontFamily: "var(--font-body)" }}>benyexi@bjfu.edu.cn</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-forest-50 flex items-center justify-center flex-shrink-0">
                    <MessageSquare size={18} className="text-forest-600" />
                  </div>
                  <div>
                    <p className="text-sm text-forest-500" style={{ fontFamily: "var(--font-body)" }}>{t("WeChat", "微信")}</p>
                    <div className="mt-2 w-36 h-36 bg-white border border-forest-200 rounded-lg overflow-hidden">
                      <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663359140716/DQQrZGCEBPNpsfdCo2rcVJ/wechat-qr-cropped_72c8319a.png" alt="WeChat QR Code" className="w-full h-full object-contain p-1" />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-forest-100">
                  <p className="text-sm text-forest-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                    <strong className="text-forest-800">{t("Prof. Xi Benye", "席本野 教授")}</strong><br />
                    {t("Plantation Water Relations Lab (PWRlab)", "人工林水分关系实验室（PWRlab）")}<br />
                    {t("National Key Laboratory of Efficient Forest Production", "林木资源高效生产全国重点实验室")}<br />
                    {t("Beijing Forestry University", "北京林业大学")}<br />
                    {t("Beijing 100083, China", "北京 100083，中国")}
                  </p>
                </div>
              </div>
            </div>

            {/* Why Join */}
            <div className="bg-forest-50 border border-forest-200 rounded-xl p-6">
              <h4 className="text-base font-bold text-forest-800 mb-4" style={{ fontFamily: "var(--font-display)" }}>
                {t("Why Join CP-GPE Net?", "为什么加入CP-GPE Net？")}
              </h4>
              <div className="space-y-3">
                {[
                  t("Access to standardized sap flow instrumentation", "获得标准化树液流仪器"),
                  t("Shared data analysis protocols and tools", "共享数据分析方案和工具"),
                  t("Collaborative publication opportunities", "合作发表机会"),
                  t("Annual network workshop and training", "年度网络研讨会和培训"),
                  t("International visibility and partnerships", "国际知名度和合作伙伴关系"),
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-forest-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-forest-600" style={{ fontFamily: "var(--font-body)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
