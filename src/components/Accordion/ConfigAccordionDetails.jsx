import { AccordionDetails, styled } from '@mui/material';
import { grey } from '@mui/material/colors';

export const ConfigAccordionDetails = styled(props => <AccordionDetails {...props}></AccordionDetails>)(() => ({
  '& .MuiTypography-root': {
    fontSize: '1.2rem',
    color: grey[400]
  },
  '& button .MuiTypography-root': {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: 'inherit'
  }
}));
