require('dotenv').config();

const axios = require('axios');

exports.handler = async (event, context) => {
  // Enable CORS for all origins (restrict in production if needed)
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const apiKey = process.env.ESIM_ACCESS_API_KEY;
    
    if (!apiKey) {
      throw new Error('ESIM_ACCESS_API_KEY not configured');
    }

    // Parse query parameters or body
    const params = event.httpMethod === 'GET' ? event.queryStringParameters : JSON.parse(event.body || '{}');
    
    // Forward request to eSIMaccess API
    const response = await axios.get('https://api.esimaccess.com/v1/products/search', {
      params: params,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response.data)
    };

  } catch (error) {
    console.error('API Error:', error.message);
    
    return {
      statusCode: error.response?.status || 500,
      headers,
      body: JSON.stringify({
        error: error.message,
        details: error.response?.data || 'Unknown error'
      })
    };
  }
};
