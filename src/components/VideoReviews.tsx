import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

const VideoReviews: React.FC = () => {
  const { t } = useApp();
  
  const videos = [
    { id: 'CZtpaGOc25w', title: 'Обзор Rockstar 2.0 - Часть 1' },
    { id: 'NNtnvNJtWxo', title: 'Обзор Rockstar 2.0 - Часть 2' },
    { id: 'XXh3iOaS9DQ', title: 'Обзор Rockstar 2.0 - Часть 3' },
    { id: '7AZocrCKP9c', title: 'Обзор Rockstar 2.0 - Часть 4' },
    { id: 'g-QuRMLJuYU', title: 'Обзор Rockstar 2.0 - Часть 5' }
  ];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isAutoPlay, videos.length]);

  const nextVideo = () => {
    setIsAutoPlay(false);
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    setIsAutoPlay(false);
    setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const currentVideo = videos[currentVideoIndex];

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-gray-900 to-black text-white px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-3 md:mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {t('videos.title')}
        </motion.h2>
        
        <motion.p 
          className="text-center text-gray-400 mb-8 md:mb-12 max-w-2xl mx-auto text-sm md:text-base"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {t('videos.subtitle')}
        </motion.p>

        <div className="relative max-w-4xl mx-auto">
          {/* Main video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="relative aspect-video rounded-xl md:rounded-2xl overflow-hidden bg-gray-900 border border-purple-500/30 shadow-2xl shadow-purple-500/20"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentVideoIndex}
                initial={{ rotateY: 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: -90, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="w-full h-full"
              >
                <iframe
                  src={`https://www.youtube.com/embed/${currentVideo.id}?autoplay=0&mute=1&controls=1&rel=0`}
                  title={currentVideo.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <button
              onClick={prevVideo}
              className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm"
            >
              <ChevronLeft size={20} />
            </button>
            
            <button
              onClick={nextVideo}
              className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm"
            >
              <ChevronRight size={20} />
            </button>

            {/* Current video indicator */}
            <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm rounded-full px-3 md:px-4 py-1 md:py-2">
              <p className="text-white text-xs md:text-sm font-semibold">{currentVideo.title}</p>
            </div>
          </motion.div>

          {/* Navigation dots */}
          <div className="flex justify-center mt-4 md:mt-6 space-x-2">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlay(false);
                  setCurrentVideoIndex(index);
                }}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                  index === currentVideoIndex
                    ? 'bg-purple-500 scale-125 shadow-lg shadow-purple-500/50'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>

          {/* Auto-play toggle */}
          <div className="flex justify-center mt-3 md:mt-4">
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${
                isAutoPlay
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {isAutoPlay ? t('videos.autoOn') : t('videos.autoOff')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoReviews;