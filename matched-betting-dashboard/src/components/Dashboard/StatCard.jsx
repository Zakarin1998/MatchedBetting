import React from 'react';
import {
  Box,
  Text,
} from '@chakra-ui/react';
import { useTheme as useNextTheme } from 'next-themes';

/**
 * A card displaying a single statistic
 * 
 * @param {Object} props - Component props
 * @param {string} props.label - Stat label
 * @param {string|number} props.value - Stat value
 * @param {string} props.helpText - Additional help text
 * @param {React.ReactNode} props.icon - Optional icon
 */
const StatCard = ({ label, value, helpText, icon }) => {
  const { theme } = useNextTheme();
  const isDark = theme === 'dark';
  
  // Theme-based colors
  const bgColor = isDark ? 'gray.800' : 'white';
  const borderColor = isDark ? 'gray.700' : 'gray.200';
  const iconBg = isDark ? 'gray.700' : 'gray.100';
  const iconColor = isDark ? 'gray.200' : 'gray.600';
  
  return (
    <Box
      p={5}
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      boxShadow="sm"
      display="flex"
      alignItems="center"
    >
      {icon && (
        <Box
          mr={4}
          p={2}
          borderRadius="md"
          bg={iconBg}
          color={iconColor}
        >
          {icon}
        </Box>
      )}
      
      <Box>
        <Text fontSize="sm" color={isDark ? "gray.400" : "gray.500"}>{label}</Text>
        <Text fontSize="2xl" fontWeight="bold">{value}</Text>
        {helpText && <Text fontSize="xs" color={isDark ? "gray.400" : "gray.500"} mt={1}>{helpText}</Text>}
      </Box>
    </Box>
  );
};

export default StatCard;