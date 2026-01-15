import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useCart } from '@/contexts/CartContext';
import { Plus } from 'lucide-react-native';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Image as ExpoImage } from 'expo-image';
import { haptics } from '@/utils/haptics';

interface MenuItem {
  id: string;
  name?: string;
  item_name?: string; // Support both column names
  description?: string;
  price: number;
  image_url?: string;
  category: string;
}

export default function MenuScreen() {
  const router = useRouter();
  const { addItem } = useCart();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMenu();
  }, []);

  const loadMenu = async () => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .order('category', { ascending: true })
        .order('item_name', { ascending: true })
        .order('name', { ascending: true });

      if (error) throw error;

      if (data) {
        // Map item_name to name if needed for compatibility
        const mappedData = data.map((item: any) => ({
          ...item,
          name: item.name || item.item_name || 'Unnamed Item',
        }));
        setMenuItems(mappedData);
        const uniqueCategories = ['All', ...Array.from(new Set(mappedData.map((item) => item.category)))];
        setCategories(uniqueCategories);
      }
    } catch (error) {
      console.error('Error loading menu:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (item: MenuItem) => {
    haptics.medium();
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image_url,
    });
    haptics.success();
  };

  const filteredItems = selectedCategory === 'All'
    ? menuItems
    : menuItems.filter((item) => item.category === selectedCategory);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-gray-500">Loading menu...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      {/* Category Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="border-b border-gray-200"
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => {
              haptics.selection();
              setSelectedCategory(category);
            }}
            className={`px-4 py-2 rounded-full mr-2 ${
              selectedCategory === category
                ? 'bg-primary'
                : 'bg-gray-100'
            }`}
          >
            <Text
              className={`font-medium ${
                selectedCategory === category
                  ? 'text-white'
                  : 'text-gray-700'
              }`}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Menu Items */}
      <ScrollView className="flex-1">
        <View className="p-4">
          {filteredItems.map((item) => (
            <View
              key={item.id}
              className="bg-white rounded-lg border border-gray-200 p-4 mb-4 flex-row"
            >
              {item.image_url && (
                <ExpoImage
                  source={{ uri: item.image_url }}
                  style={{ width: 100, height: 100, borderRadius: 8 }}
                  contentFit="cover"
                />
              )}
              <View className="flex-1 ml-4">
                <Text className="text-lg font-semibold text-gray-900 mb-1">
                  {item.name}
                </Text>
                {item.description && (
                  <Text className="text-sm text-gray-600 mb-2">
                    {item.description}
                  </Text>
                )}
                <View className="flex-row items-center justify-between mt-auto">
                  <Text className="text-lg font-bold text-primary">
                    ${item.price.toFixed(2)}
                  </Text>
                  <TouchableOpacity
                    onPress={() => handleAddToCart(item)}
                    className="bg-primary rounded-full p-2"
                  >
                    <Plus color="#FFFFFF" size={20} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
