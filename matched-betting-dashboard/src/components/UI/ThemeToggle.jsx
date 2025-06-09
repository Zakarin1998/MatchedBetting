import React from 'react';
import { IconButton, Tooltip } from '@chakra-ui/react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme as useNextTheme } from 'next-themes';

/**
 * Theme toggle button that switches between light and dark modes
 */
const ThemeToggle = () => {
  const { theme, setTheme } = useNextTheme();
  const isDark = theme === 'dark';
  
  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <Tooltip label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
      <IconButton
        aria-label="Toggle color mode"
        icon={isDark ? <FiSun /> : <FiMoon />}
        onClick={toggleTheme}
        size="md"
        variant="ghost"
      />
    </Tooltip>
  );
};

export default ThemeToggle;