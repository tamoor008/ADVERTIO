'use client'

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { servicesList } from './constants';

const ContactSection3D = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    adSpend: '',
    message: '',
  });
  const [status, setStatus] = useState('idle');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');

    setTimeout(() => {
      setStatus('sent');
      setFormData({ name: '', email: '', company: '', service: '', adSpend: '', message: '' });

      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <motion.section
      ref={sectionRef}
      className="relative z-10 py-8 md:py-24 px-6 lg:px-8 overflow-hidden bg-transparent"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
      style={{ 
        perspective: '1800px'
      }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/20 blur-2xl rounded-full opacity-30"
        />
        <div
          className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-[#253E5C]/25 blur-2xl rounded-full opacity-25"
        />
        <div
          className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#FF6B4A]/15 blur-2xl rounded-full opacity-20"
        />
        <div
          className="absolute top-1/3 right-1/3 w-[400px] h-[400px] bg-[#6D28D9]/15 blur-2xl rounded-full opacity-20"
        />
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-15"
            style={{
              width: `${200 + i * 60}px`,
              height: `${200 + i * 60}px`,
              left: `${(i * 15) % 100}%`,
              top: `${(i * 20 + 10) % 100}%`,
              background: `radial-gradient(circle, rgba(${i % 2 === 0 ? '233, 79, 55' : '37, 62, 92'}, ${0.1 + i * 0.02}) 0%, transparent 70%)`,
              filter: 'blur(60px)',
            }}
          />
        ))}
      </div>

      <div className="relative max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-1 gap-10 items-stretch">
        <motion.form
          onSubmit={handleSubmit}
          className="relative rounded-[36px] border border-white/20 shadow-[0_25px_80px_rgba(0,0,0,0.4)] p-8 md:p-10"
          style={{
            background: 'linear-gradient(135deg, rgba(233, 79, 55, 1) 0%, rgba(37, 62, 92, 1) 50%, rgba(233, 79, 55, 1) 100%)',
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative space-y-6">
            {[
              { label: 'Full name', name: 'name', type: 'text', placeholder: 'Ariana Collins' },
              { label: 'Work email', name: 'email', type: 'email', placeholder: 'ariana@brand.com' },
              { label: 'Company or product', name: 'company', type: 'text', placeholder: 'Peak Aurora' },
            ].map((field, index) => (
              <motion.div
                key={field.name}
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.3 + index * 0.1,
                }}
              >
                <label className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70 block">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                  className={`w-full px-5 py-4 rounded-2xl border border-white/20 placeholder-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/40 transition-all ${
                    formData[field.name] ? 'bg-white text-[#253E5C]' : 'bg-white/10 text-white'
                  }`}
                />
              </motion.div>
            ))}

            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.5,
              }}
            >
              <label className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70 block">
                Service
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                className={`w-full px-5 py-4 rounded-2xl border border-white/20 placeholder-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/40 transition-all appearance-none cursor-pointer ${
                  formData.service ? 'bg-white text-[#253E5C]' : 'bg-white/10 text-white'
                }`}
                style={{
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
            </motion.div>

            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.6,
              }}
            >
              <label className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70 block">
                Monthly Ad spend
              </label>
              <input
                type="text"
                name="adSpend"
                placeholder="e.g., $5,000 - $10,000"
                value={formData.adSpend}
                onChange={handleChange}
                required
                className={`w-full px-5 py-4 rounded-2xl border border-white/20 placeholder-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/40 transition-all ${
                  formData.adSpend ? 'bg-white text-[#253E5C]' : 'bg-white/10 text-white'
                }`}
              />
            </motion.div>

            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.7,
              }}
            >
              <label className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70 block">
                Project notes
              </label>
              <textarea
                name="message"
                rows={5}
                placeholder="Share context, goals, or launch date..."
                value={formData.message}
                onChange={handleChange}
                className={`w-full px-5 py-4 rounded-2xl border border-white/20 placeholder-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/40 transition-all resize-none ${
                  formData.message ? 'bg-white text-[#253E5C]' : 'bg-white/10 text-white'
                }`}
              />
            </motion.div>

            <motion.button
              type="submit"
              disabled={status === 'sending'}
              className="relative w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl text-white font-semibold text-lg bg-gradient-to-r from-[#253E5C] via-primary to-[#FF6B4A] shadow-lg shadow-primary/40 transition-all disabled:opacity-60"
              whileTap={{ scale: 0.98 }}
            >
              <span>{status === 'sending' ? 'Sending...' : 'Send the brief'}</span>
              <span>→</span>
            </motion.button>

            {status === 'sent' && (
              <motion.p
                className="text-center text-sm font-semibold text-white"
                initial={{ opacity: 0, y: -6, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                Message received. We&apos;ll respond shortly.
              </motion.p>
            )}
          </div>
        </motion.form>
      </div>
    </motion.section>
  );
};

export default ContactSection3D;

