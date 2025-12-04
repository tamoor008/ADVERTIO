import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const BlogsSection3D = () => {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const navigate = useNavigate();

  const blogs = [
    {
      id: 1,
      title: 'The Future of E-commerce and 3D Product Experiences',
      excerpt: 'Discover immersive 3D visualization is revolutionizing online shopping and driving conversion rates through experiences.',
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
      color: '#253E5C',
      tags: ['Performance', 'Analytics', 'Growth'],
    },
    {
      id: 3,
      title: 'AR and Mixed Reality: The Next Frontier in Brand Engagement',
      excerpt: 'Explore how reality filters and experiential AR kits are creating new dimensions customer interaction and brand storytelling.',
      category: 'Technology',
      author: 'Emma Thompson',
      date: 'March 10, 2024',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&q=80',
      color: '#E94F37',
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
      color: '#253E5C',
      tags: ['CRO', 'UX', 'Conversion'],
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative z-10 pt-8 pb-0 md:pb-32 overflow-visible bg-gradient-to-b from-white/50 via-white/70 to-white/90 w-full"
      style={{ minHeight: '900px' }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20 hidden md:block"
            style={{
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
              left: `${(i * 30) % 100}%`,
              top: `${(i * 25) % 100}%`,
              background: `radial-gradient(circle, rgba(233, 79, 55, ${0.15 + i * 0.05}) 0%, transparent 70%)`,
            }}
          />
        ))}
      </div>

      <div className="relative w-[90%] mx-auto">
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-[0.5em] text-[#253E5C]/60 mb-4">
            Insights & Strategies
          </p>
          <h3 className="text-5xl md:text-6xl lg:text-7xl font-black text-[#253E5C] mb-6">
            <span className="bg-gradient-to-r from-[#253E5C] via-primary to-[#ff6b4a] bg-clip-text text-transparent">
              Latest Blogs
            </span>
          </h3>
          <p className="text-[#253E5C]/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Expert insights on e-commerce growth, digital marketing, and cutting-edge technology
          </p>
        </div>

        <div className="relative min-h-[800px] py-8">
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto overflow-y-visible pb-4 md:pb-0 pt-0"
            style={{
              scrollbarColor: '#E94F37 transparent',
              WebkitOverflowScrolling: 'touch',
              minHeight: '800px',
              paddingLeft: '1rem',
              paddingRight: '1rem',
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5 lg:gap-7 items-start" style={{ minHeight: '800px' }}>
              {blogs.map((blog, index) => {
                return (
                  <article
                    key={blog.id}
                    className="relative group flex-shrink-0 w-full mx-auto h-auto"
                    style={{
                      opacity: isInView ? 1 : 0,
                      transform: isInView ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.95)',
                      transition: `opacity 0.5s ease-out ${index * 0.08}s, transform 0.5s ease-out ${index * 0.08}s`,
                    }}
                  >
                    <div
                      className="relative rounded-[32px] transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-[1.02] bg-white border border-[#253E5C]/10 overflow-hidden"
                      style={{
                        position: 'relative',
                        minHeight: '600px',
                        height: 'auto',
                        boxShadow: '0 10px 30px rgba(37, 62, 92, 0.1)',
                      }}
                    >
                      <div className="relative w-full h-56 overflow-hidden">
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                        
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

                      <div 
                        className="relative z-10 p-6 md:p-8 flex flex-col bg-white"
                        style={{
                          minHeight: 'fit-content',
                        }}
                      >
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

                        <div className="flex flex-col flex-grow min-h-0">
                          <h3
                            className="text-xl md:text-2xl font-black mb-3 leading-tight transition-colors duration-300 group-hover:text-[#253E5C]"
                            style={{
                              color: blog.color,
                            }}
                          >
                            {blog.title}
                          </h3>

                          <p className="text-sm md:text-base leading-relaxed text-[#253E5C]/70 transition-colors duration-300 group-hover:text-[#253E5C]">
                            {blog.excerpt}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div
            className="flex justify-center -mt-20 mb-0 md:mb-8"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.8s ease-out 0.5s, transform 0.8s ease-out 0.5s',
            }}
          >
            <button
              type="button"
              onClick={() => navigate('/blogs')}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-semibold tracking-wide text-white shadow-lg shadow-black/10 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
              style={{ 
                background: 'linear-gradient(135deg, #253E5C, #E94F37)',
              }}
            >
              <span>See all blogs</span>
              <span className="text-xl leading-none">→</span>
            </button>
          </div>

          <div
            className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block pointer-events-none opacity-40"
          >
            <svg className="w-8 h-8 text-[#253E5C]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/15 to-transparent rounded-full blur-3xl -z-10 hidden md:block opacity-30" />
      <div className="absolute bottom-0 right-0 w-[900px] h-[900px] bg-gradient-to-tl from-[#253E5C]/15 to-transparent rounded-full blur-3xl -z-10 hidden md:block opacity-30" />
    </section>
  );
};

export default BlogsSection3D;

