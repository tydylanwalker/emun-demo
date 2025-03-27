import { Typography, Stack, Button, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { useState, useEffect } from 'react';
import { ICommissionRule } from '../../../data/interfaces/ICommissionRule';
import { CustomInput } from '../../shared/CustomInput';
import { CustomTableContainer } from '../../shared/CustomTableContainer';
import { CommissionRulesTableRow } from './CommissionRulesTableRow';
import { useAppDispatch, useAppSelector } from '../../../hooks/ReduxHooks';
import { getCommissionRules } from '../../../store/slices/dataSlice';
import { setCommissionRulesDetailsOpen, setCommissionRuleSelected } from '../../../store/slices/enterCommissionsSlice';

export interface ICommissionRuleHeader {
  label: string;
  id: keyof ICommissionRule;
  align: 'left' | 'right' | 'center';
  type?: 'currency' | 'date' | 'string';
}

export const commissionRuleHeaders: ICommissionRuleHeader[] = [
  { label: 'Description', align: 'left', id: 'description' },
  { label: 'Start Date', align: 'left', id: 'startDate', type: 'date' },
  { label: 'End Date', align: 'left', id: 'endDate', type: 'date' },
  { label: 'Commission Group Name', align: 'left', id: 'commissionGroupName' },
  { label: 'Account Type', align: 'left', id: 'accountType' },
];

export function CommissionRulesTable() {
  const dispatch = useAppDispatch();
  const rows = useAppSelector(getCommissionRules);
  const [searchText, setSearchText] = useState('');
  const [filteredRows, setFilteredRows] = useState(rows);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  useEffect(() => {
    setSelectedRow(null);
    setPage(0);
    if (searchText === '') {
      setFilteredRows(rows);
    } else {
      setFilteredRows(
        rows.filter((row) =>
          Object.values(row).some((value) => value.toString().toLowerCase().includes(searchText.toLowerCase()))
        )
      );
    }
  }, [rows, searchText]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowClick = (row: ICommissionRule) => {
    dispatch(setCommissionRuleSelected(row));
    dispatch(setCommissionRulesDetailsOpen(true));
  };

  return (
    <CustomTableContainer
      tabIndex={0}
      taskBar={
        <Stack direction='row' justifyContent='space-between' p={1} gap={3}>
          <CustomInput
            type='search'
            size='small'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            sx={{ marginTop: 0 }}
          />
          <Stack direction='row' gap={2} alignItems='center'>
            <Button
              variant='contained'
              onClick={() => dispatch(setCommissionRulesDetailsOpen(true))}
              sx={{ whiteSpace: 'nowrap' }}
            >
              Add Rule
            </Button>
          </Stack>
        </Stack>
      }
      pagination={{
        count: filteredRows.length,
        page,
        rowsPerPage,
        onPageChange: handleChangePage,
        onRowsPerPageChange: handleChangeRowsPerPage,
      }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {commissionRuleHeaders.map((header, index) => (
              <TableCell
                key={index}
                align={header.align || 'left'}
                sx={{ fontSize: '1.2rem', fontWeight: 'bold', whiteSpace: 'nowrap' }}
              >
                {header.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
            <CommissionRulesTableRow
              key={index}
              row={row}
              headers={commissionRuleHeaders}
              selected={selectedRow === index}
              onClick={() => handleRowClick(row)}
            />
          ))}
        </TableBody>
      </Table>
    </CustomTableContainer>
  );
}
