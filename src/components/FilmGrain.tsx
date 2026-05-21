import { motion } from "motion/react";

export default function FilmGrain() {
  return (
    <div 
      className="fixed inset-0 w-full h-full pointer-events-none z-50 opacity-[0.035] film-grain-layer mix-blend-overlay"
      id="film-grain-overlay"
    />
  );
}
