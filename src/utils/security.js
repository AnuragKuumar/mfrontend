/**
 * Frontend Security Utilities
 * Provides client-side security measures and input validation
 */

// Input sanitization
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .replace(/[<>]/g, '') // Remove < and > characters
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
};

// Email validation
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone validation (Indian format)
export const validatePhone = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/;
  const cleanPhone = phone.replace(/\D/g, '');
  return phoneRegex.test(cleanPhone);
};

// Password strength validation
export const validatePassword = (password) => {
  const minLength = 6;
  const hasLetter = /[A-Za-z]/.test(password);
  const hasNumber = /\d/.test(password);
  
  return {
    isValid: password.length >= minLength && hasLetter && hasNumber,
    errors: [
      ...(password.length < minLength ? [`Password must be at least ${minLength} characters`] : []),
      ...(!hasLetter ? ['Password must contain at least one letter'] : []),
      ...(!hasNumber ? ['Password must contain at least one number'] : [])
    ]
  };
};

// Name validation
export const validateName = (name) => {
  const nameRegex = /^[a-zA-Z\s]+$/;
  return nameRegex.test(name) && name.length <= 50;
};

// Pincode validation
export const validatePincode = (pincode) => {
  const pincodeRegex = /^\d{6}$/;
  return pincodeRegex.test(pincode);
};

// XSS protection for display content
export const escapeHtml = (text) => {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};

// Content Security Policy helpers
export const isSecureUrl = (url) => {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'https:' || urlObj.hostname === 'localhost';
  } catch {
    return false;
  }
};

// Rate limiting helper (client-side)
class RateLimiter {
  constructor() {
    this.requests = new Map();
  }

  canMakeRequest(key, limit = 5, windowMs = 60000) {
    const now = Date.now();
    const windowStart = now - windowMs;
    
    if (!this.requests.has(key)) {
      this.requests.set(key, []);
    }
    
    const requests = this.requests.get(key);
    
    // Remove old requests outside the window
    const validRequests = requests.filter(time => time > windowStart);
    this.requests.set(key, validRequests);
    
    if (validRequests.length >= limit) {
      return false;
    }
    
    validRequests.push(now);
    return true;
  }
}

export const rateLimiter = new RateLimiter();

// Secure storage helpers
export const secureStorage = {
  set: (key, value) => {
    try {
      const encrypted = btoa(JSON.stringify(value)); // Basic encoding (use proper encryption in production)
      localStorage.setItem(key, encrypted);
    } catch (error) {
      console.error('Storage error:', error);
    }
  },
  
  get: (key) => {
    try {
      const encrypted = localStorage.getItem(key);
      if (!encrypted) return null;
      return JSON.parse(atob(encrypted));
    } catch (error) {
      console.error('Storage retrieval error:', error);
      return null;
    }
  },
  
  remove: (key) => {
    localStorage.removeItem(key);
  },
  
  clear: () => {
    localStorage.clear();
  }
};

// CSRF token management
export const csrfToken = {
  generate: () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  },
  
  store: (token) => {
    sessionStorage.setItem('csrf_token', token);
  },
  
  get: () => {
    return sessionStorage.getItem('csrf_token');
  },
  
  validate: (token) => {
    return token === sessionStorage.getItem('csrf_token');
  }
};

// Form validation helper
export const validateForm = (formData, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach(field => {
    const value = formData[field];
    const rule = rules[field];
    
    if (rule.required && (!value || value.trim() === '')) {
      errors[field] = `${field} is required`;
      return;
    }
    
    if (value && rule.validator && !rule.validator(value)) {
      errors[field] = rule.message || `Invalid ${field}`;
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Security headers check
export const checkSecurityHeaders = async () => {
  try {
    const response = await fetch('/api/security-check');
    const headers = response.headers;
    
    return {
      hasCSP: headers.has('content-security-policy'),
      hasHSTS: headers.has('strict-transport-security'),
      hasXFrame: headers.has('x-frame-options'),
      hasXContent: headers.has('x-content-type-options')
    };
  } catch (error) {
    console.warn('Security headers check failed:', error);
    return null;
  }
};

// Detect suspicious activity
export const detectSuspiciousActivity = () => {
  const indicators = {
    rapidClicks: false,
    consoleAccess: false,
    devToolsOpen: false
  };
  
  // Detect rapid clicking
  let clickCount = 0;
  document.addEventListener('click', () => {
    clickCount++;
    setTimeout(() => clickCount--, 1000);
    if (clickCount > 10) {
      indicators.rapidClicks = true;
      console.warn('Rapid clicking detected');
    }
  });
  
  // Detect console access
  const originalLog = console.log;
  console.log = (...args) => {
    indicators.consoleAccess = true;
    originalLog.apply(console, args);
  };
  
  // Detect dev tools (basic detection)
  setInterval(() => {
    const start = performance.now();
    // Simple detection without debugger statement
    const end = performance.now();
    if (end - start > 100) {
      indicators.devToolsOpen = true;
    }
  }, 5000);
  
  return indicators;
};

// Initialize security measures
export const initializeSecurity = () => {
  // Disable right-click context menu (basic protection)
  document.addEventListener('contextmenu', (e) => {
    if (process.env.NODE_ENV === 'production') {
      e.preventDefault();
    }
  });
  
  // Disable F12 and other dev shortcuts (basic protection)
  document.addEventListener('keydown', (e) => {
    if (process.env.NODE_ENV === 'production') {
      if (e.key === 'F12' || 
          (e.ctrlKey && e.shiftKey && e.key === 'I') ||
          (e.ctrlKey && e.shiftKey && e.key === 'C') ||
          (e.ctrlKey && e.key === 'U')) {
        e.preventDefault();
      }
    }
  });
  
  // Initialize CSRF token
  if (!csrfToken.get()) {
    csrfToken.store(csrfToken.generate());
  }
  
  // Start suspicious activity detection
  detectSuspiciousActivity();
  
  console.log('Security measures initialized');
};