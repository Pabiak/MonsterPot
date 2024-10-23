import { useLocation, useNavigate } from 'react-router-dom';

import PAGES from '@/types/enums/pages/pages';

import HistoryIcon from '@/assets/icons/history-icon.svg?react';
import LeafIcon from '@/assets/icons/leaf-icon.svg?react';
import StatisticsIcon from '@/assets/icons/statistics-icon.svg?react';

import './Navbar.scss';

const Navbar = () => {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split('/')[1];

  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar__items">
        <button
          type="button"
          className={`navbar__items__item  ${splitLocation === PAGES.HISTORY ? 'navbar__items__item--active' : ''}`}
          onClick={() => navigate('/history')}
          aria-label="History"
        >
          <HistoryIcon />
        </button>
        <button
          type="button"
          className={`navbar__items__item navbar__items__item--homepage  ${splitLocation === PAGES.HOME ? 'navbar__items__item--homepage--active' : ''}`}
          onClick={() => navigate('/')}
          aria-label="Home"
        >
          <LeafIcon />
        </button>
        <button
          type="button"
          className={`navbar__items__item  ${splitLocation === PAGES.STATISTICS ? 'navbar__items__item--active' : ''}`}
          onClick={() => navigate('/statistics')}
          aria-label="Statistics"
        >
          <StatisticsIcon />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
