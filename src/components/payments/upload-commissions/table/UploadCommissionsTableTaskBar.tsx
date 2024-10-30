import { Stack, Typography, FormControlLabel, Switch, Button, Alert } from '@mui/material';

export function UploadCommissionsTableTaskBar(props: IUploadCommissionsTableTaskBarProps) {
  return (
    <Stack direction='row' justifyContent='space-between' p={1.5}>
      <Stack direction='row' gap={3} alignItems='center'>
        <Typography variant='h5'>Imported Data</Typography>
        <Typography variant='caption'>{props.totalRows} entries</Typography>
      </Stack>
      <Stack direction='row' gap={2}>
        {props.rowsWithErrors > 0 && (
          <Alert severity='error' sx={{ width: 'fit-content' }}>
            Looks like your upload data has errors! Click the field with the error to resolve
          </Alert>
        )}
        <FormControlLabel
          control={
            <Switch
              checked={props.onlyShowErrors}
              onChange={(event) => props.setOnlyShowErrors(event.target.checked)}
            />
          }
          label={`Only show errors (${props.rowsWithErrors})`}
        />
        {props.rowsWithErrors === 0 ? (
          <Button variant='contained' onClick={() => window.alert('submitting all rows')}>
            Submit {props.totalRows} Entries
          </Button>
        ) : (
          <Button
            variant='contained'
            color='warning'
            onClick={() => window.alert('submitting rows without errors....')}
          >
            Submit {props.totalRows - props.rowsWithErrors} Entries without errors
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
}
