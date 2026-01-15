import { supabase } from '@/lib/supabase';

export interface MenuItem {
  id: string;
  name?: string;
  item_name?: string; // Support both column names
  description?: string;
  price: number;
  image_url?: string;
  category: string;
  modifiers?: any[];
}

export async function getMenuItems(category?: string) {
  let query = supabase
    .from('menu_items')
    .select('*')
    .order('category', { ascending: true })
    .order('item_name', { ascending: true })
    .order('name', { ascending: true });

  if (category && category !== 'All') {
    query = query.eq('category', category);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Failed to fetch menu items: ${error.message}`);
  }

  // Map item_name to name if needed for compatibility
  const mappedData = (data || []).map((item: any) => ({
    ...item,
    name: item.name || item.item_name || 'Unnamed Item',
  }));

  return mappedData as MenuItem[];
}

export async function getMenuCategories() {
  const { data, error } = await supabase
    .from('menu_items')
    .select('category')
    .order('category', { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch categories: ${error.message}`);
  }

  const uniqueCategories = Array.from(new Set(data?.map((item) => item.category) || []));
  return uniqueCategories;
}
