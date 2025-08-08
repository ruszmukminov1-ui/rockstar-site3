import React from 'react';
import { MessageCircle, Send, Mail, X } from 'lucide-react';

interface SupportProps {
  isOpen: boolean;
  onClose: () => void;
}

const Support: React.FC<SupportProps> = ({ isOpen, onClose }) => {
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-gray-900 rounded-lg neon-box p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto transform transition-all duration-500 animate-slideInFromBottom hover:scale-105">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">Поддержка</h3>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 hover:rotate-90"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="transform transition-all duration-500 animate-slideInFromLeft">
            <h4 className="text-xl font-bold mb-6">Свяжитесь с нами</h4>
            
            {isSubmitted && (
              <div className="mb-6 p-4 bg-green-900 border border-green-500 rounded-lg animate-slideInFromTop">
                <p className="text-green-300">✅ Сообщение отправлено! Мы свяжемся с вами в ближайшее время.</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="support-email" className="block mb-2">Ваш email</label>
                <input 
                  type="email" 
                  id="support-email" 
                  className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 hover:border-purple-400 focus:scale-105"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="support-message" className="block mb-2">Сообщение</label>
                <textarea 
                  id="support-message" 
                  rows={4} 
                  className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 hover:border-purple-400 focus:scale-105 resize-none"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="w-full neon-button bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 hover:shadow-purple-500/50 hover:scale-105 transform"
              >
                Отправить
              </button>
            </form>
          </div>
          
          <div className="transform transition-all duration-500 animate-slideInFromRight">
            <h4 className="text-xl font-bold mb-6">Наши контакты</h4>
            <div className="space-y-6">
              <div className="flex items-center transform transition-all duration-300 hover:scale-105 hover:translate-x-2">
                <div className="bg-purple-600 p-3 rounded-full mr-4 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50">
                  <MessageCircle className="text-xl" />
                </div>
                <div>
                  <h4 className="font-bold">Discord</h4>
                  <p className="text-gray-300">discord.gg/rockstar</p>
                </div>
              </div>
              
              <div className="flex items-center transform transition-all duration-300 hover:scale-105 hover:translate-x-2">
                <div className="bg-blue-500 p-3 rounded-full mr-4 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50">
                  <Send className="text-xl" />
                </div>
                <div>
                  <h4 className="font-bold">Telegram</h4>
                  <p className="text-gray-300">@rockstar_support</p>
                </div>
              </div>
              
              <div className="flex items-center transform transition-all duration-300 hover:scale-105 hover:translate-x-2">
                <div className="bg-red-500 p-3 rounded-full mr-4 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50">
                  <Mail className="text-xl" />
                </div>
                <div>
                  <h4 className="font-bold">Email</h4>
                  <p className="text-gray-300">support@rockstar-client.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;