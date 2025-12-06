# EmailSenderPro: Nền tảng gửi Email API của riêng bạn

EmailSenderPro là một ứng dụng Next.js full-stack mạnh mẽ, cung cấp một API đơn giản và an toàn để gửi email. Nó được thiết kế cho các nhà phát triển cần một giải pháp nhanh chóng để tích hợp chức năng email vào dự án của họ mà không cần phải thiết lập các dịch vụ phức tạp.

Ứng dụng bao gồm xác thực người dùng, bảng điều khiển để quản lý khóa API, thống kê sử dụng, và khả năng tùy chỉnh email.

[![Triển khai với Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fiamprmgvyt%2FEmailSenderPro)

---

## Mục lục

1.  [Tính năng chính](#tính-năng-chính)
2.  [Bắt đầu](#bắt-đầu)
    *   [Yêu cầu tiên quyết](#yêu-cầu-tiên-quyết)
    *   [1. Sao chép Repository](#1-sao-chép-repository)
    *   [2. Cài đặt Dependencies](#2-cài-đặt-dependencies)
    *   [3. Thiết lập Biến môi trường](#3-thiết-lập-biến-môi-trường)
    *   [4. Chạy Development Server](#4-chạy-development-server)
3.  [Cách sử dụng](#cách-sử-dụng)
4.  [Tổng quan về API](#tổng-quan-về-api)
    *   [Xác thực](#xác-thực)
    *   [Endpoint: Gửi Email](#endpoint-gửi-email)
    *   [Các mã phản hồi phổ biến](#các-mã-phản-hồi-phổ-biến)
5.  [Hướng dẫn sử dụng API chi tiết](#hướng-dẫn-sử-dụng-api-chi-tiết)
    *   [Ví dụ JavaScript / Node.js](#ví-dụ-javascript--nodejs)
    *   [Ví dụ Python](#ví-dụ-python)
    *   [Ví dụ cURL](#ví-dụ-curl)
6.  [Cấu trúc dự án](#cấu-trúc-dự-án)
7.  [Triển khai](#triển-khai)
8.  [Câu hỏi thường gặp (FAQ)](#câu-hỏi-thường-gặp-faq)
9.  [Giấy phép](#giấy-phép)

---

## Tính năng chính

*   🔐 **Xác thực người dùng**: Chức năng đăng ký và đăng nhập an toàn sử dụng JWT (JSON Web Tokens).
*   🔑 **Quản lý Khóa API**: Mỗi người dùng có một khóa API duy nhất được hiển thị trên bảng điều khiển.
*   📊 **Thống kê sử dụng**: Theo dõi số lượng email đã gửi hàng ngày và giới hạn còn lại.
*   🚀 **API Gửi Email**: Một endpoint REST API đơn giản và an toàn (`/api/send-email`) để tích hợp vào bất kỳ ứng dụng nào.
*   ⚙️ **Cấu hình Email**: Đặt tên người gửi và tiêu đề mặc định cho email của bạn từ bảng điều khiển.
*   🎨 **Chế độ Sáng/Tối**: Giao diện hiện đại, đẹp mắt với khả năng chuyển đổi chủ đề.
*   📦 **Gói NPM và Ví dụ**: Bao gồm một thư viện client mẫu và các tệp ví dụ chi tiết cho Node.js và Python.

---

## Bắt đầu

Làm theo các hướng dẫn sau để có một bản sao cục bộ và chạy ứng dụng.

### Yêu cầu tiên quyết

*   [Node.js](https://nodejs.org/) (khuyến nghị v18 trở lên)
*   [npm](https://www.npmjs.com/) hoặc [yarn](https://yarnpkg.com/)
*   Một cơ sở dữ liệu [MongoDB](https://www.mongodb.com/) và chuỗi kết nối của nó.
*   Một tài khoản Gmail và một **Mật khẩu ứng dụng**.

### 1. Sao chép Repository

Mở terminal của bạn và chạy lệnh sau:
```bash
git clone https://github.com/iamprmgvyt/EmailSenderPro.git
cd EmailSenderPro
```

### 2. Cài đặt Dependencies

Sử dụng npm (hoặc yarn) để cài đặt tất cả các gói cần thiết cho dự án.
```bash
npm install
```

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

### 4. Chạy Development Server

Bây giờ bạn đã sẵn sàng để khởi động máy chủ phát triển.
```bash
npm run dev
```

Mở [http://localhost:9002](http://localhost:9002) trên trình duyệt của bạn để xem kết quả.

---

## Cách sử dụng

1.  **Đăng ký**: Tạo một tài khoản mới tại `/signup`.
2.  **Đăng nhập**: Đăng nhập vào tài khoản của bạn tại `/login`.
3.  **Lấy Khóa API**: Trên bảng điều khiển, sao chép khóa API duy nhất của bạn.
4.  **Gửi Email**: Sử dụng khóa API của bạn để thực hiện các yêu cầu POST đến endpoint `/api/send-email`. Xem các ví dụ chi tiết bên dưới.
5.  **(Tùy chọn) Cấu hình Email**: Truy cập trang "Email Settings" để đặt tên người gửi và tiêu đề mặc định.

---

## Tổng quan về API

### Xác thực

API sử dụng xác thực bằng khóa API. Bạn phải cung cấp khóa API của mình trong header HTTP của mỗi yêu cầu gửi email.

*   **Header**: `x-api-key`
*   **Giá trị**: `YOUR_API_KEY_HERE`

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

### Các mã phản hồi phổ biến

*   `200 OK`: Email đã được gửi thành công.
*   `400 Bad Request`: Thiếu các tham số bắt buộc như `to` hoặc `body`.
*   `401 Unauthorized`: Khóa API bị thiếu hoặc không hợp lệ.
*   `429 Too Many Requests`: Đã đạt đến giới hạn gửi email hàng ngày.
*   `500 Internal Server Error`: Đã xảy ra lỗi phía máy chủ (ví dụ: cấu hình email sai).

---

## Hướng dẫn sử dụng API chi tiết

Dưới đây là các ví dụ "siêu chi tiết" cho các ngôn ngữ khác nhau.

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
 * @file send-test-email.js
 * @description Một tập lệnh Node.js mẫu để gửi email bằng API EmailSenderPro.
 *
 * Cách sử dụng:
 * 1. Đảm bảo rằng ứng dụng EmailSenderPro của bạn đang chạy.
 * 2. Cập nhật biến `API_KEY` bên dưới bằng khóa API từ bảng điều khiển của bạn.
 * 3. Chạy tập lệnh từ terminal: `node send-test-email.js`
 */

// Sử dụng thư viện 'https' tích hợp sẵn của Node.js để thực hiện yêu cầu HTTP.
const https = require('https');

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

// Định nghĩa các tùy chọn cho yêu cầu HTTPS.
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
const req = https.request(requestOptions, (res) => {
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
});

// Gửi dữ liệu body của yêu cầu.
req.write(data);

// Kết thúc yêu cầu.
req.end();
```

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
    print(f"❌ Lỗi kết nối: Không thể kết nối đến máy chủ tại {API_URL}. Bạn đã khởi động máy chủ chưa?")

except requests.exceptions.Timeout as timeout_err:
    # Xử lý nếu yêu cầu hết thời gian chờ.
    print(f"❌ Lỗi hết thời gian chờ: Yêu cầu mất quá nhiều thời gian để hoàn thành.")
    
except requests.exceptions.RequestException as e:
    # Bắt tất cả các ngoại lệ khác từ thư viện requests.
    print(f"❌ Đã xảy ra lỗi không xác định với yêu cầu: {e}")

```

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

## Triển khai

Cách dễ nhất để triển khai ứng dụng EmailSenderPro của bạn là sử dụng [Nền tảng Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

1.  Nhấp vào nút "Deploy with Vercel" ở đầu tệp README này.
2.  Kết nối tài khoản GitHub của bạn và sao chép repository này.
3.  Trong cài đặt dự án trên Vercel, điều hướng đến tab "Environment Variables" và thêm tất cả các biến từ tệp `.env` của bạn.
4.  Vercel sẽ tự động build và triển khai ứng dụng của bạn.

---

## Câu hỏi thường gặp (FAQ)

**1. Tại sao tôi cần sử dụng "Mật khẩu ứng dụng" thay vì mật khẩu Gmail thông thường?**
*   Đây là một biện pháp bảo mật quan trọng. Mật khẩu ứng dụng là một mật khẩu 16 ký tự dùng một lần, cấp cho ứng dụng quyền truy cập vào tài khoản Google của bạn. Nó an toàn hơn nhiều so với việc lưu trữ mật khẩu chính của bạn trực tiếp trong tệp `.env`, vì bạn có thể thu hồi quyền truy cập của nó bất kỳ lúc nào mà không ảnh hưởng đến mật khẩu chính của bạn.

**2. Giới hạn gửi email hàng ngày là bao nhiêu?**
*   Theo mặc định, giới hạn được đặt là 10 email mỗi ngày cho mỗi người dùng. Bạn có thể thay đổi hằng số `DAILY_LIMIT` trong `src/app/api/send-email/route.ts` nếu muốn.

**3奏 Tôi có thể sử dụng nhà cung cấp email khác ngoài Gmail không?**
*   Hoàn toàn có thể! Bạn sẽ cần phải thay đổi cấu hình `nodemailer` trong `src/app/api/send-email/route.ts`. Thay vì `service: 'gmail'`, bạn sẽ cần cung cấp thông tin `host`, `port`, và `secure` cho máy chủ SMTP của nhà cung cấp khác.

---

## Giấy phép

Dự án này được cấp phép theo Giấy phép MIT. Xem tệp [LICENSE](LICENSE.md) để biết chi tiết.
