import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { Plus, MapPin, Trash2 } from 'lucide-react-native';
import { haptics } from '@/utils/haptics';

export default function AddressesScreen() {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadAddresses();
    }
  }, [user]);

  const loadAddresses = async () => {
    try {
      const { data, error } = await supabase
        .from('addresses')
        .select('*')
        .eq('user_id', user?.id)
        .order('is_default', { ascending: false });

      if (error) throw error;
      setAddresses(data || []);
    } catch (error) {
      console.error('Error loading addresses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    haptics.medium();
    Alert.alert(
      'Delete Address',
      'Are you sure you want to delete this address?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const { error } = await supabase
                .from('addresses')
                .delete()
                .eq('id', id);
              if (error) throw error;
              loadAddresses();
              haptics.success();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete address');
              haptics.error();
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-gray-500">Loading addresses...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        {addresses.length === 0 ? (
          <View className="items-center justify-center py-12">
            <MapPin color="#9CA3AF" size={48} />
            <Text className="text-xl font-semibold text-gray-900 mt-4 mb-2">
              No addresses saved
            </Text>
            <Text className="text-gray-600 text-center mb-6">
              Add an address to get started with delivery
            </Text>
          </View>
        ) : (
          addresses.map((address) => (
            <View
              key={address.id}
              className="bg-white rounded-lg border border-gray-200 p-4 mb-4"
            >
              <View className="flex-row justify-between items-start mb-2">
                <View className="flex-1">
                  {address.is_default && (
                    <Text className="text-primary font-semibold text-sm mb-1">
                      Default Address
                    </Text>
                  )}
                  <Text className="text-lg font-semibold text-gray-900">
                    {address.name || 'Home'}
                  </Text>
                  <Text className="text-gray-600 mt-1">
                    {address.street}
                  </Text>
                  <Text className="text-gray-600">
                    {address.city}, {address.state} {address.zip}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => handleDelete(address.id)}
                  className="ml-4"
                >
                  <Trash2 color="#EF4444" size={20} />
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}

        <TouchableOpacity
          onPress={() => {
            haptics.medium();
            // TODO: Navigate to add address screen
            Alert.alert('Coming Soon', 'Add address functionality coming soon');
          }}
          className="bg-primary rounded-lg py-4 flex-row items-center justify-center mt-4"
        >
          <Plus color="#FFFFFF" size={20} />
          <Text className="text-white font-bold text-lg ml-2">Add Address</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
