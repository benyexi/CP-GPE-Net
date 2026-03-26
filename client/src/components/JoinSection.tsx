/**
 * Join / Collaborate Section — Fresh Forest Theme
 * Call to action + contact form + what we offer. Bilingual.
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Send, GraduationCap, Wrench, Share2, FileText, Mail, MessageSquare } from "lucide-react";
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
          <span className="text-forest-600 text-sm font-[family-name:var(--font-body)] font-semibold tracking-[0.2em] uppercase">
            {t("Join the Network", "加入网络")}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-900">
            {t("Collaborate With Us", "与我们合作")}
          </h2>
          <p className="mt-6 text-lg text-forest-600 font-[family-name:var(--font-body)] max-w-2xl mx-auto">
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
              <h4 className="text-base font-bold text-forest-900 font-[family-name:var(--font-display)] mb-2">
                {item.title}
              </h4>
              <p className="text-sm text-forest-500 font-[family-name:var(--font-body)]">
                {item.desc}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Contact Form + Info */}
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-forest-700 font-[family-name:var(--font-body)] font-medium mb-2">
                    {t("Name *", "姓名 *")}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-forest-200 rounded-lg text-forest-800 font-[family-name:var(--font-body)] placeholder-forest-300 focus:border-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-200 transition-all"
                    placeholder={t("Your full name", "您的姓名")}
                  />
                </div>
                <div>
                  <label className="block text-sm text-forest-700 font-[family-name:var(--font-body)] font-medium mb-2">
                    {t("Institution *", "单位 *")}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-forest-200 rounded-lg text-forest-800 font-[family-name:var(--font-body)] placeholder-forest-300 focus:border-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-200 transition-all"
                    placeholder={t("University or organization", "大学或研究机构")}
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-forest-700 font-[family-name:var(--font-body)] font-medium mb-2">
                    {t("Country *", "国家 *")}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-forest-200 rounded-lg text-forest-800 font-[family-name:var(--font-body)] placeholder-forest-300 focus:border-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-200 transition-all"
                    placeholder={t("Your country", "您的国家")}
                  />
                </div>
                <div>
                  <label className="block text-sm text-forest-700 font-[family-name:var(--font-body)] font-medium mb-2">
                    {t("Email *", "邮箱 *")}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-forest-200 rounded-lg text-forest-800 font-[family-name:var(--font-body)] placeholder-forest-300 focus:border-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-200 transition-all"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-forest-700 font-[family-name:var(--font-body)] font-medium mb-2">
                  {t("Message", "留言")}
                </label>
                <textarea
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-forest-200 rounded-lg text-forest-800 font-[family-name:var(--font-body)] placeholder-forest-300 focus:border-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-200 transition-all resize-none"
                  placeholder={t("Tell us about your research interests...", "请介绍您的研究兴趣...")}
                />
              </div>
              <button
                type="submit"
                className="group inline-flex items-center gap-3 px-8 py-3.5 bg-forest-600 text-white font-[family-name:var(--font-body)] font-semibold rounded-xl hover:bg-forest-700 hover:shadow-lg transition-all duration-300"
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
            <div className="bg-white border border-forest-200 rounded-xl p-6 lg:p-8 shadow-sm">
              <h3 className="text-xl font-bold text-forest-900 font-[family-name:var(--font-display)] mb-6">
                {t("Contact Information", "联系方式")}
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-forest-50 flex items-center justify-center flex-shrink-0">
                    <Mail size={18} className="text-forest-600" />
                  </div>
                  <div>
                    <p className="text-sm text-forest-500 font-[family-name:var(--font-body)]">{t("Email", "邮箱")}</p>
                    <p className="text-forest-800 font-[family-name:var(--font-body)]">xibenye@bjfu.edu.cn</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-forest-50 flex items-center justify-center flex-shrink-0">
                    <MessageSquare size={18} className="text-forest-600" />
                  </div>
                  <div>
                    <p className="text-sm text-forest-500 font-[family-name:var(--font-body)]">{t("WeChat", "微信")}</p>
                    <div className="mt-2 w-32 h-32 bg-forest-50 border border-forest-200 rounded-lg flex items-center justify-center">
                      <span className="text-xs text-forest-400 font-[family-name:var(--font-body)]">QR Code</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-forest-100">
                  <p className="text-sm text-forest-600 font-[family-name:var(--font-body)] leading-relaxed">
                    <strong className="text-forest-800">{t("Prof. Xi Benye", "席本野 教授")}</strong><br />
                    {t("Plantation Water Relations Lab (PWRlab)", "人工林水分关系实验室（PWRlab）")}<br />
                    {t("College of Forestry", "林学院")}<br />
                    {t("Beijing Forestry University", "北京林业大学")}<br />
                    {t("Beijing 100083, China", "北京 100083，中国")}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
