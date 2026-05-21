import { motion } from "motion/react";
import { Coffee, MapPin, Calendar, Compass, Disc } from "lucide-react";

interface StickyDockProps {
  onOpenMenu: () => void;
  onOpenReserve: () => void;
}

export default function StickyDock({ onOpenMenu, onOpenReserve }: StickyDockProps) {
  return (
    <div 
      className="fixed bottom-6 inset-x-0 mx-auto w-[90%] max-w-sm h-16 z-40 select-none pb-safe pointer-events-auto"
      id="floating-navigation-dock"
    >
      {/* Dock glassmorphic body layout */}
      <div className="w-full h-full glass-dock rounded-2xl flex items-center justify-between px-3 relative shadow-[0_8px_32px_rgba(0,0,0,0.7)]">
        
        {/* Abstract decorative record player needle arm & disc */}
        <div className="absolute -top-3.5 -left-1.5 p-1 bg-card-surface border border-gold/40 rounded-full flex items-center justify-center animate-spin-slow pointer-events-none hidden xs:flex shadow-lg z-50">
          <Disc className="w-3.5 h-3.5 text-gold/90" />
          {/* Subtle centering vintage spindle pin */}
          <div className="absolute w-1 h-1 bg-gold rounded-full" />
        </div>
        {/* Tiny golden tone-arm needle pointing inwards */}
        <div className="absolute -top-4 left-3 w-3 h-0.5 bg-gradient-to-r from-gold to-gold/40 origin-left rotate-[45deg] pointer-events-none hidden xs:block z-50" />

        {/* View Menu Deck button */}
        <button
          onClick={onOpenMenu}
          id="dock-menu-btn"
          className="flex flex-col items-center justify-center flex-grow py-1 hover:text-gold text-beige/80 transition-colors cursor-pointer group outline-none"
        >
          <Coffee className="w-4.5 h-4.5 mb-1 text-gold/80 group-hover:text-gold transition-colors" />
          <span className="font-mono text-[8px] uppercase tracking-wider text-muted-beige group-hover:text-gold font-medium">
            View Menu
          </span>
        </button>

        {/* Decorative divider */}
        <div className="h-6 w-[1px] bg-gold/20 shrink-0" />

        {/* Call to reservation button */}
        <button
          onClick={onOpenReserve}
          id="dock-reserve-btn"
          className="flex flex-col items-center justify-center flex-grow py-1 hover:text-gold text-beige/80 transition-colors cursor-pointer group outline-none"
        >
          <Calendar className="w-4.5 h-4.5 mb-1 text-gold/80 group-hover:text-gold transition-colors" />
          <span className="font-mono text-[8px] uppercase tracking-wider text-muted-beige group-hover:text-gold font-medium">
            Reserve
          </span>
        </button>

        {/* Decorative divider */}
        <div className="h-6 w-[1px] bg-gold/20 shrink-0" />

        {/* Locate map anchor button */}
        <a
          href="https://maps.app.goo.gl/RXGUdHqvZAaAHia79"
          target="_blank"
          rel="noopener noreferrer"
          id="dock-locate-link"
          className="flex flex-col items-center justify-center flex-grow py-1 text-beige/80 hover:text-gold transition-colors group select-none outline-none"
        >
          <MapPin className="w-4.5 h-4.5 mb-1 text-gold/80 group-hover:text-gold transition-colors" />
          <span className="font-mono text-[8px] uppercase tracking-wider text-muted-beige group-hover:text-gold font-medium">
            Locate
          </span>
        </a>

        {/* Central visual pulse indicator to match Hyderabad Night Lounge theme */}
        <div className="absolute right-3 -top-1 flex h-2 w-2 select-none pointer-events-none">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
        </div>

      </div>
    </div>
  );
}
