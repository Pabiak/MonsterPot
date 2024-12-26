import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar/Navbar';
import HomePage from '@/pages/HomePage/HomePage';
import HistoryPage from '@/pages/HistoryPage/HistoryPage';
import StatisticsPage from '@/pages/StatisticsPage/StatisticsPage';
import { AnimatePresence } from 'framer-motion';

const App = () => {
  const location = useLocation();
  return (
  <>
    <Navbar />
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route index path="/" element={<HomePage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/statistics" element={<StatisticsPage />} />

        {/* Redirect to dashboard if 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  </>
);
}
export default App;
