import { useTranslation } from 'react-i18next';

const App = () => {
  const { t } = useTranslation();

  return (
    <div>
      <p>{t('title')}</p>
    </div>
  );
};

export default App;
