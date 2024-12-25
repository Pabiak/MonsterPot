import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/utility/axiosInstance';

const useGetSensorsData = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['sensors'],
    enabled: false,
    retry: false,
    queryFn: async ({ signal }) => {
      const response = await axiosInstance.get(`/sensors`, {
        signal,
      });

      return response.data;
    },
    staleTime: 1000 * 60,
  });

  return { data, isLoading, isError, error, refetch };
};

export default useGetSensorsData;
