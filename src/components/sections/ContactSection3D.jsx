import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const ContactSection3D = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
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
      setFormData({ name: '', email: '', company: '', message: '' });

      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <motion.section
      ref={sectionRef}
      className="relative z-10 py-24 px-6 lg:px-8 overflow-hidden bg-transparent"
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

      <div className="relative max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr,1.1fr] gap-10 items-stretch">
        <motion.div
          className="rounded-[32px] border border-white/10 p-10 shadow-[0_20px_80px_rgba(0,0,0,0.3)]"
          style={{
            background: 'linear-gradient(135deg, rgba(37, 62, 92, 1) 0%, rgba(233, 79, 55, 1) 50%, rgba(37, 62, 92, 1) 100%)',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <motion.p
            className="text-xs uppercase tracking-[0.6em] text-white/60 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Contact
          </motion.p>
          <motion.h3
            className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Reserve a growth sprint with our hybrid 3D marketing pod.
          </motion.h3>
          <p className="text-white/70 text-lg mb-10">
            Drop the essentials of your project and we'll return a calibrated roadmap within one business day.
          </p>

          <div className="space-y-6">
            {[
              { label: 'Response window', value: '< 2 hours' },
              { label: 'Avg. engagement', value: '90 day retained pod' },
              { label: 'Formats', value: 'Paid media + 3D creative + CRO' },
            ].map((item, idx) => (
              <motion.div
                key={item.label}
                className="flex items-center justify-between rounded-2xl border border-white/20 px-5 py-4"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)'
                }}
                initial={{ opacity: 0, y: 20, x: -20 }}
                animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: 20, x: -20 }}
                transition={{ duration: 0.6, delay: 0.4 + idx * 0.1 }}
              >
                <span className="text-xs tracking-[0.35em] uppercase text-white/90 font-semibold">{item.label}</span>
                <span className="text-base font-semibold text-white">{item.value}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 space-y-3">
            <motion.a
              href="mailto:hello@advertio.com"
              className="block text-lg font-semibold text-white transition-colors"
            >
              hello@advertio.com
            </motion.a>
            <motion.a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-lg text-white/70 transition-colors"
            >
              WhatsApp · +1 (234) 567-890
            </motion.a>
          </div>
        </motion.div>

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
                delay: 0.6,
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
                required
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
                Message received. We'll respond shortly.
              </motion.p>
            )}
          </div>
        </motion.form>
      </div>
    </motion.section>
  );
};

export default ContactSection3D;

