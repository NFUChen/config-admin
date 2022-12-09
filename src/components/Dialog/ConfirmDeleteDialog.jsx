import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { amber, grey } from '@mui/material/colors';

export const ConfirmDeleteDialog = props => {
  const { isOpen, onClose, onDelete } = props;

  const handleClose = () => {
    onClose();
  };

  const handleDelete = () => {
    onDelete();
  };

  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': {
          backgroundColor: grey[900],
          border: `1px solid ${grey[600]}`,
          color: grey[300]
        }
      }}
      open={isOpen}
      onClose={handleClose}
    >
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>Are you sure you want to remove this rule?</DialogContent>
      <DialogActions>
        <Button
          sx={{
            '&.MuiButton-root': {
              gap: 1,
              '&, &:hover': {
                color: grey[600]
              },
              '&:hover': {
                backgroundColor: '#8080801c'
              }
            }
          }}
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          sx={{
            '&.MuiButton-root': {
              gap: 1,
              '&, &:hover': {
                color: amber[600]
              },
              '&:hover': {
                backgroundColor: '#ffb30012'
              }
            }
          }}
          onClick={handleDelete}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
