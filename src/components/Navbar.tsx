import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";
import ApplyNowModal from "./ApplyNowModal";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Why Us", href: "#features" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass shadow-lg" : "bg-transparent"}`}>
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <a href="#home" className="flex items-center gap-3">
          <img src={logo} alt="AMP Media Network" className="h-12 w-auto object-contain mix-blend-screen" />
          <span className="font-heading font-bold text-xl tracking-tight hidden sm:block">
            AMP <span className="text-gradient">Media Network</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full">
              {l.label}
            </a>
          ))}
        </div>

        <button 
          onClick={() => setModalOpen(true)}
          className="hidden md:inline-flex px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:brightness-110 transition-all font-heading tracking-wide shadow-[0_0_20px_rgba(255,10,10,0.4)] hover:shadow-[0_0_30px_rgba(255,10,10,0.6)] border border-primary/50"
        >
          APPLY NOW
        </button>

        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden glass border-t border-border/50 px-4 pb-4">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
        <button 
          onClick={() => {
            setOpen(false);
            setModalOpen(true);
          }}
          className="w-full mt-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm text-center font-heading tracking-wide shadow-[0_0_20px_rgba(255,10,10,0.4)] border border-primary/50"
        >
          APPLY NOW
        </button>
        </div>
      )}

      <ApplyNowModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </nav>
  );
};

export default Navbar;
