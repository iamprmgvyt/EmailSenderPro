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
