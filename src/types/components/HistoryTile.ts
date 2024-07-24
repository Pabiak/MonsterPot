import HISTORY_TILE_TYPE from '@/types/enums/components/HistoryTypes';

export interface IHistoryTileProps {
  type: HISTORY_TILE_TYPE;
  title: string;
  subtext: string;
  date: string;
}
