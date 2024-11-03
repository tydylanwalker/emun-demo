import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { EModes } from '../EnterCommissions';

export default function CommissionModesToggleButtons(props: ICommissionModesToggleButtonsProps) {
  return (
    <ToggleButtonGroup
      color='primary'
      value={props.mode}
      exclusive
      onChange={(_, mode) => props.setMode(mode)}
      size='small'
      sx={{ whiteSpace: 'nowrap' }}
    >
      <ToggleButton value={EModes.manual}>{EModes.manual}</ToggleButton>
      <ToggleButton value={EModes.view}>{EModes.view}</ToggleButton>
    </ToggleButtonGroup>
  );
}

interface ICommissionModesToggleButtonsProps {
  setMode: (mode: EModes) => void;
  mode: EModes;
}