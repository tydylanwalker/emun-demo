import { MenuItem, Stack } from '@mui/material';
import { useState } from 'react';
import { checkDisplayValue } from '../../../functions/checkDisplayValue';
import { useAppDispatch, useAppSelector } from '../../../hooks/ReduxHooks';
import {
  getCheckSelected,
  getPayPeriodSelected,
  getRepSelected,
  getSearchText,
  getVendorSelected,
  setCheckSelected,
  setPayPeriodSelected,
  setRepSelected,
  setSearchText,
  setVendorSelected,
} from '../../../store/slices/commissionDraftSlice';
import { getVendors, getPayPeriods, getChecks, getDraftInvoices } from '../../../store/slices/dataSlice';
import { CustomInput } from '../../shared/CustomInput';
import { IInvoice } from '../../../data/interfaces/IInvoice';
import { formatCurrency } from '../../../functions/formatCurrency';

export function getRepOptions(rows: IInvoice[]) {
  return [...new Set(rows.map((invoice) => invoice.rep).filter(Boolean))];
}

export function CommissionDraftTaskBar(props: ICommissionDraftTaskBarProps) {
  const dispatch = useAppDispatch();

  const vendorSelected = useAppSelector(getVendorSelected);
  const vendors = useAppSelector(getVendors);
  const vendorOptions = vendors.map((vendor) => vendor.VendorName);

  const payPeriods = useAppSelector(getPayPeriods);
  const payPeriodOptions = payPeriods.map((period) => period.payPeriod);
  const payPeriodSelected = useAppSelector(getPayPeriodSelected);

  const draftInvoices = useAppSelector(getDraftInvoices);
  const checks = useAppSelector(getChecks);
  const checkSelected = useAppSelector(getCheckSelected);
  const checkBalances = checks
    .filter(
      (check) =>
        check.payPeriod === payPeriodSelected?.payPeriod &&
        check.vendor === vendorSelected?.VendorName &&
        check.status !== 'Closed'
    )
    .map((check) => {
      const invoiceSum = draftInvoices.reduce((sum, invoice) => {
        const amount =
          invoice.payPeriod === check.payPeriod &&
          invoice.checkAmount === check.checkAmount &&
          invoice.checkNumber === check.number
            ? invoice.commissionAmount
            : 0;
        return sum + amount;
      }, 0);
      return {
        checkNumber: check.number,
        checkAmount: check.checkAmount,
        checkBalance: check.checkAmount - invoiceSum,
      };
    });
  const unbalancedChecks = checkBalances.filter((check) => check.checkBalance !== 0);

  const repSelected = useAppSelector(getRepSelected);
  const repOptions = getRepOptions(props.rows);

  const searchText = useAppSelector(getSearchText);

  return (
    <Stack px={1} pb={1} gap={0} position='sticky' top={0} zIndex={2}>
      <Stack direction='row' width={1} gap={2}>
        <CustomInput
          size='small'
          select
          value={payPeriodSelected?.payPeriod}
          label='Select Pay Period'
          options={payPeriodOptions}
          onChange={(event) =>
            dispatch(
              setPayPeriodSelected(payPeriods.find((entry) => entry.payPeriod === (event.target.value as string)))
            )
          }
        />
        <CustomInput
          size='small'
          select
          value={vendorSelected?.VendorName}
          label='Select Vendor'
          options={vendorOptions}
          onChange={(event) =>
            dispatch(setVendorSelected(vendors.find((entry) => entry.VendorName === (event.target.value as string))))
          }
        />
        <CustomInput
          size='small'
          error={unbalancedChecks.length > 0}
          helperText='You have unbalanced checks!'
          select
          value={checkDisplayValue(checkSelected || undefined)}
          label='Select Check'
          renderedOptions={checkBalances.map((check, index) => {
            const value = `${check.checkNumber} - $${formatCurrency(Number(check.checkAmount))}`;
            return (
              <MenuItem key={index} value={value} sx={check.checkBalance !== 0 ? { color: 'error.main' } : {}}>
                {value}
              </MenuItem>
            );
          })}
          onChange={(event) =>
            dispatch(
              setCheckSelected(checks.find((entry) => checkDisplayValue(entry) === (event.target.value as string)))
            )
          }
        />
        <CustomInput
          size='small'
          select
          value={repSelected}
          label='Select Rep'
          options={repOptions}
          onChange={(event) => dispatch(setRepSelected(event.target.value as string))}
        />
      </Stack>
      <CustomInput
        type='search'
        size='small'
        value={searchText}
        onChange={(e) => dispatch(setSearchText(e.target.value))}
      />
    </Stack>
  );
}

interface ICommissionDraftTaskBarProps {
  rows: IInvoice[];
}
