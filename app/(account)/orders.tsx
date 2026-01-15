import { View, Text, ScrollView } from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function OrdersScreen() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadOrders();
    }
  }, [user]);

  const loadOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-gray-500">Loading orders...</Text>
      </View>
    );
  }

  if (orders.length === 0) {
    return (
      <View className="flex-1 items-center justify-center px-4">
        <Text className="text-xl font-semibold text-gray-900 mb-2">No orders yet</Text>
        <Text className="text-gray-600 text-center">
          Your order history will appear here
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        {orders.map((order) => (
          <View
            key={order.id}
            className="bg-white rounded-lg border border-gray-200 p-4 mb-4"
          >
            <View className="flex-row justify-between items-start mb-2">
              <View>
                <Text className="text-lg font-semibold text-gray-900">
                  Order #{order.id.slice(0, 8)}
                </Text>
                <Text className="text-sm text-gray-600">
                  {new Date(order.created_at).toLocaleDateString()}
                </Text>
              </View>
              <Text className="text-lg font-bold text-primary">
                ${order.total.toFixed(2)}
              </Text>
            </View>
            <Text className="text-sm text-gray-600 capitalize">
              Status: {order.status}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
