import { useState, useMemo } from 'react';
import { Typography, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { PartsAddDialog } from './PartsAddDialog';
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

const PartsTabContent = ({ useGetConfigList, useAddConfig, useDeleteConfig }) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [expanded, setExpanded] = useState(true);
  const LINE_KEY = 'part_specs';
  const utils = useContext(UtilsContext);
  const { data: partsData, refresh } = useGetConfigList(LINE_KEY);
  const { asyncCallback: addRule } = useAddConfig(LINE_KEY);
  const { asyncCallback: deleteRule } = useDeleteConfig(LINE_KEY);

  useEffect(() => {
    if (!partsData) return;
    setTableRows(partsData);
  }, [partsData]);

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

  const handleAddRule = async ({ partId, taktTime, fullStopThreshold, idealCycleTime, closeDialog }) => {
    await addRule({
      new_value: {
        part_id: partId,
        takt_time_seconds: taktTime,
        full_stop_threshold_seconds: fullStopThreshold,
        ideal_cycle_time_seconds: idealCycleTime
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
          id: 'part_id',
          disablePadding: false,
          label: 'PART ID'
        },
        {
          id: 'takt_time_seconds',
          disablePadding: false,
          label: 'TAKT TIME'
        },
        {
          id: 'full_stop_threshold_seconds',
          disablePadding: false,
          label: 'FULL STOP THRESHOLD'
        },
        {
          id: 'ideal_cycle_time_seconds',
          disablePadding: false,
          label: 'IDEAL CYCLE TIME'
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
            <Typography>PARTS</Typography>
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
      <PartsAddDialog isOpen={isAddDialogOpen} onClose={handleCloseAddDialog} onSubmit={handleAddRule} />
      <ConfirmDeleteDialog isOpen={isDeleteDialogOpen} onClose={handleCloseDeleteDialog} onDelete={handleDeleteRule} />
    </>
  );
};

export default PartsTabContent;
