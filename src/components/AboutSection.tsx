import { motion } from "framer-motion";
import founderImg from "@/assets/founder.png";
import { CheckCircle } from "lucide-react";

const AboutSection = () => (
  <section id="about" className="py-24 relative">
    <div className="container mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
          <div className="relative rounded-2xl overflow-hidden aspect-[3/4] max-w-md mx-auto lg:mx-0">
            <img src={founderImg} alt="Farhan Ahmed" className="w-full h-full object-cover object-top" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-4 -right-4 lg:right-auto lg:-left-4 glass rounded-xl px-5 py-4">
            <div className="font-heading text-2xl font-bold text-gradient">3+</div>
            <div className="text-sm text-muted-foreground">Years of Excellence</div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">About Us</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mt-3 mb-6">
            The Story Behind <span className="text-gradient">AMP Media</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Founded by Farhan Ahmed, AMP Media Network is a results-driven media agency dedicated to helping brands thrive in the digital world. We combine creative storytelling with data-driven strategies to deliver impactful campaigns.
          </p>
          <div className="space-y-3 mb-8">
            {["Creative Excellence in Every Project", "Data-Driven Marketing Strategies", "Dedicated Team of Experts", "End-to-End Media Solutions"].map((t) => (
              <div key={t} className="flex items-center gap-3">
                <CheckCircle size={18} className="text-primary flex-shrink-0" />
                <span className="text-sm">{t}</span>
              </div>
            ))}
          </div>
          <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all">
            Work With Us
          </a>
        </motion.div>
      </div>
    </div>
  </section>
);

export default AboutSection;
