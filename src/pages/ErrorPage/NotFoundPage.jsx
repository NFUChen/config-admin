import { Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

export default function NotFoundPage() {
  return (
    <Stack sx={{ alignItems: 'center', justifyContent: 'center', height: '100vh' }} id='error-page'>
      <Typography fontSize={48} component='h1'>
        Oops!
      </Typography>
      <Typography fontSize={24} color={grey[700]} component='h1'>
        404 Not Found
      </Typography>
    </Stack>
  );
}
