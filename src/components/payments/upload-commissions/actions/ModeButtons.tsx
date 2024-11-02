import { Button, ButtonProps, Stack } from '@mui/material';

export function ModeButtons(props: ButtonProps & IModeButtonsProps) {
  return (
    <Stack direction='row' width={1} mt={3} gap={2}>
      <Button
        sx={{ fontSize: '1.2' }}
        fullWidth
        size='large'
        variant='outlined'
        onClick={props.onSingleEntryClick}
        disabled={props.disabled}
      >
        Manual Entry
      </Button>
      <Button
        sx={{ fontSize: '1.2' }}
        fullWidth
        size='large'
        variant='contained'
        onClick={props.onUploadFileClick}
        disabled={props.disabled}
      >
        Upload File
      </Button>
    </Stack>
  );
}

interface IModeButtonsProps {
  onUploadFileClick: () => void;
  onSingleEntryClick: () => void;
}
