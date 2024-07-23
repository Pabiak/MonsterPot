import { Navigate, Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar/Navbar';
import HomePage from '@/pages/HomePage/HomePage';
import HistoryPage from '@/pages/HistoryPage/HistoryPage';
import StatisticsPage from '@/pages/StatisticsPage/StatisticsPage';

const App = () => {
  const { t } = useTranslation();

  return (
    <>
      <Navbar />
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/statistics" element={<StatisticsPage />} />

        {/* Redirect to dashboard if 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
