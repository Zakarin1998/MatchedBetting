import React from 'react';
import {
  Box,
  Stack,
  Text,
  Flex,
} from '@chakra-ui/react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Card from '../UI/Card';
import { useTheme as useNextTheme } from 'next-themes';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function ResultsDisplay({ result }) {
  const { theme } = useNextTheme();
  const isDark = theme === 'dark';

  if (!result) {
    return (
      <Box p={4} bg={isDark ? "blue.900" : "blue.50"} color={isDark ? "blue.200" : "blue.800"} borderRadius="md" mb={6}>
        <Text fontWeight="bold">No results yet</Text>
        <Text>Run an analysis using the calculator above to see predictions and value bets.</Text>
      </Box>
    );
  }

  const { pred, vb, matchId, providers } = result;
  
  // Prepare chart data
  const chartData = {
    labels: ['Home Win', 'Draw', 'Away Win'],
    datasets: [
      {
        data: [0.55, 0.25, 0.2], // Mock data - in a real app this would come from the API
        backgroundColor: isDark 
          ? ['#718096', '#4A5568', '#2D3748'] 
          : ['#2D3748', '#718096', '#A0AEC0'],
        borderColor: isDark ? ['#171923', '#171923', '#171923'] : ['#E2E8F0', '#E2E8F0', '#E2E8F0'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: isDark ? '#FFFFFF' : '#000000',
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.raw * 100}%`;
          }
        }
      }
    },
    cutout: '70%',
    responsive: true,
    maintainAspectRatio: true,
  };

  return (
    <Stack spacing={6} id="value-bets">
      <Card 
        title="Prediction Results" 
        subtitle={`Match: ${matchId} • Providers: ${providers.join(', ')}`}
      >
        <Flex direction={{ base: 'column', md: 'row' }} gap={6}>
          <Box flex="1">
            <Stack spacing={4}>
              <Box>
                <Text fontWeight="bold" mb={2}>Predicted Outcome</Text>
                <Box p={2} borderRadius="md" bg={isDark ? "green.800" : "green.100"} color={isDark ? "green.100" : "green.800"} display="inline-block">
                  {pred[0]}
                </Box>
              </Box>
              
              <Box>
                <Text fontWeight="bold" mb={2}>Possible Scores</Text>
                <Flex wrap="wrap" gap={2}>
                  {pred[1].map((score, idx) => (
                    <Box key={idx} p={2} borderRadius="md" bg={isDark ? "gray.700" : "gray.100"} fontSize="sm">
                      {score}
                    </Box>
                  ))}
                </Flex>
              </Box>
              
              <Box>
                <Text fontWeight="bold" mb={2}>Value Bet Recommendation</Text>
                <Box p={3} borderRadius="md" bg={isDark ? "green.800" : "green.100"} color={isDark ? "green.100" : "green.800"}>
                  {vb}
                </Box>
              </Box>
            </Stack>
          </Box>
          <Box flex="1" maxH="300px">
            <Text fontWeight="bold" textAlign="center" mb={4}>Outcome Probability Distribution</Text>
            <Box maxW="300px" mx="auto">
              <Doughnut data={chartData} options={chartOptions} />
            </Box>
          </Box>
        </Flex>
      </Card>
    </Stack>
  );
}