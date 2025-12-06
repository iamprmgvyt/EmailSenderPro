/**
 * @file send-test-email.js
 * @description A sample Node.js script to send an email using the EmailSenderPro API.
 *
 * How to use:
 * 1. Make sure your EmailSenderPro application has been deployed (e.g., to Vercel).
 * 2. Update the `API_KEY` variable below with the API key from your dashboard.
 * 3. Update the `API_HOSTNAME` if your deployment URL is different.
 * 4. Run the script from your terminal: `node send-test-email.js`
 */

// Use Node.js's built-in 'https' library to make HTTP requests to the deployed app.
const https = require('https');

// --- Configuration ---
// Replace with your actual API key from the EmailSenderPro dashboard.
const API_KEY = 'YOUR_API_KEY_HERE'; 

// URL of the deployed API. If you have a custom domain, change it here.
const API_HOSTNAME = 'emailsenderpro.vercel.app';
const API_PORT = 443; // Default port for HTTPS
const API_PATH = '/api/send-email';

// --- Email Details ---
const emailDetails = {
  to: 'recipient@example.com', // Recipient's email address.
  subject: 'Hello from Node.js!', // Email subject.
  body: '<h1>EmailSenderPro is awesome!</h1><p>This email was sent using a <strong>Node.js</strong> script.</p>' // Email body (can be HTML).
};

// --- Do not edit below this line ---

console.log('Preparing to send email to deployed API...');

// Convert the email details object into a JSON string.
const data = JSON.stringify(emailDetails);

// Define the options for the HTTP request.
const requestOptions = {
  hostname: API_HOSTNAME,
  port: API_PORT,
  path: API_PATH,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY, // The crucial authentication header!
    'Content-Length': Buffer.byteLength(data)
  },
};

// Create the request.
const req = https.request(requestOptions, (res) => {
  let responseBody = '';

  console.log(`Response Status: ${res.statusCode}`);
  
  // Listen for response data from the server.
  res.on('data', (chunk) => {
    responseBody += chunk;
  });

  // When the response is complete.
  res.on('end', () => {
    try {
      const parsedResponse = JSON.parse(responseBody);
      if (res.statusCode === 200) {
        console.log('✅ Email sent successfully!');
        console.log('Server Response:', parsedResponse);
      } else {
        console.error(`❌ Failed to send email. Status Code: ${res.statusCode}`);
        console.error('Server Error:', parsedResponse);
      }
    } catch (e) {
      console.error('Could not parse JSON response:', responseBody);
    }
  });
});

// Handle network errors.
req.on('error', (error) => {
  console.error('An error occurred with the request:', error.message);
  console.error(`Please make sure the EmailSenderPro server is deployed and accessible at https://${API_HOSTNAME}`);
});

// Send the request body data.
req.write(data);

// Finalize the request.
req.end();
