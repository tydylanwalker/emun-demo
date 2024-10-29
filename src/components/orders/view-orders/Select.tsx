import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { vendorsMock as vendorsMock } from "../../../data/vendors";

export const BasicSelect = (props: SelectProps) => {
  const [,setVendor] = React.useState(props.vendor);

  const handleChange = (event: SelectChangeEvent) => {
    props.vendorSelected(event.target.value as string);
    setVendor(event.target.value as string);
  };

  return (
    <Box sx={{ maxWidth: 240, color: "white" }}>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-filled-label">Vendor</InputLabel>
        <Select
          sx={{
            backgroundColor: "lightblue", // Change to your desired color
            "& .MuiSelect-select": {
              backgroundColor: "lightblue", // Change the background for the select area
            },
            "&:focus": {
              backgroundColor: "lightblue", // Keep the same background on focus
            },
          }}
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={props.vendor}
          label="Vendor"
          onChange={handleChange}
        >
            <MenuItem value={"All"}>All</MenuItem>
          {vendorsMock.map((vendor, rowIndex) => (
            <MenuItem key={rowIndex} value={vendor.id}>{vendor.vendorName}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

interface SelectProps {
  vendor: string;
  vendorSelected: (vendor: string) => void;
}
