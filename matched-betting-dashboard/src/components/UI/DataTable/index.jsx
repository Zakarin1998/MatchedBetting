import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Text,
  Spinner,
} from '@chakra-ui/react';
import { useTheme as useNextTheme } from 'next-themes';

/**
 * A reusable data table component
 * 
 * @param {Object} props - Component props
 * @param {Array} props.columns - Array of column definitions with { key, label, render }
 * @param {Array} props.data - Array of data objects
 * @param {boolean} props.isLoading - Loading state flag
 * @param {string} props.emptyMessage - Message to display when data is empty
 */
export const DataTable = ({ 
  columns, 
  data, 
  isLoading = false,
  emptyMessage = 'No data available',
  ...props 
}) => {
  const { theme } = useNextTheme();
  const isDark = theme === 'dark';
  
  // Theme-based colors
  const headerBg = isDark ? 'gray.700' : 'gray.50';
  
  if (isLoading) {
    return (
      <Box textAlign="center" py={8}>
        <Spinner size="xl" color="gray.500" />
        <Text mt={4} color="gray.500">Loading data...</Text>
      </Box>
    );
  }
  
  if (!data || data.length === 0) {
    return (
      <Box textAlign="center" py={8}>
        <Text color="gray.500">{emptyMessage}</Text>
      </Box>
    );
  }
  
  return (
    <Box overflowX="auto">
      <Table variant="simple" {...props}>
        <Thead bg={headerBg}>
          <Tr>
            {columns.map((column) => (
              <Th key={column.key}>{column.label}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, rowIndex) => (
            <Tr key={rowIndex}>
              {columns.map((column) => (
                <Td key={`${rowIndex}-${column.key}`}>
                  {column.render ? column.render(row) : row[column.key]}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default DataTable;