import { useState, useEffect } from "react";
import { Lock, Search, RefreshCw, FileText, ArrowLeft, Download } from "lucide-react";
import { Link } from "react-router-dom";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyU9h2cUFiTZKmmnsADasBYfBL-2tLgohmkCCf4-5SusYlfFnUl4ugNcpyosmifm2Sg6Q/exec";

interface ApplicationData {
  Timestamp: string;
  Name: string;
  Email: string;
  WhatsApp: string;
  Mobile: string;
  "Instagram Username": string;
  "Instagram Followers": string;
  "Facebook Username": string;
  "Facebook Followers": string;
  "YouTube Channel": string;
  "YouTube Subscribers": string;
  "Monthly Reach": string;
}

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const [applications, setApplications] = useState<ApplicationData[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "113114") {
      setIsAuthenticated(true);
      setError("");
      fetchData();
    } else {
      setError("Incorrect password");
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(SCRIPT_URL);
      const data = await response.json();
      if (data.status === "success") {
        // Reverse array to show newest first
        setApplications(data.data.reverse());
      } else {
        console.error("Failed to fetch data", data.message);
      }
    } catch (err) {
      console.error("Error fetching admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredApps = applications.filter(app => 
    Object.values(app).some(val => 
      String(val).toLowerCase().includes(search.toLowerCase())
    )
  );

  const exportCsv = () => {
    if (applications.length === 0) return;
    const headers = Object.keys(applications[0]);
    const csvContent = [
      headers.join(","),
      ...applications.map(row => 
        headers.map(field => `"${String(row[field as keyof typeof row] || '').replace(/"/g, '""')}"`).join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `AMP_Applications_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <Link to="/" className="absolute top-6 left-6 text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm transition-colors">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        
        <div className="w-full max-w-md p-8 glass rounded-2xl animate-in fade-in zoom-in-95 duration-500 text-center">
          <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-6 glow-border">
            <Lock size={28} />
          </div>
          <h1 className="text-2xl font-bold font-heading mb-2">Admin Access</h1>
          <p className="text-muted-foreground text-sm mb-8">Enter the secure PIN to view applications</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="w-full text-center tracking-widest text-lg px-4 py-3 rounded-xl bg-secondary border border-border/60 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all"
                autoFocus
              />
            </div>
            {error && <p className="text-destructive text-sm font-medium">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold text-white transition-all hover:brightness-110 active:scale-[0.98]"
              style={{ background: "linear-gradient(135deg, hsl(0,72%,45%), hsl(0,85%,35%))" }}
            >
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Top Navbar */}
      <div className="sticky top-0 z-50 glass border-b border-border/50 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link to="/" className="p-2 bg-secondary rounded-lg text-muted-foreground hover:text-foreground transition-all">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-xl font-bold font-heading">Applications Dashboard</h1>
            <p className="text-xs text-muted-foreground">Manage and review all incoming applications</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, email, etc..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-secondary border border-border/60 text-sm focus:outline-none focus:border-primary/50 transition-all"
            />
          </div>
          <button 
            onClick={fetchData} 
            className="p-2 bg-secondary rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-all"
            title="Refresh Data"
          >
            <RefreshCw size={18} className={loading ? "animate-spin text-primary" : ""} />
          </button>
          <button 
            onClick={exportCsv} 
            className="p-2 bg-primary/20 text-primary border border-primary/30 rounded-lg hover:bg-primary hover:text-white transition-all"
            title="Export to CSV"
          >
            <Download size={18} />
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass p-5 rounded-xl border border-border/50">
            <div className="text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-1">Total Applications</div>
            <div className="text-3xl font-bold font-heading text-gradient">{applications.length}</div>
          </div>
        </div>

        {/* Table */}
        <div className="glass rounded-xl border border-border/50 overflow-hidden shadow-2xl relative">
          {loading && applications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-muted-foreground">
              <RefreshCw size={32} className="animate-spin mb-4 text-primary opacity-50" />
              <p>Loading records from Google Sheets...</p>
            </div>
          ) : applications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-muted-foreground">
              <FileText size={48} className="mb-4 opacity-20" />
              <p>No applications found yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="text-xs uppercase bg-secondary/80 text-muted-foreground border-b border-border/50">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Date</th>
                    <th className="px-6 py-4 font-semibold">Name</th>
                    <th className="px-6 py-4 font-semibold">Contact Info</th>
                    <th className="px-6 py-4 font-semibold">Instagram</th>
                    <th className="px-6 py-4 font-semibold">Facebook / YT</th>
                    <th className="px-6 py-4 font-semibold text-right">Reach</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {filteredApps.map((app, idx) => (
                    <tr key={idx} className="hover:bg-secondary/30 transition-colors">
                      <td className="px-6 py-4 text-muted-foreground text-xs">
                        {new Date(app.Timestamp).toLocaleDateString()}<br/>
                        <span className="opacity-60">{new Date(app.Timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                      </td>
                      <td className="px-6 py-4 font-medium text-foreground">
                        {app.Name}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <a href={`mailto:${app.Email}`} className="text-primary hover:underline text-xs">{app.Email}</a>
                          <a href={`https://wa.me/${app.WhatsApp.replace(/\D/g,'')}`} target="_blank" className="text-xs text-muted-foreground hover:text-foreground">
                            WA: {app.WhatsApp}
                          </a>
                          {app.Mobile && <span className="text-xs text-muted-foreground">Mob: {app.Mobile}</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {app["Instagram Username"] ? (
                          <div className="flex flex-col gap-1">
                            <span className="font-medium text-foreground">{app["Instagram Username"]}</span>
                            <span className="text-xs text-muted-foreground">{app["Instagram Followers"]} followers</span>
                          </div>
                        ) : <span className="text-muted-foreground/30">—</span>}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-2">
                          {app["Facebook Username"] && (
                            <div className="text-xs">
                              <span className="text-blue-400 font-medium">FB:</span> {app["Facebook Username"]} <span className="opacity-50">({app["Facebook Followers"]})</span>
                            </div>
                          )}
                          {app["YouTube Channel"] && (
                            <div className="text-xs">
                              <span className="text-red-400 font-medium">YT:</span> {app["YouTube Channel"]} <span className="opacity-50">({app["YouTube Subscribers"]})</span>
                            </div>
                          )}
                          {!app["Facebook Username"] && !app["YouTube Channel"] && <span className="text-muted-foreground/30">—</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs font-medium">
                          {app["Monthly Reach"] || "N/A"}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filteredApps.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                        No matches found for "{search}"
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
