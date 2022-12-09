import { Alert, Box, CircularProgress, Slide, Snackbar } from '@mui/material';
import { amber } from '@mui/material/colors';
import React from 'react';
import { useEffect } from 'react';

export const UtilsContext = React.createContext({
  isLoading: false,
  isNotifyOpen: false,
  startLoading: () => {},
  stopLoading: () => {},
  showNotify: () => {},
  hideNotify: () => {}
});

export const UtilsProvider = ({ children }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [notifyState, setNotifyState] = React.useState({
    isOpen: false,
    message: '',
    type: 'success'
  });
  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);
  useEffect(() => {
    if (!isLoading) {
      document.querySelector('html').removeAttribute('style');
      return;
    }
    document.querySelector('html').style.overflow = 'hidden';
    document.querySelector('html').style.height = 0;
    return () => {};
  }, [isLoading]);

  const hideNotify = (event, reason) => {
    if (reason === 'clickaway') return;
    setNotifyState(state => ({
      ...state,
      isOpen: false
    }));
  };

  const showNotify = ({ message, type }) => {
    setNotifyState(state => ({
      ...state,
      message,
      type,
      isOpen: true
    }));
  };

  const SlideTransition = props => <Slide {...props} direction='up' />;

  return (
    <UtilsContext.Provider value={{ isLoading, startLoading, stopLoading, showNotify, hideNotify }}>
      <>
        {children}
        {isLoading ? (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              zIndex: 9999,
              display: 'grid',
              backgroundColor: 'rgba(15,15,15,.7)',
              height: '100vh',
              width: '100vw'
            }}
          >
            <CircularProgress
              sx={{
                margin: 'auto',
                '&.MuiCircularProgress-root': {
                  color: amber[600]
                }
              }}
            />
          </Box>
        ) : null}
        {notifyState.isOpen ? (
          <Snackbar
            open={notifyState.isOpen}
            autoHideDuration={5000}
            TransitionComponent={SlideTransition}
            onClose={hideNotify}
          >
            <Alert onClose={hideNotify} severity={notifyState.type} sx={{ width: '100%' }}>
              {notifyState.message}
            </Alert>
          </Snackbar>
        ) : null}
      </>
    </UtilsContext.Provider>
  );
};
