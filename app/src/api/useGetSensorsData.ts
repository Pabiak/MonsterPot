import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/utility/axiosInstance';


const useGetSensorsData = () => {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ['sensors'],
    queryFn: async ({ signal }) => {
      const response = await axiosInstance.get(`/sensors`, {
        signal,
      });

      return response.data;
    },
    staleTime: 1000 * 60,
  });

  return { isPending, error, data, refetch };
};

export default useGetSensorsData;
