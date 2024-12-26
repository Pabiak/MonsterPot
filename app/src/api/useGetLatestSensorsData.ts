import { useQuery } from '@tanstack/react-query';

import axiosInstance from '@/utility/axiosInstance';
import useHandleQueryError from '@/hooks/useHandleQueryError';

const useGetLatestSensorsData = () => {
  const { handleError } = useHandleQueryError();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['latest-sensors'],
    queryFn: async ({ signal }) => {
      try {
        const response = await axiosInstance.get(`/sensors/latest`, {
          signal,
        });

        return response.data;
      } catch (error: any) {
        handleError(error, 'common.errorFetchingSensorsData');
      }
    },
  });

  return { data, isLoading, isError, error };
};

export default useGetLatestSensorsData;
