import { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailjs.config';

const PRIMARY_COLOR = '#E94F37';
const SECONDARY_COLOR = '#253E5C';
const DEEP_BLUE = '#0F172A';

const FreeAudit = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const formInView = useInView(formRef, { once: true, amount: 0.2 });

  const [formData, setFormData] = useState({
    adPlatform: '',
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    monthlyAdSpend: '',
    advertisingGoals: '',
  });

  const [status, setStatus] = useState('idle');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const adPlatforms = [
    'Meta Ads (Facebook & Instagram)',
    'Google Ads',
    'TikTok Ads',
    'Snapchat Ads',
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    
    // Validate email in real-time
    if (name === 'email' && value) {
      if (!validateEmail(value)) {
        setErrors((prev) => ({ ...prev, email: 'Please enter a valid email address' }));
      } else {
        setErrors((prev) => ({ ...prev, email: '' }));
      }
    }
    
    // Validate fullName in real-time
    if (name === 'fullName' && value.trim() === '') {
      setErrors((prev) => ({ ...prev, fullName: 'Please enter your full name' }));
    } else if (name === 'fullName') {
      setErrors((prev) => ({ ...prev, fullName: '' }));
    }
    
    // Validate phone in real-time
    if (name === 'phone' && value.trim() === '') {
      setErrors((prev) => ({ ...prev, phone: 'Please enter your phone number' }));
    } else if (name === 'phone') {
      setErrors((prev) => ({ ...prev, phone: '' }));
    }
    
    // Validate companyName in real-time
    if (name === 'companyName' && value.trim() === '') {
      setErrors((prev) => ({ ...prev, companyName: 'Please enter your company name' }));
    } else if (name === 'companyName') {
      setErrors((prev) => ({ ...prev, companyName: '' }));
    }
    
    // Validate monthlyAdSpend in real-time
    if (name === 'monthlyAdSpend' && value.trim() === '') {
      setErrors((prev) => ({ ...prev, monthlyAdSpend: 'Please enter your monthly ad spend' }));
    } else if (name === 'monthlyAdSpend') {
      setErrors((prev) => ({ ...prev, monthlyAdSpend: '' }));
    }
  };

  const handleSelectPlatform = (platform) => {
    setFormData((prev) => ({ ...prev, adPlatform: platform }));
    setIsDropdownOpen(false);
    // Clear error when platform is selected
    if (errors.adPlatform) {
      setErrors((prev) => ({ ...prev, adPlatform: '' }));
    }
  };

  // Check if all required fields are filled
  const isFormValid = () => {
    return (
      formData.adPlatform.trim() !== '' &&
      formData.fullName.trim() !== '' &&
      formData.email.trim() !== '' &&
      validateEmail(formData.email) &&
      formData.phone.trim() !== '' &&
      formData.companyName.trim() !== '' &&
      formData.monthlyAdSpend.trim() !== ''
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;

    // Validate required fields
    if (!formData.adPlatform.trim()) {
      setErrors((prev) => ({ ...prev, adPlatform: 'Please select an ad platform' }));
    }
    if (!formData.fullName.trim()) {
      setErrors((prev) => ({ ...prev, fullName: 'Please enter your full name' }));
    }
    if (!formData.email || !validateEmail(formData.email)) {
      setErrors((prev) => ({ ...prev, email: 'Please enter a valid email address' }));
    }
    if (!formData.phone.trim()) {
      setErrors((prev) => ({ ...prev, phone: 'Please enter your phone number' }));
    }
    if (!formData.companyName.trim()) {
      setErrors((prev) => ({ ...prev, companyName: 'Please enter your company name' }));
    }
    if (!formData.monthlyAdSpend.trim()) {
      setErrors((prev) => ({ ...prev, monthlyAdSpend: 'Please enter your monthly ad spend' }));
    }

    // Don't submit if form is invalid
    if (!isFormValid()) {
      return;
    }

    // Clear any errors
    setErrors({});
    setStatus('sending');

    // Initialize EmailJS with your public key
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

    // Prepare email template parameters
    const templateParams = {
      name: formData.fullName || 'Not provided',
      email: formData.email || 'Not provided',
      phone: formData.phone || 'Not provided',
      company_name: formData.companyName || 'Not provided',
      ad_platform: formData.adPlatform || 'Not provided',
      monthly_ad_spend: formData.monthlyAdSpend || 'Not provided',
      advertising_goals: formData.advertisingGoals || 'No goals specified',
      time: new Date().toLocaleString(),
    };

    // Debug: Log what we're sending
    console.log('Sending audit email with params:', templateParams);

    try {
      // Send email using EmailJS
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATES.AUDIT,
        templateParams
      );

      // Success - reset form and show success message
      setStatus('sent');
      setFormData({
        adPlatform: '',
        fullName: '',
        email: '',
        phone: '',
        companyName: '',
        monthlyAdSpend: '',
        advertisingGoals: '',
      });

      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
      // Show error message for 5 seconds, then reset
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    }
  };

  return (
    <motion.div
      ref={sectionRef}
      className="relative min-h-screen pt-24 pb-20 overflow-visible bg-white"
      style={{ backgroundColor: '#FFFFFF', background: '#FFFFFF' }}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
      style={{ perspective: '1200px' }}
    >
      <div className="relative max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Back Button */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[#253E5C]/70 hover:text-[#253E5C] font-semibold transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </motion.div>

        {/* Page Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 relative z-10"
            style={{
              background: `linear-gradient(135deg, ${PRIMARY_COLOR}, ${SECONDARY_COLOR})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              transformStyle: 'preserve-3d',
            }}
            initial={{ opacity: 0, y: 20, rotateX: -20 }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 20, rotateX: -20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Get Your Free Audit
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-[#253E5C]/70 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Let's analyze your advertising strategy and unlock your growth potential
          </motion.p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          className="relative rounded-[32px] p-[2px] bg-gradient-to-r from-[#253E5C] via-primary to-[#ff7b5f] shadow-2xl"
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={formInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 40 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            className="rounded-[30px] bg-white/70 backdrop-blur-2xl border border-white/40 p-8 md:p-12 lg:p-16 relative z-10 overflow-visible"
            style={{
              transformStyle: 'preserve-3d',
            }}
          whileHover={{ 
            y: -4,
            rotateX: 2,
            z: 10,
          }}
        >
          {/* Animated background glow */}
          <motion.div
            className="absolute inset-0 rounded-[36px] pointer-events-none -z-10"
            animate={{
              boxShadow: [
                `0 0 40px ${PRIMARY_COLOR}20, 0 0 80px ${PRIMARY_COLOR}15, 0 0 120px ${SECONDARY_COLOR}10`,
                `0 0 80px ${PRIMARY_COLOR}40, 0 0 160px ${PRIMARY_COLOR}30, 0 0 240px ${SECONDARY_COLOR}20`,
                `0 0 40px ${PRIMARY_COLOR}20, 0 0 80px ${PRIMARY_COLOR}15, 0 0 120px ${SECONDARY_COLOR}10`,
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <div className="space-y-6">
            {/* Select Ad Platform - Dropdown */}
            <motion.div
              className="space-y-2 relative z-[100]"
              initial={{ opacity: 0, y: 30, rotateY: -15 }}
              animate={formInView ? { opacity: 1, y: 0, rotateY: 0 } : { opacity: 0, y: 30, rotateY: -15 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.label
                className="text-sm font-extrabold uppercase tracking-[0.3em] text-[#253E5C]/70 block"
                animate={{ 
                  color: formData.adPlatform ? '#E94F37' : 'rgba(37, 62, 92, 0.7)'
                }}
                transition={{ duration: 0.3 }}
              >
                Select Ad Platform <span className="text-red-500">*</span>
              </motion.label>
              <div className="relative" style={{ zIndex: 9999 }}>
                <motion.button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`w-full px-5 py-4 rounded-2xl bg-white border-2 border-[#253E5C]/20 text-[#253E5C] placeholder-[#253E5C]/40 focus:outline-none transition-all text-left flex items-center justify-between relative ${
                    errors.adPlatform ? 'border-red-500' : 'border-[#253E5C]/20'
                  }`}
                  style={{ zIndex: 10000 }}
                  whileHover={{ 
                    scale: 1.02,
                    borderColor: errors.adPlatform ? '#EF4444' : 'rgba(233, 79, 55, 0.6)',
                    boxShadow: errors.adPlatform ? `0 0 20px #EF444430` : `0 0 20px rgba(233, 79, 55, 0.3)`,
                  }}
                  whileFocus={{ 
                    scale: 1.02,
                    borderColor: errors.adPlatform ? '#EF4444' : 'rgba(233, 79, 55, 0.6)',
                    boxShadow: errors.adPlatform ? `0 0 20px #EF444430` : `0 0 20px rgba(233, 79, 55, 0.3)`,
                  }}
                  animate={{
                    borderColor: errors.adPlatform ? '#EF4444' : (formData.adPlatform ? PRIMARY_COLOR : 'rgba(37, 62, 92, 0.2)'),
                  }}
                >
                  <span className={formData.adPlatform ? 'text-[#253E5C]' : 'text-[#253E5C]/40'}>
                    {formData.adPlatform || 'Select an ad platform'}
                  </span>
                  <motion.svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </motion.button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="absolute w-full mt-2 rounded-2xl bg-white border-2 border-[#253E5C]/20 shadow-2xl overflow-hidden"
                      style={{ 
                        backgroundColor: '#ffffff',
                        zIndex: 10001,
                        top: '100%',
                        left: 0,
                      }}
                    >
                      {adPlatforms.map((platform, index) => (
                        <motion.button
                          key={platform}
                          type="button"
                          onClick={() => handleSelectPlatform(platform)}
                          className="w-full px-5 py-4 text-left text-[#253E5C] bg-white hover:bg-[#253E5C]/5 transition-colors border-b border-[#253E5C]/10 last:border-b-0"
                          style={{ backgroundColor: '#ffffff' }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ 
                            x: 5,
                            backgroundColor: `${PRIMARY_COLOR}10`,
                          }}
                        >
                          {platform}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <AnimatePresence>
                {errors.adPlatform && (
                  <motion.p
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm text-red-500 font-medium mt-1"
                  >
                    {errors.adPlatform}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Full Name */}
            <FormField
              label="Full Name"
              name="fullName"
              type="text"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange}
              formInView={formInView}
              delay={0.3}
              required={true}
              error={errors.fullName}
            />

            {/* Email Address */}
            <FormField
              label="Email Address"
              name="email"
              type="email"
              placeholder="john@company.com"
              value={formData.email}
              onChange={handleChange}
              formInView={formInView}
              delay={0.4}
              required={true}
              error={errors.email}
            />

            {/* Phone Number */}
            <FormField
              label="Phone Number"
              name="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={formData.phone}
              onChange={handleChange}
              formInView={formInView}
              delay={0.5}
              required={true}
              error={errors.phone}
            />

            {/* Company Name */}
            <FormField
              label="Company Name"
              name="companyName"
              type="text"
              placeholder="Your Company"
              value={formData.companyName}
              onChange={handleChange}
              formInView={formInView}
              delay={0.6}
              required={true}
              error={errors.companyName}
            />

            {/* Monthly Ad Spend */}
            <FormField
              label="Monthly Ad Spend"
              name="monthlyAdSpend"
              type="text"
              placeholder="$10,000"
              value={formData.monthlyAdSpend}
              onChange={handleChange}
              formInView={formInView}
              delay={0.7}
              required={true}
              error={errors.monthlyAdSpend}
            />

            {/* Advertising Goals */}
            <motion.div
              className="space-y-2"
              style={{ position: 'relative', zIndex: 1 }}
              initial={{ opacity: 0, y: 30, rotateY: -15 }}
              animate={formInView ? { opacity: 1, y: 0, rotateY: 0 } : { opacity: 0, y: 30, rotateY: -15 }}
              transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.label
                className="text-sm font-extrabold uppercase tracking-[0.3em] text-[#253E5C]/70 block"
                animate={{ 
                  color: formData.advertisingGoals ? '#E94F37' : 'rgba(37, 62, 92, 0.7)'
                }}
                transition={{ duration: 0.3 }}
              >
                What are your main advertising goals?
              </motion.label>
              <motion.textarea
                name="advertisingGoals"
                rows={5}
                placeholder="Tell us about your advertising goals, challenges, and what you hope to achieve..."
                value={formData.advertisingGoals}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-2xl bg-white border-2 border-[#253E5C]/20 text-[#253E5C] placeholder-[#253E5C]/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/40 focus:bg-white transition-all resize-none"
                whileFocus={{ 
                  scale: 1.01,
                  borderColor: 'rgba(233, 79, 55, 0.6)',
                  boxShadow: '0 0 20px rgba(233, 79, 55, 0.3)',
                }}
                animate={{
                  borderColor: formData.advertisingGoals ? PRIMARY_COLOR : 'rgba(37, 62, 92, 0.2)',
                }}
              />
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={status === 'sending' || !isFormValid()}
              className={`relative w-full flex items-center justify-center gap-3 px-6 py-5 rounded-2xl text-white font-semibold text-lg shadow-lg transition-all overflow-hidden mt-8 ${
                !isFormValid() || status === 'sending'
                  ? 'bg-gray-400 cursor-not-allowed opacity-50'
                  : 'bg-gradient-to-r from-[#253E5C] via-primary to-[#FF6B4A] shadow-primary/40 cursor-pointer'
              }`}
              style={{
                transformStyle: 'preserve-3d',
              }}
              initial={{ opacity: 0, y: 30, rotateX: -10 }}
              animate={formInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 30, rotateX: -10 }}
              transition={{ 
                default: { duration: 0.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] },
                hover: { duration: 0.2, ease: 'easeOut' }
              }}
              whileHover={!isFormValid() || status === 'sending' ? {} : { 
                scale: 1.03,
                boxShadow: '0 10px 40px rgba(233, 79, 55, 0.5)',
                translateZ: 20,
              }}
              whileTap={!isFormValid() || status === 'sending' ? {} : { scale: 0.98 }}
            >
              {/* Shimmer effect - only when enabled */}
              {isFormValid() && status !== 'sending' && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
                />
              )}
              <span className="relative z-10">
                {status === 'sending' ? 'Sending...' : 'Get Your Free Audit'}
              </span>
              {status !== 'sending' && isFormValid() && (
                <motion.span
                  className="relative z-10"
                  animate={{ x: [0, 6, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  →
                </motion.span>
              )}
            </motion.button>

            {/* Success Banner */}
            {status === 'sent' && (
              <motion.div
                className="mt-6 p-6 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 shadow-lg"
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-bold text-green-800 mb-1">
                      Your Audit Request Has Been Sent!
                    </h3>
                    <p className="text-sm text-green-700">
                      Thank you! We'll analyze your account and get back to you within 24 hours.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Error Banner */}
            {status === 'error' && (
              <motion.div
                className="mt-6 p-6 rounded-2xl bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200 shadow-lg"
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    className="flex-shrink-0 w-10 h-10 rounded-full bg-red-500 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-bold text-red-800 mb-1">
                      Failed to Send Request
                    </h3>
                    <p className="text-sm text-red-700">
                      There was an error sending your request. Please try again or contact us directly.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
            
          </div>
        </motion.form>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Reusable Form Field Component with 3D effects
const FormField = ({ label, name, type, placeholder, value, onChange, formInView, delay, error, required }) => {
  const PRIMARY_COLOR = '#E94F37';
  
  return (
    <motion.div
      className="space-y-2"
      style={{ position: 'relative', zIndex: 1 }}
      initial={{ opacity: 0, y: 30, rotateY: -15 }}
      animate={formInView ? { opacity: 1, y: 0, rotateY: 0 } : { opacity: 0, y: 30, rotateY: -15 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.label
        className="text-sm font-extrabold uppercase tracking-[0.3em] text-[#253E5C]/70 block"
        animate={{ 
          color: value ? '#E94F37' : 'rgba(37, 62, 92, 0.7)'
        }}
        transition={{ duration: 0.3 }}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </motion.label>
      <motion.input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-5 py-4 rounded-2xl bg-white border-2 border-[#253E5C]/20 text-[#253E5C] placeholder-[#253E5C]/40 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-white transition-all ${
          error ? 'border-red-500' : 'border-[#253E5C]/20 focus:border-primary'
        }`}
        whileFocus={{ 
          scale: 1.01,
          borderColor: error ? '#EF4444' : 'rgba(233, 79, 55, 0.6)',
          boxShadow: error ? `0 0 20px #EF444430` : `0 0 20px rgba(233, 79, 55, 0.3)`,
        }}
        animate={{
          borderColor: error ? '#EF4444' : (value ? PRIMARY_COLOR : 'rgba(37, 62, 92, 0.2)'),
        }}
      />
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.2 }}
            className="text-sm text-red-500 font-medium mt-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FreeAudit;

