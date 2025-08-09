{!currentUser?.purchasedProducts || currentUser.purchasedProducts.length === 0 ? (
  <div className="text-center py-4">
    <Key size={32} className="mx-auto text-gray-500 mb-2" />
    <p className="text-gray-400">У вас пока нет приобретенных продуктов</p>
  </div>
) : (
  <div className="space-y-3">
    {currentUser.purchasedProducts.map((product, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        className="bg-gray-800/50 border border-purple-500/20 rounded-lg p-3 md:p-4"
      >
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold text-purple-400">{product.title}</h4>
        </div>
        {product.accessKey && (
          <div className="bg-gray-900/50 border border-yellow-500/30 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Ключ:</span>
              <button
                onClick={() => copyToClipboard(product.accessKey!)}
                className={`p-1.5 rounded-md transition-all duration-300 ${
                  copiedKey === product.accessKey
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                }`}
              >
                {copiedKey === product.accessKey ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
            <p className="font-mono text-yellow-300 text-sm mt-2 break-all">
              {product.accessKey}
            </p>
          </div>
        )}
      </motion.div>
    ))}
  </div>
)}
