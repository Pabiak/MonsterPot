import HistoryTile from '@/components/HistoryTile/HistoryTile';
import HISTORY_TILE_TYPE from '@/types/enums/components/HistoryTypes';

const HistoryPage = () => (
  <div style={{ padding: '0.75rem' }}>
    <HistoryTile type={HISTORY_TILE_TYPE.WATERING} title="Nawadnianie" subtext="Zakończone sukcesem" date="29 marca, 2024" />
    <HistoryTile type={HISTORY_TILE_TYPE.ERROR} title="Za wysoka temperatura" subtext="Powiadomienie wysłane" date="29 marca, 2024" />
  </div>
);

export default HistoryPage;
