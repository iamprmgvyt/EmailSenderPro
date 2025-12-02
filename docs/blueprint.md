# **App Name**: EmailSenderPro

## Core Features:

- Login API: Securely validates user credentials and issues JWT token stored in HTTP-Only Cookie.
- Frontend Login Page: User interface to capture email and password for login. Redirects to dashboard after authentication.
- Authentication Hook: Custom React hook (`useAuth`) to manage authentication state based on JWT and prevent unauthorized access to dashboard.
- Dashboard Data API: Verifies JWT and retrieves user-specific data (API Key and rate limiting stats) from MongoDB.
- Frontend Dashboard: Protected route that displays the user's API key, daily sent email stats, and sign-out functionality.
- Database Connection Utility: Persistent Mongoose connection helper function.
- Sign Out: Clears the HTTP-Only Cookie when the user signs out

## Style Guidelines:

- Primary color: Deep Indigo (#3F51B5) to convey trust and professionalism.
- Background color: Very light gray-blue (#F0F4F8) for a clean and unobtrusive backdrop.
- Accent color: Teal (#009688) for interactive elements and key information, providing a fresh, modern feel.
- Font pairing: 'Space Grotesk' (sans-serif) for headlines, and 'Inter' (sans-serif) for body text. 'Space Grotesk' has a techy feel suitable for headlines, while 'Inter' will ensure longer text blocks are highly readable.
- Use simple, line-based icons for clear visual communication. The style is modern, clean, and serious.
- Employ a card-based layout to organize the API key, rate limiting, and other relevant data. A dashboard UI should be clean and intuitive.
- Subtle transitions for UI elements, providing a smooth user experience. E.g., the API key field can have a fading animation effect.