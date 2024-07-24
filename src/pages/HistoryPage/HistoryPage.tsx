import HistoryTile from '@/components/HistoryTile/HistoryTile';
import HISTORY_TILE_TYPE from '@/types/enums/components/HistoryTypes';

import './HistoryPage.scss';

const HistoryPage = () => (
  <div className="history-page">
    <span className="history-page__title">History</span>
    <div className="history-page__container">
      <HistoryTile type={HISTORY_TILE_TYPE.WATERING} title="Nawadnianie" subtext="Zakończone sukcesem" date="24 marca, 2024" />
      <HistoryTile type={HISTORY_TILE_TYPE.ERROR} title="Za wysoka temperatura" subtext="Powiadomienie wysłane" date="24 marca, 2024" />
      <HistoryTile type={HISTORY_TILE_TYPE.WATERING} title="Nawadnianie" subtext="Zakończone sukcesem" date="24 marca, 2024" />
      <HistoryTile type={HISTORY_TILE_TYPE.ERROR} title="Niski poziom wody" subtext="Powiadomienie wysłane" date="24 marca, 2024" />
    </div>
  </div>
);

export default HistoryPage;
