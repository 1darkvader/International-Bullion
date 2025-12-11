import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, Shield, Globe, Lock, Phone, Mail, MapPin } from 'lucide-react';
import './App.css';

// Static Product Data
const PRODUCTS = [
  {
    id: '1',
    name: '1 Gram Gold Bar',
    weight: '1',
    weight_unit: 'gram',
    purity: '999.9',
    certification: 'LBMA Certified',
    description: 'Perfect entry point for new investors. LBMA-certified 1 gram fine gold bar with assay certificate.',
    image_url: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=400&q=80'
  },
  {
    id: '2',
    name: '100 Gram Gold Bar',
    weight: '100',
    weight_unit: 'gram',
    purity: '999.9',
    certification: 'LBMA Certified',
    description: 'Popular choice for serious investors. Cast or minted 100g bar with full certification.',
    image_url: 'https://images.unsplash.com/photo-1624365168968-f283d506c6b6?w=400&q=80'
  },
  {
    id: '3',
    name: '1 Kilogram Gold Bar',
    weight: '1',
    weight_unit: 'kilogram',
    purity: '999.9',
    certification: 'LBMA Certified',
    description: 'Premium investment bar for substantial holdings. Cast 1kg bar from accredited refinery.',
    image_url: 'https://images.unsplash.com/photo-1589787168422-ac843ebdb3ba?w=400&q=80'
  },
  {
    id: '4',
    name: '400 oz Good Delivery Bar',
    weight: '400',
    weight_unit: 'troy oz',
    purity: '995.0+',
    certification: 'LBMA Good Delivery',
    description: 'Institutional-grade London Good Delivery bar. The gold standard for central banks and major investors.',
    image_url: 'https://images.unsplash.com/photo-1611598412658-3a14ff7ce4bc?w=400&q=80'
  }
];

// WhatsApp Links
const WHATSAPP_NY = 'https://wa.me/16463915932?text=Hello%2C%20I%20am%20interested%20in%20your%20gold%20acquisition%20services.';
const WHATSAPP_UK = 'https://wa.me/447424127586?text=Hello%2C%20I%20am%20interested%20in%20your%20gold%20acquisition%20services.';

// Navigation Component
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Products', path: '/products' },
    { name: 'Services', path: '/services' },
    { name: 'Clients', path: '/clients' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav data-testid="navbar" className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-jet/95 backdrop-blur-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3" data-testid="logo-link">
          <div className="w-12 h-12 bg-gold-gradient rounded flex items-center justify-center">
            <span className="font-display font-bold text-jet text-xl">RIB</span>
          </div>
          <div className="hidden md:block">
            <h1 className="font-display text-lg text-gold">Rock International</h1>
            <p className="text-xs text-gray-400 tracking-widest">BULLION</p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              data-testid={`nav-${link.name.toLowerCase()}`}
              className={`text-sm tracking-wide transition-colors ${location.pathname === link.path ? 'text-gold' : 'text-gray-300 hover:text-gold'}`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/contact"
            data-testid="nav-request-quote"
            className="bg-gold text-jet px-6 py-2.5 text-sm font-semibold tracking-wide hover:bg-gold-light transition-colors"
          >
            Request Quote
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          data-testid="mobile-menu-btn"
          className="md:hidden text-gold"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-charcoal border-t border-gold/20"
          >
            <div className="px-6 py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block text-gray-300 hover:text-gold py-2"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="block bg-gold text-jet px-6 py-3 text-center font-semibold"
              >
                Request Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// Footer Component
const Footer = () => (
  <footer data-testid="footer" className="bg-jet border-t border-gold/10 py-16">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gold-gradient rounded flex items-center justify-center">
              <span className="font-display font-bold text-jet">RIB</span>
            </div>
            <div>
              <h3 className="font-display text-gold">Rock International Bullion</h3>
            </div>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed max-w-md">
            Premium private gold acquisition services for discerning investors worldwide. 
            Secure, confidential, and exclusive.
          </p>
        </div>
        <div>
          <h4 className="text-gold font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/products" className="hover:text-gold transition-colors">Products</Link></li>
            <li><Link to="/services" className="hover:text-gold transition-colors">Services</Link></li>
            <li><Link to="/about" className="hover:text-gold transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-gold font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/privacy-policy" className="hover:text-gold transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms-of-service" className="hover:text-gold transition-colors">Terms of Service</Link></li>
            <li><Link to="/aml-policy" className="hover:text-gold transition-colors">AML Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gold/10 mt-10 pt-8 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Rock International Bullion. All rights reserved.</p>
        <p className="mt-2">New York | London</p>
      </div>
    </div>
  </footer>
);

// Home Page
const HomePage = () => {
  const features = [
    { icon: <Lock className="w-8 h-8" />, title: 'Discreet Transactions', desc: 'Complete confidentiality for all purchases and transfers.' },
    { icon: <Shield className="w-8 h-8" />, title: 'LBMA-Certified Gold', desc: 'Only the highest quality gold from accredited refineries.' },
    { icon: <Globe className="w-8 h-8" />, title: 'Insured Global Delivery', desc: 'Secure worldwide shipping with full insurance coverage.' },
  ];

  return (
    <div data-testid="home-page">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-jet via-charcoal to-jet"></div>
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1643324897407-54f8ae049132?w=1920&q=80" 
            alt="Gold texture" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl mb-6">
              <span className="text-white">Exclusive Gold Acquisition</span>
              <br />
              <span className="text-gold-gradient">for Discerning Investors</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Private, Secure, Global. Premium gold procurement services for high-net-worth individuals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={WHATSAPP_NY}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="hero-cta-primary"
                className="bg-gold text-jet px-8 py-4 font-semibold tracking-wide hover:bg-gold-light transition-all flex items-center justify-center gap-2"
              >
                {"Contact Us Today"} <ChevronRight size={20} />
              </a>
              <Link
                to="/products"
                data-testid="hero-cta-secondary"
                className="border border-gold text-gold px-8 py-4 font-semibold tracking-wide hover:bg-gold hover:text-jet transition-all"
              >
                View Products
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronRight className="rotate-90 text-gold" size={32} />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-charcoal">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl text-white mb-4">Why Choose Us</h2>
            <div className="w-20 h-1 bg-gold mx-auto"></div>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="bg-jet p-8 border border-gold/20 hover:border-gold/50 transition-all group"
              >
                <div className="text-gold mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h3 className="font-display text-xl text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-jet">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl text-white mb-4">Featured Gold Bars</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">{"Owning physical gold is not just a purchase—it's a strategy."}</p>
            <div className="w-20 h-1 bg-gold mx-auto mt-4"></div>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-charcoal border border-gold/20 hover:border-gold transition-all group overflow-hidden"
              >
                <div className="aspect-square bg-jet overflow-hidden">
                  <img 
                    src={product.image_url} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg text-white mb-2">{product.name}</h3>
                  <p className="text-gold text-sm mb-1">Purity: {product.purity}</p>
                  <p className="text-gray-500 text-xs">{product.certification}</p>
                  <a
                    href={WHATSAPP_NY}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 block text-center border border-gold text-gold py-2 text-sm hover:bg-gold hover:text-jet transition-all"
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
      <section className="py-24 bg-gradient-to-r from-charcoal via-jet to-charcoal relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-gold-gradient"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-5xl text-white mb-6">
              Schedule a Confidential Consultation
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Our team of experts is ready to assist you with your gold acquisition needs. 
              All inquiries are handled with the utmost discretion.
            </p>
            <a
              href={WHATSAPP_NY}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="cta-consultation"
              className="inline-block bg-gold text-jet px-10 py-4 font-semibold text-lg tracking-wide hover:bg-gold-light transition-all"
            >
              Request Private Consultation
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
    <div data-testid="products-page" className="pt-24 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-display text-4xl md:text-5xl text-white mb-4">Our Gold Products</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">Choose from 1g to 400oz gold bars, sourced only from accredited refineries.</p>
          <div className="w-20 h-1 bg-gold mx-auto mt-4"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {PRODUCTS.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              data-testid={`product-card-${idx}`}
              className="bg-charcoal border border-gold/20 hover:border-gold transition-all group flex flex-col md:flex-row"
            >
              <div className="md:w-2/5 aspect-square md:aspect-auto bg-jet overflow-hidden">
                <img 
                  src={product.image_url} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="md:w-3/5 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-2xl text-white mb-4">{product.name}</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm mb-5">
                    <div className="bg-jet/50 p-3 rounded">
                      <span className="text-gray-500 block text-xs mb-1">Weight</span>
                      <span className="text-gold font-semibold">{product.weight} {product.weight_unit}</span>
                    </div>
                    <div className="bg-jet/50 p-3 rounded">
                      <span className="text-gray-500 block text-xs mb-1">Purity</span>
                      <span className="text-gold font-semibold">{product.purity}</span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <span className="inline-block bg-gold/10 text-gold text-xs px-3 py-1 rounded-full border border-gold/30">
                      {product.certification}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-5">{product.description}</p>
                </div>
                <a
                  href={WHATSAPP_NY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-gold text-jet py-3 font-semibold hover:bg-gold-light transition-all"
                >
                  {"Request Today's Price"}
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
      title: 'Custom Gold Acquisition',
      desc: 'Tailored procurement solutions for specific gold requirements. We source bars and coins from the world\'s most trusted refineries to meet your exact specifications.',
      icon: '🏅'
    },
    {
      title: 'Investor Bulk Purchase Programs',
      desc: 'Exclusive programs for high-volume purchases with preferential pricing. Ideal for institutional investors and family offices.',
      icon: '📊'
    },
    {
      title: 'Secure Vaulting Partners',
      desc: 'Access to world-class vaulting facilities through our trusted partners. Fully insured storage in multiple jurisdictions.',
      icon: '🔐'
    },
    {
      title: 'International Insured Delivery',
      desc: 'Secure, discreet shipping worldwide with full insurance coverage. White-glove delivery service for substantial acquisitions.',
      icon: '🌍'
    }
  ];

  return (
    <div data-testid="services-page" className="pt-24 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-display text-4xl md:text-5xl text-white mb-4">Our Services</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">Comprehensive gold acquisition and management services for private clients.</p>
          <div className="w-20 h-1 bg-gold mx-auto mt-4"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-charcoal border border-gold/20 p-8 hover:border-gold/50 transition-all"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="font-display text-2xl text-white mb-4">{service.title}</h3>
              <p className="text-gray-400 leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center bg-jet border border-gold/30 p-10"
        >
          <h3 className="font-display text-2xl text-white mb-4">Need a Custom Solution?</h3>
          <p className="text-gray-400 mb-6">Our team specializes in creating bespoke acquisition strategies for complex requirements.</p>
          <Link
            to="/contact"
            className="inline-block bg-gold text-jet px-8 py-3 font-semibold hover:bg-gold-light transition-all"
          >
            Discuss Your Requirements
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

// About Page
const AboutPage = () => (
  <div data-testid="about-page" className="pt-24 pb-16 min-h-screen">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="font-display text-4xl md:text-5xl text-white mb-4">About Us</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">Meet the leadership behind Rock International Bullion</p>
        <div className="w-20 h-1 bg-gold mx-auto mt-4"></div>
      </motion.div>

      {/* Hannah A. Fry Section */}
      <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="bg-charcoal border border-gold/30 p-1">
            <div className="bg-gradient-to-br from-gold/20 to-transparent aspect-[4/5] flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto bg-gold-gradient rounded-full flex items-center justify-center mb-6">
                  <span className="font-display text-4xl text-jet font-bold">HF</span>
                </div>
                <h3 className="font-display text-2xl text-white">Hannah A. Fry</h3>
                <p className="text-gold">Founder & Principal</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl text-white mb-6">Meet Hannah A. Fry</h2>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              Hannah A. Fry brings over a decade of experience in private wealth management and 
              precious metals advisory to Rock International Bullion. Her expertise spans institutional 
              investment strategies, portfolio diversification, and discreet asset protection for 
              ultra-high-net-worth families.
            </p>
            <p>
              With a background in international finance and a deep understanding of global bullion 
              markets, Hannah specializes in creating bespoke acquisition strategies tailored to each 
              {"client's"} unique financial objectives and privacy requirements.
            </p>
            <p>
              Operating from New York and London, she has established Rock International Bullion as a 
              trusted name among high-net-worth individuals seeking discretion and expertise. Her 
              commitment to excellence has made her an invaluable partner for clients seeking 
              sophisticated gold investment solutions.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-6">
            <div className="bg-jet border border-gold/20 p-4 text-center">
              <div className="font-display text-3xl text-gold">10+</div>
              <div className="text-gray-400 text-sm">Years in Private Wealth</div>
            </div>
            <div className="bg-jet border border-gold/20 p-4 text-center">
              <div className="font-display text-3xl text-gold">2</div>
              <div className="text-gray-400 text-sm">Global Offices</div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-charcoal border border-gold/20 p-10"
      >
        <h3 className="font-display text-2xl text-white mb-6 text-center">Our Commitment</h3>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <Shield className="w-10 h-10 text-gold mx-auto mb-3" />
            <h4 className="text-white font-semibold mb-2">Confidentiality</h4>
            <p className="text-gray-400 text-sm">Your privacy is paramount. All transactions are handled with complete discretion.</p>
          </div>
          <div>
            <Globe className="w-10 h-10 text-gold mx-auto mb-3" />
            <h4 className="text-white font-semibold mb-2">Global Reach</h4>
            <p className="text-gray-400 text-sm">Serving clients worldwide from our New York and London operations.</p>
          </div>
          <div>
            <Lock className="w-10 h-10 text-gold mx-auto mb-3" />
            <h4 className="text-white font-semibold mb-2">Security</h4>
            <p className="text-gray-400 text-sm">Industry-leading security protocols for every transaction and delivery.</p>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
);

// Clients Page
const ClientsPage = () => {
  const privileges = [
    {
      icon: <Lock className="w-10 h-10" />,
      title: 'Absolute Discretion',
      desc: 'Every interaction, transaction, and communication is handled with the utmost confidentiality. Your identity and holdings remain completely private.',
      features: ['Anonymous acquisition options', 'Encrypted communications', 'Non-disclosure agreements', 'Private viewing appointments']
    },
    {
      icon: <Shield className="w-10 h-10" />,
      title: 'Priority Access',
      desc: 'As a privileged client, you receive first access to rare and limited gold products before they reach the general market.',
      features: ['Early access to new inventory', 'Reserved allocation rights', 'Exclusive product offerings', 'Priority order fulfillment']
    },
    {
      icon: <Globe className="w-10 h-10" />,
      title: 'White-Glove Delivery',
      desc: 'Our premium logistics network ensures your gold arrives safely, discreetly, and on your schedule—anywhere in the world.',
      features: ['Personal courier service', 'Armored transport options', 'Custom delivery scheduling', 'Real-time secure tracking']
    },
    {
      icon: <Phone className="w-10 h-10" />,
      title: 'Dedicated Advisor',
      desc: 'Your personal relationship manager is available around the clock to address your needs and provide expert guidance.',
      features: ['24/7 direct phone line', 'Personalized market insights', 'Portfolio review sessions', 'Succession planning support']
    }
  ];

  const tiers = [
    {
      name: 'Private',
      minInvestment: '$100,000+',
      benefits: ['Dedicated account manager', 'Competitive pricing', 'Insured delivery', 'Quarterly market reports']
    },
    {
      name: 'Elite',
      minInvestment: '$500,000+',
      benefits: ['Senior advisor assignment', 'Priority pricing', 'White-glove delivery', 'Monthly strategy calls', 'Exclusive event invitations']
    },
    {
      name: 'Institutional',
      minInvestment: '$2,000,000+',
      benefits: ['Direct principal access', 'Institutional pricing', 'Custom logistics solutions', 'Dedicated secure storage', 'Family office integration', 'Legacy planning services']
    }
  ];

  return (
    <div data-testid="clients-page" className="pt-24 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-display text-4xl md:text-5xl text-white mb-4">Private Client Privileges</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Experience the pinnacle of discreet gold acquisition services. Our privileged clients 
            enjoy exclusive benefits designed for those who demand absolute privacy and exceptional service.
          </p>
          <div className="w-20 h-1 bg-gold mx-auto mt-4"></div>
        </motion.div>

        {/* Privileges Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          {privileges.map((privilege, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-charcoal border border-gold/20 p-8 hover:border-gold/50 transition-all"
            >
              <div className="text-gold mb-4">{privilege.icon}</div>
              <h3 className="font-display text-2xl text-white mb-3">{privilege.title}</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">{privilege.desc}</p>
              <ul className="space-y-2">
                {privilege.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-center gap-3 text-sm text-gray-300">
                    <ChevronRight className="w-4 h-4 text-gold flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Membership Tiers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="font-display text-3xl text-white mb-4 text-center">Client Tiers</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Our tiered service model ensures that every client receives attention and benefits 
            commensurate with their investment level.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {tiers.map((tier, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className={`bg-jet border p-8 ${idx === 1 ? 'border-gold md:scale-105' : 'border-gold/20'}`}
              >
                {idx === 1 && (
                  <div className="bg-gold text-jet text-xs font-bold px-3 py-1 inline-block mb-4">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="font-display text-2xl text-white mb-2">{tier.name}</h3>
                <p className="text-gold text-lg font-semibold mb-6">{tier.minInvestment}</p>
                <ul className="space-y-3">
                  {tier.benefits.map((benefit, bidx) => (
                    <li key={bidx} className="flex items-start gap-3 text-sm text-gray-300">
                      <ChevronRight className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Confidentiality Promise */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-charcoal via-jet to-charcoal border border-gold/30 p-10 text-center"
        >
          <Lock className="w-12 h-12 text-gold mx-auto mb-4" />
          <h3 className="font-display text-2xl text-white mb-4">Our Confidentiality Promise</h3>
          <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed mb-6">
            At Rock International Bullion, discretion is not merely a service feature—it is the 
            foundation of everything we do. We understand that our clients value their privacy above 
            all else. That is why we have implemented rigorous protocols to ensure that your identity, 
            transactions, and holdings remain absolutely confidential. No information is ever shared 
            with third parties without your explicit written consent.
          </p>
          <a
            href={WHATSAPP_NY}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gold text-jet px-8 py-4 font-semibold hover:bg-gold-light transition-all"
          >
            Apply for Private Membership
          </a>
        </motion.div>
      </div>
    </div>
  );
};

// Contact Page
const ContactPage = () => {
  return (
    <div data-testid="contact-page" className="pt-24 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-display text-4xl md:text-5xl text-white mb-4">Contact Us</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">{"Connect with us directly via WhatsApp for a private consultation."}</p>
          <div className="w-20 h-1 bg-gold mx-auto mt-4"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* WhatsApp Contact Options */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-charcoal border border-gold/20 p-8">
              <h3 className="font-display text-2xl text-white mb-6">Direct WhatsApp Contact</h3>
              <p className="text-gray-400 mb-8">
                For immediate assistance and confidential inquiries, connect with us directly via WhatsApp. 
                Our team is available to discuss your gold acquisition needs.
              </p>
              
              {/* New York */}
              <a 
                href={WHATSAPP_NY}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-green-600 hover:bg-green-700 text-white p-4 mb-4 transition-colors"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                <div>
                  <div className="font-semibold text-lg">New York Office</div>
                  <div className="text-green-200">+1 (646) 391-5932</div>
                </div>
              </a>

              {/* London */}
              <a 
                href={WHATSAPP_UK}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-green-600 hover:bg-green-700 text-white p-4 transition-colors"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                <div>
                  <div className="font-semibold text-lg">London Office</div>
                  <div className="text-green-200">+44 7424 127586</div>
                </div>
              </a>
            </div>

            {/* Email Option */}
            <div className="bg-jet border border-gold/30 p-8">
              <h4 className="font-display text-xl text-gold mb-4">Prefer Email?</h4>
              <p className="text-gray-400 text-sm mb-4">
                For detailed inquiries or document submissions, you can reach us via email.
              </p>
              <a 
                href="mailto:inquiries@rockinternationalbullion.com"
                className="flex items-center gap-3 text-gold hover:text-gold-light transition-colors"
              >
                <Mail className="w-5 h-5" />
                inquiries@rockinternationalbullion.com
              </a>
            </div>
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-charcoal border border-gold/20 p-8">
              <h3 className="font-display text-2xl text-white mb-6">Our Locations</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-gold mt-1" />
                  <div>
                    <p className="text-white font-medium">New York</p>
                    <p className="text-gray-400">United States</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-gold mt-1" />
                  <div>
                    <p className="text-white font-medium">London</p>
                    <p className="text-gray-400">United Kingdom</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-jet border border-gold/30 p-8">
              <h4 className="font-display text-xl text-gold mb-4">Confidentiality Guarantee</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                All inquiries are treated with the highest level of confidentiality. 
                Your information will never be shared with third parties. 
                We comply with all applicable AML regulations while maintaining your privacy.
              </p>
            </div>

            <div className="bg-charcoal border border-gold/20 p-8">
              <h4 className="font-display text-xl text-white mb-4">What to Expect</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  Prompt response within 24 hours
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  Personalized consultation with our experts
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  Competitive pricing on all gold products
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  Secure and discreet transaction process
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
    phone: '',
    country: '',
    consultation_method: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch(`${API_URL}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: data.message });
        setFormData({ full_name: '', email: '', phone: '', country: '', consultation_method: '', message: '' });
      } else {
        setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-testid="contact-page" className="pt-24 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-display text-4xl md:text-5xl text-white mb-4">Contact Us</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">{"Request a private consultation or inquire about today's gold prices."}</p>
          <div className="w-20 h-1 bg-gold mx-auto mt-4"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} data-testid="contact-form" className="space-y-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  data-testid="input-name"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="w-full bg-charcoal border border-gold/30 px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors"
                  placeholder="Your full name"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    data-testid="input-email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-charcoal border border-gold/30 px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Phone</label>
                  <input
                    type="tel"
                    data-testid="input-phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-charcoal border border-gold/30 px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors"
                    placeholder="+1 234 567 8900"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Country</label>
                  <input
                    type="text"
                    data-testid="input-country"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full bg-charcoal border border-gold/30 px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors"
                    placeholder="Your country"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Preferred Consultation Method</label>
                  <select
                    data-testid="input-consultation"
                    value={formData.consultation_method}
                    onChange={(e) => setFormData({ ...formData, consultation_method: e.target.value })}
                    className="w-full bg-charcoal border border-gold/30 px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors"
                  >
                    <option value="">Select method</option>
                    <option value="phone">Phone Call</option>
                    <option value="video">Video Conference</option>
                    <option value="email">Email</option>
                    <option value="in-person">In-Person Meeting</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Message</label>
                <textarea
                  rows="4"
                  data-testid="input-message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-charcoal border border-gold/30 px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors resize-none"
                  placeholder="Tell us about your requirements..."
                ></textarea>
              </div>

              {status.message && (
                <div data-testid="form-status" className={`p-4 ${status.type === 'success' ? 'bg-green-900/30 border border-green-500/30 text-green-400' : 'bg-red-900/30 border border-red-500/30 text-red-400'}`}>
                  {status.message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                data-testid="submit-btn"
                className="w-full bg-gold text-jet py-4 font-semibold text-lg hover:bg-gold-light transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting...' : 'Submit Inquiry'}
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-charcoal border border-gold/20 p-8">
              <h3 className="font-display text-2xl text-white mb-6">Get in Touch</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-gold mt-1" />
                  <div>
                    <p className="text-white font-medium">Email</p>
                    <p className="text-gray-400">inquiries@rockinternationalbullion.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-gold mt-1" />
                  <div>
                    <p className="text-white font-medium">WhatsApp - New York</p>
                    <a 
                      href="https://wa.me/16463915932" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gold hover:text-gold-light transition-colors"
                    >
                      +1 (646) 391-5932
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-gold mt-1" />
                  <div>
                    <p className="text-white font-medium">WhatsApp - London</p>
                    <a 
                      href="https://wa.me/447424127586" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gold hover:text-gold-light transition-colors"
                    >
                      +44 7424 127586
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-gold mt-1" />
                  <div>
                    <p className="text-white font-medium">Locations</p>
                    <p className="text-gray-400">New York | London</p>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="bg-gradient-to-r from-green-900/30 to-green-800/20 border border-green-500/30 p-8">
              <h4 className="font-display text-xl text-white mb-4">Prefer WhatsApp?</h4>
              <p className="text-gray-300 text-sm mb-4">Connect with us directly for immediate assistance.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a 
                  href="https://wa.me/16463915932?text=Hello%2C%20I%20am%20interested%20in%20your%20gold%20acquisition%20services." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 font-semibold transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  New York
                </a>
                <a 
                  href="https://wa.me/447424127586?text=Hello%2C%20I%20am%20interested%20in%20your%20gold%20acquisition%20services." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 font-semibold transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  London
                </a>
              </div>
            </div>

            <div className="bg-jet border border-gold/30 p-8">
              <h4 className="font-display text-xl text-gold mb-4">Confidentiality Guarantee</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                All inquiries are treated with the highest level of confidentiality. 
                Your information will never be shared with third parties. 
                We comply with all applicable AML regulations while maintaining your privacy.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Privacy Policy Page
const PrivacyPolicyPage = () => (
  <div data-testid="privacy-policy-page" className="pt-24 pb-16 min-h-screen">
    <div className="max-w-4xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="font-display text-4xl md:text-5xl text-white mb-4">Privacy Policy</h1>
        <p className="text-gray-400">Last Updated: December 2025</p>
        <div className="w-20 h-1 bg-gold mt-4"></div>
      </motion.div>

      <div className="prose prose-invert max-w-none space-y-8">
        <section className="bg-charcoal border border-gold/20 p-8">
          <h2 className="font-display text-2xl text-gold mb-4">1. Introduction</h2>
          <p className="text-gray-300 leading-relaxed">
            {"Rock International Bullion (\"we,\" \"our,\" or \"us\") is committed to protecting the privacy and"} 
            confidentiality of our clients. This Privacy Policy explains how we collect, use, disclose, 
            and safeguard your information when you engage with our services or visit our website. 
            As a premier private gold dealership, we understand that discretion is paramount to our clients.
          </p>
        </section>

        <section className="bg-charcoal border border-gold/20 p-8">
          <h2 className="font-display text-2xl text-gold mb-4">2. Information We Collect</h2>
          <div className="text-gray-300 leading-relaxed space-y-4">
            <p><strong className="text-white">Personal Information:</strong> Name, email address, telephone number, country of residence, and preferred method of contact.</p>
            <p><strong className="text-white">Transaction Information:</strong> Details of gold purchases, payment information, delivery addresses, and transaction history.</p>
            <p><strong className="text-white">Identity Verification:</strong> Government-issued identification documents as required by applicable anti-money laundering regulations.</p>
            <p><strong className="text-white">Communication Records:</strong> Records of correspondence and consultations with our team.</p>
          </div>
        </section>

        <section className="bg-charcoal border border-gold/20 p-8">
          <h2 className="font-display text-2xl text-gold mb-4">3. How We Use Your Information</h2>
          <ul className="text-gray-300 leading-relaxed space-y-2 list-disc list-inside">
            <li>To process and fulfill your gold acquisition requests</li>
            <li>To communicate with you regarding your account and transactions</li>
            <li>To comply with legal and regulatory requirements</li>
            <li>To provide personalized investment insights and market updates</li>
            <li>To improve our services and client experience</li>
            <li>To prevent fraud and ensure the security of transactions</li>
          </ul>
        </section>

        <section className="bg-charcoal border border-gold/20 p-8">
          <h2 className="font-display text-2xl text-gold mb-4">4. Information Sharing & Disclosure</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            We do not sell, trade, or rent your personal information to third parties. We may share 
            your information only in the following circumstances:
          </p>
          <ul className="text-gray-300 leading-relaxed space-y-2 list-disc list-inside">
            <li><strong className="text-white">Service Providers:</strong> Trusted partners who assist in delivery, vaulting, and secure logistics</li>
            <li><strong className="text-white">Legal Compliance:</strong> When required by law, court order, or regulatory authority</li>
            <li><strong className="text-white">With Your Consent:</strong> When you have provided explicit written authorization</li>
          </ul>
        </section>

        <section className="bg-charcoal border border-gold/20 p-8">
          <h2 className="font-display text-2xl text-gold mb-4">5. Data Security</h2>
          <p className="text-gray-300 leading-relaxed">
            We implement industry-leading security measures to protect your personal information, including:
            encrypted communications, secure data storage, access controls, and regular security audits. 
            Our systems are designed to meet the highest standards of data protection utilized by 
            leading financial institutions.
          </p>
        </section>

        <section className="bg-charcoal border border-gold/20 p-8">
          <h2 className="font-display text-2xl text-gold mb-4">6. Data Retention</h2>
          <p className="text-gray-300 leading-relaxed">
            We retain your personal information for as long as necessary to fulfill the purposes outlined 
            in this policy, comply with legal obligations, resolve disputes, and enforce our agreements. 
            Transaction records are maintained in accordance with applicable financial regulations.
          </p>
        </section>

        <section className="bg-charcoal border border-gold/20 p-8">
          <h2 className="font-display text-2xl text-gold mb-4">7. Your Rights</h2>
          <p className="text-gray-300 leading-relaxed mb-4">You have the right to:</p>
          <ul className="text-gray-300 leading-relaxed space-y-2 list-disc list-inside">
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your data (subject to legal requirements)</li>
            <li>Opt-out of marketing communications</li>
            <li>Lodge a complaint with a supervisory authority</li>
          </ul>
        </section>

        <section className="bg-charcoal border border-gold/20 p-8">
          <h2 className="font-display text-2xl text-gold mb-4">8. Contact Us</h2>
          <p className="text-gray-300 leading-relaxed">
            For privacy-related inquiries or to exercise your rights, please contact our Privacy Officer at{' '}
            <a href="mailto:privacy@rockinternationalbullion.com" className="text-gold hover:underline">
              privacy@rockinternationalbullion.com
            </a>
          </p>
        </section>
      </div>
    </div>
  </div>
);

// Terms of Service Page
const TermsOfServicePage = () => (
  <div data-testid="terms-of-service-page" className="pt-24 pb-16 min-h-screen">
    <div className="max-w-4xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="font-display text-4xl md:text-5xl text-white mb-4">Terms of Service</h1>
        <p className="text-gray-400">Last Updated: December 2025</p>
        <div className="w-20 h-1 bg-gold mt-4"></div>
      </motion.div>

      <div className="prose prose-invert max-w-none space-y-8">
        <section className="bg-charcoal border border-gold/20 p-8">
          <h2 className="font-display text-2xl text-gold mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-300 leading-relaxed">
            {"By accessing or using the services of Rock International Bullion (\"Company,\" \"we,\" \"our\"),"} 
            you agree to be bound by these Terms of Service. If you do not agree to these terms, 
            please do not use our services. These terms constitute a legally binding agreement between 
            you and Rock International Bullion.
          </p>
        </section>

        <section className="bg-charcoal border border-gold/20 p-8">
          <h2 className="font-display text-2xl text-gold mb-4">2. Services Description</h2>
          <p className="text-gray-300 leading-relaxed">
            Rock International Bullion provides private gold acquisition services, including but not limited to:
            sourcing LBMA-certified gold bars, secure storage arrangements through partner facilities, 
            insured international delivery, and investment consultation. All services are provided on a 
            private, invitation-only basis.
          </p>
        </section>

        <section className="bg-charcoal border border-gold/20 p-8">
          <h2 className="font-display text-2xl text-gold mb-4">3. Eligibility Requirements</h2>
          <div className="text-gray-300 leading-relaxed space-y-4">
            <p>To engage our services, you must:</p>
            <ul className="space-y-2 list-disc list-inside">
              <li>Be at least 18 years of age or the age of majority in your jurisdiction</li>
              <li>Have the legal capacity to enter into binding contracts</li>
              <li>Provide accurate and complete identification documentation</li>
              <li>Not be subject to any sanctions or restrictions that would prohibit gold transactions</li>
              <li>Have funds from legitimate, verifiable sources</li>
            </ul>
          </div>
        </section>

        <section className="bg-charcoal border border-gold/20 p-8">
          <h2 className="font-display text-2xl text-gold mb-4">4. Pricing & Payment</h2>
          <div className="text-gray-300 leading-relaxed space-y-4">
            <p><strong className="text-white">Quotations:</strong> All gold prices are quoted based on current market rates plus applicable premiums. Quotations are valid for the time period specified and are subject to change.</p>
            <p><strong className="text-white">Payment:</strong> Full payment is required before gold is dispatched. We accept wire transfers from verified bank accounts. Payment terms are specified in each individual transaction agreement.</p>
            <p><strong className="text-white">Taxes & Duties:</strong> Clients are responsible for any applicable taxes, import duties, or other governmental charges in their jurisdiction.</p>
          </div>
        </section>

        <section className="bg-charcoal border border-gold/20 p-8">
          <h2 className="font-display text-2xl text-gold mb-4">5. Delivery & Risk Transfer</h2>
          <p className="text-gray-300 leading-relaxed">
            All deliveries are fully insured during transit. Risk of loss transfers to the client upon 
            delivery and signature confirmation. Delivery timelines are estimates and may vary based on 
            destination, customs processing, and other factors beyond our control. Special delivery 
            arrangements may be made for high-value acquisitions.
          </p>
        </section>

        <section className="bg-charcoal border border-gold/20 p-8">
          <h2 className="font-display text-2xl text-gold mb-4">6. Product Authenticity</h2>
          <p className="text-gray-300 leading-relaxed">
            All gold products supplied by Rock International Bullion are sourced exclusively from 
            LBMA-accredited refineries and come with original assay certificates. We guarantee the 
            authenticity, weight, and purity of all products as specified. Any concerns regarding 
            authenticity must be reported within 7 days of delivery.
          </p>
        </section>

        <section className="bg-charcoal border border-gold/20 p-8">
          <h2 className="font-display text-2xl text-gold mb-4">7. Limitation of Liability</h2>
          <p className="text-gray-300 leading-relaxed">
            To the maximum extent permitted by law, Rock International Bullion shall not be liable for 
            any indirect, incidental, special, consequential, or punitive damages, including loss of 
            profits, arising from your use of our services. Our total liability shall not exceed the 
            value of the specific transaction giving rise to the claim.
          </p>
        </section>

        <section className="bg-charcoal border border-gold/20 p-8">
          <h2 className="font-display text-2xl text-gold mb-4">8. Confidentiality</h2>
          <p className="text-gray-300 leading-relaxed">
            We maintain strict confidentiality regarding all client transactions and information. 
            Both parties agree not to disclose the terms of any transaction to third parties except 
            as required by law or with prior written consent. This obligation survives the termination 
            of any business relationship.
          </p>
        </section>

        <section className="bg-charcoal border border-gold/20 p-8">
          <h2 className="font-display text-2xl text-gold mb-4">9. Governing Law & Disputes</h2>
          <p className="text-gray-300 leading-relaxed">
            These Terms shall be governed by and construed in accordance with the laws of the State of 
            New York, United States. Any disputes arising from these terms or our services shall be 
            resolved through confidential arbitration in New York City, unless otherwise agreed in writing.
          </p>
        </section>

        <section className="bg-charcoal border border-gold/20 p-8">
          <h2 className="font-display text-2xl text-gold mb-4">10. Modifications</h2>
          <p className="text-gray-300 leading-relaxed">
            We reserve the right to modify these Terms of Service at any time. Material changes will be 
            communicated to active clients. Continued use of our services after such modifications 
            constitutes acceptance of the updated terms.
          </p>
        </section>

        <section className="bg-charcoal border border-gold/20 p-8">
          <h2 className="font-display text-2xl text-gold mb-4">11. Contact Information</h2>
          <p className="text-gray-300 leading-relaxed">
            For questions regarding these Terms of Service, please contact us at{' '}
            <a href="mailto:legal@rockinternationalbullion.com" className="text-gold hover:underline">
              legal@rockinternationalbullion.com
            </a>
          </p>
        </section>
      </div>
    </div>
  </div>
);

// AML Policy Page
const AMLPolicyPage = () => (
  <div data-testid="aml-policy-page" className="pt-24 pb-16 min-h-screen">
    <div className="max-w-4xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="font-display text-4xl md:text-5xl text-white mb-4">Anti-Money Laundering Policy</h1>
        <p className="text-gray-400">Last Updated: December 2025</p>
        <div className="w-20 h-1 bg-gold mt-4"></div>
      </motion.div>

      <div className="prose prose-invert max-w-none space-y-8">
        <section className="bg-charcoal border border-gold/20 p-8">
          <h2 className="font-display text-2xl text-gold mb-4">1. Policy Statement</h2>
          <p className="text-gray-300 leading-relaxed">
            Rock International Bullion is committed to the highest standards of Anti-Money Laundering (AML) 
            and Counter-Terrorist Financing (CTF) compliance. We maintain a robust compliance program 
            designed to prevent our services from being used to facilitate money laundering, terrorist 
            financing, or other financial crimes. This policy applies to all employees, officers, and 
            business partners.
          </p>
        </section>

        <section className="bg-charcoal border border-gold/20 p-8">
          <h2 className="font-display text-2xl text-gold mb-4">2. Regulatory Framework</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Our AML program is designed to comply with applicable laws and regulations, including:
          </p>
          <ul className="text-gray-300 leading-relaxed space-y-2 list-disc list-inside">
            <li>The Bank Secrecy Act (BSA) and its implementing regulations</li>
            <li>USA PATRIOT Act provisions</li>
            <li>Financial Crimes Enforcement Network (FinCEN) requirements</li>
            <li>Office of Foreign Assets Control (OFAC) sanctions programs</li>
            <li>UK Money Laundering Regulations</li>
            <li>Financial Action Task Force (FATF) recommendations</li>
          </ul>
        </section>

        <section className="bg-charcoal border border-gold/20 p-8">
          <h2 className="font-display text-2xl text-gold mb-4">3. Customer Due Diligence (CDD)</h2>
          <div className="text-gray-300 leading-relaxed space-y-4">
            <p>We conduct thorough due diligence on all clients, which includes:</p>
            <p><strong className="text-white">Identity Verification:</strong> Collection and verification of government-issued identification, proof of address, and other relevant documentation.</p>
            <p><strong className="text-white">Beneficial Ownership:</strong> Identification of ultimate beneficial owners for corporate clients and trusts.</p>
            <p><strong className="text-white">Source of Funds:</strong> Verification that funds used for transactions are derived from legitimate sources.</p>
            <p><strong className="text-white">Risk Assessment:</strong> Evaluation of client risk profile based on various factors including geography, transaction patterns, and business purpose.</p>
          </div>
        </section>

        <section className="bg-charcoal border border-gold/20 p-8">
          <h2 className="font-display text-2xl text-gold mb-4">4. Enhanced Due Diligence (EDD)</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Enhanced due diligence measures are applied to higher-risk clients, including:
          </p>
          <ul className="text-gray-300 leading-relaxed space-y-2 list-disc list-inside">
            <li>Politically Exposed Persons (PEPs) and their family members</li>
            <li>Clients from high-risk jurisdictions</li>
            <li>Complex ownership structures</li>
            <li>Unusually large or frequent transactions</li>
            <li>Clients with adverse media coverage</li>
          </ul>
        </section>

        <section className="bg-charcoal border border-gold/20 p-8">
          <h2 className="font-display text-2xl text-gold mb-4">5. Transaction Monitoring</h2>
          <p className="text-gray-300 leading-relaxed">
            We maintain ongoing monitoring systems to detect suspicious activities, including:
            unusual transaction patterns, transactions inconsistent with client profile, attempts to 
            structure transactions to avoid reporting thresholds, and transactions involving high-risk 
            jurisdictions. All suspicious activities are promptly investigated and reported as required.
          </p>
        </section>

        <section className="bg-charcoal border border-gold/20 p-8">
          <h2 className="font-display text-2xl text-gold mb-4">6. Sanctions Screening</h2>
          <p className="text-gray-300 leading-relaxed">
            All clients and transactions are screened against relevant sanctions lists, including:
            OFAC Specially Designated Nationals (SDN) List, UN Security Council Sanctions Lists, 
            EU Consolidated Sanctions List, and UK HM Treasury Sanctions List. We do not engage in 
            any transactions with sanctioned individuals, entities, or jurisdictions.
          </p>
        </section>

        <section className="bg-charcoal border border-gold/20 p-8">
          <h2 className="font-display text-2xl text-gold mb-4">7. Record Keeping</h2>
          <p className="text-gray-300 leading-relaxed">
            We maintain comprehensive records of all client identification documents, transaction records, 
            and due diligence documentation for a minimum of five years after the end of the business 
            relationship or completion of the transaction, or longer as required by applicable law.
          </p>
        </section>

        <section className="bg-charcoal border border-gold/20 p-8">
          <h2 className="font-display text-2xl text-gold mb-4">8. Reporting Obligations</h2>
          <p className="text-gray-300 leading-relaxed">
            We comply with all applicable reporting requirements, including the filing of Suspicious 
            Activity Reports (SARs) and Currency Transaction Reports (CTRs) as required. Our compliance 
            team is trained to identify and escalate potentially suspicious activities for review and 
            potential reporting.
          </p>
        </section>

        <section className="bg-charcoal border border-gold/20 p-8">
          <h2 className="font-display text-2xl text-gold mb-4">9. Employee Training</h2>
          <p className="text-gray-300 leading-relaxed">
            All employees receive comprehensive AML training upon hire and ongoing training thereafter. 
            Training covers recognition of suspicious activities, reporting procedures, regulatory 
            requirements, and the consequences of non-compliance. Training records are maintained 
            as part of our compliance documentation.
          </p>
        </section>

        <section className="bg-charcoal border border-gold/20 p-8">
          <h2 className="font-display text-2xl text-gold mb-4">10. Compliance Officer</h2>
          <p className="text-gray-300 leading-relaxed">
            Our designated AML Compliance Officer is responsible for overseeing the implementation of 
            this policy, ensuring regulatory compliance, coordinating with law enforcement when necessary, 
            and reporting to senior management and the board on AML matters.
          </p>
        </section>

        <section className="bg-charcoal border border-gold/20 p-8">
          <h2 className="font-display text-2xl text-gold mb-4">11. Client Cooperation</h2>
          <p className="text-gray-300 leading-relaxed">
            By engaging our services, clients agree to provide accurate information, respond promptly 
            to requests for additional documentation, and notify us of any material changes to their 
            information. Failure to cooperate with AML requirements may result in termination of the 
            business relationship.
          </p>
        </section>

        <section className="bg-charcoal border border-gold/20 p-8">
          <h2 className="font-display text-2xl text-gold mb-4">12. Contact Information</h2>
          <p className="text-gray-300 leading-relaxed">
            For questions regarding our AML Policy or to report suspicious activities, please contact 
            our Compliance Department at{' '}
            <a href="mailto:compliance@rockinternationalbullion.com" className="text-gold hover:underline">
              compliance@rockinternationalbullion.com
            </a>
          </p>
        </section>
      </div>
    </div>
  </div>
);

// Main App Component
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-jet">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
            <Route path="/aml-policy" element={<AMLPolicyPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
