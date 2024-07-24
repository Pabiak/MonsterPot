import { IHistoryTileProps } from '@/types/components/HistoryTile';
import HISTORY_TILE_TYPE from '@/types/enums/components/HistoryTypes';

import HumidityIcon from '@/assets/icons/humidity-icon.svg?react';
import ErrorIcon from '@/assets/icons/error-icon.svg?react';

import './HistoryTile.scss';

const HistoryTile = ({
  type, title, subtext, date
}: IHistoryTileProps) => (
  <div className="history-tile">
    <div className="history-tile__icon-container">
      <div className={`history-tile__icon-background history-tile__icon-background--${type.toLocaleLowerCase()}`}>
        {type === HISTORY_TILE_TYPE.WATERING ? (
          <HumidityIcon className="history-tile__icon history-tile__icon--watering" />
        ) : (
          <ErrorIcon className="history-tile__icon history-tile__icon--error" />
        )}
      </div>
    </div>
    <div className="history-tile__info">
      <div className="history-tile__top">
        <span className="history-tile__title">{title}</span>
        <span className="history-tile__time">11:45</span>
      </div>
      <div className="history-tile__bottom">
        <span className="history-tile__subtext">{subtext}</span>
        <span className="history-tile__date">{date}</span>
      </div>
    </div>
  </div>
);

export default HistoryTile;
