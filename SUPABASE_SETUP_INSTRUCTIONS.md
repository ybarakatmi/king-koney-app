# Supabase Database Setup Instructions

## Quick Setup

1. **Go to your Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Select your project: `huhgwtemtvadfmxlpkni`

2. **Open SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New query"

3. **Run the Setup Script**
   - Copy the entire contents of `supabase-setup.sql`
   - Paste it into the SQL Editor
   - Click "Run" (or press Ctrl+Enter)

## What Gets Created

### Tables Created:
1. **menu_items** - Restaurant menu items (public read access)
2. **orders** - Customer orders (user-specific)
3. **addresses** - User delivery addresses
4. **customer_profiles** - User profile information
5. **user_rewards** - Loyalty points system
6. **user_push_tokens** - Push notification tokens

### Security Features:
- ✅ Row Level Security (RLS) enabled on all tables
- ✅ Users can only access their own data
- ✅ Menu items are publicly readable
- ✅ Automatic timestamp updates

### Performance:
- ✅ Indexes on frequently queried columns
- ✅ Foreign key constraints for data integrity

## Sample Data

The script includes sample menu items to get you started. You can:
- Remove them if you have your own data
- Modify them to match your menu
- Add more items through the Supabase dashboard

## Verifying Setup

After running the script, you should see:
- ✅ Success message: "Database setup completed successfully!"
- ✅ All 6 tables visible in the "Table Editor"
- ✅ Sample menu items in the `menu_items` table

## Next Steps

1. **Add Your Menu Items**
   - Go to "Table Editor" → `menu_items`
   - Add your restaurant's menu items
   - Include images by uploading to Supabase Storage and using the public URL

2. **Test Authentication**
   - The app should now be able to create user accounts
   - Test sign up/sign in functionality

3. **Set Up Storage (Optional)**
   - Create a storage bucket for menu item images
   - Update menu items with image URLs

## Troubleshooting

### If you get permission errors:
- Make sure you're logged in as the project owner
- Check that RLS policies are enabled

### If tables already exist:
- The script uses `CREATE TABLE IF NOT EXISTS` so it's safe to run multiple times
- Existing data won't be deleted

### To reset everything:
```sql
-- WARNING: This deletes all data!
DROP TABLE IF EXISTS user_push_tokens CASCADE;
DROP TABLE IF EXISTS user_rewards CASCADE;
DROP TABLE IF EXISTS customer_profiles CASCADE;
DROP TABLE IF EXISTS addresses CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS menu_items CASCADE;
```
Then run `supabase-setup.sql` again.
