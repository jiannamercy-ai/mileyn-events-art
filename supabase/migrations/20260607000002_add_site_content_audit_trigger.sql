-- Add automatic updated_at trigger for site_content table
-- Production-ready: ensures audit trail of changes

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop trigger if it exists (safe idempotent operation)
DROP TRIGGER IF EXISTS update_site_content_updated_at ON public.site_content;

-- Create trigger to auto-update timestamp on any change
CREATE TRIGGER update_site_content_updated_at
  BEFORE UPDATE ON public.site_content
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
