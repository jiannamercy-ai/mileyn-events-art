-- Add missing authenticated storage policies for site-images bucket
-- Safe to run: uses DROP IF EXISTS before creating

-- Remove the incomplete public SELECT policy from previous migration
DROP POLICY IF EXISTS "Public can view site images" ON storage.objects;

-- Authenticated can view (READ) site images
CREATE POLICY "Authenticated can view site images"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'site-images');

-- Anonymous can view (READ) site images - for frontend display
CREATE POLICY "Anon can view site images"
  ON storage.objects FOR SELECT TO anon
  USING (bucket_id = 'site-images');

-- Authenticated can upload (INSERT) site images
CREATE POLICY IF NOT EXISTS "Authenticated can upload site images"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'site-images');

-- Authenticated can update (PATCH) site images
CREATE POLICY IF NOT EXISTS "Authenticated can update site images"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'site-images')
  WITH CHECK (bucket_id = 'site-images');

-- Authenticated can delete site images
CREATE POLICY IF NOT EXISTS "Authenticated can delete site images"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'site-images');
