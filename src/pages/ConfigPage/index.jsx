import { Button, Tab, Tabs, Typography } from '@mui/material';
import { TabPanelContainer } from '../../components/Tab/TabPanelContainer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { amber, grey } from '@mui/material/colors';
import { useContext, useState } from 'react';
import SchedulesTabContent from './Schedules';
import PartsTabContent from './Parts';
import axios from '../../utils/axios';
import DownReasonTabContent from './DownReason';
import HandOverTimeTabContent from './HandOverTime';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { UtilsContext } from '../../utils/UtilsProvider';
import { useEffect } from 'react';

const ConfingPage = () => {
  const configApiHooks = {
    useGetConfigList,
    useAddConfig,
    useDeleteConfig
  };

  const { tabValue, handleChangeTabValue } = useTabChangeNotifier();

  return (
    <>
      <Tabs
        sx={{
          '& .MuiTab-root': { '&, &.Mui-selected': { color: grey[400] } },
          '& .MuiTabs-indicator': {
            backgroundColor: amber[600]
          }
        }}
        value={tabValue}
        variant='fullWidth'
        onChange={handleChangeTabValue}
      >
        <Tab label='Schedules'></Tab>
        <Tab label='Parts'></Tab>
        <Tab label='Down Reasons'></Tab>
        <Tab label='Hand Over Times'></Tab>
      </Tabs>
      <TabPanelContainer value={tabValue} index={0}>
        <SchedulesTabContent {...configApiHooks} />
      </TabPanelContainer>
      <TabPanelContainer value={tabValue} index={1}>
        <PartsTabContent {...configApiHooks} />
      </TabPanelContainer>
      <TabPanelContainer value={tabValue} index={2}>
        <DownReasonTabContent {...configApiHooks} />
      </TabPanelContainer>
      <TabPanelContainer value={tabValue} index={3}>
        <HandOverTimeTabContent {...configApiHooks} />
      </TabPanelContainer>
      <Button sx={{ ml: 4, mt: 4 }} component={Link} to={-1}>
        <ChevronLeftIcon
          sx={{
            fontSize: 48,
            color: grey[700]
          }}
        />
        <Typography fontSize={40} color={grey[700]} letterSpacing={1.1}>
          BACK
        </Typography>
      </Button>
    </>
  );
};

const useTabChangeNotifier = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tabValue, setTabValue] = useState(parseInt(searchParams.get('tab') ?? 0));

  const handleChangeTabValue = (_, value) => {
    setTabValue(value);
    setSearchParams({ tab: value }, { replace: true });
    // var searchParams = new URLSearchParams(window.location.search);
    // searchParams.set('tab', value);
    // var newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
    // history.replaceState(null, '', newRelativePathQuery);
  };

  return {
    tabValue,
    handleChangeTabValue
  };
};

const useGetConfigList = lineKey => {
  const [data, setData] = useState();
  const { lineName } = useParams();
  const utils = useContext(UtilsContext);

  const getConfigList = async () => {
    utils.startLoading();
    const response = await axios.get(`config/get/${lineName}`);
    setData(response.data.config[lineKey]);
    utils.stopLoading();
  };

  useEffect(() => {
    getConfigList();
  }, []);

  return {
    data,
    refresh: getConfigList
  };
};

const useAddConfig = lineKey => {
  const { lineName } = useParams();
  const utils = useContext(UtilsContext);

  return {
    asyncCallback: async function (request) {
      utils.startLoading();
      try {
        const response = await axios.post('config/create', {
          line_name: lineName,
          key: lineKey,
          ...request
        });
        if (response.data.error) throw response.data.error;
        utils.showNotify({
          message: 'Add success!',
          type: 'success'
        });
      } catch (error) {
        utils.showNotify({
          message: error.toString(),
          type: 'error'
        });
      } finally {
        utils.stopLoading();
      }
    }
  };
};

const useDeleteConfig = lineKey => {
  const { lineName } = useParams();
  const utils = useContext(UtilsContext);

  return {
    asyncCallback: async function (request) {
      utils.startLoading();
      try {
        const response = await axios.post('config/delete', {
          line_name: lineName,
          key: lineKey,
          ...request
        });
        if (response.data.error) throw response.data.error;
        utils.showNotify({
          message: 'Delete success!',
          type: 'success'
        });
      } catch (error) {
        utils.showNotify({
          message: error.toString(),
          type: 'error'
        });
      } finally {
        utils.stopLoading();
      }
    }
  };
};

export default ConfingPage;
