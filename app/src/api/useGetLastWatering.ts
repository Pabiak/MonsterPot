import { useQuery } from '@tanstack/react-query';

import axiosInstance from '@/utility/axiosInstance';
import useHandleQueryError from '@/hooks/useHandleQueryError';

const useGetLastWatering = () => {
  const { handleError } = useHandleQueryError();

  const { isPending, isError, error, data } = useQuery({
    queryKey: ['last-watering'],
    queryFn: async ({ signal }) => {
      try {
        const response = await axiosInstance.get(`/sensors/last-watering`, {
          signal,
        });

        return response.data;
      } catch (error: any) {
        handleError(error, 'common.errorFetchingLastWateringData');
      }
    },
    staleTime: 1000 * 60,
  });

  return { isPending, isError, error, data };
};

export default useGetLastWatering;
