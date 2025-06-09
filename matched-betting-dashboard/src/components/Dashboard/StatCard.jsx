import React from 'react';
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';

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
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
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
          bg={useColorModeValue('gray.100', 'gray.700')}
          color={useColorModeValue('gray.600', 'gray.200')}
        >
          {icon}
        </Box>
      )}
      
      <Stat>
        <StatLabel>{label}</StatLabel>
        <StatNumber>{value}</StatNumber>
        {helpText && <StatHelpText>{helpText}</StatHelpText>}
      </Stat>
    </Box>
  );
};

export default StatCard;