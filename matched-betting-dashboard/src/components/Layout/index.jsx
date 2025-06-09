import React from 'react';
import { Box, Container } from '@chakra-ui/react';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

/**
 * Layout component that wraps the entire application
 * Provides consistent navigation and footer across all pages
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to be rendered inside the layout
 */
export default function Layout({ children }) {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Navbar />
      <Container maxW="container.xl" py={8} flex="1">
        {children}
      </Container>
      <Footer />
      <ScrollToTop />
    </Box>
  );
}