/**
 * @file This script has been converted into a long-running worker.
 * It periodically sends an email using the EmailSenderPro API.
 *
 * How to use:
 * 1. Make sure your EmailSenderPro application has been deployed.
 * 2. Update `API_KEY` and `API_HOSTNAME` with your actual deployment details.
 * 3. Configure the `RECIPIENT_EMAIL` and the `SEND_INTERVAL_MINUTES`.
 * 4. Run the script from your terminal: `node emailsenderpro.js`
 *    The script will run indefinitely, sending an email at the specified interval.
 */

const https = require('https');

// --- Configuration ---
const API_KEY = 'YOUR_API_KEY_HERE'; 
const API_HOSTNAME = 'emailsenderpro.vercel.app'; // Your deployed app hostname
const RECIPIENT_EMAIL = 'recipient@example.com'; // Who to send the email to
const SEND_INTERVAL_MINUTES = 5; // How often to send an email

// --- Worker State ---
let isRateLimited = false;
let rateLimitPauseHours = 12;

// --- Do not edit below this line ---

const API_PORT = 443; // Default for HTTPS
const API_PATH = '/api/send-email';
const SEND_INTERVAL_MS = SEND_INTERVAL_MINUTES * 60 * 1000;


/**
 * The core function that sends a single email.
 */
function sendEmail() {
  const emailDetails = {
    to: RECIPIENT_EMAIL,
    subject: `Automated Test Email - ${new Date().toISOString()}`,
    body: `
      <h1>Automated Email Worker</h1>
      <p>This email was sent automatically by the EmailSenderPro worker script.</p>
      <p>Timestamp: <strong>${new Date().toUTCString()}</strong></p>
    `
  };

  const data = JSON.stringify(emailDetails);

  const requestOptions = {
    hostname: API_HOSTNAME,
    port: API_PORT,
    path: API_PATH,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      'Content-Length': Buffer.byteLength(data)
    },
  };

  console.log(`[${new Date().toISOString()}] Attempting to send email to ${RECIPIENT_EMAIL}...`);

  const req = https.request(requestOptions, (res) => {
    let responseBody = '';
    res.on('data', (chunk) => {
      responseBody += chunk;
    });

    res.on('end', () => {
      try {
        const parsedResponse = JSON.parse(responseBody);
        
        if (res.statusCode === 200) {
          console.log(`[${new Date().toISOString()}] ✅ Success! Email sent. Response:`, parsedResponse.message);
          isRateLimited = false; // Reset rate limit flag on success
        
        } else if (res.statusCode === 429) {
          console.warn(`[${new Date().toISOString()}] ⏸️ Daily limit reached. Pausing for ${rateLimitPauseHours} hours.`);
          isRateLimited = true; // Set rate limit flag
        
        } else {
          console.error(`[${new Date().toISOString()}] ❌ Failed to send email. Status: ${res.statusCode}`);
          console.error('Server Error:', parsedResponse.message || 'No message provided.');
        }
      } catch (e) {
        console.error(`[${new Date().toISOString()}] Error parsing JSON response:`, responseBody);
      }
    });
  });

  req.on('error', (error) => {
    console.error(`[${new Date().toISOString()}] ❌ Request error:`, error.message);
  });

  req.write(data);
  req.end();
}

/**
 * The main job runner. Decides whether to send an email based on the rate limit status.
 */
function emailJob() {
  if (isRateLimited) {
    console.log(`[${new Date().toISOString()}] Currently rate-limited. Skipping this cycle.`);
    return;
  }
  sendEmail();
}

/**
 * The entry point for the worker.
 */
function main() {
  if (API_KEY === 'YOUR_API_KEY_HERE') {
    console.error("🔥🔥🔥 Please update the `API_KEY` variable in the script before running! 🔥🔥🔥");
    return; // Stop execution if API key is not set
  }

  console.log("======================================");
  console.log("  EmailSenderPro Worker Initialized   ");
  console.log("======================================");
  console.log(`Host: https://${API_HOSTNAME}`);
  console.log(`Interval: ${SEND_INTERVAL_MINUTES} minutes`);
  console.log("Press Ctrl+C to stop the worker.");
  console.log("--------------------------------------");

  // Run the job immediately on start
  emailJob();

  // Then run it on the specified interval
  setInterval(emailJob, SEND_INTERVAL_MS);

  // A special interval to reset the rate-limit flag, allowing the worker to try again later.
  setInterval(() => {
    if (isRateLimited) {
      console.log(`[${new Date().toISOString()}] Resetting rate-limit flag to try again on the next cycle.`);
      isRateLimited = false;
    }
  }, rateLimitPauseHours * 60 * 60 * 1000);
}

// Start the worker
main();
