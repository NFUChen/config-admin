import './css/index.css';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import router from './router';
import { Box, Container } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import { UtilsProvider } from './utils/UtilsProvider';
import { grey } from '@mui/material/colors';
import LoadingPage from './pages/LoadingPage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UtilsProvider>
      <Box minHeight='100vh' bgcolor={grey[900]} display='flex' flexDirection='column' color={grey[200]}>
        <Container maxWidth='xl' sx={{ flexGrow: 1 }}>
          <Suspense fallback={<LoadingPage />}>
            <RouterProvider router={router} />
          </Suspense>
        </Container>
      </Box>
    </UtilsProvider>
  </React.StrictMode>
);
