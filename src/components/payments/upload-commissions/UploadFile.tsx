import { Modal, Button, Typography, Stack } from "@mui/material";
import _ from "lodash";
import { ChangeEvent } from "react";
import readExcelFile from "read-excel-file";

const modalStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '30rem',
    maxWidth: "55rem",
    bgcolor: 'background.paper',
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
};

export function UploadFile(props: IUploadFileProps) {
    const handleUploadFileClicked = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;

        e.preventDefault();

        if (file) {
            if (file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
                try {
                    const fileData = await readExcelFile(file);

                    const cleanedRows = fileData.map((row) => {
                        return _.mapValues(row, (v) => (v === null ? "" : v));
                    });

                    console.log(cleanedRows);
                } catch (error) {
                    console.error("Error reading Excel file:", error);
                    alert("There was an error reading the file. Please ensure it is a valid Excel file.");
                }
            } else {
                alert("Please upload a valid Excel file (.xlsx or .xls).");
            }
        }
    };

    return (
        <Modal
            open={props.open}
            onClose={props.onClose}
        >
            <Stack sx={modalStyles}>
                <Typography>Stuff about formatting and template download</Typography>
                <Button variant="contained" component="label">
                    Choose File
                    <input type="file" accept=".xlsx, .xls" onChange={(e) => handleUploadFileClicked(e)} hidden />
                </Button>
            </Stack>
        </Modal>
    );
}

interface IUploadFileProps {
    open: boolean,
    onClose: () => void;
}
