# MERN Blogs Frontend - Setup Instructions

## Prerequisites

- **Node.js v20 or higher** - [Download from nodejs.org](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** for version control

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd blogs-ci-cd-fe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## Test Authentication

The application includes test credentials for authentication:

- **Email**: user1@example.com
- **Password**: password123

## What's Implemented

### 🔐 Authentication System
- **JWT Cookie Authentication**: Tokens are stored as HTTP-only cookies for security
- **Automatic Token Handling**: Axios interceptors automatically add JWT tokens to requests
- **Authentication Context**: React context for managing auth state across the app
- **Login Flow**: Complete login functionality with error handling

### 📡 API Integration
- **Centralized API Client**: Configured axios instance with interceptors
- **Authentication Service**: Login, logout, and user management functions
- **Blog Service**: All blog and category API calls use authenticated requests
- **Automatic Redirects**: Unauthenticated users are redirected to sign-in page

### 🎨 UI Components
- **Sign-In Page**: Beautiful HeroUI card-based login form at `/signin`
- **Error Handling**: User-friendly error messages for failed authentication
- **Loading States**: Proper loading indicators during authentication

### 🔄 React Query Integration
- **Cached Authentication**: User data is cached and managed by React Query
- **Optimistic Updates**: Smooth user experience with optimistic UI updates
- **Automatic Refetching**: Auth state is automatically synced

## API Endpoints Used

- `POST /auth/login` - User authentication
- `POST /auth/logout` - User logout
- `GET /auth/me` - Get current user info
- `GET /blogs` - Get blogs (now with auth headers)
- `GET /blogs/:id` - Get single blog (now with auth headers)
- `GET /categories` - Get categories (now with auth headers)

## File Structure

```
src/
├── lib/
│   └── api.ts                 # Axios configuration with interceptors
├── services/
│   ├── auth.ts               # Authentication service functions
│   └── blog.ts               # Blog API service functions
├── contexts/
│   └── auth-context.tsx      # Authentication React context
├── pages/
│   ├── signin.tsx            # Sign-in page component
│   ├── blog.tsx              # Updated to use authenticated requests
│   └── blog-item.tsx         # Updated to use authenticated requests
└── provider.tsx              # Updated with AuthProvider
```

## How It Works

1. **Login Process**:
   - User enters credentials on `/signin`
   - Calls `POST /auth/login` with email/password
   - JWT token is saved as HTTP-only cookie
   - User is redirected to home page

2. **Authenticated Requests**:
   - All API calls automatically include JWT token in headers
   - If token is invalid (401 response), user is redirected to sign-in

3. **State Management**:
   - Authentication state is managed by React Query
   - User data is cached and shared across components
   - Logout clears all cached data

## Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Lint and fix code
npm run lint

# Preview production build
npm run preview
```

## Using the Application

1. Start the development server: `npm run dev`
2. Navigate to `http://localhost:5173`
3. Go to `/signin` to test the authentication using the test credentials above
4. After login, you can browse blogs and view individual blog posts
5. All API calls will automatically include authentication headers

## Security Features

- ✅ HTTP-only cookies (prevent XSS attacks)
- ✅ Automatic token refresh handling
- ✅ Secure cookie settings in production
- ✅ Automatic logout on token expiration
- ✅ CSRF protection with SameSite cookies
