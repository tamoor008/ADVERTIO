import { useState, Suspense, lazy } from 'react';
import '../components/sections/sectionStyles.css';

// Eagerly loaded components (above the fold)
import HeroSection from '../components/sections/HeroSection';
import ServicesSection from '../components/sections/ServicesSection';
import ProcessBackdrop from '../components/sections/ProcessBackdrop';
import MetricsBar from '../components/sections/MetricsBar';

// Lazy loaded components (below the fold)
const WhyChooseAdvertio = lazy(() => import('../components/sections/WhyChooseAdvertio'));
const GetAQuoteSection = lazy(() => import('../components/sections/GetAQuoteSection'));
const TeamSection = lazy(() => import('../components/sections/TeamSection'));
const BrandCarousel = lazy(() => import('../components/sections/BrandCarousel'));
const MockupSection = lazy(() => import('../components/sections/MockupSection'));
const ReviewsSection3D = lazy(() => import('../components/sections/ReviewsSection3D'));
const VideoSection3D = lazy(() => import('../components/sections/VideoSection3D'));
const BlogsSection3D = lazy(() => import('../components/sections/BlogsSection3D'));
const FAQSection3D = lazy(() => import('../components/sections/FAQSection3D'));
const ContactSection3D = lazy(() => import('../components/sections/ContactSection3D'));

// Loading fallback component
const SectionLoader = () => (
  <div className="w-full min-h-[400px] flex items-center justify-center">
    <div className="animate-pulse text-[#253E5C]/40">Loading...</div>
  </div>
);

const Home = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {/* Above the fold - eagerly loaded */}
      <HeroSection />
      <ServicesSection expanded={expanded} setExpanded={setExpanded} />
      <ProcessBackdrop />
      <MetricsBar />

      {/* Below the fold - lazy loaded with Suspense */}
      <Suspense fallback={<SectionLoader />}>
        <WhyChooseAdvertio />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <GetAQuoteSection />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <TeamSection />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <BrandCarousel />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <MockupSection />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <ReviewsSection3D />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <VideoSection3D />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <BlogsSection3D />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <FAQSection3D />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <ContactSection3D />
      </Suspense>
    </>
  );
};

export default Home;
