-- Create table for daily recap uploads
CREATE TABLE public.daily_uploads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  day_number INTEGER NOT NULL CHECK (day_number >= 1 AND day_number <= 7),
  day_title TEXT NOT NULL,
  description TEXT NOT NULL,
  author_name TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.daily_uploads ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view uploads (public event)
CREATE POLICY "Anyone can view daily uploads" 
ON public.daily_uploads 
FOR SELECT 
USING (true);

-- Allow anyone to create uploads (no auth required for students)
CREATE POLICY "Anyone can create daily uploads" 
ON public.daily_uploads 
FOR INSERT 
WITH CHECK (true);

-- Create storage bucket for upload images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('daily-uploads', 'daily-uploads', true);

-- Allow anyone to upload images
CREATE POLICY "Anyone can upload images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'daily-uploads');

-- Allow anyone to view images
CREATE POLICY "Anyone can view uploaded images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'daily-uploads');

-- Enable realtime for daily_uploads
ALTER PUBLICATION supabase_realtime ADD TABLE public.daily_uploads;