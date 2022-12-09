import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { amber, grey } from '@mui/material/colors';

export const ConfigFormInput = props => {
  // eslint-disable-next-line no-unused-vars
  const { id, errorMsg, ...inputProps } = props;
  const { isSelectField } = useCheckValidSelectField(props);
  return (
    <FormControl
      sx={{
        '& .MuiFormLabel-root.Mui-focused': {
          color: grey[500],
          fontWeight: 'bold'
        },
        '& .MuiInput-root': {
          color: grey[300],
          borderBottom: `2px solid ${grey[500]}`,
          width: '300px',
          '&::after': {
            borderBottom: `0px solid ${amber[400]}`
          }
        },
        '& .MuiSelect-icon': {
          color: grey[300]
        }
      }}
      error={!!errorMsg}
    >
      {isSelectField ? <ConfigSelectField {...inputProps} /> : <TextField focused variant='standard' {...inputProps} />}
      <FormHelperText
        sx={{
          '&': {
            marginLeft: '0px'
          }
        }}
      >
        {errorMsg}
      </FormHelperText>
    </FormControl>
  );
};

const ConfigSelectField = props => {
  const { label, options, ...otherProps } = props;
  return (
    <>
      <InputLabel focused variant='standard'>
        {label}
      </InputLabel>
      <Select variant='standard' {...otherProps}>
        {options.map((option, index) => (
          <MenuItem value={option.value} key={index}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

const useCheckValidSelectField = props => {
  let isSelectField = false;
  if (props.type !== 'select') {
    return {
      isSelectField
    };
  }
  if (props.options === null || props.options === undefined) {
    throw 'options must be exist';
  }
  if (!Array.isArray(props.options)) {
    throw "options's type must be Array";
  }
  return {
    isSelectField: true
  };
};
