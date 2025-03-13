import { createClient } from '@supabase/supabase-js';

// Check if environment variables are defined
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const db = {
  // Events
  createEvent: async (eventData: any) => {
    const { data, error } = await supabase
      .from('events')
      .insert(eventData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  getEvents: async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*');
    
    if (error) throw error;
    return data;
  },

  getEventById: async (id: number) => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Event Images
  addEventImage: async (imageData: any) => {
    const { data, error } = await supabase
      .from('event_images')
      .insert(imageData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Tickets
  createTicket: async (ticketData: any) => {
    const { data, error } = await supabase
      .from('tickets')
      .insert(ticketData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  getTickets: async (userId: string) => {
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .eq('user_id', userId);
    
    if (error) throw error;
    return data;
  }
}; 