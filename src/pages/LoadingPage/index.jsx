import { CircularProgress, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

const LoadingPage = () => {
  return (
    <Stack sx={{ alignItems: 'center', justifyContent: 'center', height: '100vh' }} id='error-page'>
      <CircularProgress
        size={28}
        sx={{
          '&.MuiCircularProgress-root': {
            color: grey[700],
            mb: 2
          }
        }}
      />
      <Typography fontSize={24} color={grey[700]} component='h1'>
        LOADING
      </Typography>
    </Stack>
  );
};

export default LoadingPage;
