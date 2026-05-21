import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Home, Trees, Utensils, MapPin, Menu, X, Coffee } from "lucide-react";
import logoImg from "../assets/images/logo.png";

export default function NavigationBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Track scroll position to adjust background intensity and active section highlight
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Simple active section detection
      const sections = ["hero", "escape", "menu", "footer"];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      // Smooth scroll with an offset for the fixed navbar
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const navLinks = [
    { id: "hero", label: "Home", icon: Home },
    { id: "escape", label: "Our Vibe", icon: Trees },
    { id: "menu", label: "Menu", icon: Utensils },
    { id: "footer", label: "Find Us", icon: MapPin },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0B0806] border-b border-amber-900/10 py-3.5 px-6 md:px-12 shadow-xl transition-all duration-355">
        <div className="mx-auto max-w-7xl flex items-center justify-between w-full">
          <div 
            onClick={() => handleNavClick("hero")}
            className="flex items-center gap-3 cursor-pointer group transition-all duration-300 hover:scale-[1.02]"
          >
            <img src={logoImg} alt="Summer Bistro Logo" className="h-16 w-auto object-contain" referrerPolicy="no-referrer" />
            <div className="flex flex-col text-left">
              <span className="font-serif italic text-lg md:text-xl text-[#F9F6F0] tracking-wider font-light group-hover:text-[#D8A15D] transition-colors duration-300 leading-tight">
                Summer Bistro
              </span>
              <span className="font-mono text-[10px] md:text-[11px] tracking-[0.12em] text-[#D8A15D]/80 group-hover:text-amber-300 transition-colors duration-300 uppercase leading-none mt-1 flex items-center gap-1">
                <span className="text-amber-400">✨</span> JUBILEE HILLS, HYDERABAD
              </span>
            </div>
          </div>

          {/* Desktop Links Container with sleek 3D dock interface */}
          <div className="hidden md:flex items-center gap-1.5 p-1.5 bg-gradient-to-b from-[#16120E]/90 to-[#0B0806]/95 backdrop-blur-xl border border-white/5 rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.85)]">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center transition-all duration-200 outline-none cursor-pointer ${
                    isActive 
                      ? "bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1.5 rounded-xl scale-[1.02] shadow-[0_0_20px_rgba(245,158,11,0.1)] font-medium tracking-wider text-sm" 
                      : "text-neutral-400 font-medium tracking-wider text-sm hover:text-[#F9F6F0] border border-transparent hover:bg-amber-500/5 px-3 py-1.5 rounded-xl"
                  }`}
                >
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile Menu Action */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full border border-amber-400/15 text-amber-400 hover:text-amber-300 hover:bg-amber-400/10 outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay formatted as floating premium 3D dock */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-4 top-[72px] z-40 md:hidden p-6 bg-gradient-to-b from-[#16120E]/90 to-[#0B0806]/95 backdrop-blur-xl border border-white/5 rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.85)]"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`flex items-center justify-center w-full transition-all duration-200 outline-none cursor-pointer ${
                      isActive 
                        ? "bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-3 rounded-xl scale-[1.02] shadow-[0_0_20px_rgba(245,158,11,0.1)] font-medium tracking-wider text-sm" 
                        : "text-neutral-400 font-medium tracking-wider text-sm hover:text-[#F9F6F0] border border-transparent hover:bg-amber-500/5 px-3 py-3 rounded-xl"
                    }`}
                  >
                    <span>{link.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
