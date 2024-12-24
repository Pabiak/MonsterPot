import { useTranslation } from 'react-i18next';

import useGetHistory from '@/api/useGetHistory';

import HISTORY_TILE_TYPE from '@/types/enums/components/HistoryTypes';

import HistoryTile from '@/components/HistoryTile/HistoryTile';

import getFormattedDate from '@/helpers/formatDate';

import './HistoryPage.scss';

const HistoryPage = () => {
  const { t } = useTranslation();
  const { data } = useGetHistory();

  return (
    <div className="history-page">
      <span className="history-page__title">{t('historyPage.title')}</span>
      <div className="history-page__container">
        {/* TODO: add type, skeleton loading and error handling */}
        {data?.history.slice().reverse().map((historyItem: any) => (
          <HistoryTile
            key={historyItem._id}
            type={historyItem.type}
            title={t(`historyPage.${historyItem.message}`)}
            subtext={historyItem.type === HISTORY_TILE_TYPE.ERROR ? t("common.notificationSent") : t("historyPage.completed")}
            date={getFormattedDate(historyItem.date)?.[0] || ""}
            time={getFormattedDate(historyItem.date)?.[1] || ""}
          />
        ))}
      </div>
    </div>
  );
};
export default HistoryPage;
