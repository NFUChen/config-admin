import {
  TableContainer,
  TablePagination,
  Checkbox,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Table,
  Box
} from '@mui/material';
import PropTypes from 'prop-types';
import { useState, useMemo } from 'react';
import { grey } from '@mui/material/colors';

// Table Header
const ConfigTableHead = props => {
  const { onSelectAllClick, numSelected, rowCount, headCells } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            color='primary'
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts'
            }}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell key={headCell.id} align='center' padding={headCell.disablePadding ? 'none' : 'normal'}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

// 來讓之後引用的時候不需要一直查參數
ConfigTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired
};

// Table
export const ConfigTable = ({ tableRows = [], headCells = [], onSelected, selected }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const rowCount = tableRows.length;

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelected = tableRows.map(row => row.id);
      onSelected([...newSelected]);
      return;
    }
    onSelected([]);
  };

  // 當點選每列資料時，他會將選中的資料加入或移除 selected
  const handleSelectRow = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, id];
    } else if (selectedIndex === 0) {
      newSelected = [...selected.slice(1)];
    } else if (selectedIndex === selected.length - 1) {
      newSelected = [...selected.slice(0, -1)];
    } else if (selectedIndex > 0) {
      newSelected = [...selected.slice(0, selectedIndex), ...selected.slice(selectedIndex + 1)];
    }

    onSelected(newSelected);
  };

  // 換頁 Handler
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // 檢查是否選取，return boolean
  const isSelected = useMemo(() => {
    return id => selected.indexOf(id) !== -1;
  }, [selected]);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = useMemo(() => (page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rowCount) : 0), [rowsPerPage]);

  return (
    <>
      {/* TABLE LAYOUT */}
      <Box
        sx={{
          width: '100%',
          border: `2px solid ${grey[700]}`,
          borderRadius: '.75rem',
          overflow: 'hidden',
          '& .MuiTableCell-root': {
            color: grey[400],
            borderBottom: `1px solid ${grey[700]}`,
            fontWeight: 'bold'
          },
          '& .MuiCheckbox-root': {
            color: grey[400],
            '&.Mui-checked, &.MuiCheckbox-indeterminate': {
              color: grey[300]
            }
          },
          '& .MuiTableHead-root': { backgroundColor: '#363636' },
          '& .MuiTableRow-root.Mui-selected': {
            backgroundColor: '#242424'
          }
        }}
      >
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle' size={'medium'}>
            <ConfigTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rowCount}
              headCells={headCells}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {tableRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                const isItemSelected = isSelected(row.id);
                return (
                  <TableRow
                    hover
                    onClick={event => handleSelectRow(event, row.id)}
                    role='checkbox'
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                  >
                    <TableCell padding='checkbox'>
                      <Checkbox
                        color='primary'
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': row.id
                        }}
                      />
                    </TableCell>
                    {headCells
                      .filter(cell => cell !== 'id')
                      .map(cell => (
                        <TableCell align='center' key={cell.id}>
                          {row[cell.id]}
                        </TableCell>
                      ))}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={rowCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            '&, & .MuiSvgIcon-root': {
              color: grey[400]
            }
          }}
        />
      </Box>
    </>
  );
};
