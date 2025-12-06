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
