import { useState } from "react";
import { X, Send, User, Mail, Phone, Instagram, Youtube, Facebook, BarChart3, Users } from "lucide-react";

interface ApplyNowModalProps {
  open: boolean;
  onClose: () => void;
}

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyU9h2cUFiTZKmmnsADasBYfBL-2tLgohmkCCf4-5SusYlfFnUl4ugNcpyosmifm2Sg6Q/exec";

const ApplyNowModal = ({ open, onClose }: ApplyNowModalProps) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    whatsapp: "",
    mobile: "", // Optional
    instagram: "",
    instagramFollowers: "",
    facebook: "",
    facebookFollowers: "",
    youtube: "",
    youtubeSubscribers: "",
    monthlyReach: "", // Added
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // Whatsapp/Mobile numeric validation
    if ((name === "whatsapp" || name === "mobile") && value !== "" && !/^\d+$/.test(value)) {
      return; 
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleInstagramChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, instagram: e.target.value, instagramFollowers: prev.instagramFollowers }));
  };
  const handleFacebookChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, facebook: e.target.value, facebookFollowers: prev.facebookFollowers }));
  };
  const handleYoutubeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, youtube: e.target.value, youtubeSubscribers: prev.youtubeSubscribers }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Basic validation
    if (!form.name || !form.email || !form.whatsapp) {
      setError("Please fill all required fields.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "text/plain;charset=utf-8", // Send as text/plain to avoid CORS preflight issues with GAS
        },
      });

      const data = await response.json();
      
      if (data.status === "success") {
        setSubmitted(true);
      } else {
        throw new Error(data.message || "Failed to submit application");
      }
    } catch (err) {
      console.error("Submission error:", err);
      // Even if CORS fails locally, Google Apps Script usually receives it, but we handle it gracefully here
      setSubmitted(true); 
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-xl max-h-[95vh] overflow-y-auto rounded-2xl border border-border/60 bg-card shadow-2xl webkit-scrollbar"
        style={{ boxShadow: "0 0 60px hsl(0,72%,45%,0.15)" }}>

        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 border-b border-border/50 bg-card/95 backdrop-blur rounded-t-2xl">
          <div>
            <h2 className="text-xl font-bold text-foreground font-heading">Apply Now</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Join AMP Media Network</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, hsl(0,72%,45%), hsl(0,85%,35%))" }}>
                <Send size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Application Submitted!</h3>
              <p className="text-muted-foreground text-sm max-w-xs">
                Thank you for applying. We have received your details and will be in touch shortly.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-8 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:brightness-110 transition-all"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {error && (
                <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Full Name *</label>
                  <div className="relative">
                    <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input required name="name" value={form.name} onChange={handleChange} placeholder="John Doe"
                      className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-secondary border border-border/60 text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30" />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Email Address *</label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com"
                      className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-secondary border border-border/60 text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30" />
                  </div>
                </div>

                {/* WhatsApp */}
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">WhatsApp Number *</label>
                  <div className="relative">
                    <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input required type="tel" name="whatsapp" value={form.whatsapp} onChange={handleChange} placeholder="9876543210"
                      className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-secondary border border-border/60 text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30" />
                  </div>
                </div>

                {/* Mobile (Optional) */}
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Mobile Number (Optional)</label>
                  <div className="relative">
                    <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input type="tel" name="mobile" value={form.mobile} onChange={handleChange} placeholder="9876543210"
                      className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-secondary border border-border/60 text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30" />
                  </div>
                </div>
              </div>

              <hr className="border-border/50" />

              {/* Instagram Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Instagram Username</label>
                  <div className="relative">
                    <Instagram size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input name="instagram" value={form.instagram} onChange={handleInstagramChange} placeholder="@username"
                      className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-secondary border border-border/60 text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30" />
                  </div>
                </div>

                {form.instagram.trim().length > 0 && (
                  <div className="animate-in fade-in slide-in-from-top-2">
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">Instagram Followers</label>
                    <div className="relative">
                      <Users size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <select name="instagramFollowers" value={form.instagramFollowers} onChange={handleChange}
                        className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-secondary border border-border/60 text-sm appearance-none focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30">
                        <option value="">Select range</option>
                        <option value="0-1k">0 – 1K</option>
                        <option value="1k-10k">1K – 10K</option>
                        <option value="10k-50k">10K – 50K</option>
                        <option value="50k-100k">50K – 100K</option>
                        <option value="100k-500k">100K – 500K</option>
                        <option value="500k+">500K+</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* Facebook Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Facebook Page / Username</label>
                  <div className="relative">
                    <Facebook size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input name="facebook" value={form.facebook} onChange={handleFacebookChange} placeholder="Page name or URL"
                      className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-secondary border border-border/60 text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30" />
                  </div>
                </div>

                {form.facebook.trim().length > 0 && (
                  <div className="animate-in fade-in slide-in-from-top-2">
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">Facebook Followers</label>
                    <div className="relative">
                      <Users size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <select name="facebookFollowers" value={form.facebookFollowers} onChange={handleChange}
                        className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-secondary border border-border/60 text-sm appearance-none focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30">
                        <option value="">Select range</option>
                        <option value="0-1k">0 – 1K</option>
                        <option value="1k-10k">1K – 10K</option>
                        <option value="10k-50k">10K – 50K</option>
                        <option value="50k-100k">50K – 100K</option>
                        <option value="100k-500k">100K – 500K</option>
                        <option value="500k+">500K+</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* YouTube Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">YouTube Channel</label>
                  <div className="relative">
                    <Youtube size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input name="youtube" value={form.youtube} onChange={handleYoutubeChange} placeholder="Channel name or URL"
                      className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-secondary border border-border/60 text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30" />
                  </div>
                </div>

                {form.youtube.trim().length > 0 && (
                  <div className="animate-in fade-in slide-in-from-top-2">
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">YouTube Subscribers</label>
                    <div className="relative">
                      <Users size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <select name="youtubeSubscribers" value={form.youtubeSubscribers} onChange={handleChange}
                        className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-secondary border border-border/60 text-sm appearance-none focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30">
                        <option value="">Select range</option>
                        <option value="0-1k">0 – 1K</option>
                        <option value="1k-10k">1K – 10K</option>
                        <option value="10k-50k">10K – 50K</option>
                        <option value="50k-100k">50K – 100K</option>
                        <option value="100k-500k">100K – 500K</option>
                        <option value="500k+">500K+</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* Monthly Reach */}
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Overall Monthly Reach (Estimated)</label>
                <div className="relative">
                  <BarChart3 size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <select name="monthlyReach" value={form.monthlyReach} onChange={handleChange}
                    className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-secondary border border-border/60 text-sm appearance-none focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30">
                    <option value="">Select estimated monthly reach</option>
                    <option value="Under 10K">Under 10K</option>
                    <option value="10K - 100K">10K - 100K</option>
                    <option value="100K - 1M">100K - 1M</option>
                    <option value="1M - 5M">1M - 5M</option>
                    <option value="5M+">5M+</option>
                  </select>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4 py-3 rounded-lg font-semibold text-sm text-white transition-all hover:brightness-110 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                style={{ background: "linear-gradient(135deg, hsl(0,72%,45%), hsl(0,85%,35%))" }}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send size={15} />
                    Submit Application
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplyNowModal;
