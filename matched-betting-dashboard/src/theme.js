import { extendTheme } from '@chakra-ui/react';

/**
 * Custom theme for the application
 * Uses modern Chakra UI v3 approach with next-themes
 * 
 * CSS variables are now used instead of React Context
 * for better performance
 */
const theme = extendTheme({
  config: {
    initialColorMode: 'system',
    useSystemColorMode: true,
  },
  colors: {
    brand: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },
  },
  fonts: {
    heading: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  },
  styles: {
    global: {
      // Light mode styles (default)
      body: {
        bg: 'gray.50',
        color: 'gray.800',
      },
      
      // Dark mode styles (applied when html has .dark class)
      '.dark body': {
        bg: 'gray.900',
        color: 'white',
      },
      
      // Improve focus styles for better accessibility
      '*:focus': {
        boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.6) !important',
        outline: 'none !important',
      },
      
      // Smooth scrolling for the entire app
      html: {
        scrollBehavior: 'smooth',
      }
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'medium',
        borderRadius: 'md',
      },
      variants: {
        solid: {
          bg: 'brand.600',
          color: 'white',
          _hover: {
            bg: 'brand.700',
          },
          '.dark &': {
            bg: 'brand.500',
            _hover: {
              bg: 'brand.600',
            },
          }
        },
        outline: {
          borderColor: 'brand.600',
          color: 'brand.600',
          '.dark &': {
            borderColor: 'brand.500',
            color: 'brand.500',
          }
        },
        ghost: {
          _hover: {
            bg: 'gray.100',
          },
          '.dark &': {
            _hover: {
              bg: 'whiteAlpha.200',
            },
          }
        },
      },
    },
    Input: {
      variants: {
        filled: {
          field: {
            bg: 'gray.100',
            _hover: {
              bg: 'gray.200',
            },
            _focus: {
              bg: 'gray.200',
            },
            '.dark &': {
              bg: 'whiteAlpha.100',
              _hover: {
                bg: 'whiteAlpha.200',
              },
              _focus: {
                bg: 'whiteAlpha.300',
              },
            }
          },
        },
      },
      defaultProps: {
        variant: 'filled',
      },
    },
    // Add consistent card styling
    Card: {
      baseStyle: {
        container: {
          bg: 'white',
          boxShadow: 'md',
          borderRadius: 'lg',
          overflow: 'hidden',
          '.dark &': {
            bg: 'gray.800',
          }
        },
        header: {
          py: 4,
          px: 6,
        },
        body: {
          py: 4,
          px: 6,
        },
        footer: {
          py: 4,
          px: 6,
        },
      },
    },
    // Improve tooltip styling
    Tooltip: {
      baseStyle: {
        bg: 'gray.700',
        color: 'white',
        fontSize: 'sm',
        borderRadius: 'md',
        px: 3,
        py: 2,
        '.dark &': {
          bg: 'gray.200',
          color: 'gray.800',
        }
      },
    },
  },
});

export default theme;