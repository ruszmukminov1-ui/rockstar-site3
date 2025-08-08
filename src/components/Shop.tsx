import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Product } from "../types/Product";
import { Star, Check } from "lucide-react";
import { useApp } from "../context/AppContext";

const Shop: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { t, openOrderModal } = useApp();

  const products: Product[] = [
    {
      id: 1,
      title: "Rockstar Beta",
      price: "3000₽",
      duration: t('shop.forever'),
      features: [
        t('shop.features.beta'),
        t('shop.features.lifetime'),
        t('shop.features.priority'),
        t('shop.features.exclusive')
      ],
      isPopular: true,
    },
    {
      id: 2,
      title: "Rockstar Recode",
      price: "600₽",
      duration: t('shop.forever'),
      features: [
        t('shop.features.recode'),
        t('shop.features.lifetime'),
        t('shop.features.tech'),
        t('shop.features.regular')
      ],
    },
    {
      id: 3,
      title: "Rockstar Recode",
      price: "300₽",
      duration: `3 ${t('shop.months')}`,
      features: [
        t('shop.features.recode'),
        `3 ${t('shop.months')} доступа`,
        t('shop.features.basic'),
        t('shop.features.standard')
      ],
    },
  ];

  return (
    <section id="shop" ref={ref} className="py-12 md:py-20 px-4 text-white bg-gradient-to-b from-black to-gray-900">
      <motion.h2 
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-3 md:mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
      >
        {t('shop.title')}
      </motion.h2>
      
      <motion.p 
        className="text-center text-gray-400 mb-8 md:mb-12 max-w-2xl mx-auto px-4 text-sm md:text-base"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {t('shop.subtitle')}
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`relative border rounded-2xl p-4 md:p-6 backdrop-blur-sm hover:scale-105 transition-all duration-300 ${
              product.isPopular
                ? 'border-purple-500 bg-gradient-to-br from-purple-900/50 to-pink-900/30 shadow-2xl shadow-purple-500/40 hover:shadow-purple-500/60'
                : 'border-gray-700 bg-gradient-to-br from-gray-900/50 to-black/60 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/20'
            }`}
          >
            {product.isPopular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 md:px-4 py-1 rounded-full text-xs md:text-sm font-semibold flex items-center space-x-1 shadow-lg animate-pulse">
                  <Star className="w-3 h-3 md:w-4 md:h-4" />
                  <span>{t('shop.popular')}</span>
                </div>
              </div>
            )}

            <div className="text-center mb-4 md:mb-6">
              <h3 className="text-xl md:text-2xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{product.title}</h3>
              <p className="text-base md:text-lg text-purple-400 font-semibold mb-3 md:mb-4">{product.duration}</p>
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">{product.price}</div>
            </div>

            <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
              {product.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center space-x-2 md:space-x-3">
                  <Check className="w-4 h-4 md:w-5 md:h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-200 font-medium text-sm md:text-base">{feature}</span>
                </li>
              ))}
            </ul>

            <motion.button
              onClick={() => openOrderModal(product)}
              className={`w-full font-semibold py-2.5 md:py-3 rounded-full transition-all duration-300 text-sm md:text-base ${
                product.isPopular
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-xl hover:shadow-purple-500/60 border border-purple-400/50'
                  : 'bg-gradient-to-r from-gray-700 to-gray-600 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-purple-500/40 border border-gray-600 hover:border-purple-400/50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t('shop.buyNow')}
            </motion.button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Shop;