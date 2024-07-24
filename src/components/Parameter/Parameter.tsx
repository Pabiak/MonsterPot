import { useTranslation } from 'react-i18next';

import PARAMETER_TYPES from '@/types/enums/components/ParameterTypes';
import { IParameterProps } from '@/types/components/Parameter';

import HumidityIcon from '@/assets/icons/humidity-icon.svg?react';
import TemperatureIcon from '@/assets/icons/temperature-icon.svg?react';
import LightIcon from '@/assets/icons/light-icon.svg?react';

import './Parameter.scss';

const Parameter = ({ type, value }: IParameterProps) => {
  const { t } = useTranslation();
  const title = t(`parameter.${type.toLocaleLowerCase()}`);

  return (
    <div className="parameter">
      <span className="parameter__type">{title}</span>
      <div className="parameter__icon">
        {type === PARAMETER_TYPES.HUMIDITY && <HumidityIcon />}
        {type === PARAMETER_TYPES.TEMPERATURE && <TemperatureIcon />}
        {type === PARAMETER_TYPES.LIGHT && <LightIcon />}
      </div>
      <span className="parameter__value">{value}</span>
    </div>
  );
};

export default Parameter;
