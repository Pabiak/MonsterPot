import { useTranslation } from 'react-i18next';

import PARAMETER_TYPES from '@/types/enums/components/ParameterTypes';
import HISTORY_TILE_TYPE from '@/types/enums/components/HistoryTypes';

import HistoryTile from '@/components/HistoryTile/HistoryTile';
import StatisticsTile from '@/components/StatisticsTile/StatisticsTile';

import './StatisticsPage.scss';

const StatisticsPage = () => {
  const { t } = useTranslation();
  return (
    <div className="statistics-page">
      <span className="statistics-page__title">{t('statisticsPage.title')}</span>
      <div className="statistics-page__statistics">
        <div className="statistics-page__statistics__tiles">
          <StatisticsTile type={PARAMETER_TYPES.HUMIDITY} value={122} />
          <StatisticsTile type={PARAMETER_TYPES.TEMPERATURE} value={17} />
        </div>
        <HistoryTile type={HISTORY_TILE_TYPE.WATERING} title={t('statisticsPage.lastWatering')} subtext={t('common.notificationSent')} time="12:00" date="12.12.2021" />
      </div>
      <div className="statistics-page__card">
        <span className="statistics-page__card__subtitle">
          {t('statisticsPage.hydration')}
        </span>
      </div>
    </div>
  );
};

export default StatisticsPage;
