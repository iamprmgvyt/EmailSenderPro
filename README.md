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
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## How to Use

1.  **Sign Up**: Create a new account at `/signup`.
2.  **Log In**: Sign in to your account at `/login`.
3.  **Get Your API Key**: On the dashboard, copy your unique API key.
4.  **Send Emails**: Use your API key to make POST requests to the `/api/send-email` endpoint.

### Example API Call using cURL

```bash
curl -X POST http://localhost:9002/api/send-email \
-H "Content-Type: application/json" \
-H "x-api-key: YOUR_API_KEY_HERE" \
-d '{
  "to": "recipient@example.com",
  "subject": "Hello from EmailSenderPro!",
  "body": "This is a test email sent via the API."
}'
```

### Using the NPM Package

The file `src/lib/emailsenderpro.js` is set up to be used as a simple NPM package. Before publishing, you will need to update the `hostname` in the file to your production domain.

**Example Usage:**

```javascript
const sender = require('emailsenderpro');

sender.send({ 
  apiKey: 'YOUR_API_KEY_HERE', 
  to: 'recipient@example.com',
  subject: 'Hello World',
  body: 'This is a test email.'
});
```
