import { useQuery } from '@tanstack/react-query';

import axiosInstance from '@/utility/axiosInstance';
import useHandleQueryError from '@/hooks/useHandleQueryError';

const useGetAvgTemperature = () => {
  const { handleError } = useHandleQueryError();

  const { isPending, error, data } = useQuery({
    queryKey: ['avg-temp'],
    queryFn: async ({ signal }) => {
      try {
        const response = await axiosInstance.get(`/sensors/avg-temp`, {
          signal,
        });
        return response.data;
      } catch (error: any) {
        handleError(error, 'common.errorFetchingTemperatureData');
      }
    },
    staleTime: 1000 * 60,
  });

  return { isPending, error, data };
};

export default useGetAvgTemperature;
