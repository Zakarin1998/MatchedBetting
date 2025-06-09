import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import Card from './index';

describe('Card Component', () => {
  it('renders children correctly', () => {
    render(
      <ChakraProvider>
        <Card>
          <div data-testid="child">Child Content</div>
        </Card>
      </ChakraProvider>
    );
    
    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  it('renders title and subtitle when provided', () => {
    render(
      <ChakraProvider>
        <Card
          title="Test Title"
          subtitle="Test Subtitle"
        >
          Content
        </Card>
      </ChakraProvider>
    );
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('renders header right element when provided', () => {
    render(
      <ChakraProvider>
        <Card
          title="Test Title"
          headerRight={<button data-testid="header-button">Action</button>}
        >
          Content
        </Card>
      </ChakraProvider>
    );
    
    expect(screen.getByTestId('header-button')).toBeInTheDocument();
  });

  it('renders footer when provided', () => {
    render(
      <ChakraProvider>
        <Card
          footer={<div data-testid="footer">Footer Content</div>}
        >
          Content
        </Card>
      </ChakraProvider>
    );
    
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByText('Footer Content')).toBeInTheDocument();
  });
});