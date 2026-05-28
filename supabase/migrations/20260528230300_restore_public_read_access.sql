-- Restore public read access to site-images bucket
CREATE POLICY "Public can view site images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'site-images');
