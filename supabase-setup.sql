-- King Koney App - Supabase Database Setup
-- Run this script in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. MENU ITEMS TABLE
-- Create table if it doesn't exist
CREATE TABLE IF NOT EXISTS menu_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  image_url TEXT,
  category TEXT NOT NULL,
  modifiers JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add missing columns if table already exists with different schema
DO $$
BEGIN
  -- Add columns if they don't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'menu_items' AND column_name = 'id') THEN
    ALTER TABLE menu_items ADD COLUMN id UUID DEFAULT uuid_generate_v4();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'menu_items' AND column_name = 'name') THEN
    ALTER TABLE menu_items ADD COLUMN name TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'menu_items' AND column_name = 'description') THEN
    ALTER TABLE menu_items ADD COLUMN description TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'menu_items' AND column_name = 'price') THEN
    ALTER TABLE menu_items ADD COLUMN price NUMERIC(10, 2);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'menu_items' AND column_name = 'image_url') THEN
    ALTER TABLE menu_items ADD COLUMN image_url TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'menu_items' AND column_name = 'category') THEN
    ALTER TABLE menu_items ADD COLUMN category TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'menu_items' AND column_name = 'modifiers') THEN
    ALTER TABLE menu_items ADD COLUMN modifiers JSONB;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'menu_items' AND column_name = 'created_at') THEN
    ALTER TABLE menu_items ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
  END IF;
  
  -- Set primary key if id column exists but isn't primary key
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'menu_items' AND column_name = 'id') THEN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                   WHERE table_name = 'menu_items' AND constraint_type = 'PRIMARY KEY') THEN
      ALTER TABLE menu_items ADD PRIMARY KEY (id);
    END IF;
  END IF;
  
  -- If item_name exists but name doesn't, add name column and sync with item_name
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'menu_items' AND column_name = 'item_name') THEN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'menu_items' AND column_name = 'name') THEN
      ALTER TABLE menu_items ADD COLUMN name TEXT;
      -- Copy data from item_name to name
      UPDATE menu_items SET name = item_name WHERE name IS NULL;
    END IF;
  END IF;
END $$;

-- Create function to sync item_name and name (outside DO block)
CREATE OR REPLACE FUNCTION sync_menu_item_names()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    IF NEW.item_name IS NOT NULL AND (NEW.name IS NULL OR NEW.name != NEW.item_name) THEN
      NEW.name := NEW.item_name;
    ELSIF NEW.name IS NOT NULL AND (NEW.item_name IS NULL OR NEW.item_name != NEW.name) THEN
      NEW.item_name := NEW.name;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to keep item_name and name in sync (only if both columns exist)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'menu_items' AND column_name = 'item_name')
     AND EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'menu_items' AND column_name = 'name') THEN
    DROP TRIGGER IF EXISTS sync_menu_item_names_trigger ON menu_items;
    CREATE TRIGGER sync_menu_item_names_trigger
      BEFORE INSERT OR UPDATE ON menu_items
      FOR EACH ROW
      EXECUTE FUNCTION sync_menu_item_names();
  END IF;
END $$;

-- Set NOT NULL constraints if columns exist but aren't constrained
-- First, update any NULL values to defaults, then set NOT NULL
DO $$
BEGIN
  -- Handle name column: update NULLs to 'Unnamed Item', then set NOT NULL
  IF EXISTS (SELECT 1 FROM information_schema.columns 
             WHERE table_name = 'menu_items' AND column_name = 'name' AND is_nullable = 'YES') THEN
    -- Update any NULL values first
    UPDATE menu_items SET name = 'Unnamed Item' WHERE name IS NULL;
    -- Now set NOT NULL
    ALTER TABLE menu_items ALTER COLUMN name SET NOT NULL;
  END IF;
  
  -- Handle price column: update NULLs to 0, then set NOT NULL
  IF EXISTS (SELECT 1 FROM information_schema.columns 
             WHERE table_name = 'menu_items' AND column_name = 'price' AND is_nullable = 'YES') THEN
    -- Update any NULL values first
    UPDATE menu_items SET price = 0 WHERE price IS NULL;
    -- Now set NOT NULL
    ALTER TABLE menu_items ALTER COLUMN price SET NOT NULL;
  END IF;
  
  -- Handle category column: update NULLs to 'Other', then set NOT NULL
  IF EXISTS (SELECT 1 FROM information_schema.columns 
             WHERE table_name = 'menu_items' AND column_name = 'category' AND is_nullable = 'YES') THEN
    -- Update any NULL values first
    UPDATE menu_items SET category = 'Other' WHERE category IS NULL;
    -- Now set NOT NULL
    ALTER TABLE menu_items ALTER COLUMN category SET NOT NULL;
  END IF;
END $$;

-- Enable RLS on menu_items (public read access)
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if it exists, then create
DROP POLICY IF EXISTS "Menu items are viewable by everyone" ON menu_items;
CREATE POLICY "Menu items are viewable by everyone"
  ON menu_items FOR SELECT
  USING (true);

-- 2. ORDERS TABLE
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  items JSONB NOT NULL,
  total NUMERIC(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on orders
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist, then create
DROP POLICY IF EXISTS "Users can view their own orders" ON orders;
DROP POLICY IF EXISTS "Users can insert their own orders" ON orders;
DROP POLICY IF EXISTS "Users can update their own orders" ON orders;

-- Policy: Users can only see their own orders
CREATE POLICY "Users can view their own orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own orders
CREATE POLICY "Users can insert their own orders"
  ON orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own orders
CREATE POLICY "Users can update their own orders"
  ON orders FOR UPDATE
  USING (auth.uid() = user_id);

-- 3. ADDRESSES TABLE
CREATE TABLE IF NOT EXISTS addresses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  street TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip TEXT NOT NULL,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on addresses
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist, then create
DROP POLICY IF EXISTS "Users can view their own addresses" ON addresses;
DROP POLICY IF EXISTS "Users can insert their own addresses" ON addresses;
DROP POLICY IF EXISTS "Users can update their own addresses" ON addresses;
DROP POLICY IF EXISTS "Users can delete their own addresses" ON addresses;

-- Policy: Users can view their own addresses
CREATE POLICY "Users can view their own addresses"
  ON addresses FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own addresses
CREATE POLICY "Users can insert their own addresses"
  ON addresses FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own addresses
CREATE POLICY "Users can update their own addresses"
  ON addresses FOR UPDATE
  USING (auth.uid() = user_id);

-- Policy: Users can delete their own addresses
CREATE POLICY "Users can delete their own addresses"
  ON addresses FOR DELETE
  USING (auth.uid() = user_id);

-- 4. CUSTOMER PROFILES TABLE
CREATE TABLE IF NOT EXISTS customer_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on customer_profiles
ALTER TABLE customer_profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist, then create
DROP POLICY IF EXISTS "Users can view their own profile" ON customer_profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON customer_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON customer_profiles;

-- Policy: Users can view their own profile
CREATE POLICY "Users can view their own profile"
  ON customer_profiles FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own profile
CREATE POLICY "Users can insert their own profile"
  ON customer_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update their own profile"
  ON customer_profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- 5. USER REWARDS TABLE
CREATE TABLE IF NOT EXISTS user_rewards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  points INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on user_rewards
ALTER TABLE user_rewards ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist, then create
DROP POLICY IF EXISTS "Users can view their own rewards" ON user_rewards;
DROP POLICY IF EXISTS "Users can update their own rewards" ON user_rewards;

-- Policy: Users can view their own rewards
CREATE POLICY "Users can view their own rewards"
  ON user_rewards FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can update their own rewards (for app to update points)
CREATE POLICY "Users can update their own rewards"
  ON user_rewards FOR UPDATE
  USING (auth.uid() = user_id);

-- 6. USER PUSH TOKENS TABLE
CREATE TABLE IF NOT EXISTS user_push_tokens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  token TEXT NOT NULL,
  platform TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, token)
);

-- Enable RLS on user_push_tokens
ALTER TABLE user_push_tokens ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist, then create
DROP POLICY IF EXISTS "Users can view their own push tokens" ON user_push_tokens;
DROP POLICY IF EXISTS "Users can insert their own push tokens" ON user_push_tokens;
DROP POLICY IF EXISTS "Users can delete their own push tokens" ON user_push_tokens;

-- Policy: Users can view their own tokens
CREATE POLICY "Users can view their own push tokens"
  ON user_push_tokens FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own tokens
CREATE POLICY "Users can insert their own push tokens"
  ON user_push_tokens FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own tokens
CREATE POLICY "Users can delete their own push tokens"
  ON user_push_tokens FOR DELETE
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_addresses_user_id ON addresses(user_id);
CREATE INDEX IF NOT EXISTS idx_menu_items_category ON menu_items(category);
CREATE INDEX IF NOT EXISTS idx_user_push_tokens_user_id ON user_push_tokens(user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers to auto-update updated_at
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_addresses_updated_at
  BEFORE UPDATE ON addresses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_customer_profiles_updated_at
  BEFORE UPDATE ON customer_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_rewards_updated_at
  BEFORE UPDATE ON user_rewards
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample menu items (only if table is empty or you want to add these)
-- This will only insert if the items don't already exist
-- Handles both 'name' and 'item_name' column names
DO $$
DECLARE
  name_col TEXT;
  has_classic_item BOOLEAN;
BEGIN
  -- Determine which column name exists
  IF EXISTS (SELECT 1 FROM information_schema.columns 
             WHERE table_name = 'menu_items' AND column_name = 'item_name') THEN
    name_col := 'item_name';
  ELSIF EXISTS (SELECT 1 FROM information_schema.columns 
                WHERE table_name = 'menu_items' AND column_name = 'name') THEN
    name_col := 'name';
  ELSE
    -- No name column exists, skip insertion
    RETURN;
  END IF;
  
  -- Check if Classic Coney Dog already exists using dynamic SQL
  EXECUTE format('SELECT EXISTS(SELECT 1 FROM menu_items WHERE %I = $1)', name_col) 
    USING 'Classic Coney Dog' INTO has_classic_item;
  
  -- Only insert if item doesn't exist
  IF NOT has_classic_item THEN
    -- Use the correct column name dynamically
    IF name_col = 'item_name' THEN
      INSERT INTO menu_items (item_name, description, price, category, image_url) VALUES
        ('Classic Coney Dog', 'All-beef hot dog with chili, onions, and mustard', 4.99, 'Hot Dogs', NULL),
        ('Detroit Coney', 'Two hot dogs with chili, onions, and mustard', 7.99, 'Hot Dogs', NULL),
        ('Chili Cheese Fries', 'Crispy fries topped with chili and cheese', 5.99, 'Sides', NULL),
        ('Onion Rings', 'Golden fried onion rings', 4.99, 'Sides', NULL),
        ('Coca Cola', 'Classic soft drink', 2.49, 'Drinks', NULL),
        ('Root Beer', 'Classic root beer', 2.49, 'Drinks', NULL);
    ELSE
      INSERT INTO menu_items (name, description, price, category, image_url) VALUES
        ('Classic Coney Dog', 'All-beef hot dog with chili, onions, and mustard', 4.99, 'Hot Dogs', NULL),
        ('Detroit Coney', 'Two hot dogs with chili, onions, and mustard', 7.99, 'Hot Dogs', NULL),
        ('Chili Cheese Fries', 'Crispy fries topped with chili and cheese', 5.99, 'Sides', NULL),
        ('Onion Rings', 'Golden fried onion rings', 4.99, 'Sides', NULL),
        ('Coca Cola', 'Classic soft drink', 2.49, 'Drinks', NULL),
        ('Root Beer', 'Classic root beer', 2.49, 'Drinks', NULL);
    END IF;
  END IF;
END $$;

-- Success message
SELECT 'Database setup completed successfully! All tables, policies, and indexes have been created.' AS status;
