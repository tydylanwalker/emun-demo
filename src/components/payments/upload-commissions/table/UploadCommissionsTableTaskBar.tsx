import { Stack, Typography, FormControlLabel, Switch, Button } from '@mui/material';

export function UploadCommissionsTableTaskBar(props: IUploadCommissionsTableTaskBarProps) {
  return (
    <Stack direction='row' justifyContent='space-between' p={1.5}>
      <Stack direction='row' gap={3} alignItems='center'>
        <Typography variant='h5'>Commissions</Typography>
        <Typography variant='subtitle1'>{props.totalRows} entries</Typography>
      </Stack>
      <Stack direction='row' gap={2}>
        {props.rowsWithErrors > 0 && (
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
            label={`Show ${props.rowsWithErrors} Errors`}
          />
        )}
        {props.onlyShowErrors ? (
          <Button
            variant='contained'
            color='warning'
            onClick={() => window.alert('Creating no detail orders for errors and submitting...')}
          >
            Create {props.rowsWithErrors} No Detail Orders
          </Button>
        ) : props.rowsWithErrors === 0 ? (
          <Button variant='contained' onClick={props.submitRows}>
            Submit {props.totalRows} Entries
          </Button>
        ) : (
          <Button variant='contained' onClick={() => window.alert('Submitting rows without errors...')}>
            Submit {props.totalRows - props.rowsWithErrors} Entries without Errors
          </Button>
        )}
      </Stack>
    </Stack>
  );
}

interface IUploadCommissionsTableTaskBarProps {
  totalRows: number;
  rowsWithErrors: number;
  onlyShowErrors: boolean;
  setOnlyShowErrors: (checked: boolean) => void;
  submitRows: () => void;
}
