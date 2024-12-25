import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/utility/axiosInstance';

const useGetHistory = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['history'],
    queryFn: async ({ signal }) => {
      const response = await axiosInstance.get(`/sensors/history`, {
        signal,
      });

      return response.data;
    },
    staleTime: 1000 * 60,
  });

  return { data, isLoading, isError, error };
};

export default useGetHistory;
