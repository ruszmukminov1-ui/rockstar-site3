import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { X, MessageCircle, Send, Mail } from "lucide-react";
import { useApp } from "../context/AppContext";

const SupportModal: React.FC = () => {
  const { isSupportOpen, closeSupportModal, t } = useApp();
  const form = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!form.current) return;

    emailjs
      .sendForm(
        "service_5ruo6wh",
        "template_a9f4xqi", 
        form.current,
        "yUxe3xhvCjrNB-QNh"
      )
      .then(
        () => {
          setSent(true);
          setIsLoading(false);
          setTimeout(() => {
            setSent(false);
            closeSupportModal();
          }, 3000);
          form.current?.reset();
        },
        (error) => {
          console.error(error.text);
          setIsLoading(false);
        }
      );
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSupportModal();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [closeSupportModal]);

  if (!isSupportOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={closeSupportModal}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-sm md:max-w-4xl bg-gray-900/95 backdrop-blur-md border border-purple-500/50 rounded-2xl shadow-2xl shadow-purple-500/25 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeSupportModal}
          className="absolute top-3 right-3 md:top-4 md:right-4 z-10 text-gray-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left side - Contact form */}
          <div className="p-6 md:p-8">
            <div className="text-center mb-6 md:mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mb-3 md:mb-4"
              >
                <MessageCircle className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </motion.div>
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {t('support.title')}
              </h2>
              <p className="text-gray-400 mt-2 text-sm md:text-base">
                {t('support.subtitle')}
              </p>
            </div>

            {sent ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-6 md:py-8"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Send className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-green-400 mb-2">{t('notification.messageSent')}</h3>
              </motion.div>
            ) : (
              <form ref={form} onSubmit={sendEmail} className="space-y-3 md:space-y-4">
                <div>
                  <input
                    type="text"
                    name="user_name"
                    placeholder={t('support.name')}
                    required
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-gray-800/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm md:text-base"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="user_email"
                    placeholder={t('support.email')}
                    required
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-gray-800/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm md:text-base"
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder={t('support.message')}
                    required
                    rows={4}
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-gray-800/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none text-sm md:text-base"
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 md:py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/25 text-sm md:text-base"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>{t('support.sending')}</span>
                    </div>
                  ) : (
                    t('support.send')
                  )}
                </motion.button>
              </form>
            )}
          </div>

          {/* Right side - Contact info */}
          <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/20 p-6 md:p-8 flex flex-col justify-center">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-8">{t('support.contacts')}</h3>
            
            <div className="space-y-4 md:space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <div className="bg-purple-600 p-2 md:p-3 rounded-full">
                  <MessageCircle className="w-4 h-4 md:w-6 md:h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm md:text-base">Discord</h4>
                  <p className="text-gray-300 text-xs md:text-sm">discord.gg/rockstar</p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <div className="bg-blue-500 p-2 md:p-3 rounded-full">
                  <Send className="w-4 h-4 md:w-6 md:h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm md:text-base">Telegram</h4>
                  <p className="text-gray-300 text-xs md:text-sm">@rockstar_support</p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <div className="bg-red-500 p-2 md:p-3 rounded-full">
                  <Mail className="w-4 h-4 md:w-6 md:h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm md:text-base">Email</h4>
                  <p className="text-gray-300 text-xs md:text-sm">support@rockstar-client.com</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SupportModal;