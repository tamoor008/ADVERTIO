# 3D Models Directory

This directory is for GLTF/GLB 3D model files.

## Placeholder Models

For production, replace placeholder models with your custom 3D assets:

- `hero-orb.glb` - Main hero scene 3D object
- `agency-sculpture.glb` - About page sculpture
- `service-icons/` - Service page 3D icons
- `portfolio-items/` - Portfolio project 3D representations

## Usage

```jsx
import { useGLTF } from '@react-three/drei';

function Model() {
  const { scene } = useGLTF('/models/hero-orb.glb');
  return <primitive object={scene} />;
}
```

## Optimization Tips

- Use compressed GLB format
- Bake lighting into textures
- Keep polygon count reasonable
- Use texture compression (KTX2, Basis)
- Implement LOD (Level of Detail) for complex models

