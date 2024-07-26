import { useTranslation } from 'react-i18next';

import PARAMETER_TYPES from '@/types/enums/components/ParameterTypes';

import Parameter from '@/components/Parameter/Parameter';
import Button from '@/components/Button/Button';

import FlowerImage from '@/assets/flower.png';

import './HomePage.scss';

const HomePage = () => {
  const { t } = useTranslation();
  return (
    <div className="home-page">
      <span className="home-page__title">{t('homePage.title')}</span>
      <div className="home-page__flower-info-container">
        <h1 className="home-page__flower-name">Monstera</h1>
        <span className="home-page__last-watering">{t('homePage.lastWatering')}</span>
      </div>
      <div className="home-page__card">
        <img src={FlowerImage} alt="flower" className="home-page__card__flower" />
        <div className="home-page__card__parameters">
          <Parameter type={PARAMETER_TYPES.HUMIDITY} value="75%" />
          <Parameter type={PARAMETER_TYPES.LIGHT} value="84%" />
          <Parameter type={PARAMETER_TYPES.TEMPERATURE} value="17C" />
        </div>
        <div className="home-page__card__last-update">
          {t('homePage.lastUpdate')}
        </div>
        <div className="home-page__card__button">
          <Button text={t('homePage.getCurrentData')} onClick={() => console.log('Aktualne dane')} />
        </div>
      </div>
    </div>
  );
};
export default HomePage;
