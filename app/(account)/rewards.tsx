import { View, Text, ScrollView } from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Gift } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function RewardsScreen() {
  const { user } = useAuth();
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadRewards();
    }
  }, [user]);

  const loadRewards = async () => {
    try {
      const { data, error } = await supabase
        .from('user_rewards')
        .select('points')
        .eq('user_id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      setPoints(data?.points || 0);
    } catch (error) {
      console.error('Error loading rewards:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-gray-500">Loading rewards...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        <LinearGradient
          colors={['#DC2626', '#B91C1C']}
          style={{ borderRadius: 8, padding: 24, marginBottom: 24, alignItems: 'center' }}
        >
          <Gift color="#FFFFFF" size={48} />
          <Text className="text-white text-2xl font-bold mt-4">{points}</Text>
          <Text className="text-white/90 text-lg">Reward Points</Text>
        </LinearGradient>

        <View className="bg-gray-50 rounded-lg p-4 mb-4">
          <Text className="text-lg font-semibold text-gray-900 mb-2">
            How it works
          </Text>
          <Text className="text-gray-600 mb-2">
            • Earn 1 point for every $1 spent
          </Text>
          <Text className="text-gray-600 mb-2">
            • 100 points = $5 discount
          </Text>
          <Text className="text-gray-600">
            • Points never expire
          </Text>
        </View>

        <View className="bg-gray-50 rounded-lg p-4">
          <Text className="text-lg font-semibold text-gray-900 mb-2">
            Recent Activity
          </Text>
          <Text className="text-gray-600">
            Your reward activity will appear here
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
