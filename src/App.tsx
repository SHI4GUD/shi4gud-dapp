import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/common/LoadingSpinner';
import { ViewingChainProvider } from './contexts/ViewingChainContext';

const HomePage = React.lazy(() => import('./pages/HomePage'));
const VerifyPage = React.lazy(() => import('./pages/VerifyPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));

const App: React.FC = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ViewingChainProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/verify" element={<VerifyPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ViewingChainProvider>
    </Suspense>
  );
};

export default App;