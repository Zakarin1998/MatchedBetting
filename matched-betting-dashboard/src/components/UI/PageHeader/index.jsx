import React from 'react';
import {
  Box,
  Heading,
  Text,
} from '@chakra-ui/react';
import { useTheme as useNextTheme } from 'next-themes';

/**
 * A reusable page header component
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Page title
 * @param {string} props.subtitle - Page subtitle
 * @param {React.ReactNode} props.rightElement - Content to display on the right
 * @param {Object} props.props - Additional props to pass to the container
 */
export const PageHeader = ({ 
  title, 
  subtitle, 
  rightElement,
  ...props 
}) => {
  const { theme } = useNextTheme();
  const isDark = theme === 'dark';
  
  // Theme-based gradient
  const bgGradient = isDark
    ? 'linear(to-r, gray.700, gray.800)'
    : 'linear(to-r, gray.100, gray.200)';
  
  return (
    <Box
      p={8}
      borderRadius="lg"
      bgGradient={bgGradient}
      mb={8}
      display="flex"
      flexDirection={{ base: 'column', md: 'row' }}
      alignItems={{ base: 'flex-start', md: 'center' }}
      justifyContent="space-between"
      gap={4}
      {...props}
    >
      <Box>
        <Heading as="h1" size="xl" mb={subtitle ? 2 : 0}>
          {title}
        </Heading>
        {subtitle && (
          <Text fontSize="lg" maxW="container.md">
            {subtitle}
          </Text>
        )}
      </Box>
      
      {rightElement && (
        <Box ml={{ base: 0, md: 4 }}>
          {rightElement}
        </Box>
      )}
    </Box>
  );
};

export default PageHeader;