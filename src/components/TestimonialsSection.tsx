import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  { name: "Rahul Sharma", role: "Startup Founder", text: "AMP Media transformed our online presence. Their strategic approach doubled our engagement within months." },
  { name: "Priya Patel", role: "E-commerce Owner", text: "The team's creativity and dedication are unmatched. Our brand has never looked this professional." },
  { name: "Arjun Mehta", role: "Content Creator", text: "Working with AMP was a game-changer. They understand the digital landscape like no one else." },
];

const TestimonialsSection = () => (
  <section id="testimonials" className="py-24">
    <div className="container mx-auto px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
        <span className="text-primary text-sm font-semibold tracking-widest uppercase">Testimonials</span>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold mt-3">What Clients <span className="text-gradient">Say</span></h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {testimonials.map((t, i) => (
          <motion.div key={t.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
            className="p-6 rounded-xl border border-border/50 bg-card hover:border-primary/30 transition-all">
            <div className="flex gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} size={16} className="text-primary fill-primary" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5 italic">"{t.text}"</p>
            <div>
              <div className="font-heading font-semibold text-sm">{t.name}</div>
              <div className="text-xs text-muted-foreground">{t.role}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
