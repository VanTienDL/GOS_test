import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../components/Layout/Layout';
import SearchScore from '../components/SearchScore/SearchScore';
import ScoreChart from '../components/ScoreChart/ScoreChart';
import TopStudent from '../components/TopStudent/TopStudent';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/search" replace />} />
          <Route path="search" element={<SearchScore />} />
          <Route path="chart" element={<ScoreChart />} />
          <Route path="top-10" element={<TopStudent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;