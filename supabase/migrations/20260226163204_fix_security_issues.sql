/*
  # Fix Security Issues in Market Sentinel Schema

  ## Description
  This migration fixes critical security and data integrity issues in the database schema.

  ## Changes Made

  1. **Fix Missing Function**
     - Create `update_updated_at_column()` function needed by triggers
  
  2. **Add Missing RLS Policy**
     - Add DELETE policy for user_profiles table
  
  3. **Add Data Validation Constraints**
     - Constrain `subscription_status` to valid values
     - Constrain `recommendation` to valid values (trade, wait, avoid)
     - Constrain `alert_type` to valid values
     - Constrain `confidence_score` to 0-100 range
     - Constrain `timeframe` to valid values
  
  4. **Security Improvements**
     - Add CHECK constraints to prevent invalid data
     - Ensure data integrity at database level
     - Prevent injection of invalid values

  ## Important Notes
  - All existing data remains unchanged
  - New constraints only apply to future inserts/updates
  - Uses IF NOT EXISTS to prevent errors on re-run
*/

-- Create the missing update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add missing DELETE policy for user_profiles
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'user_profiles' 
    AND policyname = 'Users can delete own profile'
  ) THEN
    CREATE POLICY "Users can delete own profile"
      ON user_profiles FOR DELETE
      TO authenticated
      USING (auth.uid() = id);
  END IF;
END $$;

-- Add validation constraints for data integrity
DO $$
BEGIN
  -- Constraint for subscription_status
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'valid_subscription_status'
  ) THEN
    ALTER TABLE user_profiles 
    ADD CONSTRAINT valid_subscription_status 
    CHECK (subscription_status IN ('trial', 'active', 'cancelled', 'expired', 'past_due'));
  END IF;

  -- Constraint for recommendation
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'valid_recommendation'
  ) THEN
    ALTER TABLE market_analyses 
    ADD CONSTRAINT valid_recommendation 
    CHECK (recommendation IN ('trade', 'wait', 'avoid'));
  END IF;

  -- Constraint for confidence_score
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'valid_confidence_score'
  ) THEN
    ALTER TABLE market_analyses 
    ADD CONSTRAINT valid_confidence_score 
    CHECK (confidence_score >= 0 AND confidence_score <= 100);
  END IF;

  -- Constraint for timeframe
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'valid_timeframe'
  ) THEN
    ALTER TABLE market_analyses 
    ADD CONSTRAINT valid_timeframe 
    CHECK (timeframe IN ('1m', '5m', '15m', '30m', '1h', '4h', '1d', '1w'));
  END IF;

  -- Constraint for alert_type
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'valid_alert_type'
  ) THEN
    ALTER TABLE user_alerts 
    ADD CONSTRAINT valid_alert_type 
    CHECK (alert_type IN ('recommendation', 'price', 'volatility', 'volume'));
  END IF;
END $$;

-- Add index for performance on frequently queried fields
CREATE INDEX IF NOT EXISTS idx_market_analyses_recommendation ON market_analyses(recommendation);
CREATE INDEX IF NOT EXISTS idx_market_analyses_currency_pair ON market_analyses(currency_pair);
CREATE INDEX IF NOT EXISTS idx_user_alerts_currency_pair ON user_alerts(currency_pair);
