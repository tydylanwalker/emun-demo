/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Typography, Stack } from '@mui/material';
import { useState, ChangeEvent } from 'react';
import * as XLSX from 'xlsx';
import { parse } from 'csv-parse/browser/esm/sync';
import { CustomInput } from '../../shared/CustomInput';
import { IHeaderMeta } from './UploadCommissions';
import { Check, Close } from '@mui/icons-material';
import { CustomModal } from '../../shared/CustomModal';

interface IEmunHeaders {
  label: string;
  value: string;
  required: boolean;
}

function setInitialHeaderValues(headers: IHeaderMeta[]): IEmunHeaders[] {
  const initialHeaders: IEmunHeaders[] = [];
  headers.forEach((header) => {
    if (header.hide) return;
    initialHeaders.push({
      label: header.label,
      value: '',
      required: !!header.required,
    });
  });
  return initialHeaders;
}

export function UploadFileModal(props: IUploadFileModalProps) {
  const [step, setStep] = useState(1);
  const [fileHeaders, setFileHeaders] = useState<string[]>([]);
  const [emunHeaders, setEmunHeaders] = useState<IEmunHeaders[]>(setInitialHeaderValues(props.emunHeaders));
  const headersBeingUsed = emunHeaders.filter((header) => header.value !== '').map((header) => header.value);
  const [fileData, setFileData] = useState<string[][]>();
  const [mappedHeaderIndices, setMappedHeaderIndices] = useState<{
    [key: string]: number | null;
  }>({});
  const buttonDisabled = emunHeaders.some((header) => header.required && header.value === '');

  const handleUploadFileClicked = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = e.target.files ? e.target.files[0] : null;

    if (file) {
      if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        const reader = new FileReader();

        reader.onload = (event: ProgressEvent<FileReader>) => {
          const result = event.target?.result;
          if (result && typeof result !== 'string') {
            const data = new Uint8Array(result);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const fileData = XLSX.utils.sheet_to_json<string[]>(worksheet, {
              header: 1,
            });
            setFileHeaders(fileData[0] as string[]);
            setFileData(fileData.slice(1, fileData.length));
          }
        };

        reader.onerror = (error) => {
          console.error('Error reading file:', error);
        };

        reader.readAsArrayBuffer(file);
      } else if (file.name.endsWith('.csv')) {
        const text = await file.text();
        try {
          const records = parse(text, {
            skip_empty_lines: true,
          });
          setFileHeaders(records[0]);
          setFileData(records.slice(1, records.length));
        } catch (error) {
          console.error('Error parsing CSV file:', error);
        }
      } else {
        alert('Please upload a valid file.');
      }
    }
    setStep(step + 1);
  };

  const handleHeaderChange = (event: any) => {
    const { name, value } = event.target;
    const selectedIndex = fileHeaders.indexOf(value);

    const updatedHeaders: IEmunHeaders[] = emunHeaders.map((header) => {
      if (header.label === name) {
        return {
          label: header.label,
          value,
          required: header.required,
        };
      } else {
        return header;
      }
    });
    setEmunHeaders(updatedHeaders);
    setMappedHeaderIndices((prevSelected) => ({
      ...prevSelected,
      [name]: selectedIndex !== -1 ? selectedIndex : null,
    }));
  };

  // Function to map the data rows based on selected indices
  const mapFileDataToHeaders = () => {
    const mappedFileData = fileData?.map((row) => {
      const mappedRow: { [key: string]: any } = {};
      Object.keys(mappedHeaderIndices).forEach((customHeader) => {
        const index = mappedHeaderIndices[customHeader];
        mappedRow[customHeader] = index !== null ? row[index] : '';
      });
      return mappedRow;
    });
    props.setMappedFileData(mappedFileData);
    props.onClose();
  };

  return (
    <CustomModal open={props.open} closeModal={props.onClose} header='Upload Invoices File'>
      {step === 1 && (
        <Stack gap={3} pt={3}>
          <Button variant='contained' component='label'>
            Choose File
            <input type='file' accept='.xlsx, .xls, .csv' onChange={(e) => handleUploadFileClicked(e)} hidden />
          </Button>
          <Stack gap={1}>
            <Stack direction='row' alignItems='center'>
              <Typography>Download a template with all the correct headers</Typography>
              <Button
                variant='text'
                sx={{ textDecoration: 'underline', fontSize: '0.875rem', p: 0 }}
                onClick={() => alert('downloading template....')}
              >
                here
              </Button>
            </Stack>
            <Typography fontWeight='bold'>File Requirements</Typography>
            <Stack pl={2}>
              <Typography>
                1. File must be a .xls, .xlsx, or .csv<br></br>2.File must require values for these columns:
              </Typography>
              <Typography pl={2}>
                - PO Number<br></br>- Invoice Number<br></br>- Invoice Amount<br></br>- Customer ID
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      )}
      {step == 2 &&
        (fileHeaders.length > 0 ? (
          <Stack pt={3}>
            <Typography variant='h5'>{"Match up the column headers in our database to your file's headers"}</Typography>
            <Stack my={5} borderRadius={5} border={1} overflow='hidden'>
              <Stack direction='row' width='60vw' p={1} bgcolor='secondary.dark' borderBottom={1}>
                <Stack width='40%' direction='row' alignItems='center' gap={2}>
                  <Typography fontWeight='bold'>Database Headers</Typography>
                  <Typography variant='caption'>{'(* required header)'}</Typography>
                </Stack>
                <Stack width='40%'>
                  <Typography fontWeight='bold'>File Headers to Match</Typography>
                </Stack>
                <Stack flexGrow={1} textAlign='center'>
                  <Typography fontWeight='bold'>Matched</Typography>
                </Stack>
              </Stack>
              {emunHeaders.map((header, index) => (
                <Stack
                  direction='row'
                  width='60vw'
                  p={1}
                  key={index}
                  alignItems={'center'}
                  bgcolor={index % 2 === 0 ? 'action.hover' : 'inherit'}
                >
                  <Stack width='40%'>
                    <Typography>
                      {header.label}
                      {header.required && ' *'}
                    </Typography>
                  </Stack>
                  <Stack width='40%'>
                    <CustomInput
                      select
                      name={header.label}
                      value={header.value}
                      required={header.required}
                      size='small'
                      options={fileHeaders.filter(
                        (option) => !headersBeingUsed.some((used) => option === used && option !== header.value)
                      )}
                      onChange={handleHeaderChange}
                      sx={{ marginTop: 0 }}
                    />
                  </Stack>
                  <Stack width='20%' textAlign='center'>
                    <Typography>{!header.value ? <Close color='error' /> : <Check color='success' />}</Typography>
                  </Stack>
                </Stack>
              ))}
            </Stack>
            <Button
              variant='contained'
              color='success'
              size='large'
              disabled={buttonDisabled}
              sx={{ mt: 1 }}
              onClick={mapFileDataToHeaders}
            >
              Process
            </Button>
          </Stack>
        ) : (
          <Stack>
            <Typography>File imported successfully but no data was found</Typography>
            <Button variant='contained' color='warning' onClick={() => setStep(step - 1)}>
              Go back to file upload
            </Button>
          </Stack>
        ))}
    </CustomModal>
  );
}

interface IUploadFileModalProps {
  open: boolean;
  onClose: () => void;
  setMappedFileData: (data: { [key: string]: any }[] | undefined) => void;
  emunHeaders: IHeaderMeta[];
}
