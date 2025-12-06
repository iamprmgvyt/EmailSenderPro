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

1.  [Key Features](#key-features)
2.  [Getting Started](#getting-started)
    *   [Prerequisites](#prerequisites)
    *   [1. Clone the Repository](#1-clone-the-repository)
    *   [2. Install Dependencies](#2-install-dependencies)
    *   [3. Set Up Environment Variables](#3-set-up-environment-variables)
    *   [4. Run the Development Server](#4-run-the-development-server)
3.  [How to Use](#how-to-use)
4.  [API Overview](#api-overview)
    *   [Authentication](#authentication)
    *   [Endpoint: Send Email](#endpoint-send-email)
    *   [Common Response Codes](#common-response-codes)
5.  [Detailed API Usage Guide](#detailed-api-usage-guide)
    *   [JavaScript / Node.js Example](#javascript--nodejs-example)
    *   [Python Example](#python-example)
    *   [cURL Example](#curl-example)
6.  [Project Structure](#project-structure)
7.  [Deployment](#deployment)
8.  [Frequently Asked Questions (FAQ)](#frequently-asked-questions-faq)
9.  [License](#license)

---

## Key Features

*   🔐 **User Authentication**: Secure signup and login functionality using JWT (JSON Web Tokens).
*   🔑 **API Key Management**: Each user gets a unique API key displayed on their dashboard.
*   📊 **Usage Statistics**: Track the number of emails sent daily and the remaining quota.
*   🚀 **Email Sending API**: A simple and secure REST API endpoint (`/api/send-email`) to integrate into any application.
*   ⚙️ **Email Configuration**: Set a default sender name and subject for your emails from the dashboard.
*   🎨 **Light/Dark Mode**: A modern, beautiful interface with theme-switching capability.
*   📦 **NPM Package and Examples**: Includes a sample client library and detailed example files for Node.js and Python.

---

## Getting Started

Follow these instructions to get a local copy up and running.

### Prerequisites

*   [Node.js](https://nodejs.org/) (v18 or higher recommended)
*   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
*   A [MongoDB](https://www.mongodb.com/) database and its connection string.
*   A Gmail account and an **App Password**.

### 1. Clone the Repository

Open your terminal and run the following command:
```bash
git clone https://github.com/iamprmgvyt/EmailSenderPro.git
cd EmailSenderPro
```

### 2. Install Dependencies

Use npm (or yarn) to install all the necessary packages for the project.
```bash
npm install
```

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

### 4. Run the Development Server

You are now ready to start the development server.
```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) in your browser to see the result.

---

## How to Use

1.  **Sign Up**: Create a new account at `/signup`.
2.  **Log In**: Sign in to your account at `/login`.
3.  **Get API Key**: On the dashboard, copy your unique API key.
4.  **Send Email**: Use your API key to make POST requests to the `/api/send-email` endpoint. See the detailed examples below.
5.  **(Optional) Configure Email**: Visit the "Email Settings" page to set a default sender name and subject.

---

## API Overview

### Authentication

The API uses API key-based authentication. You must provide your API key in the HTTP header of every email-sending request.

*   **Header**: `x-api-key`
*   **Value**: `YOUR_API_KEY_HERE`

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

### Common Response Codes

*   `200 OK`: Email was sent successfully.
*   `400 Bad Request`: Missing required parameters like `to` or `body`.
*   `401 Unauthorized`: The API key is missing or invalid.
*   `429 Too Many Requests`: The daily email sending limit has been reached.
*   `500 Internal Server Error`: A server-side error occurred (e.g., incorrect email configuration).

---

## Detailed API Usage Guide

Here are "super-detailed" examples for different languages.

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
 * @file send-test-email.js
 * @description A sample Node.js script to send an email using the EmailSenderPro API.
 *
 * How to use:
 * 1. Make sure your EmailSenderPro application is running.
 * 2. Update the `API_KEY` variable below with the API key from your dashboard.
 * 3. Run the script from your terminal: `node send-test-email.js`
 */

// Use Node.js's built-in 'http' or 'https' library to make HTTP requests.
// We'll use http since we are running on localhost.
const http = require('http');

// --- Configuration ---
// Replace with your actual API key from the EmailSenderPro dashboard.
const API_KEY = 'YOUR_API_KEY_HERE'; 

// URL of the API. If you run locally on a different port, change it here.
const API_HOSTNAME = 'localhost';
const API_PORT = 9002;
const API_PATH = '/api/send-email';

// --- Email Details ---
const emailDetails = {
  to: 'recipient@example.com', // Recipient's email address.
  subject: 'Hello from Node.js!', // Email subject.
  body: '<h1>EmailSenderPro is awesome!</h1><p>This email was sent using a <strong>Node.js</strong> script.</p>' // Email body (can be HTML).
};

// --- Do not edit below this line ---

console.log('Preparing to send email...');

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
const req = http.request(requestOptions, (res) => {
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
  console.error('Please make sure the EmailSenderPro server is running on http://localhost:9002');
});

// Send the request body data.
req.write(data);

// Finalize the request.
req.end();
```

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

## Deployment

The easiest way to deploy your EmailSenderPro application is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

1.  Click the "Deploy with Vercel" button at the top of this README.
2.  Connect your GitHub account and clone this repository.
3.  In the project settings on Vercel, navigate to the "Environment Variables" tab and add all the variables from your `.env` file.
4.  Vercel will automatically build and deploy your application.

---

## Frequently Asked Questions (FAQ)

**1. Why do I need to use an "App Password" instead of my regular Gmail password?**
*   This is a crucial security measure. An App Password is a 16-digit one-time password that grants an application access to your Google account. It is much more secure than storing your primary password directly in the `.env` file, as you can revoke its access at any time without affecting your main password.

**2. What is the daily email sending limit?**
*   By default, the limit is set to 10 emails per day per user. You can change the `DAILY_LIMIT` constant in `src/app/api/send-email/route.ts` if you wish.

**3. Can I use an email provider other than Gmail?**
*   Absolutely! You will need to change the `nodemailer` configuration in `src/app/api/send-email/route.ts`. Instead of `service: 'gmail'`, you will need to provide the `host`, `port`, and `secure` information for your other provider's SMTP server.

---

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

## Tính năng chính {#tính-năng-chính-vi}

*   🔐 **Xác thực người dùng**: Chức năng đăng ký và đăng nhập an toàn sử dụng JWT (JSON Web Tokens).
*   🔑 **Quản lý Khóa API**: Mỗi người dùng có một khóa API duy nhất được hiển thị trên bảng điều khiển.
*   📊 **Thống kê sử dụng**: Theo dõi số lượng email đã gửi hàng ngày và giới hạn còn lại.
*   🚀 **API Gửi Email**: Một endpoint REST API đơn giản và an toàn (`/api/send-email`) để tích hợp vào bất kỳ ứng dụng nào.
*   ⚙️ **Cấu hình Email**: Đặt tên người gửi và tiêu đề mặc định cho email của bạn từ bảng điều khiển.
*   🎨 **Chế độ Sáng/Tối**: Giao diện hiện đại, đẹp mắt với khả năng chuyển đổi chủ đề.
*   📦 **Gói NPM và Ví dụ**: Bao gồm một thư viện client mẫu và các tệp ví dụ chi tiết cho Node.js và Python.

---

## Bắt đầu {#bắt-đầu-vi}

Làm theo các hướng dẫn sau để có một bản sao cục bộ và chạy ứng dụng.

### Yêu cầu tiên quyết {#yêu-cầu-tiên-quyết-vi}

*   [Node.js](https://nodejs.org/) (khuyến nghị v18 trở lên)
*   [npm](https://www.npmjs.com/) hoặc [yarn](https://yarnpkg.com/)
*   Một cơ sở dữ liệu [MongoDB](https://www.mongodb.com/) và chuỗi kết nối của nó.
*   Một tài khoản Gmail và một **Mật khẩu ứng dụng**.

### 1. Sao chép Repository {#1-sao-chép-repository-vi}

Mở terminal của bạn và chạy lệnh sau:
```bash
git clone https://github.com/iamprmgvyt/EmailSenderPro.git
cd EmailSenderPro
```

### 2. Cài đặt Dependencies {#2-cài-đặt-dependencies-vi}

Sử dụng npm (hoặc yarn) để cài đặt tất cả các gói cần thiết cho dự án.
```bash
npm install
```

### 3. Thiết lập Biến môi trường {#3-thiết-lập-biến-môi-trường-vi}

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

### 4. Chạy Development Server {#4-chạy-development-server-vi}

Bây giờ bạn đã sẵn sàng để khởi động máy chủ phát triển.
```bash
npm run dev
```

Mở [http://localhost:9002](http://localhost:9002) trên trình duyệt của bạn để xem kết quả.

---

## Cách sử dụng {#cách-sử-dụng-vi}

1.  **Đăng ký**: Tạo một tài khoản mới tại `/signup`.
2.  **Đăng nhập**: Đăng nhập vào tài khoản của bạn tại `/login`.
3.  **Lấy Khóa API**: Trên bảng điều khiển, sao chép khóa API duy nhất của bạn.
4.  **Gửi Email**: Sử dụng khóa API của bạn để thực hiện các yêu cầu POST đến endpoint `/api/send-email`. Xem các ví dụ chi tiết bên dưới.
5.  **(Tùy chọn) Cấu hình Email**: Truy cập trang "Email Settings" để đặt tên người gửi và tiêu đề mặc định.

---

## Tổng quan về API {#tổng-quan-về-api-vi}

### Xác thực {#xác-thực-vi}

API sử dụng xác thực bằng khóa API. Bạn phải cung cấp khóa API của mình trong header HTTP của mỗi yêu cầu gửi email.

*   **Header**: `x-api-key`
*   **Giá trị**: `YOUR_API_KEY_HERE`

### Endpoint: Gửi Email {#endpoint-gửi-email-vi}

*   **URL**: `/api/send-email`
*   **Phương thức**: `POST`
*   **Header**:
    *   `Content-Type: application/json`
    *   `x-api-key: YOUR_API_KEY_HERE`
*   **Body (JSON)**:
    *   `to` (string, **bắt buộc**): Địa chỉ email của người nhận.
    *   `body` (string, **bắt buộc**): Nội dung của email. Có thể là văn bản thuần túy hoặc HTML.
    *   `subject` (string, *tùy chọn*): Dòng tiêu đề email. Nếu bỏ qua, nó sẽ sử dụng tiêu đề mặc định từ cài đặt trên bảng điều khiển của bạn.

### Các mã phản hồi phổ biến {#các-mã-phản-hồi-phổ-biến-vi}

*   `200 OK`: Email đã được gửi thành công.
*   `400 Bad Request`: Thiếu các tham số bắt buộc như `to` hoặc `body`.
*   `401 Unauthorized`: Khóa API bị thiếu hoặc không hợp lệ.
*   `429 Too Many Requests`: Đã đạt đến giới hạn gửi email hàng ngày.
*   `500 Internal Server Error`: Đã xảy ra lỗi phía máy chủ (ví dụ: cấu hình email sai).

---

## Hướng dẫn sử dụng API chi tiết {#hướng-dẫn-sử-dụng-api-chi-tiết-vi}

Dưới đây là các ví dụ "siêu chi tiết" cho các ngôn ngữ khác nhau.

### Ví dụ JavaScript / Node.js {#ví-dụ-javascript--nodejs-vi}

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
 * @file send-test-email.js
 * @description Một tập lệnh Node.js mẫu để gửi email bằng API EmailSenderPro.
 *
 * Cách sử dụng:
 * 1. Đảm bảo rằng ứng dụng EmailSenderPro của bạn đang chạy.
 * 2. Cập nhật biến `API_KEY` bên dưới bằng khóa API từ bảng điều khiển của bạn.
 * 3. Chạy tập lệnh từ terminal: `node send-test-email.js`
 */

// Sử dụng thư viện 'http' hoặc 'https' tích hợp sẵn của Node.js để thực hiện yêu cầu HTTP.
// Chúng ta sẽ dùng http vì đang chạy trên localhost.
const http = require('http');

// --- Cấu hình ---
// Thay thế bằng khóa API thực tế từ bảng điều khiển EmailSenderPro của bạn.
const API_KEY = 'YOUR_API_KEY_HERE'; 

// URL của API. Nếu bạn chạy cục bộ trên một cổng khác, hãy thay đổi nó ở đây.
const API_HOSTNAME = 'localhost';
const API_PORT = 9002;
const API_PATH = '/api/send-email';

// --- Chi tiết Email ---
const emailDetails = {
  to: 'recipient@example.com', // Địa chỉ email người nhận.
  subject: 'Xin chào từ Node.js!', // Tiêu đề email.
  body: '<h1>EmailSenderPro thật tuyệt vời!</h1><p>Email này được gửi bằng một tập lệnh <strong>Node.js</strong>.</p>' // Nội dung email (có thể là HTML).
};

// --- Không chỉnh sửa bên dưới dòng này ---

console.log('Chuẩn bị gửi email...');

// Chuyển đổi đối tượng chi tiết email thành chuỗi JSON.
const data = JSON.stringify(emailDetails);

// Định nghĩa các tùy chọn cho yêu cầu HTTP.
const requestOptions = {
  hostname: API_HOSTNAME,
  port: API_PORT,
  path: API_PATH,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY, // Header xác thực quan trọng!
    'Content-Length': Buffer.byteLength(data)
  },
};

// Tạo yêu cầu.
const req = http.request(requestOptions, (res) => {
  let responseBody = '';

  console.log(`Trạng thái phản hồi: ${res.statusCode}`);
  
  // Lắng nghe dữ liệu phản hồi từ máy chủ.
  res.on('data', (chunk) => {
    responseBody += chunk;
  });

  // Khi phản hồi kết thúc.
  res.on('end', () => {
    try {
      const parsedResponse = JSON.parse(responseBody);
      if (res.statusCode === 200) {
        console.log('✅ Email đã được gửi thành công!');
        console.log('Phản hồi từ máy chủ:', parsedResponse);
      } else {
        console.error(`❌ Gửi email thất bại. Mã trạng thái: ${res.statusCode}`);
        console.error('Lỗi từ máy chủ:', parsedResponse);
      }
    } catch (e) {
      console.error('Không thể phân tích phản hồi JSON:', responseBody);
    }
  });
});

// Xử lý lỗi mạng.
req.on('error', (error) => {
  console.error('Đã xảy ra lỗi với yêu cầu:', error.message);
  console.error('Vui lòng đảm bảo rằng máy chủ EmailSenderPro đang chạy trên http://localhost:9002');
});

// Gửi dữ liệu body của yêu cầu.
req.write(data);

// Kết thúc yêu cầu.
req.end();
```

### Ví dụ Python {#ví-dụ-python-vi}

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

### Ví dụ cURL {#ví-dụ-curl-vi}

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

## Cấu trúc dự án {#cấu-trúc-dự-án-vi}

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

## Triển khai {#triển-khai-vi}

Cách dễ nhất để triển khai ứng dụng EmailSenderPro của bạn là sử dụng [Nền tảng Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

1.  Nhấp vào nút "Deploy with Vercel" ở đầu tệp README này.
2.  Kết nối tài khoản GitHub của bạn và sao chép repository này.
3.  Trong cài đặt dự án trên Vercel, điều hướng đến tab "Environment Variables" và thêm tất cả các biến từ tệp `.env` của bạn.
4.  Vercel sẽ tự động build và triển khai ứng dụng của bạn.

---

## Câu hỏi thường gặp (FAQ) {#câu-hỏi-thường-gặp-faq-vi}

**1. Tại sao tôi cần sử dụng "Mật khẩu ứng dụng" thay vì mật khẩu Gmail thông thường?**
*   Đây là một biện pháp bảo mật quan trọng. Mật khẩu ứng dụng là một mật khẩu 16 ký tự dùng một lần, cấp cho ứng dụng quyền truy cập vào tài khoản Google của bạn. Nó an toàn hơn nhiều so với việc lưu trữ mật khẩu chính của bạn trực tiếp trong tệp `.env`, vì bạn có thể thu hồi quyền truy cập của nó bất kỳ lúc nào mà không ảnh hưởng đến mật khẩu chính của bạn.

**2. Giới hạn gửi email hàng ngày là bao nhiêu?**
*   Theo mặc định, giới hạn được đặt là 10 email mỗi ngày cho mỗi người dùng. Bạn có thể thay đổi hằng số `DAILY_LIMIT` trong `src/app/api/send-email/route.ts` nếu muốn.

**3. Tôi có thể sử dụng nhà cung cấp email khác ngoài Gmail không?**
*   Hoàn toàn có thể! Bạn sẽ cần phải thay đổi cấu hình `nodemailer` trong `src/app/api/send-email/route.ts`. Thay vì `service: 'gmail'`, bạn sẽ cần cung cấp thông tin `host`, `port`, và `secure` cho máy chủ SMTP của nhà cung cấp khác.

---

## Giấy phép {#giấy-phép-vi}

Dự án này được cấp phép theo Giấy phép MIT. Xem tệp [LICENSE](LICENSE.md) để biết chi tiết.

---
<h2 id="spanish">Español (Spanish)</h2>

*(Translation coming soon)*

---
<h2 id="french">Français (French)</h2>

*(Translation coming soon)*

---
<h2 id="german">Deutsch (German)</h2>

*(Translation coming soon)*

---
<h2 id="chinese">简体中文 (Simplified Chinese)</h2>

*(翻译即将推出)*

---
<h2 id="japanese">日本語 (Japanese)</h2>

*(翻訳は近日公開予定です)*
