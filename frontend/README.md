# DownloadSIM Frontend

Customer-facing eSIM store frontend.

## Setup Instructions

### 1. Deploy to Netlify

#### Option A: Connect via GitHub (Recommended)
1. Push this folder contents to your `v1GithubStorefront` GitHub repo
2. Go to [Netlify](https://app.netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Select GitHub and choose `v1GithubStorefront`
5. Configure build settings:
   - **Base directory:** (leave blank)
   - **Build command:** (leave blank)
   - **Publish directory:** (leave blank)
6. Deploy!

#### Option B: Manual Deploy with Netlify CLI
```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

### 2. Configure Backend URL

Edit `index.html` line ~447 and update the API_BASE_URL:

```javascript
const API_BASE_URL = 'https://admin.downloadsim.com/.netlify/functions/esim-search';
```

Replace with your actual backend URL after deploying the backend.

### 3. Add Custom Domain

1. Go to Netlify dashboard for your site
2. Go to Domain settings
3. Click "Add custom domain"
4. Enter `shop.downloadsim.com`
5. Follow DNS configuration instructions

## Features

- ✅ Empty state on load ("Please select your travel destinations")
- ✅ Fixed header that stays visible while scrolling
- ✅ Mutually exclusive Global/Regional plan filters
- ✅ Smart sorting: Global first → by country count → slug → duration → data → price
- ✅ Multi-select country search with chips
- ✅ Product cards with key specs
- ✅ Compare checkbox (placeholder for future implementation)
- ✅ Responsive design

## File Structure

```
frontend/
├── index.html          # Main application (all-in-one file)
└── README.md          # This file
```

## Next Steps

After deployment:
1. Test the product search functionality
2. Implement the "More Info" modal with full product details
3. Implement the comparison engine
4. Integrate Stripe Checkout for purchases
5. Add order history and user accounts (optional)

## Support

For issues or questions, check the backend repository documentation or contact support.
