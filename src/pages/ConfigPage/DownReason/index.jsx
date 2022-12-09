import { useState, useMemo } from 'react';
import { Typography, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { DownReasonAddDialog } from './DownReasonAddDialog';
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
  const LINE_KEY = 'down_reasons';
  const utils = useContext(UtilsContext);
  const { data: downReasonData, refresh } = useGetConfigList(LINE_KEY);
  const { asyncCallback: addRule } = useAddConfig(LINE_KEY);
  const { asyncCallback: deleteRule } = useDeleteConfig(LINE_KEY);

  useEffect(() => {
    if (!downReasonData) return;
    setTableRows(downReasonData);
  }, [downReasonData]);

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

  const handleAddRule = async ({ downReason, closeDialog }) => {
    await addRule({
      new_value: {
        down_reason: downReason
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
          id: 'down_reason',
          disablePadding: false,
          label: 'DOWN REASON'
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
            <Typography>DOWN REASONS</Typography>
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
      <DownReasonAddDialog isOpen={isAddDialogOpen} onClose={handleCloseAddDialog} onSubmit={handleAddRule} />
      <ConfirmDeleteDialog isOpen={isDeleteDialogOpen} onClose={handleCloseDeleteDialog} onDelete={handleDeleteRule} />
    </>
  );
};

export default PartsTabContent;
