import React, { useState } from 'react';
import { 
  Stack,
  SimpleGrid,
} from '@chakra-ui/react';
import { FiActivity, FiBarChart2, FiTrendingUp } from 'react-icons/fi';
import Calculator from './Calculator';
import ResultsDisplay from './ResultsDisplay';
import LogViewer from './LogViewer';
import StatCard from './StatCard';
import PageHeader from '../UI/PageHeader';

export default function Dashboard() {
  const [result, setResult] = useState(null);

  return (
    <Stack spacing={8}>
      {/* Hero Section */}
      <PageHeader
        title="Matched Betting Dashboard"
        subtitle="Advanced analytics and predictions for value betting opportunities"
      />

      {/* Stats Overview */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
        <StatCard
          label="Accuracy"
          value="87%"
          helpText="Last 30 days"
          icon={<FiActivity size="1.5em" />}
        />

        <StatCard
          label="Predictions"
          value="142"
          helpText="Total analyzed"
          icon={<FiBarChart2 size="1.5em" />}
        />

        <StatCard
          label="Avg. Value"
          value="+4.2%"
          helpText="Expected value"
          icon={<FiTrendingUp size="1.5em" />}
        />
      </SimpleGrid>

      {/* Calculator */}
      <Calculator onResultUpdate={setResult} />
      
      {/* Results */}
      <ResultsDisplay result={result} />
      
      {/* Logs */}
      <LogViewer />
    </Stack>
  );
}