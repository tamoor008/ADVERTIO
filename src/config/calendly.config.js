/**
 * Calendly Configuration
 * 
 * This file contains the Calendly integration settings.
 * Update the URL below with your Calendly event type URL.
 */

export const CALENDLY_CONFIG = {
  // Your Calendly event type URL
  // Format: https://calendly.com/username/event-type
  url: 'https://calendly.com/malaktalha166/30min',
  
  // Optional: Pre-fill user information
  // These will be passed to Calendly if available
  prefill: {
    // name: 'John Doe',
    // email: 'john@example.com',
  },
  
  // Optional: Custom styling
  pageSettings: {
    backgroundColor: 'ffffff',
    textColor: '4d5055',
    primaryColor: 'E94F37', // Your brand primary color
  },
  
  // Optional: Hide event type details
  hideEventTypeDetails: false,
  
  // Optional: Hide landing page details
  hideLandingPageDetails: false,
};

