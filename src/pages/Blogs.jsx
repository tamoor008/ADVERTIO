import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const Blogs = () => {
  const sectionRef = useRef(null);
  const contactInfoRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1, margin: '-100px' });
  const contactInfoInView = useInView(contactInfoRef, { once: true, amount: 0.2 });

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);


  const blogs = [
    {
      id: 1,
      title: 'The Future of E-commerce: 3D Product Experiences',
      excerpt: 'Discover how immersive 3D product visualization is revolutionizing online shopping and driving conversion rates through interactive experiences.',
      category: 'E-commerce',
      author: 'Sarah Chen',
      date: 'March 15, 2024',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&q=80',
      color: '#E94F37',
      tags: ['3D Design', 'E-commerce', 'Innovation'],
    },
    {
      id: 2,
      title: 'Performance Marketing: Data-Driven Growth Strategies',
      excerpt: 'Learn how to leverage advanced analytics and cross-channel optimization to scale your DTC brand profitably with measurable results.',
      category: 'Marketing',
      author: 'Michael Rodriguez',
      date: 'March 12, 2024',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80',
      color: '#6D28D9',
      tags: ['Performance', 'Analytics', 'Growth'],
    },
    {
      id: 3,
      title: 'AR and Mixed Reality: The Next Frontier in Brand Engagement',
      excerpt: 'Explore how augmented reality filters and experiential AR kits are creating new dimensions for customer interaction and brand storytelling.',
      category: 'Technology',
      author: 'Emma Thompson',
      date: 'March 10, 2024',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&q=80',
      color: '#16A34A',
      tags: ['AR', 'Innovation', 'Engagement'],
    },
    {
      id: 4,
      title: 'Conversion Rate Optimization: Building Premium Funnels',
      excerpt: 'Uncover the secrets behind high-converting landing pages and how WebGL-powered microsites are transforming user experiences.',
      category: 'UX Design',
      author: 'David Park',
      date: 'March 8, 2024',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop&q=80',
      color: '#EA580C',
      tags: ['CRO', 'UX', 'Conversion'],
    },
    {
      id: 5,
      title: 'Social Commerce: Leveraging Social Platforms for Direct Sales',
      excerpt: 'Discover how brands are turning social media platforms into powerful sales channels through shoppable content and influencer partnerships.',
      category: 'Social Media',
      author: 'Jessica Martinez',
      date: 'March 5, 2024',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop&q=80',
      color: '#DC2626',
      tags: ['Social Commerce', 'Sales', 'Strategy'],
    },
    {
      id: 6,
      title: 'Email Marketing Mastery: Personalization at Scale',
      excerpt: 'Learn advanced email marketing techniques that drive engagement and revenue through AI-powered personalization and behavioral triggers.',
      category: 'Marketing',
      author: 'Robert Kim',
      date: 'March 3, 2024',
      readTime: '9 min read',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop&q=80',
      color: '#0891B2',
      tags: ['Email', 'Personalization', 'Automation'],
    },
    {
      id: 7,
      title: 'WebGL Experiences: Creating Immersive Brand Websites',
      excerpt: 'Dive into the world of WebGL technology and discover how interactive 3D experiences are reshaping digital brand storytelling.',
      category: 'Technology',
      author: 'Lisa Anderson',
      date: 'March 1, 2024',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop&q=80',
      color: '#7C3AED',
      tags: ['WebGL', '3D', 'Branding'],
    },
    {
      id: 8,
      title: 'Content Strategy for DTC Brands: Building Authentic Connections',
      excerpt: 'Explore how direct-to-consumer brands create authentic content that resonates with audiences and builds lasting customer relationships.',
      category: 'Content',
      author: 'James Wilson',
      date: 'February 28, 2024',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&q=80',
      color: '#059669',
      tags: ['Content', 'DTC', 'Strategy'],
    },
    {
      id: 9,
      title: 'Mobile-First Design: Optimizing for the Modern Consumer',
      excerpt: 'Learn how to create mobile-first experiences that capture attention, drive engagement, and convert visitors into loyal customers.',
      category: 'UX Design',
      author: 'Maria Garcia',
      date: 'February 25, 2024',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&q=80',
      color: '#BE185D',
      tags: ['Mobile', 'UX', 'Design'],
    },
    {
      id: 10,
      title: 'Retention Marketing: Turning One-Time Buyers into Loyal Customers',
      excerpt: 'Discover proven strategies for customer retention that increase lifetime value and transform your business growth trajectory.',
      category: 'Marketing',
      author: 'Chris Lee',
      date: 'February 22, 2024',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop&q=80',
      color: '#C2410C',
      tags: ['Retention', 'Loyalty', 'Growth'],
    },
    {
      id: 11,
      title: 'Video Marketing: Creating Compelling Stories That Convert',
      excerpt: 'Master the art of video marketing with techniques for creating engaging content that tells your brand story and drives action.',
      category: 'Video',
      author: 'Amanda Taylor',
      date: 'February 20, 2024',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop&q=80',
      color: '#B91C1C',
      tags: ['Video', 'Storytelling', 'Marketing'],
    },
    {
      id: 12,
      title: 'Data Analytics: Making Sense of Your Marketing Metrics',
      excerpt: 'Navigate the complex world of marketing analytics and learn how to extract actionable insights from your data to drive better decisions.',
      category: 'Analytics',
      author: 'Daniel Brown',
      date: 'February 18, 2024',
      readTime: '9 min read',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80',
      color: '#1E40AF',
      tags: ['Analytics', 'Data', 'Metrics'],
    },
  ];

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
      href: 'https://wa.me/923234304559',
      color: '#25D366',
    },
  ];

  return (
    <div className="relative min-h-screen overflow-visible bg-white" style={{ backgroundColor: '#FFFFFF', background: '#FFFFFF' }}>
      <motion.section
        ref={sectionRef}
        className="relative z-10 pt-24 pb-32 overflow-visible bg-gradient-to-b from-white/50 via-white/70 to-white/90 w-full"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{ minHeight: '900px' }}
      >
        {/* Static Background Elements - Optimized for performance */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-20"
              style={{
                width: `${120 + i * 40}px`,
                height: `${120 + i * 40}px`,
                left: `${i * 20}%`,
                top: `${(i % 3) * 30}%`,
                background: `radial-gradient(circle, rgba(233, 79, 55, ${0.1 + i * 0.02}) 0%, transparent 70%)`,
              }}
            />
          ))}
        </div>

        <div className="relative w-[90%] mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.p
              className="text-xs uppercase tracking-[0.5em] text-[#253E5C]/60 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Insights & Strategies
            </motion.p>
            <motion.h3
              className="text-5xl md:text-6xl lg:text-7xl font-black text-[#253E5C] mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <span className="bg-gradient-to-r from-[#253E5C] via-primary to-[#ff6b4a] bg-clip-text text-transparent">
                All Blogs
              </span>
            </motion.h3>
            <motion.p
              className="text-[#253E5C]/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              Expert insights on e-commerce growth, digital marketing, and cutting-edge technology
            </motion.p>
          </motion.div>

          {/* Blog Grid Container */}
          <div className="relative min-h-[800px] py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5 lg:gap-7" style={{ minHeight: '640px' }}>
              {blogs.map((blog, index) => {
                return (
                  <motion.article
                    key={blog.id}
                    className="relative group flex-shrink-0 w-full mx-auto"
                    initial={{ 
                      opacity: 0, 
                      y: 50,
                      scale: 0.95,
                    }}
                    whileInView={{ 
                      opacity: 1, 
                      y: 0,
                      scale: 1,
                    }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <div
                      className="relative h-full rounded-[32px] overflow-hidden cursor-pointer transition-transform duration-300 group-hover:-translate-y-2"
                      style={{
                        minHeight: '480px',
                        position: 'relative',
                      }}
                    >
                      {/* Gradient Border Wrapper */}
                      <div
                        className="absolute inset-0 rounded-[32px] p-[2px] transition-all duration-300 group-hover:opacity-100"
                        style={{
                          background: `linear-gradient(135deg, ${blog.color}, ${blog.color}80, #253E5C60, ${blog.color})`,
                        }}
                      >
                        <div
                          className="w-full h-full rounded-[30px] relative overflow-hidden transition-all duration-300"
                          style={{
                            background: 'transparent',
                          }}
                        >
                          {/* Blog Image */}
                          <div className="relative w-full h-44 overflow-hidden">
                            <img
                              src={blog.image}
                              alt={blog.title}
                              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
                            />
                            {/* Image Overlay Gradient */}
                            <div
                              className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-60"
                              style={{
                                background: `linear-gradient(to bottom, transparent 0%, ${blog.color}20 100%)`,
                                opacity: 0.3,
                              }}
                            />
                            
                            {/* Category Badge */}
                            <div
                              className="absolute top-4 left-4 px-3 py-1 rounded-full backdrop-blur-md"
                              style={{
                                background: `${blog.color}CC`,
                                border: `1px solid ${blog.color}`,
                              }}
                            >
                              <span className="text-xs font-black text-white uppercase tracking-wide">
                                {blog.category}
                              </span>
                            </div>
                          </div>

                          {/* Content Container */}
                          <div className="relative z-10 p-6 md:p-8 bg-white/95 min-h-[400px] flex flex-col">
                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              {blog.tags.map((tag, tagIndex) => (
                                <span
                                  key={tagIndex}
                                  className="px-2 py-1 rounded-lg text-xs font-semibold transition-transform duration-200 group-hover:scale-105"
                                  style={{
                                    background: `${blog.color}15`,
                                    color: blog.color,
                                    border: `1px solid ${blog.color}30`,
                                  }}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>

                            {/* Title */}
                            <h3
                              className="text-xl md:text-2xl font-black mb-3 leading-tight transition-colors duration-300 group-hover:text-[#253E5C]"
                              style={{
                                color: blog.color,
                              }}
                            >
                              {blog.title}
                            </h3>

                            {/* Excerpt */}
                            <p className="text-sm md:text-base leading-relaxed mb-6 flex-grow text-[#253E5C]/70 transition-colors duration-300 group-hover:text-[#253E5C]">
                              {blog.excerpt}
                            </p>

                            {/* Meta Information */}
                            <div className="flex items-center justify-between pt-4 border-t border-[#253E5C]/10">
                              <div className="flex items-center gap-3">
                                <div
                                  className="w-10 h-10 rounded-full overflow-hidden border-2 transition-all duration-300 group-hover:scale-105 group-hover:border-[3px]"
                                  style={{ 
                                    borderColor: blog.color,
                                  }}
                                >
                                  <div
                                    className="w-full h-full"
                                    style={{
                                      background: `linear-gradient(135deg, ${blog.color}, ${blog.color}80)`,
                                    }}
                                  />
                                </div>
                                <div>
                                  <p className="text-sm font-semibold text-[#253E5C]">{blog.author}</p>
                                  <p className="text-xs text-[#253E5C]/50">{blog.date}</p>
                                </div>
                              </div>
                              <div
                                className="flex items-center gap-2 text-xs font-semibold transition-transform duration-300 group-hover:translate-x-1"
                                style={{ 
                                  color: blog.color,
                                }}
                              >
                                <span>{blog.readTime}</span>
                                <svg
                                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </div>

                            {/* Subtle Glow Effect */}
                            <div
                              className="absolute inset-0 rounded-[30px] pointer-events-none transition-opacity duration-300 group-hover:opacity-40"
                              style={{
                                background: `radial-gradient(circle at 50% 50%, ${blog.color}20 0%, transparent 70%)`,
                                opacity: 0.15,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      
                      {/* Shadow Effect */}
                      <div
                        className="absolute inset-0 rounded-[32px] pointer-events-none z-0 transition-all duration-300 group-hover:shadow-xl"
                        style={{
                          boxShadow: `0 10px 30px rgba(37, 62, 92, 0.1)`,
                        }}
                      />
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>

        {/* Background Decorative Elements - Static for performance */}
        <div
          className="absolute top-0 left-0 w-[900px] h-[900px] bg-gradient-to-br from-primary/15 to-transparent rounded-full blur-2xl -z-10 opacity-30"
        />
        <div
          className="absolute bottom-0 right-0 w-[900px] h-[900px] bg-gradient-to-tl from-[#253E5C]/15 to-transparent rounded-full blur-2xl -z-10 opacity-30"
        />
      </motion.section>

      {/* Contact Info Cards Section */}
      <section ref={contactInfoRef} className="relative py-20 px-6 z-30 bg-white/90">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-[#253E5C] mb-4">
              <span className="bg-gradient-to-r from-[#253E5C] via-primary to-[#ff6b4a] bg-clip-text text-transparent">
                Get In Touch
              </span>
            </h2>
            <p className="text-[#253E5C]/70 text-lg max-w-2xl mx-auto">
              Ready to transform your digital presence? Reach out and let's discuss your next big project.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
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
    </div>
  );
};

export default Blogs;

