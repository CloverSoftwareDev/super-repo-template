# Render Deployment Guide

## Prerequisites

1. Push your code to GitHub
2. Create a [Render account](https://render.com)
3. Have your Supabase credentials ready

## Step-by-Step Deployment

### 1. Create Web Service

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository

### 2. Configure Service

**Basic Settings:**
- **Name**: `super-repo-api` (or your preferred name)
- **Region**: Select closest to your users
- **Branch**: `main` (or your default branch)
- **Root Directory**: Leave empty (will use repo root)
- **Runtime**: Docker
- **Instance Type**: Free or Starter ($7/month)

**Build & Deploy:**
- **Dockerfile Path**: `packages/api/Dockerfile`
- **Docker Build Context Directory**: `.` (repository root)

### 3. Environment Variables

Click **"Advanced"** → **"Add Environment Variable"** and add:

| Key | Value | Example |
|-----|-------|---------|
| `SUPABASE_URL` | Your Supabase project URL | `https://xxx.supabase.co` |
| `SUPABASE_ANON_KEY` | Your Supabase anon key | `eyJhbG...` |
| `API_URL` | Your Render URL (get after deploy) | `https://super-repo-api.onrender.com` |
| `PORT` | Auto-set by Render | Leave empty |

> **Note**: After first deployment, go back and update `API_URL` with your actual Render URL

### 4. Deploy

1. Click **"Create Web Service"**
2. Wait for build to complete (5-10 minutes first time)
3. Check logs for any errors

### 5. Verify Deployment

Once deployed, visit:
- `https://your-app.onrender.com/` - Website
- `https://your-app.onrender.com/api` - Swagger docs
- `https://your-app.onrender.com/health` - Health check

## Troubleshooting

### Build Fails

- Check **Logs** tab in Render dashboard
- Verify Dockerfile path is correct: `packages/api/Dockerfile`
- Ensure Docker Build Context is repository root (`.`)

### Runtime Errors

- Check **Logs** tab for error messages
- Verify environment variables are set correctly
- Ensure Supabase credentials are valid

### Website Not Loading

- Verify `packages/api/public/` contains website files
- Check that `@fastify/static` plugin is registered in `src/index.ts`

## Free Tier Limitations

- Services spin down after 15 minutes of inactivity
- First request after spin down takes ~30 seconds
- 750 hours/month free (one service running 24/7)

## Updates

To deploy changes:
1. Push to GitHub
2. Render auto-deploys from your connected branch
3. Or manually deploy from the Render dashboard

## Custom Domain (Optional)

1. Go to your service → **Settings** → **Custom Domain**
2. Add your domain
3. Update DNS records as instructed
