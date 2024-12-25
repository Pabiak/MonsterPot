import { useQuery } from '@tanstack/react-query';

import axiosInstance from '@/utility/axiosInstance';

const useGetStatisticsData = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['statistics-data'],
    queryFn: async ({ signal }) => {
      const response = await axiosInstance.get(`/sensors/statistics`, {
        signal,
      });

      return response.data;
    },
    staleTime: 1000 * 60,
  });

  return { data, isLoading, isError, error };
};

export default useGetStatisticsData;
