'use client'

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { servicesList } from '../components/sections/constants';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailjs.config';

const Contact = () => {
  const heroRef = useRef(null);
  const formSectionRef = useRef(null);
  const contactInfoRef = useRef(null);
  const formRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    adSpend: '',
    message: '',
  });
  
  const [formStatus, setFormStatus] = useState('idle'); // idle, sending, sent, error
  const [focusedField, setFocusedField] = useState(null);
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });
  const [errors, setErrors] = useState({});

  const heroInView = useInView(heroRef, { once: true, amount: 0.1 });
  const formInView = useInView(formSectionRef, { once: true, amount: 0.2 });
  const contactInfoInView = useInView(contactInfoRef, { once: true, amount: 0.2 });

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const handleMouseMove = (event) => {
    if (!formRef.current) return;
    const rect = formRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    setMouseTilt({
      x: Math.max(-1, Math.min(1, x)),
      y: Math.max(-1, Math.min(1, y)),
    });
  };

  const resetTilt = () => setMouseTilt({ x: 0, y: 0 });

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.company.trim()) {
      newErrors.company = 'Company is required';
    }
    if (!formData.service.trim()) {
      newErrors.service = 'Service is required';
    }
    if (!formData.adSpend.trim()) {
      newErrors.adSpend = 'Monthly Ad spend is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (formStatus === 'sending') return;
    setFormStatus('sending');
    
    // Initialize EmailJS with your public key
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

    // Prepare email template parameters
    const templateParams = {
      name: formData.name || 'Not provided',
      email: formData.email || 'Not provided',
      title: formData.service ? `Contact Form - ${formData.service}` : 'Contact Form',
      company: formData.company || 'Not provided',
      service: formData.service || 'Not provided',
      ad_spend: formData.adSpend || 'Not provided',
      message: formData.message || 'No message provided',
      time: new Date().toLocaleString(),
    };

    // Debug: Log what we're sending
    console.log('Sending email with params:', templateParams);

    try {
      // Send email using EmailJS
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATES.CONTACT,
        templateParams
      );

      // Success - reset form and show success message
      setFormStatus('sent');
      setFormData({ name: '', email: '', company: '', service: '', adSpend: '', message: '' });
      setFocusedField(null);
      setErrors({});

      // Reset status after 5 seconds
      setTimeout(() => setFormStatus('idle'), 5000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setFormStatus('error');
      // Show error message for 5 seconds, then reset
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    }
  };

  const contactMethods = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: 'Email',
      value: 'info@advertio.com',
      href: 'mailto:info@advertio.com',
      color: '#E94F37',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: 'Phone',
      value: '(+92) 323 4304559',
      href: 'tel:+923234304559',
      color: '#253E5C',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      label: 'WhatsApp',
      value: 'WhatsApp Us',
      href: 'https://wa.me/923366424379',
      color: '#25D366',
    },
  ];

  const formFields = [
    { name: 'name', label: 'Full name', type: 'text', placeholder: 'Ariana Collins' },
    { name: 'email', label: 'Work email', type: 'email', placeholder: 'ariana@brand.com' },
    { name: 'company', label: 'Company or product', type: 'text', placeholder: 'Peak Aurora' },
  ];

  return (
    <div className="relative min-h-screen overflow-visible">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-visible pt-24 pb-8 md:pb-20 z-10">
        <div className="container mx-auto px-6 relative z-30 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-6xl mx-auto w-full"
          >
        <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6"
            >
              <span className="px-4 py-2 rounded-full border border-primary/40 text-primary text-sm font-semibold tracking-wide uppercase bg-white/80 backdrop-blur">
                Get In Touch
              </span>
        </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-8 leading-[1.1] px-4 sm:px-6 md:px-8 py-2"
              style={{
                background: 'linear-gradient(to right, #E94F37, #ff6b4a, #253E5C)',
                backgroundSize: '120% 120%',
                backgroundPosition: 'center',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
                hyphens: 'auto',
                overflow: 'visible',
                textOverflow: 'clip',
                whiteSpace: 'normal',
                display: 'block',
                width: '100%',
                maxWidth: '100%',
              }}
            >
              Let's Create Something Amazing
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-[#253E5C]/80 leading-relaxed px-4 sm:px-6 md:px-8"
            >
              Ready to transform your digital presence? Reach out and let's discuss your next big project.
            </motion.p>
          </motion.div>
              </div>
      </section>

      {/* Contact Info Cards Section */}
      <section ref={contactInfoRef} className="relative py-8 md:py-20 px-6 z-30">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {contactMethods.map((method, index) => (
              <motion.a
                key={index}
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : undefined}
                rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group relative"
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -10, scale: 1.02 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <motion.div
                  className="relative rounded-[32px] p-8 bg-white/95 backdrop-blur-md shadow-lg overflow-hidden"
                  style={{
                    border: '2px solid transparent',
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.95), rgba(255,255,255,0.95)), linear-gradient(135deg, #253E5C, #E94F37)',
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'padding-box, border-box',
                  }}
                  whileHover={{
                    boxShadow: `0 25px 60px ${method.color}30, 0 0 30px ${method.color}20`,
                  }}
                >
                  {/* Animated Background */}
                  <motion.div
                    className="absolute inset-0 opacity-0"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${method.color}15 0%, transparent 70%)`,
                    }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  />

                  <div className="relative z-10">
                    <motion.div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                      style={{
                        background: `linear-gradient(135deg, ${method.color}20, ${method.color}10)`,
                      }}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div style={{ color: method.color }}>
                        {method.icon}
                      </div>
                    </motion.div>
                    
                    <h3 className="text-sm uppercase tracking-[0.3em] text-[#253E5C]/60 mb-2 font-semibold">
                      {method.label}
                    </h3>
                    <p className="text-xl font-bold text-[#253E5C] group-hover:text-primary transition-colors">
                      {method.value}
                    </p>
                  </div>

                  {/* Floating particles on hover */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full pointer-events-none"
                      style={{
                        width: '4px',
                        height: '4px',
                        background: method.color,
                        left: `${30 + i * 20}%`,
                        top: `${20 + i * 15}%`,
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{
                        scale: [0, 1, 0],
                        opacity: [0, 0.8, 0],
                        y: [0, -20],
                        x: [0, (i % 2 === 0 ? 1 : -1) * 10],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: 'easeOut',
                      }}
                    />
                  ))}
                </motion.div>
              </motion.a>
            ))}
          </div>
            </div>
      </section>

      {/* Contact Form Section */}
      <section ref={formSectionRef} className="relative py-8 md:py-20 px-6 z-30">
        <div className="container mx-auto max-w-[1500px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-primary to-[#253E5C] bg-clip-text text-transparent">
              Send Us a Message
            </h2>
            <p className="text-lg text-[#253E5C]/70 max-w-2xl mx-auto">
              Fill out the form below and we'll get back to you within 24 hours
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-1 gap-10 items-start">
            {/* Contact Form */}
            <motion.form
              ref={formRef}
              onSubmit={handleFormSubmit}
              onMouseMove={handleMouseMove}
              onMouseLeave={resetTilt}
              className="relative rounded-[36px] border border-white/20 shadow-[0_25px_80px_rgba(0,0,0,0.4)] p-8 md:p-10"
              style={{
                background: 'linear-gradient(135deg, rgba(233, 79, 55, 1) 0%, rgba(37, 62, 92, 1) 50%, rgba(233, 79, 55, 1) 100%)',
                transformStyle: 'preserve-3d'
              }}
              initial={{ opacity: 0, y: 60, rotateY: 15 }}
              animate={{
                opacity: formInView ? 1 : 0,
                y: formInView ? 0 : 60,
                rotateX: mouseTilt.y * 5,
                rotateY: mouseTilt.x * 5 + (formInView ? 0 : 15),
                translateZ: formInView ? 0 : -100,
                scale: formInView ? 1 : 0.95,
              }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.01 }}
            >
              {/* Animated Background Glow */}
              <motion.div
                className="absolute inset-0 rounded-[36px] opacity-0"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(233, 79, 55, 0.3) 0%, transparent 70%)',
                }}
                animate={{
                  opacity: [0, 0.3, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              <div className="relative space-y-6">
                {/* Form Fields */}
                {formFields.map((field, index) => (
                  <motion.div
                    key={field.name}
                    className="space-y-2"
                    initial={{ opacity: 0, y: 30, rotateX: -10 }}
                    animate={formInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 30, rotateX: -10 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.25 + index * 0.1,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    whileHover={{ scale: 1.01, translateZ: 10 }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <motion.label 
                      className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70 block"
                      animate={{
                        color: focusedField === field.name ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)',
                      }}
                    >
                      {field.label}
                    </motion.label>
                    <motion.input
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={formData[field.name]}
                      onChange={handleFormChange}
                      onFocus={() => setFocusedField(field.name)}
                      onBlur={() => setFocusedField(null)}
                      required
                      className={`w-full px-5 py-4 rounded-2xl border border-white/20 placeholder-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/40 transition-all ${
                        formData[field.name] ? 'bg-white text-[#253E5C]' : 'bg-white/10 text-white'
                      }`}
                      style={{ transformStyle: 'preserve-3d' }}
                    />
                    <AnimatePresence>
                      {errors[field.name] && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-sm text-red-300 font-medium"
                        >
                          {errors[field.name]}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}

                {/* Service Dropdown */}
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 30, rotateX: -10 }}
                  animate={formInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 30, rotateX: -10 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.65,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  whileHover={{ scale: 1.01, translateZ: 10 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <motion.label 
                    className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70 block"
                    animate={{
                      color: focusedField === 'service' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)',
                    }}
                  >
                    Service
                  </motion.label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleFormChange}
                    onFocus={() => setFocusedField('service')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className={`w-full px-5 py-4 rounded-2xl border border-white/20 placeholder-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/40 transition-all appearance-none cursor-pointer ${
                      formData.service ? 'bg-white text-[#253E5C]' : 'bg-white/10 text-white'
                    }`}
                    style={{ 
                      transformStyle: 'preserve-3d',
                      backgroundImage: formData.service 
                        ? 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%23253E5C\' d=\'M6 9L1 4h10z\'/%3E%3C/svg%3E")'
                        : 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%23ffffff\' d=\'M6 9L1 4h10z\'/%3E%3C/svg%3E")',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1rem center',
                      paddingRight: '2.5rem',
                    }}
                  >
                    <option value="" className="bg-[#253E5C] text-white">Select a service</option>
                    {servicesList.map((service) => (
                      <option key={service.id} value={service.title} className="bg-[#253E5C] text-white">
                        {service.title}
                      </option>
                    ))}
                  </select>
                  <AnimatePresence>
                    {errors.service && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-sm text-red-300 font-medium"
                      >
                        {errors.service}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Monthly Ad spend */}
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 30, rotateX: -10 }}
                  animate={formInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 30, rotateX: -10 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.75,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  whileHover={{ scale: 1.01, translateZ: 10 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <motion.label 
                    className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70 block"
                    animate={{
                      color: focusedField === 'adSpend' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)',
                    }}
                  >
                    Monthly Ad spend
                  </motion.label>
                  <motion.input
                    type="text"
                    name="adSpend"
                    placeholder="e.g., $5,000 - $10,000"
                    value={formData.adSpend}
                    onChange={handleFormChange}
                    onFocus={() => setFocusedField('adSpend')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className={`w-full px-5 py-4 rounded-2xl border border-white/20 placeholder-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/40 transition-all ${
                      formData.adSpend ? 'bg-white text-[#253E5C]' : 'bg-white/10 text-white'
                    }`}
                    style={{ transformStyle: 'preserve-3d' }}
                  />
                  <AnimatePresence>
                    {errors.adSpend && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-sm text-red-300 font-medium"
                      >
                        {errors.adSpend}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Message Textarea */}
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 30, rotateX: -10 }}
                  animate={formInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 30, rotateX: -10 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.85,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  whileHover={{ scale: 1.01, translateZ: 10 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <motion.label 
                    className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70 block"
                    animate={{
                      color: focusedField === 'message' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)',
                    }}
                  >
                    Project notes
                  </motion.label>
                  <motion.textarea
                    name="message"
                    rows={5}
                    placeholder="Share context, goals, or launch date..."
                    value={formData.message}
                    onChange={handleFormChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-5 py-4 rounded-2xl border border-white/20 placeholder-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/40 transition-all resize-none ${
                      formData.message ? 'bg-white text-[#253E5C]' : 'bg-white/10 text-white'
                    }`}
                    style={{ transformStyle: 'preserve-3d' }}
                  />
                  <AnimatePresence>
                    {errors.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-sm text-red-300 font-medium"
                      >
                        {errors.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="relative w-full flex items-center justify-center gap-3 px-6 py-5 rounded-2xl text-white font-semibold text-lg bg-gradient-to-r from-[#253E5C] via-primary to-[#FF6B4A] shadow-lg shadow-primary/40 transition-all disabled:opacity-60 overflow-hidden mt-8"
                  whileHover={{ 
                    scale: formStatus === 'sending' ? 1 : 1.03, 
                    translateZ: 20, 
                    boxShadow: '0 15px 50px rgba(233, 79, 55, 0.6)' 
                  }}
                  whileTap={{ scale: 0.98 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Shimmer Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
                  />
                  
                  <span className="relative z-10">
                    {formStatus === 'sending' ? 'Sending...' : 'Send the brief'}
                  </span>
                  
                  {formStatus !== 'sending' && (
                    <motion.span
                      className="relative z-10 text-2xl"
                      animate={{ x: [0, 6, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      →
                    </motion.span>
                  )}
                  
                  {formStatus === 'sending' && (
                    <motion.span
                      className="relative z-10"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      ⏳
                    </motion.span>
                  )}
                </motion.button>

                {/* Success Message */}
                {formStatus === 'sent' && (
                  <motion.p
                    className="text-center text-sm font-semibold text-white"
                    initial={{ opacity: 0, y: -6, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    Message received. We'll respond shortly.
                  </motion.p>
                )}

                {/* Error Message */}
                {formStatus === 'error' && (
                  <motion.p
                    className="text-center text-sm font-semibold text-red-300"
                    initial={{ opacity: 0, y: -6, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    Failed to send message. Please try again or contact us directly.
                  </motion.p>
                )}
              </div>
            </motion.form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
