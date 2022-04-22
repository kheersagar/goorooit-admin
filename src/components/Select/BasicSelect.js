import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect(props) {
  const [dropdownValue, setDropdownValue] = React.useState('');

  const handleChange = (event) => {
    setDropdownValue(event.target.value);
  };
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={dropdownValue}
          label={props.label}
          onChange={(e)=>{
            handleChange(e);
            props.handleChange(e.target.value)
          }}
        >
          {
            props.values.map((item,index)=>{
              return(
          <MenuItem value={item} >{item}</MenuItem>

              )
            })
          }
        </Select>
      </FormControl>
    </Box>
  );
}
