import { motion } from "framer-motion";
import { Zap, Shield, TrendingUp, Lightbulb } from "lucide-react";

const features = [
  { icon: Zap, title: "Fast Execution", desc: "We move quickly without compromising on quality. Your campaigns launch faster." },
  { icon: Shield, title: "Brand Protection", desc: "We safeguard your reputation with carefully crafted messaging and strategies." },
  { icon: TrendingUp, title: "Proven Results", desc: "Our data-driven approach consistently delivers measurable growth metrics." },
  { icon: Lightbulb, title: "Creative Innovation", desc: "Fresh ideas and cutting-edge techniques keep your brand ahead of the curve." },
];

const FeaturesSection = () => (
  <section id="features" className="py-24 relative">
    <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
    <div className="container mx-auto px-4 relative z-10">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
        <span className="text-primary text-sm font-semibold tracking-widest uppercase">Why Choose Us</span>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold mt-3">What Makes Us <span className="text-gradient">Different</span></h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {features.map((f, i) => (
          <motion.div key={f.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
            className="flex gap-5 p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <f.icon className="text-primary" size={26} />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-lg mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
