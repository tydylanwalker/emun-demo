import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { EEnterCommissionModes } from '../EnterCommissions';

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
      <ToggleButton value={EEnterCommissionModes.manual}>{EEnterCommissionModes.manual}</ToggleButton>
      <ToggleButton value={EEnterCommissionModes.view}>{EEnterCommissionModes.view}</ToggleButton>
    </ToggleButtonGroup>
  );
}

interface ICommissionModesToggleButtonsProps {
  setMode: (mode: EEnterCommissionModes) => void;
  mode: EEnterCommissionModes;
}
