import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Shield, Globe, Lock, Phone, Mail, MapPin, Award, Truck, Building2, Users, ChevronDown } from 'lucide-react';
import './App.css';

// Company Information
const COMPANY = {
  name: 'Auric Bullion',
  tagline: 'Sovereign Wealth Preservation',
  phone: '+44 7543 671978',
  email: 'philipvan1@hotmail.com',
  address: {
    line1: '27 Sovereign House',
    line2: "King's Crown Avenue",
    line3: 'Westminster',
    city: 'London',
    postcode: 'SW1A 0GL',
  },
  whatsapp: 'https://wa.me/447543671978?text=Hello%2C%20I%20am%20interested%20in%20Auric%20Bullion%20services.',
};

// Product Data
const PRODUCTS = [
  {
    id: '1',
    name: '1g Fine Gold Bar',
    weight: '1',
    unit: 'gram',
    purity: '999.9',
    certification: 'LBMA Certified',
    description: 'Entry-level investment bar. Perfect for new investors building their precious metals portfolio.',
    image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=400&q=80',
    category: 'small'
  },
  {
    id: '2',
    name: '50g Gold Bar',
    weight: '50',
    unit: 'gram',
    purity: '999.9',
    certification: 'LBMA Certified',
    description: 'Mid-range investment bar offering excellent value per gram for growing portfolios.',
    image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=400&q=80',
    category: 'medium'
  },
  {
    id: '3',
    name: '100g Gold Bar',
    weight: '100',
    unit: 'gram',
    purity: '999.9',
    certification: 'LBMA Certified',
    description: 'Popular choice among seasoned investors. Cast or minted with full certification.',
    image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=400&q=80',
    category: 'medium'
  },
  {
    id: '4',
    name: '1kg Gold Bar',
    weight: '1',
    unit: 'kilogram',
    purity: '999.9',
    certification: 'LBMA Certified',
    description: 'Premium investment bar for substantial holdings. Cast bar from accredited refinery.',
    image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=400&q=80',
    category: 'large'
  },
  {
    id: '5',
    name: '400oz Good Delivery',
    weight: '400',
    unit: 'troy oz',
    purity: '995.0+',
    certification: 'LBMA Good Delivery',
    description: 'Institutional-grade London Good Delivery bar. The standard for central banks.',
    image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=400&q=80',
    category: 'institutional'
  }
];

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Navigation Component
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Products', path: '/products' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-navy-dark/95 backdrop-blur-lg py-4 shadow-lg shadow-black/20'
        : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-4 group">
            <div className="relative">
              <div className="w-12 h-12 border-2 border-amber flex items-center justify-center transform rotate-45 group-hover:rotate-0 transition-transform duration-500">
                <span className="font-display font-bold text-amber text-xl transform -rotate-45 group-hover:rotate-0 transition-transform duration-500">
                  AB
                </span>
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-display text-xl text-cream tracking-wide">{COMPANY.name}</h1>
              <p className="text-[10px] text-amber/70 tracking-[0.3em] uppercase">{COMPANY.tagline}</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`nav-link-animated text-sm tracking-wide font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-amber'
                    : 'text-cream/80 hover:text-amber'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <a
              href={COMPANY.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary bg-amber hover:bg-amber-light text-navy-dark px-6 py-3 text-sm font-semibold tracking-wide flex items-center gap-2"
            >
              Get Quote <ArrowRight size={16} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-amber p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-navy-dark/98 backdrop-blur-xl border-t border-amber/10"
          >
            <div className="px-6 py-8 space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block text-cream/80 hover:text-amber text-lg font-medium py-2 border-b border-amber/10"
                >
                  {link.name}
                </Link>
              ))}
              <a
                href={COMPANY.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="block bg-amber text-navy-dark px-6 py-4 text-center font-semibold mt-4"
              >
                Get Quote
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// Footer Component
const Footer = () => (
  <footer className="bg-navy-dark border-t border-amber/10 relative overflow-hidden">
    <div className="absolute inset-0 geo-pattern opacity-50"></div>
    <div className="relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 border-2 border-amber flex items-center justify-center transform rotate-45">
                <span className="font-display font-bold text-amber transform -rotate-45">AB</span>
              </div>
              <div>
                <h3 className="font-display text-xl text-cream">{COMPANY.name}</h3>
                <p className="text-[10px] text-amber/60 tracking-[0.2em] uppercase">{COMPANY.tagline}</p>
              </div>
            </div>
            <p className="text-slate-light text-sm leading-relaxed max-w-md mb-6">
              London-based precious metals specialists providing bespoke gold acquisition
              services for discerning private clients and institutions worldwide.
            </p>
            <div className="flex items-center gap-2 text-sm text-amber">
              <MapPin size={16} />
              <span>{COMPANY.address.city}, United Kingdom</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-amber font-semibold mb-6 text-sm tracking-wide uppercase">Navigate</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/products" className="text-slate-light hover:text-amber transition-colors">Products</Link></li>
              <li><Link to="/services" className="text-slate-light hover:text-amber transition-colors">Services</Link></li>
              <li><Link to="/about" className="text-slate-light hover:text-amber transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-slate-light hover:text-amber transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-amber font-semibold mb-6 text-sm tracking-wide uppercase">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/privacy" className="text-slate-light hover:text-amber transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-slate-light hover:text-amber transition-colors">Terms of Service</Link></li>
              <li><Link to="/aml" className="text-slate-light hover:text-amber transition-colors">AML Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-amber/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-light">
            <p>&copy; {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</p>
            <p>Westminster, London</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

// Home Page
const HomePage = () => {
  const features = [
    {
      icon: <Shield className="w-7 h-7" />,
      title: 'LBMA Certified',
      desc: 'Every bar sourced from London Bullion Market Association accredited refiners.'
    },
    {
      icon: <Lock className="w-7 h-7" />,
      title: 'Absolute Privacy',
      desc: 'Confidential transactions with complete discretion for all clients.'
    },
    {
      icon: <Truck className="w-7 h-7" />,
      title: 'Secure Delivery',
      desc: 'Fully insured global shipping with real-time tracking.'
    },
    {
      icon: <Building2 className="w-7 h-7" />,
      title: 'Vault Storage',
      desc: 'Access to world-class segregated storage facilities.'
    },
  ];

  const stats = [
    { value: '15+', label: 'Years Experience' },
    { value: '500+', label: 'Private Clients' },
    { value: '99.99%', label: 'Purity Standard' },
    { value: '24/7', label: 'Client Support' },
  ];

  return (
    <div className="page-enter">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-navy-gradient"></div>
        <div className="absolute inset-0 geo-pattern"></div>
        <div className="absolute inset-0 bg-radial-amber"></div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-10 w-px h-32 bg-gradient-to-b from-transparent via-amber/30 to-transparent hidden lg:block"></div>
        <div className="absolute top-1/3 right-10 w-px h-48 bg-gradient-to-b from-transparent via-amber/20 to-transparent hidden lg:block"></div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Decorative line */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-16 h-px bg-amber/40"></div>
              <div className="diamond-decorator"></div>
              <div className="w-16 h-px bg-amber/40"></div>
            </div>

            <p className="text-amber tracking-[0.4em] uppercase text-xs mb-6 font-medium">
              Established in London
            </p>

            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl mb-8 leading-[1.1]">
              <span className="text-cream">Preserve Your</span>
              <br />
              <span className="text-amber-gradient">Sovereign Wealth</span>
            </h1>

            <p className="text-slate-light text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
              Bespoke gold acquisition services for private clients seeking
              discretion, security, and uncompromising quality.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={COMPANY.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary bg-amber text-navy-dark px-10 py-4 font-semibold text-sm tracking-wide inline-flex items-center justify-center gap-3 hover:bg-amber-light transition-all"
              >
                Begin Consultation <ArrowRight size={18} />
              </a>
              <Link
                to="/products"
                className="border border-amber/40 text-cream px-10 py-4 font-semibold text-sm tracking-wide hover:bg-amber/10 hover:border-amber transition-all inline-flex items-center justify-center"
              >
                View Collection
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="text-amber/50" size={28} />
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-navy-light border-y border-amber/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="font-display text-4xl md:text-5xl text-amber mb-2">{stat.value}</div>
                <div className="text-slate-light text-sm tracking-wide">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 geo-pattern opacity-30"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-amber tracking-[0.3em] uppercase text-xs mb-4">Why Choose Us</p>
            <h2 className="font-display text-3xl md:text-5xl text-cream mb-4">
              The Auric Difference
            </h2>
            <div className="w-24 h-px bg-amber/50 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="card-glow bg-navy-light/50 border border-amber/10 p-8 text-center group"
              >
                <div className="w-16 h-16 mx-auto mb-6 border border-amber/30 flex items-center justify-center text-amber group-hover:bg-amber/10 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="font-display text-xl text-cream mb-3">{feature.title}</h3>
                <p className="text-slate-light text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-24 bg-navy-dark relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6"
          >
            <div>
              <p className="text-amber tracking-[0.3em] uppercase text-xs mb-4">Our Collection</p>
              <h2 className="font-display text-3xl md:text-5xl text-cream">
                Investment Grade Gold
              </h2>
            </div>
            <Link
              to="/products"
              className="text-amber text-sm font-medium flex items-center gap-2 hover:gap-4 transition-all"
            >
              View All Products <ArrowRight size={16} />
            </Link>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.slice(0, 3).map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="card-glow bg-navy-light border border-amber/10 overflow-hidden group"
              >
                <div className="aspect-square bg-navy overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] text-amber tracking-wider uppercase bg-amber/10 px-2 py-1">
                      {product.certification}
                    </span>
                  </div>
                  <h3 className="font-display text-xl text-cream mb-2">{product.name}</h3>
                  <p className="text-slate-light text-sm mb-4">{product.weight} {product.unit} | {product.purity} Fine</p>
                  <a
                    href={COMPANY.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center border border-amber/30 text-amber py-3 text-sm hover:bg-amber hover:text-navy-dark transition-all"
                  >
                    Request Price
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-amber opacity-50"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-12 h-px bg-amber/40"></div>
              <div className="diamond-decorator"></div>
              <div className="w-12 h-px bg-amber/40"></div>
            </div>
            <h2 className="font-display text-3xl md:text-5xl text-cream mb-6">
              Begin Your Journey
            </h2>
            <p className="text-slate-light text-lg mb-10 max-w-2xl mx-auto">
              Schedule a confidential consultation with our specialists.
              All enquiries are handled with complete discretion.
            </p>
            <a
              href={COMPANY.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-3 bg-amber text-navy-dark px-12 py-5 font-semibold tracking-wide hover:bg-amber-light transition-all"
            >
              Schedule Consultation <ArrowRight size={18} />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

// Products Page
const ProductsPage = () => {
  return (
    <div className="pt-24 pb-16 min-h-screen page-enter">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 pt-12"
        >
          <p className="text-amber tracking-[0.3em] uppercase text-xs mb-4">Investment Collection</p>
          <h1 className="font-display text-4xl md:text-6xl text-cream mb-6">Gold Products</h1>
          <p className="text-slate-light max-w-2xl mx-auto">
            From 1 gram to 400 troy ounces. Every bar sourced exclusively from LBMA-accredited refineries.
          </p>
          <div className="w-24 h-px bg-amber/50 mx-auto mt-6"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {PRODUCTS.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="card-glow bg-navy-light border border-amber/10 flex flex-col md:flex-row overflow-hidden group"
            >
              <div className="md:w-2/5 aspect-square md:aspect-auto bg-navy overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="md:w-3/5 p-8 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-amber tracking-wider uppercase bg-amber/10 px-3 py-1 inline-block mb-4">
                    {product.certification}
                  </span>
                  <h3 className="font-display text-2xl text-cream mb-4">{product.name}</h3>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-navy/50 p-4 border-l-2 border-amber/30">
                      <span className="text-slate-light text-xs block mb-1">Weight</span>
                      <span className="text-cream font-semibold">{product.weight} {product.unit}</span>
                    </div>
                    <div className="bg-navy/50 p-4 border-l-2 border-amber/30">
                      <span className="text-slate-light text-xs block mb-1">Purity</span>
                      <span className="text-cream font-semibold">{product.purity}</span>
                    </div>
                  </div>

                  <p className="text-slate-light text-sm leading-relaxed mb-6">{product.description}</p>
                </div>
                <a
                  href={COMPANY.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-amber text-navy-dark py-4 font-semibold hover:bg-amber-light transition-all"
                >
                  Request Today's Price
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Services Page
const ServicesPage = () => {
  const services = [
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Private Acquisition',
      desc: 'Bespoke gold procurement tailored to your specific requirements. We source from the world\'s most trusted refineries to meet your exact specifications.',
      points: ['Personalised sourcing', 'Competitive pricing', 'Quality assurance']
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Institutional Services',
      desc: 'Comprehensive solutions for family offices, trusts, and corporate treasuries seeking to diversify with physical gold.',
      points: ['Volume pricing', 'Dedicated account management', 'Regular market insights']
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: 'Secure Vaulting',
      desc: 'Access to world-class segregated storage facilities through our trusted partners. Fully insured in multiple jurisdictions.',
      points: ['Segregated storage', 'Full insurance', 'Regular auditing']
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: 'Global Delivery',
      desc: 'Secure, discreet shipping worldwide with full insurance coverage. White-glove service for substantial acquisitions.',
      points: ['Insured transit', 'Discreet packaging', 'Real-time tracking']
    }
  ];

  return (
    <div className="pt-24 pb-16 min-h-screen page-enter">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 pt-12"
        >
          <p className="text-amber tracking-[0.3em] uppercase text-xs mb-4">What We Offer</p>
          <h1 className="font-display text-4xl md:text-6xl text-cream mb-6">Our Services</h1>
          <p className="text-slate-light max-w-2xl mx-auto">
            Comprehensive gold acquisition and management services for private clients and institutions.
          </p>
          <div className="w-24 h-px bg-amber/50 mx-auto mt-6"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="card-glow bg-navy-light border border-amber/10 p-10"
            >
              <div className="w-16 h-16 border border-amber/30 flex items-center justify-center text-amber mb-6">
                {service.icon}
              </div>
              <h3 className="font-display text-2xl text-cream mb-4">{service.title}</h3>
              <p className="text-slate-light leading-relaxed mb-6">{service.desc}</p>
              <ul className="space-y-2">
                {service.points.map((point, pidx) => (
                  <li key={pidx} className="flex items-center gap-3 text-sm text-cream/80">
                    <div className="w-1.5 h-1.5 bg-amber"></div>
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center bg-navy border border-amber/20 p-12"
        >
          <h3 className="font-display text-2xl text-cream mb-4">Need a Bespoke Solution?</h3>
          <p className="text-slate-light mb-8 max-w-xl mx-auto">
            Our team specialises in creating tailored strategies for complex requirements.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 bg-amber text-navy-dark px-8 py-4 font-semibold hover:bg-amber-light transition-all"
          >
            Discuss Requirements <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

// About Page
const AboutPage = () => (
  <div className="pt-24 pb-16 min-h-screen page-enter">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16 pt-12"
      >
        <p className="text-amber tracking-[0.3em] uppercase text-xs mb-4">Our Story</p>
        <h1 className="font-display text-4xl md:text-6xl text-cream mb-6">About {COMPANY.name}</h1>
        <div className="w-24 h-px bg-amber/50 mx-auto"></div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="bg-navy-light border border-amber/20 p-2">
            <div className="bg-gradient-to-br from-amber/10 to-transparent aspect-[4/5] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 geo-pattern"></div>
              <div className="relative text-center p-8">
                <div className="w-24 h-24 mx-auto border-2 border-amber flex items-center justify-center transform rotate-45 mb-8">
                  <span className="font-display text-4xl text-amber transform -rotate-45">AB</span>
                </div>
                <h3 className="font-display text-2xl text-cream">London Heritage</h3>
                <p className="text-amber mt-2">Est. Westminster</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl text-cream mb-6">A Tradition of Excellence</h2>
          <div className="space-y-4 text-slate-light leading-relaxed">
            <p>
              {COMPANY.name} was founded with a singular vision: to provide discerning
              clients with access to investment-grade gold through a service that prioritises
              discretion, expertise, and uncompromising quality.
            </p>
            <p>
              Based in Westminster, London, we operate at the heart of the global bullion
              market. Our proximity to the London Bullion Market Association enables us to
              source directly from the world's most respected refineries.
            </p>
            <p>
              We believe that gold ownership should be a refined experience. Every client
              receives personalised attention from our specialist team, ensuring their
              acquisition strategy aligns perfectly with their wealth preservation goals.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-6">
            <div className="bg-navy border border-amber/20 p-6 text-center">
              <div className="font-display text-3xl text-amber">15+</div>
              <div className="text-slate-light text-sm">Years Experience</div>
            </div>
            <div className="bg-navy border border-amber/20 p-6 text-center">
              <div className="font-display text-3xl text-amber">LBMA</div>
              <div className="text-slate-light text-sm">Certified Partners</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Values */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-navy-light border border-amber/20 p-12"
      >
        <h3 className="font-display text-2xl text-cream mb-8 text-center">Our Commitment</h3>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <Lock className="w-10 h-10 text-amber mx-auto mb-4" />
            <h4 className="text-cream font-semibold mb-2">Confidentiality</h4>
            <p className="text-slate-light text-sm">Your privacy is paramount. All transactions are handled with complete discretion.</p>
          </div>
          <div>
            <Globe className="w-10 h-10 text-amber mx-auto mb-4" />
            <h4 className="text-cream font-semibold mb-2">Global Reach</h4>
            <p className="text-slate-light text-sm">Serving clients worldwide from our Westminster headquarters.</p>
          </div>
          <div>
            <Shield className="w-10 h-10 text-amber mx-auto mb-4" />
            <h4 className="text-cream font-semibold mb-2">Quality Assured</h4>
            <p className="text-slate-light text-sm">Only LBMA-certified gold from accredited international refineries.</p>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
);

// Contact Page
const ContactPage = () => {
  return (
    <div className="pt-24 pb-16 min-h-screen page-enter">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 pt-12"
        >
          <p className="text-amber tracking-[0.3em] uppercase text-xs mb-4">Get in Touch</p>
          <h1 className="font-display text-4xl md:text-6xl text-cream mb-6">Contact Us</h1>
          <p className="text-slate-light max-w-2xl mx-auto">
            Reach out for a confidential consultation. Our team is ready to assist with your gold acquisition needs.
          </p>
          <div className="w-24 h-px bg-amber/50 mx-auto mt-6"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* WhatsApp */}
            <a
              href={COMPANY.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-emerald-600 hover:bg-emerald-700 text-white p-6 transition-colors group"
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </div>
                <div>
                  <div className="text-xs text-white/70 mb-1 uppercase tracking-wider">WhatsApp</div>
                  <div className="text-xl font-semibold">{COMPANY.phone}</div>
                </div>
                <ArrowRight className="ml-auto opacity-50 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${COMPANY.email}`}
              className="block bg-navy-light border border-amber/20 hover:border-amber/50 p-6 transition-colors group"
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 border border-amber/30 flex items-center justify-center text-amber">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-light mb-1 uppercase tracking-wider">Email</div>
                  <div className="text-lg text-cream">{COMPANY.email}</div>
                </div>
                <ArrowRight className="ml-auto text-amber opacity-50 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
              </div>
            </a>

            {/* Phone */}
            <a
              href={`tel:${COMPANY.phone.replace(/\s/g, '')}`}
              className="block bg-navy-light border border-amber/20 hover:border-amber/50 p-6 transition-colors group"
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 border border-amber/30 flex items-center justify-center text-amber">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-light mb-1 uppercase tracking-wider">Telephone</div>
                  <div className="text-lg text-cream">{COMPANY.phone}</div>
                </div>
                <ArrowRight className="ml-auto text-amber opacity-50 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
              </div>
            </a>
          </motion.div>

          {/* Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Address */}
            <div className="bg-navy-light border border-amber/20 p-8">
              <h3 className="font-display text-xl text-cream mb-6 flex items-center gap-3">
                <MapPin className="text-amber" size={20} />
                Our Location
              </h3>
              <address className="not-italic text-slate-light leading-relaxed">
                {COMPANY.address.line1}<br />
                {COMPANY.address.line2}<br />
                {COMPANY.address.line3}<br />
                {COMPANY.address.city} {COMPANY.address.postcode}<br />
                United Kingdom
              </address>
            </div>

            {/* Privacy Note */}
            <div className="bg-navy border border-amber/10 p-8">
              <h4 className="text-amber font-semibold mb-4 flex items-center gap-2">
                <Lock size={18} />
                Confidentiality Assured
              </h4>
              <p className="text-slate-light text-sm leading-relaxed">
                All enquiries are treated with the highest level of confidentiality.
                Your information will never be shared with third parties. We comply
                with all applicable regulations whilst maintaining your privacy.
              </p>
            </div>

            {/* What to Expect */}
            <div className="bg-navy-light border border-amber/20 p-8">
              <h4 className="text-cream font-semibold mb-4">What to Expect</h4>
              <ul className="space-y-3 text-sm text-slate-light">
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-amber"></div>
                  Response within 24 hours
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-amber"></div>
                  Personalised consultation
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-amber"></div>
                  Competitive pricing
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-amber"></div>
                  Secure transaction process
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Privacy Policy Page
const PrivacyPage = () => (
  <div className="pt-24 pb-16 min-h-screen page-enter">
    <div className="max-w-4xl mx-auto px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 pt-12"
      >
        <h1 className="font-display text-4xl md:text-5xl text-cream mb-4">Privacy Policy</h1>
        <p className="text-slate-light">Last Updated: February 2026</p>
        <div className="w-24 h-px bg-amber/50 mt-4"></div>
      </motion.div>

      <div className="space-y-8">
        <section className="bg-navy-light border border-amber/20 p-8">
          <h2 className="font-display text-xl text-amber mb-4">1. Introduction</h2>
          <p className="text-slate-light leading-relaxed">
            {COMPANY.name} is committed to protecting the privacy and confidentiality of our clients.
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information
            when you engage with our services. As a premium bullion dealer, we understand that
            discretion is paramount to our clients.
          </p>
        </section>

        <section className="bg-navy-light border border-amber/20 p-8">
          <h2 className="font-display text-xl text-amber mb-4">2. Information We Collect</h2>
          <div className="text-slate-light leading-relaxed space-y-3">
            <p><strong className="text-cream">Personal Information:</strong> Name, email, telephone, country of residence.</p>
            <p><strong className="text-cream">Transaction Information:</strong> Purchase details, payment information, delivery addresses.</p>
            <p><strong className="text-cream">Identity Verification:</strong> Documentation as required by AML regulations.</p>
          </div>
        </section>

        <section className="bg-navy-light border border-amber/20 p-8">
          <h2 className="font-display text-xl text-amber mb-4">3. How We Use Your Information</h2>
          <ul className="text-slate-light leading-relaxed space-y-2 list-disc list-inside">
            <li>To process and fulfil your gold acquisition requests</li>
            <li>To communicate regarding your account and transactions</li>
            <li>To comply with legal and regulatory requirements</li>
            <li>To provide personalised market insights</li>
            <li>To prevent fraud and ensure transaction security</li>
          </ul>
        </section>

        <section className="bg-navy-light border border-amber/20 p-8">
          <h2 className="font-display text-xl text-amber mb-4">4. Contact</h2>
          <p className="text-slate-light leading-relaxed">
            For privacy-related enquiries, please contact us at{' '}
            <a href={`mailto:${COMPANY.email}`} className="text-amber hover:underline">
              {COMPANY.email}
            </a>
          </p>
        </section>
      </div>
    </div>
  </div>
);

// Terms Page
const TermsPage = () => (
  <div className="pt-24 pb-16 min-h-screen page-enter">
    <div className="max-w-4xl mx-auto px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 pt-12"
      >
        <h1 className="font-display text-4xl md:text-5xl text-cream mb-4">Terms of Service</h1>
        <p className="text-slate-light">Last Updated: February 2026</p>
        <div className="w-24 h-px bg-amber/50 mt-4"></div>
      </motion.div>

      <div className="space-y-8">
        <section className="bg-navy-light border border-amber/20 p-8">
          <h2 className="font-display text-xl text-amber mb-4">1. Acceptance of Terms</h2>
          <p className="text-slate-light leading-relaxed">
            By accessing or using the services of {COMPANY.name}, you agree to be bound by these Terms
            of Service. If you do not agree to these terms, please do not use our services.
          </p>
        </section>

        <section className="bg-navy-light border border-amber/20 p-8">
          <h2 className="font-display text-xl text-amber mb-4">2. Services</h2>
          <p className="text-slate-light leading-relaxed">
            {COMPANY.name} provides private gold acquisition services including: sourcing LBMA-certified
            gold bars, secure storage arrangements, insured international delivery, and investment consultation.
          </p>
        </section>

        <section className="bg-navy-light border border-amber/20 p-8">
          <h2 className="font-display text-xl text-amber mb-4">3. Eligibility</h2>
          <ul className="text-slate-light leading-relaxed space-y-2 list-disc list-inside">
            <li>You must be at least 18 years of age</li>
            <li>You must have legal capacity to enter binding contracts</li>
            <li>You must provide accurate identification documentation</li>
            <li>You must not be subject to any sanctions</li>
          </ul>
        </section>

        <section className="bg-navy-light border border-amber/20 p-8">
          <h2 className="font-display text-xl text-amber mb-4">4. Contact</h2>
          <p className="text-slate-light leading-relaxed">
            For questions regarding these Terms, please contact{' '}
            <a href={`mailto:${COMPANY.email}`} className="text-amber hover:underline">
              {COMPANY.email}
            </a>
          </p>
        </section>
      </div>
    </div>
  </div>
);

// AML Policy Page
const AMLPage = () => (
  <div className="pt-24 pb-16 min-h-screen page-enter">
    <div className="max-w-4xl mx-auto px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 pt-12"
      >
        <h1 className="font-display text-4xl md:text-5xl text-cream mb-4">Anti-Money Laundering Policy</h1>
        <p className="text-slate-light">Last Updated: February 2026</p>
        <div className="w-24 h-px bg-amber/50 mt-4"></div>
      </motion.div>

      <div className="space-y-8">
        <section className="bg-navy-light border border-amber/20 p-8">
          <h2 className="font-display text-xl text-amber mb-4">1. Policy Statement</h2>
          <p className="text-slate-light leading-relaxed">
            {COMPANY.name} is committed to the highest standards of Anti-Money Laundering (AML) and
            Counter-Terrorist Financing (CTF) compliance. We maintain a robust compliance programme
            designed to prevent our services from being used to facilitate financial crimes.
          </p>
        </section>

        <section className="bg-navy-light border border-amber/20 p-8">
          <h2 className="font-display text-xl text-amber mb-4">2. Customer Due Diligence</h2>
          <div className="text-slate-light leading-relaxed space-y-3">
            <p><strong className="text-cream">Identity Verification:</strong> Collection and verification of government-issued identification.</p>
            <p><strong className="text-cream">Source of Funds:</strong> Verification that funds are from legitimate sources.</p>
            <p><strong className="text-cream">Risk Assessment:</strong> Evaluation of client risk profile.</p>
          </div>
        </section>

        <section className="bg-navy-light border border-amber/20 p-8">
          <h2 className="font-display text-xl text-amber mb-4">3. Regulatory Compliance</h2>
          <p className="text-slate-light leading-relaxed mb-4">Our AML programme complies with:</p>
          <ul className="text-slate-light leading-relaxed space-y-2 list-disc list-inside">
            <li>UK Money Laundering Regulations</li>
            <li>Financial Action Task Force (FATF) recommendations</li>
            <li>HM Treasury sanctions requirements</li>
          </ul>
        </section>

        <section className="bg-navy-light border border-amber/20 p-8">
          <h2 className="font-display text-xl text-amber mb-4">4. Contact</h2>
          <p className="text-slate-light leading-relaxed">
            For compliance enquiries, please contact{' '}
            <a href={`mailto:${COMPANY.email}`} className="text-amber hover:underline">
              {COMPANY.email}
            </a>
          </p>
        </section>
      </div>
    </div>
  </div>
);

// Main App
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-navy">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/aml" element={<AMLPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
