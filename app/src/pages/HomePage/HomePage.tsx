import { useTranslation } from 'react-i18next';

import useGetSensorsData from '@/api/useGetSensorsData';

import PARAMETER_TYPES from '@/types/enums/components/ParameterTypes';

import Parameter from '@/components/Parameter/Parameter';
import Button from '@/components/Button/Button';

import FlowerImage from '@/assets/flower.png';

import './HomePage.scss';

const HomePage = () => {
  const { t } = useTranslation();
  const {_, __, data, refetch} = useGetSensorsData();
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
          <Parameter type={PARAMETER_TYPES.HUMIDITY} value={`${data?.humidity}%`} />
          <Parameter type={PARAMETER_TYPES.LIGHT} value={`${data?.light} LUX`} />
          <Parameter type={PARAMETER_TYPES.TEMPERATURE} value={`${data?.temperature}°C`} />
        </div>
        <div className="home-page__card__last-update">
          {t('homePage.lastUpdate')}
        </div>
        <div className="home-page__card__button">
          <Button text={t('homePage.getCurrentData')} onClick={refetch} />
        </div>
      </div>
    </div>
  );
};
export default HomePage;
