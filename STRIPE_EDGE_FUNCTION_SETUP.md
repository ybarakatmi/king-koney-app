# Stripe Edge Function Setup

## Overview
The app needs a Supabase Edge Function to create Stripe payment intents securely. This function runs on Supabase's servers and handles the server-side Stripe operations.

## Step 1: Create the Edge Function

1. **Go to your Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Select your project

2. **Navigate to Edge Functions**
   - Click "Edge Functions" in the left sidebar
   - Click "Create a new function"

3. **Function Details**
   - **Function Name**: `create-payment-intent`
   - **Template**: Start from scratch (or use TypeScript template)

4. **Function Code**
   Copy and paste this code:

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@14.21.0?target=deno'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
})

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get the authorization header
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('No authorization header')
    }

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: authHeader },
        },
      }
    )

    // Get the authenticated user
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser()

    if (userError || !user) {
      throw new Error('Unauthorized')
    }

    // Parse request body
    const { amount, orderId } = await req.json()

    if (!amount || !orderId) {
      throw new Error('Missing amount or orderId')
    }

    // Create or retrieve Stripe customer
    let customerId: string

    // Check if user already has a Stripe customer ID stored
    const { data: profile } = await supabaseClient
      .from('customer_profiles')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .single()

    if (profile?.stripe_customer_id) {
      customerId = profile.stripe_customer_id
    } else {
      // Create new Stripe customer
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          supabase_user_id: user.id,
        },
      })
      customerId = customer.id

      // Store customer ID in database
      await supabaseClient
        .from('customer_profiles')
        .upsert({
          user_id: user.id,
          stripe_customer_id: customerId,
        })
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // Amount in cents
      currency: 'usd',
      customer: customerId,
      metadata: {
        order_id: orderId,
        user_id: user.id,
      },
      automatic_payment_methods: {
        enabled: true,
      },
    })

    // Create ephemeral key for the customer
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customerId },
      { apiVersion: '2023-10-16' }
    )

    return new Response(
      JSON.stringify({
        paymentIntent: paymentIntent.client_secret,
        ephemeralKey: ephemeralKey.secret,
        customer: customerId,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
```

## Step 2: Add Environment Variables

1. **In Supabase Dashboard**
   - Go to "Project Settings" → "Edge Functions"
   - Click "Secrets"
   - Add these secrets:
     - `STRIPE_SECRET_KEY` - Your Stripe secret key (starts with `sk_`)
     - `SUPABASE_URL` - Your Supabase URL (already set, but verify)
     - `SUPABASE_ANON_KEY` - Your Supabase anon key (already set, but verify)

2. **Get Your Stripe Secret Key**
   - Go to: https://dashboard.stripe.com/apikeys
   - Copy your **Secret key** (starts with `sk_live_` for production or `sk_test_` for testing)
   - ⚠️ **Important**: Use test keys for development, live keys for production

## Step 3: Deploy the Function

1. **Using Supabase CLI (Recommended)**
   ```bash
   # Install Supabase CLI if you haven't
   npm install -g supabase
   
   # Login
   supabase login
   
   # Link your project
   supabase link --project-ref your-project-ref
   
   # Deploy the function
   supabase functions deploy create-payment-intent
   ```

2. **Using Supabase Dashboard**
   - After creating the function in the dashboard
   - Click "Deploy" button
   - Wait for deployment to complete

## Step 4: Update Database Schema (Optional)

If you want to store Stripe customer IDs, add this column to `customer_profiles`:

```sql
ALTER TABLE customer_profiles
ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT;
```

## Step 5: Test the Function

You can test the Edge Function using the Supabase Dashboard:
1. Go to Edge Functions → `create-payment-intent`
2. Click "Invoke"
3. Use this test payload:
```json
{
  "amount": 1000,
  "orderId": "test-order-123"
}
```

## Troubleshooting

### Function not found
- Make sure the function name is exactly `create-payment-intent`
- Verify the function is deployed

### Authentication errors
- Check that the Authorization header is being sent
- Verify Supabase auth is working

### Stripe errors
- Verify `STRIPE_SECRET_KEY` secret is set correctly
- Check that you're using the right key (test vs live)
- Ensure your Stripe account is active

### CORS errors
- The function includes CORS headers, but verify they're working
- Check browser console for specific CORS errors

## Next Steps

After setting up the Edge Function:
1. ✅ Test the app locally
2. ✅ Add menu items to your database
3. ✅ Test the checkout flow
4. ✅ Test payment processing (use Stripe test cards)
5. ✅ Build for production

## Stripe Test Cards

For testing payments, use these test card numbers:
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- Use any future expiry date, any CVC, any ZIP
