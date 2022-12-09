import React from 'react';
import { ErrorPage, NotFoundPage } from '../pages/ErrorPage';
import { createBrowserRouter } from 'react-router-dom';
import { lineNameChecker } from './Loader/lineNameChecker';

const App = React.lazy(() => import('../App'));
const ConfigPage = React.lazy(() => import('../pages/ConfigPage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: '/config/:lineName',
    element: <ConfigPage />,
    errorElement: <ErrorPage />,
    loader: lineNameChecker
  },
  {
    path: '/404',
    element: <NotFoundPage />
  }
]);

export default router;
