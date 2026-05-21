import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { menuItems, MenuItem, CATEGORIES } from "../types";
import { 
  Coffee, Flame, Heart, Sparkles, SlidersHorizontal, Search, X,
  Utensils, Calendar, VolumeX, Users, Laptop, Wifi, Home, Lock, Armchair, Trees,
  Cpu, Image as ImageIcon, FileText, CheckCircle, ArrowRight, Loader2, RotateCcw,
  Star
} from "lucide-react";

const VENUE_FEATURES = [
  { label: "Dinner", info: "Elegant late-night menu with active chef table service", category: "Dining" },
  { label: "Lunch", info: "Artisanal afternoon creations and slow-pour brews", category: "Dining" },
  { label: "Home delivery", info: "Curated, insulated eco-containers for secure delivery", category: "Service" },
  { label: "Takeaway available", info: "Sourdough, pastries, and signature blends packed for transit", category: "Service" },
  { label: "Reservation required", info: "Curating high-comfort table placements and intimate ambience", category: "Policy" },
  { label: "Less noisy", info: "Regulated low soundscape playing vintage and slow acoustic jazz", category: "Atmosphere" },
  { label: "Stags allowed", info: "Independents, solo readers, and creative coders always welcomed", category: "Policy" },
  { label: "Lounge seating", info: "Deep vintage leather sofas and dim copper spot lamps", category: "Spaces" },
  { label: "Outdoor seating", info: "Verdant courtyard lit by golden checkpost street lights", category: "Spaces" },
  { label: "Romantic dining", info: "Cozy alcoves with candle-light focus and acoustic isolation", category: "Atmosphere" },
  { label: "Smoking area", info: "Comfortable, glass-sheltered and ventilated garden zone", category: "Policy" },
  { label: "Large group seating", info: "Spacious live-edge oak sharing tables with built-in plugs", category: "Spaces" },
  { label: "Indoor seating", info: "Exposed brick salon featuring premium audio-damped acoustics", category: "Spaces" },
  { label: "Work friendly", info: "Gigabit-backed corner desks with multiple power sources", category: "Atmosphere" },
  { label: "Private dining", info: "Exclusive enclosed chamber with a personal vinyl selections deck", category: "Spaces" },
  { label: "Wifi there", info: "Symmetrical fiber connectivity across the entire floor", category: "Service" },
];

const getFeatureIcon = (label: string, className: string) => {
  switch (label.toLowerCase()) {
    case "dinner":
      return <Utensils className={className} />;
    case "lunch":
      return <Coffee className={className} />;
    case "home delivery":
      return <Wifi className={className} />; // or something generic/delivery
    case "takeaway available":
      return <Coffee className={className} />;
    case "reservation required":
      return <Calendar className={className} />;
    case "less noisy":
      return <VolumeX className={className} />;
    case "stags allowed":
      return <Users className={className} />;
    case "lounge seating":
      return <Armchair className={className} />;
    case "outdoor seating":
      return <Trees className={className} />;
    case "romantic dining":
      return <Heart className={className} />;
    case "smoking area":
      return <Flame className={className} />;
    case "large group seating":
      return <Users className={className} />;
    case "indoor seating":
      return <Home className={className} />;
    case "work friendly":
      return <Laptop className={className} />;
    case "private dining":
      return <Lock className={className} />;
    case "wifi there":
      return <Wifi className={className} />;
    default:
      return <Sparkles className={className} />;
  }
};

interface UserReview {
  id: string;
  itemName: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

const DEFAULT_REVIEWS: UserReview[] = [
  {
    id: "r1",
    itemName: "Lotus Biscoff Cream Brew",
    userName: "Aparna Sharma",
    rating: 5,
    comment: "Absolutely divine! The pairing of Lotus Biscoff butter with the deep cold brew chocolate notes is spectacular.",
    date: "2026-05-18"
  },
  {
    id: "r2",
    itemName: "Lotus Biscoff Cream Brew",
    userName: "Rahul V.",
    rating: 4,
    comment: "So velvety and rich. Highly recommend visiting around 2 AM when the music turns to slow vinyl lofi.",
    date: "2026-05-19"
  },
  {
    id: "r3",
    itemName: "Premium Iced Matcha Latte",
    userName: "Meghana Reddi",
    rating: 5,
    comment: "Incredibly smooth ceremonial grade matcha. Standard other spots in Hyd taste chalky, but Summer Bistro nails the whisking!",
    date: "2026-05-20"
  },
  {
    id: "r4",
    itemName: "Lamb Pepperoni Pizza",
    userName: "Dr. Srinivas",
    rating: 5,
    comment: "The crust has perfect sourdough pockets! Real stone oven flavor. My favorite dinner pizza in Hyderabad.",
    date: "2026-05-17"
  },
  {
    id: "r5",
    itemName: "Chocolate Dome",
    userName: "Kriti Sen",
    rating: 5,
    comment: "The table-side warm caramel pour is theater! Tastes like absolute decadence.",
    date: "2026-05-21"
  },
  {
    id: "r6",
    itemName: "Deconstructed Banoffee",
    userName: "Aditya S.",
    rating: 5,
    comment: "The speculoos biscuit crumble and diplomat cream create the perfect symmetry of crunch and luxury.",
    date: "2026-05-18"
  },
  {
    id: "r7",
    itemName: "Choco Hazelnut & Sea Salt Boba",
    userName: "Pranav Rawat",
    rating: 4,
    comment: "The salt foam on top balancing the heavy chocolate hazelnut milk is purely genius.",
    date: "2026-05-20"
  },
  {
    id: "r8",
    itemName: "Watermelon Feta Salad",
    userName: "Zoya Fatima",
    rating: 5,
    comment: "Very refreshing and crisp. The compressed watermelon coupled with high-grade feta is lovely on a summer afternoon.",
    date: "2026-05-19"
  }
];

interface MenuSectionProps {
  onOpenReservation: () => void;
}

export default function MenuSection({ onOpenReservation }: MenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const [selectedFeatureCat, setSelectedFeatureCat] = useState<string>("All");

  // New states for interactive detail modal card and generative image sandbox
  const [activeDetailItem, setActiveDetailItem] = useState<MenuItem | null>(null);
  const [showFullPhysicalMenu, setShowFullPhysicalMenu] = useState<boolean>(false);
  const [generatedImages, setGeneratedImages] = useState<Record<string, string>>({
    "Chocolate Dome": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=800",
    "Deconstructed Banoffee": "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=800",
    "Choco Hazelnut & Sea Salt Boba": "https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&q=80&w=800",
    "Watermelon Feta Salad": "https://images.unsplash.com/photo-1621510456681-23a23cfb5f57?auto=format&fit=crop&q=80&w=800",
    "English Breakfast": "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&q=80&w=800"
  });
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationStep, setGenerationStep] = useState<string>("");
  const [customPrompt, setCustomPrompt] = useState<string>("");

  // Customer Reviews System
  const [detailTab, setDetailTab] = useState<"story" | "reviews">("story");
  const [reviews, setReviews] = useState<UserReview[]>(() => {
    try {
      const saved = localStorage.getItem("summer_bistro_reviews");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Error reading reviews", e);
    }
    return DEFAULT_REVIEWS;
  });

  // Write a Review Form States
  const [newReviewName, setNewReviewName] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState("");
  const [reviewHoverRating, setReviewHoverRating] = useState<number | null>(null);
  const [reviewSubmitSuccess, setReviewSubmitSuccess] = useState(false);

  useEffect(() => {
    localStorage.setItem("summer_bistro_reviews", JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    setDetailTab("story");
    setNewReviewName("");
    setNewReviewRating(5);
    setNewReviewComment("");
    setReviewSubmitSuccess(false);
  }, [activeDetailItem]);

  const getItemAverageRating = (itemName: string) => {
    const itemReviews = reviews.filter(r => r.itemName === itemName);
    if (itemReviews.length === 0) return 5.0;
    const sum = itemReviews.reduce((acc, r) => acc + r.rating, 0);
    return parseFloat((sum / itemReviews.length).toFixed(1));
  };

  useEffect(() => {
    if (activeDetailItem) {
      if (activeDetailItem.name === "Choco Hazelnut & Sea Salt Boba") {
        setCustomPrompt("A macro photograph of the Choco Hazelnut Boba with raw tapioca pearls actively swirling, Belgian chocolate melting down the glass, and a distinct sea salt cream foam crown on top, all under beautiful, golden candlelight illumination. #0B0806 deep background, warm gold lighting accents, natural cafe textures.");
      } else if (activeDetailItem.name === "Deconstructed Banoffee") {
        setCustomPrompt("A detailed, layered deconstruction of the Speculoos Banoffee. Show the speculoos crumble base, dense caramelized banana puree, and whipped vanilla diplomat cream dusted with coffee bean art, presented on a dark live-edge oak surface. #0B0806 deep background, warm gold lighting accents, natural textures.");
      } else if (activeDetailItem.name === "Watermelon Feta Salad") {
        setCustomPrompt("A vibrant portrait of the Watermelon Feta Salad. Focus on high-contrast visuals—the deep red, chilled organic watermelon blocks paired with crumbling rich white feta and fresh garden mint leaves, dynamic with an aged balsamic reduction swirl. #0B0806 deep background, warm gold lighting accents.");
      } else {
        setCustomPrompt(`A realistic, high-fashion gourmet photograph of the ${activeDetailItem.name} presented on a dark textured surface, background #0B0806 with warm candlelight and amber/gold lighting accents.`);
      }
    } else {
      setCustomPrompt("");
    }
  }, [activeDetailItem]);

  // Filters items based on selected category and text search
  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const query = searchQuery.trim().toLowerCase();
    
    if (!query) return matchesCategory;
    
    const matchesName = item.name.toLowerCase().includes(query);
    const matchesIngredients = item.ingredients.toLowerCase().includes(query);
    const matchesTags = item.tags.some(tag => tag.toLowerCase().includes(query));
    
    return matchesCategory && (matchesName || matchesIngredients || matchesTags);
  });

  const filteredFeatures = VENUE_FEATURES.filter(
    (feature) => selectedFeatureCat === "All" || feature.category === selectedFeatureCat
  );

  const toggleExpand = (itemName: string) => {
    if (expandedItemId === itemName) {
      setExpandedItemId(null);
    } else {
      setExpandedItemId(itemName);
    }
  };

  return (
    <section 
      id="menu" 
      className="relative min-h-screen py-24 px-6 md:px-12 lg:px-24 transition-all duration-1000 bg-midnight"
    >
      {/* Decorative candlelight glow accent */}
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-ambient/10 rounded-full blur-[140px] pointer-events-none animate-pulse duration-[8000ms]" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-ambient/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full">
        
        {/* Editorial Subheader */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
            className="space-y-4 max-w-xl"
          >
            <span className="font-mono text-xs text-gold uppercase tracking-[0.3em] flex items-center gap-2">
              <Coffee className="w-3.5 h-3.5" /> SECTION III • METICULOUS DECK
            </span>
            <h2 className="font-serif italic font-light text-4xl md:text-5xl lg:text-6xl text-beige">
              The All-Night Menu
            </h2>
            <p className="font-sans font-light text-sm text-muted-beige leading-relaxed">
              Crafted meticulously, sourced ethically, and available twenty-four hours. Select a card to inspect internal molecular culinary details and ingredients.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center gap-3 md:justify-end"
          >
            <button
              onClick={() => setShowFullPhysicalMenu(true)}
              className="flex items-center gap-2.5 font-mono text-xs font-bold text-black bg-[#D8A15D] hover:bg-[#F9F6F0] hover:shadow-[0_0_20px_rgba(216,161,93,0.4)] transition-all duration-300 uppercase tracking-[0.2em] px-6 py-3 rounded-full cursor-pointer outline-none active:scale-[0.98] border border-[#D8A15D] hover:border-[#F9F6F0]"
            >
              <FileText className="w-4 h-4" /> VIEW FULL MENU
            </button>
          </motion.div>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-gold/10 mb-12">
          {/* Minimal Category Tabs */}
          <div className="flex flex-wrap gap-2 md:gap-4 justify-start overflow-x-auto scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setExpandedItemId(null); // Reset expanded details on filter swap
                }}
                className={`px-5 py-2.5 font-mono text-xs uppercase tracking-widest rounded-full transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-gold text-black font-semibold"
                    : "bg-white/[0.02] text-muted-beige hover:bg-white/5 hover:text-beige border border-gold/10 hover:border-gold/25"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Elegant Search Input */}
          <div className="relative w-full lg:w-80 group self-start lg:self-center">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
              <Search className="w-3.5 h-3.5 text-gold/60 group-focus-within:text-gold transition-colors" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setExpandedItemId(null); // Close active open detail cards on typing
              }}
              placeholder="Search dishes or ingredients..."
              className="w-full bg-[#181310] hover:bg-card-surface border border-gold/15 focus:border-gold rounded-full py-2.5 pl-10 pr-9 font-mono text-xs text-beige placeholder-muted-beige/40 outline-none transition-all duration-300 placeholder-shown:italic"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 flex items-center pr-3 group text-muted-beige/50 hover:text-gold transition-colors focus:outline-none cursor-pointer"
                title="Clear Search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Catalog grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => {
                return (
                  <motion.div
                    key={item.name}
                    layout="position"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.8, 
                      delay: (index % 4) * 0.1,
                      layout: { type: "spring", stiffness: 200, damping: 25 }
                    }}
                    className="relative flex flex-col justify-between overflow-hidden rounded-xl border bg-card-surface/75 border-gold/10 shadow-lg cursor-default min-h-[170px]"
                    style={{
                      transition: "all 0.4s cubic-bezier(0.25, 1, 0.5, 1)"
                    }}
                  >
                    <div className="p-6 flex flex-col justify-between h-full w-full relative z-10 space-y-4">
                      <div className="space-y-2">
                        {/* Title & Price Header */}
                        <div className="flex justify-between items-start gap-4">
                          <h3 className="font-serif italic text-xl text-beige tracking-wide font-medium leading-tight">
                            {item.name}
                          </h3>
                          <span className="font-mono text-base font-medium text-[#D8A15D] shrink-0">
                            {item.price}
                          </span>
                        </div>

                        {/* Ingredients */}
                        <p className="font-sans font-light text-xs text-muted-beige/80 line-clamp-3 leading-relaxed">
                          {item.ingredients}
                        </p>
                      </div>

                      {/* Footer: Tags and Category */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-gold/5">
                        <div className="flex flex-wrap gap-1.5">
                          {item.tags.slice(0, 2).map((tag) => (
                            <span 
                              key={tag}
                              className="font-mono text-[8px] uppercase tracking-widest text-muted-beige/50 border border-white/5 bg-white/[0.01] px-2 py-0.5 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <span className="font-mono text-[8px] uppercase tracking-widest text-gold/80 bg-gold/5 border border-gold/10 px-2 py-0.5 rounded flex items-center gap-1.5">
                          <Coffee className="w-2 h-2 text-gold" /> {item.category}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="col-span-full py-16 px-6 text-center space-y-4 border border-gold/15 bg-[#181310] rounded-xl my-4"
            >
              <div className="font-serif italic text-2xl text-beige">No savory matches found</div>
              <p className="font-sans font-light text-xs text-muted-beige max-w-md mx-auto leading-relaxed">
                We couldn't retrieve any recipes matching "{searchQuery}" under the current {selectedCategory !== "All" ? `"${selectedCategory}"` : "All"} criteria. Try searching for "Sourdough", "Cake", "Latte", or "Matcha".
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="px-6 py-2.5 bg-gold/10 hover:bg-gold text-gold hover:text-black font-semibold font-mono text-xxs tracking-widest uppercase border border-gold/25 hover:border-gold/50 rounded-full transition-all duration-300 cursor-pointer outline-none"
              >
                Reset all filters
              </button>
            </motion.div>
          )}
          </AnimatePresence>
        </div>

        {/* Premium Information Board called GOOD TO KNOW */}
        <div id="venue-features" className="mt-28 pt-16 border-t border-gold/10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center space-y-4 mb-16 max-w-2xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-400/10 border border-amber-400/20 rounded-full text-amber-400 font-mono text-[10px] uppercase tracking-widest font-semibold shadow-sm mx-auto">
              GOOD TO KNOW
            </div>
            <h3 className="font-serif italic font-light text-3xl md:text-4xl text-beige">
              Everyday Details for Your Visit
            </h3>
            <p className="font-sans font-light text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-lg mx-auto">
              Simple details to help you plan your perfect day or night at the cafe. Here is what we provide to make you feel right at home!
            </p>
            <div className="h-[1px] w-16 bg-[#D8A15D]/30 mx-auto mt-2" />
          </motion.div>

          {/* 3-Column 3D Glass Information Board */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Column 1: Always Open, Always Friendly */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-gradient-to-br from-[#16120E] to-[#0B0806] border border-amber-500/10 rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(245,158,11,0.05)] hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center space-y-4 group"
            >
              <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4 font-mono text-xs text-amber-500 group-hover:scale-110 transition-transform duration-300">
                24H
              </div>
              <h4 className="text-base font-semibold tracking-wider text-[#F9F6F0] mb-2 uppercase group-hover:text-amber-400 transition-colors duration-300">
                Always Open, Always Friendly
              </h4>
              <p className="text-sm text-neutral-400 leading-relaxed md:min-h-[96px]">
                We are open 24 hours a day, 7 days a week! Whether you are coming for a delicious lunch, a late dinner, or a midnight snack, our doors are always open.
              </p>
            </motion.div>

            {/* Column 2: Work & Chill Spaces */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-[#16120E] to-[#0B0806] border border-amber-500/10 rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(245,158,11,0.05)] hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center space-y-4 group"
            >
              <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4 font-mono text-xs text-amber-500 group-hover:scale-110 transition-transform duration-300">
                HUB
              </div>
              <h4 className="text-base font-semibold tracking-wider text-[#F9F6F0] mb-2 uppercase group-hover:text-amber-400 transition-colors duration-300">
                Work & Chill Spaces
              </h4>
              <p className="text-sm text-neutral-400 leading-relaxed md:min-h-[96px]">
                Pick your favorite spot! Relax on our comfy indoor sofas, study at our large wooden desks with plenty of power plugs, or enjoy our breezy outdoor courtyard.
              </p>
            </motion.div>

            {/* Column 3: Easy Café Perks */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-gradient-to-br from-[#16120E] to-[#0B0806] border border-amber-500/10 rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(245,158,11,0.05)] hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center space-y-4 group"
            >
              <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4 font-mono text-xs text-amber-500 group-hover:scale-110 transition-transform duration-300">
                VIP
              </div>
              <h4 className="text-base font-semibold tracking-wider text-[#F9F6F0] mb-2 uppercase group-hover:text-amber-400 transition-colors duration-300">
                Easy Café Perks
              </h4>
              <p className="text-sm text-neutral-400 leading-relaxed md:min-h-[96px]">
                Enjoy super fast, free Wi-Fi all over the floor, easy takeaway for your favorite drinks, and a warm space that welcomes solo readers, tech creators, and big groups!
              </p>
            </motion.div>
          </div>
        </div>

      </div>

      {/* AI IMAGE SYNTHESIS EFFECT & PARCHMENT DETAILS MODAL ("ANOTHER PAGE LIKE THE SCANNED MENU") */}
      <AnimatePresence>
        {activeDetailItem && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-10 select-none">
            {/* Ambient background glow matching dessert caramel/copper vibe */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(216,161,93,0.06)_0%,transparent_70%)] pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl bg-[#faf6ee] text-[#1b1712] rounded-3xl overflow-hidden shadow-2xl border border-gold/30 flex flex-col md:flex-row min-h-[500px]"
            >
              {/* Decorative Corner Leaf Vines representing the physical paper menu */}
              <div className="absolute top-0 left-0 w-32 h-32 pointer-events-none text-emerald-950/20">
                <svg className="w-full h-full" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M0,0 Q30,10 40,50" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <path d="M0,0 Q15,25 5,45 Q20,30 0,0" fill="currentColor" />
                  <path d="M10,2 Q25,10 35,3 Q20,0 10,2" fill="currentColor" />
                  <path d="M18,10 Q32,22 25,36 Q15,22 18,10" fill="currentColor" />
                  <path d="M3,15 Q12,30 5,45 Q-2,25 3,15" fill="currentColor" />
                </svg>
              </div>

              <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none text-emerald-950/20 transform scale-x-[-1]">
                <svg className="w-full h-full" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M0,0 Q30,10 40,50" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <path d="M0,0 Q15,25 5,45 Q20,30 0,0" fill="currentColor" />
                  <path d="M10,2 Q25,10 35,3 Q20,0 10,2" fill="currentColor" />
                  <path d="M18,10 Q32,22 25,36 Q15,22 18,10" fill="currentColor" />
                  <path d="M3,15 Q12,30 5,45 Q-2,25 3,15" fill="currentColor" />
                </svg>
              </div>

              {/* Close Button */}
              <button
                onClick={() => {
                  setActiveDetailItem(null);
                  setIsGenerating(false);
                  setGenerationStep("");
                }}
                className="absolute top-5 right-5 z-20 p-2 rounded-full bg-[#1b1712]/10 hover:bg-[#1b1712]/20 border border-[#1b1712]/20 text-[#1b1712] transition-colors cursor-pointer"
                aria-label="Close panel"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Side: Visual deck or Gastronomic Fine Art Synthesis Pipeline */}
              <div className="w-full md:w-1/2 bg-[#eae3d5] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#2c221a]/15 relative">
                <div className="w-full flex flex-col justify-between h-full space-y-4">
                  {/* Portrait Image Frame */}
                  <div className="relative overflow-hidden rounded-2xl border border-[#2c221a]/20 aspect-square md:h-[280px] w-full bg-[#1b1410] shadow-sm">
                    <img
                      src={generatedImages[activeDetailItem.name] || activeDetailItem.imageUrl}
                      alt={activeDetailItem.name}
                      className={`w-full h-full object-cover rounded-2xl transition-all duration-750 ${isGenerating ? "scale-105 blur-xs brightness-50" : "scale-100 filter brightness-[0.98]"}`}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                    {/* Dynamic overlay while running the pipeline */}
                    <AnimatePresence>
                      {isGenerating && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-black/70 backdrop-blur-xs z-10 space-y-4 animate-fade-in"
                        >
                          <Loader2 className="w-9 h-9 text-gold animate-spin mx-auto" />
                          <div className="space-y-1.5">
                            <span className="font-mono text-[9px] text-[#D8A15D] uppercase tracking-widest block font-bold animate-pulse">
                              GASTRONOMIC PIPELINE RUNNING
                            </span>
                            <p className="font-serif italic text-xs text-[#faf6ee] px-4 leading-normal">
                              "{generationStep}"
                            </p>
                          </div>
                          <div className="w-36 h-1 bg-white/20 rounded-full overflow-hidden relative">
                            <div className="absolute top-0 left-0 h-full bg-[#D8A15D] animate-[loading_3.2s_ease-in-out_infinite]" style={{ width: "95%" }} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Gastronomic Pipeline Information & Controls */}
                  <div className="p-4 rounded-xl bg-[#faf6ee] border border-[#2c221a]/15 space-y-3 shadow-inner">
                    <div className="flex items-center justify-between border-b border-[#2c221a]/10 pb-2">
                      <span className="font-mono text-[9px] text-orange-950 uppercase tracking-widest flex items-center gap-1.5 font-bold">
                        <Cpu className="w-3.5 h-3.5 text-[#D8A15D]" /> GASTRONOMIC SYNTHESIS PIPELINE
                      </span>
                      <span className="font-mono text-[8px] uppercase tracking-wider text-emerald-800 bg-emerald-800/10 border border-emerald-800/20 px-2 py-0.5 rounded font-semibold">
                        ACTIVE
                      </span>
                    </div>

                    <div className="text-[10px] font-sans text-neutral-800 space-y-1 leading-relaxed">
                      <p className="font-medium text-emerald-900 flex items-center gap-1">✔ Strict Rule: No abstract/low-fi work is active.</p>
                      <p className="text-neutral-700">✔ Styled using realistic, high-fashion gourmet photography.</p>
                      <p className="text-neutral-700">✔ Enforces #0B0806 background, warm gold lighting & natural cafe textures.</p>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <span className="font-mono text-[8px] uppercase text-[#2c221a]/55 tracking-wider block font-bold">Prompt Builder Output:</span>
                      <textarea
                        value={customPrompt}
                        onChange={(e) => setCustomPrompt(e.target.value)}
                        className="w-full text-[10px] font-mono p-2.5 bg-[#eae3d5] text-[#1b1712] border border-[#2c221a]/15 rounded-lg focus:border-amber-600 outline-none resize-none h-20 placeholder-[#1b1712]/30 leading-normal font-light shadow-inner"
                        placeholder="Write dynamic photograph style..."
                      />
                    </div>

                    <button
                      onClick={() => {
                        if (isGenerating) return;
                        setIsGenerating(true);
                        setGenerationStep("Analyzing culinary ingredients...");
                        
                        // Food specific steps of the pipeline
                        setTimeout(() => setGenerationStep("Composing studio golden candlelight illumination..."), 700);
                        setTimeout(() => setGenerationStep("Applying high-contrast gourmet depth fields..."), 1450);
                        setTimeout(() => setGenerationStep("Fusing color balance with raw organic textures..."), 2200);
                        setTimeout(() => setGenerationStep("Rasterizing 8K fine-fashion display plate..."), 2900);
                        
                        setTimeout(() => {
                          const preMappedPhotos: Record<string, string> = {
                            "Chocolate Dome": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=800",
                            "Deconstructed Banoffee": "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=800",
                            "Choco Hazelnut & Sea Salt Boba": "https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&q=80&w=800",
                            "English Breakfast": "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&q=80&w=800",
                            "Watermelon Feta Salad": "https://images.unsplash.com/photo-1621510456681-23a23cfb5f57?auto=format&fit=crop&q=80&w=800"
                          };

                          const finalUrl = preMappedPhotos[activeDetailItem.name] || activeDetailItem.imageUrl;
                          setGeneratedImages(prev => ({ ...prev, [activeDetailItem.name]: finalUrl }));
                          setIsGenerating(false);
                          setGenerationStep("");
                        }, 3500);
                      }}
                      disabled={isGenerating}
                      className="w-full py-2 bg-neutral-900 border border-neutral-950 hover:bg-[#D8A15D] text-white hover:text-black font-mono text-[9px] tracking-widest uppercase rounded-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer outline-none shadow font-semibold"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" /> Synthesizing Pixel Grid...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Re-Synthesize Visual Grid
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Side: Editorial Information sheet */}
              <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-between">
                <div className="flex flex-col flex-grow space-y-5">
                  <div>
                    <span className="font-mono text-xs uppercase text-orange-900 tracking-[0.2em] block mb-2">
                      ESTD 2024 • HYDERABAD REFUGIUM
                    </span>
                    <h3 className="font-serif italic text-3xl sm:text-4xl text-[#1b1712] tracking-wide font-medium">
                      {activeDetailItem.name}
                    </h3>
                    <div className="w-16 h-0.5 bg-[#D8A15D] mt-3 mb-4" />
                  </div>

                  {/* Premium Editorial Tab Switcher */}
                  <div className="flex border-b border-[#1b1712]/10 pb-1">
                    <button
                      type="button"
                      onClick={() => setDetailTab("story")}
                      className={`pb-2 px-4 font-mono text-xs uppercase tracking-widest relative outline-none cursor-pointer duration-300 ${
                        detailTab === "story" 
                          ? "text-orange-950 font-bold" 
                          : "text-[#1b1712]/40 hover:text-[#1b1712]/80 font-medium"
                      }`}
                    >
                      Recipe Info
                      {detailTab === "story" && (
                        <motion.div 
                          layoutId="activeDetailTabLine" 
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-950" 
                        />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setDetailTab("reviews")}
                      className={`pb-2 px-4 font-mono text-xs uppercase tracking-widest relative outline-none cursor-pointer duration-300 ${
                        detailTab === "reviews" 
                          ? "text-orange-950 font-bold" 
                          : "text-[#1b1712]/40 hover:text-[#1b1712]/80 font-medium"
                      }`}
                    >
                      Guest Reviews ({reviews.filter(r => r.itemName === activeDetailItem.name).length})
                      {detailTab === "reviews" && (
                        <motion.div 
                          layoutId="activeDetailTabLine" 
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-950" 
                        />
                      )}
                    </button>
                  </div>

                  {/* Scrollable Tab Content Viewport */}
                  <div className="flex-grow overflow-y-auto max-h-[280px] md:max-h-[380px] pr-1 scrollbar-thin scrollbar-thumb-orange-950/20">
                    <AnimatePresence mode="wait">
                      {detailTab === "story" ? (
                        <motion.div
                          key="story-tab"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6"
                        >
                          <div className="space-y-2 pt-2">
                            <span className="font-mono text-[9px] uppercase tracking-wider text-[#1b1712]/50 block font-semibold">Molecular Ingredients Profiling</span>
                            <p className="font-serif italic text-base text-[#1b1712]/80 leading-relaxed font-light">
                              “{activeDetailItem.ingredients}”
                            </p>
                          </div>

                          <div className="space-y-2">
                            <span className="font-mono text-[9px] uppercase tracking-wider text-[#1b1712]/50 block font-semibold">Gastronomic Sensibility Tags</span>
                            <div className="flex flex-wrap gap-2">
                              {activeDetailItem.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="font-mono text-[9px] uppercase text-[#1b1712]/70 border border-[#1b1712]/15 bg-[#1b1712]/5 px-2.5 py-1 rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="pt-4 border-t border-[#1b1712]/10 flex justify-between items-center">
                            <div>
                              <span className="font-mono text-[9px] uppercase tracking-wider text-[#1b1712]/50 block font-semibold">Pricing Matrix</span>
                              <span className="font-mono text-2xl font-semibold text-orange-950">{activeDetailItem.price}</span>
                            </div>
                            <div className="text-right">
                              <span className="font-mono text-[9px] uppercase tracking-wider text-[#1b1712]/50 block font-semibold">Operational Timing</span>
                              <span className="font-mono text-xxs font-medium uppercase text-emerald-800 bg-emerald-800/10 border border-emerald-800/20 px-2 py-1 rounded">
                                • Served Fresh 24/7
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="reviews-tab"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-5 pt-2"
                        >
                          {/* Summary ratings card */}
                          <div className="p-3.5 bg-orange-950/[0.03] border border-orange-950/10 rounded-xl flex items-center justify-between select-none">
                            <div>
                              <div className="flex items-baseline gap-1">
                                <span className="font-serif italic text-3xl font-bold text-orange-950">
                                  {getItemAverageRating(activeDetailItem.name)}
                                </span>
                                <span className="text-[#100e0b]/50 font-mono text-[10px]">/ 5.0</span>
                              </div>
                              <span className="font-mono text-[8px] uppercase tracking-wider text-[#1b1712]/40 block mt-0.5 font-bold">
                                Guest Rating Average
                              </span>
                            </div>
                            
                            <div className="flex flex-col items-end">
                              <div className="flex gap-0.5">
                                {Array.from({ length: 5 }).map((_, i) => {
                                  const rating = getItemAverageRating(activeDetailItem.name);
                                  return (
                                    <Star 
                                      key={i} 
                                      className={`w-3.5 h-3.5 ${i < Math.round(rating) ? 'fill-[#D8A15D] text-[#D8A15D]' : 'text-neutral-300'}`} 
                                    />
                                  );
                                })}
                              </div>
                              <span className="font-mono text-[8px] uppercase tracking-wider text-emerald-800 font-bold bg-emerald-800/10 border border-emerald-800/20 px-2 py-0.5 rounded mt-1.5">
                                {reviews.filter(r => r.itemName === activeDetailItem.name).length} logs found
                              </span>
                            </div>
                          </div>

                          {/* Guest comments list */}
                          <div className="space-y-2">
                            <span className="font-mono text-[9px] uppercase tracking-wider text-[#1b1712]/50 block font-bold">Gastronomic Feedback Ledger</span>
                            
                            <div className="space-y-2.5 max-h-[160px] overflow-y-auto pr-1 select-text scrollbar-thin scrollbar-thumb-orange-950/10">
                              {reviews.filter(r => r.itemName === activeDetailItem.name).length === 0 ? (
                                <p className="font-serif italic text-xs text-[#1b1712]/50 text-center py-4">
                                  "No sensory notes left here yet. Be the first visitor to log a record."
                                </p>
                              ) : (
                                reviews.filter(r => r.itemName === activeDetailItem.name).map((review) => {
                                  const initials = review.userName
                                    .split(" ")
                                    .map(w => w[0])
                                    .join("")
                                    .slice(0, 2)
                                    .toUpperCase() || "G";
                                  return (
                                    <div key={review.id} className="p-3 bg-[#eae3d5]/30 border border-[#2c221a]/10 rounded-xl space-y-1.5 text-[#1b1712]">
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1.5">
                                          <div className="w-5.5 h-5.5 rounded-full bg-orange-950/10 border border-orange-950/15 flex items-center justify-center font-mono text-[8.5px] text-orange-950 font-bold">
                                            {initials}
                                          </div>
                                          <span className="font-mono text-[10px] font-semibold text-[#1b1712]/80">{review.userName}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                          <div className="flex gap-0.5">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                              <Star key={i} className={`w-2.5 h-2.5 ${i < review.rating ? 'fill-[#D8A15D] text-[#D8A15D]' : 'text-neutral-300'}`} />
                                            ))}
                                          </div>
                                          <span className="font-mono text-[8px] text-[#1b1712]/40">{review.date}</span>
                                        </div>
                                      </div>
                                      <p className="font-serif italic text-xxs md:text-xs text-[#1b1712]/80 leading-normal pl-7">
                                        “{review.comment}”
                                      </p>
                                    </div>
                                  );
                                })
                              )}
                            </div>
                          </div>

                          {/* Write a review form */}
                          <div className="p-3.5 bg-[#eae3d5]/40 border border-[#2c221a]/10 rounded-xl space-y-3">
                            <span className="font-mono text-[9px] uppercase tracking-wider text-[#1b1712]/60 block font-bold">Log Taste Profile</span>
                            
                            {reviewSubmitSuccess ? (
                              <div className="py-2 text-center space-y-1">
                                <CheckCircle className="w-6 h-6 text-emerald-700 mx-auto animate-bounce" />
                                <h5 className="font-serif italic font-medium text-xs text-orange-950">Reputation note submitted!</h5>
                                <p className="font-mono text-[8px] text-[#1b1712]/50 uppercase tracking-widest leading-normal">Your culinary record is successfully appended.</p>
                                <button
                                  type="button"
                                  onClick={() => setReviewSubmitSuccess(false)}
                                  className="font-mono text-[8.5px] text-[#D8A15D] hover:underline uppercase tracking-wider mt-1 block mx-auto cursor-pointer font-bold"
                                >
                                  Add Another Entry
                                </button>
                              </div>
                            ) : (
                              <div className="space-y-3">
                                <div className="flex items-center justify-between select-none">
                                  <span className="font-mono text-[8px] uppercase text-[#1b1712]/50 tracking-wider font-bold">Assign Rating:</span>
                                  <div className="flex gap-1">
                                    {Array.from({ length: 5 }).map((_, i) => {
                                      const starValue = i + 1;
                                      const isFilled = reviewHoverRating !== null ? starValue <= reviewHoverRating : starValue <= newReviewRating;
                                      return (
                                        <button
                                          type="button"
                                          key={i}
                                          onClick={() => setNewReviewRating(starValue)}
                                          onMouseEnter={() => setReviewHoverRating(starValue)}
                                          onMouseLeave={() => setReviewHoverRating(null)}
                                          className="p-0.5 outline-none focus:scale-110 active:scale-95 transition-transform duration-100 cursor-pointer"
                                        >
                                          <Star className={`w-4 h-4 ${isFilled ? 'fill-[#D8A15D] text-[#D8A15D]' : 'text-neutral-300 opacity-60'}`} />
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 gap-2">
                                  <input
                                    type="text"
                                    required
                                    value={newReviewName}
                                    onChange={(e) => setNewReviewName(e.target.value)}
                                    placeholder="Your name / visitor handle..."
                                    className="w-full bg-[#faf6ee] text-xxs font-mono px-3 py-1.5 border border-[#2c221a]/15 rounded-lg focus:border-amber-600 outline-none placeholder-[#1b1712]/40"
                                  />
                                  <textarea
                                    required
                                    value={newReviewComment}
                                    onChange={(e) => setNewReviewComment(e.target.value)}
                                    placeholder="Share your sensory thoughts or ambience review..."
                                    className="w-full bg-[#faf6ee] text-xxs font-serif italic px-3 py-1.5 border border-[#2c221a]/15 rounded-lg focus:border-amber-600 outline-none resize-none h-14 placeholder-[#1b1712]/40 leading-normal"
                                  />
                                </div>

                                <button
                                  type="button"
                                  onClick={() => {
                                    if (!newReviewName.trim() || !newReviewComment.trim()) return;
                                    const newRev: UserReview = {
                                      id: "r_user_" + Date.now(),
                                      itemName: activeDetailItem.name,
                                      userName: newReviewName.trim(),
                                      rating: newReviewRating,
                                      comment: newReviewComment.trim(),
                                      date: new Date().toISOString().split('T')[0]
                                    };
                                    setReviews(prev => [newRev, ...prev]);
                                    setReviewSubmitSuccess(true);
                                    setNewReviewName("");
                                    setNewReviewComment("");
                                    setNewReviewRating(5);
                                  }}
                                  disabled={!newReviewName.trim() || !newReviewComment.trim()}
                                  className="w-full py-1.5 bg-neutral-900 hover:bg-[#D8A15D] disabled:opacity-45 disabled:hover:bg-neutral-900 text-white hover:text-black font-mono text-[8px] tracking-widest uppercase rounded-lg transition-all duration-300 font-bold outline-none cursor-pointer"
                                >
                                  Save Rating Note
                                </button>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="mt-6 space-y-2 select-none">
                  <div className="p-3 bg-orange-950/5 border border-orange-950/10 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="font-serif italic text-[10px] text-[#1b1712]/50 block">Interactive Service Provision</span>
                      <span className="font-mono text-[9px] text-orange-950 uppercase tracking-widest font-bold">Coordinate Table Sequence</span>
                    </div>
                    <button
                      onClick={() => {
                        setActiveDetailItem(null);
                        onOpenReservation();
                      }}
                      className="px-3.5 py-1.5 bg-neutral-900 hover:bg-[#D8A15D] text-white hover:text-black rounded-md transition-colors font-mono text-[9px] uppercase tracking-wider pointer-events-auto cursor-pointer border border-[#1b1712]/20 shadow"
                    >
                      Hold Space Spot
                    </button>
                  </div>

                  <p className="text-center font-mono text-[8px] text-[#1b1712]/35 uppercase tracking-[0.2em] leading-normal pt-1">
                    * crafted with meticulous biological inputs in hyderabad *
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FULL ORIGINAL DIGITAL MENUS LEAFLET OVERLAY ("ANOTHER PAGE AS REQUESTED") */}
      <AnimatePresence>
        {showFullPhysicalMenu && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-md flex justify-center p-4 sm:p-6 md:p-12">
            
            {/* Close full booklet */}
            <button
              onClick={() => setShowFullPhysicalMenu(false)}
              className="fixed top-6 right-6 z-50 p-2.5 rounded-full bg-white/10 hover:bg-gold/20 border border-white/20 text-white cursor-pointer active:scale-95 transition-all duration-300"
              aria-label="Close booklet"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Central Wood table backdrop for tactile aesthetic */}
            <div className="absolute inset-0 bg-[#0f0a08]/80 mix-blend-multiply opacity-75 select-none touch-none pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, y: 50, rotate: -0.5 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, y: 50, rotate: 0.5 }}
              transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
              className="relative w-full max-w-4xl bg-[#faf6ee] text-[#2c221a] rounded-3xl p-6 md:p-14 shadow-2xl border-4 border-gold/20 flex flex-col justify-between my-auto min-h-[92vh] overflow-hidden"
              id="printed-leaflet-container"
            >
              {/* Corner Foliage exactly simulating the uploaded printed menu images */}
              <div className="absolute top-0 left-0 w-36 h-36 pointer-events-none text-emerald-950/20">
                <svg className="w-full h-full" viewBox="0 0 120 120" fill="currentColor">
                  {/* Stem & Leaves */}
                  <path d="M 0,0 C 20,10 40,30 60,60 M 10,5 Q 15,20 30,22 Q 25,5 10,5 M 25,18 Q 40,30 46,15 Q 30,12 25,18 M 5,12 Q 22,25 25,40 Q 10,35 5,12" />
                  <path d="M 0,0 C 15,25 35,45 50,75 M 5,20 Q 12,38 25,36 Q 22,18 5,20 M 20,38 Q 32,52 38,36 Q 22,30 20,38" />
                </svg>
              </div>

              <div className="absolute top-0 right-0 w-36 h-36 pointer-events-none text-emerald-950/20 transform scale-x-[-1]">
                <svg className="w-full h-full" viewBox="0 0 120 120" fill="currentColor">
                  {/* Stem & Leaves */}
                  <path d="M 0,0 C 20,10 40,30 60,60 M 10,5 Q 15,20 30,22 Q 25,5 10,5 M 25,18 Q 40,30 46,15 Q 30,12 25,18 M 5,12 Q 22,25 25,40 Q 10,35 5,12" />
                  <path d="M 0,0 C 15,25 35,45 50,75 M 5,20 Q 12,38 25,36 Q 22,18 5,20 M 20,38 Q 32,52 38,36 Q 22,30 20,38" />
                </svg>
              </div>

              {/* Header section with scanned calligraphy elegance */}
              <div className="text-center space-y-4 pt-4 pb-8 border-b-2 border-[#2c221a]/10">
                <span className="font-mono text-xs tracking-[0.4em] text-[#d48d3b] uppercase block">
                  CRAFTED REFUGE • HYDERABAD • LUXURY DECK
                </span>
                <h2 className="font-serif italic font-light text-5xl md:text-6xl text-[#2c221a] tracking-tight">
                  Summer Bistro
                </h2>
                <div className="flex justify-center items-center gap-4 text-[10px] font-mono tracking-widest text-[#2c221a]/60 uppercase pt-1">
                  <span>Meticulous inputs</span>
                  <span>•</span>
                  <span>Fine sonic space</span>
                  <span>•</span>
                  <span>24 hours daily</span>
                </div>
              </div>

              {/* Items columns categorized strictly like the scanned menus */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 py-12">
                
                {/* Left Page Column */}
                <div className="space-y-10">
                  {/* ALL DAY BREAKFAST SECTION */}
                  <div className="space-y-6">
                    <h3 className="font-mono text-xs tracking-[0.3em] uppercase text-center text-[#d48d3b] border-b border-[#2c221a]/15 pb-2 font-semibold">
                      • ALL DAY BREAKFAST •
                    </h3>
                    
                    <div className="space-y-5">
                      {menuItems.filter(item => item.category === "Breakfast").map(item => (
                        <div 
                          key={item.name} 
                          className="group/leaf cursor-default p-1 rounded"
                        >
                          <div className="flex justify-between items-end font-serif text-base text-[#2c221a] font-medium">
                            <span className="group-hover/leaf:text-[#d48d3b] transition-colors">{item.name}</span>
                            <span className="border-b border-[#2c221a]/15 border-dotted flex-grow mx-3 mb-1.5" />
                            <span className="font-mono font-medium text-sm text-[#d48d3b]">{item.price}</span>
                          </div>
                          <p className="font-serif italic text-xxs text-[#2c221a]/65 mt-1 leading-normal">
                            {item.ingredients}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SOUPS SECTION */}
                  <div className="space-y-6">
                    <h3 className="font-mono text-xs tracking-[0.3em] uppercase text-center text-[#d48d3b] border-b border-[#2c221a]/15 pb-2 font-semibold">
                      • SOUPS •
                    </h3>
                    
                    <div className="space-y-5">
                      {menuItems.filter(item => item.category === "Soup").map(item => (
                        <div 
                          key={item.name} 
                          className="group/leaf cursor-default p-1 rounded"
                        >
                          <div className="flex justify-between items-end font-serif text-base text-[#2c221a] font-medium">
                            <span className="group-hover/leaf:text-[#d48d3b] transition-colors">{item.name}</span>
                            <span className="border-b border-[#2c221a]/15 border-dotted flex-grow mx-3 mb-1.5" />
                            <span className="font-mono font-medium text-sm text-[#d48d3b]">{item.price}</span>
                          </div>
                          <p className="font-serif italic text-xxs text-[#2c221a]/65 mt-1 leading-normal">
                            {item.ingredients}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SALADS SECTION */}
                  <div className="space-y-6">
                    <h3 className="font-mono text-xs tracking-[0.3em] uppercase text-center text-[#d48d3b] border-b border-[#2c221a]/15 pb-2 font-semibold">
                      • SALADS •
                    </h3>
                    
                    <div className="space-y-5">
                      {menuItems.filter(item => item.category === "Salad").map(item => (
                        <div 
                          key={item.name} 
                          className="group/leaf cursor-default p-1 rounded"
                        >
                          <div className="flex justify-between items-end font-serif text-base text-[#2c221a] font-medium">
                            <span className="group-hover/leaf:text-[#d48d3b] transition-colors">{item.name}</span>
                            <span className="border-b border-[#2c221a]/15 border-dotted flex-grow mx-3 mb-1.5" />
                            <span className="font-mono font-medium text-sm text-[#d48d3b]">{item.price}</span>
                          </div>
                          <p className="font-serif italic text-xxs text-[#2c221a]/65 mt-1 leading-normal">
                            {item.ingredients}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* APPETIZERS - SMALL PLATES */}
                  <div className="space-y-6">
                    <h3 className="font-mono text-xs tracking-[0.3em] uppercase text-center text-[#d48d3b] border-b border-[#2c221a]/15 pb-2 font-semibold">
                      • APPETIZERS - SMALL PLATES •
                    </h3>
                    
                    <div className="space-y-5">
                      {menuItems.filter(item => item.category === "Savory").map(item => (
                        <div 
                          key={item.name} 
                          className="group/leaf cursor-default p-1 rounded"
                        >
                          <div className="flex justify-between items-end font-serif text-base text-[#2c221a] font-medium">
                            <span className="group-hover/leaf:text-[#d48d3b] transition-colors">{item.name}</span>
                            <span className="border-b border-[#2c221a]/15 border-dotted flex-grow mx-3 mb-1.5" />
                            <span className="font-mono font-medium text-sm text-[#d48d3b]">{item.price}</span>
                          </div>
                          <p className="font-serif italic text-xxs text-[#2c221a]/65 mt-1 leading-normal">
                            {item.ingredients}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* STONE OVEN PIZZAS SECTION */}
                  <div className="space-y-6">
                    <h3 className="font-mono text-xs tracking-[0.3em] uppercase text-center text-[#d48d3b] border-b border-[#2c221a]/15 pb-2 font-semibold">
                      • STONE OVEN PIZZAS •
                    </h3>
                    
                    <div className="space-y-5">
                      {menuItems.filter(item => item.category === "Pizza").map(item => (
                        <div 
                          key={item.name} 
                          className="group/leaf cursor-default p-1 rounded"
                        >
                          <div className="flex justify-between items-end font-serif text-base text-[#2c221a] font-medium">
                            <span className="group-hover/leaf:text-[#d48d3b] transition-colors">{item.name}</span>
                            <span className="border-b border-[#2c221a]/15 border-dotted flex-grow mx-3 mb-1.5" />
                            <span className="font-mono font-medium text-sm text-[#d48d3b]">{item.price}</span>
                          </div>
                          <p className="font-serif italic text-xxs text-[#2c221a]/65 mt-1 leading-normal">
                            {item.ingredients}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Page Column */}
                <div className="space-y-10">
                  {/* DESSERTS SECTION */}
                  <div className="space-y-6">
                    <h3 className="font-mono text-xs tracking-[0.3em] uppercase text-center text-[#d48d3b] border-b border-[#2c221a]/15 pb-2 font-semibold">
                      • DESSERTS •
                    </h3>
                    
                    <div className="space-y-5">
                      {menuItems.filter(item => item.category === "Dessert").map(item => (
                        <div 
                          key={item.name} 
                          className="group/leaf cursor-default p-1 rounded"
                        >
                          <div className="flex justify-between items-end font-serif text-base text-[#2c221a] font-medium">
                            <span className="group-hover/leaf:text-[#d48d3b] transition-colors">{item.name}</span>
                            <span className="border-b border-[#2c221a]/15 border-dotted flex-grow mx-3 mb-1.5" />
                            <span className="font-mono font-medium text-sm text-[#d48d3b]">{item.price}</span>
                          </div>
                          <p className="font-serif italic text-xxs text-[#2c221a]/65 mt-1 leading-normal">
                            {item.ingredients}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* BOBA MIXES SECTION */}
                  <div className="space-y-6">
                    <h3 className="font-mono text-xs tracking-[0.3em] uppercase text-center text-[#d48d3b] border-b border-[#2c221a]/15 pb-2 font-semibold">
                      • BOBA MIXES •
                    </h3>
                    
                    <div className="space-y-5">
                      {menuItems.filter(item => item.category === "Boba" || item.name.includes("Boba")).map(item => (
                        <div 
                          key={item.name} 
                          className="group/leaf cursor-default p-1 rounded"
                        >
                          <div className="flex justify-between items-end font-serif text-base text-[#2c221a] font-medium">
                            <span className="group-hover/leaf:text-[#d48d3b] transition-colors">{item.name}</span>
                            <span className="border-b border-[#2c221a]/15 border-dotted flex-grow mx-3 mb-1.5" />
                            <span className="font-mono font-medium text-sm text-[#d48d3b]">{item.price}</span>
                          </div>
                          <p className="font-serif italic text-xxs text-[#2c221a]/65 mt-1 leading-normal">
                            {item.ingredients}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* HOT & COLD STIMULATORS SECTION */}
                  <div className="space-y-6">
                    <h3 className="font-mono text-xs tracking-[0.3em] uppercase text-center text-[#d48d3b] border-b border-[#2c221a]/15 pb-2 font-semibold">
                      • HOT & COLD STIMULATORS •
                    </h3>
                    
                    <div className="space-y-5">
                      {menuItems.filter(item => item.category === "Coffee" || item.category === "Matcha").map(item => (
                        <div 
                          key={item.name} 
                          className="group/leaf cursor-default p-1 rounded"
                        >
                          <div className="flex justify-between items-end font-serif text-base text-[#2c221a] font-medium">
                            <span className="group-hover/leaf:text-[#d48d3b] transition-colors">{item.name}</span>
                            <span className="border-b border-[#2c221a]/15 border-dotted flex-grow mx-3 mb-1.5" />
                            <span className="font-mono font-medium text-sm text-[#d48d3b]">{item.price}</span>
                          </div>
                          <p className="font-serif italic text-xxs text-[#2c221a]/65 mt-1 leading-normal">
                            {item.ingredients}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* HOUSE SPECIALS SECTION */}
                  <div className="space-y-6">
                    <h3 className="font-mono text-xs tracking-[0.3em] uppercase text-center text-[#d48d3b] border-b border-[#2c221a]/15 pb-2 font-semibold">
                      • HOUSE SPECIALS •
                    </h3>
                    
                    <div className="space-y-5">
                      {menuItems.filter(item => item.category === "Special").map(item => (
                        <div 
                          key={item.name} 
                          className="group/leaf cursor-default p-1 rounded"
                        >
                          <div className="flex justify-between items-end font-serif text-base text-[#2c221a] font-medium">
                            <span className="group-hover/leaf:text-[#d48d3b] transition-colors">{item.name}</span>
                            <span className="border-b border-[#2c221a]/15 border-dotted flex-grow mx-3 mb-1.5" />
                            <span className="font-mono font-medium text-sm text-[#d48d3b]">{item.price}</span>
                          </div>
                          <p className="font-serif italic text-xxs text-[#2c221a]/65 mt-1 leading-normal">
                            {item.ingredients}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom fine print note representing physical printed menu aesthetics */}
              <div className="text-center pt-6 border-t border-[#2c221a]/10 space-y-1.5">
                <p className="font-serif italic text-xs text-[#2c221a]/60">
                  “All prices are inclusive of curated acoustics and slow ambient lights.”
                </p>
                <p className="font-mono text-[8px] tracking-[0.25em] text-[#d48d3b] uppercase">
                  ESTD 2024 • HYDERABAD • LATE NIGHT INTELLECT RESCUE
                </p>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
