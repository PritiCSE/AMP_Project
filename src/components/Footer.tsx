import logo from "@/assets/logo.png";

const Footer = () => (
  <footer className="border-t border-border/50 py-12">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img src={logo} alt="AMP Media Network" className="h-10 w-auto object-contain mix-blend-screen" />
          <span className="font-heading font-bold text-lg">AMP <span className="text-gradient">Media Network</span></span>
        </div>
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} AMP Media Network. All rights reserved.</p>
        <div className="flex gap-6">
          {["Home", "Services", "About", "Contact"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l}</a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
