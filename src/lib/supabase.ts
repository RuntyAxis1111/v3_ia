import { createClient } from '@supabase/supabase-js';

// Types for our database tables
export type SocialMediaData = {
  id: string;
  platform: string;
  metric: string;
  value: number;
  date: string;
  [key: string]: any;
};

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseKey || ''
);

// Helper functions for common Supabase operations
export async function executeQuery(query: string) {
  try {
    const { data, error } = await supabase.rpc('execute_sql', { sql_query: query });
    
    if (error) {
      console.error('Error executing query:', error);
      return { error: error.message };
    }
    
    return { data };
  } catch (error) {
    console.error('Error in executeQuery:', error);
    return { error: 'Error ejecutando la consulta SQL' };
  }
}

// Social media data fetching helpers
export async function getFacebookData() {
  const { data, error } = await supabase
    .from('DATA_PALF_FACEBOOK')
    .select('*')
    .order('date', { ascending: false })
    .limit(100);
    
  if (error) {
    console.error('Error fetching Facebook data:', error);
    return { error: error.message };
  }
  
  return { data };
}

export async function getInstagramData() {
  const { data, error } = await supabase
    .from('DATA_PALF_INSTAGRAM')
    .select('*')
    .order('date', { ascending: false })
    .limit(100);
    
  if (error) {
    console.error('Error fetching Instagram data:', error);
    return { error: error.message };
  }
  
  return { data };
}

export async function getTwitterData() {
  const { data, error } = await supabase
    .from('DATA_PALF_TWITTER')
    .select('*')
    .order('date', { ascending: false })
    .limit(100);
    
  if (error) {
    console.error('Error fetching Twitter data:', error);
    return { error: error.message };
  }
  
  return { data };
}

export async function getTikTokData() {
  const { data, error } = await supabase
    .from('DATA_PALF_TIKTOK')
    .select('*')
    .order('date', { ascending: false })
    .limit(100);
    
  if (error) {
    console.error('Error fetching TikTok data:', error);
    return { error: error.message };
  }
  
  return { data };
}

export async function getYoutubeData() {
  const { data, error } = await supabase
    .from('DATA_PALF_YOUTUBE')
    .select('*')
    .order('date', { ascending: false })
    .limit(100);
    
  if (error) {
    console.error('Error fetching YouTube data:', error);
    return { error: error.message };
  }
  
  return { data };
}