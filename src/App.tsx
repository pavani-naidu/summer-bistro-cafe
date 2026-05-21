import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";

// Import modular layouts
import FilmGrain from "./components/FilmGrain";
import CustomCursor from "./components/CustomCursor";
import NavigationBar from "./components/NavigationBar";
import HeroSection from "./components/HeroSection";
import AtmosphereSection from "./components/AtmosphereSection";
import MenuSection from "./components/MenuSection";
import MenuOverlay from "./components/MenuOverlay";
import ReservationOverlay from "./components/ReservationOverlay";
import FooterSection from "./components/FooterSection";
import StickyDock from "./components/StickyDock";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isReserveOpen, setIsReserveOpen] = useState(false);
  
  // Theme state representing position visual backdrop
  // Sunset (terracotta) -> Twilight (espresso) -> Midnight (midnight)
  const [activeTheme, setActiveTheme] = useState<"terracotta" | "espresso" | "midnight">("terracotta");

  // Track scroll section intersection markers using IntersectionObserver
  useEffect(() => {
    const observerOptions = {
      root: null, // viewport native
      rootMargin: "-25% 0px -25% 0px", // Trigger when section occupies core display focus
      threshold: 0.1, // percentage of target elements visible
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          if (sectionId === "hero") {
            setActiveTheme("terracotta");
          } else if (sectionId === "escape") {
            setActiveTheme("espresso");
          } else if (sectionId === "menu") {
            setActiveTheme("midnight");
          } else if (sectionId === "footer") {
            setActiveTheme("midnight");
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    const observeTargets = ["hero", "escape", "menu", "footer"];
    observeTargets.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      observeTargets.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  // OVERLAY SCROLL LOCK (CRITICAL REQUIREMENT)
  useEffect(() => {
    const isOverlayActive = isMenuOpen || isReserveOpen;
    const bodyEl = document.body;
    const htmlEl = document.documentElement;

    if (isOverlayActive) {
      bodyEl.classList.add("no-scroll");
      htmlEl.classList.add("no-scroll");
    } else {
      bodyEl.classList.remove("no-scroll");
      htmlEl.classList.remove("no-scroll");
    }

    return () => {
      bodyEl.classList.remove("no-scroll");
      htmlEl.classList.remove("no-scroll");
    };
  }, [isMenuOpen, isReserveOpen]);

  // Determine container style based on active theme index
  const getThemeBgClass = () => {
    switch (activeTheme) {
      case "terracotta":
        return "bg-terracotta text-[#F8F5F2]";
      case "espresso":
        return "bg-espresso text-[#F8F5F2]";
      case "midnight":
        return "bg-midnight text-[#F8F5F2]";
      default:
        return "bg-terracotta text-[#F8F5F2]";
    }
  };

  return (
    <div 
      className={`min-h-screen w-full relative transition-colors duration-[1500ms] ease-out ${getThemeBgClass()}`}
      id="root-theme-container"
    >
      {/* Cinematic Film Grain Overlay */}
      <FilmGrain />

      {/* Decorative desktop tracking cream cursor */}
      <CustomCursor />

      {/* Sticky Top Floating Navigation Bar */}
      <NavigationBar />

      {/* Primary Landing Story Sections */}
      <main className="w-full relative transition-[transform] duration-500">
        
        {/* Section 1: The Sanctuary Gate (Hero) */}
        <HeroSection 
          onOpenMenu={() => setIsMenuOpen(true)} 
          onOpenReserve={() => setIsReserveOpen(true)} 
        />

        {/* Section 2: The Nocturnal Escape Atmosphere */}
        <AtmosphereSection />

        {/* Section 3: The All-Night Menu */}
        <MenuSection onOpenReservation={() => setIsReserveOpen(true)} />

        {/* Section 4: The Midnight Conversion Footer */}
        <FooterSection />

      </main>

      {/* Floating Sticky Mobile / Unified Navigation Dock */}
      <StickyDock 
        onOpenMenu={() => setIsMenuOpen(true)} 
        onOpenReserve={() => setIsReserveOpen(true)} 
      />

      {/* Sliding Dialog overlays inside AnimatePresence to facilitate perfect exit cubic shifts */}
      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <MenuOverlay 
            key="menu-panel-deck"
            isOpen={isMenuOpen} 
            onClose={() => setIsMenuOpen(false)} 
            onOpenReservation={() => setIsReserveOpen(true)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isReserveOpen && (
          <ReservationOverlay 
            key="reservation-panel-deck"
            isOpen={isReserveOpen} 
            onClose={() => setIsReserveOpen(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
