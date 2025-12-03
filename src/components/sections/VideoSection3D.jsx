import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import favicon from '../../assets/favicon.JPG';
import playButton from '../../assets/play-buttons.png';

const VideoSection3D = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1, margin: '-100px' });
  const [playingVideo, setPlayingVideo] = useState(null);

  const videos = [
    { id: 'ke8xYx4itng', title: 'Video 1' },
    { id: 'K6FamnZLa1s', title: 'Video 2' },
    { id: 'FcSn3qobomc', title: 'Video 3' },
    { id: '2J4AiHJnXXM', title: 'Video 4' },
  ];

  // Lock body scroll when modal is open
  useEffect(() => {
    if (playingVideo) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [playingVideo]);

  const handlePlayVideo = (videoId) => {
    setPlayingVideo(videoId);
  };

  const handleCloseVideo = () => {
    setPlayingVideo(null);
  };

  return (
    <motion.section
      ref={sectionRef}
      className="relative z-10 pt-8 pb-32 overflow-visible bg-gradient-to-b from-white/50 via-white/70 to-white/90 w-full"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative z-10 max-w-[1500px] mx-auto px-6 sm:px-8 lg:px-10">
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 relative"
            style={{
              background: 'linear-gradient(135deg, #E94F37 0%, #FF6B4A 25%, #253E5C 50%, #3A5F8F 75%, #E94F37 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Our Work in Motion
          </h2>
          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Experience our creative journey through immersive video content
          </motion.p>
        </motion.div>
      </div>

      <div 
        className="relative"
        style={{
          width: '100vw',
          marginLeft: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <div 
          className="relative w-full border-2 border-gray-300/50 bg-white/50 backdrop-blur-sm p-8 md:p-12 lg:p-16 overflow-hidden" 
          style={{ 
            borderRadius: 0,
            boxShadow: `
              0 0 40px rgba(233, 79, 55, 0.3),
              0 0 80px rgba(233, 79, 55, 0.2),
              0 0 120px rgba(37, 62, 92, 0.2),
              0 0 160px rgba(37, 62, 92, 0.15),
              inset 0 0 60px rgba(233, 79, 55, 0.1),
              inset 0 0 100px rgba(37, 62, 92, 0.05)
            `,
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <img
              src={favicon}
              alt="Background"
              className="w-full h-full max-w-[1400px] max-h-[1400px] object-contain"
              style={{
                filter: 'blur(60px)',
                opacity: 0.4,
              }}
              loading="lazy"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12 relative z-10">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                className="relative cursor-pointer"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { 
                  opacity: 1, 
                  y: 0,
                } : { 
                  opacity: 0, 
                  y: 40,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={() => handlePlayVideo(video.id)}
              >
                <div 
                  className="relative w-full rounded-3xl overflow-hidden bg-gray-900 shadow-2xl"
                  style={{
                    height: '400px',
                    minHeight: '400px',
                  }}
                >
                  <img
                    src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                    <div
                      className="relative"
                      style={{
                        width: '48px',
                        height: '48px',
                      }}
                    >
                      <img
                        src={playButton}
                        alt="Play"
                        className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {playingVideo && (
          <>
            <motion.div
              className="fixed top-0 left-0 right-0 z-[10002] h-24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                pointerEvents: 'none',
              }}
            >
              <div 
                className="absolute top-0 right-0 h-full bg-black"
                style={{
                  width: '70%',
                  pointerEvents: 'auto',
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onMouseDown={(e) => e.preventDefault()}
                onMouseUp={(e) => e.preventDefault()}
              />
            </motion.div>

            <motion.div
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseVideo}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: 'auto',
                touchAction: 'none',
              }}
              onWheel={(e) => e.preventDefault()}
              onTouchMove={(e) => e.preventDefault()}
            >
              <div 
                className="absolute inset-0"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 1,
                  pointerEvents: 'auto',
                }}
                onClick={handleCloseVideo}
              />
              
              <motion.div
                className="relative w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden z-10"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  pointerEvents: 'auto',
                  zIndex: 2,
                }}
              >
                <button
                  onClick={handleCloseVideo}
                  className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-xl font-bold transition-colors backdrop-blur-sm"
                  style={{ pointerEvents: 'auto' }}
                >
                  ×
                </button>

                <iframe
                  src={`https://www.youtube.com/embed/${playingVideo}?autoplay=1&rel=0`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                  style={{ pointerEvents: 'auto' }}
                />
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default VideoSection3D;

