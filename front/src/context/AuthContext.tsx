
import React, { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('gut_health_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // In a real app, this would be an API call
      // For demo, just simulate login with local storage
      setLoading(true);
      
      // Simple validation
      if (!email || !password) {
        throw new Error("Email and password are required");
      }
      
      // Mock user
      const user = {
        id: uuidv4(),
        name: email.split('@')[0],
        email,
        avatar: undefined,
      };
      
      // Store in local storage
      localStorage.setItem('gut_health_user', JSON.stringify(user));
      setUser(user);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      // In a real app, this would be an API call
      setLoading(true);
      
      // Simple validation
      if (!name || !email || !password) {
        throw new Error("Name, email and password are required");
      }
      
      // Mock user creation
      const user = {
        id: uuidv4(),
        name,
        email,
        avatar: undefined,
      };
      
      // Store in local storage
      localStorage.setItem('gut_health_user', JSON.stringify(user));
      setUser(user);
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('gut_health_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
