import { useStripe } from '@stripe/stripe-react-native';
import { supabase } from '@/lib/supabase';
import { Alert } from 'react-native';

export function useStripePayment() {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const handlePayment = async (amount: number, orderId: string) => {
    try {
      // 1. Create payment intent via Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('create-payment-intent', {
        body: { amount, orderId },
      });

      if (error) throw error;

      const { paymentIntent, ephemeralKey, customer } = data;

      // 2. Initialize Payment Sheet
      const { error: initError } = await initPaymentSheet({
        merchantDisplayName: 'King Koney',
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        allowsDelayedPaymentMethods: false,
        defaultBillingDetails: {
          name: 'Customer',
        },
        applePay: {
          merchantCountryCode: 'US',
        },
        googlePay: {
          merchantCountryCode: 'US',
          testEnv: __DEV__,
        },
      });

      if (initError) throw initError;

      // 3. Present Payment Sheet
      const { error: presentError } = await presentPaymentSheet();

      if (presentError) {
        if (presentError.code === 'Canceled') {
          return { success: false, canceled: true };
        }
        throw presentError;
      }

      return { success: true };
    } catch (error: any) {
      Alert.alert('Payment Error', error.message);
      return { success: false, error };
    }
  };

  return { handlePayment };
}
