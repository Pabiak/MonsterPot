import StatisticsTile from "@/components/StatisticsTile/StatisticsTile";
import PARAMETER_TYPES from "@/types/enums/components/ParameterTypes";

import "./StatisticsPage.scss";

const StatisticsPage = () => (
  <div className="statistics-page">
    <StatisticsTile type={PARAMETER_TYPES.HUMIDITY} value={122} />
    <StatisticsTile type={PARAMETER_TYPES.TEMPERATURE} value={22} />
  </div>
);

export default StatisticsPage;
