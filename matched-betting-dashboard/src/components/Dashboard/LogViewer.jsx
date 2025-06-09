import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Stack,
  Code,
  Button,
  Spinner,
  Flex,
} from '@chakra-ui/react';
import { FiRefreshCw } from 'react-icons/fi';
import Card from '../UI/Card';
import { getLogs } from '../../services/api';
import { useTheme as useNextTheme } from 'next-themes';

export default function LogViewer() {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const { theme } = useNextTheme();
  const isDark = theme === 'dark';
  
  // Theme-based colors
  const bgColor = isDark ? 'gray.800' : 'gray.50';

  const fetchLogs = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await getLogs(20); // Get the last 20 log entries
      setLogs(response.data);
    } catch (err) {
      setError('Failed to fetch logs: ' + (err.message || 'Unknown error'));
      console.error('Error fetching logs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
    
    // Set up interval to refresh logs
    const intervalId = setInterval(fetchLogs, 30000); // Refresh every 30 seconds
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Parse log level to determine color
  const getLogLevelColor = (logLine) => {
    if (logLine.includes('[DEBUG]')) return 'blue';
    if (logLine.includes('[INFO]')) return 'green';
    if (logLine.includes('[WARNING]')) return 'orange';
    if (logLine.includes('[ERROR]')) return 'red';
    if (logLine.includes('[CRITICAL]')) return 'red.600';
    return 'gray';
  };

  const RefreshButton = (
    <Button 
      size="sm" 
      onClick={fetchLogs} 
      isLoading={isLoading}
      colorScheme="blackAlpha"
      leftIcon={<FiRefreshCw />}
    >
      Refresh
    </Button>
  );

  return (
    <Card 
      id="logs" 
      mt={6}
      title="System Logs"
      subtitle="Recent activity from the backend server"
      headerRight={RefreshButton}
    >
      {isLoading && logs.length === 0 ? (
        <Flex justify="center" align="center" py={10}>
          <Spinner size="xl" color="gray.500" />
        </Flex>
      ) : error ? (
        <Text color="red.500">{error}</Text>
      ) : logs.length === 0 ? (
        <Text>No logs available</Text>
      ) : (
        <Stack spacing={1} fontSize="sm" fontFamily="mono">
          {logs.map((log, index) => (
            <Code
              key={index}
              p={2}
              borderRadius="md"
              color={getLogLevelColor(log)}
              bg={bgColor}
              overflowX="auto"
              whiteSpace="pre-wrap"
            >
              {log}
            </Code>
          ))}
        </Stack>
      )}
    </Card>
  );
}