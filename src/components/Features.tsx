import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Zap, Shield, Clock, Headphones } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { t } = useApp();

  const features = [
    {
      icon: Zap,
      title: t('features.instant.title'),
      description: t('features.instant.desc'),
    },
    {
      icon: Headphones,
      title: t('features.support.title'),
      description: t('features.support.desc'),
    },
    {
      icon: Shield,
      title: t('features.security.title'),
      description: t('features.security.desc'),
    },
    {
      icon: Clock,
      title: t('features.ease.title'),
      description: t('features.ease.desc'),
    },
  ];

  return (
    <section ref={ref} className="relative py-12 md:py-20 bg-black text-white px-4 md:px-10 lg:px-20">
      {/* Background overlay for readability */}
      <div className="absolute inset-0 bg-gray-900/30 backdrop-blur-sm" />
      
      <div className="relative z-10">
        <motion.h2 
          className="text-2xl sm:text-3xl md:text-5xl font-bold text-center mb-8 md:mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          {t('features.title')}
        </motion.h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group p-4 md:p-6 rounded-xl border border-purple-600/30 bg-gradient-to-b from-purple-900/40 to-black/60 shadow-md backdrop-blur-md hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 hover:border-purple-400/60 transition-all duration-500"
              >
                <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto">
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-purple-400 group-hover:text-purple-300 transition-colors text-center">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-gray-300 group-hover:text-gray-200 transition-colors text-center leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}