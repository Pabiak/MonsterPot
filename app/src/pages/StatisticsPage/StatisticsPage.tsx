import { useTranslation } from 'react-i18next';

import useGetAvgTemperature from '@/api/useGetAvgTemperature';
import useGetLastWatering from '@/api/useGetLastWatering';
import useGetNumberOfWaterings from '@/api/useGetNumberOfWaterings';

import PARAMETER_TYPES from '@/types/enums/components/ParameterTypes';
import HISTORY_TILE_TYPE from '@/types/enums/components/HistoryTypes';

import HistoryTile from '@/components/HistoryTile/HistoryTile';
import StatisticsTile from '@/components/StatisticsTile/StatisticsTile';
import HumidityChart from '@/components/HumidityChart/HumidityChart';
import SkeletonLoading from '@/components/SkeletonLoading/SkeletonLoading';
import PageTransition from '@/components/PageTransition/PageTransition';

import getFormattedDate from '@/helpers/formatDate';

import './StatisticsPage.scss';

const StatisticsPage = () => {
  const { t } = useTranslation();

  const { data: temperatureData, isPending: isTemperaturePending } =
    useGetAvgTemperature();
  const { data: lastWateringData, isPending: isLastWateringPending } =
    useGetLastWatering();
  const { data: numberOfWaterings, isPending: isWateringsNumberPending } =
    useGetNumberOfWaterings();

  const [date, time] = getFormattedDate(lastWateringData?.watering.date) || [
    '',
    '',
  ];

  return (
    <PageTransition>
      <div className="statistics-page">
        <span className="statistics-page__title">
          {t('statisticsPage.title')}
        </span>
        <div className="statistics-page__statistics">
          <div className="statistics-page__statistics__tiles">
            {isWateringsNumberPending || isTemperaturePending ? (
              <SkeletonLoading
                width="100%"
                height="150px"
                elementsNumber={2}
                row
              />
            ) : (
              <>
                <StatisticsTile
                  type={PARAMETER_TYPES.HUMIDITY}
                  value={numberOfWaterings?.count || 0}
                />
                <StatisticsTile
                  type={PARAMETER_TYPES.TEMPERATURE}
                  value={temperatureData?.avgTemperature.toFixed(2) || 17}
                />
              </>
            )}
          </div>
          {isLastWateringPending ? (
            <SkeletonLoading width="100%" height="76px" elementsNumber={1} />
          ) : (
            <HistoryTile
              type={HISTORY_TILE_TYPE.WATERING}
              title={t('statisticsPage.lastWatering')}
              subtext={t('common.notificationSent')}
              time={time}
              date={date}
            />
          )}
        </div>
        <div className="statistics-page__card">
          <span className="statistics-page__card__subtitle">
            {t('statisticsPage.hydration')}
          </span>
          <div className="statistics-page__chart-container">
            <HumidityChart />
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default StatisticsPage;
