import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Stack,
  Button,
  Flex,
} from '@chakra-ui/react';
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
    if (logLine.includes('[DEBUG]')) return isDark ? 'blue.300' : 'blue.500';
    if (logLine.includes('[INFO]')) return isDark ? 'green.300' : 'green.500';
    if (logLine.includes('[WARNING]')) return isDark ? 'orange.300' : 'orange.500';
    if (logLine.includes('[ERROR]')) return isDark ? 'red.300' : 'red.500';
    if (logLine.includes('[CRITICAL]')) return isDark ? 'red.300' : 'red.600';
    return isDark ? 'gray.300' : 'gray.500';
  };

  const RefreshButton = (
    <Button 
      size="sm" 
      onClick={fetchLogs} 
      disabled={isLoading}
      bg={isDark ? "blue.500" : "gray.800"}
      color="white"
      _hover={{ bg: isDark ? "blue.600" : "gray.900" }}
    >
      {isLoading ? "Refreshing..." : "Refresh"}
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
          <Text>Loading logs...</Text>
        </Flex>
      ) : error ? (
        <Text color="red.500">{error}</Text>
      ) : logs.length === 0 ? (
        <Text>No logs available</Text>
      ) : (
        <Stack spacing={1} fontSize="sm" fontFamily="mono">
          {logs.map((log, index) => (
            <Box
              key={index}
              p={2}
              borderRadius="md"
              color={getLogLevelColor(log)}
              bg={bgColor}
              overflowX="auto"
              whiteSpace="pre-wrap"
              borderLeft="4px solid"
              borderLeftColor={getLogLevelColor(log)}
            >
              {log}
            </Box>
          ))}
        </Stack>
      )}
    </Card>
  );
}