import { Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { grey } from '@mui/material/colors';

export const ButtonAddRule = props => {
  return (
    <Button
      variant='contained'
      sx={{
        '&.MuiButton-root': {
          gap: 1,
          '&, &:hover': {
            color: grey[800],
            backgroundColor: grey[300]
          }
        }
      }}
      {...props}
    >
      <AddIcon />
      <Typography>Add Rule</Typography>
    </Button>
  );
};
