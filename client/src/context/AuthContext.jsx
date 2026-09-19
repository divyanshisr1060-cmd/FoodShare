import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('foodshare_token') || null);
  const [loading, setLoading] = useState(true);

  // Check and load user on mount if token exists
  useEffect(() => {
    const loadUser = async () => {
      const storedToken = localStorage.getItem('foodshare_token');
      if (storedToken) {
        try {
          const res = await fetch('/api/auth/me', {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });
          if (res.ok) {
            const data = await res.json();
            setUser(data.user);
            setToken(storedToken);
          } else {
            // Token expired or invalid
            localStorage.removeItem('foodshare_token');
            setUser(null);
            setToken(null);
          }
        } catch (error) {
          console.error('Failed to authenticate with stored token:', error);
          localStorage.removeItem('foodshare_token');
          setUser(null);
          setToken(null);
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  // Login function
  const login = async (email, password) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Login failed. Please check your credentials.');
    }

    localStorage.setItem('foodshare_token', data.token);
    setToken(data.token);
    setUser(data.user);
    return data.user;
  };

  // Register function
  const register = async (userData) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Registration failed. Please try again.');
    }

    localStorage.setItem('foodshare_token', data.token);
    setToken(data.token);
    setUser(data.user);
    return data.user;
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('foodshare_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
