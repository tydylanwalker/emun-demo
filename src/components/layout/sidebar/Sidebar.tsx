import {
  Home,
  ShoppingBag,
  ViewAgenda,
  ContactsRounded,
  Person,
  AccountBalanceRounded,
  UploadFileRounded,
  PaymentRounded,
  CheckBox,
  PriceChangeRounded,
  PaidRounded,
  LocationCityRounded,
  MapRounded,
  ManageAccountsRounded,
  RuleFolder,
} from '@mui/icons-material';
import { Box, IconButton, List } from '@mui/material';
import { SidebarItem } from './SidebarItem';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { DrawerHeader } from '../DrawerHeader';
import { sidebarWidth, topbarHeight } from '../../../data/constants';

export interface ISidebarContent {
  icon: JSX.Element;
  label: string;
  children?: ISidebarContent[];
  href?: string;
}

const sidebarContent: ISidebarContent[] = [
  {
    icon: <Home />,
    label: 'Home',
    href: '/home',
  },
  {
    icon: <ShoppingBag />,
    label: 'Orders',
    children: [
      {
        icon: <ViewAgenda />,
        label: 'View Orders',
        href: '/orders/view-orders',
      },
    ],
  },
  {
    icon: <ContactsRounded />,
    label: 'Vendors',
    href: '/contacts',
  },
  {
    icon: <Person />,
    label: 'Reps',
    href: '/reps',
  },
  {
    icon: <AccountBalanceRounded />,
    label: 'Commissions',
    children: [
      {
        label: 'Enter Commissions',
        icon: <UploadFileRounded />,
        href: '/commissions/enter-commissions',
      },
      {
        label: 'Comission Rules',
        icon: <RuleFolder />,
        href: '/commissions/commission-rules',
      },
      {
        label: 'Checks',
        icon: <PaymentRounded />,
        href: '/commissions/checks',
      },
      {
        label: 'Invoices',
        icon: <CheckBox />,
        href: '/commissions/invoices',
      },
      {
        label: 'Adjustments',
        icon: <PriceChangeRounded />,
        href: '/commissions/adjustments',
      },
      {
        label: 'Commissions Draft',
        icon: <PaidRounded />,
        href: '/commissions/commissions-draft',
      },
    ],
  },
  {
    icon: <LocationCityRounded />,
    label: 'Territory Management',
    children: [
      // {
      //   label: 'Rep Groups',
      //   icon: <GroupRounded />,
      //   href: '/territory-management',
      // },
      // {
      //   label: 'Divisions',
      //   icon: <SafetyDividerRounded />,
      //   href: '/territory-management',
      // },
      // {
      //   label: 'Regions',
      //   icon: <CropOriginalRounded />,
      //   href: '/territory-management',
      // },
      // {
      //   label: 'Territories',
      //   icon: <TerrainRounded />,
      //   href: '/territory-management',
      // },
      {
        label: 'Management',
        icon: <ManageAccountsRounded />,
        href: '/territory-management',
      },
      {
        label: 'Map',
        icon: <MapRounded />,
        href: '/territory-management/map',
      },
    ],
  },
];

const openedMixin = (theme: Theme): CSSObject => ({
  width: sidebarWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  width: sidebarWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      },
    },
  ],
}));

export function Sidebar(props: ISidebarProps) {
  const theme = useTheme();
  const { open, handleDrawerClose, handleDrawerOpen } = props;

  return (
    <Drawer variant='permanent' open={open}>
      <DrawerHeader>
        <Box display='flex' width='100%' height={topbarHeight} justifyContent='space-between' borderBottom={1}>
          <Box flexGrow={1}></Box>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </Box>
      </DrawerHeader>
      <List>
        {sidebarContent.map((content, index) => (
          <SidebarItem key={index} sidebarItem={content} sidebarOpen={open} handleDrawerOpen={handleDrawerOpen} />
        ))}
      </List>
    </Drawer>
  );
}

interface ISidebarProps {
  open?: boolean;
  handleDrawerClose: () => void;
  handleDrawerOpen: () => void;
}
