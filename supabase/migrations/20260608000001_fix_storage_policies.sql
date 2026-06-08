-- Fix storage policies to ensure authenticated users can upload and view images
-- Safe to run: uses DROP IF EXISTS before creating

-- Drop potentially conflicting policies
DROP POLICY IF EXISTS "Public can view site images" ON storage.objects;
DROP POLICY IF EXISTS "Public can upload site images" ON storage.objects;
DROP POLICY IF EXISTS "Public can update site images" ON storage.objects;
DROP POLICY IF EXISTS "Public can delete site images" ON storage.objects;

-- Ensure bucket exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-images', 'site-images', true)
ON CONFLICT (id) DO NOTHING;

-- Authenticated users can upload/insert
CREATE POLICY IF NOT EXISTS "Authenticated can upload site images"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'site-images');

-- Authenticated users can update
CREATE POLICY IF NOT EXISTS "Authenticated can update site images"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'site-images')
  WITH CHECK (bucket_id = 'site-images');

-- Authenticated users can delete
CREATE POLICY IF NOT EXISTS "Authenticated can delete site images"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'site-images');

-- Authenticated users can view
CREATE POLICY IF NOT EXISTS "Authenticated can view site images"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'site-images');

-- Anonymous/public can view for frontend display
CREATE POLICY IF NOT EXISTS "Anon can view site images"
  ON storage.objects FOR SELECT TO anon
  USING (bucket_id = 'site-images');
