import { motion } from "motion/react";
import { menuItems } from "../types";
import { X, Award, ArrowUpRight, Sparkles } from "lucide-react";

interface MenuOverlayProps {
  key?: string;
  isOpen: boolean;
  onClose: () => void;
  onOpenReservation: () => void;
}

export default function MenuOverlay({ isOpen, onClose, onOpenReservation }: MenuOverlayProps) {
  if (!isOpen) return null;

  // Group items by category for highly legible cookbook-style list layout
  const categories = ["Coffee", "Matcha", "Pizza", "Savory", "Special"] as const;

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
      className="fixed inset-0 w-full h-[100dvh] bg-[#181310] z-50 flex flex-col"
      id="modal-menu-container"
    >
      {/* Fixed Header (Never overlaps content on scroll) */}
      <div className="w-full bg-[#181310] border-b border-gold/15 shrink-0 px-6 md:px-12 py-4 z-20 relative">
        <div className="w-full max-w-3xl mx-auto flex justify-between items-center">
          <div className="flex flex-col">
            <span className="font-serif italic text-2xl text-gold">Summer Bistro Deck</span>
            <span className="font-mono text-[9px] tracking-widest text-muted-beige mt-0.5">24/7 COMPLETE SPECIFICATIONS</span>
          </div>
          <button
            onClick={onClose}
            id="menu-overlay-close-btn"
            className="p-3 bg-beige/5 border border-beige/10 hover:border-gold hover:bg-gold/10 rounded-full transition-all cursor-pointer text-beige flex items-center justify-center outline-none"
          >
            <X className="w-5 h-5 text-beige" />
          </button>
        </div>
      </div>

      {/* Scrollable content container */}
      <div className="flex-grow overflow-y-auto px-6 md:px-12 pb-24 pt-8">
        <div className="w-full max-w-3xl mx-auto flex flex-col justify-start space-y-16">
          
          {/* Book Header Intro */}
          <div className="text-center space-y-4 max-w-xl mx-auto py-4 border-b border-gold/10">
            <Award className="w-8 h-8 text-gold mx-auto opacity-75 animate-[pulse_3s_infinite]" />
            <h2 className="font-serif italic text-3xl md:text-4xl text-beige font-light">
              “Flavor belongs to the patient.”
            </h2>
            <p className="font-sans font-light text-sm text-muted-beige leading-relaxed">
              Every item at Summer Bistro Hyderabad is prepared à la minute with artisanal sourdough fats, locally roasted high mountain beans, and organic dairy matrices.
            </p>
          </div>

          {/* Grouped Catalog items */}
          {categories.map((category) => {
            const itemsInCategory = menuItems.filter(item => item.category === category);
            return (
              <div key={category} className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="font-serif italic text-xl md:text-2xl text-gold font-light">{category} Selection</span>
                  <div className="h-[1px] flex-grow bg-gold/15" />
                  <span className="font-mono text-[9px] text-muted-beige/60 tracking-widest uppercase">{itemsInCategory.length} recipes</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {itemsInCategory.map((item) => (
                    <div 
                      key={item.name} 
                      className="p-5 rounded-lg bg-card-surface border border-gold/15 flex flex-col justify-between hover:border-gold/30 transition-all duration-300 hover:bg-card-surface/90"
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between items-baseline gap-2">
                          <h4 className="font-serif italic text-lg md:text-xl text-beige font-medium">
                            {item.name}
                          </h4>
                          <span className="font-mono text-sm text-gold font-semibold shrink-0">
                            {item.price}
                          </span>
                        </div>
                        <p className="font-sans font-light text-xs text-muted-beige leading-relaxed">
                          {item.ingredients}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gold/10">
                        {item.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="font-mono text-[7.5px] uppercase tracking-wider text-gold/60 bg-gold/5 border border-gold/10 px-2 py-0.5 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Clean & Cute Glassmorphic Cozy Reservation CTA card */}
          <div className="p-8 rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/10 text-center space-y-6 shadow-[0_8px_32px_0_rgba(216,161,93,0.08)] relative overflow-hidden group">
            {/* Subtle elegant glowing background decorations */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/10 transition-all duration-750" />
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-[#cc7b43]/5 rounded-full blur-2xl pointer-events-none group-hover:bg-[#cc7b43]/10 transition-all duration-750" />

            <div className="max-w-md mx-auto space-y-3 relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full font-mono text-[9px] tracking-widest text-[#D8A15D] uppercase">
                <Sparkles className="w-3 h-3 text-[#D8A15D] animate-pulse" />
                <span>COZY SPOT</span>
                <Sparkles className="w-3 h-3 text-[#D8A15D] animate-pulse" />
              </div>
              <h3 className="font-serif italic text-2xl md:text-3xl text-beige font-light leading-snug">
                Fancy a sweet corner spot tonight?
              </h3>
              <p className="font-sans font-light text-xs text-muted-beige/90 leading-relaxed max-w-sm mx-auto">
                Save a lovely private table right next to our retro vinyl record player. Perfect for romantic dates, quiet study, or just relaxing with good tunes.
              </p>
            </div>

            <div className="relative z-10">
              <button
                onClick={() => {
                  onClose();
                  onOpenReservation();
                }}
                id="menu-overlay-reserve-shortcut"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#D8A15D] to-[#cc7b43] hover:from-[#faf6ee] hover:to-[#faf6ee] text-black font-semibold rounded-full transform hover:scale-[1.03] active:scale-95 transition-all duration-300 font-mono tracking-widest text-[10px] uppercase shadow-lg shadow-amber-500/5 cursor-pointer border-0"
              >
                Book My Cozy Table <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}



