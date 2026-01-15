-- Add stripe_customer_id column to customer_profiles table
-- Run this in Supabase SQL Editor after setting up the Edge Function

ALTER TABLE customer_profiles
ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT;

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_customer_profiles_stripe_customer_id 
ON customer_profiles(stripe_customer_id);

-- Success message
SELECT 'Stripe customer ID column added successfully!' AS status;
