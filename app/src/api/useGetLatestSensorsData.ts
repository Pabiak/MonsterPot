import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/utility/axiosInstance';

const useGetLatestSensorsData = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['latest-sensors'],
    queryFn: async ({ signal }) => {
      const response = await axiosInstance.get(`/sensors/latest`, {
        signal,
      });

      return response.data;
    },
    staleTime: 1000 * 60,
  });

  return { data, isLoading, isError, error };
};

export default useGetLatestSensorsData;
