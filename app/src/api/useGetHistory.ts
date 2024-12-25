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
  });

  return { data, isLoading, isError, error };
};

export default useGetHistory;
