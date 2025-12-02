import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { Suspense } from 'react';

function Floating404() {
  return (
    <>
      <Text
        position={[0, 0, 0]}
        fontSize={2}
        color="#E94F37"
        anchorX="center"
        anchorY="middle"
      >
        404
      </Text>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} color="#E94F37" />
      <OrbitControls autoRotate autoRotateSpeed={1} />
    </>
  );
}

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative bg-white" style={{ backgroundColor: '#FFFFFF', background: '#FFFFFF' }}>
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Suspense fallback={null}>
            <Floating404 />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-9xl font-black mb-6 bg-gradient-to-r from-primary to-[#253E5C] bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-4xl font-bold text-[#253E5C] mb-6">Page Not Found</h2>
          <p className="text-[#253E5C]/80 mb-8 max-w-md mx-auto">
            The page you're looking for seems to have drifted into the void.
          </p>
          <Link
            to="/"
            className="inline-block px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-colors"
          >
            Return Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;

