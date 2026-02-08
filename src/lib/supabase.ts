import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string;
          full_name: string | null;
          avatar_url: string | null;
          subscription_status: string;
          trial_ends_at: string | null;
          preferences: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          subscription_status?: string;
          trial_ends_at?: string | null;
          preferences?: any;
        };
        Update: {
          full_name?: string | null;
          avatar_url?: string | null;
          subscription_status?: string;
          trial_ends_at?: string | null;
          preferences?: any;
        };
      };
      market_analyses: {
        Row: {
          id: string;
          user_id: string;
          currency_pair: string;
          timeframe: string;
          recommendation: string;
          confidence_score: number;
          analysis_data: any;
          market_conditions: any;
          reasoning: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          currency_pair: string;
          timeframe?: string;
          recommendation: string;
          confidence_score?: number;
          analysis_data?: any;
          market_conditions?: any;
          reasoning: string;
        };
        Update: {
          currency_pair?: string;
          timeframe?: string;
          recommendation?: string;
          confidence_score?: number;
          analysis_data?: any;
          market_conditions?: any;
          reasoning?: string;
        };
      };
      user_alerts: {
        Row: {
          id: string;
          user_id: string;
          currency_pair: string;
          alert_type: string;
          condition: any;
          is_active: boolean;
          last_triggered: string | null;
          created_at: string;
        };
      };
      user_watchlist: {
        Row: {
          id: string;
          user_id: string;
          currency_pair: string;
          notes: string | null;
          created_at: string;
        };
      };
    };
  };
};
