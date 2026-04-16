/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu as MenuIcon, 
  X, 
  Star, 
  MapPin, 
  Clock, 
  Phone, 
  Instagram, 
  ChevronRight,
  UtensilsCrossed,
  ArrowRight
} from 'lucide-react';

// --- Types ---
interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  tag?: string;
}

const MENU_CATEGORIES = ['Bites Special', 'Chinese', 'Chowmein', 'Rolls', 'South Indian'];

const MENU_ITEMS: Record<string, MenuItem[]> = {
  'Bites Special': [
    {
      id: 'bs1',
      name: 'Litti Chokha',
      description: 'Traditional roasted wheat balls served with mashed spiced potatoes & brinjal.',
      price: '₹30',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHGnBCdUeyEW1L5cs_xG3XBI7hN5FydBqBzwIAuH8Bdzaraa-rXdXFpf0zym75i-QhAABESU182lzwa4G_kuMvUxmHSbTpMLFPxSkcmDsYYZGW9as6-7LhRUwP9NeALv1Z46NP1BgKrP_pUh5YHh1Jb8ok-1ooLbqpWqJ5kfeY8iHBaN-0Oxa4-n6al-X6EUBtO4JC-JE5BohSv-kDbNKKoOqbGEhnOCiYkW34VXYT1vjGOHSSsMutmKnSLkPiOmIId3G0yBXalz2q'
    },
    {
      id: 'bs3',
      name: 'Veg Chowmein + Paneer Chilli',
      description: 'A festive combo plate featuring stir-fried noodles and glistening chili paneer.',
      price: '₹170',
      tag: 'Best Seller Combo',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArvLqkzQlEk0-zJaQHWfgdKlRj4gsqKqeFCe4HL-BgqIFIRoSE3skTzDItj9BTgsDrrEAdg7RBIX-hw5T5D831cZBh2Os6vhhIvnxjMAjgf-1iGFxnA3UPIrLvgq4LSvq8A2wvVnfINehEAIdH06fM3Z5rzXeVOlKcjyphtBQEDYPT3OSc0NutHysis17Gi5SMNhRgUhZFExJDjkpKR1KSuSY_c679W0rjQnQY75gVXZswjWYFNYi2gxCAN4fznNxtRLqIbdhCST-I'
    }
  ],
  'Chinese': [
    {
      id: 'ch1',
      name: 'Paneer Chilli',
      description: 'Crispy paneer cubes tossed in a spicy and tangy chilli sauce with bell peppers.',
      price: 'Half ₹75 | Full ₹145',
      image: '/Chilli-Paneer.jpg'
    }
  ],
  'Chowmein': [
    {
      id: 'cw1',
      name: 'Veg Chowmein',
      description: 'Classic stir-fried noodles with a mix of fresh cabbage, carrots, and capsicum.',
      price: 'Half ₹25 | Full ₹40',
      image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'cw2',
      name: 'Chicken Chowmein',
      description: 'Wok-tossed noodles with tender chicken pieces and aromatic spices.',
      price: 'Half ₹80 | Full ₹150',
      image: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?q=80&w=800&auto=format&fit=crop'
    }
  ],
  'Rolls': [
    {
      id: 'r3',
      name: 'Chicken Roll',
      description: 'Flavorful chicken chunks roasted to perfection and rolled in a soft paratha.',
      price: '₹85',
      image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=800&auto=format&fit=crop'
    }
  ],
  'South Indian': [
    {
      id: 'si1',
      name: 'Dosa',
      description: 'Crispy fermented crepe made from rice batter and black lentils, served with chutney and sambar.',
      price: '₹100',
      image: '/dosa.jpg'
    },
    {
      id: 'si2',
      name: 'Idli',
      description: 'Soft and fluffy steamed rice cakes, a healthy and delicious South Indian classic.',
      price: '₹60',
      image: '/idli.jpg'
    }
  ]
};

const TESTIMONIALS = [
  {
    name: 'Rohit Sharma',
    location: 'Kanke, Ranchi',
    text: '"The Litti Chokha here is absolutely authentic. Reminds me of home every single time!"'
  },
  {
    name: 'Priya Singh',
    location: 'Doranda, Ranchi',
    text: '"Best Chicken Chowmein in Ranchi! The portions are generous and the spice level is perfect."'
  },
  {
    name: 'Amit Kumar',
    location: 'Harmu, Ranchi',
    text: '"The Paneer Chilli is simply outstanding. Crispy and coated perfectly in the sauce!"'
  },
  {
    name: 'Sneha Verma',
    location: 'Bariatu, Ranchi',
    text: '"Tried the Combo meal — Veg Chowmein with Paneer Chilli. Incredible value for money!"'
  }
];

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 glass-nav shadow-sm transition-all">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center gap-3">
          <img 
            alt="Take A Bites Logo" 
            className="h-10 w-10 object-contain" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfqmUWGoDxRtKKxiNocVI8jWhAGfR9TVOXmt9jK6Fyww6h6o9UIfsGJWBuSiL7BdkoweuDO-7cHC4BGN4oyIgt5xQbJ1JMf9w0rmBll2VCG4kMxPvpp9d5V-LaEMxN8xp8dTAfR2yckC2MQCsoo_gRlBMbmyoXOzMxO2T4R7Q4DxthQ0v6oeu8dVNFi9R9Fdz9V5C5-IhA0a46lEHMVBEYGP-0BjTLqGG1g5Z9ZppD5LzIf11mzE3BXBAEBpH-icWASyWkcQJwmIY2"
            referrerPolicy="no-referrer"
          />
          <span className="text-2xl font-black text-primary uppercase tracking-tight font-headline">
            Take A Bites
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 font-headline font-bold tracking-tight">
          {['Home', 'Menu', 'Testimonials', 'Contact'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-zinc-600 hover:text-primary transition-colors duration-300 relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <button className="md:hidden text-on-surface" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <MenuIcon size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-surface border-t border-outline-variant/10 px-6 py-8 flex flex-col gap-6 font-headline font-bold"
          >
            {['Home', 'Menu', 'Testimonials', 'Contact'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-2xl text-zinc-600"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative pt-32 pb-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-high rounded-full text-secondary font-bold text-sm mb-6">
            <Star size={16} fill="currentColor" />
            Ranchi's Favorite Food Hub
          </div>
          <h1 className="font-headline text-6xl md:text-8xl font-extrabold tracking-tighter text-on-surface leading-[0.9] mb-8">
            Savor <span className="text-primary italic">Every</span> Bite.
          </h1>
          <p className="text-xl md:text-2xl text-on-surface-variant max-w-lg mb-10 leading-relaxed">
            Fresh ingredients, bold flavors, and a passion for good food — served hot at Take A Bites, Ranchi.
          </p>
          <div className="flex flex-wrap gap-4">
            <a 
              href="#menu"
              className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform editorial-shadow"
            >
              Explore Menu
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 2 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative lg:h-[600px]"
        >
          <div className="absolute -top-10 -right-10 w-72 h-72 bg-secondary-container/10 rounded-full blur-3xl" />
          <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-2xl hover:rotate-0 transition-transform duration-500">
            <img 
              className="h-full w-full object-cover" 
              alt="Glistening spicy chicken noodles"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2WeU3BpkMLBXXLRQTTU4bWg9YMFGn3WBVNItLhBLM4A9iqPsbRJ6cJgcKaeFm8x_gr5olpxpbP26m19UapJqcbmlDYtuThzXaZC43o4ijIlQs-6QEKsrGTyyM6VM9IrClCiKr-48CpSDvEFqJ_Qrv5pEo0NW1wRn6PConwi2jQV5Tki1kC_UnnLdG7ZRJtK1AJG1xbJ4gnM3TSSJi7MvciSPkXr_0lrO3bfp1kwq23PZOAWjA5l517CUEQTXEgEj_lfHBGZt8HZ9b"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute -bottom-6 -left-6 bg-surface p-6 rounded-2xl editorial-shadow max-w-[240px] border border-outline-variant/10"
          >
            <div className="flex items-center gap-1 mb-2 text-secondary">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <p className="text-sm font-medium italic">"Best Chowmein in Ranchi, hands down!"</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('Bites Special');

  return (
    <section id="menu" className="py-24 bg-surface-container-low px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-headline text-5xl font-black mb-4 uppercase tracking-tighter">Our Menu</h2>
          <div className="h-1.5 w-24 bg-primary mx-auto rounded-full" />
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {MENU_CATEGORIES.map((cat) => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full font-bold transition-all ${
                activeCategory === cat 
                ? 'bg-secondary-container text-on-secondary-container shadow-sm' 
                : 'bg-surface-container-highest hover:bg-secondary-container/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="wait">
            {MENU_ITEMS[activeCategory]?.length > 0 ? (
              MENU_ITEMS[activeCategory].map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-surface p-6 rounded-3xl editorial-shadow group hover:-translate-y-1 transition-all"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-headline font-bold text-xl mb-1">{item.name}</h3>
                      <p className="text-sm text-on-surface-variant">{item.description}</p>
                      {item.tag && (
                        <p className="text-xs text-on-secondary-container bg-secondary-container/20 px-2 py-0.5 rounded inline-block font-bold mt-2">
                          {item.tag}
                        </p>
                      )}
                    </div>
                    <span className="text-primary font-black text-xl">{item.price}</span>
                  </div>
                  <div className="h-48 w-full rounded-2xl overflow-hidden mt-4">
                    <img 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center text-on-surface-variant font-medium">
                Coming soon... We're curating the best flavors for you!
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const images = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBD0pySffyfXxw8-D2vRTMCcD4klOz0a9lZsvBA6NEtwf-XhFvDPO1bDzzk69CENL-WSkZqlod_YCGTux7vkDQfssOECWl3aLVyJRUOgMVshb8gVwPUgP5psdlnPkTy_Iz5jYsaIRjlHxhMo5eEVk7cGXIuMleli_P1sUS0PiIJEAdlgl8MKvVA1vZI6bqPItkFOswcW7CGDMSMvlghpOjxZm2ZH-hdLGwcAaNFvQAKwLMDNmsK1cE8amUXZTH7W42M3Mkwdp-47OBD",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB_OxH_qOgoQVZYkVo1JzzenaFfY8Dd4NAdd6SAp2txAOXeLDlui5aRpXx92aDOjLY3aBSgA0gqpTsdPaTvxOK-k9bqD4GoMeakxLI7I70JhCOZ9jMJ6cnY4eX3Bg52pxJcw4LVNnpGeSSRxxNAWUnl7Y3jQCa2fpa9VraqcrcnZvt43GrMVTZD3FKyzMVc5HWf44eZorM7_VQaQLrSS9gXbezhoRjx_qlOcWND5-8cVi24wFTik0konJnEGOeOn6QH5SYOG7FIyyAH",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBQtCoZO_ynz75EPhHmX9W7Chb502mncQDiDa1gNnULfNPZxUVtHR3ti09T8h5LNIo2tDkNyYR76l40Gxc6Vlz0ZOifXxI6ZB7T6zPHF0tHiWwD0JYOwRPoOAY91_sk-h5HGgc8Ra7Y9PvtHhVubfymGmWiV6_3V7oML5KI4K1lUKxwRiH3Ei_X5EWyYaXKZm5Vvz32KW1hQVqBGIHOsCO-G_iFhrspbXTwq0-gZ2DoA-MTdtNpJzz2vmwbtKkBbm-ZrLeOSLbYzgrb",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCRJ0vTy0AiuAGRR1rH3Bs942W99UmS2e4PqOsSDjv8bS8bjiuPp59wyYUUF-W2wuGgnn_DypRzhk55bAF6UB785CG1J0o6z6Gq6TmS_me4_GohXZqfj1Cv6XIwcgWSfS7yGrYsMBb4aQXuz_GpWWQbvVEfdCJgU9fWZTXIdsYK4Qbdj024fGiS4RZjHJfQFsuUbdgZdA7ARN_pEJ66lm_a05rA8bVZSpakQBFzoA--lCUbihGgLuM25-xa2keHcNL9GK9yTV2ILIb4"
  ];

  return (
    <section className="py-24 overflow-hidden px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="font-headline text-5xl font-black uppercase tracking-tighter">A Feast for Your Eyes</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px]">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="h-full rounded-3xl overflow-hidden group"
          >
            <img className="h-full w-full object-cover" src={images[0]} alt="Food 1" referrerPolicy="no-referrer" />
          </motion.div>
          <div className="h-full grid grid-rows-2 gap-6">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="rounded-3xl overflow-hidden group"
            >
              <img className="h-full w-full object-cover" src={images[1]} alt="Food 2" referrerPolicy="no-referrer" />
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="rounded-3xl overflow-hidden group"
            >
              <img className="h-full w-full object-cover" src={images[2]} alt="Food 3" referrerPolicy="no-referrer" />
            </motion.div>
          </div>
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="h-full rounded-3xl overflow-hidden group"
          >
            <img className="h-full w-full object-cover" src={images[3]} alt="Food 4" referrerPolicy="no-referrer" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-surface px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-headline text-5xl font-black mb-4 uppercase tracking-tighter">They Love Us ❤️</h2>
          <p className="text-on-surface-variant font-medium">Real stories from our food-loving community in Ranchi.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-surface-container-low p-8 rounded-3xl border border-outline-variant/10 hover:border-primary/20 transition-colors"
            >
              <div className="flex text-secondary mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-on-surface mb-6 leading-relaxed italic">{t.text}</p>
              <div>
                <p className="font-headline font-bold">{t.name}</p>
                <p className="text-sm text-on-surface-variant">{t.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-surface-container px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-headline text-5xl font-black mb-8 uppercase tracking-tighter">Find Us</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-xl text-primary">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Our Address</h4>
                  <p className="text-on-surface-variant">Bukru, Chowk, opp. Bank of Baroda,<br/>Kanke, Ranchi, Jharkhand 834006</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-xl text-primary">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Opening Hours</h4>
                  <p className="text-on-surface-variant">Mon - Sun: 11:00 AM - 10:30 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-xl text-primary">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Contact Details</h4>
                  <p className="text-on-surface-variant">+91 79030 04125</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="h-[450px] rounded-3xl overflow-hidden editorial-shadow border-4 border-surface relative group">
            <img 
              className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-700" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgR6Trqb_3lcLUYdNcJ4AsNlkHk8dgieXMZ58HtYRjH_cRG_aEjLvHKcZCv1ofBfxQxUR3CIDcjpZp33oL-c2VR0oCRl-pvSo-PAn_zfGzRDxVjtNL_8KGQzVgr2oQoMutGu2sO3bWmEn5aLxm1dPWl6E2XDsJF9-OXOTEaaPHUjQtGC2aUL2ycDOlFWpsnht5P1zKhzjwWhMp8lRbbhgySkxpLEXvnhrFF0kkvEZJ_kTaf_dvS3l_Sky-i1i0CDqfHPrsBfqbszKR"
              alt="Map"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            <div className="relative z-10 h-full flex items-center justify-center">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-surface px-8 py-6 rounded-2xl editorial-shadow text-center"
              >
                <MapPin className="text-primary mx-auto mb-3" size={40} fill="currentColor" fillOpacity={0.1} />
                <p className="font-headline font-bold text-xl">Find us in Kanke</p>
                <a 
                  href="https://www.google.com/maps/place/TAKE+A+BITES/@23.4783802,85.306401,17z/data=!3m1!4b1!4m6!3m5!1s0x39f4e700585d52d9:0x6d16ecb5faad0842!8m2!3d23.4783753!4d85.3089759!16s%2Fg%2F11mknpmv2s?entry=ttu&g_ep=EgoyMDI2MDQxNC4wIKXMDSoASAFQAw%3D%3D" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-secondary font-bold hover:underline flex items-center justify-center gap-1 mt-2"
                >
                  Get Directions <ChevronRight size={16} />
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-zinc-100 w-full rounded-t-3xl mt-12">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 gap-8 max-w-7xl mx-auto">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfqmUWGoDxRtKKxiNocVI8jWhAGfR9TVOXmt9jK6Fyww6h6o9UIfsGJWBuSiL7BdkoweuDO-7cHC4BGN4oyIgt5xQbJ1JMf9w0rmBll2VCG4kMxPvpp9d5V-LaEMxN8xp8dTAfR2yckC2MQCsoo_gRlBMbmyoXOzMxO2T4R7Q4DxthQ0v6oeu8dVNFi9R9Fdz9V5C5-IhA0a46lEHMVBEYGP-0BjTLqGG1g5Z9ZppD5LzIf11mzE3BXBAEBpH-icWASyWkcQJwmIY2" 
              className="h-8 w-8 object-contain"
              alt="Logo"
              referrerPolicy="no-referrer"
            />
            <span className="text-xl font-bold text-primary tracking-tight font-headline">Take A Bites Ranchi</span>
          </div>
          <p className="text-sm text-zinc-500">© 2024 Take A Bites Ranchi. All rights reserved.</p>
        </div>
        
        <div className="flex gap-4">
          <a 
            href="https://www.instagram.com/abite468?igsh=MWI5eWE2b3M5Y255Mw==" 
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm hover:scale-110 transition-transform hover:bg-primary hover:text-white"
          >
            <Instagram size={24} />
          </a>
          <a 
            href="#" 
            className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm hover:scale-110 transition-transform hover:bg-primary hover:text-white"
          >
            <UtensilsCrossed size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

const ExploreMenuBadge = () => {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      <motion.a 
        href="#menu"
        whileHover={{ scale: 1.05 }}
        className="bg-secondary-container text-on-secondary-container py-8 px-4 rounded-full flex flex-col items-center gap-4 editorial-shadow"
      >
        <span className="[writing-mode:vertical-lr] font-headline font-bold uppercase tracking-widest text-xs">
          Explore Menu
        </span>
        <ArrowRight size={20} />
      </motion.a>
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <ExploreMenuBadge />
      <main>
        <Hero />
        <Menu />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
