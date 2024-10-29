/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, Button, Typography, Stack } from '@mui/material';
import { useState, ChangeEvent } from 'react';
import * as XLSX from 'xlsx';
import { parse } from 'csv-parse/browser/esm/sync';
import { CustomInput } from '../../shared/CustomInput';
import { IHeaderMeta } from './UploadCommissions';

const modalStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '30rem',
  bgcolor: 'background.paper',
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
};

interface IEmunHeaders {
  label: string;
  value: string;
  required: boolean;
}

function setInitialHeaderValues(headers: IHeaderMeta[]): IEmunHeaders[] {
  return headers.map((header) => {
    return {
      label: header.label,
      value: '',
      required: !!header.required,
    };
  });
}

export function UploadFileModal(props: IUploadFileModalProps) {
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
    <Modal open={props.open} onClose={props.onClose}>
      <Stack sx={modalStyles} spacing={2}>
        <Typography variant='h6'>Upload and Map Headers</Typography>
        {fileHeaders.length > 0 ? (
          <Stack>
            <Typography variant='caption' color='info'>
              {'Match the headers from your file to the headers we need (* indicates required field)'}
            </Typography>
            {emunHeaders.map((header, index) => (
              <CustomInput
                key={index}
                select
                label={header.label}
                name={header.label}
                value={header.value}
                required={header.required}
                options={fileHeaders.filter(
                  (option) => !headersBeingUsed.some((used) => option === used && option !== header.value)
                )}
                onChange={handleHeaderChange}
              />
            ))}
            <Button
              variant='contained'
              color='success'
              disabled={buttonDisabled}
              sx={{ mt: 3 }}
              onClick={mapFileDataToHeaders}
            >
              Process
            </Button>
          </Stack>
        ) : (
          <Button variant='contained' component='label'>
            Choose File
            <input type='file' accept='.xlsx, .xls, .csv' onChange={(e) => handleUploadFileClicked(e)} hidden />
          </Button>
        )}
      </Stack>
    </Modal>
  );
}

interface IUploadFileModalProps {
  open: boolean;
  onClose: () => void;
  setMappedFileData: (data: { [key: string]: any }[] | undefined) => void;
  emunHeaders: IHeaderMeta[];
}