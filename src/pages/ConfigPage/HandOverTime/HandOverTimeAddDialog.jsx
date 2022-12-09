import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { amber, grey } from '@mui/material/colors';
import { useEffect } from 'react';
import { useState } from 'react';
import { ConfigFormInput } from '../../../components/Input/ConfigFormInput';
import { useValidateForm } from '../../../utils/Validation';

export const HandOverTimeAddDialog = props => {
  const { isOpen, onClose, onSubmit } = props;
  const [inputFields, setInputFields] = useState([
    {
      id: 1,
      name: 'handOverTime',
      type: 'time',
      label: 'Hand Over Time*',
      inputProps: {
        step: '1'
      },
      validation: ['required'],
      errorMsg: '',
      value: ''
    }
  ]);
  const [initState, setInitState] = useState([]);

  // 儲存初始化狀態，因為關閉 Dialog 後需回復初始狀態
  useEffect(() => {
    setInitState(inputFields);
  }, []);

  const onFormChange = e => {
    setInputFields(state => {
      state.find(field => field.name === e.target.name).value = e.target.value;
      return [...state];
    });
  };

  const handleClose = () => {
    setInputFields(initState);
    onClose();
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { hasError, formValues } = useValidateForm(inputFields, setInputFields);
    if (hasError) {
      return;
    }
    onSubmit({
      ...formValues,
      closeDialog: handleClose
    });
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
    >
      <DialogTitle>Add Hand Over Time</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent
          sx={{
            '&': {
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }
          }}
        >
          {inputFields.map(field => (
            <ConfigFormInput key={field.id} onChange={onFormChange} {...field} />
          ))}
        </DialogContent>
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
            type='submit'
          >
            ADD RULE
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
