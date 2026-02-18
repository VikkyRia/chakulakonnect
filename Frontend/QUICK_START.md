# Quick Start Guide - Authentication System

## ⚡ 5-Minute Setup

### 1. **Start the Dev Server**
```bash
npm run dev
```
Open your browser → `http://localhost:5173`

### 2. **You're All Set!** 🎉

The login page will load automatically.

---

## 🔑 Demo Account

Ready to test? Use these credentials:

| Field | Value |
|-------|-------|
| **Email** | `demo@example.com` |
| **Password** | `demo123` |

### Steps:
1. In the login form, paste the email
2. Paste the password
3. Click **Login**
4. You'll see a welcome dashboard!

---

## 📝 Create Your Own Account

### Steps:
1. Click **"Sign up here"** on the login page
2. Fill in the registration form:
   - **Full Name**: Your name
   - **Email**: Unique email (e.g., `yourname@example.com`)
   - **Password**: At least 6 characters
   - **Role**: Choose one (Consumer, Farmer, Vendor, Admin)
3. Click **"Sign Up"**
4. You'll be redirected to login
5. Login with your new credentials

---

## 🚀 Key Features to Test

### ✅ Registration
- Try registering with different roles
- Try duplicate email (should show error)
- Try short password (should show error)
- Form validation works immediately

### ✅ Login
- Works with any registered account
- Shows error for wrong password
- Remembers user after login

### ✅ Dashboard
- Shows your name in welcome message
- Displays your email
- Shows your selected role
- **Logout button** clears session and returns to login

### ✅ Protected Routes
- Try going to `/dashboard` without logging in
- You'll be automatically redirected to login
- Once logged in, you can access dashboard

---

## 🔍 View Your Data

All data is stored in your browser's localStorage.

**To view:**
1. Press `F12` (Open DevTools)
2. Go to **Application** tab
3. Click **Local Storage**
4. Find your localhost URL
5. You'll see two entries:
   - `users`: All registered accounts
   - `currentUser`: Currently logged-in user (only exists when logged in)

---

## 📂 File Structure

```
Frontend/
├── src/
│   ├── pages/
│   │   ├── Registration.jsx  ← Sign up form
│   │   ├── Login.jsx         ← Login form
│   │   └── Dashboard.jsx     ← User dashboard
│   ├── utils/
│   │   └── auth.js           ← All auth logic
│   └── App.jsx               ← Routes setup
└── package.json
```

---

## ⚙️ How It Works (Simple Overview)

### Registration Flow
```
User fills form → Validation → Store in localStorage → Redirect to login
```

### Login Flow
```
User enters credentials → Check localStorage → Match found? 
→ Yes: Create session → Show dashboard
→ No: Show error message
```

### Dashboard Flow
```
Page loads → Check if user logged in?
→ Yes: Show dashboard
→ No: Redirect to login
```

### Logout Flow
```
Click logout → Delete session from localStorage → Redirect to login
```

---

## 🎨 What You'll See

### Login Page 🟢
- Clean green gradient background
- Email and password fields
- Demo credentials shown below form
- Link to sign up

### Registration Page 🔵
- Blue gradient background
- Full Name, Email, Password, Role fields
- Real-time validation
- Link to login

### Dashboard 💜
- Purple gradient background
- Welcome message with your name
- Your email and role displayed
- Logout button
- Account details section

---

## 🐛 Troubleshooting

### "Not seeing the app?"
- Check if dev server is running: `npm run dev`
- Try accessing `http://localhost:5173`

### "LoginPage appears but nothing happens?"
- Check browser console (F12 → Console tab)
- Make sure JavaScript is enabled

### "Lost my test user?"
- Clear localStorage (F12 → Application → Local Storage → Clear All)
- Demo user will be recreated on restart

### "Can't register with an email?"
- That email is already taken
- Try a different email address
- Or clear localStorage first

### "Styling looks broken?"
- Tailwind CSS might not have compiled
- Restart dev server: `npm run dev`

---

## 💡 Tips

✨ **Pro Tips:**

1. **Test All Roles**: Register users with different roles (Farmer, Vendor, Admin) to see how they're displayed

2. **Multiple Users**: You can register multiple users and test logging in/out with different accounts

3. **Form Validation**: Try submitting with empty fields to see validation errors in action

4. **Protected Routes**: After logout, try accessing `/dashboard` directly - you'll be redirected to login

5. **Try the Demo**: Before creating your own account, test with the demo account to understand the flow

---

## 🔗 Next Steps

After testing:
1. Read [AUTH_DOCUMENTATION.md](./AUTH_DOCUMENTATION.md) for detailed info
2. Customize the styling by modifying Tailwind classes
3. Add more features (password reset, profile edit, etc.)
4. Connect to a real backend when ready

---

**Happy Testing! 🎉**

If you have questions, check the detailed documentation file!
