import { motion } from "motion/react";
import cafeEntranceImg from "../assets/images/bistro_entrance_highres.png";
import coffeeImgNew from "../assets/images/coffee_highres.png";
import gardenImgNew from "../assets/images/garden_highres.png";
 
export default function AtmosphereSection() {
  const cardsData = [
    {
      label: "SANCTUARY HOURS",
      title: "Open 24/7 Everyday",
      desc: "Our doors are never locked and our lights are always on! It is a safe, warm, and friendly spot for everyone to hang out, day or night.",
      image: cafeEntranceImg,
      badge: "Open 24/7"
    },
    {
      label: "EDIBLE ART STUDIO",
      title: "Custom Photo Coffee",
      desc: "We love making your visits fun! We can print your favorite cute selfies, photos, or text directly onto your warm coffee foam and food.",
      image: coffeeImgNew,
      badge: "Edible Printing"
    },
    {
      label: "INDOOR OASIS",
      title: "Beautiful Green Garden",
      desc: "Relax on our quiet wooden tables surrounded by green plants and calming indoor waterfalls that block out the busy city noise. Perfect for a laptop session or a cute date!",
      image: gardenImgNew,
      badge: "Indoor Oasis"
    }
  ];

  const handleCardClick = (index: number) => {
    if (index === 0) {
      document.getElementById("operational-status")?.scrollIntoView({ behavior: "smooth", block: "center" });
    } else if (index === 1) {
      document.getElementById("menu")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (index === 2) {
      document.getElementById("venue-features")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section 
      id="escape" 
      className="relative pt-4 pb-20 md:pt-6 md:pb-24 px-6 md:px-12 lg:px-24 flex flex-col justify-center overflow-hidden bg-[#0B0806] border-t border-amber-900/10"
    >
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Soft Cozy Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl text-left space-y-4 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-400/10 border border-amber-400/20 rounded-full text-amber-400 font-mono text-[10px] uppercase tracking-widest font-semibold shadow-sm">
            OUR VIBE
          </div>
          <h2 className="font-serif italic text-3xl sm:text-4xl md:text-5xl text-[#F5EFE6] font-light tracking-wide leading-tight">
            The Summer Bistro Experience
          </h2>
          <p className="font-sans font-light text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-lg mt-2">
            Every corner of our sanctuary is lovingly crafted to bring you slow moments of cozy comfort, friendly vibes, and cute surprises. Have a stroll through what makes us your favorite all-day retreat!
          </p>
          <div className="h-[1px] w-20 bg-amber-400/30 mt-3" />
        </motion.div>

        {/* Dynamic 3-Card Grid with Cute Everyday Words */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {cardsData.map((card, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => handleCardClick(index)}
                className="group relative flex flex-col justify-between rounded-3xl bg-[#1c1410]/50 border border-amber-900/20 hover:border-amber-400/35 hover:bg-[#1c1410]/75 shadow-lg hover:shadow-[0_12px_40px_rgba(216,161,93,0.12)] transition-all duration-500 cursor-pointer hover:-translate-y-2 p-5"
              >
                {/* Image Layout */}
                <div className="relative w-full h-48 md:h-64 mb-4 overflow-hidden rounded-2xl shadow-md">
                  <img
                    src={card.image}
                    alt={card.title}
                    className={`w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105 ${index === 0 ? "border border-[#252317]" : ""}`}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Cute Badge over image */}
                  <div className="absolute top-4 left-4 font-mono text-[9px] uppercase tracking-widest bg-[#120E0B]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-amber-500/20 text-[#D8A15D] flex items-center font-semibold z-20">
                    {card.badge}
                  </div>
                </div>

                {/* Narrative content block */}
                <div className="p-1 flex flex-col justify-between flex-grow space-y-4">
                  <div className="space-y-2">
                    <span className="tracking-widest text-xs font-mono text-amber-500/80 block">
                      {card.label}
                    </span>
                    <h3 className="font-serif italic text-xl sm:text-2xl text-beige group-hover:text-amber-400 transition-colors duration-300 font-medium">
                      {card.title}
                    </h3>
                    <p className="font-sans font-light text-xs sm:text-sm text-neutral-300 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
