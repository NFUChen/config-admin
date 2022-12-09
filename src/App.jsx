import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { grey, amber } from '@mui/material/colors';
import Grid from '@mui/material/Unstable_Grid2';
import { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from './utils/axios';
import { UtilsContext } from './utils/UtilsProvider';

function App() {
  const { lines } = useGetLineList();
  return (
    <Box my={2}>
      <Typography fontSize={36} fontWeight={900} mb={2} color={grey[700]} letterSpacing={1.1}>
        LINES LIST
      </Typography>
      <Grid container spacing={4}>
        {lines.map(line => (
          <Grid xs={12} sm={6} md={4} lg={3} key={line}>
            <StyledLineCard lineName={line} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

const StyledLineCard = ({ lineName }) => (
  <Card
    variant='outlined'
    sx={{
      '&.MuiCard-root': {
        color: grey[200],
        backgroundColor: grey[800]
        // border: `1px solid ${amber[600]}`
      }
    }}
  >
    <CardContent
      sx={{
        paddingBottom: '0'
      }}
    >
      <Typography fontSize={20} fontWeight={900} component='div'>
        {lineName}
      </Typography>
    </CardContent>
    <CardActions sx={{ justifyContent: 'end' }}>
      <Button
        size='small'
        component={Link}
        to={`config/${lineName}`}
        sx={{
          '&.MuiButton-root': {
            '&, &:hover': {
              color: amber[600]
            },
            '&:hover': {
              backgroundColor: 'rgba(252, 231, 178, 0.04)'
            }
          }
        }}
      >
        CONNECT
      </Button>
    </CardActions>
  </Card>
);

export const useGetLineList = () => {
  const util = useContext(UtilsContext);
  const navigate = useNavigate();
  const [lines, setLines] = useState([]);
  useEffect(() => {
    getLineList()
      .catch(error => {
        util.showNotify({ type: 'error', message: error });
        navigate('/404');
      })
      .finally(() => {
        util.stopLoading();
      });
  }, []);

  const getLineList = async () => {
    util.startLoading();
    const response = await axios.get('all_lines');
    setLines(response.data.all_lines);
  };

  return {
    lines
  };
};

export default App;
