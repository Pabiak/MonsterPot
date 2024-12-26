import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import axiosInstance from '@/utility/axiosInstance';

import useShowNotification from '@/hooks/useShowNotification';
import useHandleQueryError from '@/hooks/useHandleQueryError';

const useGetSensorsData = () => {
  const { t } = useTranslation();
  const { showSuccess } = useShowNotification();
  const { handleError } = useHandleQueryError();

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ['sensors'],
    enabled: false,
    retry: false,
    queryFn: async ({ signal }) => {
      try {
        const response = await axiosInstance.get(`/sensors`, {
          signal,
        });
        showSuccess(t('common.dataFetched'));
        return response.data;
      } catch (error: any) {
        handleError(error, 'common.errorFetchingSensorsData');
      }
    },
    staleTime: 1000 * 60,
  });

  return { data, isLoading, isError, error, refetch, isFetching };
};

export default useGetSensorsData;
