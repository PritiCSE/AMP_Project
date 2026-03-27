import { motion } from "framer-motion";
import { Megaphone, Video, PenTool, BarChart3, Globe, Users } from "lucide-react";

const services = [
  { icon: Megaphone, title: "Social Media Marketing", desc: "Strategic campaigns across platforms to maximize reach and engagement." },
  { icon: Video, title: "Video Production", desc: "High-quality video content that tells your brand's story compellingly." },
  { icon: PenTool, title: "Brand Design", desc: "Visual identity systems that make your brand unforgettable." },
  { icon: BarChart3, title: "Analytics & Growth", desc: "Data-driven insights to optimize your marketing performance." },
  { icon: Globe, title: "Digital Strategy", desc: "Comprehensive digital roadmaps tailored to your business goals." },
  { icon: Users, title: "Influencer Marketing", desc: "Connect with the right creators to amplify your brand message." },
];

const ServicesSection = () => (
  <section id="services" className="py-24 relative">
    <div className="container mx-auto px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
        <span className="text-primary text-sm font-semibold tracking-widest uppercase">What We Do</span>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold mt-3">Our <span className="text-gradient">Services</span></h2>
        <p className="text-muted-foreground mt-4 max-w-xl mx-auto">End-to-end media solutions designed to amplify your brand and drive measurable results.</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <motion.div key={s.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="group p-6 rounded-xl border border-border/50 bg-card hover:border-primary/40 transition-all duration-300 hover:shadow-[var(--shadow-glow)] cursor-default">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <s.icon className="text-primary" size={24} />
            </div>
            <h3 className="font-heading font-semibold text-lg mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
