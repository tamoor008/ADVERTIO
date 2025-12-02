import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Sprinkles({ count = 600, spread = 60 }) {
  const points = useRef();
  const positions = useMemo(() => {
    return new Float32Array(
      Array.from({ length: count * 3 }, () => (Math.random() - 0.5) * spread)
    );
  }, [count, spread]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.03;
      points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.2}
        color="#253E5C"
        transparent
        opacity={0.65}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function SprinklesBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 20], fov: 55 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.2} />
        <Sprinkles />
      </Canvas>
    </div>
  );
}

