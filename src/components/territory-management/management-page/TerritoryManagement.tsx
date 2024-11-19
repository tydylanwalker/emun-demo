import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { TerritoriesTab } from './tabs/TerritoriesTab';
import { RepGroupsTab } from './tabs/RepGroupTab';
import { RegionsTab } from './tabs/RegionsTab';
import { ZipCodesTab } from './tabs/ZipCodesTab';
import { DivisionsTab } from './tabs/DivisionsTab';
import { useAppSelector } from '../../../hooks/ReduxHooks';
import { getDivisions } from '../../../store/slices/dataSlice';
import { getZipCodes } from '../../../store/slices/dataSlice';
import { findNonEmptyDivisions } from '../map-page/map/TerritoryMap';
import { Stack } from '@mui/material';
import { topbarHeight } from '../../../data/constants';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ flexGrow: 1, height: `calc(98vh - ${topbarHeight}px)`, width: '100%', padding: '1rem' }}
    >
      {value === index && children}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export function TerritoryManagement() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const zipCodes = useAppSelector(getZipCodes);
  const divisions = useAppSelector(getDivisions);
  const nonEmptyDivisions = findNonEmptyDivisions(divisions);

  return (
    <Stack direction='row'>
      <Tabs
        orientation='vertical'
        variant='scrollable'
        value={value}
        onChange={handleChange}
        aria-label='Vertical tabs example'
      >
        <Tab label='Divisions' {...a11yProps(0)} />
        <Tab label='Territories' {...a11yProps(1)} />
        <Tab label='Rep Groups' {...a11yProps(2)} />
        <Tab label='Regions' {...a11yProps(3)} />
        <Tab label='Zip Codes' {...a11yProps(4)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <DivisionsTab divisions={nonEmptyDivisions} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TerritoriesTab divisions={nonEmptyDivisions} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <RepGroupsTab divisions={nonEmptyDivisions} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <RegionsTab />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <ZipCodesTab zipCodes={zipCodes} />
      </TabPanel>
    </Stack>
  );
}
