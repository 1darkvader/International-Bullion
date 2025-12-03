import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, Shield, Globe, Lock, Phone, Mail, MapPin } from 'lucide-react';
import './App.css';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

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
            <li><a href="#" className="hover:text-gold transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">AML Policy</a></li>
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
  const [products, setProducts] = useState([]);
  const [spotPrice, setSpotPrice] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then(res => res.json())
      .then(data => setProducts(data.products || []))
      .catch(err => console.error('Error fetching products:', err));

    fetch(`${API_URL}/api/spot-price`)
      .then(res => res.json())
      .then(data => setSpotPrice(data))
      .catch(err => console.error('Error fetching spot price:', err));
  }, []);

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
            src="https://images.unsplash.com/photo-1643324897407-54f8ae049132?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwYnVsbGlvbiUyMGJsYWNrJTIwYmFja2dyb3VuZHxlbnwwfHx8fDE3NjQ3ODU2OTN8MA&ixlib=rb-4.1.0&q=85" 
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
            {spotPrice && (
              <div className="inline-block bg-charcoal/80 border border-gold/30 px-6 py-3 mb-8">
                <span className="text-gray-400 text-sm">Gold Spot Price: </span>
                <span className="text-gold font-semibold text-lg">${spotPrice.gold_price_usd.toLocaleString()} USD/oz</span>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                data-testid="hero-cta-primary"
                className="bg-gold text-jet px-8 py-4 font-semibold tracking-wide hover:bg-gold-light transition-all flex items-center justify-center gap-2"
              >
                {"Request Today's Price"} <ChevronRight size={20} />
              </Link>
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
            <p className="text-gray-400 max-w-2xl mx-auto">Owning physical gold is not just a purchase—it's a strategy.</p>
            <div className="w-20 h-1 bg-gold mx-auto mt-4"></div>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product, idx) => (
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
                  <Link
                    to="/contact"
                    className="mt-4 block text-center border border-gold text-gold py-2 text-sm hover:bg-gold hover:text-jet transition-all"
                  >
                    Request Price
                  </Link>
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
            <Link
              to="/contact"
              data-testid="cta-consultation"
              className="inline-block bg-gold text-jet px-10 py-4 font-semibold text-lg tracking-wide hover:bg-gold-light transition-all"
            >
              Request Private Consultation
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

// Products Page
const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setLoading(false);
      });
  }, []);

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

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                data-testid={`product-card-${idx}`}
                className="bg-charcoal border border-gold/20 hover:border-gold transition-all group"
              >
                <div className="aspect-square bg-jet overflow-hidden">
                  <img 
                    src={product.image_url} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl text-white mb-3">{product.name}</h3>
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Weight</span>
                      <span className="text-gold">{product.weight} {product.weight_unit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Purity</span>
                      <span className="text-gold">{product.purity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Certification</span>
                      <span className="text-white text-xs">{product.certification}</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>
                  <Link
                    to="/contact"
                    className="block text-center bg-gold text-jet py-3 font-semibold hover:bg-gold-light transition-all"
                  >
                    Request Today's Price
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
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
        <div className="w-20 h-1 bg-gold mx-auto"></div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="bg-charcoal border border-gold/30 p-1">
            <div className="bg-gradient-to-br from-gold/20 to-transparent aspect-[4/5] flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto bg-gold-gradient rounded-full flex items-center justify-center mb-6">
                  <span className="font-display text-4xl text-jet font-bold">DR</span>
                </div>
                <h3 className="font-display text-2xl text-white">David Rock</h3>
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
          <h2 className="font-display text-3xl text-white mb-6">Meet David Rock</h2>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              For over 15 years, David Rock has assisted private clients in quietly building, 
              holding, and transferring physical gold wealth. Operating from New York and London, 
              he has established Rock International Bullion as a trusted name among high-net-worth 
              individuals seeking discretion and expertise.
            </p>
            <p>
              With an extensive network of LBMA-accredited refineries and secure logistics partners, 
              David ensures that every transaction is handled with precision, confidentiality, and 
              world-class security.
            </p>
            <p>
              His approach is simple: understand the client's objectives, source the finest gold 
              available, and deliver it safely—anywhere in the world.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-6">
            <div className="bg-jet border border-gold/20 p-4 text-center">
              <div className="font-display text-3xl text-gold">15+</div>
              <div className="text-gray-400 text-sm">Years Experience</div>
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
        className="mt-24 bg-charcoal border border-gold/20 p-10"
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

// Contact Page
const ContactPage = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
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
          <p className="text-gray-400 max-w-2xl mx-auto">Request a private consultation or inquire about today's gold prices.</p>
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
                    <p className="text-white font-medium">Phone</p>
                    <p className="text-gray-400">By appointment only</p>
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
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
