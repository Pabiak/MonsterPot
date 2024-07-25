import { useTranslation } from 'react-i18next';

import HistoryTile from '@/components/HistoryTile/HistoryTile';
import HISTORY_TILE_TYPE from '@/types/enums/components/HistoryTypes';

import './HistoryPage.scss';

const HistoryPage = () => {
  const { t } = useTranslation();
  return (
    <div className="history-page">
      <span className="history-page__title">{t('historyPage.title')}</span>
      <div className="history-page__container">
        <HistoryTile type={HISTORY_TILE_TYPE.WATERING} title="Nawadnianie" subtext="Zakończone sukcesem" time="11:45" date="24 marca, 2024" />
        <HistoryTile type={HISTORY_TILE_TYPE.ERROR} title="Za wysoka temperatura" subtext="Powiadomienie wysłane" time="11:45" date="24 marca, 2024" />
        <HistoryTile type={HISTORY_TILE_TYPE.WATERING} title="Nawadnianie" subtext="Zakończone sukcesem" time="11:45" date="24 marca, 2024" />
        <HistoryTile type={HISTORY_TILE_TYPE.ERROR} title="Niski poziom wody" subtext="Powiadomienie wysłane" time="11:45" date="24 marca, 2024" />
      </div>
    </div>
  );
};
export default HistoryPage;
