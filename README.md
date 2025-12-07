# EmailSenderPro: Your Own Email Sending API Platform

**Languages:**
- [English](#english)
- [Tiếng Việt (Vietnamese)](#vietnamese)
- [Español (Spanish)](#spanish)
- [Français (French)](#french)
- [Deutsch (German)](#german)
- [简体中文 (Simplified Chinese)](#chinese)
- [日本語 (Japanese)](#japanese)

---
<h2 id="english">English</h2>

EmailSenderPro is a powerful, full-stack Next.js application that provides a simple and secure API for sending emails. It's designed for developers who need a quick solution to integrate email functionality into their projects without the hassle of complex service setups.

The application includes user authentication, a dashboard for managing API keys, usage statistics, and email customization capabilities.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fiamprmgvyt%2FEmailSenderPro)

---

## Table of Contents

1.  [Key Features](#key-features-en)
2.  [Getting Started](#getting-started-en)
    *   [Prerequisites](#prerequisites-en)
    *   [1. Clone the Repository](#1-clone-the-repository-en)
    *   [2. Install Dependencies](#2-install-dependencies-en)
    *   [3. Set Up Environment Variables](#3-set-up-environment-variables-en)
    *   [4. Run the Development Server](#4-run-the-development-server-en)
3.  [How to Use](#how-to-use-en)
4.  [API Overview](#api-overview-en)
    *   [Authentication](#authentication-en)
    *   [Endpoint: Send Email](#endpoint-send-email-en)
    *   [Common Response Codes](#common-response-codes-en)
5.  [Detailed API Usage Guide](#detailed-api-usage-guide-en)
    *   [JavaScript / Node.js Example](#javascript--nodejs-example-en)
    *   [Python Example](#python-example-en)
    *   [cURL Example](#curl-example-en)
6.  [Project Structure](#project-structure-en)
7.  [Deployment](#deployment-en)
8.  [Frequently Asked Questions (FAQ)](#frequently-asked-questions-faq-en)
9.  [License](#license-en)

---

<a name="key-features-en"></a>
## Key Features

*   🔐 **User Authentication**: Secure signup and login functionality using JWT (JSON Web Tokens).
*   🔑 **API Key Management**: Each user gets a unique API key displayed on their dashboard.
*   📊 **Usage Statistics**: Track the number of emails sent daily and the remaining quota.
*   🚀 **Email Sending API**: A simple and secure REST API endpoint (`/api/send-email`) to integrate into any application.
*   ⚙️ **Email Configuration**: Set a default sender name and subject for your emails from the dashboard.
*   🎨 **Light/Dark Mode**: A modern, beautiful interface with theme-switching capability.
*   📦 **NPM Package and Examples**: Includes a sample client library (`emailsenderpro`, v0.1.4) and detailed example files for Node.js and Python.

---

<a name="getting-started-en"></a>
## Getting Started

Follow these instructions to get a local copy up and running.

<a name="prerequisites-en"></a>
### Prerequisites

*   [Node.js](https://nodejs.org/) (v18 or higher recommended)
*   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
*   A [MongoDB](https://www.mongodb.com/) database and its connection string.
*   A Gmail account and an **App Password**.

<a name="1-clone-the-repository-en"></a>
### 1. Clone the Repository

Open your terminal and run the following command:
```bash
git clone https://github.com/iamprmgvyt/EmailSenderPro.git
cd EmailSenderPro
```

<a name="2-install-dependencies-en"></a>
### 2. Install Dependencies

Use npm (or yarn) to install all the necessary packages for the project.
```bash
npm install
```

<a name="3-set-up-environment-variables-en"></a>
### 3. Set Up Environment Variables

Create a file named `.env` in the root directory of the project and add the following environment variables. Replace the placeholder values with your actual credentials.

```env
# MONGODB_URI
# Get your connection string from MongoDB Atlas or a local instance.
# Example: "mongodb+srv://user:password@cluster0.mongodb.net/database_name"
MONGODB_URI="your_mongodb_connection_string"

# JWT_SECRET
# A strong secret key for signing JSON Web Tokens (JWT).
# You can generate one with the command: openssl rand -base64 32
JWT_SECRET="your_strong_jwt_secret"

# EMAIL_FROM
# Your Gmail address used for sending emails.
# Important: This must be the account for which you generated an App Password.
EMAIL_FROM="your_email@gmail.com"

# EMAIL_PASSWORD
# The App Password generated from your Google Account Settings.
# IMPORTANT: DO NOT use your regular Gmail password.
# See Google's guide at: https://support.google.com/accounts/answer/185833
EMAIL_PASSWORD="your_app_password_here"
```

<a name="4-run-the-development-server-en"></a>
### 4. Run the Development Server

You are now ready to start the development server.
```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) in your browser to see the result.

---

<a name="how-to-use-en"></a>
## How to Use

1.  **Sign Up**: Create a new account at `/signup`.
2.  **Log In**: Sign in to your account at `/login`.
3.  **Get API Key**: On the dashboard, copy your unique API key.
4.  **Send Email**: Use your API key to make POST requests to the `/api/send-email` endpoint. See the detailed examples below.
5.  **(Optional) Configure Email**: Visit the "Email Settings" page to set a default sender name and subject.

---

<a name="api-overview-en"></a>
## API Overview

<a name="authentication-en"></a>
### Authentication

The API uses API key-based authentication. You must provide your API key in the HTTP header of every email-sending request.

*   **Header**: `x-api-key`
*   **Value**: `YOUR_API_KEY_HERE`

<a name="endpoint-send-email-en"></a>
### Endpoint: Send Email

*   **URL**: `/api/send-email`
*   **Method**: `POST`
*   **Headers**:
    *   `Content-Type: application/json`
    *   `x-api-key: YOUR_API_KEY_HERE`
*   **Body (JSON)**:
    *   `to` (string, **required**): The recipient's email address.
    *   `body` (string, **required**): The content of the email. Can be plain text or HTML.
    *   `subject` (string, *optional*): The email subject line. If omitted, it will use the default subject from your dashboard settings.

<a name="common-response-codes-en"></a>
### Common Response Codes

*   `200 OK`: Email was sent successfully.
*   `400 Bad Request`: Missing required parameters like `to` or `body`.
*   `401 Unauthorized`: The API key is missing or invalid.
*   `429 Too Many Requests`: The daily email sending limit has been reached.
*   `500 Internal Server Error`: A server-side error occurred (e.g., incorrect email configuration).

---

<a name="detailed-api-usage-guide-en"></a>
## Detailed API Usage Guide

Here are "super-detailed" examples for different languages.

<a name="javascript--nodejs-example-en"></a>
### JavaScript / Node.js Example

This project comes with a `send-test-email.js` file in the root directory so you can test it immediately.

**How to run the example file:**

1.  Open `send-test-email.js`.
2.  Replace `YOUR_API_KEY_HERE` with your actual API key.
3.  Run the file from the terminal:
    ```bash
    node send-test-email.js
    ```

**Contents of `send-test-email.js`:**

```javascript
/**
 * @file This script has been converted into a long-running worker.
 * It periodically sends an email using the EmailSenderPro API.
 *
 * How to use:
 * 1. Make sure your EmailSenderPro application has been deployed.
 * 2. Update `API_KEY` and `API_HOSTNAME` with your actual deployment details.
 * 3. Configure the `RECIPIENT_EMAIL` and the `SEND_INTERVAL_MINUTES`.
 * 4. Run the script from your terminal: `node send-test-email.js`
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
```

<a name="python-example-en"></a>
### Python Example

We have created an example file `send_email.py` in the root directory.

**1. Install the `requests` library:**

If you don't have it already, open your terminal and run:
```bash
pip install requests
```

**2. Run the example file:**

1.  Open `send_email.py`.
2.  Replace `YOUR_API_KEY_HERE` with your actual API key.
3.  Run the file from the terminal:
    ```bash
    python send_email.py
    ```

**Contents of `send_email.py`:**
```python
# -*- coding: utf-8 -*-
"""
@file send_email.py
@description A sample Python script to send an email using the EmailSenderPro API.

How to use:
1. Make sure your EmailSenderPro application is running.
2. Install the 'requests' library if you haven't already: `pip install requests`.
3. Update the `API_KEY` variable below with the API key from your dashboard.
4. Run the script from your terminal: `python send_email.py`
"""

import requests
import json

# --- Configuration ---

# Replace with your actual API key from the EmailSenderPro dashboard.
# This is a secret, do not share it publicly.
API_KEY = "YOUR_API_KEY_HERE" 

# The API endpoint URL.
# If you are running the app on a different domain or port, update it here.
API_URL = "http://localhost:9002/api/send-email" 

# --- Email Details ---

# The recipient's email address.
recipient_email = "recipient@example.com"
# The subject line of the email.
email_subject = "Hello from Python!"
# The body of the email. You can use HTML for formatting.
email_body = "<h1>EmailSenderPro is awesome!</h1><p>This email was sent using a <strong>Python</strong> script.</p>"

# --- Do not edit below this line ---

def send_email():
    """The main function to send the email."""
    
    # Prepare the headers for the HTTP request.
    # 'Content-Type' tells the server we are sending JSON data.
    # 'x-api-key' is our custom header for authentication.
    headers = {
        "Content-Type": "application/json",
        "x-api-key": API_KEY
    }

    # Prepare the payload (body data) for the API request.
    # It must be a Python dictionary, which will then be converted to JSON.
    payload = {
        "to": recipient_email,
        "subject": email_subject,
        "body": email_body
    }

    print("Sending email via API...")

    try:
        # Make the POST request using the requests library.
        # - `url`: The endpoint to send the request to.
        # - `headers`: The prepared HTTP headers.
        # - `data`: The payload data. `json.dumps` converts the Python dict to a JSON string.
        # - `timeout`: Set a timeout (in seconds) to prevent the script from hanging indefinitely.
        response = requests.post(API_URL, headers=headers, data=json.dumps(payload), timeout=10)

        # Raise an exception if the request was unsuccessful (4xx or 5xx status codes).
        response.raise_for_status()

        # If we get here, it means the status code was 2xx.
        print("✅ Email sent successfully!")
        print("Server Response:", response.json())

    except requests.exceptions.HTTPError as http_err:
        # Handle specific HTTP errors (e.g., 401 Unauthorized, 429 Too Many Requests).
        print(f"❌ HTTP error occurred: {http_err}")
        try:
            print("Error details from server:", response.json())
        except json.JSONDecodeError:
            print("Could not parse error response from server:", response.text)
            
    except requests.exceptions.ConnectionError as conn_err:
        # Handle network problems (e.g., DNS failure, refused connection).
        print(f"❌ Connection error: Could not connect to the server at {API_URL}.")
        print("Is the EmailSenderPro server running?")

    except requests.exceptions.Timeout as timeout_err:
        # Handle if the request times out.
        print(f"❌ Timeout error: The request took too long to complete.")
        
    except requests.exceptions.RequestException as e:
        # Catch any other exceptions from the requests library.
        print(f"❌ An unknown error occurred with the request: {e}")

if __name__ == "__main__":
    if API_KEY == "YOUR_API_KEY_HERE":
        print("🔥🔥🔥 Please update the `API_KEY` variable in the send_email.py file with your actual API key! 🔥🔥🔥")
    else:
        send_email()
```

<a name="curl-example-en"></a>
### cURL Example

You can also use `cURL` directly from your terminal to test the endpoint. This is great for a quick check.

```bash
# cURL command to send an email
# -X POST: Specifies the request method as POST.
# -H: Adds a header to the request. We need two: Content-Type and x-api-key.
# -d: The data (body) of the request. It must be a valid JSON string.
curl -X POST http://localhost:9002/api/send-email \
-H "Content-Type: application/json" \
-H "x-api-key: YOUR_API_KEY_HERE" \
-d '{
  "to": "recipient@example.com",
  "subject": "Hello from cURL!",
  "body": "This is a test email sent via a cURL command."
}'
```

---

<a name="project-structure-en"></a>
## Project Structure

Here is an overview of the project's file and directory structure:

```
/
├── .env                  # Environment variables file (needs to be created)
├── .eslintrc.json        # ESLint configuration
├── .gitignore            # Files and folders ignored by Git
├── next.config.js        # Next.js configuration
├── package.json          # List of dependencies and scripts
├── README.md             # The file you are reading
├── tsconfig.json         # TypeScript configuration
│
├── public/               # Contains static assets
│
└── src/
    ├── app/              # Next.js App Router
    │   ├── api/          # Application API routes
    │   ├── dashboard/    # Pages and layouts for the dashboard
    │   ├── (pages)/      # Other pages like login, signup
    │   ├── globals.css   # Global CSS and theme color variables
    │   └── layout.tsx    # Root layout of the application
    │
    ├── components/       # Reusable React components
    │   └── ui/           # Components from the ShadCN/UI library
    │
    ├── context/          # React Context (e.g., AuthContext)
    │
    ├── hooks/            # Custom hooks (e.g., useAuth, useToast)
    │
    ├── lib/              # Utility functions, DB connection, etc.
    │   └── emailsenderpro.js # Node.js client library
    │
    └── models/           # Mongoose schemas and models for MongoDB
        └── User.ts       # Schema for the user
```

---

<a name="deployment-en"></a>
## Deployment

The easiest way to deploy your EmailSenderPro application is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

1.  Click the "Deploy with Vercel" button at the top of this README.
2.  Connect your GitHub account and clone this repository.
3.  In the project settings on Vercel, navigate to the "Environment Variables" tab and add all the variables from your `.env` file.
4.  Vercel will automatically build and deploy your application.

---

<a name="frequently-asked-questions-faq-en"></a>
## Frequently Asked Questions (FAQ)

**1. Why do I need to use an "App Password" instead of my regular Gmail password?**
*   This is a crucial security measure. An App Password is a 16-digit one-time password that grants an application access to your Google account. It is much more secure than storing your primary password directly in the `.env` file, as you can revoke its access at any time without affecting your main password.

**2. What is the daily email sending limit?**
*   By default, the limit is set to 10 emails per day per user. You can change the `DAILY_LIMIT` constant in `src/app/api/send-email/route.ts` if you wish.

**3. Can I use an email provider other than Gmail?**
*   Absolutely! You will need to change the `nodemailer` configuration in `src/app/api/send-email/route.ts`. Instead of `service: 'gmail'`, you will need to provide the `host`, `port`, and `secure` information for your other provider's SMTP server.

---

<a name="license-en"></a>
## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for details.

---
---
<h2 id="vietnamese">Tiếng Việt (Vietnamese)</h2>

# EmailSenderPro: Nền tảng gửi Email API của riêng bạn

EmailSenderPro là một ứng dụng Next.js full-stack mạnh mẽ, cung cấp một API đơn giản và an toàn để gửi email. Nó được thiết kế cho các nhà phát triển cần một giải pháp nhanh chóng để tích hợp chức năng email vào dự án của họ mà không cần phải thiết lập các dịch vụ phức tạp.

Ứng dụng bao gồm xác thực người dùng, bảng điều khiển để quản lý khóa API, thống kê sử dụng, và khả năng tùy chỉnh email.

[![Triển khai với Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fiamprmgvyt%2FEmailSenderPro)

---

## Mục lục

1.  [Tính năng chính](#tính-năng-chính-vi)
2.  [Bắt đầu](#bắt-đầu-vi)
    *   [Yêu cầu tiên quyết](#yêu-cầu-tiên-quyết-vi)
    *   [1. Sao chép Repository](#1-sao-chép-repository-vi)
    *   [2. Cài đặt Dependencies](#2-cài-đặt-dependencies-vi)
    *   [3. Thiết lập Biến môi trường](#3-thiết-lập-biến-môi-trường-vi)
    *   [4. Chạy Development Server](#4-chạy-development-server-vi)
3.  [Cách sử dụng](#cách-sử-dụng-vi)
4.  [Tổng quan về API](#tổng-quan-về-api-vi)
    *   [Xác thực](#xác-thực-vi)
    *   [Endpoint: Gửi Email](#endpoint-gửi-email-vi)
    *   [Các mã phản hồi phổ biến](#các-mã-phản-hồi-phổ-biến-vi)
5.  [Hướng dẫn sử dụng API chi tiết](#hướng-dẫn-sử-dụng-api-chi-tiết-vi)
    *   [Ví dụ JavaScript / Node.js](#ví-dụ-javascript--nodejs-vi)
    *   [Ví dụ Python](#ví-dụ-python-vi)
    *   [Ví dụ cURL](#ví-dụ-curl-vi)
6.  [Cấu trúc dự án](#cấu-trúc-dự-án-vi)
7.  [Triển khai](#triển-khai-vi)
8.  [Câu hỏi thường gặp (FAQ)](#câu-hỏi-thường-gặp-faq-vi)
9.  [Giấy phép](#giấy-phép-vi)

---

<a name="tính-năng-chính-vi"></a>
## Tính năng chính

*   🔐 **Xác thực người dùng**: Chức năng đăng ký và đăng nhập an toàn sử dụng JWT (JSON Web Tokens).
*   🔑 **Quản lý Khóa API**: Mỗi người dùng có một khóa API duy nhất được hiển thị trên bảng điều khiển.
*   📊 **Thống kê sử dụng**: Theo dõi số lượng email đã gửi hàng ngày và giới hạn còn lại.
*   🚀 **API Gửi Email**: Một endpoint REST API đơn giản và an toàn (`/api/send-email`) để tích hợp vào bất kỳ ứng dụng nào.
*   ⚙️ **Cấu hình Email**: Đặt tên người gửi và tiêu đề mặc định cho email của bạn từ bảng điều khiển.
*   🎨 **Chế độ Sáng/Tối**: Giao diện hiện đại, đẹp mắt với khả năng chuyển đổi chủ đề.
*   📦 **Gói NPM và Ví dụ**: Bao gồm một thư viện client mẫu (`emailsenderpro`, v0.1.4) và các tệp ví dụ chi tiết cho Node.js và Python.

---

<a name="bắt-đầu-vi"></a>
## Bắt đầu

Làm theo các hướng dẫn sau để có một bản sao cục bộ và chạy ứng dụng.

<a name="yêu-cầu-tiên-quyết-vi"></a>
### Yêu cầu tiên quyết

*   [Node.js](https://nodejs.org/) (khuyến nghị v18 trở lên)
*   [npm](https://www.npmjs.com/) hoặc [yarn](https://yarnpkg.com/)
*   Một cơ sở dữ liệu [MongoDB](https://www.mongodb.com/) và chuỗi kết nối của nó.
*   Một tài khoản Gmail và một **Mật khẩu ứng dụng**.

<a name="1-sao-chép-repository-vi"></a>
### 1. Sao chép Repository

Mở terminal của bạn và chạy lệnh sau:
```bash
git clone https://github.com/iamprmgvyt/EmailSenderPro.git
cd EmailSenderPro
```

<a name="2-cài-đặt-dependencies-vi"></a>
### 2. Cài đặt Dependencies

Sử dụng npm (hoặc yarn) để cài đặt tất cả các gói cần thiết cho dự án.
```bash
npm install
```

<a name="3-thiết-lập-biến-môi-trường-vi"></a>
### 3. Thiết lập Biến môi trường

Tạo một tệp có tên `.env` trong thư mục gốc của dự án và thêm các biến môi trường sau. Thay thế các giá trị giữ chỗ bằng dữ liệu thực tế của bạn.

```env
# MONGODB_URI
# Lấy chuỗi kết nối của bạn từ MongoDB Atlas hoặc phiên bản cục bộ.
# Ví dụ: "mongodb+srv://user:password@cluster0.mongodb.net/database_name"
MONGODB_URI="your_mongodb_connection_string"

# JWT_SECRET
# Một khóa bí mật mạnh để ký JSON Web Tokens (JWT).
# Bạn có thể tạo một khóa bằng lệnh: openssl rand -base64 32
JWT_SECRET="your_strong_jwt_secret"

# EMAIL_FROM
# Địa chỉ Gmail của bạn được sử dụng để gửi email.
# Quan trọng: Đây phải là tài khoản mà bạn đã tạo Mật khẩu ứng dụng.
EMAIL_FROM="your_email@gmail.com"

# EMAIL_PASSWORD
# Mật khẩu ứng dụng được tạo từ Cài đặt Tài khoản Google của bạn.
# QUAN TRỌNG: KHÔNG sử dụng mật khẩu Gmail thông thường của bạn.
# Xem hướng dẫn của Google tại: https://support.google.com/accounts/answer/185833
EMAIL_PASSWORD="your_app_password_here"
```

<a name="4-chạy-development-server-vi"></a>
### 4. Chạy Development Server

Bây giờ bạn đã sẵn sàng để khởi động máy chủ phát triển.
```bash
npm run dev
```

Mở [http://localhost:9002](http://localhost:9002) trên trình duyệt của bạn để xem kết quả.

---

<a name="cách-sử-dụng-vi"></a>
## Cách sử dụng

1.  **Đăng ký**: Tạo một tài khoản mới tại `/signup`.
2.  **Đăng nhập**: Đăng nhập vào tài khoản của bạn tại `/login`.
3.  **Lấy Khóa API**: Trên bảng điều khiển, sao chép khóa API duy nhất của bạn.
4.  **Gửi Email**: Sử dụng khóa API của bạn để thực hiện các yêu cầu POST đến endpoint `/api/send-email`. Xem các ví dụ chi tiết bên dưới.
5.  **(Tùy chọn) Cấu hình Email**: Truy cập trang "Email Settings" để đặt tên người gửi và tiêu đề mặc định.

---

<a name="tổng-quan-về-api-vi"></a>
## Tổng quan về API

<a name="xác-thực-vi"></a>
### Xác thực

API sử dụng xác thực bằng khóa API. Bạn phải cung cấp khóa API của mình trong header HTTP của mỗi yêu cầu gửi email.

*   **Header**: `x-api-key`
*   **Giá trị**: `YOUR_API_KEY_HERE`

<a name="endpoint-gửi-email-vi"></a>
### Endpoint: Gửi Email

*   **URL**: `/api/send-email`
*   **Phương thức**: `POST`
*   **Header**:
    *   `Content-Type: application/json`
    *   `x-api-key: YOUR_API_KEY_HERE`
*   **Body (JSON)**:
    *   `to` (string, **bắt buộc**): Địa chỉ email của người nhận.
    *   `body` (string, **bắt buộc**): Nội dung của email. Có thể là văn bản thuần túy hoặc HTML.
    *   `subject` (string, *tùy chọn*): Dòng tiêu đề email. Nếu bỏ qua, nó sẽ sử dụng tiêu đề mặc định từ cài đặt trên bảng điều khiển của bạn.

<a name="các-mã-phản-hồi-phổ-biến-vi"></a>
### Các mã phản hồi phổ biến

*   `200 OK`: Email đã được gửi thành công.
*   `400 Bad Request`: Thiếu các tham số bắt buộc như `to` hoặc `body`.
*   `401 Unauthorized`: Khóa API bị thiếu hoặc không hợp lệ.
*   `429 Too Many Requests`: Đã đạt đến giới hạn gửi email hàng ngày.
*   `500 Internal Server Error`: Đã xảy ra lỗi phía máy chủ (ví dụ: cấu hình email sai).

---

<a name="hướng-dẫn-sử-dụng-api-chi-tiết-vi"></a>
## Hướng dẫn sử dụng API chi tiết

Dưới đây là các ví dụ "siêu chi tiết" cho các ngôn ngữ khác nhau.

<a name="ví-dụ-javascript--nodejs-vi"></a>
### Ví dụ JavaScript / Node.js

Dự án này đi kèm với một tệp `send-test-email.js` ở thư mục gốc để bạn có thể thử nghiệm ngay lập tức.

**Cách chạy tệp ví dụ:**

1.  Mở `send-test-email.js`.
2.  Thay thế `YOUR_API_KEY_HERE` bằng khóa API thực tế của bạn.
3.  Chạy tệp từ terminal:
    ```bash
    node send-test-email.js
    ```

**Nội dung `send-test-email.js`:**

```javascript
/**
 * @file This script has been converted into a long-running worker.
 * It periodically sends an email using the EmailSenderPro API.
 *
 * How to use:
 * 1. Make sure your EmailSenderPro application has been deployed.
 * 2. Update `API_KEY` and `API_HOSTNAME` with your actual deployment details.
 * 3. Configure the `RECIPIENT_EMAIL` and the `SEND_INTERVAL_MINUTES`.
 * 4. Run the script from your terminal: `node send-test-email.js`
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
```

<a name="ví-dụ-python-vi"></a>
### Ví dụ Python

Chúng tôi đã tạo một tệp ví dụ `send_email.py` trong thư mục gốc.

**1. Cài đặt thư viện `requests`:**

Nếu bạn chưa có, hãy mở terminal và chạy:
```bash
pip install requests
```

**2. Chạy tệp ví dụ:**

1.  Mở `send_email.py`.
2.  Thay thế `YOUR_API_KEY_HERE` bằng khóa API thực tế của bạn.
3.  Chạy tệp từ terminal:
    ```bash
    python send_email.py
    ```

**Nội dung `send_email.py`:**
```python
# -*- coding: utf-8 -*-
"""
@file send_email.py
@description Một tập lệnh Python mẫu để gửi email bằng API EmailSenderPro.

Cách sử dụng:
1. Đảm bảo rằng ứng dụng EmailSenderPro của bạn đang chạy.
2. Cài đặt thư viện 'requests' nếu bạn chưa có: `pip install requests`.
3. Cập nhật biến `API_KEY` bên dưới bằng khóa API từ bảng điều khiển của bạn.
4. Chạy tập lệnh từ terminal: `python send_email.py`
"""

import requests
import json

# --- Cấu hình ---

# Thay thế bằng khóa API thực tế từ bảng điều khiển EmailSenderPro của bạn.
# Đây là thông tin bí mật, đừng chia sẻ nó công khai.
API_KEY = "YOUR_API_KEY_HERE" 

# URL endpoint của API.
# Nếu bạn đang chạy ứng dụng trên một tên miền hoặc cổng khác, hãy cập nhật ở đây.
API_URL = "http://localhost:9002/api/send-email" 

# --- Chi tiết Email ---

# Địa chỉ email của người nhận.
recipient_email = "recipient@example.com"
# Dòng tiêu đề của email.
email_subject = "Xin chào từ Python!"
# Nội dung của email. Bạn có thể sử dụng mã HTML để định dạng.
email_body = "<h1>EmailSenderPro thật tuyệt vời!</h1><p>Email này được gửi bằng một tập lệnh <strong>Python</strong>.</p>"

# --- Không chỉnh sửa bên dưới dòng này ---

def send_email():
    """Hàm chính để gửi email."""
    
    # Chuẩn bị header cho yêu cầu HTTP.
    # 'Content-Type' cho máy chủ biết chúng ta đang gửi dữ liệu JSON.
    # 'x-api-key' là header tùy chỉnh để xác thực.
    headers = {
        "Content-Type": "application/json",
        "x-api-key": API_KEY
    }

    # Chuẩn bị payload (dữ liệu body) cho yêu cầu API.
    # Nó phải là một từ điển Python, sau đó sẽ được chuyển đổi thành JSON.
    payload = {
        "to": recipient_email,
        "subject": email_subject,
        "body": email_body
    }

    print("Đang gửi email qua API...")

    try:
        # Thực hiện yêu cầu POST bằng thư viện requests.
        # - `url`: Endpoint để gửi yêu cầu đến.
        # - `headers`: Header HTTP đã chuẩn bị.
        # - `data`: Dữ liệu payload. `json.dumps` chuyển đổi từ điển Python thành chuỗi JSON.
        # - `timeout`: Đặt thời gian chờ (tính bằng giây) để tránh tập lệnh bị treo vô thời hạn.
        response = requests.post(API_URL, headers=headers, data=json.dumps(payload), timeout=10)

        # Nâng cao một ngoại lệ nếu yêu cầu không thành công (mã trạng thái 4xx hoặc 5xx).
        response.raise_for_status()

        # Nếu chúng ta đến đây, có nghĩa là mã trạng thái là 2xx.
        print("✅ Email đã được gửi thành công!")
        print("Phản hồi từ máy chủ:", response.json())

    except requests.exceptions.HTTPError as http_err:
        # Xử lý các lỗi HTTP cụ thể (ví dụ: 401 Unauthorized, 429 Too Many Requests).
        print(f"❌ Lỗi HTTP xảy ra: {http_err}")
        try:
            print("Chi tiết lỗi từ máy chủ:", response.json())
        except json.JSONDecodeError:
            print("Không thể phân tích phản hồi lỗi từ máy chủ:", response.text)
            
    except requests.exceptions.ConnectionError as conn_err:
        # Xử lý các sự cố mạng (ví dụ: DNS thất bại, từ chối kết nối).
        print(f"❌ Lỗi kết nối: Không thể kết nối đến máy chủ tại {API_URL}.")
        print("Hãy đảm bảo rằng máy chủ EmailSenderPro đang chạy.")

    except requests.exceptions.Timeout as timeout_err:
        # Xử lý nếu yêu cầu hết thời gian chờ.
        print(f"❌ Lỗi hết thời gian chờ: Yêu cầu mất quá nhiều thời gian để hoàn thành.")
        
    except requests.exceptions.RequestException as e:
        # Bắt tất cả các ngoại lệ khác từ thư viện requests.
        print(f"❌ Đã xảy ra lỗi không xác định với yêu cầu: {e}")

if __name__ == "__main__":
    if API_KEY == "YOUR_API_KEY_HERE":
        print("🔥🔥🔥 Vui lòng cập nhật biến `API_KEY` trong tệp send_email.py bằng khóa API thực tế của bạn! 🔥🔥🔥")
    else:
        send_email()
```

<a name="ví-dụ-curl-vi"></a>
### Ví dụ cURL

Bạn cũng có thể sử dụng `cURL` trực tiếp từ terminal để kiểm tra endpoint. Điều này rất tuyệt vời để kiểm tra nhanh.

```bash
# Lệnh cURL để gửi email
# -X POST: Chỉ định phương thức yêu cầu là POST.
# -H: Thêm một header vào yêu cầu. Chúng ta cần hai header: Content-Type và x-api-key.
# -d: Dữ liệu (body) của yêu cầu. Nó phải là một chuỗi JSON hợp lệ.
curl -X POST http://localhost:9002/api/send-email \
-H "Content-Type: application/json" \
-H "x-api-key: YOUR_API_KEY_HERE" \
-d '{
  "to": "recipient@example.com",
  "subject": "Xin chào từ cURL!",
  "body": "Đây là một email thử nghiệm được gửi qua lệnh cURL."
}'
```

---

<a name="cấu-trúc-dự-án-vi"></a>
## Cấu trúc dự án

Dưới đây là tổng quan về cấu trúc thư mục và tệp của dự án:

```
/
├── .env                  # Tệp biến môi trường (cần được tạo)
├── .eslintrc.json        # Cấu hình ESLint
├── .gitignore            # Các tệp và thư mục được Git bỏ qua
├── next.config.js        # Cấu hình Next.js
├── package.json          # Danh sách dependencies và scripts
├── README.md             # Tệp bạn đang đọc
├── tsconfig.json         # Cấu hình TypeScript
│
├── public/               # Chứa các tài sản tĩnh
│
└── src/
    ├── app/              # App Router của Next.js
    │   ├── api/          # Các API route của ứng dụng
    │   ├── dashboard/    # Các trang và layout cho bảng điều khiển
    │   ├── (các trang)/ # Các trang khác như login, signup
    │   ├── globals.css   # CSS toàn cục và biến màu theme
    │   └── layout.tsx    # Layout gốc của ứng dụng
    │
    ├── components/       # Các component React tái sử dụng
    │   └── ui/           # Các component từ thư viện ShadCN/UI
    │
    ├── context/          # React Context (ví dụ: AuthContext)
    │
    ├── hooks/            # Các custom hook (ví dụ: useAuth, useToast)
    │
    ├── lib/              # Các hàm tiện ích, kết nối CSDL, v.v.
    │   └── emailsenderpro.js # Thư viện client Node.js
    │
    └── models/           # Các schema và model của Mongoose cho MongoDB
        └── User.ts       # Schema cho người dùng
```

---

<a name="triển-khai-vi"></a>
## Triển khai

Cách dễ nhất để triển khai ứng dụng EmailSenderPro của bạn là sử dụng [Nền tảng Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

1.  Nhấp vào nút "Deploy with Vercel" ở đầu tệp README này.
2.  Kết nối tài khoản GitHub của bạn và sao chép repository này.
3.  Trong cài đặt dự án trên Vercel, điều hướng đến tab "Environment Variables" và thêm tất cả các biến từ tệp `.env` của bạn.
4.  Vercel sẽ tự động build và triển khai ứng dụng của bạn.

---

<a name="câu-hỏi-thường-gặp-faq-vi"></a>
## Câu hỏi thường gặp (FAQ)

**1. Tại sao tôi cần sử dụng "Mật khẩu ứng dụng" thay vì mật khẩu Gmail thông thường?**
*   Đây là một biện pháp bảo mật quan trọng. Mật khẩu ứng dụng là một mật khẩu 16 ký tự dùng một lần, cấp cho ứng dụng quyền truy cập vào tài khoản Google của bạn. Nó an toàn hơn nhiều so với việc lưu trữ mật khẩu chính của bạn trực tiếp trong tệp `.env`, vì bạn có thể thu hồi quyền truy cập của nó bất kỳ lúc nào mà không ảnh hưởng đến mật khẩu chính của bạn.

**2. Giới hạn gửi email hàng ngày là bao nhiêu?**
*   Theo mặc định, giới hạn được đặt là 10 email mỗi ngày cho mỗi người dùng. Bạn có thể thay đổi hằng số `DAILY_LIMIT` trong `src/app/api/send-email/route.ts` nếu muốn.

**3. Tôi có thể sử dụng nhà cung cấp email khác ngoài Gmail không?**
*   Hoàn toàn có thể! Bạn sẽ cần phải thay đổi cấu hình `nodemailer` trong `src/app/api/send-email/route.ts`. Thay vì `service: 'gmail'`, bạn sẽ cần cung cấp thông tin `host`, `port`, và `secure` cho máy chủ SMTP của nhà cung cấp khác.

---

<a name="giấy-phép-vi"></a>
## Giấy phép

Dự án này được cấp phép theo Giấy phép MIT. Xem tệp [LICENSE](LICENSE.md) để biết chi tiết.

---
---
<h2 id="spanish">Español (Spanish)</h2>

# EmailSenderPro: Su propia plataforma de API para envío de correos electrónicos

EmailSenderPro es una potente aplicación Next.js full-stack que proporciona una API simple y segura para enviar correos electrónicos. Está diseñada para desarrolladores que necesitan una solución rápida para integrar la funcionalidad de correo electrónico en sus proyectos sin la molestia de configuraciones de servicios complejas.

La aplicación incluye autenticación de usuarios, un panel de control para gestionar claves de API, estadísticas de uso y capacidades de personalización de correos electrónicos.

[![Implementar con Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fiamprmgvyt%2FEmailSenderPro)

---

## Tabla de Contenidos

1.  [Características Principales](#características-principales-es)
2.  [Para Empezar](#para-empezar-es)
    *   [Prerrequisitos](#prerrequisitos-es)
    *   [1. Clonar el Repositorio](#1-clonar-el-repositorio-es)
    *   [2. Instalar Dependencias](#2-instalar-dependencias-es)
    *   [3. Configurar Variables de Entorno](#3-configurar-variables-de-entorno-es)
    *   [4. Ejecutar el Servidor de Desarrollo](#4-ejecutar-el-servidor-de-desarrollo-es)
3.  [Cómo Usar](#cómo-usar-es)
4.  [Resumen de la API](#resumen-de-la-api-es)
    *   [Autenticación](#autenticación-es)
    *   [Endpoint: Enviar Correo](#endpoint-enviar-correo-es)
    *   [Códigos de Respuesta Comunes](#códigos-de-respuesta-comunes-es)
5.  [Guía Detallada de Uso de la API](#guía-detallada-de-uso-de-la-api-es)
    *   [Ejemplo en JavaScript / Node.js](#ejemplo-en-javascript--nodejs-es)
    *   [Ejemplo en Python](#ejemplo-en-python-es)
    *   [Ejemplo con cURL](#ejemplo-con-curl-es)
6.  [Estructura del Proyecto](#estructura-del-proyecto-es)
7.  [Despliegue](#despliegue-es)
8.  [Preguntas Frecuentes (FAQ)](#preguntas-frecuentes-faq-es)
9.  [Licencia](#licencia-es)

---

<a name="características-principales-es"></a>
## Características Principales

*   🔐 **Autenticación de Usuario**: Funcionalidad segura de registro e inicio de sesión usando JWT (JSON Web Tokens).
*   🔑 **Gestión de Claves de API**: Cada usuario obtiene una clave de API única que se muestra en su panel de control.
*   📊 **Estadísticas de Uso**: Rastrea el número de correos enviados diariamente y la cuota restante.
*   🚀 **API de Envío de Correo**: Un endpoint de API REST simple y seguro (`/api/send-email`) para integrar en cualquier aplicación.
*   ⚙️ **Configuración de Correo**: Establece un nombre de remitente y asunto predeterminados para tus correos desde el panel de control.
*   🎨 **Modo Claro/Oscuro**: Una interfaz moderna y atractiva con capacidad de cambio de tema.
*   📦 **Paquete NPM y Ejemplos**: Incluye una biblioteca cliente de muestra (`emailsenderpro`, v0.1.4) y archivos de ejemplo detallados para Node.js y Python.

---

<a name="para-empezar-es"></a>
## Para Empezar

Siga estas instrucciones para tener una copia local en funcionamiento.

<a name="prerrequisitos-es"></a>
### Prerrequisitos

*   [Node.js](https://nodejs.org/) (se recomienda v18 o superior)
*   [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)
*   Una base de datos [MongoDB](https://www.mongodb.com/) y su cadena de conexión.
*   Una cuenta de Gmail y una **Contraseña de Aplicación**.

<a name="1-clonar-el-repositorio-es"></a>
### 1. Clonar el Repositorio

Abra su terminal y ejecute el siguiente comando:
```bash
git clone https://github.com/iamprmgvyt/EmailSenderPro.git
cd EmailSenderPro
```

<a name="2-instalar-dependencias-es"></a>
### 2. Instalar Dependencias

Use npm (o yarn) para instalar todos los paquetes necesarios para el proyecto.
```bash
npm install
```

<a name="3-configurar-variables-de-entorno-es"></a>
### 3. Configurar Variables de Entorno

Cree un archivo llamado `.env` en el directorio raíz del proyecto y agregue las siguientes variables de entorno. Reemplace los valores de marcador de posición con sus credenciales reales.

```env
# MONGODB_URI
# Obtenga su cadena de conexión de MongoDB Atlas o una instancia local.
# Ejemplo: "mongodb+srv://usuario:contraseña@cluster0.mongodb.net/nombre_base_datos"
MONGODB_URI="su_cadena_de_conexion_mongodb"

# JWT_SECRET
# Una clave secreta fuerte para firmar JSON Web Tokens (JWT).
# Puede generar una con el comando: openssl rand -base64 32
JWT_SECRET="su_secreto_jwt_fuerte"

# EMAIL_FROM
# Su dirección de Gmail utilizada para enviar correos.
# Importante: Esta debe ser la cuenta para la que generó una Contraseña de Aplicación.
EMAIL_FROM="su_email@gmail.com"

# EMAIL_PASSWORD
# La Contraseña de Aplicación generada desde la configuración de su cuenta de Google.
# IMPORTANTE: NO use su contraseña habitual de Gmail.
# Consulte la guía de Google en: https://support.google.com/accounts/answer/185833
EMAIL_PASSWORD="su_contraseña_de_aplicacion_aqui"
```

<a name="4-ejecutar-el-servidor-de-desarrollo-es"></a>
### 4. Ejecutar el Servidor de Desarrollo

Ahora está listo para iniciar el servidor de desarrollo.
```bash
npm run dev
```

Abra [http://localhost:9002](http://localhost:9002) en su navegador para ver el resultado.

---

<a name="cómo-usar-es"></a>
## Cómo Usar

1.  **Registrarse**: Cree una nueva cuenta en `/signup`.
2.  **Iniciar Sesión**: Inicie sesión en su cuenta en `/login`.
3.  **Obtener Clave de API**: En el panel de control, copie su clave de API única.
4.  **Enviar Correo**: Use su clave de API para hacer peticiones POST al endpoint `/api/send-email`. Vea los ejemplos detallados a continuación.
5.  **(Opcional) Configurar Correo**: Visite la página "Configuración de Correo" para establecer un nombre de remitente y asunto predeterminados.

---

<a name="resumen-de-la-api-es"></a>
## Resumen de la API

<a name="autenticación-es"></a>
### Autenticación

La API utiliza autenticación basada en clave de API. Debe proporcionar su clave de API en la cabecera HTTP de cada solicitud de envío de correo.

*   **Cabecera**: `x-api-key`
*   **Valor**: `SU_CLAVE_DE_API_AQUÍ`

<a name="endpoint-enviar-correo-es"></a>
### Endpoint: Enviar Correo

*   **URL**: `/api/send-email`
*   **Método**: `POST`
*   **Cabeceras**:
    *   `Content-Type: application/json`
    *   `x-api-key: SU_CLAVE_DE_API_AQUÍ`
*   **Cuerpo (JSON)**:
    *   `to` (string, **requerido**): La dirección de correo electrónico del destinatario.
    *   `body` (string, **requerido**): El contenido del correo. Puede ser texto plano o HTML.
    *   `subject` (string, *opcional*): El asunto del correo. Si se omite, se usará el asunto predeterminado de la configuración de su panel.

<a name="códigos-de-respuesta-comunes-es"></a>
### Códigos de Respuesta Comunes

*   `200 OK`: El correo se envió correctamente.
*   `400 Bad Request`: Faltan parámetros requeridos como `to` o `body`.
*   `401 Unauthorized`: La clave de API falta o no es válida.
*   `429 Too Many Requests`: Se ha alcanzado el límite diario de envío de correos.
*   `500 Internal Server Error`: Ocurrió un error del lado del servidor (ej., configuración de correo incorrecta).

---

<a name="guía-detallada-de-uso-de-la-api-es"></a>
## Guía Detallada de Uso de la API

Aquí hay ejemplos "súper detallados" para diferentes lenguajes.

<a name="ejemplo-en-javascript--nodejs-es"></a>
### Ejemplo en JavaScript / Node.js

Este proyecto viene con un archivo `send-test-email.js` en el directorio raíz para que pueda probarlo inmediatamente.

**Cómo ejecutar el archivo de ejemplo:**

1.  Abra `send-test-email.js`.
2.  Reemplace `SU_CLAVE_DE_API_AQUÍ` con su clave de API real.
3.  Ejecute el archivo desde la terminal:
    ```bash
    node send-test-email.js
    ```

**Contenido de `send-test-email.js`:**

```javascript
/**
 * @file This script has been converted into a long-running worker.
 * It periodically sends an email using the EmailSenderPro API.
 *
 * How to use:
 * 1. Make sure your EmailSenderPro application has been deployed.
 * 2. Update `API_KEY` and `API_HOSTNAME` with your actual deployment details.
 * 3. Configure the `RECIPIENT_EMAIL` and the `SEND_INTERVAL_MINUTES`.
 * 4. Run the script from your terminal: `node send-test-email.js`
 *    The script will run indefinitely, sending an email at the specified interval.
 */

const https = require('https');

// --- Configuration ---
const API_KEY = 'SU_CLAVE_DE_API_AQUÍ'; 
const API_HOSTNAME = 'emailsenderpro.vercel.app'; // Your deployed app hostname
const RECIPIENT_EMAIL = 'destinatario@example.com'; // Who to send the email to
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
    subject: `Correo de prueba automatizado - ${new Date().toISOString()}`,
    body: `
      <h1>Trabajador de correo automatizado</h1>
      <p>Este correo fue enviado automáticamente por el script del trabajador de EmailSenderPro.</p>
      <p>Marca de tiempo: <strong>${new Date().toUTCString()}</strong></p>
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

  console.log(`[${new Date().toISOString()}] Intentando enviar correo a ${RECIPIENT_EMAIL}...`);

  const req = https.request(requestOptions, (res) => {
    let responseBody = '';
    res.on('data', (chunk) => {
      responseBody += chunk;
    });

    res.on('end', () => {
      try {
        const parsedResponse = JSON.parse(responseBody);
        
        if (res.statusCode === 200) {
          console.log(`[${new Date().toISOString()}] ✅ ¡Éxito! Correo enviado. Respuesta:`, parsedResponse.message);
          isRateLimited = false; // Reset rate limit flag on success
        
        } else if (res.statusCode === 429) {
          console.warn(`[${new Date().toISOString()}] ⏸️ Límite diario alcanzado. Pausando por ${rateLimitPauseHours} horas.`);
          isRateLimited = true; // Set rate limit flag
        
        } else {
          console.error(`[${new Date().toISOString()}] ❌ Fallo al enviar el correo. Estado: ${res.statusCode}`);
          console.error('Error del Servidor:', parsedResponse.message || 'No se proporcionó mensaje.');
        }
      } catch (e) {
        console.error(`[${new Date().toISOString()}] Error al analizar la respuesta JSON:`, responseBody);
      }
    });
  });

  req.on('error', (error) => {
    console.error(`[${new Date().toISOString()}] ❌ Error en la solicitud:`, error.message);
  });

  req.write(data);
  req.end();
}

/**
 * The main job runner. Decides whether to send an email based on the rate limit status.
 */
function emailJob() {
  if (isRateLimited) {
    console.log(`[${new Date().toISOString()}] Actualmente con límite de tasa. Saltando este ciclo.`);
    return;
  }
  sendEmail();
}

/**
 * The entry point for the worker.
 */
function main() {
  if (API_KEY === 'SU_CLAVE_DE_API_AQUÍ') {
    console.error("🔥🔥🔥 ¡Por favor, actualice la variable `API_KEY` en el script antes de ejecutarlo! 🔥🔥🔥");
    return; // Stop execution if API key is not set
  }

  console.log("======================================");
  console.log("  Trabajador de EmailSenderPro iniciado   ");
  console.log("======================================");
  console.log(`Host: https://${API_HOSTNAME}`);
  console.log(`Intervalo: ${SEND_INTERVAL_MINUTES} minutos`);
  console.log("Presione Ctrl+C para detener el trabajador.");
  console.log("--------------------------------------");

  // Run the job immediately on start
  emailJob();

  // Then run it on the specified interval
  setInterval(emailJob, SEND_INTERVAL_MS);

  // A special interval to reset the rate-limit flag, allowing the worker to try again later.
  setInterval(() => {
    if (isRateLimited) {
      console.log(`[${new Date().toISOString()}] Restableciendo la bandera de límite de tasa para intentar de nuevo en el próximo ciclo.`);
      isRateLimited = false;
    }
  }, rateLimitPauseHours * 60 * 60 * 1000);
}

// Start the worker
main();
```

<a name="ejemplo-en-python-es"></a>
### Ejemplo en Python

Hemos creado un archivo de ejemplo `send_email.py` en el directorio raíz.

**1. Instale la librería `requests`:**

Si aún no la tiene, abra su terminal y ejecute:
```bash
pip install requests
```

**2. Ejecute el archivo de ejemplo:**

1.  Abra `send_email.py`.
2.  Reemplace `SU_CLAVE_DE_API_AQUÍ` con su clave de API real.
3.  Ejecute el archivo desde la terminal:
    ```bash
    python send_email.py
    ```

**Contenido de `send_email.py`:**
```python
# -*- coding: utf-8 -*-
"""
@file send_email.py
@description Un script de Python de muestra para enviar un correo usando la API de EmailSenderPro.

Cómo usarlo:
1. Asegúrese de que su aplicación EmailSenderPro esté en funcionamiento.
2. Instale la librería 'requests' si aún no lo ha hecho: `pip install requests`.
3. Actualice la variable `API_KEY` a continuación con la clave de API de su panel de control.
4. Ejecute el script desde su terminal: `python send_email.py`
"""
import requests
import json

# --- Configuración ---
API_KEY = "SU_CLAVE_DE_API_AQUÍ"
API_URL = "http://localhost:9002/api/send-email"

# --- Detalles del Correo ---
recipient_email = "destinatario@example.com"
email_subject = "¡Hola desde Python!"
email_body = "<h1>¡EmailSenderPro es increíble!</h1><p>Este correo fue enviado usando un script de <strong>Python</strong>.</p>"

# --- No editar debajo de esta línea ---
def send_email():
    """La función principal para enviar el correo."""
    headers = {
        "Content-Type": "application/json",
        "x-api-key": API_KEY
    }
    payload = {
        "to": recipient_email,
        "subject": email_subject,
        "body": email_body
    }
    print("Enviando correo vía API...")
    try:
        response = requests.post(API_URL, headers=headers, data=json.dumps(payload), timeout=10)
        response.raise_for_status()
        print("✅ ¡Correo enviado exitosamente!")
        print("Respuesta del Servidor:", response.json())
    except requests.exceptions.HTTPError as http_err:
        print(f"❌ Ocurrió un error HTTP: {http_err}")
        try:
            print("Detalles del error del servidor:", response.json())
        except json.JSONDecodeError:
            print("No se pudo analizar la respuesta de error del servidor:", response.text)
    except requests.exceptions.ConnectionError as conn_err:
        print(f"❌ Error de conexión: No se pudo conectar al servidor en {API_URL}.")
        print("¿Está funcionando el servidor EmailSenderPro?")
    except requests.exceptions.Timeout as timeout_err:
        print(f"❌ Error de tiempo de espera: La solicitud tardó demasiado en completarse.")
    except requests.exceptions.RequestException as e:
        print(f"❌ Ocurrió un error desconocido con la solicitud: {e}")

if __name__ == "__main__":
    if API_KEY == "SU_CLAVE_DE_API_AQUÍ":
        print("🔥🔥🔥 ¡Por favor, actualice la variable `API_KEY` en el archivo send_email.py con su clave de API real! 🔥🔥🔥")
    else:
        send_email()
```

<a name="ejemplo-con-curl-es"></a>
### Ejemplo con cURL

También puede usar `cURL` directamente desde su terminal para probar el endpoint. Esto es genial para una verificación rápida.

```bash
curl -X POST http://localhost:9002/api/send-email \
-H "Content-Type: application/json" \
-H "x-api-key: SU_CLAVE_DE_API_AQUÍ" \
-d '{
  "to": "destinatario@example.com",
  "subject": "¡Hola desde cURL!",
  "body": "Este es un correo de prueba enviado mediante un comando cURL."
}'
```

---

<a name="estructura-del-proyecto-es"></a>
## Estructura del Proyecto

Aquí hay un resumen de la estructura de archivos y directorios del proyecto:
```
/
├── .env                  # Archivo de variables de entorno (necesita ser creado)
├── .eslintrc.json        # Configuración de ESLint
├── .gitignore            # Archivos y carpetas ignorados por Git
├── next.config.js        # Configuración de Next.js
├── package.json          # Lista de dependencias y scripts
├── README.md             # El archivo que está leyendo
├── tsconfig.json         # Configuración de TypeScript
│
├── public/               # Contiene activos estáticos
│
└── src/
    ├── app/              # App Router de Next.js
    │   ├── api/          # Rutas de la API de la aplicación
    │   ├── dashboard/    # Páginas y diseños para el panel de control
    │   ├── (pages)/      # Otras páginas como login, signup
    │   ├── globals.css   # CSS global y variables de color del tema
    │   └── layout.tsx    # Diseño raíz de la aplicación
    │
    ├── components/       # Componentes de React reutilizables
    │   └── ui/           # Componentes de la biblioteca ShadCN/UI
    │
    ├── context/          # Contexto de React (ej., AuthContext)
    │
    ├── hooks/            # Hooks personalizados (ej., useAuth, useToast)
    │
    ├── lib/              # Funciones de utilidad, conexión a BD, etc.
    │   └── emailsenderpro.js # Biblioteca cliente de Node.js
    │
    └── models/           # Esquemas y modelos de Mongoose para MongoDB
        └── User.ts       # Esquema para el usuario
```

---

<a name="despliegue-es"></a>
## Despliegue

La forma más fácil de desplegar su aplicación EmailSenderPro es usar la [Plataforma Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

1.  Haga clic en el botón "Implementar con Vercel" en la parte superior de este README.
2.  Conecte su cuenta de GitHub y clone este repositorio.
3.  En la configuración del proyecto en Vercel, vaya a la pestaña "Environment Variables" y agregue todas las variables de su archivo `.env`.
4.  Vercel construirá e implementará automáticamente su aplicación.

---

<a name="preguntas-frecuentes-faq-es"></a>
## Preguntas Frecuentes (FAQ)

**1. ¿Por qué necesito usar una "Contraseña de Aplicación" en lugar de mi contraseña habitual de Gmail?**
*   Esta es una medida de seguridad crucial. Una Contraseña de Aplicación es una contraseña de 16 dígitos de un solo uso que otorga a una aplicación acceso a su cuenta de Google. Es mucho más seguro que almacenar su contraseña principal directamente en el archivo `.env`, ya que puede revocar su acceso en cualquier momento sin afectar su contraseña principal.

**2. ¿Cuál es el límite diario de envío de correos?**
*   Por defecto, el límite está establecido en 10 correos por día por usuario. Puede cambiar la constante `DAILY_LIMIT` en `src/app/api/send-email/route.ts` si lo desea.

**3. ¿Puedo usar otro proveedor de correo que no sea Gmail?**
*   ¡Absolutamente! Deberá cambiar la configuración de `nodemailer` en `src/app/api/send-email/route.ts`. En lugar de `service: 'gmail'`, deberá proporcionar la información de `host`, `port` y `secure` para el servidor SMTP de su otro proveedor.

---

<a name="licencia-es"></a>
## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Vea el archivo [LICENSE](LICENSE.md) para más detalles.

---
---
<h2 id="french">Français (French)</h2>

# EmailSenderPro : Votre propre plateforme d'API d'envoi d'e-mails

EmailSenderPro est une puissante application Next.js full-stack qui fournit une API simple et sécurisée pour l'envoi d'e-mails. Elle est conçue pour les développeurs qui ont besoin d'une solution rapide pour intégrer la fonctionnalité d'e-mail dans leurs projets sans les tracas des configurations de services complexes.

L'application inclut l'authentification des utilisateurs, un tableau de bord pour la gestion des clés API, des statistiques d'utilisation et des capacités de personnalisation des e-mails.

[![Déployer avec Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fiamprmgvyt%2FEmailSenderPro)

---

## Table des matières

1.  [Fonctionnalités Clés](#fonctionnalités-clés-fr)
2.  [Pour commencer](#pour-commencer-fr)
    *   [Prérequis](#prérequis-fr)
    *   [1. Cloner le Dépôt](#1-cloner-le-dépôt-fr)
    *   [2. Installer les Dépendances](#2-installer-les-dépendances-fr)
    *   [3. Configurer les Variables d'Environnement](#3-configurer-les-variables-denvironnement-fr)
    *   [4. Lancer le Serveur de Développement](#4-lancer-le-serveur-de-développement-fr)
3.  [Comment l'utiliser](#comment-lutiliser-fr)
4.  [Aperçu de l'API](#aperçu-de-lapi-fr)
    *   [Authentification](#authentification-fr)
    *   [Endpoint : Envoyer un E-mail](#endpoint--envoyer-un-e-mail-fr)
    *   [Codes de Réponse Courants](#codes-de-réponse-courants-fr)
5.  [Guide d'Utilisation Détaillé de l'API](#guide-dutilisation-détaillé-de-lapi-fr)
    *   [Exemple JavaScript / Node.js](#exemple-javascript--nodejs-fr)
    *   [Exemple Python](#exemple-python-fr)
    *   [Exemple cURL](#exemple-curl-fr)
6.  [Structure du Projet](#structure-du-projet-fr)
7.  [Déploiement](#déploiement-fr)
8.  [Foire Aux Questions (FAQ)](#foire-aux-questions-faq-fr)
9.  [Licence](#licence-fr)

---

<a name="fonctionnalités-clés-fr"></a>
## Fonctionnalités Clés

*   🔐 **Authentification Utilisateur**: Inscription et connexion sécurisées à l'aide de JWT (JSON Web Tokens).
*   🔑 **Gestion des Clés API**: Chaque utilisateur obtient une clé API unique affichée sur son tableau de bord.
*   📊 **Statistiques d'Utilisation**: Suivez le nombre d'e-mails envoyés quotidiennement et le quota restant.
*   🚀 **API d'Envoi d'E-mails**: Un endpoint d'API REST simple et sécurisé (`/api/send-email`) à intégrer dans n'importe quelle application.
*   ⚙️ **Configuration des E-mails**: Définissez un nom d'expéditeur et un sujet par défaut pour vos e-mails depuis le tableau de bord.
*   🎨 **Mode Clair/Sombre**: Une interface moderne et esthétique avec une capacité de changement de thème.
*   📦 **Paquet NPM et Exemples**: Comprend une bibliothèque client d'exemple (`emailsenderpro`, v0.1.4) et des fichiers d'exemples détaillés pour Node.js et Python.

---

<a name="pour-commencer-fr"></a>
## Pour commencer

Suivez ces instructions pour obtenir une copie locale et la faire fonctionner.

<a name="prérequis-fr"></a>
### Prérequis

*   [Node.js](https://nodejs.org/) (v18 ou supérieur recommandé)
*   [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
*   Une base de données [MongoDB](https://www.mongodb.com/) et sa chaîne de connexion.
*   Un compte Gmail et un **Mot de passe d'application**.

<a name="1-cloner-le-dépôt-fr"></a>
### 1. Cloner le Dépôt

Ouvrez votre terminal et exécutez la commande suivante :
```bash
git clone https://github.com/iamprmgvyt/EmailSenderPro.git
cd EmailSenderPro
```

<a name="2-installer-les-dépendances-fr"></a>
### 2. Installer les Dépendances

Utilisez npm (ou yarn) pour installer tous les paquets nécessaires au projet.
```bash
npm install
```

<a name="3-configurer-les-variables-denvironnement-fr"></a>
### 3. Configurer les Variables d'Environnement

Créez un fichier nommé `.env` à la racine du projet et ajoutez les variables d'environnement suivantes. Remplacez les valeurs d'exemple par vos informations d'identification réelles.

```env
# MONGODB_URI
# Obtenez votre chaîne de connexion depuis MongoDB Atlas ou une instance locale.
# Exemple : "mongodb+srv://utilisateur:motdepasse@cluster0.mongodb.net/nom_base_de_donnees"
MONGODB_URI="votre_chaîne_de_connexion_mongodb"

# JWT_SECRET
# Une clé secrète robuste pour signer les JSON Web Tokens (JWT).
# Vous pouvez en générer une avec la commande : openssl rand -base64 32
JWT_SECRET="votre_secret_jwt_robuste"

# EMAIL_FROM
# Votre adresse Gmail utilisée pour l'envoi d'e-mails.
# Important : Ce doit être le compte pour lequel vous avez généré un Mot de passe d'application.
EMAIL_FROM="votre_email@gmail.com"

# EMAIL_PASSWORD
# Le Mot de passe d'application généré depuis les paramètres de votre compte Google.
# IMPORTANT : N'UTILISEZ PAS votre mot de passe Gmail habituel.
# Consultez le guide de Google à : https://support.google.com/accounts/answer/185833
EMAIL_PASSWORD="votre_mot_de_passe_application_ici"
```

<a name="4-lancer-le-serveur-de-développement-fr"></a>
### 4. Lancer le Serveur de Développement

Vous êtes maintenant prêt à démarrer le serveur de développement.
```bash
npm run dev
```

Ouvrez [http://localhost:9002](http://localhost:9002) dans votre navigateur pour voir le résultat.

---

<a name="comment-lutiliser-fr"></a>
## Comment l'utiliser

1.  **Inscription**: Créez un nouveau compte sur `/signup`.
2.  **Connexion**: Connectez-vous à votre compte sur `/login`.
3.  **Obtenir la Clé API**: Sur le tableau de bord, copiez votre clé API unique.
4.  **Envoyer un E-mail**: Utilisez votre clé API pour effectuer des requêtes POST vers l'endpoint `/api/send-email`. Voir les exemples détaillés ci-dessous.
5.  **(Optionnel) Configurer l'E-mail**: Visitez la page "Paramètres E-mail" pour définir un nom d'expéditeur et un sujet par défaut.

---

<a name="aperçu-de-lapi-fr"></a>
## Aperçu de l'API

<a name="authentification-fr"></a>
### Authentification

L'API utilise une authentification basée sur une clé API. Vous devez fournir votre clé API dans l'en-tête HTTP de chaque requête d'envoi d'e-mail.

*   **En-tête**: `x-api-key`
*   **Valeur**: `VOTRE_CLÉ_API_ICI`

<a name="endpoint--envoyer-un-e-mail-fr"></a>
### Endpoint : Envoyer un E-mail

*   **URL**: `/api/send-email`
*   **Méthode**: `POST`
*   **En-têtes**:
    *   `Content-Type: application/json`
    *   `x-api-key: VOTRE_CLÉ_API_ICI`
*   **Corps (JSON)**:
    *   `to` (string, **requis**): L'adresse e-mail du destinataire.
    *   `body` (string, **requis**): Le contenu de l'e-mail. Peut être du texte brut ou du HTML.
    *   `subject` (string, *optionnel*): La ligne d'objet de l'e-mail. Si omis, le sujet par défaut de vos paramètres de tableau de bord sera utilisé.

<a name="codes-de-réponse-courants-fr"></a>
### Codes de Réponse Courants

*   `200 OK`: E-mail envoyé avec succès.
*   `400 Bad Request`: Paramètres requis manquants comme `to` ou `body`.
*   `401 Unauthorized`: La clé API est manquante ou invalide.
*   `429 Too Many Requests`: La limite quotidienne d'envoi d'e-mails a été atteinte.
*   `500 Internal Server Error`: Une erreur côté serveur s'est produite (ex: configuration e-mail incorrecte).

---

<a name="guide-dutilisation-détaillé-de-lapi-fr"></a>
## Guide d'Utilisation Détaillé de l'API

Voici des exemples "super-détaillés" pour différents langages.

<a name="exemple-javascript--nodejs-fr"></a>
### Exemple JavaScript / Node.js

Ce projet est livré avec un fichier `send-test-email.js` à la racine pour que vous puissiez le tester immédiatement.

**Comment exécuter le fichier d'exemple :**

1.  Ouvrez `send-test-email.js`.
2.  Remplacez `VOTRE_CLÉ_API_ICI` par votre clé API réelle.
3.  Exécutez le fichier depuis le terminal :
    ```bash
    node send-test-email.js
    ```

**Contenu de `send-test-email.js`:**

```javascript
/**
 * @file This script has been converted into a long-running worker.
 * It periodically sends an email using the EmailSenderPro API.
 *
 * How to use:
 * 1. Make sure your EmailSenderPro application has been deployed.
 * 2. Update `API_KEY` and `API_HOSTNAME` with your actual deployment details.
 * 3. Configure the `RECIPIENT_EMAIL` and the `SEND_INTERVAL_MINUTES`.
 * 4. Run the script from your terminal: `node send-test-email.js`
 *    The script will run indefinitely, sending an email at the specified interval.
 */

const https = require('https');

// --- Configuration ---
const API_KEY = 'VOTRE_CLÉ_API_ICI'; 
const API_HOSTNAME = 'emailsenderpro.vercel.app'; // Your deployed app hostname
const RECIPIENT_EMAIL = 'destinataire@example.com'; // Who to send the email to
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
    subject: `E-mail de test automatisé - ${new Date().toISOString()}`,
    body: `
      <h1>Travailleur d'e-mail automatisé</h1>
      <p>Cet e-mail a été envoyé automatiquement par le script du travailleur EmailSenderPro.</p>
      <p>Horodatage: <strong>${new Date().toUTCString()}</strong></p>
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

  console.log(`[${new Date().toISOString()}] Tentative d'envoi d'e-mail à ${RECIPIENT_EMAIL}...`);

  const req = https.request(requestOptions, (res) => {
    let responseBody = '';
    res.on('data', (chunk) => {
      responseBody += chunk;
    });

    res.on('end', () => {
      try {
        const parsedResponse = JSON.parse(responseBody);
        
        if (res.statusCode === 200) {
          console.log(`[${new Date().toISOString()}] ✅ Succès ! E-mail envoyé. Réponse :`, parsedResponse.message);
          isRateLimited = false; // Reset rate limit flag on success
        
        } else if (res.statusCode === 429) {
          console.warn(`[${new Date().toISOString()}] ⏸️ Limite quotidienne atteinte. Mise en pause pour ${rateLimitPauseHours} heures.`);
          isRateLimited = true; // Set rate limit flag
        
        } else {
          console.error(`[${new Date().toISOString()}] ❌ Échec de l'envoi de l'e-mail. Statut : ${res.statusCode}`);
          console.error('Erreur du serveur :', parsedResponse.message || 'Aucun message fourni.');
        }
      } catch (e) {
        console.error(`[${new Date().toISOString()}] Erreur lors de l'analyse de la réponse JSON :`, responseBody);
      }
    });
  });

  req.on('error', (error) => {
    console.error(`[${new Date().toISOString()}] ❌ Erreur de requête :`, error.message);
  });

  req.write(data);
  req.end();
}

/**
 * The main job runner. Decides whether to send an email based on the rate limit status.
 */
function emailJob() {
  if (isRateLimited) {
    console.log(`[${new Date().toISOString()}] Actuellement limité. Sautant ce cycle.`);
    return;
  }
  sendEmail();
}

/**
 * The entry point for the worker.
 */
function main() {
  if (API_KEY === 'VOTRE_CLÉ_API_ICI') {
    console.error("🔥🔥🔥 Veuillez mettre à jour la variable `API_KEY` dans le script avant de l'exécuter ! 🔥🔥🔥");
    return; // Stop execution if API key is not set
  }

  console.log("======================================");
  console.log("  Travailleur EmailSenderPro initialisé   ");
  console.log("======================================");
  console.log(`Hôte: https://${API_HOSTNAME}`);
  console.log(`Intervalle: ${SEND_INTERVAL_MINUTES} minutes`);
  console.log("Appuyez sur Ctrl+C pourarrêter le travailleur.");
  console.log("--------------------------------------");

  // Run the job immediately on start
  emailJob();

  // Then run it on the specified interval
  setInterval(emailJob, SEND_INTERVAL_MS);

  // A special interval to reset the rate-limit flag, allowing the worker to try again later.
  setInterval(() => {
    if (isRateLimited) {
      console.log(`[${new Date().toISOString()}] Réinitialisation du drapeau de limitation de débit pour réessayer au prochain cycle.`);
      isRateLimited = false;
    }
  }, rateLimitPauseHours * 60 * 60 * 1000);
}

// Start the worker
main();
```

<a name="exemple-python-fr"></a>
### Exemple Python

Nous avons créé un fichier d'exemple `send_email.py` dans le répertoire racine.

**1. Installez la bibliothèque `requests` :**

Si vous ne l'avez pas déjà, ouvrez votre terminal et exécutez :
```bash
pip install requests
```

**2. Exécutez le fichier d'exemple :**

1.  Ouvrez `send_email.py`.
2.  Remplacez `VOTRE_CLÉ_API_ICI` par votre clé API réelle.
3.  Exécutez le fichier depuis le terminal :
    ```bash
    python send_email.py
    ```

**Contenu de `send_email.py`:**
```python
# -*- coding: utf-8 -*-
"""
@file send_email.py
@description Un script Python d'exemple pour envoyer un e-mail via l'API EmailSenderPro.

Comment l'utiliser :
1. Assurez-vous que votre application EmailSenderPro est en cours d'exécution.
2. Installez la bibliothèque 'requests' si ce n'est pas déjà fait : `pip install requests`.
3. Mettez à jour la variable `API_KEY` ci-dessous avec la clé API de votre tableau de bord.
4. Exécutez le script depuis votre terminal : `python send_email.py`
"""
import requests
import json

# --- Configuration ---
API_KEY = "VOTRE_CLÉ_API_ICI"
API_URL = "http://localhost:9002/api/send-email"

# --- Détails de l'E-mail ---
recipient_email = "destinataire@example.com"
email_subject = "Bonjour depuis Python !"
email_body = "<h1>EmailSenderPro est génial !</h1><p>Cet e-mail a été envoyé à l'aide d'un script <strong>Python</strong>.</p>"

# --- Ne pas modifier en dessous de cette ligne ---
def send_email():
    """La fonction principale pour envoyer l'e-mail."""
    headers = {
        "Content-Type": "application/json",
        "x-api-key": API_KEY
    }
    payload = {
        "to": recipient_email,
        "subject": email_subject,
        "body": email_body
    }
    print("Envoi de l'e-mail via l'API...")
    try:
        response = requests.post(API_URL, headers=headers, data=json.dumps(payload), timeout=10)
        response.raise_for_status()
        print("✅ E-mail envoyé avec succès !")
        print("Réponse du serveur :", response.json())
    except requests.exceptions.HTTPError as http_err:
        print(f"❌ Une erreur HTTP est survenue : {http_err}")
        try:
            print("Détails de l'erreur du serveur :", response.json())
        except json.JSONDecodeError:
            print("Impossible de parser la réponse d'erreur du serveur :", response.text)
    except requests.exceptions.ConnectionError as conn_err:
        print(f"❌ Erreur de connexion : Impossible de se connecter au serveur à l'adresse {API_URL}.")
        print("Le serveur EmailSenderPro est-il en cours d'exécution ?")
    except requests.exceptions.Timeout as timeout_err:
        print(f"❌ Erreur de timeout : La requête a pris trop de temps pour aboutir.")
    except requests.exceptions.RequestException as e:
        print(f"❌ Une erreur inconnue est survenue avec la requête : {e}")

if __name__ == "__main__":
    if API_KEY == "VOTRE_CLÉ_API_ICI":
        print("🔥🔥🔥 Veuillez mettre à jour la variable `API_KEY` dans le fichier send_email.py avec votre clé API réelle ! 🔥🔥🔥")
    else:
        send_email()
```

<a name="exemple-curl-fr"></a>
### Exemple cURL

Vous pouvez également utiliser `cURL` directement depuis votre terminal pour tester l'endpoint. C'est idéal pour une vérification rapide.

```bash
curl -X POST http://localhost:9002/api/send-email \
-H "Content-Type: application/json" \
-H "x-api-key: VOTRE_CLÉ_API_ICI" \
-d '{
  "to": "destinataire@example.com",
  "subject": "Bonjour depuis cURL !",
  "body": "Ceci est un e-mail de test envoyé via une commande cURL."
}'
```

---

<a name="structure-du-projet-fr"></a>
## Structure du Projet

Voici un aperçu de la structure des fichiers et des répertoires du projet :
```
/
├── .env                  # Fichier des variables d'environnement (à créer)
├── .eslintrc.json        # Configuration d'ESLint
├── .gitignore            # Fichiers et dossiers ignorés par Git
├── next.config.js        # Configuration de Next.js
├── package.json          # Liste des dépendances et des scripts
├── README.md             # Le fichier que vous lisez
├── tsconfig.json         # Configuration de TypeScript
│
├── public/               # Contient les actifs statiques
│
└── src/
    ├── app/              # App Router de Next.js
    │   ├── api/          # Routes API de l'application
    │   ├── dashboard/    # Pages et mises en page du tableau de bord
    │   ├── (pages)/      # Autres pages comme login, signup
    │   ├── globals.css   # CSS global et variables de couleur du thème
    │   └── layout.tsx    # Mise en page racine de l'application
    │
    ├── components/       # Composants React réutilisables
    │   └── ui/           # Composants de la bibliothèque ShadCN/UI
    │
    ├── context/          # Contexte React (ex: AuthContext)
    │
    ├── hooks/            # Hooks personnalisés (ex: useAuth, useToast)
    │
    ├── lib/              # Fonctions utilitaires, connexion BD, etc.
    │   └── emailsenderpro.js # Bibliothèque client Node.js
    │
    └── models/           # Schémas et modèles Mongoose pour MongoDB
        └── User.ts       # Schéma pour l'utilisateur
```

---

<a name="déploiement-fr"></a>
## Déploiement

La manière la plus simple de déployer votre application EmailSenderPro est d'utiliser la [Plateforme Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

1.  Cliquez sur le bouton "Déployer avec Vercel" en haut de ce README.
2.  Connectez votre compte GitHub et clonez ce dépôt.
3.  Dans les paramètres du projet sur Vercel, allez dans l'onglet "Environment Variables" et ajoutez toutes les variables de votre fichier `.env`.
4.  Vercel construira et déploiera automatiquement votre application.

---

<a name="foire-aux-questions-faq-fr"></a>
## Foire Aux Questions (FAQ)

**1. Pourquoi dois-je utiliser un "Mot de passe d'application" au lieu de mon mot de passe Gmail habituel ?**
*   C'est une mesure de sécurité cruciale. Un Mot de passe d'application est un mot de passe à 16 chiffres à usage unique qui autorise une application à accéder à votre compte Google. C'est beaucoup plus sécurisé que de stocker votre mot de passe principal directement dans le fichier `.env`, car vous pouvez révoquer son accès à tout moment sans affecter votre mot de passe principal.

**2. Quelle est la limite d'envoi d'e-mails quotidienne ?**
*   Par défaut, la limite est fixée à 10 e-mails par jour et par utilisateur. Vous pouvez modifier la constante `DAILY_LIMIT` dans `src/app/api/send-email/route.ts` si vous le souhaitez.

**3. Puis-je utiliser un autre fournisseur d'e-mails que Gmail ?**
*   Absolument ! Vous devrez modifier la configuration de `nodemailer` dans `src/app/api/send-email/route.ts`. Au lieu de `service: 'gmail'`, vous devrez fournir les informations `host`, `port` et `secure` du serveur SMTP de votre autre fournisseur.

---

<a name="licence-fr"></a>
## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE.md) for details.

---
---
<h2 id="german">Deutsch (German)</h2>

# EmailSenderPro: Ihre eigene E-Mail-Versand-API-Plattform

EmailSenderPro ist eine leistungsstarke Full-Stack-Next.js-Anwendung, die eine einfache und sichere API zum Senden von E-Mails bereitstellt. Sie wurde für Entwickler konzipiert, die eine schnelle Lösung zur Integration von E-Mail-Funktionalität in ihre Projekte benötigen, ohne den Aufwand komplexer Service-Setups.

Die Anwendung umfasst Benutzerauthentifizierung, ein Dashboard zur Verwaltung von API-Schlüsseln, Nutzungsstatistiken und Anpassungsmöglichkeiten für E-Mails.

[![Mit Vercel bereitstellen](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fiamprmgvyt%2FEmailSenderPro)

---

## Inhaltsverzeichnis

1.  [Hauptmerkmale](#hauptmerkmale-de)
2.  [Erste Schritte](#erste-schritte-de)
    *   [Voraussetzungen](#voraussetzungen-de)
    *   [1. Repository klonen](#1-repository-klonen-de)
    *   [2. Abhängigkeiten installieren](#2-abhängigkeiten-installieren-de)
    *   [3. Umgebungsvariablen einrichten](#3-umgebungsvariablen-einrichten-de)
    *   [4. Entwicklungsserver starten](#4-entwicklungsserver-starten-de)
3.  [Wie man es benutzt](#wie-man-es-benutzt-de)
4.  [API-Übersicht](#api-übersicht-de)
    *   [Authentifizierung](#authentifizierung-de)
    *   [Endpunkt: E-Mail senden](#endpunkt-e-mail-senden-de)
    *   [Häufige Antwortcodes](#häufige-antwortcodes-de)
5.  [Detaillierte API-Nutzungsanleitung](#detaillierte-api-nutzungsanleitung-de)
    *   [JavaScript / Node.js Beispiel](#javascript--nodejs-beispiel-de)
    *   [Python Beispiel](#python-beispiel-de)
    *   [cURL Beispiel](#curl-beispiel-de)
6.  [Projektstruktur](#projektstruktur-de)
7.  [Bereitstellung](#bereitstellung-de)
8.  [Häufig gestellte Fragen (FAQ)](#häufig-gestellte-fragen-faq-de)
9.  [Lizenz](#lizenz-de)

---

<a name="hauptmerkmale-de"></a>
## Hauptmerkmale

*   🔐 **Benutzerauthentifizierung**: Sichere Anmelde- und Registrierungsfunktion mit JWT (JSON Web Tokens).
*   🔑 **API-Schlüsselverwaltung**: Jeder Benutzer erhält einen einzigartigen API-Schlüssel, der auf seinem Dashboard angezeigt wird.
*   📊 **Nutzungsstatistik**: Verfolgen Sie die Anzahl der täglich gesendeten E-Mails und das verbleibende Kontingent.
*   🚀 **E-Mail-Versand-API**: Ein einfacher und sicherer REST-API-Endpunkt (`/api/send-email`) zur Integration in jede Anwendung.
*   ⚙️ **E-Mail-Konfiguration**: Legen Sie einen Standard-Absendernamen und -Betreff für Ihre E-Mails über das Dashboard fest.
*   🎨 **Hell-/Dunkelmodus**: Eine moderne, ansprechende Benutzeroberfläche mit der Möglichkeit zum Umschalten des Themas.
*   📦 **NPM-Paket und Beispiele**: Enthält eine Beispiel-Client-Bibliothek (`emailsenderpro`, v0.1.4) und detaillierte Beispieldateien für Node.js und Python.

---

<a name="erste-schritte-de"></a>
## Erste Schritte

Folgen Sie diesen Anweisungen, um eine lokale Kopie zum Laufen zu bringen.

<a name="voraussetzungen-de"></a>
### Voraussetzungen

*   [Node.js](https://nodejs.org/) (v18 oder höher empfohlen)
*   [npm](https://www.npmjs.com/) oder [yarn](https://yarnpkg.com/)
*   Eine [MongoDB](https://www.mongodb.com/)-Datenbank und deren Verbindungszeichenfolge.
*   Ein Gmail-Konto und ein **App-Passwort**.

<a name="1-repository-klonen-de"></a>
### 1. Repository klonen

Öffnen Sie Ihr Terminal und führen Sie den folgenden Befehl aus:
```bash
git clone https://github.com/iamprmgvyt/EmailSenderPro.git
cd EmailSenderPro
```

<a name="2-abhängigkeiten-installieren-de"></a>
### 2. Abhängigkeiten installieren

Verwenden Sie npm (oder yarn), um alle für das Projekt erforderlichen Pakete zu installieren.
```bash
npm install
```

<a name="3-umgebungsvariablen-einrichten-de"></a>
### 3. Umgebungsvariablen einrichten

Erstellen Sie eine Datei mit dem Namen `.env` im Stammverzeichnis des Projekts und fügen Sie die folgenden Umgebungsvariablen hinzu. Ersetzen Sie die Platzhalterwerte durch Ihre tatsächlichen Anmeldeinformationen.

```env
# MONGODB_URI
# Holen Sie sich Ihre Verbindungszeichenfolge von MongoDB Atlas oder einer lokalen Instanz.
# Beispiel: "mongodb+srv://benutzer:passwort@cluster0.mongodb.net/datenbankname"
MONGODB_URI="ihre_mongodb_verbindungszeichenfolge"

# JWT_SECRET
# Ein starker geheimer Schlüssel zum Signieren von JSON Web Tokens (JWT).
# Sie können einen mit dem Befehl generieren: openssl rand -base64 32
JWT_SECRET="ihr_starker_jwt_schlüssel"

# EMAIL_FROM
# Ihre Gmail-Adresse, die zum Senden von E-Mails verwendet wird.
# Wichtig: Dies muss das Konto sein, für das Sie ein App-Passwort generiert haben.
EMAIL_FROM="ihre_email@gmail.com"

# EMAIL_PASSWORD
# Das App-Passwort, das in Ihren Google-Kontoeinstellungen generiert wurde.
# WICHTIG: Verwenden Sie NICHT Ihr reguläres Gmail-Passwort.
# Siehe Googles Anleitung unter: https://support.google.com/accounts/answer/185833
EMAIL_PASSWORD="ihr_app_passwort_hier"
```

<a name="4-entwicklungsserver-starten-de"></a>
### 4. Entwicklungsserver starten

Sie sind nun bereit, den Entwicklungsserver zu starten.
```bash
npm run dev
```

Öffnen Sie [http://localhost:9002](http://localhost:9002) in Ihrem Browser, um das Ergebnis zu sehen.

---

<a name="wie-man-es-benutzt-de"></a>
## Wie man es benutzt

1.  **Registrieren**: Erstellen Sie ein neues Konto unter `/signup`.
2.  **Anmelden**: Melden Sie sich bei Ihrem Konto unter `/login` an.
3.  **API-Schlüssel erhalten**: Kopieren Sie auf dem Dashboard Ihren einzigartigen API-Schlüssel.
4.  **E-Mail senden**: Verwenden Sie Ihren API-Schlüssel, um POST-Anfragen an den Endpunkt `/api/send-email` zu senden. Siehe die detaillierten Beispiele unten.
5.  **(Optional) E-Mail konfigurieren**: Besuchen Sie die Seite "E-Mail-Einstellungen", um einen Standard-Absendernamen und -Betreff festzulegen.

---

<a name="api-übersicht-de"></a>
## API-Übersicht

<a name="authentifizierung-de"></a>
### Authentifizierung

Die API verwendet eine API-Schlüssel-basierte Authentifizierung. Sie müssen Ihren API-Schlüssel im HTTP-Header jeder E-Mail-Versandanfrage angeben.

*   **Header**: `x-api-key`
*   **Wert**: `IHR_API_SCHLÜSSEL_HIER`

<a name="endpunkt-e-mail-senden-de"></a>
### Endpunkt: E-Mail senden

*   **URL**: `/api/send-email`
*   **Methode**: `POST`
*   **Header**:
    *   `Content-Type: application/json`
    *   `x-api-key: IHR_API_SCHLÜSSEL_HIER`
*   **Body (JSON)**:
    *   `to` (string, **erforderlich**): Die E-Mail-Adresse des Empfängers.
    *   `body` (string, **erforderlich**): Der Inhalt der E-Mail. Kann einfacher Text oder HTML sein.
    *   `subject` (string, *optional*): Die Betreffzeile der E-Mail. Wenn weggelassen, wird der Standardbetreff aus Ihren Dashboard-Einstellungen verwendet.

<a name="häufige-antwortcodes-de"></a>
### Häufige Antwortcodes

*   `200 OK`: E-Mail wurde erfolgreich gesendet.
*   `400 Bad Request`: Fehlende erforderliche Parameter wie `to` oder `body`.
*   `401 Unauthorized`: Der API-Schlüssel fehlt oder ist ungültig.
*   `429 Too Many Requests`: Das tägliche E-Mail-Sendelimit wurde erreicht.
*   `500 Internal Server Error`: Ein serverseitiger Fehler ist aufgetreten (z. B. falsche E-Mail-Konfiguration).

---

<a name="detaillierte-api-nutzungsanleitung-de"></a>
## Detaillierte API-Nutzungsanleitung

Hier sind "super-detaillierte" Beispiele für verschiedene Sprachen.

<a name="javascript--nodejs-beispiel-de"></a>
### JavaScript / Node.js Beispiel

Dieses Projekt wird mit einer `send-test-email.js`-Datei im Stammverzeichnis geliefert, damit Sie es sofort testen können.

**Wie man die Beispieldatei ausführt:**

1.  Öffnen Sie `send-test-email.js`.
2.  Ersetzen Sie `IHR_API_SCHLÜSSEL_HIER` durch Ihren tatsächlichen API-Schlüssel.
3.  Führen Sie die Datei vom Terminal aus:
    ```bash
    node send-test-email.js
    ```

**Inhalt von `send-test-email.js`:**

```javascript
/**
 * @file This script has been converted into a long-running worker.
 * It periodically sends an email using the EmailSenderPro API.
 *
 * How to use:
 * 1. Make sure your EmailSenderPro application has been deployed.
 * 2. Update `API_KEY` and `API_HOSTNAME` with your actual deployment details.
 * 3. Configure the `RECIPIENT_EMAIL` and the `SEND_INTERVAL_MINUTES`.
 * 4. Run the script from your terminal: `node send-test-email.js`
 *    The script will run indefinitely, sending an email at the specified interval.
 */

const https = require('https');

// --- Konfiguration ---
const API_KEY = 'IHR_API_SCHLÜSSEL_HIER'; 
const API_HOSTNAME = 'emailsenderpro.vercel.app'; // Hostname Ihrer bereitgestellten App
const RECIPIENT_EMAIL = 'empfaenger@example.com'; // An wen die E-Mail gesendet werden soll
const SEND_INTERVAL_MINUTES = 5; // Wie oft eine E-Mail gesendet werden soll

// --- Worker-Zustand ---
let isRateLimited = false;
let rateLimitPauseHours = 12;

// --- Bearbeiten Sie nichts unterhalb dieser Zeile ---

const API_PORT = 443; // Standard für HTTPS
const API_PATH = '/api/send-email';
const SEND_INTERVAL_MS = SEND_INTERVAL_MINUTES * 60 * 1000;


/**
 * Die Kernfunktion, die eine einzelne E-Mail sendet.
 */
function sendEmail() {
  const emailDetails = {
    to: RECIPIENT_EMAIL,
    subject: `Automatisierte Test-E-Mail - ${new Date().toISOString()}`,
    body: `
      <h1>Automatisierter E-Mail-Worker</h1>
      <p>Diese E-Mail wurde automatisch vom EmailSenderPro-Worker-Skript gesendet.</p>
      <p>Zeitstempel: <strong>${new Date().toUTCString()}</strong></p>
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

  console.log(`[${new Date().toISOString()}] Versuch, E-Mail an ${RECIPIENT_EMAIL} zu senden...`);

  const req = https.request(requestOptions, (res) => {
    let responseBody = '';
    res.on('data', (chunk) => {
      responseBody += chunk;
    });

    res.on('end', () => {
      try {
        const parsedResponse = JSON.parse(responseBody);
        
        if (res.statusCode === 200) {
          console.log(`[${new Date().toISOString()}] ✅ Erfolg! E-Mail gesendet. Antwort:`, parsedResponse.message);
          isRateLimited = false; // Ratenlimit-Flag bei Erfolg zurücksetzen
        
        } else if (res.statusCode === 429) {
          console.warn(`[${new Date().toISOString()}] ⏸️ Tägliches Limit erreicht. Pausiere für ${rateLimitPauseHours} Stunden.`);
          isRateLimited = true; // Ratenlimit-Flag setzen
        
        } else {
          console.error(`[${new Date().toISOString()}] ❌ Fehler beim Senden der E-Mail. Status: ${res.statusCode}`);
          console.error('Serverfehler:', parsedResponse.message || 'Keine Nachricht bereitgestellt.');
        }
      } catch (e) {
        console.error(`[${new Date().toISOString()}] Fehler beim Parsen der JSON-Antwort:`, responseBody);
      }
    });
  });

  req.on('error', (error) => {
    console.error(`[${new Date().toISOString()}] ❌ Anfragefehler:`, error.message);
  });

  req.write(data);
  req.end();
}

/**
 * Der Haupt-Job-Runner. Entscheidet basierend auf dem Ratenlimit-Status, ob eine E-Mail gesendet werden soll.
 */
function emailJob() {
  if (isRateLimited) {
    console.log(`[${new Date().toISOString()}] Derzeit ratenlimitiert. Überspringe diesen Zyklus.`);
    return;
  }
  sendEmail();
}

/**
 * Der Einstiegspunkt für den Worker.
 */
function main() {
  if (API_KEY === 'IHR_API_SCHLÜSSEL_HIER') {
    console.error("🔥🔥🔥 Bitte aktualisieren Sie die `API_KEY`-Variable im Skript, bevor Sie es ausführen! 🔥🔥🔥");
    return; // Ausführung stoppen, wenn der API-Schlüssel nicht gesetzt ist
  }

  console.log("======================================");
  console.log("  EmailSenderPro Worker initialisiert   ");
  console.log("======================================");
  console.log(`Host: https://${API_HOSTNAME}`);
  console.log(`Intervall: ${SEND_INTERVAL_MINUTES} Minuten`);
  console.log("Drücken Sie Strg+C, um den Worker zu stoppen.");
  console.log("--------------------------------------");

  // Job sofort beim Start ausführen
  emailJob();

  // Dann im angegebenen Intervall ausführen
  setInterval(emailJob, SEND_INTERVAL_MS);

  // Ein spezielles Intervall, um das Ratenlimit-Flag zurückzusetzen, damit der Worker es später erneut versuchen kann.
  setInterval(() => {
    if (isRateLimited) {
      console.log(`[${new Date().toISOString()}] Ratenlimit-Flag wird zurückgesetzt, um es im nächsten Zyklus erneut zu versuchen.`);
      isRateLimited = false;
    }
  }, rateLimitPauseHours * 60 * 60 * 1000);
}

// Worker starten
main();
```

<a name="python-beispiel-de"></a>
### Python Beispiel

Wir haben eine Beispieldatei `send_email.py` im Stammverzeichnis erstellt.

**1. Installieren Sie die `requests`-Bibliothek:**

Wenn Sie sie noch nicht haben, öffnen Sie Ihr Terminal und führen Sie aus:
```bash
pip install requests
```

**2. Führen Sie die Beispieldatei aus:**

1.  Öffnen Sie `send_email.py`.
2.  Ersetzen Sie `IHR_API_SCHLÜSSEL_HIER` durch Ihren tatsächlichen API-Schlüssel.
3.  Führen Sie die Datei vom Terminal aus:
    ```bash
    python send_email.py
    ```

**Inhalt von `send_email.py`:**
```python
# -*- coding: utf-8 -*-
"""
@file send_email.py
@description Ein Beispiel-Python-Skript zum Senden einer E-Mail über die EmailSenderPro-API.

Anwendung:
1. Stellen Sie sicher, dass Ihre EmailSenderPro-Anwendung läuft.
2. Installieren Sie die 'requests'-Bibliothek, falls noch nicht geschehen: `pip install requests`.
3. Aktualisieren Sie die Variable `API_KEY` unten mit dem API-Schlüssel aus Ihrem Dashboard.
4. Führen Sie das Skript von Ihrem Terminal aus: `python send_email.py`
"""
import requests
import json

# --- Konfiguration ---
API_KEY = "IHR_API_SCHLÜSSEL_HIER"
API_URL = "http://localhost:9002/api/send-email"

# --- E-Mail-Details ---
recipient_email = "empfaenger@example.com"
email_subject = "Hallo von Python!"
email_body = "<h1>EmailSenderPro ist großartig!</h1><p>Diese E-Mail wurde mit einem <strong>Python</strong>-Skript gesendet.</p>"

# --- Bearbeiten Sie nichts unterhalb dieser Zeile ---
def send_email():
    """Die Hauptfunktion zum Senden der E-Mail."""
    headers = {
        "Content-Type": "application/json",
        "x-api-key": API_KEY
    }
    payload = {
        "to": recipient_email,
        "subject": email_subject,
        "body": email_body
    }
    print("Sende E-Mail über API...")
    try:
        response = requests.post(API_URL, headers=headers, data=json.dumps(payload), timeout=10)
        response.raise_for_status()
        print("✅ E-Mail erfolgreich gesendet!")
        print("Serverantwort:", response.json())
    except requests.exceptions.HTTPError as http_err:
        print(f"❌ HTTP-Fehler aufgetreten: {http_err}")
        try:
            print("Fehlerdetails vom Server:", response.json())
        except json.JSONDecodeError:
            print("Konnte Fehlerantwort vom Server nicht parsen:", response.text)
    except requests.exceptions.ConnectionError as conn_err:
        print(f"❌ Verbindungsfehler: Konnte keine Verbindung zum Server unter {API_URL} herstellen.")
        print("Läuft der EmailSenderPro-Server?")
    except requests.exceptions.Timeout as timeout_err:
        print(f"❌ Zeitüberschreitungsfehler: Die Anfrage dauerte zu lange.")
    except requests.exceptions.RequestException as e:
        print(f"❌ Ein unbekannter Fehler bei der Anfrage ist aufgetreten: {e}")

if __name__ == "__main__":
    if API_KEY == "IHR_API_SCHLÜSSEL_HIER":
        print("🔥🔥🔥 Bitte aktualisieren Sie die `API_KEY`-Variable in der Datei send_email.py mit Ihrem tatsächlichen API-Schlüssel! 🔥🔥🔥")
    else:
        send_email()
```

<a name="curl-beispiel-de"></a>
### cURL Beispiel

Sie können auch `cURL` direkt von Ihrem Terminal aus verwenden, um den Endpunkt zu testen. Dies ist ideal für eine schnelle Überprüfung.

```bash
curl -X POST http://localhost:9002/api/send-email \
-H "Content-Type: application/json" \
-H "x-api-key: IHR_API_SCHLÜSSEL_HIER" \
-d '{
  "to": "empfaenger@example.com",
  "subject": "Hallo von cURL!",
  "body": "Dies ist eine Test-E-Mail, die über einen cURL-Befehl gesendet wurde."
}'
```

---

<a name="projektstruktur-de"></a>
## Projektstruktur

Hier ist eine Übersicht über die Datei- und Verzeichnisstruktur des Projekts:
```
/
├── .env                  # Datei für Umgebungsvariablen (muss erstellt werden)
├── .eslintrc.json        # ESLint-Konfiguration
├── .gitignore            # Von Git ignorierte Dateien und Ordner
├── next.config.js        # Next.js-Konfiguration
├── package.json          # Liste der Abhängigkeiten und Skripte
├── README.md             # Die Datei, die Sie gerade lesen
├── tsconfig.json         # TypeScript-Konfiguration
│
├── public/               # Enthält statische Assets
│
└── src/
    ├── app/              # Next.js App Router
    │   ├── api/          # API-Routen der Anwendung
    │   ├── dashboard/    # Seiten und Layouts für das Dashboard
    │   ├── (pages)/      # Andere Seiten wie Login, Signup
    │   ├── globals.css   # Globales CSS und Theme-Farbvariablen
    │   └── layout.tsx    # Root-Layout der Anwendung
    │
    ├── components/       # Wiederverwendbare React-Komponenten
    │   └── ui/           # Komponenten aus der ShadCN/UI-Bibliothek
    │
    ├── context/          # React Context (z.B. AuthContext)
    │
    ├── hooks/            # Benutzerdefinierte Hooks (z.B. useAuth, useToast)
    │
    ├── lib/              # Hilfsfunktionen, DB-Verbindung, etc.
    │   └── emailsenderpro.js # Node.js-Client-Bibliothek
    │
    └── models/           # Mongoose-Schemata und -Modelle für MongoDB
        └── User.ts       # Schema für den Benutzer
```

---

<a name="bereitstellung-de"></a>
## Bereitstellung

Der einfachste Weg, Ihre EmailSenderPro-Anwendung bereitzustellen, ist die Verwendung der [Vercel-Plattform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

1.  Klicken Sie auf die Schaltfläche "Mit Vercel bereitstellen" oben in dieser README.
2.  Verbinden Sie Ihr GitHub-Konto und klonen Sie dieses Repository.
3.  Gehen Sie in den Projekteinstellungen auf Vercel zum Tab "Environment Variables" und fügen Sie alle Variablen aus Ihrer `.env`-Datei hinzu.
4.  Vercel wird Ihre Anwendung automatisch erstellen und bereitstellen.

---

<a name="häufig-gestellte-fragen-faq-de"></a>
## Häufig gestellte Fragen (FAQ)

**1. Warum muss ich ein "App-Passwort" anstelle meines normalen Gmail-Passworts verwenden?**
*   Dies ist eine entscheidende Sicherheitsmaßnahme. Ein App-Passwort ist ein 16-stelliges Einmalpasswort, das einer Anwendung Zugriff auf Ihr Google-Konto gewährt. Es ist viel sicherer als die direkte Speicherung Ihres primären Passworts in der `.env`-Datei, da Sie den Zugriff jederzeit widerrufen können, ohne Ihr Hauptpasswort zu beeinträchtigen.

**2. Was ist das tägliche E-Mail-Sendelimit?**
*   Standardmäßig ist das Limit auf 10 E-Mails pro Tag und Benutzer festgelegt. Sie können die Konstante `DAILY_LIMIT` in `src/app/api/send-email/route.ts` bei Bedarf ändern.

**3. Kann ich einen anderen E-Mail-Anbieter als Gmail verwenden?**
*   Absolut! Sie müssen die `nodemailer`-Konfiguration in `src/app/api/send-email/route.ts` ändern. Anstelle von `service: 'gmail'` müssen Sie die Informationen `host`, `port` und `secure` für den SMTP-Server Ihres anderen Anbieters angeben.

---

<a name="lizenz-de"></a>
## Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert. Siehe die Datei [LICENSE](LICENSE.md) für Details.

---
---
<h2 id="chinese">简体中文 (Simplified Chinese)</h2>

# EmailSenderPro：您自己的电子邮件发送 API 平台

EmailSenderPro 是一个功能强大的全栈 Next.js 应用程序，提供了一个简单而安全的 API 用于发送电子邮件。它专为需要快速解决方案将电子邮件功能集成到其项目中而无需处理复杂服务设置的开发人员而设计。

该应用程序包括用户身份验证、用于管理 API 密钥的仪表板、使用情况统计和电子邮件自定义功能。

[![使用 Vercel 部署](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fiamprmgvyt%2FEmailSenderPro)

---

## 目录

1.  [主要功能](#主要功能-zh)
2.  [入门指南](#入门指南-zh)
    *   [先决条件](#先决条件-zh)
    *   [1. 克隆存储库](#1-克隆存储库-zh)
    *   [2. 安装依赖项](#2-安装依赖项-zh)
    *   [3. 设置环境变量](#3-设置环境变量-zh)
    *   [4. 运行开发服务器](#4-运行开发服务器-zh)
3.  [如何使用](#如何使用-zh)
4.  [API 概述](#api-概述-zh)
    *   [身份验证](#身份验证-zh)
    *   [端点：发送电子邮件](#端点发送电子邮件-zh)
    *   [常见响应代码](#常见响应代码-zh)
5.  [详细的 API 使用指南](#详细的-api-使用指南-zh)
    *   [JavaScript / Node.js 示例](#javascript--nodejs-示例-zh)
    *   [Python 示例](#python-示例-zh)
    *   [cURL 示例](#curl-示例-zh)
6.  [项目结构](#项目结构-zh)
7.  [部署](#部署-zh)
8.  [常见问题解答 (FAQ)](#常见问题解答-faq-zh)
9.  [许可证](#许可证-zh)

---

<a name="主要功能-zh"></a>
## 主要功能

*   🔐 **用户身份验证**：使用 JWT (JSON Web Tokens) 实现安全的注册和登录功能。
*   🔑 **API 密钥管理**：每个用户都会在仪表板上获得一个唯一的 API 密钥。
*   📊 **使用情况统计**：跟踪每日发送的电子邮件数量和剩余配额。
*   🚀 **电子邮件发送 API**：一个简单安全的 REST API 端点 (`/api/send-email`)，可集成到任何应用程序中。
*   ⚙️ **电子邮件配置**：从仪表板为您的电子邮件设置默认发件人名称和主题。
*   🎨 **浅色/深色模式**：具有主题切换功能的现代化、美观的界面。
*   📦 **NPM 包和示例**：包括一个示例客户端库（`emailsenderpro`，v0.1.4）以及 Node.js 和 Python 的详细示例文件。

---

<a name="入门指南-zh"></a>
## 入门指南

请按照以下说明获取本地副本并运行它。

<a name="先决条件-zh"></a>
### 先决条件

*   [Node.js](https://nodejs.org/) (推荐 v18 或更高版本)
*   [npm](https://www.npmjs.com/) 或 [yarn](https://yarnpkg.com/)
*   一个 [MongoDB](https://www.mongodb.com/) 数据库及其连接字符串。
*   一个 Gmail 帐户和一个**应用专用密码**。

<a name="1-克隆存储库-zh"></a>
### 1. 克隆存储库

打开您的终端并运行以下命令：
```bash
git clone https://github.com/iamprmgvyt/EmailSenderPro.git
cd EmailSenderPro
```

<a name="2-安装依赖项-zh"></a>
### 2. 安装依赖项

使用 npm (或 yarn) 安装项目所需的所有软件包。
```bash
npm install
```

<a name="3-设置环境变量-zh"></a>
### 3. 设置环境变量

在项目的根目录中创建一个名为 `.env` 的文件，并添加以下环境变量。请将占位符值替换为您的实际凭据。

```env
# MONGODB_URI
# 从 MongoDB Atlas 或本地实例获取您的连接字符串。
# 示例: "mongodb+srv://user:password@cluster0.mongodb.net/database_name"
MONGODB_URI="your_mongodb_connection_string"

# JWT_SECRET
# 用于签署 JSON Web Tokens (JWT) 的强密钥。
# 您可以使用命令生成一个: openssl rand -base64 32
JWT_SECRET="your_strong_jwt_secret"

# EMAIL_FROM
# 您用于发送电子邮件的 Gmail 地址。
# 重要提示：这必须是您为其生成应用专用密码的帐户。
EMAIL_FROM="your_email@gmail.com"

# EMAIL_PASSWORD
# 从您的 Google 帐户设置生成的应用专用密码。
# 重要提示：请勿使用您的常规 Gmail 密码。
# 请参阅 Google 的指南：https://support.google.com/accounts/answer/185833
EMAIL_PASSWORD="your_app_password_here"
```

<a name="4-运行开发服务器-zh"></a>
### 4. 运行开发服务器

现在您可以启动开发服务器了。
```bash
npm run dev
```

在浏览器中打开 [http://localhost:9002](http://localhost:9002) 查看结果。

---

<a name="如何使用-zh"></a>
## 如何使用

1.  **注册**：在 `/signup` 创建一个新帐户。
2.  **登录**：在 `/login` 登录到您的帐户。
3.  **获取 API 密钥**：在仪表板上，复制您唯一的 API 密钥。
4.  **发送电子邮件**：使用您的 API 密钥向 `/api/send-email` 端点发出 POST 请求。请参阅下面的详细示例。
5.  **（可选）配置电子邮件**：访问“电子邮件设置”页面以设置默认发件人名称和主题。

---

<a name="api-概述-zh"></a>
## API 概述

<a name="身份验证-zh"></a>
### 身份验证

该 API 使用基于 API 密钥的身份验证。您必须在每个电子邮件发送请求的 HTTP 标头中提供您的 API 密钥。

*   **标头**: `x-api-key`
*   **值**: `YOUR_API_KEY_HERE`

<a name="端点发送电子邮件-zh"></a>
### 端点：发送电子邮件

*   **URL**: `/api/send-email`
*   **方法**: `POST`
*   **标头**:
    *   `Content-Type: application/json`
    *   `x-api-key: YOUR_API_KEY_HERE`
*   **正文 (JSON)**:
    *   `to` (string, **必需**): 收件人的电子邮件地址。
    *   `body` (string, **必需**): 电子邮件的内容。可以是纯文本或 HTML。
    *   `subject` (string, *可选*): 电子邮件主题行。如果省略，将使用您仪表板设置中的默认主题。

<a name="常见响应代码-zh"></a>
### 常见响应代码

*   `200 OK`: 电子邮件发送成功。
*   `400 Bad Request`: 缺少必需的参数，如 `to` 或 `body`。
*   `401 Unauthorized`: API 密钥丢失或无效。
*   `429 Too Many Requests`: 已达到每日电子邮件发送限制。
*   `500 Internal Server Error`: 发生服务器端错误 (例如，电子邮件配置不正确)。

---

<a name="详细的-api-使用指南-zh"></a>
## 详细的 API 使用指南

以下是针对不同语言的“超详细”示例。

<a name="javascript--nodejs-示例-zh"></a>
### JavaScript / Node.js 示例

该项目在根目录中提供了一个 `send-test-email.js` 文件，因此您可以立即进行测试。

**如何运行示例文件：**

1.  打开 `send-test-email.js`。
2.  将 `YOUR_API_KEY_HERE` 替换为您的实际 API 密钥。
3.  从终端运行文件：
    ```bash
    node send-test-email.js
    ```

**`send-test-email.js` 的内容：**

```javascript
/**
 * @file This script has been converted into a long-running worker.
 * It periodically sends an email using the EmailSenderPro API.
 *
 * How to use:
 * 1. Make sure your EmailSenderPro application has been deployed.
 * 2. Update `API_KEY` and `API_HOSTNAME` with your actual deployment details.
 * 3. Configure the `RECIPIENT_EMAIL` and the `SEND_INTERVAL_MINUTES`.
 * 4. Run the script from your terminal: `node send-test-email.js`
 *    The script will run indefinitely, sending an email at the specified interval.
 */

const https = require('https');

// --- 配置 ---
const API_KEY = 'YOUR_API_KEY_HERE'; 
const API_HOSTNAME = 'emailsenderpro.vercel.app'; // 您已部署应用程序的主机名
const RECIPIENT_EMAIL = 'recipient@example.com'; // 电子邮件收件人
const SEND_INTERVAL_MINUTES = 5; // 发送电子邮件的频率（分钟）

// --- Worker 状态 ---
let isRateLimited = false;
let rateLimitPauseHours = 12;

// --- 请勿编辑此行以下内容 ---

const API_PORT = 443; // HTTPS 的默认端口
const API_PATH = '/api/send-email';
const SEND_INTERVAL_MS = SEND_INTERVAL_MINUTES * 60 * 1000;


/**
 * 发送单封电子邮件的核心函数。
 */
function sendEmail() {
  const emailDetails = {
    to: RECIPIENT_EMAIL,
    subject: `自动测试电子邮件 - ${new Date().toISOString()}`,
    body: `
      <h1>自动电子邮件 Worker</h1>
      <p>此电子邮件由 EmailSenderPro worker 脚本自动发送。</p>
      <p>时间戳: <strong>${new Date().toUTCString()}</strong></p>
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

  console.log(`[${new Date().toISOString()}] 正在尝试向 ${RECIPIENT_EMAIL} 发送电子邮件...`);

  const req = https.request(requestOptions, (res) => {
    let responseBody = '';
    res.on('data', (chunk) => {
      responseBody += chunk;
    });

    res.on('end', () => {
      try {
        const parsedResponse = JSON.parse(responseBody);
        
        if (res.statusCode === 200) {
          console.log(`[${new Date().toISOString()}] ✅ 成功！电子邮件已发送。响应：`, parsedResponse.message);
          isRateLimited = false; // 成功后重置速率限制标志
        
        } else if (res.statusCode === 429) {
          console.warn(`[${new Date().toISOString()}] ⏸️ 已达到每日限制。暂停 ${rateLimitPauseHours} 小时。`);
          isRateLimited = true; // 设置速率限制标志
        
        } else {
          console.error(`[${new Date().toISOString()}] ❌ 发送电子邮件失败。状态： ${res.statusCode}`);
          console.error('服务器错误：', parsedResponse.message || '未提供消息。');
        }
      } catch (e) {
        console.error(`[${new Date().toISOString()}] 解析 JSON 响应时出错：`, responseBody);
      }
    });
  });

  req.on('error', (error) => {
    console.error(`[${new Date().toISOString()}] ❌ 请求错误：`, error.message);
  });

  req.write(data);
  req.end();
}

/**
 * 主要作业运行程序。根据速率限制状态决定是否发送电子邮件。
 */
function emailJob() {
  if (isRateLimited) {
    console.log(`[${new Date().toISOString()}] 当前受速率限制。跳过此周期。`);
    return;
  }
  sendEmail();
}

/**
 * Worker 的入口点。
 */
function main() {
  if (API_KEY === 'YOUR_API_KEY_HERE') {
    console.error("🔥🔥🔥 请在运行脚本前更新 `API_KEY` 变量！ 🔥🔥🔥");
    return; // 如果未设置 API 密钥，则停止执行
  }

  console.log("======================================");
  console.log("  EmailSenderPro Worker 已初始化   ");
  console.log("======================================");
  console.log(`主机: https://${API_HOSTNAME}`);
  console.log(`间隔: ${SEND_INTERVAL_MINUTES} 分钟`);
  console.log("按 Ctrl+C 停止 worker。");
  console.log("--------------------------------------");

  // 启动时立即运行作业
  emailJob();

  // 然后按指定间隔运行
  setInterval(emailJob, SEND_INTERVAL_MS);

  // 一个特殊的间隔，用于重置速率限制标志，允许 worker 稍后重试。
  setInterval(() => {
    if (isRateLimited) {
      console.log(`[${new Date().toISOString()}] 重置速率限制标志以便在下一个周期重试。`);
      isRateLimited = false;
    }
  }, rateLimitPauseHours * 60 * 60 * 1000);
}

// 启动 worker
main();
```

<a name="python-示例-zh"></a>
### Python 示例

我们在根目录中创建了一个示例文件 `send_email.py`。

**1. 安装 `requests` 库：**

如果您还没有安装，请打开终端并运行：
```bash
pip install requests
```

**2. 运行示例文件：**

1.  打开 `send_email.py`。
2.  将 `YOUR_API_KEY_HERE` 替换为您的实际 API 密钥。
3.  从终端运行文件：
    ```bash
    python send_email.py
    ```

**`send_email.py` 的内容：**
```python
# -*- coding: utf-8 -*-
"""
@file send_email.py
@description 使用 EmailSenderPro API 发送电子邮件的示例 Python 脚本。

如何使用：
1. 确保您的 EmailSenderPro 应用程序正在运行。
2. 如果尚未安装 'requests' 库，请安装：`pip install requests`。
3. 使用您仪表板中的 API 密钥更新下面的 `API_KEY` 变量。
4. 从终端运行脚本：`python send_email.py`
"""
import requests
import json

# --- 配置 ---
API_KEY = "YOUR_API_KEY_HERE"
API_URL = "http://localhost:9002/api/send-email"

# --- 电子邮件详情 ---
recipient_email = "recipient@example.com"
email_subject = "来自 Python 的问候！"
email_body = "<h1>EmailSenderPro 太棒了！</h1><p>这封邮件是使用 <strong>Python</strong> 脚本发送的。</p>"

# --- 请勿编辑此行以下内容 ---
def send_email():
    """发送电子邮件的主函数。"""
    headers = {
        "Content-Type": "application/json",
        "x-api-key": API_KEY
    }
    payload = {
        "to": recipient_email,
        "subject": email_subject,
        "body": email_body
    }
    print("通过 API 发送电子邮件...")
    try:
        response = requests.post(API_URL, headers=headers, data=json.dumps(payload), timeout=10)
        response.raise_for_status()
        print("✅ 电子邮件发送成功！")
        print("服务器响应：", response.json())
    except requests.exceptions.HTTPError as http_err:
        print(f"❌ 发生 HTTP 错误： {http_err}")
        try:
            print("来自服务器的错误详细信息：", response.json())
        except json.JSONDecodeError:
            print("无法解析来自服务器的错误响应：", response.text)
    except requests.exceptions.ConnectionError as conn_err:
        print(f"❌ 连接错误：无法连接到服务器 {API_URL}。")
        print("EmailSenderPro 服务器是否正在运行？")
    except requests.exceptions.Timeout as timeout_err:
        print(f"❌ 超时错误：请求花费了太长时间才完成。")
    except requests.exceptions.RequestException as e:
        print(f"❌ 请求发生未知错误： {e}")

if __name__ == "__main__":
    if API_KEY == "YOUR_API_KEY_HERE":
        print("🔥🔥🔥 请使用您的实际 API 密钥更新 send_email.py 文件中的 `API_KEY` 变量！ 🔥🔥🔥")
    else:
        send_email()
```

<a name="curl-示例-zh"></a>
### cURL 示例

您也可以直接从终端使用 `cURL` 来测试端点。这对于快速检查非常有用。

```bash
curl -X POST http://localhost:9002/api/send-email \
-H "Content-Type: application/json" \
-H "x-api-key: YOUR_API_KEY_HERE" \
-d '{
  "to": "recipient@example.com",
  "subject": "来自 cURL 的问候！",
  "body": "这是一封通过 cURL 命令发送的测试电子邮件。"
}'
```

---

<a name="项目结构-zh"></a>
## 项目结构

以下是项目文件和目录结构的概述：
```
/
├── .env                  # 环境变量文件 (需要创建)
├── .eslintrc.json        # ESLint 配置
├── .gitignore            # Git 忽略的文件和文件夹
├── next.config.js        # Next.js 配置
├── package.json          # 依赖项和脚本列表
├── README.md             # 您正在阅读的文件
├── tsconfig.json         # TypeScript 配置
│
├── public/               # 包含静态资源
│
└── src/
    ├── app/              # Next.js App Router
    │   ├── api/          # 应用程序 API 路由
    │   ├── dashboard/    # 仪表板的页面和布局
    │   ├── (pages)/      # 其他页面，如登录、注册
    │   ├── globals.css   # 全局 CSS 和主题颜色变量
    │   └── layout.tsx    # 应用程序的根布局
    │
    ├── components/       # 可重用的 React 组件
    │   └── ui/           # 来自 ShadCN/UI 库的组件
    │
    ├── context/          # React 上下文 (例如 AuthContext)
    │
    ├── hooks/            # 自定义钩子 (例如 useAuth, useToast)
    │
    ├── lib/              # 工具函数、数据库连接等
    │   └── emailsenderpro.js # Node.js 客户端库
    │
    └── models/           # 用于 MongoDB 的 Mongoose 模式和模型
        └── User.ts       # 用户模式
```

---

<a name="部署-zh"></a>
## 部署

部署 EmailSenderPro 应用程序最简单的方法是使用 [Vercel 平台](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)。

1.  点击此 README 顶部的“使用 Vercel 部署”按钮。
2.  连接您的 GitHub 帐户并克隆此存储库。
3.  在 Vercel 的项目设置中，导航到“Environment Variables”选项卡，并添加您 `.env` 文件中的所有变量。
4.  Vercel 将自动构建和部署您的应用程序。

---

<a name="常见问题解答-faq-zh"></a>
## 常见问题解答 (FAQ)

**1. 为什么我需要使用“应用专用密码”而不是我的常规 Gmail 密码？**
*   这是一项至关重要的安全措施。应用专用密码是一个 16 位的次性密码，它授予应用程序访问您的 Google 帐户的权限。这比直接在 `.env` 文件中存储您的主密码要安全得多，因为您可以随时撤销其访问权限，而不会影响您的主密码。

**2. 每日电子邮件发送限制是多少？**
*   默认情况下，限制设置为每个用户每天 10 封电子邮件。如果您愿意，可以在 `src/app/api/send-email/route.ts` 中更改 `DAILY_LIMIT` 常量。

**3. 我可以使用除 Gmail 之外的电子邮件提供商吗？**
*   当然可以！您需要更改 `src/app/api/send-email/route.ts` 中的 `nodemailer` 配置。您需要提供其他提供商 SMTP 服务器的 `host`、`port` 和 `secure` 信息，而不是 `service: 'gmail'`。

---

<a name="许可证-zh"></a>
## 许可证

该项目根据 MIT 许可证授权。有关详细信息，请参阅 [LICENSE](LICENSE.md) 文件。

---
---
<h2 id="japanese">日本語 (Japanese)</h2>

# EmailSenderPro: 独自のメール送信APIプラットフォーム

EmailSenderProは、メールを送信するためのシンプルで安全なAPIを提供する、強力なフルスタックNext.jsアプリケーションです。複雑なサービス設定の手間をかけずに、メール機能をプロジェクトに迅速に統合する必要がある開発者向けに設計されています。

このアプリケーションには、ユーザー認証、APIキーを管理するためのダッシュボード、使用状況の統計、メールのカスタマイズ機能が含まれています。

[![Vercelでデプロイ](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fiamprmgvyt%2FEmailSenderPro)

---

## 目次

1.  [主な機能](#主な機能-ja)
2.  [はじめに](#はじめに-ja)
    *   [前提条件](#前提条件-ja)
    *   [1. リポジトリをクローンする](#1-リポジトリをクローンする-ja)
    *   [2. 依存関係をインストールする](#2-依存関係をインストールする-ja)
    *   [3. 環境変数を設定する](#3-環境変数を設定する-ja)
    *   [4. 開発サーバーを実行する](#4-開発サーバーを実行する-ja)
3.  [使用方法](#使用方法-ja)
4.  [API概要](#api概要-ja)
    *   [認証](#認証-ja)
    *   [エンドポイント: メールを送信](#エンドポイント-メールを送信-ja)
    *   [一般的なレスポンスコード](#一般的なレスポンスコード-ja)
5.  [詳細なAPI使用ガイド](#詳細なapi使用ガイド-ja)
    *   [JavaScript / Node.js の例](#javascript--nodejs-の例-ja)
    *   [Python の例](#python-の例-ja)
    *   [cURL の例](#curl-の例-ja)
6.  [プロジェクト構造](#プロジェクト構造-ja)
7.  [デプロイ](#デプロイ-ja)
8.  [よくある質問 (FAQ)](#よくある質問-faq-ja)
9.  [ライセンス](#ライセンス-ja)

---

<a name="主な機能-ja"></a>
## 主な機能

*   🔐 **ユーザー認証**: JWT (JSON Web Tokens) を使用した安全なサインアップおよびログイン機能。
*   🔑 **APIキー管理**: 各ユーザーは、ダッシュボードに表示される一意のAPIキーを取得します。
*   📊 **使用状況統計**: 毎日送信されるメールの数と残りのクォータを追跡します。
*   🚀 **メール送信API**: 任意のアプリケーションに統合できる、シンプルで安全なREST APIエンドポイント (`/api/send-email`)。
*   ⚙️ **メール設定**: ダッシュボードからメールのデフォルトの送信者名と件名を設定します。
*   🎨 **ライト/ダークモード**: テーマ切り替え機能を備えた、モダンで美しいインターフェース。
*   📦 **NPMパッケージと例**: サンプルクライアントライブラリ（`emailsenderpro`、v0.1.4）と、Node.jsおよびPython用の詳細なサンプルファイルが含まれています。

---

<a name="はじめに-ja"></a>
## はじめに

ローカルコピーを立ち上げて実行するには、次の手順に従ってください。

<a name="前提条件-ja"></a>
### 前提条件

*   [Node.js](https://nodejs.org/) (v18以上を推奨)
*   [npm](https://www.npmjs.com/) または [yarn](https://yarnpkg.com/)
*   [MongoDB](https://www.mongodb.com/) データベースとその接続文字列。
*   Gmailアカウントと**アプリパスワード**。

<a name="1-リポジトリをクローンする-ja"></a>
### 1. リポジトリをクローンする

ターミナルを開き、次のコマンドを実行します:
```bash
git clone https://github.com/iamprmgvyt/EmailSenderPro.git
cd EmailSenderPro
```

<a name="2-依存関係をインストールする-ja"></a>
### 2. 依存関係をインストールする

npm (または yarn) を使用して、プロジェクトに必要なすべてのパッケージをインストールします。
```bash
npm install
```

<a name="3-環境変数を設定する-ja"></a>
### 3. 環境変数を設定する

プロジェクトのルートディレクトリに `.env` という名前のファイルを作成し、次の環境変数を追加します。プレースホルダーの値を実際の認証情報に置き換えてください。

```env
# MONGODB_URI
# MongoDB Atlasまたはローカルインスタンスから接続文字列を取得します。
# 例: "mongodb+srv://user:password@cluster0.mongodb.net/database_name"
MONGODB_URI="your_mongodb_connection_string"

# JWT_SECRET
# JSON Web Tokens (JWT) に署名するための強力な秘密鍵。
# 次のコマンドで生成できます: openssl rand -base64 32
JWT_SECRET="your_strong_jwt_secret"

# EMAIL_FROM
# メールの送信に使用するGmailアドレス。
# 重要: これはアプリパスワードを生成したアカウントである必要があります。
EMAIL_FROM="your_email@gmail.com"

# EMAIL_PASSWORD
# Googleアカウント設定から生成されたアプリパスワード。
# 重要: 通常のGmailパスワードは使用しないでください。
# Googleのガイドを参照してください: https://support.google.com/accounts/answer/185833
EMAIL_PASSWORD="your_app_password_here"
```

<a name="4-開発サーバーを実行する-ja"></a>
### 4. 開発サーバーを実行する

これで開発サーバーを起動する準備ができました。
```bash
npm run dev
```

ブラウザで [http://localhost:9002](http://localhost:9002) を開いて結果を確認してください。

---

<a name="使用方法-ja"></a>
## 使用方法

1.  **サインアップ**: `/signup` で新しいアカウントを作成します。
2.  **ログイン**: `/login` でアカウントにサインインします。
3.  **APIキーを取得**: ダッシュボードで、一意のAPIキーをコピーします。
4.  **メールを送信**: APIキーを使用して `/api/send-email` エンドポイントにPOSTリクエストを送信します。以下の詳細な例を参照してください。
5.  **(任意) メールを設定**: 「メール設定」ページにアクセスして、デフォルトの送信者名と件名を設定します。

---

<a name="api概要-ja"></a>
## API概要

<a name="認証-ja"></a>
### 認証

APIはAPIキーベースの認証を使用します。各メール送信リクエストのHTTPヘッダーにAPIキーを提供する必要があります。

*   **ヘッダー**: `x-api-key`
*   **値**: `YOUR_API_KEY_HERE`

<a name="エンドポイント-メールを送信-ja"></a>
### エンドポイント: メールを送信

*   **URL**: `/api/send-email`
*   **メソッド**: `POST`
*   **ヘッダー**:
    *   `Content-Type: application/json`
    *   `x-api-key: YOUR_API_KEY_HERE`
*   **ボディ (JSON)**:
    *   `to` (string, **必須**): 受信者のメールアドレス。
    *   `body` (string, **必須**): メールの内容。プレーンテキストまたはHTMLが使用できます。
    *   `subject` (string, *任意*): メールの件名。省略した場合、ダッシュボード設定のデフォルト件名が使用されます。

<a name="一般的なレスポンスコード-ja"></a>
### 一般的なレスポンスコード

*   `200 OK`: メールは正常に送信されました。
*   `400 Bad Request`: `to` や `body` などの必須パラメータがありません。
*   `401 Unauthorized`: APIキーがないか、無効です。
*   `429 Too Many Requests`: 1日のメール送信制限に達しました。
*   `500 Internal Server Error`: サーバー側でエラーが発生しました (例: 不正なメール設定)。

---

<a name="詳細なapi使用ガイド-ja"></a>
## 詳細なAPI使用ガイド

さまざまな言語の「超詳細な」例を以下に示します。

<a name="javascript--nodejs-の例-ja"></a>
### JavaScript / Node.js の例

このプロジェクトには、すぐにテストできるようにルートディレクトリに `send-test-email.js` ファイルが付属しています。

**サンプルファイルの実行方法:**

1.  `send-test-email.js` を開きます。
2.  `YOUR_API_KEY_HERE` を実際のAPIキーに置き換えます。
3.  ターミナルからファイルを実行します:
    ```bash
    node send-test-email.js
    ```

**`send-test-email.js` の内容:**

```javascript
/**
 * @file このスクリプトは、長時間実行されるワーカーに変換されました。
 * EmailSenderPro APIを使用して定期的にメールを送信します。
 *
 * 使い方:
 * 1. EmailSenderProアプリケーションがデプロイされていることを確認してください。
 * 2. `API_KEY` と `API_HOSTNAME` を実際のデプロイメント詳細で更新してください。
 * 3. `RECIPIENT_EMAIL` と `SEND_INTERVAL_MINUTES` を設定してください。
 * 4. ターミナルからスクリプトを実行します: `node send-test-email.js`
 *    スクリプトは無期限に実行され、指定された間隔でメールを送信します。
 */

const https = require('https');

// --- 設定 ---
const API_KEY = 'YOUR_API_KEY_HERE'; 
const API_HOSTNAME = 'emailsenderpro.vercel.app'; // デプロイされたアプリのホスト名
const RECIPIENT_EMAIL = 'recipient@example.com'; // メールを送信する相手
const SEND_INTERVAL_MINUTES = 5; // メールを送信する頻度

// --- ワーカーの状態 ---
let isRateLimited = false;
let rateLimitPauseHours = 12;

// --- この行より下は編集しないでください ---

const API_PORT = 443; // HTTPSのデフォルト
const API_PATH = '/api/send-email';
const SEND_INTERVAL_MS = SEND_INTERVAL_MINUTES * 60 * 1000;


/**
 * 1通のメールを送信するコア機能。
 */
function sendEmail() {
  const emailDetails = {
    to: RECIPIENT_EMAIL,
    subject: `自動テストメール - ${new Date().toISOString()}`,
    body: `
      <h1>自動メールワーカー</h1>
      <p>このメールはEmailSenderProワーカースクリプトによって自動的に送信されました。</p>
      <p>タイムスタンプ: <strong>${new Date().toUTCString()}</strong></p>
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

  console.log(`[${new Date().toISOString()}] ${RECIPIENT_EMAIL}へのメール送信を試みています...`);

  const req = https.request(requestOptions, (res) => {
    let responseBody = '';
    res.on('data', (chunk) => {
      responseBody += chunk;
    });

    res.on('end', () => {
      try {
        const parsedResponse = JSON.parse(responseBody);
        
        if (res.statusCode === 200) {
          console.log(`[${new Date().toISOString()}] ✅ 成功！メールが送信されました。レスポンス:`, parsedResponse.message);
          isRateLimited = false; // 成功時にレート制限フラグをリセット
        
        } else if (res.statusCode === 429) {
          console.warn(`[${new Date().toISOString()}] ⏸️ 1日の制限に達しました。${rateLimitPauseHours}時間一時停止します。`);
          isRateLimited = true; // レート制限フラグを設定
        
        } else {
          console.error(`[${new Date().toISOString()}] ❌ メールの送信に失敗しました。ステータス: ${res.statusCode}`);
          console.error('サーバーエラー:', parsedResponse.message || 'メッセージが提供されていません。');
        }
      } catch (e) {
        console.error(`[${new Date().toISOString()}] JSONレスポンスの解析中にエラーが発生しました:`, responseBody);
      }
    });
  });

  req.on('error', (error) => {
    console.error(`[${new Date().toISOString()}] ❌ リクエストエラー:`, error.message);
  });

  req.write(data);
  req.end();
}

/**
 * メインのジョブランナー。レート制限ステータスに基づいてメールを送信するかどうかを決定します。
 */
function emailJob() {
  if (isRateLimited) {
    console.log(`[${new Date().toISOString()}] 現在レート制限中です。このサイクルをスキップします。`);
    return;
  }
  sendEmail();
}

/**
 * ワーカーのエントリーポイント。
 */
function main() {
  if (API_KEY === 'YOUR_API_KEY_HERE') {
    console.error("🔥🔥🔥 実行する前にスクリプトの `API_KEY` 変数を更新してください！ 🔥🔥🔥");
    return; // APIキーが設定されていない場合は実行を停止
  }

  console.log("======================================");
  console.log("  EmailSenderProワーカーが初期化されました   ");
  console.log("======================================");
  console.log(`ホスト: https://${API_HOSTNAME}`);
  console.log(`間隔: ${SEND_INTERVAL_MINUTES}分`);
  console.log("ワーカーを停止するには Ctrl+C を押してください。");
  console.log("--------------------------------------");

  // 起動時にすぐにジョブを実行
  emailJob();

  // その後、指定された間隔で実行
  setInterval(emailJob, SEND_INTERVAL_MS);

  // レート制限フラグをリセットするための特別な間隔。これにより、ワーカーは後で再試行できます。
  setInterval(() => {
    if (isRateLimited) {
      console.log(`[${new Date().toISOString()}] 次のサイクルで再試行するためにレート制限フラグをリセットしています。`);
      isRateLimited = false;
    }
  }, rateLimitPauseHours * 60 * 60 * 1000);
}

// ワーカーを開始
main();
```

<a name="python-の例-ja"></a>
### Python の例

ルートディレクトリにサンプルファイル `send_email.py` を作成しました。

**1. `requests` ライブラリをインストールします:**

まだインストールしていない場合は、ターミナルを開いて実行します:
```bash
pip install requests
```

**2. サンプルファイルを実行します:**

1.  `send_email.py` を開きます。
2.  `YOUR_API_KEY_HERE` を実際のAPIキーに置き換えます。
3.  ターミナルからファイルを実行します:
    ```bash
    python send_email.py
    ```

**`send_email.py` の内容:**
```python
# -*- coding: utf-8 -*-
"""
@file send_email.py
@description EmailSenderPro APIを使用してメールを送信するサンプルPythonスクリプト。

使い方:
1. EmailSenderProアプリケーションが実行されていることを確認してください。
2. 'requests'ライブラリをまだインストールしていない場合はインストールします: `pip install requests`。
3. 以下の `API_KEY` 変数をダッシュボードのAPIキーで更新してください。
4. ターミナルからスクリプトを実行します: `python send_email.py`
"""
import requests
import json

# --- 設定 ---
API_KEY = "YOUR_API_KEY_HERE"
API_URL = "http://localhost:9002/api/send-email"

# --- メールの詳細 ---
recipient_email = "recipient@example.com"
email_subject = "Pythonからのこんにちは！"
email_body = "<h1>EmailSenderProは最高です！</h1><p>このメールは<strong>Python</strong>スクリプトを使用して送信されました。</p>"

# --- この行より下は編集しないでください ---
def send_email():
    """メールを送信するメイン関数。"""
    headers = {
        "Content-Type": "application/json",
        "x-api-key": API_KEY
    }
    payload = {
        "to": recipient_email,
        "subject": email_subject,
        "body": email_body
    }
    print("API経由でメールを送信中...")
    try:
        response = requests.post(API_URL, headers=headers, data=json.dumps(payload), timeout=10)
        response.raise_for_status()
        print("✅ メールは正常に送信されました！")
        print("サーバーからのレスポンス:", response.json())
    except requests.exceptions.HTTPError as http_err:
        print(f"❌ HTTPエラーが発生しました: {http_err}")
        try:
            print("サーバーからのエラー詳細:", response.json())
        except json.JSONDecodeError:
            print("サーバーからのエラーレスポンスを解析できませんでした:", response.text)
    except requests.exceptions.ConnectionError as conn_err:
        print(f"❌ 接続エラー: サーバーに接続できませんでした {API_URL}。")
        print("EmailSenderProサーバーは実行されていますか？")
    except requests.exceptions.Timeout as timeout_err:
        print(f"❌ タイムアウトエラー: リクエストが完了するまでに時間がかかりすぎました。")
    except requests.exceptions.RequestException as e:
        print(f"❌ リクエストで不明なエラーが発生しました: {e}")

if __name__ == "__main__":
    if API_KEY == "YOUR_API_KEY_HERE":
        print("🔥🔥🔥 send_email.pyファイルの `API_KEY` 変数を実際のAPIキーに更新してください！ 🔥🔥🔥")
    else:
        send_email()
```

<a name="curl-の例-ja"></a>
### cURL の例

ターミナルから直接 `cURL` を使用してエンドポイントをテストすることもできます。これは簡単な確認に最適です。

```bash
curl -X POST http://localhost:9002/api/send-email \
-H "Content-Type: application/json" \
-H "x-api-key: YOUR_API_KEY_HERE" \
-d '{
  "to": "recipient@example.com",
  "subject": "cURLからのこんにちは！",
  "body": "これはcURLコマンド経由で送信されたテストメールです。"
}'
```

---

<a name="プロジェクト構造-ja"></a>
## プロジェクト構造

プロジェクトのファイルとディレクトリ構造の概要は次のとおりです。
```
/
├── .env                  # 環境変数ファイル（作成が必要）
├── .eslintrc.json        # ESLint設定
├── .gitignore            # Gitに無視されるファイルとフォルダ
├── next.config.js        # Next.js設定
├── package.json          # 依存関係とスクリプトのリスト
├── README.md             # あなたが読んでいるファイル
├── tsconfig.json         # TypeScript設定
│
├── public/               # 静的アセットを含む
│
└── src/
    ├── app/              # Next.js App Router
    │   ├── api/          # アプリケーションのAPIルート
    │   ├── dashboard/    # ダッシュボードのページとレイアウト
    │   ├── (pages)/      # login, signupなどの他のページ
    │   ├── globals.css   # グローバルCSSとテーマカラー変数
    │   └── layout.tsx    # アプリケーションのルートレイアウト
    │
    ├── components/       # 再利用可能なReactコンポーネント
    │   └── ui/           # ShadCN/UIライブラリのコンポーネント
    │
    ├── context/          # Reactコンテキスト（例: AuthContext）
    │
    ├── hooks/            # カスタムフック（例: useAuth, useToast）
    │
    ├── lib/              # ユーティリティ関数、DB接続など
    │   └── emailsenderpro.js # Node.jsクライアントライブラリ
    │
    └── models/           # MongoDB用のMongooseスキーマとモデル
        └── User.ts       # ユーザースキーマ
```

---

<a name="デプロイ-ja"></a>
## デプロイ

EmailSenderProアプリケーションをデプロイする最も簡単な方法は、[Vercelプラットフォーム](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)を使用することです。

1.  このREADMEの上部にある「Vercelでデプロイ」ボタンをクリックします。
2.  GitHubアカウントを接続し、このリポジトリをクローンします。
3.  Vercelのプロジェクト設定で、「Environment Variables」タブに移動し、`.env`ファイルのすべての変数を追加します。
4.  Vercelは自動的にアプリケーションをビルドしてデプロイします。

---

<a name="よくある質問-faq-ja"></a>
## よくある質問 (FAQ)

**1. なぜ通常のGmailパスワードの代わりに「アプリパスワード」を使用する必要があるのですか？**
*   これは重要なセキュリティ対策です。アプリパスワードは、アプリケーションにGoogleアカウントへのアクセスを許可する16桁のワンタイムパスワードです。メインパスワードに影響を与えることなくいつでもアクセスを取り消すことができるため、`.env`ファイルにプライマリパスワードを直接保存するよりもはるかに安全です。

**2. 1日のメール送信制限は何ですか？**
*   デフォルトでは、制限はユーザーあたり1日10通のメールに設定されています。必要に応じて、`src/app/api/send-email/route.ts`の`DAILY_LIMIT`定数を変更できます。

**3. Gmail以外のメールプロバイダーを使用できますか？**
*   もちろんです！ `src/app/api/send-email/route.ts`の`nodemailer`設定を変更する必要があります。`service: 'gmail'`の代わりに、他のプロバイダーのSMTPサーバーの`host`、`port`、および`secure`情報を提供する必要があります。

---

<a name="ライセンス-ja"></a>
## ライセンス

このプロジェクトはMITライセンスの下でライセンスされています。詳細については、[LICENSE](LICENSE.md)ファイルを参照してください。
