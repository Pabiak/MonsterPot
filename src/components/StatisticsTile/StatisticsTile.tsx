import { useTranslation } from 'react-i18next';

import PARAMETER_TYPES from '@/types/enums/components/ParameterTypes';
import { IStatisticsTileProps } from '@/types/components/StatisticsTile';

import HumidityIcon from '@/assets/icons/humidity-icon.svg?react';
import TemperatureIcon from '@/assets/icons/temperature-icon.svg?react';

import './StatisticsTile.scss';

const StatisticsTile = ({ type, value }: IStatisticsTileProps) => {
  const { t } = useTranslation();
  return (
    <div className="statistics-tile">
      <div className={`statistics-tile__icon-background statistics-tile__icon-background--${type.toLocaleLowerCase()}`}>
        {type === PARAMETER_TYPES.TEMPERATURE ? (
          <TemperatureIcon className="statistics-tile__icon statistics-tile__icon--temperature" />
        ) : (
          <HumidityIcon className="statistics-tile__icon statistics-tile__icon--humidity" />
        )}
      </div>
      <span className={`statistics-tile__value statistics-tile__value--${type.toLocaleLowerCase()}`}>
        {type === PARAMETER_TYPES.TEMPERATURE ? `${value}°C` : `+${value}`}
      </span>
      <span className="statistics-tile__info">
        {type === PARAMETER_TYPES.TEMPERATURE ? t('statisticsTile.avgTemperature') : t('statisticsTile.wateringNumber')}
      </span>
    </div>
  );
};
export default StatisticsTile;
