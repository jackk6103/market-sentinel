/*
  # Subscriptions and Payments Schema

  ## Description
  This migration creates the necessary tables to manage user subscriptions and payments
  for Market Sentinel's 29€/month subscription plan.

  ## New Tables
  
  ### `subscriptions`
  - `id` (uuid, primary key) - Unique subscription identifier
  - `user_id` (uuid, foreign key) - Reference to auth.users
  - `status` (text) - Subscription status: active, cancelled, expired, trial
  - `plan_id` (text) - Plan identifier (e.g., 'pro_monthly')
  - `stripe_subscription_id` (text, nullable) - Stripe subscription ID
  - `stripe_customer_id` (text, nullable) - Stripe customer ID
  - `current_period_start` (timestamptz) - Current billing period start
  - `current_period_end` (timestamptz) - Current billing period end
  - `cancel_at_period_end` (boolean) - Whether subscription cancels at period end
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `payments`
  - `id` (uuid, primary key) - Unique payment identifier
  - `user_id` (uuid, foreign key) - Reference to auth.users
  - `subscription_id` (uuid, foreign key) - Reference to subscriptions
  - `amount` (integer) - Amount in cents (2900 for 29€)
  - `currency` (text) - Currency code (EUR)
  - `status` (text) - Payment status: pending, succeeded, failed, refunded
  - `stripe_payment_intent_id` (text, nullable) - Stripe payment intent ID
  - `created_at` (timestamptz) - Payment timestamp

  ## Security
  - Enable RLS on all tables
  - Users can only view their own subscriptions and payments
  - No direct insert/update/delete access (will be handled by Edge Functions)
*/

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  status text NOT NULL DEFAULT 'trial',
  plan_id text NOT NULL DEFAULT 'pro_monthly',
  stripe_subscription_id text,
  stripe_customer_id text,
  current_period_start timestamptz DEFAULT now(),
  current_period_end timestamptz DEFAULT (now() + interval '1 month'),
  cancel_at_period_end boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  subscription_id uuid REFERENCES subscriptions(id) ON DELETE SET NULL,
  amount integer NOT NULL,
  currency text NOT NULL DEFAULT 'EUR',
  status text NOT NULL DEFAULT 'pending',
  stripe_payment_intent_id text,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_subscription_id ON payments(subscription_id);

-- Enable Row Level Security
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for subscriptions
CREATE POLICY "Users can view own subscriptions"
  ON subscriptions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for payments
CREATE POLICY "Users can view own payments"
  ON payments FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_subscriptions_updated_at 
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
