# DownloadSIM Backend

Backend API proxy for secure eSIMaccess API calls.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory with your API key:
```
ESIM_ACCESS_API_KEY=your_actual_api_key_here
```

**Important:** Never commit the `.env` file to GitHub! It's already in `.gitignore`.

### 3. Deploy to Netlify

#### Option A: Connect via GitHub (Recommended)
1. Push this repository to your `v1GithubStoreoffice` GitHub repo
2. Go to [Netlify](https://app.netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Select GitHub and choose `v1GithubStoreoffice`
5. Configure build settings:
   - **Base directory:** (leave blank)
   - **Build command:** (leave blank)
   - **Publish directory:** (leave blank)
6. Add environment variable in Netlify dashboard:
   - Go to Site settings → Environment variables
   - Add `ESIM_ACCESS_API_KEY` with your actual API key value
7. Deploy!

#### Option B: Manual Deploy with Netlify CLI
```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

Don't forget to add the environment variable in Netlify dashboard!

## API Endpoints

Once deployed, your function will be available at:
```
https://your-domain.netlify.app/.netlify/functions/esim-search
```

Or with custom domain:
```
https://admin.downloadsim.com/.netlify/functions/esim-search
```

### Request Format

**GET Request:**
```
GET /.netlify/functions/esim-search?locationCode=US&dataMin=1&dataMax=10
```

**POST Request:**
```json
POST /.netlify/functions/esim-search
Content-Type: application/json

{
  "locationCode": "US",
  "dataMin": 1,
  "dataMax": 10
}
```

### Response Format
```json
{
  "success": true,
  "data": [...],
  "message": "Success"
}
```

## Local Development

```bash
npm run dev
```

This starts Netlify Dev on `http://localhost:8888`

Test your function at:
```
http://localhost:8888/.netlify/functions/esim-search
```

## Security Notes

- API key is stored securely in environment variables
- Never commit `.env` file to version control
- CORS is enabled for all origins (restrict in production if needed)
- All API calls are proxied through Netlify Functions
