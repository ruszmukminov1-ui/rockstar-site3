import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useApp } from '../context/AppContext';

interface HeroProps {
  onBuyClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBuyClick }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { t } = useApp();

  return (
    <section 
      ref={ref}
      className="relative min-h-screen flex items-center justify-center text-center px-4 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-8 h-8 md:w-12 md:h-12 rounded-full bg-purple-500 opacity-20 blur-lg" 
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-3/4 right-1/4 w-12 h-12 md:w-16 md:h-16 rounded-full bg-cyan-400 opacity-15 blur-xl" 
          animate={{
            y: [0, -30, 0],
            rotate: [0, -180, -360],
            opacity: [0.15, 0.3, 0.15]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div 
          className="absolute top-1/2 right-1/3 w-6 h-6 md:w-10 md:h-10 rounded-full bg-purple-400 opacity-25 blur-lg" 
          animate={{
            y: [0, -25, 0],
            rotate: [0, 90, 180],
            opacity: [0.25, 0.5, 0.25]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
      </div>
      
      <div className="container mx-auto max-w-4xl z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-4xl sm:text-6xl md:text-8xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent"
            initial={{ scale: 0.8 }}
            animate={isInView ? { scale: 1 } : { scale: 0.8 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            style={{
              textShadow: '0 0 20px rgba(168, 85, 247, 0.5), 0 0 40px rgba(236, 72, 153, 0.3)'
            }}
          >
            {t('hero.title')}
          </motion.h1>
          
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 text-gray-300 px-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t('hero.subtitle')}
          </motion.p>
          
          <motion.button 
            className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-full text-base md:text-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/50 overflow-hidden group"
            onClick={onBuyClick}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">{t('hero.buyButton')}</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;