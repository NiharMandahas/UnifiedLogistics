// AuthContext.js
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (username) => {
    setUser(username); // Set the logged-in user
  };

  const logout = () => {
    setUser(null); // Clear user data
    localStorage.removeItem('username'); // Remove from localStorage
  };

  const value = { user, isLoggedIn: !!user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
