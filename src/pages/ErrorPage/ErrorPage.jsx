import { Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();

  console.log(error);
  return (
    <Stack sx={{ alignItems: 'center', justifyContent: 'center', height: '100vh' }} id='error-page'>
      <Typography fontSize={48} component='h1'>
        Oops!
      </Typography>
      <Typography fontSize={24} color={grey[700]} component='h1'>
        {`${error.status} ${error.statusText}`}
      </Typography>
    </Stack>
  );
}
