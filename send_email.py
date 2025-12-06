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
