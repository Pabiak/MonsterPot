import { useQuery } from '@tanstack/react-query';

import axiosInstance from '@/utility/axiosInstance';
import useHandleQueryError from '@/hooks/useHandleQueryError';

const useGetNumberOfWaterings = () => {
  const { handleError } = useHandleQueryError();

  const { isPending, error, data } = useQuery({
    queryKey: ['waterings-number'],
    queryFn: async ({ signal }) => {
      try {
        const response = await axiosInstance.get(`/sensors/waterings`, {
          signal,
        });

        return response.data;
      } catch (error: any) {
        handleError(error, 'common.errorFetchingWateringsData');
      }
    },
    staleTime: 1000 * 60,
  });

  return { isPending, error, data };
};

export default useGetNumberOfWaterings;
