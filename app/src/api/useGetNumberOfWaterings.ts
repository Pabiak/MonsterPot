import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/utility/axiosInstance';

const useGetNumberOfWaterings = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['waterings-number'],
    queryFn: async ({ signal }) => {
      const response = await axiosInstance.get(`/sensors/waterings`, {
        signal,
      });

      return response.data;
    },
    staleTime: 1000 * 60,
  });

  return { isPending, error, data };
};

export default useGetNumberOfWaterings;
