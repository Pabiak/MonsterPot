import HISTORY_TILE_TYPE from '@/types/enums/components/HistoryTypes';

export interface IHistoryTileProps {
  type: HISTORY_TILE_TYPE;
  title: string;
  subtext: string;
  time: string;
  date: string;
}

export interface IHistoryTile {
  _id: string;
  type: HISTORY_TILE_TYPE;
  date: string;
  message: string;
}