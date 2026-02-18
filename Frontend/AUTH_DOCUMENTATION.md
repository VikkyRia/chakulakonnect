# Authentication System Documentation

## Overview
This is a complete User Registration and Authentication system built with React, React Router, and Tailwind CSS. The system uses localStorage for data persistence (no backend required).

## 📁 Project Structure

```
src/
├── pages/
│   ├── Registration.jsx      # User registration/sign-up page
│   ├── Login.jsx             # User login page
│   └── Dashboard.jsx         # Protected dashboard page
├── utils/
│   └── auth.js               # Authentication utility functions
├── App.jsx                   # Main routing configuration
├── App.css                   # Minimal styling
├── main.jsx                  # Entry point
└── index.css                 # Global styles
```

## 🚀 Features

### 1. **Registration Page** (`/register`)
   - **Fields**: Full Name, Email, Password, Role (dropdown)
   - **Roles Available**: Consumer, Farmer, Vendor, Admin
   - **Validation**:
     - All fields are required
     - Email must be valid format
     - Password must be at least 6 characters
   - **Functionality**:
     - Stores user in localStorage
     - Prevents duplicate email registrations
     - Redirects to login after successful registration
     - Shows error messages for failed submissions

### 2. **Login Page** (`/login`)
   - **Fields**: Email, Password
   - **Validation**:
     - Both fields are required
     - Email must be valid format
   - **Functionality**:
     - Validates credentials against registered users
     - Creates session (currentUser in localStorage)
     - Redirects to dashboard on success
     - Shows error message on failed login
   - **Demo Account**: 
     - Email: `demo@example.com`
     - Password: `demo123`

### 3. **Dashboard Page** (`/dashboard`)
   - **Protected Route**: Only accessible when logged in
   - **Displays**:
     - Welcome message with user's full name
     - User's email address
     - User's assigned role
     - Complete account details
   - **Features**:
     - Logout button (removes session and redirects to login)
     - Refresh button
     - Responsive layout
     - Navigation bar with app name

## 🔐 Authentication Logic

### LocalStorage Structure

#### `users` Array
Stores all registered users:
```javascript
[
  {
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "Consumer"
  },
  // ... more users
]
```

#### `currentUser` Object
Stores active session:
```javascript
{
  "id": "john@example.com",
  "fullName": "John Doe",
  "email": "john@example.com",
  "role": "Consumer"
}
```

## 📝 API Functions (auth.js)

### `getAllUsers()`
Returns array of all registered users from localStorage.

### `registerUser(userData)`
Registers a new user. Returns:
```javascript
{ success: true, message: "Registration successful" }
{ success: false, message: "Email already registered" }
```

### `loginUser(email, password)`
Validates credentials and creates session. Returns:
```javascript
{ success: true, user: {...} }
{ success: false, message: "Invalid email or password" }
```

### `getCurrentUser()`
Returns the currently logged-in user object or null.

### `logoutUser()`
Removes the currentUser session from localStorage.

### `isAuthenticated()`
Returns boolean indicating if user is logged in.

## 🎨 Styling with Tailwind CSS

- **Registration Page**: Blue gradient background
- **Login Page**: Green gradient background
- **Dashboard**: Purple and blue gradient background
- **Forms**: Clean, modern design with focus states
- **Responsive**: Mobile-friendly on all screen sizes
- **Color Scheme**: 
  - Primary: Blue (#3b82f6)
  - Success: Green (#16a34a)
  - Error: Red (#dc2626)
  - Neutrals: Gray shades

## 🔄 Navigation Flow

```
/ (root)
├─→ /login (default route)
│   ├─→ If logged in: redirect to /dashboard
│   └─→ /register (Sign Up link)
│
├─→ /register
│   └─→ On success: redirect to /login
│
├─→ /dashboard (Protected)
│   ├─→ If not logged in: redirect to /login
│   └─→ Logout button: clear session and redirect to /login
│
└─→ /validate (Not Found)
    └─→ Redirect to /login
```

## 🧪 Testing the System

### Test Case 1: New User Registration
1. Navigate to `/register`
2. Fill in:
   - Full Name: "Jane Smith"
   - Email: "jane@example.com"
   - Password: "password123"
   - Role: "Farmer"
3. Click "Sign Up"
4. Should redirect to login page
5. Use new credentials to login

### Test Case 2: Demo Login
1. Navigate to `/login`
2. Enter demo credentials:
   - Email: `demo@example.com`
   - Password: `demo123`
3. Click "Login"
4. Should see dashboard with "Demo User" welcome message

### Test Case 3: Invalid Credentials
1. Navigate to `/login`
2. Enter wrong email or password
3. Should see error message: "Invalid email or password"

### Test Case 4: Logout
1. On dashboard, click "Logout"
2. Should be redirected to login page
3. Check that localStorage `currentUser` is removed

## 💾 LocalStorage Inspection

To view stored data in browser DevTools:
1. Press `F12` to open DevTools
2. Go to **Application** tab
3. Click **Local Storage**
4. Select your localhost URL
5. View `users` and `currentUser` entries

## 🛡️ Security Notes

⚠️ **Important**: This is a demo/learning implementation.

- **Passwords are stored in plain text** (not secure for production)
- **No encryption** used
- **No backend validation**
- **For production**, you MUST:
  - Use a backend authentication system
  - Hash passwords with bcrypt or similar
  - Use secure session management (JWT tokens)
  - Validate all inputs server-side
  - Use HTTPS
  - Implement CSRF protection

## 🚀 Getting Started

### Installation
```bash
npm install react-router-dom
```

### Running the Dev Server
```bash
npm run dev
```
The application will be available at `http://localhost:5173`

### Building for Production
```bash
npm run build
```

## 📦 Dependencies

- **react** (v19.2.0): UI library
- **react-dom** (v19.2.0): React rendering
- **react-router-dom** (latest): Client-side routing
- **tailwindcss** (v4.1.18): Utility-first CSS framework
- **@tailwindcss/vite** (v4.1.18): Tailwind Vite integration
- **vite** (v7.3.1): Build tool

## 🎯 Key React Concepts Used

- **useState Hook**: Managing form state and UI state
- **useEffect Hook**: Checking authentication on component mount
- **useNavigate Hook**: Programmatic navigation
- **React Router**: Client-side routing
- **Component Composition**: Reusable page components
- **Conditional Rendering**: Protected routes and error messages

## ✨ Styling Highlights

- Gradient backgrounds for visual appeal
- Focus states on form inputs
- Error message styling in red
- Success states in green
- Responsive grid layouts
- Shadow effects for depth
- Smooth transitions and hover effects

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1920px+)
- Tablet (768px - 1024px)
- Mobile (320px - 767px)

## 🔗 File Links

- [Registration Component](src/pages/Registration.jsx)
- [Login Component](src/pages/Login.jsx)
- [Dashboard Component](src/pages/Dashboard.jsx)
- [Auth Utilities](src/utils/auth.js)
- [Main App Component](src/App.jsx)

## 💡 Tips for Customization

1. **Change Colors**: Update Tailwind color classes (e.g., `bg-blue-600` → `bg-purple-600`)
2. **Add Fields**: Add new input fields in Registration form
3. **Modify Roles**: Edit role options in the dropdown
4. **Custom Validation**: Enhance validation logic in auth.js
5. **Add More Pages**: Create new components in `pages/` folder
6. **Update Messages**: Change error/success message text

---

**Created**: February 2026  
**Author**: Your Name  
**Version**: 1.0.0
