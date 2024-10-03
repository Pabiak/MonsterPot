import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/utility/axiosInstance';

const useGetAvgTemperature = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['avg-temp'],
    queryFn: async ({ signal }) => {
      const response = await axiosInstance.get(`/sensors/avg-temp`, {
        signal,
      });

      return response.data;
    },
    staleTime: 1000 * 60,
  });

  return { isPending, error, data };
};

export default useGetAvgTemperature;
