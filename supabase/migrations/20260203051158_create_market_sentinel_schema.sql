/*
  # Market Sentinel Application Schema

  ## Description
  Complete database schema for the Market Sentinel trading analysis application.
  This migration creates all necessary tables for user profiles, market analyses,
  alerts, and user preferences.

  ## New Tables
  
  ### `user_profiles`
  - `id` (uuid, primary key) - References auth.users
  - `full_name` (text) - User's full name
  - `avatar_url` (text, nullable) - Profile picture URL
  - `subscription_status` (text) - Current subscription status
  - `trial_ends_at` (timestamptz, nullable) - Trial expiration date
  - `preferences` (jsonb) - User preferences and settings
  - `created_at` (timestamptz) - Account creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `market_analyses`
  - `id` (uuid, primary key) - Unique analysis identifier
  - `user_id` (uuid, foreign key) - Reference to auth.users
  - `currency_pair` (text) - Trading pair analyzed (e.g., EUR/USD)
  - `timeframe` (text) - Analysis timeframe
  - `recommendation` (text) - Trade recommendation: trade, wait, avoid
  - `confidence_score` (integer) - Confidence level 0-100
  - `analysis_data` (jsonb) - Detailed analysis factors
  - `market_conditions` (jsonb) - Current market conditions
  - `reasoning` (text) - AI explanation for the recommendation
  - `created_at` (timestamptz) - Analysis timestamp

  ### `user_alerts`
  - `id` (uuid, primary key) - Unique alert identifier
  - `user_id` (uuid, foreign key) - Reference to auth.users
  - `currency_pair` (text) - Pair to monitor
  - `alert_type` (text) - Type: price, volatility, recommendation
  - `condition` (jsonb) - Alert trigger conditions
  - `is_active` (boolean) - Whether alert is enabled
  - `last_triggered` (timestamptz, nullable) - Last trigger time
  - `created_at` (timestamptz) - Alert creation timestamp

  ### `user_watchlist`
  - `id` (uuid, primary key) - Unique watchlist entry
  - `user_id` (uuid, foreign key) - Reference to auth.users
  - `currency_pair` (text) - Watched trading pair
  - `notes` (text, nullable) - User notes
  - `created_at` (timestamptz) - Added to watchlist timestamp

  ## Security
  - Enable RLS on all tables
  - Users can only access their own data
  - Policies for select, insert, update, delete operations
*/

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  avatar_url text,
  subscription_status text DEFAULT 'trial',
  trial_ends_at timestamptz DEFAULT (now() + interval '7 days'),
  preferences jsonb DEFAULT '{"theme": "dark", "notifications": true, "defaultTimeframe": "1h"}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create market_analyses table
CREATE TABLE IF NOT EXISTS market_analyses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  currency_pair text NOT NULL,
  timeframe text NOT NULL DEFAULT '1h',
  recommendation text NOT NULL,
  confidence_score integer NOT NULL DEFAULT 0,
  analysis_data jsonb NOT NULL DEFAULT '{}'::jsonb,
  market_conditions jsonb NOT NULL DEFAULT '{}'::jsonb,
  reasoning text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create user_alerts table
CREATE TABLE IF NOT EXISTS user_alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  currency_pair text NOT NULL,
  alert_type text NOT NULL DEFAULT 'recommendation',
  condition jsonb NOT NULL DEFAULT '{}'::jsonb,
  is_active boolean DEFAULT true,
  last_triggered timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Create user_watchlist table
CREATE TABLE IF NOT EXISTS user_watchlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  currency_pair text NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, currency_pair)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_subscription ON user_profiles(subscription_status);
CREATE INDEX IF NOT EXISTS idx_market_analyses_user_id ON market_analyses(user_id);
CREATE INDEX IF NOT EXISTS idx_market_analyses_created_at ON market_analyses(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_alerts_user_id ON user_alerts(user_id);
CREATE INDEX IF NOT EXISTS idx_user_alerts_active ON user_alerts(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_user_watchlist_user_id ON user_watchlist(user_id);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_watchlist ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- RLS Policies for market_analyses
CREATE POLICY "Users can view own analyses"
  ON market_analyses FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own analyses"
  ON market_analyses FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own analyses"
  ON market_analyses FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for user_alerts
CREATE POLICY "Users can view own alerts"
  ON user_alerts FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own alerts"
  ON user_alerts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own alerts"
  ON user_alerts FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own alerts"
  ON user_alerts FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for user_watchlist
CREATE POLICY "Users can view own watchlist"
  ON user_watchlist FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own watchlist items"
  ON user_watchlist FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own watchlist items"
  ON user_watchlist FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own watchlist items"
  ON user_watchlist FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, full_name, subscription_status, trial_ends_at)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    'trial',
    now() + interval '7 days'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger to update updated_at on user_profiles
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
