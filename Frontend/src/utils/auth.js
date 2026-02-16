// Utility functions for user authentication and localStorage management

// Get all registered users from localStorage
export const getAllUsers = () => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

// Save a new user to localStorage
export const registerUser = (userData) => {
  const users = getAllUsers();
  
  // Check if user already exists
  const userExists = users.some(user => user.email === userData.email);
  if (userExists) {
    return { success: false, message: 'Email already registered' };
  }
  
  // Add new user
  users.push(userData);
  localStorage.setItem('users', JSON.stringify(users));
  return { success: true, message: 'Registration successful' };
};

// Verify login credentials
export const loginUser = (email, password) => {
  const users = getAllUsers();
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    // Save current user session
    localStorage.setItem('currentUser', JSON.stringify({
      id: email, // Using email as unique identifier
      fullName: user.fullName,
      email: user.email,
      role: user.role
    }));
    return { success: true, user };
  }
  
  return { success: false, message: 'Invalid email or password' };
};

// Get current logged-in user
export const getCurrentUser = () => {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
};

// Logout user
export const logoutUser = () => {
  localStorage.removeItem('currentUser');
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return getCurrentUser() !== null;
};
