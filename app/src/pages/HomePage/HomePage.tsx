import { useTranslation } from 'react-i18next';

import useGetSensorsData from '@/api/useGetSensorsData';
import useGetLatestSensorsData from '@/api/useGetLatestSensorsData';
import useGetLastWatering from '@/api/useGetLastWatering';

import PARAMETER_TYPES from '@/types/enums/components/ParameterTypes';

import Parameter from '@/components/Parameter/Parameter';
import Button from '@/components/Button/Button';
import Spinner from '@/components/Spinner/Spinner';
import PageTransition from '@/components/PageTransition/PageTransition';

import FlowerImage from '@/assets/flower2.png';

import getFormattedDate from '@/helpers/formatDate';

import './HomePage.scss';

const HomePage = () => {
  const { t, i18n } = useTranslation();
  const { data, isLoading, isFetching, refetch} = useGetSensorsData();
  const { data: latestSensorsData } = useGetLatestSensorsData();

  const { data: lastWateringData } = useGetLastWatering();

  const [date, time] = getFormattedDate(lastWateringData?.watering.date, i18n.language) || ["", ""];

  return (
    <PageTransition>
      <div className="home-page">
        <span className="home-page__title">{t('homePage.title')}</span>
        <div className="home-page__flower-info-container">
          <h1 className="home-page__flower-name">Monstera</h1>
          <span className="home-page__last-watering">{t('homePage.lastWatering')}</span>
          <span className="home-page__last-watering__value">{`${date} ${time}`}</span>
        </div>
        <div className="home-page__card">
          <img src={FlowerImage} alt="flower" className="home-page__card__flower" />
          <div className="home-page__card__parameters">
            <Parameter type={PARAMETER_TYPES.HUMIDITY} value={`${data?.humidity || latestSensorsData?.humidity}%`} />
            <Parameter type={PARAMETER_TYPES.LIGHT} value={`${data?.light || latestSensorsData?.light} LUX`} />
            <Parameter type={PARAMETER_TYPES.TEMPERATURE} value={`${data?.temperature || latestSensorsData?.temperature}°C`} />
          </div>
          <div className="home-page__card__button">
            <Button text={isLoading || isFetching ? <Spinner /> : t('homePage.getCurrentData')} onClick={refetch} />
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
export default HomePage;
