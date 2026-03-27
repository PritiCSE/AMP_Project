import { motion } from "framer-motion";
import { useState } from "react";
import { Send, Mail, Phone, MapPin, CheckCircle } from "lucide-react";

const GOOGLE_SHEETS_URL = ""; // User should add their Google Apps Script URL

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email is required";
    if (!form.phone.trim() || form.phone.trim().length < 7) e.phone = "Valid phone is required";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    try {
      if (GOOGLE_SHEETS_URL) {
        await fetch(GOOGLE_SHEETS_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">Contact</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mt-3">Let's <span className="text-gradient">Connect</span></h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h3 className="font-heading text-xl font-bold mb-6">Get in Touch</h3>
            <p className="text-muted-foreground mb-8">Have a project in mind? Fill out the form and we'll get back to you within 24 hours.</p>
            <div className="space-y-5">
              {[
                { icon: Mail, label: "contact@ampmedia.network" },
                { icon: Phone, label: "+91 98765 43210" },
                { icon: MapPin, label: "India" },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <c.icon size={18} className="text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">{c.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.form initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} onSubmit={handleSubmit} className="space-y-4">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 py-12">
                <CheckCircle size={48} className="text-primary" />
                <h3 className="font-heading text-xl font-bold">Message Sent!</h3>
                <p className="text-muted-foreground text-sm">We'll get back to you shortly.</p>
                <button type="button" onClick={() => setStatus("idle")} className="text-primary text-sm underline mt-2">Send another</button>
              </div>
            ) : (
              <>
                {(["name", "email", "phone", "message"] as const).map((field) => (
                  <div key={field}>
                    {field === "message" ? (
                      <textarea placeholder="Your message / requirement" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4}
                        className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary transition-colors resize-none" />
                    ) : (
                      <input type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                        placeholder={field === "name" ? "Your name" : field === "email" ? "Email address" : "Phone number"}
                        value={form[field]} onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary transition-colors" />
                    )}
                    {errors[field] && <p className="text-xs text-destructive mt-1">{errors[field]}</p>}
                  </div>
                ))}
                <button type="submit" disabled={status === "sending"}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all disabled:opacity-60">
                  {status === "sending" ? "Sending..." : <><Send size={16} /> Send Message</>}
                </button>
              </>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
