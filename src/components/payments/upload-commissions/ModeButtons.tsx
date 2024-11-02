import { Button, ButtonProps, Stack } from '@mui/material';

export function ModeButtons(props: ButtonProps & IModeButtonsProps) {
  return (
    <Stack direction='row' width={1} mt={3} gap={2}>
      <Button
        sx={{ fontSize: props.fontSize }}
        fullWidth={props.fullWidth}
        size={props.size || 'large'}
        variant='outlined'
        onClick={props.onSingleEntryClick}
        disabled={props.disabled}
      >
        {props.mode === 'single' ? 'View Commissions' : 'Manual Entry'}
      </Button>
      <Button
        sx={{ fontSize: props.fontSize }}
        fullWidth={props.fullWidth}
        size={props.size || 'large'}
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
  fontSize?: string;
  mode: 'single' | 'normal' | null;
}
