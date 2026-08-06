import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import toast from 'react-hot-toast';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await authService.getProfile();
          if (response && response.success) {
            setUser(response.data);
          } else {
            localStorage.removeItem('token');
          }
        } catch (error) {
          console.error("Auth context error:", error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      if (response && response.access_token) {
        // Token is stored in localStorage by authService
        // Backend TokenResponse includes the user directly
        setUser(response.user);
        return true;
      }
      return false;
    } catch (error) {
      const msg = error.response?.data?.detail || "Login failed";
      toast.error(msg);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      await authService.register(userData);
      return true;
    } catch (error) {
      const msg = error.response?.data?.detail || "Registration failed";
      toast.error(msg);
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};