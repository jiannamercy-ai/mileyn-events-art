# Image Upload Troubleshooting Guide

## Quick Checks

### 1. **Are you logged in?**
   - Go to admin dashboard at `/admin`
   - You should see the editor interface, not a login redirect
   - If not logged in, you won't be able to upload

### 2. **Check Browser Console for Errors**
   - Press `F12` to open Developer Tools
   - Go to the "Console" tab
   - Try uploading an image and look for error messages
   - Share any errors you see

### 3. **Verify Supabase Connection**
   - Open DevTools Console and run:
     ```javascript
     const {data} = await supabase.auth.getSession();
     console.log("Session:", data.session?.user?.email);
     ```
   - You should see your email address logged

## If Uploads Still Fail

### Step 1: Apply the Storage Policy Fix
Run this migration in Supabase:
```sql
-- At: supabase/migrations/20260608000001_fix_storage_policies.sql
```

To apply:
1. Go to Supabase dashboard for your project
2. SQL Editor → New Query
3. Copy the contents from `20260608000001_fix_storage_policies.sql`
4. Run the query

### Step 2: Hard Refresh the Admin Dashboard
- Press `Ctrl+Shift+R` (or `Cmd+Shift+R` on Mac)
- This clears any cached code

### Step 3: Try Uploading Again
- Go to `/admin`
- Try uploading an image
- Check the browser console for the specific error

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "You must be logged in" | Refresh page and log back in |
| "Bucket not found" | Apply migration (Step 1 above) |
| "Permission denied" | Verify authenticated storage policies exist |
| "Invalid file type" | Upload only images (.jpg, .png, .gif, .webp, etc.) |
| "File too large" | Keep images under 10MB |

## Getting Help

If the issue persists, provide:
1. The exact error message from the browser console
2. What section you're trying to upload to (Hero, Projects, Team, etc.)
3. Browser type and OS
