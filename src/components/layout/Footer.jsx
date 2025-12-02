import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../../assets/favicon.JPG';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark border-t border-white/10 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Advertio" className="w-10 h-10 object-contain" />
              <span className="text-lg font-bold text-white">Advertio</span>
            </Link>
            <p className="text-white/60 text-sm">
              Premium marketing agency creating cinematic digital experiences.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-white/60 hover:text-primary text-sm transition-colors">About</Link></li>
              <li><Link to="/portfolio" className="text-white/60 hover:text-primary text-sm transition-colors">Portfolio</Link></li>
              <li><Link to="/contact" className="text-white/60 hover:text-primary text-sm transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><span className="text-white/60 text-sm">3D Design</span></li>
              <li><span className="text-white/60 text-sm">Web Development</span></li>
              <li><span className="text-white/60 text-sm">Branding</span></li>
              <li><span className="text-white/60 text-sm">Digital Marketing</span></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li><a href="mailto:hello@advertio.com" className="text-white/60 hover:text-primary text-sm transition-colors">Email</a></li>
              <li><a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-primary text-sm transition-colors">WhatsApp</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">
            © {currentYear} Advertio. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-white/60 hover:text-primary text-sm transition-colors">Privacy</a>
            <a href="#" className="text-white/60 hover:text-primary text-sm transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

