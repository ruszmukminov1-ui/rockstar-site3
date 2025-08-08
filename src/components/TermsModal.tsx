import React from "react";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#0f0f0f] border border-purple-500/40 rounded-2xl shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 relative animate-slide-up">
        <button
          className="absolute top-4 right-4 text-white text-xl hover:text-red-500 transition"
          onClick={onClose}
        >
          ✖
        </button>
        <h2 className="text-2xl font-bold text-center text-white mb-4">Условия пользования</h2>
        <div className="text-sm text-gray-300 space-y-2">
          <p>1. Используйте клиент на свой страх и риск.</p>
          <p>2. Мы не несем ответственности за ваши действия.</p>
          <p>3. При использовании клиента вы соглашаетесь с нашими условиями.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
