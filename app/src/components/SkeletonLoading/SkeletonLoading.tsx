import './SkeletonLoading.scss';

interface ISkeletonLoadingProps {
  width: string;
  height: string;
  elementsNumber: number;
  row?: boolean;
}

const SkeletonLoading = ({
  width,
  height,
  elementsNumber,
  row,
}: ISkeletonLoadingProps) => (
  <div
    className={`skeleton-loading__container ${row ? 'skeleton-loading__container--row' : ''}`}
    style={{ width }}
  >
    {Array.from({ length: elementsNumber }).map((_, idx) => (
      <div
        key={`skeleton-${idx}`}
        className={`skeleton-loading__bar ${row ? 'skeleton-loading__bar--row' : ''}`}
        style={{ height }}
      />
    ))}
  </div>
);

export default SkeletonLoading;