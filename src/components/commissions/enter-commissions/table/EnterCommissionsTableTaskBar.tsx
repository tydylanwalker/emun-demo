import { Stack, Typography, FormControlLabel, Switch, Button } from '@mui/material';
import { useAppDispatch } from '../../../../hooks/ReduxHooks';
import { setEnterCommissionsRows } from '../../../../store/slices/enterCommissionsSlice';
import { IEnterCommissionsRow } from '../EnterCommissions';
import { postInvoicesFromCommissions } from '../../../../store/thunks/postInvoicesFromCommissionRows';
import { ESheets } from '../../../../data/enums/ESheets';
import { getThunk } from '../../../../store/thunks/requests/getThunk';

export function EnterCommissionsTableTaskBar(props: IEnterCommissionsTableTaskBarProps) {
  const dispatch = useAppDispatch();

  const submitMatchedRows = async () => {
    const ok = await dispatch(await postInvoicesFromCommissions(props.matchedRows, true));
    if (ok) dispatch(setEnterCommissionsRows(props.rowsWithErrors));
    dispatch(getThunk(ESheets.Invoices));
  };

  const submitErrorRows = async () => {
    const ok = await dispatch(await postInvoicesFromCommissions(props.rowsWithErrors, true, true));
    if (ok) dispatch(setEnterCommissionsRows(props.matchedRows));
    dispatch(getThunk(ESheets.Invoices));
  };

  return (
    <Stack direction='row' justifyContent='space-between' p={1.5}>
      <Stack direction='row' gap={3} alignItems='center'>
        <Typography variant='h5'>Commissions</Typography>
      </Stack>
      <Stack direction='row' gap={2}>
        {props.rowsWithErrors.length > 0 && (
          <FormControlLabel
            sx={{
              color: 'error.main',
            }}
            control={
              <Switch
                color='error'
                checked={props.onlyShowErrors}
                onChange={(event) => props.setOnlyShowErrors(event.target.checked)}
              />
            }
            label={`Show ${props.rowsWithErrors.length} Errors`}
          />
        )}
        {props.onlyShowErrors ? (
          <Button variant='contained' color='warning' onClick={() => submitErrorRows()}>
            Submit {props.rowsWithErrors.length} Entries with Direct Orders
          </Button>
        ) : (
          <Button variant='contained' onClick={() => submitMatchedRows()} disabled={props.matchedRows.length === 0}>
            Submit {props.matchedRows.length} Entries without Errors
          </Button>
        )}
      </Stack>
    </Stack>
  );
}

interface IEnterCommissionsTableTaskBarProps {
  matchedRows: IEnterCommissionsRow[];
  rowsWithErrors: IEnterCommissionsRow[];
  onlyShowErrors: boolean;
  setOnlyShowErrors: (checked: boolean) => void;
}
