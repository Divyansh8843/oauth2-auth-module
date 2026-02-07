# Secure OAuth2-Based Authentication Module

This project is a production-ready authentication system demonstrating secure coding practices, JWT architecture, and seamless OAuth2 integration with Google.

## 🚀 Key Features

*   **Google OAuth2 Login**: Secure "Authorization Code" flow with server-side verification.
*   **Secure Token Architecture**:
    *   **Access Token**: Short-lived (15 minutes).
    *   **Refresh Token**: Long-lived (7 days), stored in **HTTP-Only, Secure** cookies.
*   **Automatic Token Rotation**: Axios interceptors handle 401 errors and refresh tokens silently.
*   **Role-Based Access Control (RBAC)**: Extensible middleware for protecting routes.
*   **Production Ready**: Handles cross-domain cookies (`SameSite: None`) for separated frontend/backend deployments.

## 🛠 Tech Stack

### Backend
*   **Runtime**: Node.js
*   **Framework**: Express.js
*   **Language**: TypeScript
*   **Database**: MongoDB (Mongoose)
*   **Auth**: Google Auth Library, JWT
*   **Security**: Helmet, CORS, Cookie-Parser

### Frontend
*   **Framework**: React (Vite)
*   **Language**: TypeScript
*   **Styling**: Modern CSS (Glassmorphism), Responsive Design
*   **State Management**: React Context API

## 🔒 Security Considerations

This project strictly follows the "Don't Trust the Client" philosophy.

1.  **No LocalStorage**: Access tokens are kept in memory. Refresh tokens are in HTTP-Only cookies. This mitigates XSS attacks.
2.  **Server-Side Verification**: The Google `id_token` is verified on the backend using Google's public keys, ensuring the user identity is legitimate.
3.  **CSRF Protection**: Cookies are configured with `SameSite` attributes. In production, `Secure` and `SameSite: None` are used to allow cross-site requests between Vercel and Render.
4.  **Least Privilege**: The database schema includes a `roles` array to strictly define user capabilities.

## 🔄 Token Lifecycle & Flow

1.  **Login**: User clicks "Login with Google".
2.  **Code Exchange**: Google returns an Authorization Code. Frontend sends this code to the backend.
3.  **Verification**: Backend exchanges the code for tokens and verifies the user profile with Google.
4.  **Session Start**:
    *   **Refresh Token** -> Set in HTTP-Only Cookie.
    *   **Access Token** -> Returned in JSON response.
5.  **Access**: Frontend sends Access Token in `Authorization: Bearer` header.
6.  **Refresh**: When Access Token expires (401), Frontend intercepts the error, calls `/refresh`, gets a new Access Token, and retries the original request.
7.  **Logout**: Frontend calls `/logout`. Backend clears the HTTP-Only cookie.

## ⚠️ Assumptions & Trade-offs

*   **Assumption**: The user has a Google Account.
*   **Trade-off (Statelessness vs Control)**: We use JWTs for stateless authentication. This improves scalability but makes immediate revocation harder (mitigated by short-lived access tokens).
*   **Trade-off (Cookie Complexity)**: Using HTTP-Only cookies requires careful CORS and `SameSite` configuration, specifically for cross-domain deployments (e.g., Vercel frontend, Render backend). We handled this by dynamically setting cookie attributes based on `NODE_ENV`.

## 📦 Setup Instructions

### 1. Prerequisites
*   Node.js (v18+)
*   MongoDB URI
*   Google Cloud Console Project (Client ID & Secret)

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Update .env with your credentials
npm start
```

### 3. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
# Update .env with VITE_GOOGLE_CLIENT_ID
npm run dev
```

## 📝 API Endpoints

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/google` | Exchange auth code for tokens | No |
| `POST` | `/api/auth/refresh` | Refresh access token (Cookie) | No |
| `POST` | `/api/auth/logout` | Clear refresh token cookie | No |
| `GET` | `/api/auth/profile` | Get current user details | Yes |
| `GET` | `/api/protected` | Example protected data | Yes |

---
**Developed for the Secure OAuth2 Assignment.**
