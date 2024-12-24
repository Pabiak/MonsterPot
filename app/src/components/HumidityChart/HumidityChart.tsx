import { useTranslation } from 'react-i18next';

import useGetStatisticsData from '@/api/useGetStatisticsData';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const HumidityChart = () => {
  const { t } = useTranslation();

  const { data } = useGetStatisticsData();

  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={data?.statistics} margin={{ top: 20, bottom: 10, right: 10 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          label={{
            value: t('statisticsPage.time'),
            position: 'insideBottom',
            offset: -10,
            dx: -18,
          }}
        />
        <YAxis
          label={{
            value: t('statisticsPage.humidity'),
            angle: -90,
            position: 'insideLeft',
            offset: 20,
          }}
          domain={[0, 100]}
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#2F86D9"
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default HumidityChart;
