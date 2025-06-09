import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Flex,
  Spinner,
  Box,
} from '@chakra-ui/react';
import { FiActivity } from 'react-icons/fi'; // Changed from FiCalculator to FiActivity
import Card from '../UI/Card';
import { predictMatch, identifyValueBet } from '../../services/api';
import { useTheme as useNextTheme } from 'next-themes';

export default function Calculator({ onResultUpdate }) {
  const [matchId, setMatchId] = useState('Milan-Inter');
  const [providers, setProviders] = useState('Bet365,Betfair');
  const [homeProb, setHomeProb] = useState(0.55);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { theme } = useNextTheme();
  const isDark = theme === 'dark';

  const handleRun = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const provArr = providers.split(',').map(p => p.trim());
      
      // Run predictions
      const pred = await predictMatch(matchId, provArr);
      
      // Run value bet identification
      const vb = await identifyValueBet(matchId, provArr, { home: parseFloat(homeProb) });
      
      // Update parent component with results
      onResultUpdate({ 
        pred: pred.data, 
        vb: vb.data,
        matchId,
        providers: provArr
      });
    } catch (error) {
      console.error('Error running prediction:', error);
      setError(error.response?.data?.error || 'Failed to run prediction');
    } finally {
      setIsLoading(false);
    }
  };

  // Show error messages if needed
  const showError = () => {
    if (error) {
      return (
        <Box mt={4} p={3} bg="red.100" color="red.800" borderRadius="md">
          {error}
        </Box>
      );
    }
    return null;
  };

  return (
    <Card 
      id="calculator" 
      mb={6} 
      title="Match Prediction Calculator"
      subtitle="Enter match details to calculate predictions and value bets"
    >
      <Stack spacing={4}>
        <FormControl>
          <FormLabel>Match ID</FormLabel>
          <Input
            value={matchId}
            onChange={(e) => setMatchId(e.target.value)}
            placeholder="e.g. Milan-Inter"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Betting Providers</FormLabel>
          <Input
            value={providers}
            onChange={(e) => setProviders(e.target.value)}
            placeholder="Comma-separated list e.g. Bet365,Betfair"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Home Win Probability</FormLabel>
          <Input
            value={homeProb}
            onChange={(e) => setHomeProb(e.target.value)}
            type="number"
            step="0.01"
            min="0"
            max="1"
            placeholder="Enter probability between 0 and 1"
          />
        </FormControl>
        
        {error && showError()}
        
        <Flex justify="flex-end">
          <Button
            colorScheme={isDark ? "blue" : "blackAlpha"}
            onClick={handleRun}
            isLoading={isLoading}
            loadingText="Calculating"
            leftIcon={isLoading ? null : <FiActivity />}
          >
            Run Analysis
          </Button>
        </Flex>
      </Stack>
    </Card>
  );
}