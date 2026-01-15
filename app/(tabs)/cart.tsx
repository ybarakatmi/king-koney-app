import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useCart } from '@/contexts/CartContext';
import { Plus, Minus, Trash2 } from 'lucide-react-native';
import { Image as ExpoImage } from 'expo-image';
import { haptics } from '@/utils/haptics';

export default function CartScreen() {
  const router = useRouter();
  const {
    items,
    updateQuantity,
    removeItem,
    subtotal,
    tax,
    deliveryFee,
    cartTotal,
    cartCount,
  } = useCart();

  const handleCheckout = () => {
    if (cartCount === 0) return;
    haptics.medium();
    router.push('/checkout');
  };

  if (cartCount === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-4">
        <Text className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</Text>
        <Text className="text-gray-600 text-center mb-6">
          Add some delicious items from our menu!
        </Text>
        <TouchableOpacity
          onPress={() => {
            haptics.medium();
            router.push('/menu');
          }}
          className="bg-primary rounded-lg px-6 py-3"
        >
          <Text className="text-white font-semibold text-lg">Browse Menu</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <View className="p-4">
          {items.map((item) => (
            <View
              key={item.id}
              className="bg-white rounded-lg border border-gray-200 p-4 mb-4 flex-row"
            >
              {item.image && (
                <ExpoImage
                  source={{ uri: item.image }}
                  style={{ width: 80, height: 80, borderRadius: 8 }}
                  contentFit="cover"
                />
              )}
              <View className="flex-1 ml-4">
                <Text className="text-lg font-semibold text-gray-900 mb-1">
                  {item.name}
                </Text>
                <Text className="text-primary font-bold mb-2">
                  ${item.price.toFixed(2)}
                </Text>
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <TouchableOpacity
                      onPress={() => {
                        haptics.light();
                        updateQuantity(item.id, item.quantity - 1);
                      }}
                      className="bg-gray-100 rounded-full p-1"
                    >
                      <Minus color="#374151" size={18} />
                    </TouchableOpacity>
                    <Text className="mx-4 text-lg font-semibold">
                      {item.quantity}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        haptics.light();
                        updateQuantity(item.id, item.quantity + 1);
                      }}
                      className="bg-gray-100 rounded-full p-1"
                    >
                      <Plus color="#374151" size={18} />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      haptics.medium();
                      removeItem(item.id);
                    }}
                    className="ml-4"
                  >
                    <Trash2 color="#EF4444" size={20} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Checkout Summary */}
      <View className="border-t border-gray-200 p-4 bg-white">
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-600">Subtotal</Text>
          <Text className="text-gray-900 font-semibold">
            ${subtotal.toFixed(2)}
          </Text>
        </View>
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-600">Tax</Text>
          <Text className="text-gray-900 font-semibold">
            ${tax.toFixed(2)}
          </Text>
        </View>
        <View className="flex-row justify-between mb-4">
          <Text className="text-gray-600">Delivery Fee</Text>
          <Text className="text-gray-900 font-semibold">
            ${deliveryFee.toFixed(2)}
          </Text>
        </View>
        <View className="flex-row justify-between mb-4 pb-4 border-b border-gray-200">
          <Text className="text-lg font-bold text-gray-900">Total</Text>
          <Text className="text-lg font-bold text-primary">
            ${cartTotal.toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleCheckout}
          className="bg-primary rounded-lg py-4 items-center"
        >
          <Text className="text-white font-bold text-lg">Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
