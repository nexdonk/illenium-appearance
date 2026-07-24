export const modernTheme = {
  id: 'modern-minimal',

  // Colors - Red Liquid Glass Theme
  colors: {
    primary: '#dc2626',
    primaryHover: '#b91c1c',
    primaryLight: '#ef4444',
    primaryDark: '#991b1b',
    secondary: '#dc2626',
    accent: '#f87171',
    accentGlow: '#fca5a5',

    background: '#0a0a0a',
    surface: 'rgba(220, 38, 38, 0.2)',
    surfaceHover: 'rgba(220, 38, 38, 0.3)',
    surfaceGlass: 'rgba(220, 38, 38, 0.15)',

    text: {
      primary: '#fef2f2',
      secondary: '#fecaca',
      muted: '#dc2626'
    },

    border: 'rgba(220, 38, 38, 0.2)',
    borderHover: 'rgba(220, 38, 38, 0.4)',
    borderGlow: 'rgba(239, 68, 68, 0.6)',

    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',

    glass: {
      background: 'rgba(220, 38, 38, 0.15)',
      border: 'rgba(220, 38, 38, 0.25)',
      highlight: 'rgba(255, 255, 255, 0.05)',
      shadow: 'rgba(220, 38, 38, 0.3)'
    }
  },
  
  // Spacing
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px'
  },
  
  // Typography
  typography: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px'
    },
    fontWeight: {
      normal: 300,
      medium: 300,
      semibold: 400,
      bold: 400
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75
    }
  },
  
  // Shadows - Enhanced with red glow
  shadows: {
    sm: '0 2px 4px 0 rgba(0, 0, 0, 0.3), 0 0 2px rgba(220, 38, 38, 0.1)',
    base: '0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 0 4px rgba(220, 38, 38, 0.15)',
    md: '0 8px 16px -2px rgba(0, 0, 0, 0.5), 0 0 8px rgba(220, 38, 38, 0.2)',
    lg: '0 16px 32px -4px rgba(0, 0, 0, 0.6), 0 0 16px rgba(220, 38, 38, 0.25)',
    xl: '0 24px 48px -8px rgba(0, 0, 0, 0.7), 0 0 24px rgba(220, 38, 38, 0.3)',
    glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 1px rgba(255, 255, 255, 0.05)',
    glow: '0 0 20px rgba(220, 38, 38, 0.4), 0 0 40px rgba(220, 38, 38, 0.2)',
    glowHover: '0 0 30px rgba(220, 38, 38, 0.6), 0 0 60px rgba(220, 38, 38, 0.3)'
  },
  
  // Border radius
  borderRadius: {
    sm: '4px',
    base: '6px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px'
  },
  
  // Animation - Smooth liquid glass transitions
  animation: {
    duration: {
      fast: '0.2s',
      normal: '0.4s',
      slow: '0.6s',
      verySlow: '0.8s'
    },
    easing: {
      ease: 'ease',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    }
  },

  // Blur effects for glassmorphism
  blur: {
    sm: 'blur(4px)',
    md: 'blur(8px)',
    lg: 'blur(12px)',
    xl: 'blur(20px)'
  }
};

export type Theme = typeof modernTheme;
