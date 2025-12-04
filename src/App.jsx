import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import PageTransition from './components/layout/PageTransition';
import WhatsAppButton from './components/ui/WhatsAppButton';
import BookMeetingButton from './components/ui/BookMeetingButton';
import './App.css';
import './styles/tokens.css';

// Lazy load all pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Contact = lazy(() => import('./pages/Contact'));
const FreeAudit = lazy(() => import('./pages/FreeAudit'));
const Blogs = lazy(() => import('./pages/Blogs'));
const NotFound = lazy(() => import('./pages/NotFound'));

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/services/:serviceId" element={<PageTransition><ServiceDetail /></PageTransition>} />
        <Route path="/portfolio" element={<PageTransition><Portfolio /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/free-audit" element={<PageTransition><FreeAudit /></PageTransition>} />
        <Route path="/blogs" element={<PageTransition><Blogs /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white" style={{ backgroundColor: '#FFFFFF', background: '#FFFFFF' }}>
        <Navbar />
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center bg-white" style={{ backgroundColor: '#FFFFFF', background: '#FFFFFF' }}>
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
              <p className="text-[#253E5C]/60 text-sm">Loading...</p>
            </div>
          </div>
        }>
          <AppRoutes />
        </Suspense>
        <Footer />
        <WhatsAppButton />
        <BookMeetingButton />
      </div>
    </Router>
  );
}

export default App;
