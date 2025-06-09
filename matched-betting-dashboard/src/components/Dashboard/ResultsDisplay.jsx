import React from 'react';
import {
  Box,
  Stack,
  Text,
  Badge,
  Flex,
  Tag,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Card from '../UI/Card';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function ResultsDisplay({ result }) {
  if (!result) {
    return (
      <Alert status="info" borderRadius="md">
        <AlertIcon />
        <AlertTitle>No results yet</AlertTitle>
        <AlertDescription>
          Run an analysis using the calculator above to see predictions and value bets.
        </AlertDescription>
      </Alert>
    );
  }

  const { pred, vb, matchId, providers } = result;
  
  // Prepare chart data
  const chartData = {
    labels: ['Home Win', 'Draw', 'Away Win'],
    datasets: [
      {
        data: [0.55, 0.25, 0.2], // Mock data - in a real app this would come from the API
        backgroundColor: ['#2D3748', '#718096', '#A0AEC0'],
        borderColor: ['#E2E8F0', '#E2E8F0', '#E2E8F0'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: 'bottom',
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
                <Badge colorScheme={pred[0] === 'HomeWin' ? 'green' : pred[0] === 'Draw' ? 'yellow' : 'red'} p={2} borderRadius="md">
                  {pred[0]}
                </Badge>
              </Box>
              
              <Box>
                <Text fontWeight="bold" mb={2}>Possible Scores</Text>
                <Flex wrap="wrap" gap={2}>
                  {pred[1].map((score, idx) => (
                    <Tag key={idx} size="md" variant="subtle" colorScheme="gray">
                      {score}
                    </Tag>
                  ))}
                </Flex>
              </Box>
              
              <Box>
                <Text fontWeight="bold" mb={2}>Value Bet Recommendation</Text>
                <Alert status="success" borderRadius="md">
                  <AlertIcon />
                  {vb}
                </Alert>
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