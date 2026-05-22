import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Coffee, MapPin, Calendar, Clock, Instagram, ArrowRight, Sparkles, Utensils, Laptop, Wifi, Smartphone } from "lucide-react";
import logoImg from "../assets/images/logo.png";

interface HeroSectionProps {
  onOpenMenu: () => void;
  onOpenReserve: () => void;
}

// Pre-generate particles so they don't re-randomize on every render
const PARTICLES = Array.from({ length: 15 }).map((_, i) => ({
  id: i,
  size: 2 + (i * 7 % 5),
  left: 10 + (i * 13 % 80),
  bottom: 5 + (i * 7 % 15),
  duration: 4 + (i * 3 % 5),
  delay: (i * 1.1) % 5,
  driftX: -30 + (i * 11 % 60),
  opacity: 0.15 + (i * 0.03 % 0.3),
}));

export default function HeroSection({ onOpenMenu, onOpenReserve }: HeroSectionProps) {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentPeriod, setCurrentPeriod] = useState<string>("AM");
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (y - 0.5) * -20, y: (x - 0.5) * 20 });
  };
  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  useEffect(() => {
    const updateTime = () => {
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      const parts = formatter.formatToParts(new Date());
      const hour = parts.find(p => p.type === "hour")?.value || "";
      const minute = parts.find(p => p.type === "minute")?.value || "";
      const second = parts.find(p => p.type === "second")?.value || "";
      const dayPeriod = parts.find(p => p.type === "dayPeriod")?.value || "AM";

      setCurrentTime(`${hour}:${minute}:${second}`);
      setCurrentPeriod(dayPeriod);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="hero" 
      className="relative min-h-screen w-full bg-[#0B0806] flex flex-col justify-between overflow-hidden pt-24 md:pt-28"
    >
      {/* Editorial Decorative Background Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
      
      {/* Abstract warm golden glowing spheres creating modern depth */}
      <div className="absolute w-[500px] h-[500px] bg-gradient-to-tr from-amber-500/5 to-transparent rounded-full -top-[120px] -left-[120px] filter blur-[120px] pointer-events-none orb-pulse" />
      <div className="absolute w-[600px] h-[600px] bg-gradient-to-bl from-amber-600/5 to-transparent rounded-full -right-[150px] -bottom-[150px] filter blur-[140px] pointer-events-none orb-pulse" style={{ animationDelay: '3s' }} />

      {/* Floating Coffee Steam Particles */}
      {PARTICLES.map((p) => (
        <div
          key={`particle-${p.id}`}
          className="steam-particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            bottom: `${p.bottom}%`,
            background: `radial-gradient(circle, rgba(216, 161, 93, ${p.opacity}) 0%, transparent 70%)`,
            animation: `float-up ${p.duration}s ease-out ${p.delay}s infinite`,
            '--drift-x': `${p.driftX}px`,
          } as React.CSSProperties}
        />
      ))}

      {/* CORE SPLIT-SCREEN VIEWPORT MAIN HERO */}
      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 my-auto py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
        
        {/* LEFT COLUMN: Editorial Copy & Clock Widget */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-8 max-w-2xl">
          
          {/* Status widgets row */}
          <div className="flex flex-wrap items-center gap-3.5 w-full">
            {/* Clock Widget */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-4 px-5 py-2.5 rounded-full bg-amber-950/20 hover:bg-amber-950/30 border border-amber-500/20 shadow-xl backdrop-blur-xl select-none transition-all duration-500 group/time"
            >
              <div className="p-1.5 rounded-full bg-amber-400/10 text-amber-400 shadow-inner group-hover/time:scale-110 transition-transform">
                <Clock className="w-3.5 h-3.5 animate-pulse text-amber-400" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[7px] tracking-[0.25em] text-neutral-400 uppercase leading-none mb-0.5 font-medium">
                  Cafe Time
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="font-mono text-sm tracking-wide text-amber-400 font-bold">
                    {currentTime || "10:19:09"}
                  </span>
                  <span className="font-mono text-[8px] text-[#D8A15D] uppercase font-bold tracking-wider">
                    {currentPeriod}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Symmetrical 24/7 Open Indicator */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.1 }}
              className="flex items-center gap-2 px-5 py-3 border border-amber-500/20 rounded-full bg-amber-500/[0.08] hover:bg-amber-500/[0.12] backdrop-blur-md shadow-xl text-amber-400 select-none font-medium transition-colors"
            >
              <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#f59e0b]" />
              <span className="font-mono text-[10px] tracking-wider uppercase font-bold">
                24/7 Open
              </span>
            </motion.div>

            {/* Social connection handle */}
            <motion.a
              href="https://www.instagram.com/summerbistro.hyd?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="flex items-center gap-2 px-4 py-2.5 border border-amber-500/15 hover:border-amber-400/40 rounded-full bg-white/[0.03] hover:bg-white/[0.08] backdrop-blur-md transition-all group duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(216,161,93,0.15)] outline-none"
              title="Follow Summer Bistro on Instagram"
            >
              <div className="p-1 bg-amber-400/10 rounded-full group-hover:bg-amber-400/20 transition-all">
                <Instagram className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <span className="font-mono text-[10px] tracking-wider text-beige/80 group-hover:text-amber-300 uppercase font-semibold mt-0.5">
                @summerbistro.hyd
              </span>
            </motion.a>
          </div>

          {/* Crystalline High-Conversion Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotateY: -8, z: -60, filter: 'blur(3px)' }}
            animate={{ opacity: 1, y: 0, rotateY: 0, z: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
            style={{ perspective: '1000px' }}
          >
            <h1 className="font-serif italic font-light text-4xl sm:text-5xl md:text-[4rem] lg:text-7xl text-[#f5efe6] tracking-tight leading-[1.08]">
              Specialty Coffee, <br />
              <span className="text-[#D8A15D]">Artisanal Sourdough</span> <span className="font-sans font-extralight text-beige/50">&amp;</span> Slow-Living.
            </h1>
            
            <p className="font-sans font-light text-sm md:text-base text-muted-beige/85 leading-relaxed max-w-xl pr-4">
              Hyderabad’s first 24/7 sanctuary. A beautifully crafted refuge designed for morning espresso rituals, afternoon remote work, and cozy late-night nostalgia.
            </p>
          </motion.div>

          {/* Editorial Action Buttons Bundle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
          >
            {/* CTA 1: View Menu */}
            <button
              onClick={onOpenMenu}
              className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-[#D8A15D] hover:bg-white text-black font-serif italic text-lg font-medium transition-all duration-300 rounded-xl cursor-pointer outline-none shadow-lg shadow-amber-950/25"
            >
              <Coffee className="w-4 h-4 text-black group-hover:scale-110 transition-transform" />
              <span>Explore Menu</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* CTA 2: Reserve Spot */}
            <button
              onClick={onOpenReserve}
              className="flex items-center justify-center gap-2.5 px-7 py-4 border border-amber-900/40 hover:border-[#D8A15D] bg-[#120E0B]/60 hover:bg-[#120E0B] text-[#D8A15D] font-mono text-xs uppercase tracking-widest transition-all duration-300 rounded-xl cursor-pointer outline-none"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Reserve Table</span>
            </button>

            {/* CTA 3: Location Link */}
            <a
              href="https://maps.app.goo.gl/RXGUdHqvZAaAHia79"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-3 px-4 font-mono text-[10px] text-beige/60 hover:text-[#D8A15D] uppercase tracking-widest transition-all text-center"
            >
              <MapPin className="w-3.5 h-3.5 text-[#D8A15D]" /> Locate Sanctuary
            </a>
          </motion.div>

        </div>

        {/* RIGHT COLUMN: 3D Perspective Stacked Luxury Cards */}
        <div
          className="lg:col-span-5 relative flex items-center justify-center h-[380px] sm:h-[460px] w-full pt-10 lg:pt-0"
          style={{ perspective: '1000px' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          
          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotateY: 12, z: -80 }}
            animate={{
              opacity: 1, scale: 1,
              rotateX: tilt.x, rotateY: tilt.y,
              z: 0,
            }}
            transition={{
              duration: 1.6, ease: [0.16, 1, 0.3, 1],
              rotateX: { type: 'spring', stiffness: 150, damping: 15 },
              rotateY: { type: 'spring', stiffness: 150, damping: 15 },
            }}
            className="relative w-full max-w-[420px] h-full"
            style={{ transformStyle: 'preserve-3d' }}
          >
            
            {/* Card 1 (Bottom Sourdough Pizza Card) */}
            <div 
              className="absolute left-2 bottom-4 w-[85%] aspect-[4/3] rounded-2xl overflow-hidden border border-amber-900/30 bg-[#120E0B] shadow-2xl transition-all duration-700 ease-out transform -rotate-6 translate-y-3 hover:-translate-y-1 hover:rotate-[-3deg] hover:scale-102 group border-opacity-70 cursor-pointer"
              onClick={onOpenMenu}
            >
              <img
                src="https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=800&auto=format&fit=crop"
                alt="Artisanal stone-baked wood-fired pizza and sourdough bread"
                className="w-full h-full object-cover filter brightness-[0.7] saturate-[0.85] transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {/* Sleek Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0806] via-transparent to-black/20" />
              
              {/* Caption Tag */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div>
                  <span className="font-mono text-[8px] text-amber-500 tracking-widest uppercase block mb-0.5">FOOD CRAFT</span>
                  <p className="font-serif italic text-beige text-sm">Artisanal Sourdough Pizza</p>
                </div>
                <div className="p-1.5 rounded-lg bg-[#0B0806]/90 border border-amber-900/40">
                  <Utensils className="w-3.5 h-3.5 text-amber-500" />
                </div>
              </div>
            </div>

            {/* Card 2 (Top Steaming Morning Latte Art Card) */}
            <div
              className="absolute right-2 top-4 w-[85%] aspect-[4/3] rounded-2xl overflow-hidden border border-[#D8A15D]/40 bg-[#120E0B] shadow-2xl z-10 transition-all duration-700 ease-out transform rotate-3 hover:rotate-1 hover:-translate-y-2 hover:scale-[1.03] hover:shadow-[0_20px_50px_rgba(216,161,93,0.18)] group cursor-pointer"
              onClick={onOpenMenu}
            >
              <img
                src="https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800&auto=format&fit=crop"
                alt="Steaming double espresso latte art with complex warm crema textures"
                className="w-full h-full object-cover filter brightness-90 saturate-[0.9] transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {/* Golden Sunrays Overcast effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#120E0B]/80 via-transparent to-amber-500/10 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

              {/* Floating Dynamic Badge */}
              <div className="absolute top-4 left-4 font-mono text-[8.5px] uppercase tracking-widest bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-amber-500/30 text-[#D8A15D] flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-[#D8A15D] animate-pulse" /> Specialty Single-Estate
              </div>

              {/* Caption details bottom */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div>
                  <span className="font-mono text-[8px] text-[#D8A15D] tracking-widest uppercase block mb-0.5">BARISTA RESERVE</span>
                  <p className="font-serif italic text-white text-base">Velvety Rose Latte</p>
                </div>
                <div className="p-1.5 rounded-lg bg-black/80 border border-amber-500/30">
                  <Coffee className="w-3.5 h-3.5 text-[#D8A15D]" />
                </div>
              </div>
            </div>

          </motion.div>

        </div>

      </div>

      {/* CUTE AMAZINGLY COZY CAFE AMENITIES PANEL */}
      <div className="relative w-full max-w-7xl mx-auto px-6 pb-12 md:px-12 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="w-full bg-[#120E0B]/85 hover:bg-[#120E0B]/95 border border-amber-500/20 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl transition-all duration-300"
        >
          {/* Badge */}
          <div className="flex items-center gap-2 mb-6 w-fit px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-400 select-none">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#f59e0b]" />
            <span className="font-mono text-[10px] uppercase tracking-widest font-bold">
              OUR COZY CAFE AMENITIES
            </span>
          </div>

          {/* List of 4 cozy cafe amenities with cute icons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Amenity 1 */}
            <div className="flex items-start gap-3.5 group">
              <div className="p-3 rounded-2xl bg-amber-400/10 border border-amber-400/25 text-amber-400 group-hover:scale-110 group-hover:bg-amber-400/20 transition-all duration-300 shadow-sm">
                <Coffee className="w-4.5 h-4.5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-serif italic text-beige font-medium text-sm">Delicious fresh coffee</h4>
                <p className="font-sans text-xxs text-muted-beige/60">Brewed with single-estate reserve beans</p>
              </div>
            </div>

            {/* Amenity 2 */}
            <div className="flex items-start gap-3.5 group">
              <div className="p-3 rounded-2xl bg-amber-400/10 border border-amber-400/25 text-amber-400 group-hover:scale-110 group-hover:bg-amber-400/20 transition-all duration-300 shadow-sm">
                <Laptop className="w-4.5 h-4.5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-serif italic text-beige font-medium text-sm">Quiet wooden tables</h4>
                <p className="font-sans text-xxs text-muted-beige/60">Crafted workstations with plenty of charging plugs</p>
              </div>
            </div>

            {/* Amenity 3 */}
            <div className="flex items-start gap-3.5 group">
              <div className="p-3 rounded-2xl bg-amber-400/10 border border-amber-400/25 text-amber-400 group-hover:scale-110 group-hover:bg-amber-400/20 transition-all duration-300 shadow-sm">
                <Wifi className="w-4.5 h-4.5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-serif italic text-beige font-medium text-sm">Super fast, free Wi-Fi</h4>
                <p className="font-sans text-xxs text-muted-beige/60">Always online, ultra-reliable gigabit speeds</p>
              </div>
            </div>

            {/* Amenity 4 */}
            <div className="flex items-start gap-3.5 group">
              <div className="p-3 rounded-2xl bg-amber-400/10 border border-amber-400/25 text-amber-400 group-hover:scale-110 group-hover:bg-amber-400/20 transition-all duration-300 shadow-sm">
                <Smartphone className="w-4.5 h-4.5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-serif italic text-beige font-medium text-sm">Digital Friendly</h4>
                <p className="font-sans text-xxs text-muted-beige/60">100% laptop and phone friendly all day and night!</p>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
