import { useQuery } from '@tanstack/react-query';

import axiosInstance from '@/utility/axiosInstance';
import useHandleQueryError from '@/hooks/useHandleQueryError';

const useGetHistory = () => {
  const { handleError } = useHandleQueryError();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['history'],
    retry: false,

    queryFn: async ({ signal }) => {
      try {
        const response = await axiosInstance.get(`/sensors/history`, {
          signal,
        });

        return response.data;
      } catch (error: any) {
        handleError(error, 'common.errorFetchingHistoryData');
      }
    },
  });

  return { data, isLoading, isError, error };
};

export default useGetHistory;
