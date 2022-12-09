import { Accordion, styled } from '@mui/material';
import { grey } from '@mui/material/colors';

export const ConfigAccordion = styled(props => <Accordion {...props}></Accordion>)(() => ({
  '&.MuiAccordion-root': {
    '&': {
      backgroundColor: 'transparent',
      boxShadow: '0px 0px transparent',
      color: grey[200]
    },
    '&:before': {
      height: 0
    }
  },
  '& .MuiAccordionSummary-expandIconWrapper': {
    color: grey[200]
  }
}));
