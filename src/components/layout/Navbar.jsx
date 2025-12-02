import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import brandLogo from '../../assets/logo-Advertio.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesHovered, setIsServicesHovered] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const servicesDropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get viewport height and handle resize
  useEffect(() => {
    const updateViewportHeight = () => {
      setViewportHeight(window.innerHeight);
    };
    
    updateViewportHeight();
    window.addEventListener('resize', updateViewportHeight);
    window.addEventListener('orientationchange', updateViewportHeight);
    
    return () => {
      window.removeEventListener('resize', updateViewportHeight);
      window.removeEventListener('orientationchange', updateViewportHeight);
    };
  }, []);

  // Track mobile/desktop for logo scaling
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Services data matching ServiceDetail.jsx
  const services = [
    { id: 'performance-marketing', title: 'Performance Marketing', desc: 'Drive measurable growth with data-driven campaigns engineered for maximum ROI.' },
    { id: 'digital-marketing', title: 'Digital Marketing', desc: 'Build a strong online presence with strategies that connect, engage, and convert.' },
    { id: 'social-media-handling-branding', title: 'Social Media Handling & Branding', desc: 'Grow your influence and build a brand your audience loves.' },
    { id: 'creative-design', title: 'Creative & Design', desc: 'Transform your brand visuals into powerful assets that influence and inspire.' },
    { id: 'video-editing', title: 'Video Editing', desc: 'Create cinematic visuals that elevate your brand and captivate your audience.' },
    { id: 'website-development', title: 'Website Development', desc: 'Build a high-performance website that converts visitors into customers.' },
    { id: 'shopify-store-development', title: 'Shopify Store Development', desc: 'Launch a revenue-driven Shopify store built for performance, scalability, and brand experience.' },
    { id: 'ecommerce-solutions', title: 'Ecommerce Solutions', desc: 'Empower your online business with complete ecommerce strategy, technology, and growth solutions.' },
  ];

  const navLinks = [
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-[10001] transition-all duration-300 ${
        isScrolled ? 'bg-white/95 shadow-lg backdrop-blur-md py-4' : 'bg-transparent py-6'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <motion.img
            src={brandLogo}
            alt="Advertio"
            className="h-24 md:h-40 -my-14 object-contain drop-shadow-[0_8px_32px_rgba(0,0,0,0.55)]"
            style={{ 
              transform: `scale(${isMobile ? '0.8' : '1.35'})`, 
              transformOrigin: 'left center', 
              filter: 'brightness(1.35) contrast(1.15)'
            }}
            whileHover={{ scale: isMobile ? 0.85 : 1.4 }}
            transition={{ type: 'spring', stiffness: 250 }}
          />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {/* Home Link */}
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <Link
              to="/"
              className={`relative text-sm font-medium transition-colors ${
                location.pathname === '/' ? 'text-primary' : 'text-slate-900/90 hover:text-primary'
              }`}
            >
              Home
              {location.pathname === '/' && (
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                  layoutId="navbar-indicator"
                />
              )}
            </Link>
          </motion.div>

          {/* Services Dropdown */}
          <motion.div
            className="relative"
            onMouseEnter={() => setIsServicesHovered(true)}
            onMouseLeave={() => setIsServicesHovered(false)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <div
              className={`relative text-sm font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                location.pathname.startsWith('/services/') ? 'text-primary' : 'text-slate-900/90 hover:text-primary'
              }`}
            >
              Services
              <motion.div
                animate={{ rotate: isServicesHovered ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="flex-shrink-0"
              >
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 9l-7 7-7-7" 
                  />
                </svg>
              </motion.div>
              {location.pathname.startsWith('/services/') && (
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                  layoutId="navbar-indicator"
                />
              )}
            </div>
            
            <AnimatePresence>
              {isServicesHovered && (
                <motion.div
                  ref={servicesDropdownRef}
                  className="absolute top-full left-0 ml-[-650%] mt-4 w-[900px] max-w-[calc(100vw-2rem)] bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200/50 overflow-hidden z-50"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  onMouseEnter={() => setIsServicesHovered(true)}
                  onMouseLeave={() => setIsServicesHovered(false)}
                >
                  <div className="p-6 max-h-[600px] overflow-y-auto">
                    <div className="grid grid-cols-4 gap-4">
                      {services.map((service, index) => (
                        <motion.div
                          key={service.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.03, duration: 0.2 }}
                          whileHover={{ y: -4 }}
                          className="h-full"
                        >
                          <motion.div
                            whileHover={{ 
                              scale: 1.02,
                              transition: { duration: 0.2, ease: "easeOut" }
                            }}
                            className="h-full"
                          >
                            <Link
                              to={`/services/${service.id}`}
                              className="block p-5 rounded-xl bg-gradient-to-br from-white to-slate-50 border border-slate-200/50 hover:border-primary/50 shadow-[0_4px_16px_rgba(37,62,92,0.25)] hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group h-full relative overflow-hidden"
                              onClick={() => setIsServicesHovered(false)}
                            >
                              {/* Subtle background gradient on hover */}
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                initial={false}
                              />
                              
                              {/* Content wrapper */}
                              <div className="relative z-10">
                                <motion.h3 
                                  className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors duration-300 mb-2 leading-tight"
                                  whileHover={{ x: 2 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  {service.title}
                                </motion.h3>
                                <p className="text-xs text-slate-600 group-hover:text-slate-700 transition-colors duration-300 leading-relaxed">
                                  {service.desc}
                                </p>
                              </div>
                              
                              {/* Subtle shine effect on hover */}
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
                                initial={{ x: '-100%' }}
                                whileHover={{ x: '100%' }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                              />
                            </Link>
                          </motion.div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Other Nav Links */}
          {navLinks.map((link) => (
            <motion.div
              key={link.path}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Link
                to={link.path}
                className={`relative text-sm font-medium transition-colors ${
                  location.pathname === link.path ? 'text-primary' : 'text-slate-900/90 hover:text-primary'
                }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                    layoutId="navbar-indicator"
                  />
                )}
              </Link>
            </motion.div>
          ))}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <Link
              to="/free-audit"
              className="px-6 py-2.5 rounded-full text-white text-sm font-bold transition-all border border-white/20 hover:shadow-lg hover:shadow-primary/50 hover:brightness-110 block"
              style={{
                background: 'linear-gradient(135deg, rgba(233, 79, 55, 1) 0%, rgb(0, 37, 82) 50%, rgba(233, 79, 55, 1) 100%)'
              }}
            >
              Get free Audit
            </Link>
          </motion.div>
        </div>

        <button
          className="md:hidden text-slate-900"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 overflow-y-auto"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              maxHeight: `${viewportHeight + 0}px`,
              overflowY: 'auto'
            }}
          >
            <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
              {/* Get free Audit Button - First position */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <Link
                  to="/free-audit"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-6 py-2.5 rounded-full text-white text-sm font-bold transition-all text-center border border-white/20 hover:shadow-lg hover:shadow-primary/50 hover:brightness-110 block"
                  style={{
                    background: 'linear-gradient(135deg, rgba(233, 79, 55, 1) 0%, rgba(37, 62, 92, 1) 50%, rgba(233, 79, 55, 1) 100%)'
                  }}
                >
                  Get free Audit
                </Link>
              </motion.div>

              {/* Mobile Home Link */}
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === '/' ? 'text-primary' : 'text-slate-900/80 hover:text-primary'
                  }`}
                >
                  Home
                </Link>
              </motion.div>

              {/* Mobile Other Nav Links */}
              {navLinks.map((link) => (
                <motion.div
                  key={link.path}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-sm font-medium transition-colors ${
                      location.pathname === link.path ? 'text-primary' : 'text-slate-900/80 hover:text-primary'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile Services Dropdown - Moved to last position */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                  className="flex items-center justify-between text-sm font-medium text-slate-900/80 hover:text-primary transition-colors"
                >
                  <span>Services</span>
                  <motion.svg
                    className="w-5 h-5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ rotate: isMobileServicesOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </motion.svg>
                </button>
                <AnimatePresence>
                  {isMobileServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div 
                        className="pt-2 flex flex-col gap-3 overflow-y-auto"
                        style={{
                          maxHeight: `${Math.max(viewportHeight * 0.6, 300)}px`,
                          paddingBottom: '30px'
                        }}
                      >
                        {services.map((service, index) => (
                          <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.2 }}
                          >
                            <Link
                              to={`/services/${service.id}`}
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setIsMobileServicesOpen(false);
                              }}
                              className={`block p-4 rounded-xl bg-gradient-to-br from-white to-slate-50 border border-slate-200/50 shadow-sm hover:shadow-md hover:border-primary/50 transition-all duration-300 ${
                                location.pathname === `/services/${service.id}` ? 'border-primary/50 shadow-md' : ''
                              }`}
                            >
                              <h3 className={`text-sm font-bold mb-1.5 ${
                                location.pathname === `/services/${service.id}` ? 'text-primary' : 'text-slate-900'
                              }`}>
                                {service.title}
                              </h3>
                              <p className="text-xs text-slate-600 leading-relaxed">
                                {service.desc}
                              </p>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

