import React from 'react';
import {
  Box,
  Heading,
  Text,
  Divider,
} from '@chakra-ui/react';
import { useTheme as useNextTheme } from 'next-themes';

/**
 * A reusable card component with optional header and footer
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.title - Card title
 * @param {string} props.subtitle - Card subtitle
 * @param {React.ReactNode} props.headerRight - Content to display on the right side of the header
 * @param {React.ReactNode} props.footer - Footer content
 * @param {Object} props.props - Additional props to pass to the Card container
 */
export const Card = ({ 
  children, 
  title, 
  subtitle, 
  headerRight,
  footer,
  ...props 
}) => {
  const { theme } = useNextTheme();
  const isDark = theme === 'dark';
  
  // Theme-based colors
  const bgColor = isDark ? 'gray.800' : 'white';
  const borderColor = isDark ? 'gray.700' : 'gray.200';
  const subtitleColor = isDark ? 'gray.400' : 'gray.600';
  
  return (
    <Box
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      overflow="hidden"
      boxShadow="sm"
      {...props}
    >
      {(title || headerRight) && (
        <>
          <Box p={4} display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              {title && <Heading size="md">{title}</Heading>}
              {subtitle && (
                <Text color={subtitleColor} fontSize="sm" mt={1}>
                  {subtitle}
                </Text>
              )}
            </Box>
            {headerRight && <Box>{headerRight}</Box>}
          </Box>
          <Divider />
        </>
      )}
      
      <Box p={4}>
        {children}
      </Box>
      
      {footer && (
        <>
          <Divider />
          <Box p={4}>
            {footer}
          </Box>
        </>
      )}
    </Box>
  );
};

export default Card;