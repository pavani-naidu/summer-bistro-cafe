import { motion } from "motion/react";
import logoImg from "../assets/images/logo.png";
import { Instagram, MapPin, Clock, ArrowUpRight, Heart, Coffee, Wifi, Zap } from "lucide-react";

export default function FooterSection() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer 
      id="footer" 
      className="relative bg-[#0B0806] border-t border-white/5 pt-16 pb-36 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* Background ambient effects */}
      <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-amber-500/[0.03] to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-radial-gradient bg-[radial-gradient(circle,rgba(216,161,93,0.04)_0%,transparent_70%)] blur-3xl pointer-events-none orb-pulse" />
      <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-[radial-gradient(circle,rgba(198,122,57,0.03)_0%,transparent_70%)] blur-3xl pointer-events-none orb-pulse" style={{ animationDelay: '3s' }} />

      <div className="max-w-7xl mx-auto w-full relative z-10">

        {/* Top CTA Banner Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 space-y-5"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold/5 border border-gold/15 rounded-full font-mono text-[9px] tracking-[0.2em] text-gold uppercase">
            <Heart className="w-3 h-3 fill-gold/20" /> Your Sanctuary Awaits
          </div>
          <h3 className="font-serif italic text-3xl md:text-4xl text-beige font-light leading-snug max-w-lg mx-auto">
            Visit Us Anytime,<br />Day or Night.
          </h3>
          <p className="font-sans font-light text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-md mx-auto">
            Our candles are always lit, our coffee is always fresh, and our doors are always open for you.
          </p>
          <a
            href="https://maps.app.goo.gl/RXGUdHqvZAaAHia79"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold to-[#e8b576] hover:from-white hover:to-white text-black font-mono text-[10px] font-bold uppercase tracking-[0.15em] rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
          >
            <MapPin className="w-3.5 h-3.5" />
            Get Directions
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </motion.div>

        {/* Quick Info Cards Row */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16"
        >
          <div className="p-5 rounded-2xl bg-[#141110]/80 border border-white/5 hover:border-gold/15 transition-all duration-300 text-center group">
            <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-gold/8 border border-gold/15 flex items-center justify-center group-hover:bg-gold/15 transition-all duration-300">
              <Clock className="w-4.5 h-4.5 text-gold" />
            </div>
            <span className="font-mono text-[8px] tracking-[0.2em] text-gold uppercase font-bold block mb-1">Always Open</span>
            <span className="font-sans text-xs text-neutral-300 font-light">24 hours, 7 days, 365 days a year</span>
          </div>
          <div className="p-5 rounded-2xl bg-[#141110]/80 border border-white/5 hover:border-gold/15 transition-all duration-300 text-center group">
            <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-gold/8 border border-gold/15 flex items-center justify-center group-hover:bg-gold/15 transition-all duration-300">
              <Wifi className="w-4.5 h-4.5 text-gold" />
            </div>
            <span className="font-mono text-[8px] tracking-[0.2em] text-gold uppercase font-bold block mb-1">Free High-Speed WiFi</span>
            <span className="font-sans text-xs text-neutral-300 font-light">Ultra-fast gigabit internet on all floors</span>
          </div>
          <div className="p-5 rounded-2xl bg-[#141110]/80 border border-white/5 hover:border-gold/15 transition-all duration-300 text-center group">
            <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-gold/8 border border-gold/15 flex items-center justify-center group-hover:bg-gold/15 transition-all duration-300">
              <Zap className="w-4.5 h-4.5 text-gold" />
            </div>
            <span className="font-mono text-[8px] tracking-[0.2em] text-gold uppercase font-bold block mb-1">Charging Stations</span>
            <span className="font-sans text-xs text-neutral-300 font-light">Every table has power plugs & USB ports</span>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-white/5 text-left">
          
          {/* Column 1: Brand & Logo */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src={logoImg} 
                alt="Summer Bistro Logo" 
                className="h-14 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(216,161,93,0.25)]" 
                referrerPolicy="no-referrer" 
              />
              <div className="flex flex-col">
                <span className="font-serif italic text-xl text-beige leading-none">Summer Bistro</span>
                <span className="font-mono text-[8px] tracking-[0.25em] text-[#D8A15D] uppercase mt-1">Sanctuary</span>
              </div>
            </div>
            <p className="font-sans font-light text-xs text-neutral-400 leading-relaxed max-w-sm">
              Hyderabad's first 24/7 sanctuary. A beautifully crafted refuge designed for morning espresso rituals, afternoon remote work, and cozy late-night nostalgia.
            </p>
            {/* Social Link */}
            <a 
              href="https://instagram.com/summerbistro.hyd" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/5 hover:border-gold/20 hover:bg-gold/5 rounded-xl transition-all duration-300 w-fit group"
            >
              <Instagram className="w-4 h-4 text-gold group-hover:scale-110 transition-transform duration-300" />
              <span className="font-mono text-[10px] tracking-wider text-neutral-300 group-hover:text-gold transition-colors">@summerbistro.hyd</span>
            </a>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="flex flex-col space-y-4">
            <span className="font-mono text-[9px] tracking-[0.2em] text-[#D8A15D] uppercase font-bold">Sanctuary Maps</span>
            <div className="flex flex-col space-y-1 font-sans font-light text-sm text-neutral-300">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} 
                className="hover:text-gold transition-all text-left outline-none cursor-pointer w-fit py-1.5 flex items-center gap-2 group"
              >
                <div className="w-1 h-1 rounded-full bg-gold/40 group-hover:bg-gold transition-colors" />
                Home
              </button>
              <button 
                onClick={() => scrollToSection("escape")} 
                className="hover:text-gold transition-all text-left outline-none cursor-pointer w-fit py-1.5 flex items-center gap-2 group"
              >
                <div className="w-1 h-1 rounded-full bg-gold/40 group-hover:bg-gold transition-colors" />
                Our Vibe
              </button>
              <button 
                onClick={() => scrollToSection("menu")} 
                className="hover:text-gold transition-all text-left outline-none cursor-pointer w-fit py-1.5 flex items-center gap-2 group"
              >
                <div className="w-1 h-1 rounded-full bg-gold/40 group-hover:bg-gold transition-colors" />
                Explore Menu
              </button>
              <a 
                href="https://maps.app.goo.gl/RXGUdHqvZAaAHia79"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold transition-all text-left outline-none cursor-pointer w-fit py-1.5 flex items-center gap-2 group"
              >
                <div className="w-1 h-1 rounded-full bg-gold/40 group-hover:bg-gold transition-colors" />
                Get Directions
              </a>
            </div>
          </div>

          {/* Column 3: Contact & Location */}
          <div className="flex flex-col space-y-4">
            <span className="font-mono text-[9px] tracking-[0.2em] text-[#D8A15D] uppercase font-bold">Find Us</span>
            <div className="flex flex-col space-y-3 font-sans font-light text-xs text-neutral-300">
              <a 
                href="https://maps.app.goo.gl/RXGUdHqvZAaAHia79"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 hover:text-gold transition-colors group"
              >
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="leading-relaxed">Road No. 5, Jubilee Hills,<br />Hyderabad, Telangana</span>
              </a>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-gold shrink-0" />
                <div className="flex flex-col">
                  <span className="font-semibold text-beige text-xs">Open 24/7</span>
                  <span className="text-neutral-500 text-[10px]">Every single day of the year</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Coffee className="w-4 h-4 text-gold shrink-0" />
                <div className="flex flex-col">
                  <span className="font-semibold text-beige text-xs">Specialty Coffee</span>
                  <span className="text-neutral-500 text-[10px]">Artisanal sourdough & slow-living</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Sub-Footer */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="pt-8 flex flex-col items-center gap-5 text-center"
        >
          {/* Centered logo mark */}
          <img 
            src={logoImg} 
            alt="Summer Bistro" 
            className="h-8 w-auto object-contain opacity-30" 
          />
          
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-neutral-500 text-[10px] font-mono tracking-[0.15em]">
            <span>© 2026 SUMMER BISTRO CAFÉ</span>
            <span className="hidden sm:inline text-gold/30">·</span>
            <span className="text-[#D8A15D]/60">JUBILEE HILLS, HYDERABAD</span>
            <span className="hidden sm:inline text-gold/30">·</span>
            <span>ALL RIGHTS RESERVED</span>
          </div>

          <p className="font-mono text-[8px] tracking-[0.2em] text-neutral-600 uppercase">
            Crafted with love for all-day creatives & sunflower souls
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
