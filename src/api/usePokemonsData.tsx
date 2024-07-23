import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../utility/axiosInstance';

interface IUsePokemonsDataProps {
  limit: number;
}

const usePokemonsData = ({ limit = 10 }: IUsePokemonsDataProps) => {
  const { isPending, error, data } = useQuery({
    queryKey: ['pokemon', limit],
    queryFn: async ({ signal }) => {
      const response = await axiosInstance.get(`/pokemon?limit=${limit}`, {
        signal,
      });

      return response.data;
    },
    staleTime: 1000 * 60,
  });

  return { isPending, error, data };
};

export default usePokemonsData;
