import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useCart } from '@/contexts/CartContext';
import { Percent, Plus } from 'lucide-react-native';
import { haptics } from '@/utils/haptics';

export default function DealsScreen() {
  const router = useRouter();
  const { addItem } = useCart();

  const deals = [
    {
      id: 'deal-1',
      title: 'Combo Meal Deal',
      description: 'Coney Dog + Fries + Drink',
      price: 8.99,
      originalPrice: 12.99,
    },
    {
      id: 'deal-2',
      title: 'Family Pack',
      description: '4 Coney Dogs + 2 Sides',
      price: 24.99,
      originalPrice: 32.99,
    },
    {
      id: 'deal-3',
      title: 'Lunch Special',
      description: 'Any Sandwich + Soup',
      price: 7.99,
      originalPrice: 10.99,
    },
  ];

  const handleAddDeal = (deal: typeof deals[0]) => {
    haptics.medium();
    addItem({
      id: deal.id,
      name: deal.title,
      price: deal.price,
      quantity: 1,
    });
    haptics.success();
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        <View className="flex-row items-center mb-6">
          <Percent color="#DC2626" size={32} />
          <Text className="text-3xl font-bold text-gray-900 ml-3">
            Special Deals
          </Text>
        </View>

        {deals.map((deal) => (
          <View
            key={deal.id}
            className="bg-white rounded-lg border-2 border-primary p-6 mb-4"
          >
            <View className="flex-row justify-between items-start mb-2">
              <View className="flex-1">
                <Text className="text-xl font-bold text-gray-900 mb-1">
                  {deal.title}
                </Text>
                <Text className="text-gray-600 mb-3">{deal.description}</Text>
                <View className="flex-row items-center">
                  <Text className="text-2xl font-bold text-primary">
                    ${deal.price.toFixed(2)}
                  </Text>
                  <Text className="text-lg text-gray-400 line-through ml-3">
                    ${deal.originalPrice.toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => handleAddDeal(deal)}
              className="bg-primary rounded-lg py-3 flex-row items-center justify-center mt-4"
            >
              <Plus color="#FFFFFF" size={20} />
              <Text className="text-white font-bold text-lg ml-2">
                Add to Cart
              </Text>
            </TouchableOpacity>
          </View>
        ))}

        <View className="bg-yellow-50 rounded-lg p-4 mt-4">
          <Text className="text-yellow-900 text-sm">
            💡 Deals are valid for a limited time. Terms and conditions apply.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
