import React from 'react';
import { X } from 'lucide-react';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PurchaseModal: React.FC<PurchaseModalProps> = ({ isOpen, onClose }) => {
  const [selectedProduct, setSelectedProduct] = React.useState('recode-forever');
  
  const products = [
    { id: 'beta', name: 'Rockstar Beta (Навсегда)', price: 3000 },
    { id: 'recode-forever', name: 'Rockstar Recode (Навсегда)', price: 600 },
    { id: 'recode-3months', name: 'Rockstar Recode (3 месяца)', price: 300 }
  ];
  
  const currentProduct = products.find(p => p.id === selectedProduct) || products[1];

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Заказ оформлен! Вы будете перенаправлены на страницу оплаты.');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-gray-900 rounded-lg neon-box p-8 max-w-md w-full mx-4 transform transition-all duration-500 animate-slideInFromBottom hover:scale-105">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">Оформление заказа</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 hover:rotate-90">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handlePurchase}>
          <div className="mb-6">
            <label htmlFor="product-select" className="block mb-2">Выберите товар</label>
            <select 
              id="product-select"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 hover:border-purple-400 focus:scale-105"
            >
              {products.map(product => (
                <option key={product.id} value={product.id}>
                  {product.name} - {product.price}₽
                </option>
              ))}
            </select>
          </div>
          
        <div className="mb-6 transform transition-all duration-300 hover:scale-105">
          <div className="flex justify-between mb-2">
            <span>{currentProduct.name}</span>
            <span className="font-bold">{currentProduct.price}₽</span>
          </div>
          <div className="border-t border-gray-700 my-2"></div>
          <div className="flex justify-between font-bold text-lg">
            <span>Итого</span>
            <span className="text-purple-400">{currentProduct.price}₽</span>
          </div>
        </div>
        
          <div className="mb-6">
            <label htmlFor="payment-method" className="block mb-2">Способ оплаты</label>
            <select 
              id="payment-method" 
              className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 hover:border-purple-400 focus:scale-105"
              required
            >
              <option value="">Выберите способ оплаты</option>
              <option value="card">Банковская карта</option>
              <option value="qiwi">QIWI</option>
              <option value="yandex">Яндекс.Деньги</option>
              <option value="webmoney">WebMoney</option>
            </select>
          </div>
          
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2">Email для получения лицензии</label>
            <input 
              type="email" 
              id="email" 
              className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 hover:border-purple-400 focus:scale-105"
              required
            />
          </div>
          
          <button 
            type="submit"
            className="w-full neon-button bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 hover:shadow-green-500/50 hover:scale-105 transform"
          >
            Оплатить {currentProduct.price}₽
          </button>
        </form>
      </div>
    </div>
  );
};

export default PurchaseModal;