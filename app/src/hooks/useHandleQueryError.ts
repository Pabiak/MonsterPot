import { useTranslation } from 'react-i18next';
import useShowNotification from './useShowNotification';

const useHandleQueryError = () => {
  let hadError = false;
  const { t } = useTranslation();
  const { showError } = useShowNotification();

  const handleError = (error: any, message: string) => {
    if (error.name === 'CanceledError' || error.name === 'AbortError') {
      return;
    }
  
    if (!hadError) {
      hadError = true;
      showError(t(message));
    }
  };

  return { handleError };
};

export default useHandleQueryError;
