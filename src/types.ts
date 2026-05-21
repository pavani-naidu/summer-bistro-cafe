export interface MenuItem {
  name: string;
  price: string;
  category: "Coffee" | "Matcha" | "Pizza" | "Savory" | "Special" | "Dessert" | "Boba" | "Breakfast" | "Soup" | "Salad";
  ingredients: string;
  tags: string[];
  imageUrl?: string;
}

export type IntentPill = "Date Night" | "Content Creation" | "Late Chill" | "Coffee Network";

export interface ReservationForm {
  fullName: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  intent: IntentPill;
}

export const CATEGORIES = ["All", "Coffee", "Matcha", "Pizza", "Savory", "Special", "Dessert", "Boba", "Breakfast", "Soup", "Salad"] as const;

export const menuItems: MenuItem[] = [
  // --- SIGNATURES / EXISTING DECK ---
  {
    name: "Lotus Biscoff Cream Brew",
    price: "₹420",
    category: "Coffee",
    ingredients: "Slow-dripped organic espresso cold brew, caramelized Lotus cookie butter smooth reduction, double-whipped sweet cream, and a crumbled caramelized Biscoff biscuit crown.",
    tags: ["Signature", "House Cold Brew", "Sweet Cream"],
    imageUrl: "https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Premium Iced Matcha Latte",
    price: "₹380",
    category: "Matcha",
    ingredients: "Stone-ground Uji ceremonial grade matcha, organic light oat milk splash, dynamic blossom honey swirl, served over crystal cold spheres.",
    tags: ["Ceremonial Grade", "Antioxidant", "Oat Milk Native"],
    imageUrl: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "Lamb Pepperoni Pizza",
    price: "₹650",
    category: "Pizza",
    ingredients: "Double-fermented 48-hour sourdough base, rich San Marzano tomato spread, premium smoked hand-torn lamb pepperoni, sweet basil leaves, and bubbling fresh bocconcini mozzarella.",
    tags: ["Sourdough", "Stone Baked", "Late Night Comfort"],
    imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "Gourmet Bagels with Cream Cheese",
    price: "₹310",
    category: "Savory",
    ingredients: "Traditional artisanal hand-boiled malt bagel, generous spread of whipped chive & garlic cream cheese, microgreens, and toasted organic sesame seed sprinkles.",
    tags: ["Artisanal Baker", "Vegetarian", "Savory Classic"],
    imageUrl: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "Orange Espresso",
    price: "₹280",
    category: "Coffee",
    ingredients: "Single-origin hand-blown double espresso shot layered delicately over chilled raw Valencia orange juice nectar, finished with a fresh aromatic rosemary torch.",
    tags: ["Citrus Note", "Cold Brew Fusion", "Vibrant & Bold"],
    imageUrl: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Basic Human Needs Cold Latte",
    price: "₹360",
    category: "Coffee",
    ingredients: "Classically smooth double-ristretto signature blend, shaken with structural whole milk and a touch of raw organic cane liquid extract to restore biological balance.",
    tags: ["Classic Sip", "Pure Espresso", "Hyderabad Staple"],
    imageUrl: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "Lamb Chops",
    price: "₹720",
    category: "Special",
    ingredients: "Premium oven-seared baby lamb chops encrusted with dynamic rosemary, garlic butter glaze, paired with roasted baby potatoes and a custom home-whipped red wine reduced jus.",
    tags: ["Nizami Luxury Meets West", "Rich Texture", "Chef Recommendation"],
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop"
  },

  // --- ALL DAY BREAKFAST ---
  {
    name: "English Breakfast",
    price: "₹450",
    category: "Breakfast",
    ingredients: "Two farm-fresh organic eggs prepared to order, grilled chicken sausages, sautéed wild mushrooms, baked beans, and sourdough toast.",
    tags: ["Classic Morning", "Sourdough Native"],
    imageUrl: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Omlette",
    price: "₹220",
    category: "Breakfast",
    ingredients: "Classic fluffy three-egg omelette frothed with fresh dynamic herbs, served with a side of microgreens and toasted sourdough.",
    tags: ["Egg Classic", "High Protein", "Breakfast Comfort"],
    imageUrl: "https://images.unsplash.com/photo-1510629900089-c33b1e3241b9?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Triply Chocolate Pancake",
    price: "₹280",
    category: "Breakfast",
    ingredients: "Stacked fluffy pancakes layered with rich milk, dark, and white Belgian chocolate ganache, finished with cocoa dust.",
    tags: ["Sweet", "Chocolate Native", "Indulgence"],
    imageUrl: "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Oat Nut Deelishus Pancake",
    price: "₹320",
    category: "Breakfast",
    ingredients: "Healthy oat-flour pancakes topped with dynamic crushed almonds, walnuts, raw honey, and fresh sliced bananas.",
    tags: ["Healthy Option", "Nutty", "Oat Flour Base"],
    imageUrl: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "The Sweet Spot Nutella Crepe",
    price: "₹300",
    category: "Breakfast",
    ingredients: "Paper-thin classic French crepe folded with a generous Nutella spread, toasted hazelnuts, and powdered sugar.",
    tags: ["Crepe", "Nutella", "Sweet Cravings"],
    imageUrl: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Crepe",
    price: "₹250",
    category: "Breakfast",
    ingredients: "Classic delicate French crepe served warm with organic butter and pure maple syrup reduction.",
    tags: ["Simple Classic", "French Style"],
    imageUrl: "https://images.unsplash.com/photo-1621303837876-254c68062904?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "You, Me & Blueberry Crepe",
    price: "₹310",
    category: "Breakfast",
    ingredients: "Artisanal folded crepe stuffed with fresh wild blueberry compote and light sweetened cream cheese glaze.",
    tags: ["Blueberry", "Cream Cheese", "Cozy Morning"],
    imageUrl: "https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Waffle (Blueberry & Hazelnut)",
    price: "₹290",
    category: "Breakfast",
    ingredients: "Crispy golden waffle topped with rich wild blueberry glaze, toasted hazelnuts, and fresh whipped cream.",
    tags: ["Waffle Classic", "Crispy", "Berries & Nuts"],
    imageUrl: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Scrambled Egg Croissant",
    price: "₹290",
    category: "Breakfast",
    ingredients: "Buttery, flaky fresh-baked croissant stuffed with soft, creamy scrambled eggs, chives, and microgreens.",
    tags: ["Croissant Native", "Flaky", "Savory Morning"],
    imageUrl: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "French Toast Classic / Hazelnut",
    price: "₹280 / ₹320",
    category: "Breakfast",
    ingredients: "Thick brioche slices soaked in vanilla custard, pan-fried to golden, available classic or with hazelnut spread.",
    tags: ["Brioche Native", "Custard Soaked", "Late Night Comfort"],
    imageUrl: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&q=80&w=800"
  },

  // --- SOUPS ---
  {
    name: "Roasted Tomato & Basil",
    price: "₹220",
    category: "Soup",
    ingredients: "Slow-roasted plum tomatoes blended with fresh basil leaves, extra virgin olive oil, served with garlic herb crostini.",
    tags: ["Vegan", "Warm Bowl", "Basil Rich"],
    imageUrl: "https://images.unsplash.com/photo-1547592165-e1d17fed6006?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Cream of Broccoli with Almond Flakes",
    price: "₹220",
    category: "Soup",
    ingredients: "Rich, velvety broccoli puree cooked with fresh organic cream, topped with toasted almond flakes.",
    tags: ["Vegetarian", "Creamy", "Nutty Crunch"],
    imageUrl: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Chicken Shredded Lentil Soup",
    price: "₹220",
    category: "Soup",
    ingredients: "Hearty shredded chicken breast simmered with yellow lentils, warming spices, and fresh coriander.",
    tags: ["High Protein", "Warm & Hearty"],
    imageUrl: "https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?auto=format&fit=crop&q=80&w=800"
  },

  // --- SALADS ---
  {
    name: "Caesar Salad (Veg / Non-Veg)",
    price: "₹280 / ₹320",
    category: "Salad",
    ingredients: "Crisp romaine lettuce tossed in creamy Caesar dressing, parmesan shavings, garlic croutons, with choice of grilled chicken.",
    tags: ["Classic Salad", "Romaine Native"],
    imageUrl: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Strawberry & Quinoa Salad",
    price: "₹310",
    category: "Salad",
    ingredients: "Fluffy quinoa, fresh sweet strawberries, organic baby spinach, roasted pumpkin seeds, tossed in a citrus vinaigrette.",
    tags: ["Superfood", "Fruity", "Light & Fresh"],
    imageUrl: "https://images.unsplash.com/photo-1608797178974-15b35a61d121?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Watermelon Feta Salad",
    price: "₹300",
    category: "Salad",
    ingredients: "Chilled compressed seedless watermelon blocks, crumbled rich Greek feta, fresh garden mint, finished with a balsamic reduction.",
    tags: ["Refreshing Light", "Gluten Free", "Summer Classic"],
    imageUrl: "https://images.unsplash.com/photo-1621510456681-23a23cfb5f57?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Quinoa & Avocado Salad",
    price: "₹320",
    category: "Salad",
    ingredients: "Organic white quinoa, ripe avocado slices, cherry tomatoes, cucumbers, tossed in fresh lemon-herb dressing.",
    tags: ["Superfood", "Healthy Fats", "Vegan Native"],
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800"
  },

  // --- APPETIZERS - SMALL PLATES (SAVORY) ---
  {
    name: "Jalapeno Sticks",
    price: "₹290",
    category: "Savory",
    ingredients: "Crispy breaded jalapeno pepper halves stuffed with rich cream cheese and melted mozzarella, served with garlic aioli.",
    tags: ["Spicy", "Cheesy", "Crowd Favorite"],
    imageUrl: "https://images.unsplash.com/photo-1531749668029-2db88e4b76c0?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Popcorn Paneer / Chicken",
    price: "₹300",
    category: "Savory",
    ingredients: "Bite-sized crunchy fried paneer or chicken chunks tossed in spicy dry herbs seasoning, served with sriracha dip.",
    tags: ["Crunchy", "Spicy Bite", "All-Day Snack"],
    imageUrl: "https://images.unsplash.com/photo-1562967914-608b82629710?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Garlic Bread Plain / Cheese / Chilli Cheese",
    price: "₹190 / ₹200 / ₹220",
    category: "Savory",
    ingredients: "Toasted baguette slices with garlic butter, available plain, with cheese, or with spicy green chillies.",
    tags: ["Baguette Native", "Garlic Rich", "Sharing Plate"],
    imageUrl: "https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Onion Rings",
    price: "₹230",
    category: "Savory",
    ingredients: "Thick-cut sweet white onions, batter-fried in custom golden breadcrumbs, served with chipotle dip.",
    tags: ["Crunchy", "Vegetarian Classic"],
    imageUrl: "https://images.unsplash.com/photo-1639024471283-2da7b3c6a267?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Prince Fries Classic / Peri Peri / Cheesy",
    price: "₹210 / ₹220 / ₹240",
    category: "Savory",
    ingredients: "Golden-crisp potato fries, available classic salted, dusted with peri-peri spice, or smothered in cheese sauce.",
    tags: ["All-Time Classic", "Potato Native"],
    imageUrl: "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Chicken Wings (Barbeque / Garlic Parmesan)",
    price: "₹320 / ₹340",
    category: "Savory",
    ingredients: "Crispy chicken wings tossed in smoky barbecue sauce or creamy garlic and parmesan cheese.",
    tags: ["Wings", "Meat Lover", "Rich Flavor"],
    imageUrl: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Chicken Tenders",
    price: "₹300 / ₹340",
    category: "Savory",
    ingredients: "Crispy hand-breaded golden chicken breast strips served with honey mustard dip.",
    tags: ["Crispy", "Tender Cut", "Dip Companion"],
    imageUrl: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=800"
  },

  // --- DESSERTS ---
  {
    name: "Chocolate Dome",
    price: "₹445",
    category: "Dessert",
    ingredients: "Rich Belgian chocolate sphere melted table-side with warm organic caramel glaze, enclosing a core of Madagascan vanilla bean gelato and dark cocoa sponge.",
    tags: ["Sensory Dessert", "Table Show", "Valrhona Chocolate"],
    imageUrl: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Nutella Mousse Cake",
    price: "₹495",
    category: "Dessert",
    ingredients: "Decadent layered chocolate cake with a light, airy Nutella mousse filling, covered in smooth chocolate ganache.",
    tags: ["Nutella", "Cake", "Chocolate Heavy"],
    imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Deconstructed Banoffee",
    price: "₹410",
    category: "Dessert",
    ingredients: "Crisp speculoos biscuit crumble layer, dense caramelized banana puree compote, smooth salted caramel reduction, double-whipped vanilla diplomat cream, finished with coffee bean dust.",
    tags: ["Tasting Classic", "Chef Specialty"],
    imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Stuffed Brioche French Toast",
    price: "₹495",
    category: "Dessert",
    ingredients: "Thick-slice brioche stuffed with sweetened cream cheese and fresh berries, fried golden and dusted with sugar.",
    tags: ["Sweet Brioche", "Cream Cheese Filled"],
    imageUrl: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Sticky Toffee Pudding",
    price: "₹415",
    category: "Dessert",
    ingredients: "Classic warm sponge cake made with finely chopped dates, covered in a rich and warm buttery toffee sauce.",
    tags: ["Date Sponge", "Toffee Drizzle", "Warm Sweet"],
    imageUrl: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Classic Tiramisu",
    price: "₹415",
    category: "Dessert",
    ingredients: "Savoiardi ladyfingers soaked in dark espresso and coffee liqueur, layered with mascarpone cream and cocoa powder.",
    tags: ["Coffee Flavour", "Italian Classic"],
    imageUrl: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Creme Brulee 3 Ways",
    price: "₹525",
    category: "Dessert",
    ingredients: "Silky smooth custard base topped with a textually contrasting layer of hardened caramelized sugar, in three flavors.",
    tags: ["Caramelized", "Smooth Custard"],
    imageUrl: "https://images.unsplash.com/photo-1516685018646-549198525c1b?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Choco Lava Cake",
    price: "₹515",
    category: "Dessert",
    ingredients: "Warm dark chocolate cake with a liquid molten cocoa core, served with a scoop of premium vanilla ice cream.",
    tags: ["Molten Core", "Vanilla Scoop"],
    imageUrl: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Tarte Tatin",
    price: "₹550",
    category: "Dessert",
    ingredients: "Upside-down caramelized apple tart baked with flaky puff pastry, served with vanilla whipped cream.",
    tags: ["Apple Tart", "Puff Pastry"],
    imageUrl: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "New York Cheesecake",
    price: "₹225",
    category: "Dessert",
    ingredients: "Rich, dense, and creamy baked cheesecake on a classic buttery graham cracker crust.",
    tags: ["Baked Classic", "Cream Cheese Heavy"],
    imageUrl: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Tiramisu",
    price: "₹225",
    category: "Dessert",
    ingredients: "Elegant espresso-soaked Italian dessert layered with whipped mascarpone cream.",
    tags: ["Coffee Classic", "Bite-Sized Dessert"],
    imageUrl: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=800"
  },

  // --- BOBA MIXES ---
  {
    name: "Brown Sugar & Milk Boba",
    price: "₹289",
    category: "Boba",
    ingredients: "Warm brown sugar tapioca pearls served with fresh cold milk and signature brown sugar syrup glaze.",
    tags: ["Brown Sugar Pearls", "Milk Native"],
    imageUrl: "https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Choco Hazelnut & Sea Salt Boba",
    price: "₹289",
    category: "Boba",
    ingredients: "Warm organic tapioca pearls, premium Belgian chocolate fusion, creamy whole split hazelnut milk reduction, topped with a custom sea salty cream foam crown.",
    tags: ["Hand-made Boba", "Indulgent Mix"],
    imageUrl: "https://images.unsplash.com/photo-1558857563-b3719d087e59?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Green Tea & Cream Cheese Boba",
    price: "₹289",
    category: "Boba",
    ingredients: "Chilled green tea boba mixed with sweet milk, capped with a thick savory cream cheese foam layer.",
    tags: ["Green Tea", "Cream Cheese Foam"],
    imageUrl: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Old Number Seven Boba Coffee",
    price: "₹269",
    category: "Boba",
    ingredients: "Signature espresso boba iced latte sweetened with condensed milk and loaded with signature tapioca pearls.",
    tags: ["Espresso Boba", "Late Night Latte"],
    imageUrl: "https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&q=80&w=800"
  },

  // --- HOT & COLD STIMULATORS (COFFEE) ---
  {
    name: "Filter Coffee",
    price: "₹149",
    category: "Coffee",
    ingredients: "Traditional Indian drip brew using a chicory-coffee blend, frothed with hot milk in brass tumbler.",
    tags: ["South Indian", "Traditional Brew"],
    imageUrl: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Americano",
    price: "₹190",
    category: "Coffee",
    ingredients: "Double shot of rich espresso diluted with hot water for a distinct smooth black coffee profile.",
    tags: ["Black Coffee", "Bold"],
    imageUrl: "https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Espresso Macchiato",
    price: "₹240",
    category: "Coffee",
    ingredients: "Bold espresso shot stained with a dollop of hot, frothed milk foam.",
    tags: ["Short Espresso", "Stained Milk"],
    imageUrl: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Cappuccino",
    price: "₹250",
    category: "Coffee",
    ingredients: "Perfectly balanced espresso shot with equal parts steamed milk and thick milk foam.",
    tags: ["Classic Cappuccino", "Frothed"],
    imageUrl: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Mocha",
    price: "₹250",
    category: "Coffee",
    ingredients: "Espresso shot combined with rich chocolate syrup and smooth steamed milk.",
    tags: ["Chocolate Mocha", "Sweet & Strong"],
    imageUrl: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Hot Chocolate",
    price: "₹250",
    category: "Coffee",
    ingredients: "Warm Belgian chocolate melted into creamy steamed milk, topped with mini marshmallows.",
    tags: ["Sweet Warmth", "Belgian Chocolate"],
    imageUrl: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&q=80&w=800"
  }
];
