import { motion } from "motion/react";

export default function FooterSection() {
  return (
    <footer 
      id="footer" 
      className="relative bg-[#0B0806] border-t border-white/5 py-16 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* Soft warm gold spotlight glow in the background to lift space */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-amber-500/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left"
        >
          {/* Left: Standard copyright info */}
          <div className="font-mono text-[10px] md:text-xs tracking-[0.22em] text-neutral-500 select-all">
            © 2026 SUMMER BISTRO CAFÉ. ALL RIGHTS RESERVED.
          </div>

          {/* Center: Emphasized design statement with soft warm glow */}
          <div className="font-sans font-medium text-[11px] md:text-[13px] tracking-[0.08em] text-[#D8A15D] uppercase transition-all duration-300">
            CRAFTED IN HYDERABAD FOR ALL-DAY CREATIVES &amp; SUNFLOWER SOULS
          </div>

          {/* Right: Technical system layout schema */}
          <div className="font-mono text-[10px] md:text-xs tracking-[0.22em] text-neutral-500">
            SYSTEM LAYOUT V1.2
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
