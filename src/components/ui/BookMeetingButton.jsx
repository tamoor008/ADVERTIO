import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CALENDLY_CONFIG } from '../../config/calendly.config';

const BookMeetingButton = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fix Calendly popup close button after it loads
  useEffect(() => {
    const fixCalendlyCloseButton = () => {
      // Use MutationObserver to watch for Calendly popup injection
      const observer = new MutationObserver(() => {
        const closeButtons = document.querySelectorAll('.calendly-popup-close, .calendly-overlay-close, [data-calendly-close]');
        closeButtons.forEach((button) => {
          if (button) {
            button.style.position = 'absolute';
            button.style.top = '20px';
            button.style.right = '20px';
            button.style.zIndex = '1000000';
            button.style.pointerEvents = 'auto';
            button.style.cursor = 'pointer';
            button.style.width = '40px';
            button.style.height = '40px';
            button.style.display = 'flex';
            button.style.alignItems = 'center';
            button.style.justifyContent = 'center';
            button.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
            button.style.borderRadius = '50%';
            button.style.transition = 'background-color 0.2s ease';
            
            // Add hover effect via event listeners
            button.addEventListener('mouseenter', () => {
              button.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
            });
            button.addEventListener('mouseleave', () => {
              button.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
            });
            
            // Ensure SVG inside is not blocking clicks
            const svg = button.querySelector('svg');
            if (svg) {
              svg.style.pointerEvents = 'none';
              svg.style.width = '24px';
              svg.style.height = '24px';
            }
          }
        });
      });

      // Observe the document body for changes
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });

      // Also check immediately
      setTimeout(() => {
        const closeButtons = document.querySelectorAll('.calendly-popup-close, .calendly-overlay-close, [data-calendly-close]');
        closeButtons.forEach((button) => {
          button.style.position = 'absolute';
          button.style.top = '20px';
          button.style.right = '20px';
          button.style.zIndex = '1000000';
          button.style.pointerEvents = 'auto';
          button.style.cursor = 'pointer';
        });
      }, 500);

      return () => observer.disconnect();
    };

    const cleanup = fixCalendlyCloseButton();
    return cleanup;
  }, []);

  const handleClick = () => {
    // Open Calendly popup widget
    const openCalendlyPopup = () => {
      if (window.Calendly) {
        window.Calendly.initPopupWidget({
          url: CALENDLY_CONFIG.url,
          text: 'Schedule time with me',
          color: CALENDLY_CONFIG.pageSettings.primaryColor,
          textColor: CALENDLY_CONFIG.pageSettings.textColor,
          branding: true,
        });
      } else {
        // Fallback: open in new tab if Calendly script hasn't loaded yet
        window.open(CALENDLY_CONFIG.url, '_blank', 'noopener,noreferrer');
      }
    };

    // Check if Calendly is loaded, if not wait a bit and try again
    if (window.Calendly) {
      openCalendlyPopup();
    } else {
      // Wait for Calendly to load (max 2 seconds)
      let attempts = 0;
      const checkCalendly = setInterval(() => {
        attempts++;
        if (window.Calendly || attempts >= 20) {
          clearInterval(checkCalendly);
          openCalendlyPopup();
        }
      }, 100);
    }
  };

  return (
    <AnimatePresence>
      {isScrolled && (
        <motion.div
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          transition={{ 
            type: 'spring', 
            stiffness: 300, 
            damping: 20,
            duration: 0.3 
          }}
          className="fixed bottom-6 left-6 z-[10000]"
        >
          {/* Small dot banner */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-primary to-dark rounded-full z-10 shadow-lg"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClick}
            className="relative px-4 py-3 md:px-6 md:py-4 bg-gradient-to-r from-primary to-dark rounded-full shadow-2xl hover:shadow-primary/50 flex items-center justify-center gap-2 transition-all duration-300 group overflow-visible"
            style={{
              background: 'linear-gradient(135deg, #E94F37 0%, #253E5C 100%)',
              backgroundSize: '200% 200%',
              animation: 'gradientShift 3s ease infinite',
            }}
            aria-label="Book a Meeting"
          >
            {/* Animated gradient overlay */}
            <motion.div
              className="absolute inset-0 rounded-full opacity-75"
              style={{
                background: 'linear-gradient(135deg, #E94F37 0%, #253E5C 100%)',
                backgroundSize: '200% 200%',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-dark opacity-50 blur-xl group-hover:opacity-75 transition-opacity" />
            
            {/* Content */}
            <svg
              className="relative w-5 h-5 md:w-6 md:h-6 text-white z-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="relative text-white font-bold text-sm md:text-base whitespace-nowrap z-10 drop-shadow-lg">
              Book a Meeting
            </span>
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full z-10"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>

          {/* Add CSS animation for gradient */}
          <style>{`
            @keyframes gradientShift {
              0% {
                background-position: 0% 50%;
              }
              50% {
                background-position: 100% 50%;
              }
              100% {
                background-position: 0% 50%;
              }
            }
            
            /* Fix Calendly popup close button - make it clickable and absolutely positioned */
            .calendly-overlay .calendly-popup-close {
              position: absolute !important;
              top: 20px !important;
              right: 20px !important;
              z-index: 999999 !important;
              pointer-events: auto !important;
              cursor: pointer !important;
              width: 40px !important;
              height: 40px !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
              background-color: rgba(0, 0, 0, 0.1) !important;
              border-radius: 50% !important;
              transition: background-color 0.2s ease !important;
            }
            
            .calendly-overlay .calendly-popup-close:hover {
              background-color: rgba(0, 0, 0, 0.2) !important;
            }
            
            .calendly-overlay .calendly-popup-close svg {
              width: 24px !important;
              height: 24px !important;
              pointer-events: none !important;
            }
            
            /* Ensure Calendly popup overlay has proper z-index */
            .calendly-overlay {
              z-index: 999998 !important;
            }
            
            .calendly-popup {
              z-index: 999999 !important;
            }
            
            /* Fix any potential pointer-events issues */
            .calendly-popup-content {
              pointer-events: auto !important;
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookMeetingButton;

