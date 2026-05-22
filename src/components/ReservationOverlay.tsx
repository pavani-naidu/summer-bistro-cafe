import { useState, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ReservationForm } from "../types";
import { X, Phone, Heart, Star, Mail, User, Calendar, Users, Clock, Compass } from "lucide-react";
import logoImg from "../assets/images/logo.png";

interface ReservationOverlayProps {
  key?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ReservationOverlay({ isOpen, onClose }: ReservationOverlayProps) {
  const [formData, setFormData] = useState<ReservationForm>({
    tone: "❤️ Date Night",
    name: "",
    email: "",
    phone: "",
    date: new Date().toISOString().split('T')[0],
    time: "09:00 PM (Candle Lit)",
    guests: "2",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successBooking, setSuccessBooking] = useState<{ code: string } | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectTone = (tone: string) => {
    setFormData(prev => ({ ...prev, tone }));
  };

  const handleSelectGuests = (guests: string) => {
    setFormData(prev => ({ ...prev, guests }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.date) {
      alert("Please complete all sections to secure your booth.");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate a pristine concierge check-in delay (slow luxury indie pace)
    setTimeout(() => {
      setIsSubmitting(false);
      // Generate a unique luxurious boarding ticket style code
      const uniqueCode = "SBR-" + Math.floor(1000 + Math.random() * 9000).toString() + "-X";
      setSuccessBooking({ code: uniqueCode });
    }, 1800);
  };

  const handleReset = () => {
    setFormData({
      tone: "❤️ Date Night",
      name: "",
      email: "",
      phone: "",
      date: new Date().toISOString().split('T')[0],
      time: "09:00 PM (Candle Lit)",
      guests: "2",
    });
    setSuccessBooking(null);
    onClose();
  };

  if (!isOpen) return null;

  const toneOptions = [
    { label: "❤️ Date Night", value: "❤️ Date Night" },
    { label: "📷 Content Creation", value: "📷 Content Creation" },
    { label: "☕ Late Chill", value: "☕ Late Chill" },
    { label: "💼 Coffee Network", value: "💼 Coffee Network" }
  ];

  const guestOptions = ["1", "2", "3", "4", "5", "6", "7", "8+"];

  const timeOptions = [
    "11:00 AM (Bright Brunch)",
    "01:00 PM (Afternoon Calm)",
    "04:00 PM (Golden Hour)",
    "07:00 PM (Sunset Glow)",
    "09:00 PM (Candle Lit)",
    "10:00 PM (Mellow Jazz)",
    "11:00 PM (Acoustic Vinyl)",
    "12:00 AM (Midnight Chill)",
    "01:00 AM (Nocturnal Peace)",
    "02:00 AM (Deep Solitude)"
  ];

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
      className="fixed inset-0 w-full h-[100dvh] bg-[#181310] z-50 flex flex-col"
      id="modal-reservation-container"
    >
      {/* Fixed Header (Never overlaps content on scroll) */}
      <div className="w-full bg-[#181310] border-b border-gold/15 shrink-0 px-6 md:px-12 py-4 z-20 relative">
        <div className="w-full max-w-xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img 
              src={logoImg} 
              alt="Summer Bistro" 
              className="h-8 w-auto object-contain filter drop-shadow-[0_1px_4px_rgba(218,161,93,0.2)]" 
            />
            <div className="flex flex-col">
              <span className="font-serif italic text-lg text-gold leading-none">Concierge Host</span>
              <span className="font-mono text-[8px] tracking-[0.2em] text-[#D8A15D]/80 uppercase mt-1">ESTABLISHING BOOTH ALLOCATION</span>
            </div>
          </div>
          <button
            onClick={handleReset}
            id="reservation-overlay-close-btn"
            className="p-2.5 bg-beige/5 border border-beige/12 hover:border-gold hover:bg-gold/10 rounded-full transition-all cursor-pointer text-beige flex items-center justify-center outline-none"
          >
            <X className="w-4 h-4 text-beige" />
          </button>
        </div>
      </div>

      {/* Scrollable content container */}
      <div className="flex-grow overflow-y-auto px-6 md:px-12 py-8 flex flex-col justify-start">
        <div className="w-full max-w-xl mx-auto flex-grow flex flex-col justify-center my-4">
        <AnimatePresence mode="wait">
          {!successBooking ? (
            <motion.div
              key="reservation-form-deck"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* Introduction typography */}
              <div className="space-y-4 text-center">
                <div className="flex flex-col items-center justify-center space-y-2 mb-2">
                  <img 
                    src={logoImg} 
                    alt="Summer Bistro Logo" 
                    className="h-12 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(216,161,93,0.2)] animate-[pulse_4s_infinite]" 
                  />
                  <div className="flex flex-col items-center">
                    <span className="font-serif italic text-2xl text-beige leading-none">Summer Bistro</span>
                    <span className="font-mono text-[9px] tracking-[0.25em] text-[#D8A15D] uppercase mt-1">Sanctuary</span>
                  </div>
                  
                  {/* Subtle badges for coordinates and social */}
                  <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-neutral-400 font-mono text-[9px] tracking-wider pt-1">
                    <span className="flex items-center gap-1 text-[#D8A15D]/90 font-semibold">
                      ✨ Jubilee Hills • Hyderabad
                    </span>
                    <span className="text-neutral-700 hidden sm:inline">|</span>
                    <a 
                      href="https://instagram.com/summerbistro.hyd" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-gold transition-colors flex items-center gap-1"
                    >
                      @summerbistro.hyd
                    </a>
                  </div>
                </div>
                
                <div className="h-[1px] w-16 bg-gold/20 mx-auto" />

                <span className="font-mono text-[8px] text-[#D8A15D] tracking-[0.3em] uppercase flex items-center justify-center gap-1.5 font-bold pt-1">
                  <Compass className="w-3.5 h-3.5 text-gold animate-spin-slow" /> SECURING JUBILEE HILLS CORNER
                </span>
                <h2 className="font-serif italic text-2xl md:text-3xl text-beige leading-tight">
                  Plan Your Midnight Rest
                </h2>
                <p className="font-sans font-light text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-lg mx-auto">
                  We maintain a limited grid of booths on Road No. 5 to protect our candle-lit ambient acoustics. Bookings are non-chargeable, managed as digital boarding passes.
                </p>
              </div>

              {/* Form elements */}
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Tone of Visit Selector */}
                <div className="space-y-2">
                  <label className="block font-mono text-[9px] uppercase tracking-widest text-[#D8A15D] font-bold text-left pl-1">
                    What is the tone of your visit?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {toneOptions.map(opt => {
                      const isSelected = formData.tone === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => handleSelectTone(opt.value)}
                          className={`relative py-3 px-4 rounded-xl text-xs font-medium tracking-wide flex items-center justify-center gap-2 border transition-all duration-300 outline-none cursor-pointer ${
                            isSelected
                              ? "border-gold bg-gold/10 text-gold shadow-[0_0_12px_rgba(216,161,93,0.1)]"
                              : "border-white/5 bg-card-surface/40 hover:border-gold/30 text-muted-beige hover:text-beige"
                          }`}
                        >
                          {isSelected && (
                            <motion.div
                              layoutId="tone-active-glow"
                              className="absolute inset-0 border border-gold rounded-xl pointer-events-none"
                              transition={{ type: "spring", stiffness: 380, damping: 30 }}
                            />
                          )}
                          <span className="relative z-10">{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Boxed Inputs Container */}
                <div className="bg-[#1F1714]/40 border border-gold/10 rounded-2xl p-4 sm:p-5 space-y-4">
                  
                  {/* Full Name field */}
                  <div className="border border-gold/15 focus-within:border-gold rounded-xl px-4 py-2.5 bg-[#181310]/80 transition-all duration-300 text-left">
                    <label className="block text-[8px] uppercase tracking-[0.2em] text-[#D8A15D] font-mono font-bold leading-none mb-1">
                      Full Name
                    </label>
                    <div className="flex items-center gap-2 mt-0.5">
                      <User className="w-3.5 h-3.5 text-gold/60 shrink-0" />
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="e.g. Priya Sharma"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-transparent text-beige placeholder-muted-beige/30 outline-none text-xs sm:text-sm font-sans"
                      />
                    </div>
                  </div>

                  {/* Gmail field */}
                  <div className="border border-gold/15 focus-within:border-gold rounded-xl px-4 py-2.5 bg-[#181310]/80 transition-all duration-300 text-left">
                    <label className="block text-[8px] uppercase tracking-[0.2em] text-[#D8A15D] font-mono font-bold leading-none mb-1">
                      Digital Coordinates (Email)
                    </label>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Mail className="w-3.5 h-3.5 text-gold/60 shrink-0" />
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="e.g. priya@email.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-transparent text-beige placeholder-muted-beige/30 outline-none text-xs sm:text-sm font-sans"
                      />
                    </div>
                  </div>

                  {/* Phone field */}
                  <div className="border border-gold/15 focus-within:border-gold rounded-xl px-4 py-2.5 bg-[#181310]/80 transition-all duration-300 text-left">
                    <label className="block text-[8px] uppercase tracking-[0.2em] text-[#D8A15D] font-mono font-bold leading-none mb-1">
                      Phone Number
                    </label>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Phone className="w-3.5 h-3.5 text-gold/60 shrink-0" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-transparent text-beige placeholder-muted-beige/30 outline-none text-xs sm:text-sm font-sans"
                      />
                    </div>
                  </div>

                  {/* Date & Time Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Date of Escape */}
                    <div className="border border-gold/15 focus-within:border-gold rounded-xl px-4 py-2.5 bg-[#181310]/80 transition-all duration-300 text-left">
                      <label className="block text-[8px] uppercase tracking-[0.2em] text-[#D8A15D] font-mono font-bold leading-none mb-1">
                        Date of Escape
                      </label>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Calendar className="w-3.5 h-3.5 text-gold/60 shrink-0" />
                        <input
                          type="date"
                          name="date"
                          required
                          value={formData.date}
                          onChange={handleInputChange}
                          style={{ colorScheme: "dark" }}
                          className="w-full bg-transparent text-beige outline-none text-xs sm:text-sm font-sans cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Midnight Hour */}
                    <div className="border border-gold/15 focus-within:border-gold rounded-xl px-4 py-2.5 bg-[#181310]/80 transition-all duration-300 text-left">
                      <label className="block text-[8px] uppercase tracking-[0.2em] text-[#D8A15D] font-mono font-bold leading-none mb-1">
                        Midnight Hour
                      </label>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Clock className="w-3.5 h-3.5 text-gold/60 shrink-0" />
                        <select
                          name="time"
                          value={formData.time}
                          onChange={handleInputChange}
                          className="w-full bg-transparent text-beige outline-none text-xs sm:text-sm font-sans cursor-pointer focus:bg-[#181310]"
                        >
                          {timeOptions.map(opt => (
                            <option key={opt} value={opt} className="bg-[#181310] text-beige">
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Guest Count Selector */}
                <div className="space-y-2">
                  <label className="block font-mono text-[9px] uppercase tracking-widest text-[#D8A15D] font-bold text-left pl-1">
                    Guests Count
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {guestOptions.map(num => {
                      const isSelected = formData.guests === num;
                      return (
                        <button
                          key={num}
                          type="button"
                          onClick={() => handleSelectGuests(num)}
                          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl border flex items-center justify-center font-mono text-xs sm:text-sm transition-all duration-300 outline-none cursor-pointer ${
                            isSelected
                              ? "border-gold bg-gold/15 text-gold font-bold shadow-[0_0_10px_rgba(216,161,93,0.1)]"
                              : "border-white/5 bg-card-surface/40 hover:border-gold/20 text-muted-beige"
                          }`}
                        >
                          {num}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Sanctuary Spirit Acknowledgement */}
                <div className="font-mono text-[8.5px] tracking-wider leading-relaxed text-[#D8A15D]/90 text-center border-t border-b border-gold/15 py-3.5 my-3 uppercase font-semibold">
                  BY TAPPING BELOW, YOU ACKNOWLEDGE THE SANCTUARY SPIRIT: WE RESPECT LATE CHILL SILENCE AND PREVENT BRIGHT PORTABLE RING LIGHTS IN PRIMARY BOOTHS.
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  id="submit-reservation-btn"
                  className="w-full py-4 bg-gradient-to-r from-gold to-[#e8b576] hover:from-white hover:to-white text-black font-mono text-xs font-bold uppercase tracking-[0.15em] rounded-full transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-[0.99] outline-none"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Securing Seat Allocation...
                    </>
                  ) : (
                    <>
                      <Heart className="w-3.5 h-3.5 fill-black stroke-black animate-pulse" />
                      <span>Secure Seat Allocation</span>
                    </>
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
              className="p-6 md:p-10 border border-gold/30 bg-[#1F1714] rounded-xl shadow-2xl relative overflow-hidden flex flex-col items-center text-center space-y-6"
            >
              {/* Dynamic decorative backdrop circles mimicking vinyl disk tracks */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-gold/10 rounded-full select-none opacity-40 pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-gold/20 rounded-full select-none opacity-40 pointer-events-none" />
              
              {/* Gold Confirmation Stamp */}
              <div className="h-14 w-14 bg-gold/10 border border-gold/30 flex items-center justify-center rounded-full text-gold z-10">
                <Star className="w-7 h-7 fill-gold/20 animate-spin-slow" />
              </div>

              <div className="space-y-2 z-10">
                <span className="font-mono text-[9px] text-[#D8A15D] tracking-widest uppercase font-bold">CONCIERGE RESERVATION SECURED</span>
                <h3 className="font-serif italic text-3xl text-beige">Seat Allocated</h3>
                <p className="font-sans font-light text-xs text-muted-beige max-w-sm mx-auto leading-relaxed">
                  Your spot is saved in our Road No. 5 sanctuary. Please present your digital pass details below upon entry:
                </p>
              </div>

              {/* Boarding Ticket Style details */}
              <div className="w-full bg-[#181310] border border-gold/15 rounded-xl p-5 text-left font-mono space-y-4 relative z-10 shadow-lg">
                {/* Boarding holes side details decoration */}
                <div className="absolute -left-2.5 top-1/2 -translate-y-1/2 h-5 w-5 bg-[#1F1714] rounded-full border-r border-gold/15" />
                <div className="absolute -right-2.5 top-1/2 -translate-y-1/2 h-5 w-5 bg-[#1F1714] rounded-full border-l border-gold/15" />

                <div className="flex justify-between items-center text-[9px] text-muted-beige/40 uppercase">
                  <div className="flex items-center gap-1.5">
                    <img src={logoImg} alt="" className="h-3 w-auto object-contain" />
                    <span>SUMMER BISTRO</span>
                  </div>
                  <span>PASS ID</span>
                </div>

                <div className="flex justify-between items-center text-sm font-semibold text-beige border-b border-gold/10 pb-3">
                  <span className="text-gold tracking-widest font-mono">{successBooking.code}</span>
                  <span className="bg-gold/15 text-gold border border-gold/25 px-2.5 py-0.5 rounded text-[8px] uppercase tracking-wider font-bold">
                    ACTIVE ENTRY
                  </span>
                </div>

                {/* Ticket Details Grid */}
                <div className="grid grid-cols-2 gap-y-3.5 gap-x-4 py-1 text-xs">
                  <div className="col-span-2">
                    <p className="text-muted-beige/45 text-[7px] uppercase tracking-widest font-bold">DESIGNATED GUEST</p>
                    <p className="text-gold font-sans text-sm tracking-wider font-semibold mt-0.5">{formData.name}</p>
                  </div>
                  
                  <div>
                    <p className="text-muted-beige/45 text-[7px] uppercase tracking-widest font-bold">DIGITAL PASS</p>
                    <p className="text-beige text-[10px] tracking-wide truncate mt-0.5">{formData.email}</p>
                  </div>
                  <div>
                    <p className="text-muted-beige/45 text-[7px] uppercase tracking-widest font-bold">DIRECT CONNECTION</p>
                    <p className="text-beige text-[10px] tracking-wider mt-0.5">{formData.phone}</p>
                  </div>

                  <div>
                    <p className="text-muted-beige/45 text-[7px] uppercase tracking-widest font-bold">ESCAPE DATE</p>
                    <p className="text-beige text-[10px] tracking-wide mt-0.5">{formData.date}</p>
                  </div>
                  <div>
                    <p className="text-muted-beige/45 text-[7px] uppercase tracking-widest font-bold">MIDNIGHT HOUR</p>
                    <p className="text-beige text-[10px] tracking-wide mt-0.5">{formData.time}</p>
                  </div>

                  <div>
                    <p className="text-muted-beige/45 text-[7px] uppercase tracking-widest font-bold">GUESTS COUNT</p>
                    <p className="text-beige text-xs mt-0.5 font-bold">{formData.guests} Guest(s)</p>
                  </div>
                  <div>
                    <p className="text-muted-beige/45 text-[7px] uppercase tracking-widest font-bold">VISIT TONE</p>
                    <p className="text-beige text-[10px] truncate mt-0.5">{formData.tone}</p>
                  </div>
                </div>

                {/* Vintage Ticket Dotted Line Separator */}
                <div className="border-t border-dashed border-gold/20 pt-2 flex flex-col items-center">
                  {/* CSS-generated Premium Barcode */}
                  <div className="flex justify-center items-center gap-0.5 h-6 opacity-30 w-full max-w-[200px] py-1">
                    <div className="w-[1px] h-full bg-gold" />
                    <div className="w-[3px] h-full bg-gold" />
                    <div className="w-[1px] h-full bg-gold" />
                    <div className="w-[2px] h-full bg-gold" />
                    <div className="w-[1px] h-full bg-gold" />
                    <div className="w-[4px] h-full bg-gold" />
                    <div className="w-[1px] h-full bg-gold" />
                    <div className="w-[2px] h-full bg-gold" />
                    <div className="w-[1px] h-full bg-gold" />
                    <div className="w-[3px] h-full bg-gold" />
                    <div className="w-[1px] h-full bg-gold" />
                    <div className="w-[1px] h-full bg-gold" />
                    <div className="w-[4px] h-full bg-gold" />
                    <div className="w-[2px] h-full bg-gold" />
                    <div className="w-[1px] h-full bg-gold" />
                  </div>
                  <span className="text-[7px] tracking-[0.4em] text-gold/30 mt-1 uppercase">Allocated Concierge</span>
                </div>
              </div>

              {/* Instructions and tips */}
              <div className="font-mono text-[9px] text-muted-beige/80 space-y-1.5 max-w-sm text-left z-10 leading-relaxed">
                <p className="font-mono text-[10px] tracking-widest text-[#D8A15D] uppercase mb-1 font-bold text-center sm:text-left">CONCIERGE REST GUIDELINES</p>
                <div className="flex gap-2 items-start">
                  <span className="text-gold mt-0.5">•</span>
                  <span>Please present this screen to our door-keeper upon arrival at Jubilee Hills sanctuary.</span>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="text-gold mt-0.5">•</span>
                  <span>Booths are held strictly for a grace period of 15 minutes. Bookings are non-transferable.</span>
                </div>
              </div>

              {/* Submit reset button */}
              <button
                onClick={handleReset}
                id="success-concierge-close-btn"
                className="px-8 py-3 bg-beige/5 hover:bg-gold/10 border border-beige/12 hover:border-gold/30 rounded-full font-mono text-[10px] uppercase tracking-widest text-beige hover:text-gold transition-colors duration-300 cursor-pointer outline-none z-10"
              >
                Return to Sanctuary
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
