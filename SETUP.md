# Quick Setup Guide

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

## Build

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Project Structure

- **Pages**: All route pages in `src/pages/`
- **Components**: Reusable components in `src/components/`
- **3D Scenes**: 3D components in `src/components/3d/`
- **Shaders**: GLSL shader files in `src/assets/shaders/`
- **Models**: Placeholder for GLB/GLTF models in `src/assets/models/`

## Key Features Implemented

✅ Ultra cinematic 3D hero scene with animated orb
✅ Custom 3D glowing cursor
✅ Smooth page transitions with Framer Motion
✅ GSAP ScrollTrigger animations
✅ Post-processing effects (Bloom, DOF, Chromatic Aberration)
✅ GLSL shaders (noise, distortion, water)
✅ Fully responsive design
✅ Brand colors integrated throughout
✅ Logo integrated in navbar, preloader, and footer

## Performance Notes

- Large bundle size warning is expected due to Three.js and R3F
- Consider code splitting for production optimization
- 3D scenes are lazy-loaded with Suspense
- Mobile devices automatically use lower quality settings

## Next Steps

1. Add custom GLB models to `src/assets/models/`
2. Replace placeholder content with real data
3. Optimize bundle size with dynamic imports
4. Add more 3D scenes to other pages
5. Implement additional shader effects

