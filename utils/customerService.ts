import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

export interface CustomerProfile {
  id: string;
  user_id: string;
  full_name?: string;
  phone?: string;
  created_at: string;
  updated_at: string;
}

export async function getCustomerProfile(userId: string): Promise<CustomerProfile | null> {
  const { data, error } = await supabase
    .from('customer_profiles')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // No profile found, create one
      return null;
    }
    throw new Error(`Failed to fetch customer profile: ${error.message}`);
  }

  return data as CustomerProfile;
}

export async function createCustomerProfile(
  userId: string,
  profile: Partial<CustomerProfile>
): Promise<CustomerProfile> {
  const { data, error } = await supabase
    .from('customer_profiles')
    .insert({
      user_id: userId,
      ...profile,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create customer profile: ${error.message}`);
  }

  return data as CustomerProfile;
}

export async function updateCustomerProfile(
  userId: string,
  updates: Partial<CustomerProfile>
): Promise<CustomerProfile> {
  const { data, error } = await supabase
    .from('customer_profiles')
    .update(updates)
    .eq('user_id', userId)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update customer profile: ${error.message}`);
  }

  return data as CustomerProfile;
}
