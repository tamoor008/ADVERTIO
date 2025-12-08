'use client'

import { useState, Suspense } from 'react'
import dynamic from 'next/dynamic'

// Eagerly loaded components (above the fold)
import HeroSection from '../components/sections/HeroSection'
import ServicesSection from '../components/sections/ServicesSection'
import ProcessBackdrop from '../components/sections/ProcessBackdrop'
import MetricsBar from '../components/sections/MetricsBar'

// Lazy loaded components (below the fold) - using Next.js dynamic imports
const WhyChooseAdvertio = dynamic(() => import('../components/sections/WhyChooseAdvertio'), { ssr: false })
const GetAQuoteSection = dynamic(() => import('../components/sections/GetAQuoteSection'), { ssr: false })
const TeamSection = dynamic(() => import('../components/sections/TeamSection'), { ssr: false })
const BrandCarousel = dynamic(() => import('../components/sections/BrandCarousel'), { ssr: false })
const MockupSection = dynamic(() => import('../components/sections/MockupSection'), { ssr: false })
const ReviewsSection3D = dynamic(() => import('../components/sections/ReviewsSection3D'), { ssr: false })
const VideoSection3D = dynamic(() => import('../components/sections/VideoSection3D'), { ssr: false })
const BlogsSection3D = dynamic(() => import('../components/sections/BlogsSection3D'), { ssr: false })
const FAQSection3D = dynamic(() => import('../components/sections/FAQSection3D'), { ssr: false })
const ContactSection3D = dynamic(() => import('../components/sections/ContactSection3D'), { ssr: false })

// Loading fallback component
const SectionLoader = () => (
  <div className="w-full min-h-[400px] flex items-center justify-center">
    <div className="animate-pulse text-[#253E5C]/40">Loading...</div>
  </div>
)

export default function Home() {
  const [expanded, setExpanded] = useState(false)

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
  )
}

