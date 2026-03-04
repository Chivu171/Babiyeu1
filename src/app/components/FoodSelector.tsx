import { useState } from 'react';
import { UtensilsCrossed, Mail, Check, X, Menu, ShoppingCart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion, AnimatePresence } from 'framer-motion';

type Category = 'cơm' | 'mỳ' | 'phở' | 'bún' | 'trà sữa' | 'trà';

interface FoodItem {
  id: string;
  name: string;
  category: Category;
  image: string;
  description: string;
}

interface SelectedFoodItem extends FoodItem {
  quantity: number;
  note: string;
}

const foodItems: FoodItem[] = [
  // Cơm
  { id: '1', name: 'Cơm tấm', category: 'cơm', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=1000', description: 'Cơm tấm sườn bì chả thơm ngon' },
  { id: '2', name: 'Cơm rang dưa bò', category: 'cơm', image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=1000', description: 'Cơm rang giòn cùng dưa chua và thịt bò' },
  { id: '3', name: 'Cơm trộn Hàn Quốc', category: 'cơm', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=1000', description: 'Bibimbap đầy đủ topping' },

  // Mỳ
  { id: '4', name: 'Mỳ cay', category: 'mỳ', image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=1000', description: 'Mỳ cay thơm nồng' },
  { id: '5', name: 'Mỳ vằn thắn', category: 'mỳ', image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&q=80&w=1000', description: 'Mỳ vằn thắn sủi cảo nóng hổi' },
  { id: '6', name: 'Mỳ xào', category: 'mỳ', image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=1000', description: 'Mỳ xào thịt bò và rau cải' },

  // Phở
  { id: '7', name: 'Phở bò', category: 'phở', image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&q=80&w=1000', description: 'Phở bò tái nạm bắp' },
  { id: '8', name: 'Phở gà', category: 'phở', image: 'https://images.unsplash.com/photo-1636474498689-27e2d3ecf8d7?auto=format&fit=crop&q=80&w=1000', description: 'Phở gà nước dùng thanh ngọt' },
  { id: '9', name: 'Phở gà trộn', category: 'phở', image: 'https://images.unsplash.com/photo-1662116037747-06f157118413?auto=format&fit=crop&q=80&w=1000', description: 'Phở gà trộn sốt đậm đà' },

  // Bún
  { id: '10', name: 'Bún chả', category: 'bún', image: 'https://plus.unsplash.com/premium_photo-1671013032586-3f9540078572?auto=format&fit=crop&q=80&w=1000', description: 'Bún chả nướng than thơm phức' },
  { id: '11', name: 'Bún bò Huế', category: 'bún', image: 'https://images.unsplash.com/photo-1624300629298-e9de39c13be5?auto=format&fit=crop&q=80&w=1000', description: 'Bún bò Huế chuẩn vị' },
  { id: '12', name: 'Bún riêu', category: 'bún', image: 'https://images.unsplash.com/photo-1745817078506-bfc70df458b5?auto=format&fit=crop&q=80&w=1000', description: 'Bún riêu cua đồng' },

  // Trà sữa
  { id: '13', name: 'FEIN: Matcha Latte/ Matcha Coldwhisk', category: 'trà sữa', image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&q=80&w=1000', description: 'Ngọt bình thường, takeaway để đá riêng' },
  { id: '14', name: 'FeelingTea: Trà sữa', category: 'trà sữa', image: 'https://images.unsplash.com/photo-1544467328-9419139ca730?auto=format&fit=crop&q=80&w=1000', description: 'Hồng trà sữa/Xanh nhài (30 đường) + 100 đá + trân châu đen' },
  { id: '15', name: 'FeelingTea: Ô long sữa', category: 'trà sữa', image: 'https://plus.unsplash.com/premium_photo-1663953496095-ba37d377b5ce?auto=format&fit=crop&q=80&w=1000', description: '50 đường + 100 đá + trân châu đen' },
  { id: '16', name: 'Phê La: Ô long sữa', category: 'trà sữa', image: 'https://images.unsplash.com/photo-1571153164104-a6336e7a6857?auto=format&fit=crop&q=80&w=1000', description: '30 đường, 100 đá (đá riêng nếu takeaway), TĂNG TRÀ + trân châu ô long/gạo rang' },

  // Trà
  { id: '17', name: 'Trà đào', category: 'trà', image: 'https://images.unsplash.com/photo-1601390395693-364c0e22031a?auto=format&fit=crop&q=80&w=1000', description: 'Thơm mát ngọt ngào' },
];

export function FoodSelector() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('cơm');
  const [selectedItems, setSelectedItems] = useState<SelectedFoodItem[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const categories: Category[] = ['cơm', 'mỳ', 'phở', 'bún', 'trà sữa', 'trà'];

  const filteredItems = foodItems.filter(item => item.category === selectedCategory);

  const toggleItem = (item: FoodItem) => {
    if (isLoading) return;
    const existing = selectedItems.find(i => i.id === item.id);
    if (existing) {
      setSelectedItems(selectedItems.filter(i => i.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, { ...item, quantity: 1, note: '' }]);
    }
  };

  const updateQuantity = (id: string, delta: number) => {
    if (isLoading) return;
    setSelectedItems(selectedItems.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const updateNote = (id: string, note: string) => {
    if (isLoading) return;
    setSelectedItems(selectedItems.map(item =>
      item.id === id ? { ...item, note } : item
    ));
  };

  const handleSendEmail = async () => {
    if (selectedItems.length === 0 || isLoading) {
      if (selectedItems.length === 0) alert('Hãy chọn ít nhất một món ăn nhé! 💕');
      return;
    }

    setIsLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://babiyeu-be.fly.dev';
      const response = await fetch(`${apiUrl}/api/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: selectedItems,
          senderEmail: 'Em bé của anh',
        }),
      });

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setSelectedItems([]);
        }, 3000);
      } else {
        alert('Gửi mail thất bại, hãy kiểm tra server nhé! ❌');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Có lỗi xảy ra khi kết nối tới server! ❌');
    } finally {
      setIsLoading(false);
    }
  };

  const SidebarContent = () => (
    <>
      <div className="p-6 bg-gradient-to-br from-pink-500 via-rose-500 to-purple-600 text-white shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <UtensilsCrossed className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Menu Yêu</h1>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            disabled={isLoading}
            className="lg:hidden p-2 hover:bg-white/10 rounded-full transition-colors disabled:opacity-50"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <p className="text-pink-100 text-sm italic font-medium">Em muốn ăn gì nào? 💕</p>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
        {categories.map((category) => (
          <button
            key={category}
            disabled={isLoading}
            onClick={() => {
              setSelectedCategory(category);
              if (window.innerWidth < 1024) {
                // Keep sidebar open if user is selecting categories on mobile
                // or close it if you want, but usually it's better to keep it open
                // until they choose to close it or finish ordering.
                // Let's NOT close it here to allow multiple category browsing.
              }
            }}
            className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-between group ${selectedCategory === category
              ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md scale-[1.02]'
              : 'bg-gray-50 text-gray-600 hover:bg-pink-50 hover:text-pink-600'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <span className="capitalize">{category}</span>
            <div className={`w-2 h-2 rounded-full transition-all ${selectedCategory === category ? 'bg-white scale-125' : 'bg-transparent group-hover:bg-pink-300'}`} />
          </button>
        ))}
      </nav>

      {/* Selected items summary */}
      <div className="p-4 border-t bg-white space-y-4">
        <div className="max-h-60 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
          {selectedItems.map((item) => (
            <div key={item.id} className="bg-pink-50/50 rounded-xl p-3 border border-pink-100 space-y-2">
              <div className="flex justify-between items-start">
                <span className="font-bold text-gray-800 text-sm line-clamp-1">{item.name}</span>
                <button
                  onClick={() => toggleItem(item)}
                  disabled={isLoading}
                  className="text-gray-400 hover:text-pink-500 transition-colors disabled:opacity-50"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 bg-white rounded-lg border border-pink-100 p-1">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    disabled={isLoading}
                    className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-pink-50 text-pink-500 transition-colors disabled:opacity-50"
                  >-</button>
                  <span className="w-6 text-center text-sm font-bold text-gray-700">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    disabled={isLoading}
                    className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-pink-50 text-pink-500 transition-colors disabled:opacity-50"
                  >+</button>
                </div>
                <span className="text-xs font-medium text-pink-600">Số lượng</span>
              </div>

              <input
                type="text"
                disabled={isLoading}
                placeholder="Thêm ghi chú..."
                value={item.note}
                onChange={(e) => updateNote(item.id, e.target.value)}
                className="w-full text-xs bg-white border border-pink-100 rounded-lg px-2 py-1.5 focus:ring-1 focus:ring-pink-400 outline-none transition-all placeholder:text-gray-300 disabled:bg-gray-50"
              />
            </div>
          ))}
          {selectedItems.length === 0 && (
            <div className="py-8 text-center">
              <div className="bg-pink-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <ShoppingCart className="w-6 h-6 text-pink-300" />
              </div>
              <p className="text-xs text-gray-400 italic">Chưa chọn món nào hết trơn... 🥺</p>
            </div>
          )}
        </div>

        <div className="pt-2">
          <div className="flex justify-between text-sm mb-3 px-1">
            <span className="text-gray-500">Đã chọn:</span>
            <span className="font-bold text-purple-600">{selectedItems.length} món</span>
          </div>
          <button
            onClick={handleSendEmail}
            disabled={selectedItems.length === 0 || isLoading}
            className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl active:scale-95 ${selectedItems.length > 0 && !isLoading
              ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
              }`}
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              />
            ) : (
              <Mail className="w-5 h-5" />
            )}
            {isLoading ? 'Đang gửi...' : 'Gửi cho anh ngay'}
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !isLoading && setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar (Desktop) & Drawer (Mobile) */}
      <motion.aside
        className={`fixed inset-y-0 left-0 w-80 bg-white shadow-2xl flex flex-col z-50 lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out lg:shadow-none lg:border-r`}
      >
        <SidebarContent />
      </motion.aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-30">
          <button
            onClick={() => setIsSidebarOpen(true)}
            disabled={isLoading}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>

          <div className="flex items-center gap-2">
            <UtensilsCrossed className="w-5 h-5 text-pink-500" />
            <span className="font-bold text-lg text-gray-800">Babiyêu</span>
          </div>

          <div className="relative">
            <button
              onClick={() => setIsSidebarOpen(true)}
              disabled={isLoading}
              className="p-2 -mr-2 hover:bg-gray-100 rounded-lg transition-colors relative disabled:opacity-50"
            >
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              {selectedItems.length > 0 && (
                <span className="absolute top-1 right-1 bg-pink-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {selectedItems.length}
                </span>
              )}
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10 bg-[#fafafa]">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end gap-3 mb-6 lg:mb-10">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 capitalize tracking-tight">
                {selectedCategory}
              </h2>
              <div className="h-1 flex-1 bg-gradient-to-r from-pink-200 to-transparent rounded-full mb-2 opacity-50" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredItems.map((item) => {
                const isSelected = selectedItems.find(i => i.id === item.id);
                return (
                  <motion.div
                    layout
                    key={item.id}
                    onClick={() => toggleItem(item)}
                    whileTap={isLoading ? {} : { scale: 0.98 }}
                    className={`group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl cursor-pointer transition-all duration-300 ${isSelected ? 'ring-4 ring-pink-500 ring-offset-2 lg:ring-offset-4 shadow-xl' : 'hover:-translate-y-1'
                      } ${isLoading ? 'opacity-70 grayscale-[0.2]' : ''}`}
                  >
                    <div className="relative h-48 sm:h-56 overflow-hidden">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {!isLoading && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      )}

                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0, rotate: -45 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 45 }}
                            className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-pink-500 text-white rounded-full p-2 shadow-lg z-10"
                          >
                            <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 hidden sm:block">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 sm:p-6">
                      <h3 className="font-bold text-lg sm:text-xl text-gray-900 mb-1 sm:mb-2 group-hover:text-pink-600 transition-colors line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </main>
      </div>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/80 backdrop-blur-md z-[200] flex flex-col items-center justify-center p-6 text-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut"
              }}
              className="relative mb-8"
            >
              <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center">
                <UtensilsCrossed className="w-12 h-12 text-pink-500" />
              </div>
              <motion.div
                animate={{ y: [0, -10, 0], opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}
                className="absolute -top-4 -right-2 text-pink-400"
              >
                ❤️
              </motion.div>
              <motion.div
                animate={{ y: [0, -15, 0], opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, delay: 0.2 }}
                className="absolute -top-2 -left-4 text-pink-300"
              >
                💖
              </motion.div>
            </motion.div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">Đang gửi menu cho anh...</h2>
            <p className="text-pink-500 font-medium animate-pulse">Đợi em một chút xíu thôi nhé! 💕</p>

            <div className="mt-8 w-48 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                animate={{ x: [-200, 200] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="w-1/2 h-full bg-gradient-to-r from-pink-500 to-purple-600"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ y: -100, x: '-50%', opacity: 0 }}
            animate={{ y: 0, x: '-50%', opacity: 1 }}
            exit={{ y: -100, x: '-50%', opacity: 0 }}
            className="fixed top-4 sm:top-8 left-1/2 bg-white border border-green-100 text-green-600 px-6 sm:px-8 py-4 sm:py-5 rounded-2xl shadow-2xl flex items-center gap-4 z-[210] w-[90%] sm:w-auto"
          >
            <div className="bg-green-500 text-white p-2 rounded-full shrink-0">
              <Check className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <p className="font-bold text-base sm:text-lg leading-tight">Gửi thành công! 💌</p>
              <p className="text-xs sm:text-sm text-green-500/70">Đợi anh mua cho cục cưng nha...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
