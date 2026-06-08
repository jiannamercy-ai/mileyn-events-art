-- Comprehensive fix for authenticated image uploads
-- This migration consolidates all necessary RLS policies and bucket configuration
-- Safe to run: uses DROP IF EXISTS before creating policies

-- ==========================================
-- Storage Bucket Configuration
-- ==========================================

-- Ensure site-images bucket exists and is public
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-images', 'site-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- ==========================================
-- Storage RLS Policies for site-images bucket
-- ==========================================

-- DROP existing policies that may conflict
DROP POLICY IF EXISTS "Public can view site images" ON storage.objects;
DROP POLICY IF EXISTS "Public can upload site images" ON storage.objects;
DROP POLICY IF EXISTS "Public can update site images" ON storage.objects;
DROP POLICY IF EXISTS "Public can delete site images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated can view site images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated can upload site images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated can update site images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated can delete site images" ON storage.objects;
DROP POLICY IF EXISTS "Anon can view site images" ON storage.objects;

-- Authenticated users CAN upload (INSERT)
CREATE POLICY "Authenticated can upload site images"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'site-images' AND auth.uid() IS NOT NULL);

-- Authenticated users CAN update their uploads
CREATE POLICY "Authenticated can update site images"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'site-images' AND auth.uid() IS NOT NULL)
  WITH CHECK (bucket_id = 'site-images' AND auth.uid() IS NOT NULL);

-- Authenticated users CAN delete
CREATE POLICY "Authenticated can delete site images"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'site-images' AND auth.uid() IS NOT NULL);

-- Authenticated users CAN view/read
CREATE POLICY "Authenticated can view site images"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'site-images');

-- Anonymous/Public CAN view (needed for frontend)
CREATE POLICY "Public can view site images"
  ON storage.objects FOR SELECT TO anon
  USING (bucket_id = 'site-images');

-- ==========================================
-- Site Content Table RLS (maintain existing)
-- ==========================================

-- Ensure RLS is enabled
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Public can READ site content (for frontend)
DROP POLICY IF EXISTS "Public can read site content" ON public.site_content;
CREATE POLICY "Public can read site content"
  ON public.site_content FOR SELECT
  USING (true);

-- Authenticated users can INSERT
DROP POLICY IF EXISTS "Authenticated can insert site content" ON public.site_content;
CREATE POLICY "Authenticated can insert site content"
  ON public.site_content FOR INSERT TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

-- Authenticated users can UPDATE
DROP POLICY IF EXISTS "Authenticated can update site content" ON public.site_content;
CREATE POLICY "Authenticated can update site content"
  ON public.site_content FOR UPDATE TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);
