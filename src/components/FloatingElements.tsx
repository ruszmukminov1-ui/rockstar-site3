import React from 'react';
import { motion } from 'framer-motion';

const FloatingElements: React.FC = () => {
  const floatingElements = [
    // Small particles
    { size: 'w-2 h-2', color: 'bg-purple-500', opacity: 'opacity-30', blur: 'blur-none', delay: 0 },
    { size: 'w-3 h-3', color: 'bg-cyan-400', opacity: 'opacity-25', blur: 'blur-none', delay: 1 },
    { size: 'w-2 h-2', color: 'bg-pink-500', opacity: 'opacity-35', blur: 'blur-none', delay: 2 },
    { size: 'w-4 h-4', color: 'bg-purple-400', opacity: 'opacity-20', blur: 'blur-none', delay: 0.5 },
    { size: 'w-3 h-3', color: 'bg-cyan-300', opacity: 'opacity-30', blur: 'blur-none', delay: 1.5 },
    
    // Medium glowing orbs
    { size: 'w-6 h-6', color: 'bg-purple-500', opacity: 'opacity-20', blur: 'blur-sm', delay: 0.8 },
    { size: 'w-8 h-8', color: 'bg-cyan-400', opacity: 'opacity-15', blur: 'blur-sm', delay: 2.2 },
    { size: 'w-5 h-5', color: 'bg-pink-600', opacity: 'opacity-25', blur: 'blur-sm', delay: 1.8 },
    { size: 'w-7 h-7', color: 'bg-purple-600', opacity: 'opacity-18', blur: 'blur-sm', delay: 3 },
    
    // Large background orbs
    { size: 'w-12 h-12', color: 'bg-purple-500', opacity: 'opacity-10', blur: 'blur-md', delay: 1.2 },
    { size: 'w-16 h-16', color: 'bg-cyan-400', opacity: 'opacity-8', blur: 'blur-lg', delay: 2.8 },
    { size: 'w-10 h-10', color: 'bg-pink-500', opacity: 'opacity-12', blur: 'blur-md', delay: 4 },
    { size: 'w-14 h-14', color: 'bg-purple-400', opacity: 'opacity-9', blur: 'blur-lg', delay: 0.3 },
    
    // Extra large ambient orbs
    { size: 'w-20 h-20', color: 'bg-purple-600', opacity: 'opacity-5', blur: 'blur-xl', delay: 3.5 },
    { size: 'w-24 h-24', color: 'bg-cyan-500', opacity: 'opacity-4', blur: 'blur-2xl', delay: 1.7 },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full ${element.size} ${element.color} ${element.opacity} ${element.blur}`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: element.delay,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingElements;
