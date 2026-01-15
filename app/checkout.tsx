import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/hooks/useAuth';
import { useStripePayment } from '@/hooks/useStripePayment';
import { CreditCard, MapPin } from 'lucide-react-native';
import { useState } from 'react';
import { haptics } from '@/utils/haptics';
import { supabase } from '@/lib/supabase';

export default function CheckoutScreen() {
  const router = useRouter();
  const { items, cartTotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { handlePayment } = useStripePayment();
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async () => {
    if (!isAuthenticated) {
      Alert.alert('Sign In Required', 'Please sign in to place an order');
      router.push('/(auth)/login');
      return;
    }

    haptics.medium();
    setLoading(true);

    try {
      // Create order in Supabase
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user?.id,
          items: items,
          total: cartTotal,
          status: 'pending',
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Process payment
      const paymentResult = await handlePayment(cartTotal * 100, order.id);

      if (paymentResult.success) {
        // Update order status
        await supabase
          .from('orders')
          .update({ status: 'confirmed' })
          .eq('id', order.id);

        haptics.success();
        clearCart();
        router.push('/confirmation');
      } else if (!paymentResult.canceled) {
        // Update order status to failed
        await supabase
          .from('orders')
          .update({ status: 'failed' })
          .eq('id', order.id);

        Alert.alert('Payment Failed', 'Please try again');
        haptics.error();
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to place order');
      haptics.error();
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        {/* Delivery Address */}
        <View className="bg-gray-50 rounded-lg p-4 mb-4">
          <View className="flex-row items-center mb-2">
            <MapPin color="#DC2626" size={20} />
            <Text className="ml-2 text-lg font-semibold text-gray-900">
              Delivery Address
            </Text>
          </View>
          <Text className="text-gray-700 ml-7">
            6211 W Warren Ave, Detroit, MI 48210
          </Text>
          <TouchableOpacity className="mt-2">
            <Text className="text-primary font-semibold ml-7">Change Address</Text>
          </TouchableOpacity>
        </View>

        {/* Payment Method */}
        <View className="bg-gray-50 rounded-lg p-4 mb-4">
          <View className="flex-row items-center mb-2">
            <CreditCard color="#DC2626" size={20} />
            <Text className="ml-2 text-lg font-semibold text-gray-900">
              Payment Method
            </Text>
          </View>
          <Text className="text-gray-700 ml-7">
            Payment will be processed securely via Stripe
          </Text>
        </View>

        {/* Order Summary */}
        <View className="bg-gray-50 rounded-lg p-4 mb-4">
          <Text className="text-lg font-semibold text-gray-900 mb-3">
            Order Summary
          </Text>
          {items.map((item) => (
            <View key={item.id} className="flex-row justify-between mb-2">
              <Text className="text-gray-700">
                {item.name} x{item.quantity}
              </Text>
              <Text className="text-gray-900 font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}
          <View className="border-t border-gray-300 pt-3 mt-3">
            <View className="flex-row justify-between mb-2">
              <Text className="text-lg font-bold text-gray-900">Total</Text>
              <Text className="text-lg font-bold text-primary">
                ${cartTotal.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={handlePlaceOrder}
          disabled={loading || items.length === 0}
          className={`bg-primary rounded-lg py-4 items-center ${
            loading || items.length === 0 ? 'opacity-50' : ''
          }`}
        >
          <Text className="text-white font-bold text-lg">
            {loading ? 'Processing...' : 'Place Order'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
