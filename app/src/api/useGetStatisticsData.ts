import { useQuery } from '@tanstack/react-query';

import axiosInstance from '@/utility/axiosInstance';
import useHandleQueryError from '@/hooks/useHandleQueryError';

const useGetStatisticsData = () => {
  const { handleError } = useHandleQueryError();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['statistics-data'],
    queryFn: async ({ signal }) => {
      try {
        const response = await axiosInstance.get(`/sensors/statistics`, {
          signal,
        });

        return response.data;
      } catch (error: any) {
        handleError(error, 'common.errorFetchingStatisticsData');
      }
    },
  });

  return { data, isLoading, isError, error };
};

export default useGetStatisticsData;
