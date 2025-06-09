import React from 'react';
import {
  Box,
  Container,
  Stack,
  Text,
  Flex,
  Link,
  Icon,
} from '@chakra-ui/react';
import { FiGithub, FiHeart } from 'react-icons/fi';
import { useTheme as useNextTheme } from 'next-themes';

/**
 * Footer component displaying copyright information and links
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { theme } = useNextTheme();
  const isDark = theme === 'dark';
  
  // Theme-based colors
  const bgColor = isDark ? 'gray.900' : 'gray.50';
  const borderColor = isDark ? 'gray.700' : 'gray.200';
  const textColor = isDark ? 'gray.400' : 'gray.600';
  const linkColor = isDark ? 'gray.200' : 'gray.800';
  
  return (
    <Box
      bg={bgColor}
      color={textColor}
      borderTop="1px"
      borderColor={borderColor}
    >
      <Container
        as={Stack}
        maxW="container.xl"
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Text fontSize="sm">
          © {currentYear} Matched Betting Dashboard. All rights reserved
        </Text>
        
        <Stack direction="row" spacing={6}>
          <Link 
            href="#" 
            color={linkColor} 
            fontSize="sm" 
            _hover={{ color: 'brand.500' }}
          >
            <Flex align="center">
              <Icon as={FiHeart} mr={1} />
              <Text>Feedback</Text>
            </Flex>
          </Link>
          <Link 
            href="#" 
            color={linkColor} 
            fontSize="sm" 
            _hover={{ color: 'brand.500' }}
          >
            <Flex align="center">
              <Icon as={FiGithub} mr={1} />
              <Text>GitHub</Text>
            </Flex>
          </Link>
        </Stack>
      </Container>
    </Box>
  );
}