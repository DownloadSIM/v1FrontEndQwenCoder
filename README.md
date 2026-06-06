# Download SIM - eSIM Webstore

A production-ready eSIM resale website that integrates with eSIMaccess.com API for eSIM procurement and Stripe for payment processing.

## Features

### Customer-Facing Features
- **Multi-Select Country Search**: Select multiple travel destinations from a searchable dropdown
- **Smart Plan Filtering**: Filter by data allowance (GB), duration (days), and plan type (Global/Regional)
- **Product Comparison**: Compare up to multiple eSIM plans side-by-side with detailed specifications
- **Detailed Product Information**: 
  - Core info: package code, FUP policy, speed, IP export status, activation type
  - Data metrics: volume in GB, price per GB calculation
  - Coverage details: clickable country list showing network operators per country
  - Additional specs: data type, SMS status, top-up support
- **Responsive Design**: Mobile-friendly interface with fixed header for easy navigation
- **Smart Sorting**: Global plans first, then sorted by country count, slug, duration, data, and price

### Plan Type Filters
- **Include Global**: Show only global plans (slug starts with "GL-")
- **Exclude Global**: Hide all global plans
- **Include Regional**: Show only regional plans (2-10 countries)
- **Exclude Regional**: Hide all regional plans

### Admin & Backend Features (Planned)
- Directory hierarchy management (Continent > Subregion > Country)
- Profit margin configuration (multiplier + fixed amount)
- Scheduled purchase engine for future prepaid purchases
- Webhook handling for payment events, refunds, and notifications

## Project Structure

```
/workspace
├── index.html          # Main eSIM store frontend
├── README.md           # This file
├── CNAME               # GitHub Pages domain configuration
└── .gitignore          # Git ignore rules
```

## Prerequisites

1. **eSIMaccess.com Account**
   - Sign up at https://esimaccess.com/
   - Obtain your API key from the dashboard
   - Review API documentation: https://docs.esimaccess.com/

2. **Stripe Account**
   - Sign up at https://stripe.com/
   - Get your API keys from the Dashboard
   - Review Stripe documentation: https://docs.stripe.com/

3. **ActivePieces.com Account**
   - Sign up at https://activepieces.com/
   - Get your API keys from the Dashboard
   - Review ActivePieces documentation: https://www.activepieces.com/docs/

4. **Web Server** (for production)
   - Node.js, Python, PHP, or any backend capable of making API calls
   - HTTPS enabled for secure payment processing

## Configuration

### Step 1: Update API Keys

Open `index.html` and locate the configuration section (around line 547):

```javascript
// Configuration - Replace with your actual keys
const ESIM_ACCESS_API_KEY = 'YOUR_ESIM_ACCESS_API_KEY'; // Get from https://esimaccess.com/
const STRIPE_PUBLISHABLE_KEY = 'YOUR_STRIPE_PUBLISHABLE_KEY'; // Get from Stripe Dashboard
```

Replace the placeholder values with your actual API keys.

### Step 2: Backend Setup (Required for Production)

The current `index.html` is a frontend-only implementation. For production use, you need a backend server to:

1. **Secure API Keys**: Never expose secret keys in frontend code
2. **Create Stripe Checkout Sessions**: Handle payment processing securely
3. **Process Webhooks**: Handle payment confirmations, refunds, etc.
4. **Purchase eSIMs**: Call eSIMaccess API after successful payment

#### Example Backend Structure

```
backend/
├── server.js             # Node.js/Express server
├── routes/
│   ├── checkout.js       # Stripe checkout session creation
│   ├── webhook.js        # Stripe webhook handler
│   └── esim.js           # eSIMaccess API integration
├── config/
│   └── keys.js           # Environment variables
└── .env                  # API keys (never commit to git)
```

#### Environment Variables (.env)

```env
ESIM_ACCESS_API_KEY=your_esim_access_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
FRONTEND_URL=https://yourdomain.com
```

## Local Development

### Option 1: Simple HTTP Server

For testing the frontend only (API calls will fail without valid keys):

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (npx)
npx http-server -p 8000

# Then open http://localhost:8000 in your browser
```

### Option 2: Full Stack Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd <repo-directory>
   ```

2. **Install backend dependencies** (example for Node.js)
   ```bash
   cd backend
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open http://localhost:3000** in your browser

## Deployment

### GitHub Pages (Frontend Only)

The project includes a `CNAME` file for GitHub Pages deployment:

1. Push to GitHub repository
2. Go to Settings > Pages
3. Select your branch (usually `main` or `master`)
4. Your site will be available at `https://yourusername.github.io/repository-name`

**Note**: For production with real payments, you must deploy a backend server.

### Production Deployment Checklist

- [ ] Set up backend server (Node.js, Python, etc.)
- [ ] Configure environment variables securely
- [ ] Enable HTTPS with valid SSL certificate
- [ ] Set up Stripe webhooks endpoint
- [ ] Test payment flow in Stripe test mode
- [ ] Implement eSIM delivery mechanism (email, QR code display, etc.)
- [ ] Add error handling and logging
- [ ] Set up monitoring and alerts
- [ ] Test on multiple devices and browsers
- [ ] Comply with PCI DSS requirements (handled by Stripe Checkout)

## API Integration Details

### eSIMaccess API Endpoints

The frontend expects the following API structure:

#### Get Products/Locations
```
GET /v1/locations
Headers: Authorization: Bearer YOUR_API_KEY
Response: { products: [...] }
```

#### Search Products
```
POST /v1/products/search
Headers: Authorization: Bearer YOUR_API_KEY
Body: { locations: ["Country1", "Country2"], includeDetails: true }
Response: { products: [...] } or [products array]
```

#### Expected Product Structure
```json
{
  "slug": "GL-12345",
  "name": "Global 10GB 30 Days",
  "packageCode": "PKG-001",
  "price": 29.99,
  "trafficAllowance": "10GB",
  "duration": 30,
  "speed": "4G/5G",
  "fupPolicy": "Fair usage applies",
  "ipExport": true,
  "activeType": "Automatic",
  "dataType": "Data Only",
  "smsStatus": "Not Supported",
  "supportTopUpType": "Yes",
  "unusedValidTime": "N/A",
  "locationNetworkList": [
    {
      "locationName": "United States",
      "operatorList": [
        { "operatorName": "AT&T", "networkType": "4G/5G" },
        { "operatorName": "T-Mobile", "networkType": "4G/5G" }
      ]
    }
  ]
}
```

### Stripe Integration Flow

1. **User clicks "Buy Now"** → Frontend sends plan details to backend
2. **Backend creates Checkout Session** → Calls Stripe API
3. **Redirect to Stripe** → User completes payment
4. **Stripe webhook** → Backend receives `checkout.session.completed`
5. **Purchase eSIM** → Backend calls eSIMaccess API
6. **Deliver eSIM** → Send QR code/installation details to customer

## Customization

### Styling

Modify CSS variables in `index.html` `<style>` section to change colors:

```css
:root {
  --primary: #2563eb;        /* Main brand color */
  --primary-dark: #1d4ed8;   /* Hover state */
  --success: #10b981;        /* Buy buttons */
  --bg: #f8fafc;             /* Page background */
  --card: #fff;              /* Card backgrounds */
  --text: #0f172a;           /* Text color */
}
```

### Adding Profit Margin

To add profit margin calculations, modify the price display in `renderProductGrid()`:

```javascript
const PROFIT_MULTIPLIER = 1.2;  // 20% markup
const PROFIT_FIXED = 2.00;      // $2 fixed profit

const basePrice = parseFloat(plan.price) || 0;
const retailPrice = (basePrice * PROFIT_MULTIPLIER) + PROFIT_FIXED;
```

## Troubleshooting

### Common Issues

1. **"No plans found"**
   - Check if API key is valid
   - Verify selected countries match API location names
   - Check browser console for errors (F12)

2. **Search not working**
   - Ensure CORS is configured on backend
   - Verify API endpoint URLs
   - Check network tab for failed requests

3. **Payment not processing**
   - Confirm Stripe keys are correct
   - Verify webhook endpoint is accessible
   - Check Stripe Dashboard for errors

4. **Country dropdown empty**
   - API may have returned no data
   - Fallback list should load automatically
   - Check console for fetch errors

## Security Considerations

- **Never expose secret API keys** in frontend code
- **Use HTTPS** for all production traffic
- **Validate all inputs** on backend
- **Implement rate limiting** to prevent abuse
- **Store customer data** securely and comply with GDPR
- **Use Stripe's PCI-compliant Checkout** (do not handle raw card data)

## Future Enhancements

- [ ] Admin dashboard for managing directory hierarchy
- [ ] Scheduled purchase system for recurring trips
- [ ] Email notifications for payment receipts and upcoming charges
- [ ] Multi-language support
- [ ] Currency conversion based on user location
- [ ] Customer account system with purchase history
- [ ] Refund request handling interface
- [ ] Analytics dashboard for sales tracking

## Support & Resources

- **eSIMaccess Documentation**: https://docs.esimaccess.com/
- **eSIMaccess GitHub**: https://github.com/esimaccess/esimaccess-api
- **Stripe Documentation**: https://docs.stripe.com
- **Stripe AI Skills**: https://github.com/stripe/ai/tree/main/skills
- **ActivePieces Documentation**: https://www.activepieces.com/docs/overview/welcome
- **ActivePieces AI Skills**: https://github.com/activepieces/activepieces/tree/main/.agents/skills

## License

This project is proprietary software for Download SIM business operations.

---

**Built with ❤️ for seamless global connectivity**
