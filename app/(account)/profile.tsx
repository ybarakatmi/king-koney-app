import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';
import { haptics } from '@/utils/haptics';

export default function ProfileScreen() {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    haptics.medium();
    setLoading(true);
    // TODO: Update user profile in Supabase
    setTimeout(() => {
      setLoading(false);
      haptics.success();
      Alert.alert('Success', 'Profile updated successfully');
    }, 500);
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        <View className="mb-4">
          <Text className="text-gray-700 font-medium mb-2">Email</Text>
          <TextInput
            value={user?.email || ''}
            editable={false}
            className="border border-gray-300 rounded-lg px-4 py-3 text-base bg-gray-50"
          />
        </View>

        <View className="mb-4">
          <Text className="text-gray-700 font-medium mb-2">Full Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            className="border border-gray-300 rounded-lg px-4 py-3 text-base"
          />
        </View>

        <View className="mb-6">
          <Text className="text-gray-700 font-medium mb-2">Phone Number</Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            className="border border-gray-300 rounded-lg px-4 py-3 text-base"
          />
        </View>

        <TouchableOpacity
          onPress={handleSave}
          disabled={loading}
          className={`bg-primary rounded-lg py-4 items-center ${
            loading ? 'opacity-50' : ''
          }`}
        >
          <Text className="text-white font-bold text-lg">
            {loading ? 'Saving...' : 'Save Changes'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
