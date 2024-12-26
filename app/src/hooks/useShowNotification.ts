import { useCallback } from 'react';
import toast from 'react-hot-toast';

const useShowNotification = () => {
  const showSuccess = useCallback((message: string) => {
    toast.success(message, {
      position: 'top-center',
      duration: 5000,
    });
  }, []);

  const showError = useCallback((message: string) => {
    toast.error(message, {
      position: 'top-center',
      duration: 5000,
    });
  }, []);

  return { showSuccess, showError };
};

export default useShowNotification;
