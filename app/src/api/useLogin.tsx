import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../utility/axiosInstance';
import { setCookie } from '../helpers/cookies';
import { useExampleStore } from '../contexts/exampleContext';

interface IMutationProps {
  email: string;
  password: string;
}

interface IResponseData {
  access_token: string;
  refresh_token: string;
  user: {
    identifier: string;
    name: string;
    surname: string;
    username: string;
  };
}

const useLogin = () => {
  const [_, setExampleStore] = useExampleStore((store) => store);

  const mutation = useMutation({
    mutationFn: async (loginData: IMutationProps) => {
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_AUTH_URL}/realms/test/users/login/`,
        loginData
      );

      return response.data;
    },
    onSuccess: (data: IResponseData) => {
      setCookie(
        'accessToken',
        data.access_token,
        import.meta.env.VITE_COOKIE_ACCESS_TOKEN_EXPIRY
      );
      setCookie(
        'refreshToken',
        data.refresh_token,
        import.meta.env.VITE_COOKIE_REFRESH_TOKEN_EXPIRY
      );
      setExampleStore({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        user: data.user,
      });
    },
  });

  return mutation;
};

export default useLogin;
