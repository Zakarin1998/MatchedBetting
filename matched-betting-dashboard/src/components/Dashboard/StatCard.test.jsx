import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { FiActivity } from 'react-icons/fi';
import StatCard from './StatCard';

describe('StatCard Component', () => {
  it('renders label, value, and helpText correctly', () => {
    render(
      <ChakraProvider>
        <StatCard
          label="Test Label"
          value="42"
          helpText="Test Help Text"
        />
      </ChakraProvider>
    );
    
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('Test Help Text')).toBeInTheDocument();
  });

  it('renders icon when provided', () => {
    render(
      <ChakraProvider>
        <StatCard
          label="Test Label"
          value="42"
          icon={<FiActivity data-testid="icon" />}
        />
      </ChakraProvider>
    );
    
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('works without optional props', () => {
    render(
      <ChakraProvider>
        <StatCard
          label="Test Label"
          value="42"
        />
      </ChakraProvider>
    );
    
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
    // Help text should not be in the document
    expect(screen.queryByText('Test Help Text')).not.toBeInTheDocument();
  });
});