import { Button, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { grey, red } from '@mui/material/colors';

export const ButtonDelete = props => {
  return (
    <Button
      variant='contained'
      sx={{
        '&.MuiButton-root': {
          gap: 1,
          '&, &:hover': {
            color: grey[50],
            backgroundColor: red[500]
          }
        }
      }}
      {...props}
    >
      <DeleteIcon />
      <Typography>Delete</Typography>
    </Button>
  );
};
