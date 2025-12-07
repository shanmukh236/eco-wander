-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  eco_points INTEGER DEFAULT 0,
  total_trips INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create trips table
CREATE TABLE public.trips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  from_location TEXT NOT NULL,
  to_location TEXT NOT NULL,
  waypoints JSONB DEFAULT '[]'::jsonb,
  travel_plan JSONB,
  transport_mode TEXT,
  distance_km NUMERIC,
  eco_score INTEGER,
  budget_range TEXT,
  travel_date DATE,
  status TEXT DEFAULT 'planned',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create eco_missions table
CREATE TABLE public.eco_missions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  mission_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  points_earned INTEGER DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  trip_id UUID REFERENCES public.trips(id) ON DELETE SET NULL
);

-- Create rewards table
CREATE TABLE public.rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  coupon_code TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  points_cost INTEGER NOT NULL,
  is_redeemed BOOLEAN DEFAULT false,
  redeemed_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.eco_missions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rewards ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

-- Trips policies
CREATE POLICY "Users can view own trips" ON public.trips FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own trips" ON public.trips FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own trips" ON public.trips FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own trips" ON public.trips FOR DELETE USING (auth.uid() = user_id);

-- Eco missions policies
CREATE POLICY "Users can view own missions" ON public.eco_missions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own missions" ON public.eco_missions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Rewards policies
CREATE POLICY "Users can view own rewards" ON public.rewards FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own rewards" ON public.rewards FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own rewards" ON public.rewards FOR UPDATE USING (auth.uid() = user_id);

-- Function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (new.id, new.raw_user_meta_data ->> 'full_name');
  RETURN new;
END;
$$;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Timestamp triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_trips_updated_at BEFORE UPDATE ON public.trips FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Enable realtime for trips
ALTER PUBLICATION supabase_realtime ADD TABLE public.trips;