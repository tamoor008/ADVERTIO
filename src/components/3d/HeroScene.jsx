import { Suspense, useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import { EffectComposer, Bloom, DepthOfField, ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';

function AnimatedOrb({ scale = 1, paused = false }) {
  const meshRef = useRef();
  const shaderMaterialRef = useRef();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color('#E94F37') },
      uColor2: { value: new THREE.Color('#253E5C') },
    }),
    []
  );

  useFrame((state) => {
    if (paused) return;
    
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
    if (shaderMaterialRef.current) {
      shaderMaterialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  const vertexShader = `
    varying vec3 vPosition;
    varying vec3 vNormal;
    
    void main() {
      vPosition = position;
      vNormal = normal;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    varying vec3 vPosition;
    varying vec3 vNormal;
    
    void main() {
      vec3 normal = normalize(vNormal);
      float fresnel = pow(1.0 - dot(normal, vec3(0.0, 0.0, 1.0)), 2.0);
      float wave = sin(vPosition.y * 3.0 + uTime * 2.0) * 0.5 + 0.5;
      vec3 color = mix(uColor1, uColor2, wave);
      gl_FragColor = vec4(color, fresnel * 0.8 + 0.2);
    }
  `;

  return (
    <mesh ref={meshRef} scale={scale}>
      <icosahedronGeometry args={[3.8, 3]} />
      <shaderMaterial
        ref={shaderMaterialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function FloatingParticles({ count = 100, paused = false }) {
  const particles = useRef();
  const positions = useMemo(() => {
    return new Float32Array(
      Array.from({ length: count * 3 }, () => (Math.random() - 0.5) * 20)
    );
  }, [count]);

  useFrame((state) => {
    if (paused || !particles.current) return;
    particles.current.rotation.y = state.clock.elapsedTime * 0.1;
  });

  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#253E5C"
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function HeroScene({ className = '' }) {
  const [paused, setPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile devices
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Pause animations when tab is not visible
    const handleVisibilityChange = () => {
      setPaused(document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Pause on blur (when window loses focus)
    const handleBlur = () => setPaused(true);
    const handleFocus = () => setPaused(false);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('resize', checkMobile);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  // Reduce particle count on mobile
  const particleCount = isMobile ? 50 : 200;
  const enablePostProcessing = !isMobile;

  return (
    <div className={`w-full h-full ${className}`} style={{ overflow: 'visible' }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ 
          antialias: !isMobile, 
          alpha: true,
          powerPreference: isMobile ? 'low-power' : 'high-performance'
        }}
        style={{ overflow: 'visible' }}
        frameloop={paused ? 'never' : 'always'}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#E94F37" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#253E5C" />
          
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <AnimatedOrb scale={1.3} paused={paused} />
          </Float>

          <FloatingParticles count={particleCount} paused={paused} />
          
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />

          {enablePostProcessing && (
            <EffectComposer>
              <Bloom intensity={1.5} luminanceThreshold={0.9} />
              <DepthOfField focusDistance={0.1} focalLength={0.02} bokehScale={2} height={480} />
              <ChromaticAberration offset={[0.001, 0.001]} />
            </EffectComposer>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}

