import Button from '@mui/material/Button';
import { Box, Dialog, Stack, Tab, Tabs, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { CustomInput } from '../../../shared/CustomInput';
import { useAppDispatch, useAppSelector } from '../../../../hooks/ReduxHooks';
import { getInvoices, getVendors } from '../../../../store/slices/dataSlice';
import {
  getCommissionRulesDetailsOpen,
  getCommissionRuleSelected,
  setCommissionRulesDetailsOpen,
  setCommissionRuleSelected,
} from '../../../../store/slices/enterCommissionsSlice';
import { getRepOptions } from '../../commissions-draft/CommissionDraftTaskBar';
import { SplitCommissionsModal } from '../../commissions-draft/forms/SplitCommissionsModal';
import { postThunk } from '../../../../store/thunks/requests/postThunk';
import { ESheets } from '../../../../data/enums/ESheets';
import { updateThunk } from '../../../../store/thunks/requests/updateThunk';

const emptyForm = {
  description: '',
  startDate: '',
  endDate: '',
  vendor: '',
  commissionGroupName: '',
  orderSource: '',
  salesRep: '',
  accountType: '',
  writingRepPercentage: '',
  salesRepPercentage: '',
  housePercentage: '',
};

export function CommissionRuleDetails() {
  const dispatch = useAppDispatch();
  const commissionRuleSelected = useAppSelector(getCommissionRuleSelected);
  const vendors = useAppSelector(getVendors);
  const vendorOptions = vendors.map((vendor) => vendor.VendorName);
  const repOptions = getRepOptions(useAppSelector(getInvoices));

  const [formData, setFormData] = useState(commissionRuleSelected || emptyForm);
  const [tab, setTab] = useState(0);
  const [splitOpen, setSplitOpen] = useState(false);

  useEffect(() => {
    setFormData(commissionRuleSelected || emptyForm);
  }, [commissionRuleSelected]);

  const closeDrawer = () => {
    dispatch(setCommissionRulesDetailsOpen(false));
    dispatch(setCommissionRuleSelected(undefined));
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSave = async () => {
    if (commissionRuleSelected) {
      dispatch(updateThunk(formData, ESheets.CommissionRules));
    } else {
      dispatch(postThunk(formData, ESheets.CommissionRules));
    }
    closeDrawer();
  };

  return (
    <Dialog
      open={useAppSelector(getCommissionRulesDetailsOpen)}
      onClose={closeDrawer}
      PaperProps={{ sx: { minWidth: '60rem' } }}
    >
      <Stack p={2} gap={2}>
        <Typography fontWeight={700} fontSize='1.25rem' borderBottom={1}>
          {commissionRuleSelected ? 'Commission Rule Details' : 'Add a New Commission Rule'}
        </Typography>

        <Tabs value={tab} onChange={(_, v) => setTab(v)}>
          <Tab label='Details' />
          <Tab label='Customers' />
        </Tabs>

        {tab === 0 && (
          <Stack gap={1}>
            <Box display='flex' gap={2}>
              <CustomInput
                required
                value={formData.description}
                options={vendorOptions}
                label='Name'
                name='description'
                onChange={handleChange}
              />
              <CustomInput
                required
                date
                value={formData.startDate}
                label='Start Date'
                name='startDate'
                onChange={handleChange}
                maxWidth='10rem'
              />
              <CustomInput
                required
                date
                value={formData.endDate}
                label='End Date'
                name='endDate'
                onChange={handleChange}
                maxWidth='10rem'
              />
            </Box>
            <Box display='flex' gap={2}>
              <CustomInput
                required
                select
                value={formData.vendor}
                label='Vendor'
                name='vendor'
                options={vendorOptions}
                onChange={handleChange}
              />
              <CustomInput
                required
                select
                value={formData.commissionGroupName}
                label='Commission Group'
                name='commissionGroupName'
                options={['Domestic 50/50', 'Domestic 60/40', 'Key Retail 70/30', 'Key Retail 50/50']}
                onChange={handleChange}
              />
            </Box>
            <Box display='flex' gap={2}>
              <CustomInput
                required
                select
                value={formData.orderSource}
                label='Order Source'
                name='orderSource'
                options={['Road', 'Show', 'B2B', 'Direct']}
                onChange={handleChange}
              />
              <CustomInput
                required
                select
                value={formData.accountType}
                label='Account Type'
                name='accountType'
                options={['Gift', 'Florist', 'Hallmark', 'Souvenir']}
                onChange={handleChange}
              />
              <CustomInput
                required
                select
                value={formData.salesRep}
                label='Sales Rep'
                name='salesRep'
                options={repOptions}
                onChange={handleChange}
              />
            </Box>
            <Stack gap={1}>
              <CustomInput
                value={formData.writingRepPercentage}
                label='Writing Rep Percentage'
                name='writingRepPercentage'
                onChange={handleChange}
                maxWidth='15rem'
              />
              <Box display='flex' gap={2}>
                <CustomInput
                  required
                  value={formData.salesRepPercentage}
                  label='Sales Rep Percentage'
                  name='salesRepPercentage'
                  onChange={handleChange}
                  maxWidth='15rem'
                />
                <Button variant='contained' sx={{ alignSelf: 'end', mb: 1 }} onClick={() => setSplitOpen(true)}>
                  Add Rep Splits
                </Button>
              </Box>
              <CustomInput
                required
                value={formData.housePercentage}
                label='House Percentage'
                name='housePercentage'
                onChange={handleChange}
                maxWidth='15rem'
              />
            </Stack>
          </Stack>
        )}

        {tab === 1 && (
          <Stack gap={2} mt={2}>
            {/* Empty Customers Tab for now */}
            <Typography>Customers section (coming soon)</Typography>
          </Stack>
        )}

        <Button
          onClick={onSave}
          size='large'
          color='success'
          variant='contained'
          fullWidth
          sx={{ borderRadius: 10, mt: 3 }}
        >
          Save Rule
        </Button>
      </Stack>
      <SplitCommissionsModal
        open={splitOpen}
        closeModal={setSplitOpen}
        repOptions={repOptions}
        repSelected={formData.salesRep}
      />
    </Dialog>
  );
}
