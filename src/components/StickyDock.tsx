import { useState, Fragment } from "react";
import { motion } from "motion/react";
import { Coffee, MapPin, Calendar } from "lucide-react";

interface StickyDockProps {
  onOpenMenu: () => void;
  onOpenReserve: () => void;
}

export default function StickyDock({ onOpenMenu, onOpenReserve }: StickyDockProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const items = [
    {
      label: "View Menu",
      icon: Coffee,
      action: onOpenMenu,
      id: "dock-menu-btn"
    },
    {
      label: "Reserve",
      icon: Calendar,
      action: onOpenReserve,
      id: "dock-reserve-btn"
    },
    {
      label: "Locate",
      icon: MapPin,
      href: "https://maps.app.goo.gl/RXGUdHqvZAaAHia79",
      id: "dock-locate-link"
    }
  ];

  return (
    <div 
      className="fixed bottom-6 inset-x-0 mx-auto w-[90%] max-w-sm h-16 z-40 select-none pb-safe pointer-events-auto"
      id="floating-navigation-dock"
    >
      {/* Dock glassmorphic body layout with a subtle ambient gold shadow and warm gradient background */}
      <div className="w-full h-full bg-gradient-to-b from-[#251b17]/95 to-[#1c1411]/98 backdrop-blur-xl border border-gold/20 rounded-2xl flex items-center justify-between px-2 relative shadow-[0_12px_40px_rgba(0,0,0,0.85),_0_0_20px_rgba(216,161,93,0.12)]">
        
        {/* Sleek pulsing status tag inside the dock for a clean premium vibe */}
        <div className="absolute right-4 -top-2 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#181310]/95 border border-gold/30 shadow-[0_4px_12px_rgba(0,0,0,0.5)] select-none pointer-events-none">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-80" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gold" />
          </span>
          <span className="font-mono text-[7px] uppercase tracking-[0.15em] text-gold font-bold">24/7 Live</span>
        </div>

        {items.map((item, idx) => {
          const Icon = item.icon;
          const isHovered = hoveredIdx === idx;
          
          const content = (
            <div className="flex flex-col items-center justify-center py-2 h-full z-10 w-full transition-all duration-300">
              <motion.div
                animate={
                  isHovered
                    ? idx === 0
                      ? { rotate: [0, -10, 10, -5, 5, 0], scale: 1.18 }
                      : idx === 1
                      ? { y: [0, -5, 2, -2, 0], scale: 1.18 }
                      : { y: [0, -6, 0], scale: 1.18 }
                    : { rotate: 0, y: 0, scale: 1 }
                }
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="mb-1 text-gold/80 group-hover:text-gold transition-colors duration-300"
              >
                <Icon className="w-[18px] h-[18px] stroke-[1.8]" />
              </motion.div>
              <span className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-muted-beige group-hover:text-gold transition-colors duration-300 font-semibold">
                {item.label}
              </span>
            </div>
          );

          return (
            <Fragment key={item.label}>
              {idx > 0 && <div className="h-6 w-[1px] bg-gold/15 shrink-0 pointer-events-none" />}
              
              <div 
                className="relative flex-1 h-12 flex items-center justify-center group"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Smooth sliding magnetic pill selection indicator */}
                {isHovered && (
                  <motion.div
                    layoutId="dock-hover-highlight"
                    className="absolute inset-0 bg-gold/8 rounded-xl border border-gold/15 shadow-[inset_0_1px_4px_rgba(218,161,93,0.05)] -z-0"
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  />
                )}
                
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={item.id}
                    className="w-full h-full flex items-center justify-center outline-none select-none cursor-pointer"
                  >
                    {content}
                  </a>
                ) : (
                  <button
                    onClick={item.action}
                    id={item.id}
                    className="w-full h-full flex items-center justify-center outline-none cursor-pointer"
                  >
                    {content}
                  </button>
                )}
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

