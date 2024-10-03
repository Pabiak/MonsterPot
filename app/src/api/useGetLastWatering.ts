import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/utility/axiosInstance';

const useGetLastWatering = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['last-watering'],
    queryFn: async ({ signal }) => {
      const response = await axiosInstance.get(`/sensors/last-watering`, {
        signal,
      });

      return response.data;
    },
    staleTime: 1000 * 60,
  });

  return { isPending, error, data };
};

export default useGetLastWatering;
