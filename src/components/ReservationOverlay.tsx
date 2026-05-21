import { useState, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IntentPill, ReservationForm } from "../types";
import { X, Calendar, User, Phone, Users, Clock, Compass, ShieldCheck, HelpCircle, Heart, Star } from "lucide-react";

interface ReservationOverlayProps {
  key?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ReservationOverlay({ isOpen, onClose }: ReservationOverlayProps) {
  const [formData, setFormData] = useState<ReservationForm>({
    fullName: "",
    phone: "",
    date: new Date().toISOString().split('T')[0], // default to current digital time date
    time: "21:00",
    guests: "2",
    intent: "Date Night",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successBooking, setSuccessBooking] = useState<{ code: string } | null>(null);

  const intentPills: IntentPill[] = ["Date Night", "Content Creation", "Late Chill", "Coffee Network"];
  const guestCounts = ["1", "2", "3", "4", "5", "6", "7", "8+"];

  const handleIntentClick = (intent: IntentPill) => {
    setFormData(prev => ({ ...prev, intent }));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      alert("Please provide custom credentials so we can clear your table.");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate a pristine concierge check-in delay (slow indie pace)
    setTimeout(() => {
      setIsSubmitting(false);
      // Generate a unique luxurious boarding ticket style code
      const uniqueCode = "SBR-" + Math.floor(1000 + Math.random() * 9000).toString() + "-X";
      setSuccessBooking({ code: uniqueCode });
    }, 1800);
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      phone: "",
      date: new Date().toISOString().split('T')[0],
      time: "21:00",
      guests: "2",
      intent: "Date Night",
    });
    setSuccessBooking(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
      className="fixed inset-x-0 bottom-0 top-0 w-full h-[100dvh] bg-[#181310]/98 backdrop-blur-2xl z-50 overflow-y-auto flex flex-col justify-start py-8 px-6 md:px-12"
      id="modal-reservation-container"
    >
      {/* Header element */}
      <div className="sticky top-0 bg-[#181310]/95 backdrop-blur-md py-4 border-b border-gold/15 flex justify-between items-center z-20 w-full max-w-2xl mx-auto">
        <div className="flex flex-col">
          <span className="font-serif italic text-2xl text-gold">Concierge Host</span>
          <span className="font-mono text-[9px] tracking-widest text-[#D8A15D] uppercase mt-0.5">ESTABLISHING BOOTH ALLOCATION</span>
        </div>
        <button
          onClick={handleReset}
          id="reservation-overlay-close-btn"
          className="p-3 bg-beige/5 border border-beige/12 hover:border-gold hover:bg-gold/10 rounded-full transition-all cursor-pointer text-beige flex items-center justify-center outline-none"
        >
          <X className="w-5 h-5 text-beige" />
        </button>
      </div>

      <div className="w-full max-w-xl mx-auto flex-grow flex flex-col justify-center my-8">
        <AnimatePresence mode="wait">
          {!successBooking ? (
            <motion.div
              key="reservation-form-deck"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Introduction typography */}
              <div className="space-y-3 prose text-center sm:text-left">
                <span className="font-mono text-[9px] text-[#D8A15D] tracking-[0.25em] uppercase flex items-center justify-center sm:justify-start gap-1.5 font-semibold">
                  <Compass className="w-3.5 h-3.5" /> SECURING JUBILEE HILLS CORNER
                </span>
                <h2 className="font-serif italic text-3xl md:text-4xl text-beige">
                  Plan Your Midnight Rest
                </h2>
                <p className="font-sans font-light text-sm text-muted-beige leading-relaxed">
                  We maintain a limited grid of booths on Road No. 5 to protect our candle-lit ambient acoustics. Bookings are non-chargeable, managed as digital boarding passes.
                </p>
              </div>

              {/* Form elements */}
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Intent Pills Selection Module */}
                <div className="space-y-3">
                  <label className="font-mono text-[9px] uppercase tracking-widest text-gold/80 block">
                    What is the tone of your visit?
                  </label>
                  <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                    {intentPills.map((pill) => {
                      const isSelected = formData.intent === pill;
                      return (
                        <button
                          type="button"
                          key={pill}
                          onClick={() => handleIntentClick(pill)}
                          className={`px-4 py-2.5 rounded-md font-mono text-[10px] uppercase tracking-wider text-center transition-all cursor-pointer flex-grow border ${
                            isSelected
                              ? "bg-gold text-black font-semibold border-gold shadow-[0_0_12px_rgba(216,161,93,0.25)]"
                              : "bg-card-surface text-muted-beige border-gold/10 hover:border-gold/25"
                          }`}
                        >
                          {pill === "Date Night" && "❤️ "}
                          {pill === "Content Creation" && "📷 "}
                          {pill === "Late Chill" && "☕ "}
                          {pill === "Coffee Network" && "💼 "}
                          {pill}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Grid Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name field */}
                  <div className="space-y-2">
                    <label className="font-mono text-[9px] uppercase tracking-widest text-gold/80 flex items-center gap-1">
                      <User className="w-3 h-3" /> Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full bg-card-surface border border-gold/15 rounded-md py-3 px-4 text-sm text-beige placeholder-muted-beige/40 outline-none focus:border-gold transition-colors font-sans"
                    />
                  </div>

                  {/* Phone field */}
                  <div className="space-y-2">
                    <label className="font-mono text-[9px] uppercase tracking-widest text-gold/80 flex items-center gap-1">
                      <Phone className="w-3 h-3" /> Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-card-surface border border-gold/15 rounded-md py-3 px-4 text-sm text-beige placeholder-muted-beige/40 outline-none focus:border-gold transition-colors font-sans"
                    />
                  </div>
                </div>

                {/* Date & Time Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Date selection */}
                  <div className="space-y-2">
                    <label className="font-mono text-[9px] uppercase tracking-widest text-gold/80 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> Date of Escape
                    </label>
                    <input
                      type="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full bg-card-surface border border-gold/15 rounded-md py-3 px-4 text-sm text-beige outline-none focus:border-gold transition-colors font-sans font-mono"
                    />
                  </div>

                  {/* Time selection */}
                  <div className="space-y-2">
                    <label className="font-mono text-[9px] uppercase tracking-widest text-gold/80 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Midnight Hour
                    </label>
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="w-full bg-card-surface border border-gold/15 rounded-md py-3 px-4 text-sm text-beige outline-none focus:border-gold transition-colors font-sans font-mono cursor-pointer"
                    >
                      <option value="18:00">06:00 PM (Sunset)</option>
                      <option value="19:30">07:30 PM (Twilight)</option>
                      <option value="21:00">09:00 PM (Candle Lit)</option>
                      <option value="22:30">10:30 PM (Jazz Hour)</option>
                      <option value="00:00">12:00 AM (The Midnight)</option>
                      <option value="02:00">02:00 AM (Deep Calm)</option>
                      <option value="04:30">04:30 AM (Breathe Dew)</option>
                    </select>
                  </div>
                </div>

                {/* Seating Guest Selection */}
                <div className="space-y-3">
                  <label className="font-mono text-[9px] uppercase tracking-widest text-gold/80 flex items-center gap-1">
                    <Users className="w-3 h-3" /> Guests Count
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                    {guestCounts.map((count) => {
                      const isSelected = formData.guests === count;
                      return (
                        <button
                          type="button"
                          key={count}
                          onClick={() => setFormData(prev => ({ ...prev, guests: count }))}
                          className={`py-2 rounded font-mono text-xs border transition-all cursor-pointer ${
                            isSelected
                              ? "bg-gold text-black font-semibold border-gold"
                              : "bg-card-surface text-muted-beige border-gold/10 hover:bg-card-surface-light hover:text-beige"
                          }`}
                        >
                          {count}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Concierge rules agreement */}
                <div className="p-4 bg-[#1F1714] rounded border border-gold/15 flex gap-3 text-left">
                  <ShieldCheck className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <span className="font-mono text-[8.5px] leading-relaxed text-muted-beige/70">
                    BY TAPPING BELOW, YOU ACKNOWLEDGE THE SANCTUARY SPIRIT: WE RESPECT LATE CHILL SILENCE AND PREVENT BRIGHT PORTABLE RING LIGHTS IN PRIMARY BOOTHS.
                  </span>
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  id="submit-reservation-btn"
                  className="w-full py-4 bg-gold hover:bg-[#F2ECE4] text-black font-mono text-xs font-bold uppercase tracking-[0.2em] rounded-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-[0.99]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      ALIGNED RECORDINGS IN PROGRESS...
                    </>
                  ) : (
                    "Secure Seat Allocation"
                  )}
                </button>
              </form>
            </motion.div>
          ) : (
            /* Concierge Boarding confirmation pass */
            <motion.div
              key="reservation-success-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
              className="p-8 md:p-12 border border-gold/30 bg-[#1F1714] rounded-xl shadow-2xl relative overflow-hidden flex flex-col items-center text-center space-y-6"
            >
              {/* Dynamic decorative backdrop circles mimicking vinyl disk tracks */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-gold/10 rounded-full select-none opacity-40 pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-gold/20 rounded-full select-none opacity-40 pointer-events-none" />
              
              {/* Gold Confirmation Stamp */}
              <div className="h-16 w-16 bg-gold/10 border border-gold/30 flex items-center justify-center rounded-full text-gold">
                <Star className="w-8 h-8 fill-gold/20 animate-spin-slow" />
              </div>

              <div className="space-y-2">
                <span className="font-mono text-[9px] text-[#D8A15D] tracking-widest uppercase">CONCIERGE CHECKED STATE</span>
                <h3 className="font-serif italic text-3xl text-beige">Your booth is secured.</h3>
                <p className="font-sans font-light text-sm text-muted-beige max-w-sm mx-auto">
                  Welcome to the slow-living family, <span className="font-medium text-beige">{formData.fullName}</span>. A master copy reservation ticket has been locked below.
                </p>
              </div>

              {/* Boarding Ticket Style details */}
              <div className="w-full bg-[#181310] border border-gold/15 rounded-md p-5 text-left font-mono space-y-3.5 relative">
                {/* Boarding holes side details decoration */}
                <div className="absolute -left-2.5 top-1/2 -translate-y-1/2 h-5 w-5 bg-[#1F1714] rounded-full border-r border-gold/15" />
                <div className="absolute -right-2.5 top-1/2 -translate-y-1/2 h-5 w-5 bg-[#1F1714] rounded-full border-l border-gold/15" />

                <div className="flex justify-between text-[9px] text-muted-beige/40 uppercase">
                  <span>SUMMER BISTRO JUBILEE HILLS</span>
                  <span>TICKET NO</span>
                </div>

                <div className="flex justify-between items-center text-sm font-semibold text-beige border-b border-gold/10 pb-2">
                  <span className="text-gold tracking-widest">{successBooking.code}</span>
                  <span className="bg-gold/10 text-gold border border-gold/20 px-2 py-0.5 rounded text-[9px] uppercase font-mono">
                    {formData.intent}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xxs uppercase">
                  <div>
                    <p className="text-muted-beige/40">GUEST SECURING</p>
                    <p className="font-sans text-beige text-xs mt-0.5 font-light">{formData.fullName}</p>
                  </div>
                  <div>
                    <p className="text-muted-beige/40">PHONE RETRIEVER</p>
                    <p className="text-beige font-mono text-xs mt-0.5">{formData.phone}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xxxs uppercase pt-2 border-t border-gold/10">
                  <div>
                    <p className="text-muted-beige/30">DATE SEAT</p>
                    <p className="text-gold text-xs font-mono mt-0.5 font-semibold">{formData.date}</p>
                  </div>
                  <div>
                    <p className="text-muted-beige/30">CONCIERGE HR</p>
                    <p className="text-gold text-xs font-mono mt-0.5 font-semibold">{formData.time}</p>
                  </div>
                  <div>
                    <p className="text-muted-beige/30">CAPACITY PILL</p>
                    <p className="text-gold text-xs font-mono mt-0.5 font-semibold">{formData.guests} SEATS</p>
                  </div>
                </div>
              </div>

              {/* Informational checklist and guide */}
              <div className="font-mono text-[9px] text-muted-beige/75 space-y-1 max-w-sm text-left">
                <p className="font-serif italic text-gold text-xs mb-1 font-semibold text-center sm:text-left">“How next to activate tonight?”</p>
                <div className="flex gap-2 items-start">
                  <span className="text-gold">•</span>
                  <span>Produce this booking screen when receiving from our doorstep host at Jubilee Hills.</span>
                </div>
                <div className="flex gap-2 items-start mt-1">
                  <span className="text-gold">•</span>
                  <span>Booths are held for a romantic window of 15 minutes beyond your target stamp.</span>
                </div>
              </div>

              {/* Submit reset button */}
              <button
                onClick={handleReset}
                id="success-concierge-close-btn"
                className="px-8 py-3 bg-beige/5 hover:bg-gold/10 border border-beige/12 hover:border-gold/30 rounded-full font-mono text-xxs uppercase tracking-widest text-beige hover:text-gold transition-colors duration-300 cursor-pointer outline-none"
              >
                Return to Sanctuary Home
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
