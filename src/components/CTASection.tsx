import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CTASection = () => (
  <section className="py-24">
    <div className="container mx-auto px-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
        className="relative rounded-2xl overflow-hidden p-12 sm:p-16 text-center" style={{ background: "var(--gradient-primary)" }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        <div className="relative z-10">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
            Ready to Amplify Your Brand?
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8 text-lg">
            Let's create something extraordinary together. Get in touch and let's discuss your vision.
          </p>
          <a href="#contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-background text-foreground font-bold hover:bg-foreground hover:text-background transition-all text-lg">
            Start Your Project <ArrowRight size={20} />
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CTASection;
