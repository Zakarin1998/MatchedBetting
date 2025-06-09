import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Container,
  Tooltip,
} from '@chakra-ui/react';
import { Collapse } from '@chakra-ui/transition';
import { FiMenu, FiX, FiHome, FiTrendingUp, FiDollarSign, FiList } from 'react-icons/fi';
import { useTheme as useNextTheme } from 'next-themes';
import ThemeToggle from '../UI/ThemeToggle';

export default function Navbar() {
  const { isOpen, onToggle } = React.useDisclosure();
  const [activeSection, setActiveSection] = useState('#');
  const { theme } = useNextTheme();
  const isDark = theme === 'dark';
  
  // Track the active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map(item => item.href).filter(href => href !== '#');
      
      // Find the current section in view
      for (const section of sections) {
        const element = document.querySelector(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            return;
          }
        }
      }
      
      // If no section is in view, default to the top
      setActiveSection('#');
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initialize on mount
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle smooth scrolling for navigation links
  const handleNavClick = (e, href) => {
    e.preventDefault();
    
    // Handle the home link specially
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('#');
      return;
    }
    
    // Find the target section
    const targetSection = document.querySelector(href);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(href);
      
      // Close mobile menu if open
      if (isOpen) {
        onToggle();
      }
    } else {
      console.warn(`Section not found: ${href}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Theme-based colors
  const bgColor = isDark ? 'gray.800' : 'white';
  const borderColor = isDark ? 'gray.700' : 'gray.200';
  const linkColor = isDark ? 'gray.200' : 'gray.600';
  const linkHoverColor = isDark ? 'white' : 'gray.800';
  const activeColor = isDark ? 'brand.300' : 'brand.600';

  return (
    <Box position="sticky" top={0} zIndex={10} bg={bgColor} boxShadow="sm">
      <Container maxW="container.xl">
        <Flex
          minH={'60px'}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderStyle={'solid'}
          borderColor={borderColor}
          align={'center'}
          justify="space-between"
        >
          <Text
            fontFamily={'heading'}
            fontWeight="bold"
            color={isDark ? 'white' : 'gray.800'}
            cursor="pointer"
            onClick={(e) => handleNavClick(e, '#')}
          >
            Matched Betting Dashboard
          </Text>

          {/* Desktop Navigation */}
          <Flex display={{ base: 'none', md: 'flex' }} align="center">
            <Stack direction={'row'} spacing={4} mr={4}>
              {NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label}>
                  <Tooltip label={navItem.tooltip || navItem.label} placement="bottom" hasArrow>
                    <Flex 
                      as="a"
                      p={2}
                      href={navItem.href}
                      fontSize={'sm'}
                      fontWeight={activeSection === navItem.href ? 'semibold' : 'medium'}
                      color={activeSection === navItem.href ? activeColor : linkColor}
                      align="center"
                      borderBottom="2px solid"
                      borderColor={activeSection === navItem.href ? activeColor : 'transparent'}
                      transition="all 0.2s"
                      onClick={(e) => handleNavClick(e, navItem.href)}
                      _hover={{
                        textDecoration: 'none',
                        color: linkHoverColor,
                      }}
                    >
                      {navItem.icon && <Box mr={2}>{navItem.icon}</Box>}
                      {navItem.label}
                    </Flex>
                  </Tooltip>
                </Box>
              ))}
            </Stack>
            
            {/* Theme Toggle */}
            <ThemeToggle />
          </Flex>

          {/* Mobile Menu Toggle */}
          <Flex display={{ base: 'flex', md: 'none' }} align="center">
            <ThemeToggle />
            <IconButton
              ml={2}
              onClick={onToggle}
              icon={isOpen ? <FiX /> : <FiMenu />}
              variant="ghost"
              aria-label="Toggle Navigation"
            />
          </Flex>
        </Flex>

        {/* Mobile Navigation */}
        <Collapse in={isOpen} animateOpacity>
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} role="navigation" spacing={4}>
              {NAV_ITEMS.map((navItem) => (
                <Flex
                  key={navItem.label}
                  py={2}
                  as="a"
                  href={navItem.href}
                  justify="flex-start"
                  align="center"
                  borderLeft="4px solid"
                  pl={3}
                  borderColor={activeSection === navItem.href ? activeColor : 'transparent'}
                  color={activeSection === navItem.href ? activeColor : linkColor}
                  onClick={(e) => handleNavClick(e, navItem.href)}
                  _hover={{
                    textDecoration: 'none',
                    color: linkHoverColor,
                    bg: isDark ? 'gray.700' : 'gray.50',
                  }}
                >
                  {navItem.icon && <Box mr={3}>{navItem.icon}</Box>}
                  <Text fontWeight={activeSection === navItem.href ? 'semibold' : 'medium'}>
                    {navItem.label}
                  </Text>
                </Flex>
              ))}
    </Stack>
          </Box>
        </Collapse>
      </Container>
    </Box>
  );
}

const NAV_ITEMS = [
  {
    label: 'Dashboard',
    href: '#',
    icon: <FiHome />,
    tooltip: 'Return to dashboard overview'
  },
  {
    label: 'Predictions',
    href: '#calculator',
    icon: <FiTrendingUp />,
    tooltip: 'Calculate match predictions'
  },
  {
    label: 'Value Bets',
    href: '#value-bets',
    icon: <FiDollarSign />,
    tooltip: 'View value betting opportunities'
  },
  {
    label: 'Logs',
    href: '#logs',
    icon: <FiList />,
    tooltip: 'View system activity logs'
  },
];