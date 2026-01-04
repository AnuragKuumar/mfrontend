import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { 
  sanitizeInput, 
  validateEmail, 
  validatePassword,
  rateLimiter,
  secureStorage,
  csrfToken
} from '../utils/security';

const AuthContext = createContext();

const initialState = {
  user: null,
  token: secureStorage.get('auth_token'),
  isAuthenticated: false,
  loading: true,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'USER_LOADED':
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      secureStorage.set('auth_token', action.payload.token);
      localStorage.setItem('token', action.payload.token); // Also store in regular localStorage for compatibility
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case 'AUTH_ERROR':
    case 'LOGIN_FAIL':
    case 'REGISTER_FAIL':
    case 'LOGOUT':
      secureStorage.remove('auth_token');
      localStorage.removeItem('token'); // Also remove from regular localStorage
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    case 'CLEAR_ERRORS':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Set auth token in axios headers
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  // Load user
  const loadUser = async () => {
    const token = secureStorage.get('auth_token');
    if (token) {
      setAuthToken(token);
    }

    try {
      const res = await axios.get('/api/auth/me');
      dispatch({
        type: 'USER_LOADED',
        payload: res.data.user,
      });
    } catch (err) {
      dispatch({ type: 'AUTH_ERROR' });
    }
  };

  // Register user with security validation
  const register = async (formData) => {
    try {
      // Rate limiting check
      if (!rateLimiter.canMakeRequest('register', 3, 300000)) { // 3 attempts per 5 minutes
        toast.error('Too many registration attempts. Please try again later.');
        throw new Error('Rate limit exceeded');
      }

      // Input validation and sanitization
      const sanitizedData = {
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email.toLowerCase()),
        phone: sanitizeInput(formData.phone.replace(/\D/g, '')),
        password: formData.password // Don't sanitize password
      };

      // Validate email
      if (!validateEmail(sanitizedData.email)) {
        toast.error('Please enter a valid email address');
        throw new Error('Invalid email');
      }

      // Validate password
      const passwordValidation = validatePassword(sanitizedData.password);
      if (!passwordValidation.isValid) {
        toast.error(passwordValidation.errors[0]);
        throw new Error('Invalid password');
      }

      // Add CSRF token
      const headers = {
        'X-CSRF-Token': csrfToken.get()
      };

      const res = await axios.post('/api/auth/register', sanitizedData, { headers });
      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: res.data,
      });
      toast.success('Registration successful!');
      loadUser();
    } catch (err) {
      const error = err.response?.data?.message || err.message || 'Registration failed';
      toast.error(error);
      dispatch({
        type: 'REGISTER_FAIL',
        payload: error,
      });
      throw err;
    }
  };

  // Login user with security validation
  const login = async (formData) => {
    try {
      // Rate limiting check
      if (!rateLimiter.canMakeRequest('login', 5, 900000)) { // 5 attempts per 15 minutes
        toast.error('Too many login attempts. Please try again later.');
        throw new Error('Rate limit exceeded');
      }

      // Input sanitization
      const sanitizedData = {
        email: sanitizeInput(formData.email.toLowerCase()),
        password: formData.password // Don't sanitize password
      };

      // Validate email format
      if (!validateEmail(sanitizedData.email)) {
        toast.error('Please enter a valid email address');
        throw new Error('Invalid email');
      }

      // Demo mode - simulate successful login
      if (sanitizedData.email === 'demo@mobirepair.com' && sanitizedData.password === 'demo123') {
        const demoUser = {
          id: 'demo-user-123',
          name: 'Demo User',
          email: 'demo@mobirepair.com',
          phone: '+91 7407926912',
          role: 'user'
        };
        const demoToken = 'demo-jwt-token-123';
        
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            token: demoToken,
            user: demoUser
          },
        });
        toast.success('Login successful!');
        return;
      }

      // Add CSRF token
      const headers = {
        'X-CSRF-Token': csrfToken.get()
      };
      
      const res = await axios.post('/api/auth/login', sanitizedData, { headers });
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: res.data,
      });
      toast.success('Login successful!');
      loadUser();
    } catch (err) {
      const error = err.response?.data?.message || err.message || 'Login failed';
      toast.error(error);
      dispatch({
        type: 'LOGIN_FAIL',
        payload: error,
      });
      throw err;
    }
  };

  // Logout with token cleanup
  const logout = () => {
    // Clear token from storage and axios headers
    secureStorage.remove('auth_token');
    localStorage.removeItem('token'); // Also remove from regular localStorage
    setAuthToken(null);
    
    // Generate new CSRF token
    csrfToken.store(csrfToken.generate());
    
    dispatch({ type: 'LOGOUT' });
    toast.success('Logged out successfully');
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        register,
        login,
        logout,
        loadUser,
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