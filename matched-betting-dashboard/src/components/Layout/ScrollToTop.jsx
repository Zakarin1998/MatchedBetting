import { useEffect, useState } from 'react';
import { FiArrowUp } from 'react-icons/fi';
import { IconButton, Box } from '@chakra-ui/react';
import { useTheme as useNextTheme } from 'next-themes';

/**
 * ScrollToTop component that appears when the user scrolls down
 * and allows them to quickly return to the top of the page
 */
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useNextTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    // Show button when user scrolls down 300px
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    // Clean up event listener on component unmount
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Scroll to top handler
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Use different button colors based on theme
  const colorScheme = isDark ? 'blue' : 'brand';

  return (
    <Box
      position="fixed"
      bottom="4"
      right="4"
      zIndex="10"
      opacity={isVisible ? 1 : 0}
      visibility={isVisible ? 'visible' : 'hidden'}
      transition="opacity 0.3s, visibility 0.3s"
    >
      <IconButton
        aria-label="Scroll to top"
        icon={<FiArrowUp />}
        colorScheme={colorScheme}
        size="md"
        onClick={scrollToTop}
        borderRadius="full"
        boxShadow="md"
      />
    </Box>
  );
};

export default ScrollToTop;