import { useState, useMemo } from 'react';
import { Typography, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { SchedulesAddDialog } from './SchedulesAddDialog';
import { ConfirmDeleteDialog } from '../../../components/Dialog/ConfirmDeleteDialog';
import { ConfigTable } from '../../../components/Table/ConfigTable';
import { ConfigAccordion } from '../../../components/Accordion/ConfigAccordion';
import { ConfigAccordionSummary } from '../../../components/Accordion/ConfigAccordionSummary';
import { ConfigAccordionDetails } from '../../../components/Accordion/ConfigAccordionDetails';
import { ButtonDelete } from '../../../components/Button/ConfigButtonDelete';
import { ButtonAddRule } from '../../../components/Button/ConfigButtonAddRule';
import { useEffect } from 'react';
import { useContext } from 'react';
import { UtilsContext } from '../../../utils/UtilsProvider';

const SchedulesTabContent = ({ useGetConfigList, useAddConfig, useDeleteConfig }) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [expanded, setExpanded] = useState(true);
  const utils = useContext(UtilsContext);
  const LINE_KEY = 'rest_time_intervals';
  const { data: restTimeData, refresh } = useGetConfigList(LINE_KEY);
  const { asyncCallback: addRule } = useAddConfig(LINE_KEY);
  const { asyncCallback: deleteRule } = useDeleteConfig(LINE_KEY);

  useEffect(() => {
    if (!restTimeData) return;
    setTableRows(
      restTimeData.map(data => ({
        id: data.id,
        time: `${data['from_time']} - ${data['to_time']}`,
        type: data['rest_time_interval_type']
      }))
    );
  }, [restTimeData]);

  const handleSetSelected = ids => {
    setSelected(ids);
  };

  const handleChangeExpanded = () => {
    setExpanded(state => !state);
  };

  // DIALOG HANDLER
  const handleOpenAddDialog = () => {
    setIsAddDialogOpen(true);
  };

  const handleOpenDeleteDialog = () => {
    if (selected.length === 0) {
      utils.showNotify({
        message: 'Please Choose at least one rule',
        type: 'error'
      });
      return;
    }
    setIsDeleteDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setIsAddDialogOpen(false);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleAddRule = async ({ fromTime, toTime, type, closeDialog }) => {
    await addRule({
      new_value: {
        from_time: fromTime,
        to_time: toTime,
        rest_time_interval_type: type
      }
    });
    closeDialog();
    refresh();
  };

  const handleDeleteRule = async () => {
    await deleteRule({ ids_deleted: selected });
    setSelected([]);
    handleCloseDeleteDialog();
    refresh();
  };

  const tableProps = useMemo(
    () => ({
      selected,
      tableRows,
      headCells: [
        {
          id: 'time',
          numeric: true,
          disablePadding: false,
          label: 'TIME'
        },
        {
          id: 'type',
          numeric: false,
          disablePadding: false,
          label: 'TYPE'
        }
      ],
      onSelected: handleSetSelected
    }),
    [selected, tableRows]
  );

  return (
    <>
      <Stack spacing={4}>
        <ConfigAccordion expanded={expanded} onChange={handleChangeExpanded}>
          {/* Accordion Title */}
          <ConfigAccordionSummary>
            <Typography>BREAK SCHEDULES</Typography>
          </ConfigAccordionSummary>

          {/* Accordion Content */}
          <ConfigAccordionDetails>
            {/* ACTIONS BUTTON */}
            <Grid display='flex' xs={12} gap={2} justifyContent='end' sx={{ mb: 2 }}>
              <ButtonDelete onClick={handleOpenDeleteDialog} />
              <ButtonAddRule onClick={handleOpenAddDialog} />
            </Grid>
            <Grid container spacing={2}>
              {/* list Table */}
              <ConfigTable {...tableProps} />
            </Grid>
          </ConfigAccordionDetails>
        </ConfigAccordion>
      </Stack>
      {/* Dialog */}
      <SchedulesAddDialog isOpen={isAddDialogOpen} onClose={handleCloseAddDialog} onSubmit={handleAddRule} />
      <ConfirmDeleteDialog isOpen={isDeleteDialogOpen} onClose={handleCloseDeleteDialog} onDelete={handleDeleteRule} />
    </>
  );
};

export default SchedulesTabContent;
