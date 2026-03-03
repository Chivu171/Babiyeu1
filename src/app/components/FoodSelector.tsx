import { useState } from 'react';
import { UtensilsCrossed, Mail, Check, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

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

  const categories: Category[] = ['cơm', 'mỳ', 'phở', 'bún', 'trà sữa', 'trà'];

  const filteredItems = foodItems.filter(item => item.category === selectedCategory);

  const toggleItem = (item: FoodItem) => {
    const existing = selectedItems.find(i => i.id === item.id);
    if (existing) {
      setSelectedItems(selectedItems.filter(i => i.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, { ...item, quantity: 1, note: '' }]);
    }
  };

  const updateQuantity = (id: string, delta: number) => {
    setSelectedItems(selectedItems.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const updateNote = (id: string, note: string) => {
    setSelectedItems(selectedItems.map(item =>
      item.id === id ? { ...item, note } : item
    ));
  };

  const handleSendEmail = async () => {
    if (selectedItems.length === 0) {
      alert('Hãy chọn ít nhất một món ăn nhé! 💕');
      return;
    }

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
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white shadow-2xl flex flex-col z-10">
        <div className="p-6 bg-gradient-to-br from-pink-500 via-rose-500 to-purple-600 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <UtensilsCrossed className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Menu Yêu</h1>
          </div>
          <p className="text-pink-100 text-sm italic font-medium">Em muốn ăn gì nào? 💕</p>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-between group ${selectedCategory === category
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md scale-[1.02]'
                : 'bg-gray-50 text-gray-600 hover:bg-pink-50 hover:text-pink-600'
                }`}
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
                  <button onClick={() => toggleItem(item)} className="text-gray-400 hover:text-pink-500 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 bg-white rounded-lg border border-pink-100 p-1">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-pink-50 text-pink-500 transition-colors"
                    >-</button>
                    <span className="w-6 text-center text-sm font-bold text-gray-700">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-pink-50 text-pink-500 transition-colors"
                    >+</button>
                  </div>
                  <span className="text-xs font-medium text-pink-600">Số lượng</span>
                </div>

                <input
                  type="text"
                  placeholder="Thêm ghi chú... (ví dụ: ít cay)"
                  value={item.note}
                  onChange={(e) => updateNote(item.id, e.target.value)}
                  className="w-full text-xs bg-white border border-pink-100 rounded-lg px-2 py-1.5 focus:ring-1 focus:ring-pink-400 outline-none transition-all placeholder:text-gray-300"
                />
              </div>
            ))}
          </div>

          <div className="pt-2">
            <div className="flex justify-between text-sm mb-3 px-1">
              <span className="text-gray-500">Đã chọn:</span>
              <span className="font-bold text-purple-600">{selectedItems.length} món</span>
            </div>
            <button
              onClick={handleSendEmail}
              disabled={selectedItems.length === 0}
              className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl active:scale-95 ${selectedItems.length > 0
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                }`}
            >
              <Mail className="w-5 h-5" />
              Gửi cho anh ngay
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto p-8 bg-[#fafafa]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end gap-3 mb-10">
            <h2 className="text-4xl font-black text-gray-900 capitalize tracking-tight">
              {selectedCategory}
            </h2>
            <div className="h-1 flex-1 bg-gradient-to-r from-pink-200 to-transparent rounded-full mb-2 opacity-50" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => {
              const isSelected = selectedItems.find(i => i.id === item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleItem(item)}
                  className={`group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl cursor-pointer transition-all duration-500 hover:-translate-y-2 ${isSelected ? 'ring-4 ring-pink-500 ring-offset-4 shadow-xl' : ''
                    }`}
                >
                  <div className="relative h-56 overflow-hidden">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {isSelected && (
                      <div className="absolute top-4 right-4 bg-pink-500 text-white rounded-full p-2.5 shadow-lg animate-in zoom-in duration-300">
                        <Check className="w-5 h-5" />
                      </div>
                    )}

                    <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                      <span className="text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Success notification */}
      {showSuccess && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 bg-white border border-green-100 text-green-600 px-8 py-5 rounded-2xl shadow-2xl flex items-center gap-4 z-50 animate-in slide-in-from-top-10 duration-500">
          <div className="bg-green-500 text-white p-2 rounded-full">
            <Check className="w-6 h-6" />
          </div>
          <div>
            <p className="font-bold text-lg leading-tight">Gửi thành công! 💌</p>
            <p className="text-sm text-green-500/70">Đợi anh mua cho cục cưng nha...</p>
          </div>
        </div>
      )}
    </div>
  );
}
