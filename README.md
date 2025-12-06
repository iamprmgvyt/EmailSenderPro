# EmailSenderPro

EmailSenderPro is a full-stack Next.js application that provides a simple and secure API for sending emails. It includes user authentication, a dashboard for API key management, and usage statistics.

## Features

- **User Authentication**: Secure sign-up and login functionality.
- **Dashboard**: View your unique API key and track your daily email sending usage.
- **API for Sending Emails**: A simple and secure REST API endpoint to send emails.
- **Email Configuration**: Set a default sender name and subject for your emails.
- **Dark Mode**: A sleek, modern interface with a toggle for light and dark themes.
- **NPM Package Example**: Includes a sample client library for easy integration into any Node.js project.

## Getting Started

Follow these instructions to get a local copy up and running.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A [MongoDB](https://www.mongodb.com/) database and its connection URI.
- A Gmail account with an **App Password**.

### 1. Clone the Repository

```bash
git clone https://github.com/iamprmgvyt/EmailSenderPro.git
cd EmailSenderPro
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a file named `.env` in the root of your project and add the following environment variables. Replace the placeholder values with your actual data.

```env
# Get your connection string from MongoDB Atlas or your local instance
MONGODB_URI="your_mongodb_connection_string"

# A strong, secret key for signing JSON Web Tokens (JWT)
# You can generate one using: openssl rand -base64 32
JWT_SECRET="your_strong_jwt_secret"

# Your Gmail address used for sending emails
EMAIL_FROM="your_email@gmail.com"

# An App Password generated from your Google Account settings
# IMPORTANT: Do not use your regular Gmail password.
# See: https://support.google.com/accounts/answer/185833
EMAIL_PASSWORD="your_app_password_here"
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## How to Use the API

1.  **Sign Up**: Create a new account at `/signup`.
2.  **Log In**: Sign in to your account at `/login`.
3.  **Get Your API Key**: On the dashboard, copy your unique API key.
4.  **Send Emails**: Use your API key to make POST requests to the `/api/send-email` endpoint.

Below are detailed examples for different languages.

---

## API Usage Examples

### JavaScript / Node.js

The file `src/lib/emailsenderpro.js` is a simple client library ready to be used in any server-side Node.js project.

**Example Usage (`send-test-email.js`):**

```javascript
// Import the library
const sender = require('./src/lib/emailsenderpro');

// Define your email options
const emailOptions = { 
  apiKey: 'YOUR_API_KEY_HERE', 
  to: 'recipient@example.com',
  subject: 'Hello from EmailSenderPro!',
  body: '<h1>Hello World</h1><p>This is a test email sent from the <b>Node.js client</b>.</p>'
};

console.log('Sending email...');

// Call the send function
sender.send(emailOptions);
```

**How it works:**

1.  **`require('emailsenderpro')`**: Imports the sending function.
2.  **`apiKey`**: Your secret API key from the dashboard. **Required**.
3.  **`to`**: The recipient's email address. **Required**.
4.  **`subject`**: The email subject line. If omitted, it will use the default subject from your dashboard settings.
5.  **`body`**: The content of the email. Can be plain text or HTML. **Required**.
6.  The function will log the response from the API to the console.

### Python

For Python, you can use the popular `requests` library to make a POST request to the API endpoint.

**1. Install `requests` library:**

If you don't have it installed, open your terminal and run:

```bash
pip install requests
```

**2. Create a Python script (`send_email.py`):**

```python
import requests
import json

# --- Configuration ---
# Replace with your actual API Key from the dashboard
API_KEY = "YOUR_API_KEY_HERE" 

# The API endpoint URL
API_URL = "http://localhost:9002/api/send-email" 

# --- Email Details ---
recipient_email = "recipient@example.com"
email_subject = "Hello from Python!"
email_body = "<h1>Hi there!</h1><p>This email was sent using a <strong>Python script</strong>.</p>"

# --- Do not edit below this line ---

# Prepare the headers with your API Key
headers = {
    "Content-Type": "application/json",
    "x-api-key": API_KEY
}

# Prepare the data payload for the API request
payload = {
    "to": recipient_email,
    "subject": email_subject,
    "body": email_body
}

print("Sending email via API...")

try:
    # Make the POST request
    response = requests.post(API_URL, headers=headers, data=json.dumps(payload))

    # Check the response from the server
    if response.status_code == 200:
        print("✅ Email sent successfully!")
        print("Response:", response.json())
    else:
        print(f"❌ Failed to send email. Status Code: {response.status_code}")
        print("Error Response:", response.json())

except requests.exceptions.RequestException as e:
    print(f"An error occurred with the request: {e}")

```

### cURL

You can also use `cURL` directly from your terminal to test the endpoint. This is great for quick checks.

```bash
curl -X POST http://localhost:9002/api/send-email \
-H "Content-Type: application/json" \
-H "x-api-key: YOUR_API_KEY_HERE" \
-d '{
  "to": "recipient@example.com",
  "subject": "Hello from cURL!",
  "body": "This is a test email sent via a cURL command."
}'
```
