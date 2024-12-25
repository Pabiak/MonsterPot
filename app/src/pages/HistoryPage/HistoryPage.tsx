import { useTranslation } from 'react-i18next';

import useGetHistory from '@/api/useGetHistory';

import HISTORY_TILE_TYPE from '@/types/enums/components/HistoryTypes';
import { IHistoryTile } from '@/types/components/HistoryTile';

import HistoryTile from '@/components/HistoryTile/HistoryTile';
import SkeletonLoading from '@/components/SkeletonLoading/SkeletonLoading';

import getFormattedDate from '@/helpers/formatDate';

import './HistoryPage.scss';

const HistoryPage = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useGetHistory();

  return (
    <div className="history-page">
      <span className="history-page__title">{t('historyPage.title')}</span>
      <div className="history-page__container">
        {/* TODO: error handling */}
        {isLoading ? (
          <SkeletonLoading width="100%" height="76px" elementsNumber={4} />
        ) : (
          data?.history
            .slice()
            .reverse()
            .map((historyItem: IHistoryTile) => (
              <HistoryTile
                key={historyItem._id}
                type={historyItem.type}
                title={t(`historyPage.${historyItem.message}`)}
                subtext={
                  historyItem.type === HISTORY_TILE_TYPE.ERROR
                    ? t('common.notificationSent')
                    : t('historyPage.completed')
                }
                date={getFormattedDate(historyItem.date)?.[0] || ''}
                time={getFormattedDate(historyItem.date)?.[1] || ''}
              />
            ))
        )}
      </div>
    </div>
  );
};
export default HistoryPage;
