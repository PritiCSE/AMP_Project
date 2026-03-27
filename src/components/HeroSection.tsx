import { motion } from "framer-motion";
import founderImg from "@/assets/founder.png";
import { ArrowRight, Play } from "lucide-react";
import { useState } from "react";
import ApplyNowModal from "./ApplyNowModal";

const HeroSection = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
  <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20">
    {/* Background effects */}
    <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
    <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-20" style={{ background: "var(--gradient-glow)" }} />
    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

    <div className="container mx-auto px-4 relative z-10">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Media That Amplifies
          </motion.div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-6">
            Elevate Your
            <br />
            <span className="text-gradient">Digital Presence</span>
          </h1>

          <p className="text-muted-foreground text-lg max-w-lg mb-8 leading-relaxed">
            We craft powerful media strategies that amplify your brand, engage your audience, and drive real results in the digital landscape.
          </p>

          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all shadow-[0_0_20px_rgba(255,10,10,0.4)] animate-pulse-glow"
            >
              APPLY NOW <ArrowRight size={18} />
            </button>
            <a href="#about" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border border-border text-foreground font-semibold hover:bg-secondary transition-all">
              <Play size={16} className="text-primary" /> Learn More
            </a>
          </div>

          <div className="flex gap-10 mt-12">
            {[
              { num: "500+", label: "Projects" },
              { num: "50+", label: "Clients" },
              { num: "3+", label: "Years" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-heading text-2xl font-bold text-gradient">{s.num}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — founder image */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="relative flex justify-center">
          <div className="relative">
            <div className="absolute -inset-4 rounded-full opacity-30 blur-3xl" style={{ background: "var(--gradient-glow)" }} />
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full overflow-hidden border-2 border-primary/30 glow-border">
              <img src={founderImg} alt="Farhan Ahmed - Founder" className="w-full h-full object-cover object-top" />
            </div>
            {/* Floating badge */}
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -bottom-2 -right-2 glass rounded-xl px-4 py-3 shadow-lg">
              <div className="text-xs text-muted-foreground">Founder & CEO</div>
              <div className="font-heading font-bold text-sm">Farhan Ahmed</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>

    <ApplyNowModal open={modalOpen} onClose={() => setModalOpen(false)} />
  </section>
  );
};

export default HeroSection;
