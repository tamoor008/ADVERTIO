# Advertio - Premium 3D Marketing Agency Website

A fully cinematic, ultra 3D-heavy, high-performance marketing agency website built with React, Three.js, and modern web technologies. This website delivers a AAA-level 3D experience similar to Apple, Awwwards, Cuberto, and other premium design agencies.

## 🚀 Features

- **Ultra Cinematic 3D Hero Scene** - Fullscreen WebGL canvas with interactive 3D objects
- **React Three Fiber** - Advanced 3D scenes with post-processing effects
- **GSAP Animations** - Scroll-triggered animations and 3D storytelling
- **Framer Motion** - Smooth page transitions and UI animations
- **Custom Shaders** - GLSL shaders for noise, distortion, and water effects
- **Premium UI** - Glassmorphism, neon accents, and futuristic design
- **Fully Responsive** - Optimized for all devices with mobile fallbacks
- **Performance Optimized** - Lazy loading, Suspense, and automatic quality adjustments

## 🎨 Brand Colors

- **Primary Neon Accent**: `#E94F37`
- **Dark Tech Blue**: `#253E5C`
- **White**: `#FFFFFF`

## 📦 Tech Stack

- React 18+
- Vite
- Tailwind CSS
- React Router DOM
- Framer Motion
- GSAP + ScrollTrigger
- React Three Fiber (R3F)
- @react-three/drei
- Three.js
- Post-processing effects (Bloom, DOF, Chromatic Aberration)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Advertio-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Preview production build:
```bash
npm run preview
```

## 📁 Project Structure

```
src/
  ├── components/
  │   ├── ui/           # Reusable UI components
  │   ├── layout/       # Layout components (Navbar, Footer, Cursor, Preloader)
  │   ├── 3d/           # 3D scene components
  │   └── sections/     # Page sections
  ├── pages/            # Route pages
  ├── hooks/            # Custom React hooks
  ├── lib/              # Utility functions
  ├── styles/           # Additional styles
  └── assets/
      ├── models/       # GLTF/GLB 3D models
      ├── textures/     # Texture files
      └── shaders/      # GLSL shader files
```

## 🎯 Pages

- **Home** - Ultra cinematic hero scene with 3D orb and interactive elements
- **About** - Team showcase with animated cards
- **Services** - Service grid with hover effects
- **Service Detail** - Individual service pages with scroll-triggered animations
- **Portfolio** - Project showcase grid
- **Contact** - Contact form with glassmorphism UI
- **404** - Lost-in-space 3D scene

## 🎨 Components

### Layout Components
- **Preloader** - Animated loading screen with logo
- **Navbar** - Sticky navigation with smooth transitions
- **Footer** - Site footer with links and branding
- **CustomCursor** - 3D glowing orb cursor effect

### 3D Components
- **HeroScene** - Main 3D scene with animated orb, particles, and post-processing
- Shader materials for noise, distortion, and water effects

## 🎬 Animations

- GSAP ScrollTrigger for scroll-based animations
- Framer Motion for page transitions and UI animations
- Custom 3D camera animations
- Parallax effects
- Hover interactions with magnetic effects

## 🎨 Shaders

- **Noise Shader** - Grain effect for cinematic feel
- **Distortion Shader** - Wave and fluid effects
- **Water Shader** - Animated water surface with fresnel

## ⚡ Performance

- Lazy loading for 3D components
- Suspense boundaries for async loading
- Automatic quality fallback for mobile devices
- Optimized textures and models
- GPU-accelerated animations

## 🔧 Configuration

### Tailwind CSS
Custom colors and theme are configured in `tailwind.config.js`:
- Primary: `#E94F37`
- Dark: `#253E5C`
- White: `#FFFFFF`

### Vite
Build configuration in `vite.config.js` - optimized for React and Three.js.

## 📝 Notes

- Logo file (`favicon.JPG`) is used throughout the site (navbar, favicon, preloader, footer)
- All 3D scenes use React Three Fiber for optimal performance
- Post-processing effects can be toggled for performance
- Mobile devices automatically use lower quality settings

## 🚀 Deployment

Build the project:
```bash
npm run build
```

The `dist/` folder contains the production-ready files that can be deployed to any static hosting service (Vercel, Netlify, etc.).

## 📄 License

This project is proprietary and confidential.

## 👥 Team

Advertio - Premium Marketing Agency

---

Built with ❤️ using React, Three.js, and modern web technologies.
