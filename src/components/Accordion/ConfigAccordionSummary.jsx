import { AccordionSummary, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const ConfigAccordionSummary = styled(props => (
  <AccordionSummary expandIcon={<ExpandMoreIcon />} {...props}></AccordionSummary>
))(() => ({
  '&': {
    '.MuiTypography-root, .MuiAccordionSummery-content, .MuiSvgIcon-root': {
      color: grey[600],
      fontSize: '2.5rem'
    }
  }
}));
