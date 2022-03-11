import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

interface Items {
  itemcode: string;
  itemname: string;
  onhand: string;
}

type AutocompleteProps = {
    items: Items;
};

const MyAutocomplete: React.FC<AutocompleteProps> = (props) => {
  const {items} = props;
  const [options, setOptions] = useState<readonly Items[]>(items);
  const [open, setOpen] = useState(false);
  const loading = open && options.length === 0;

  return (
    <Autocomplete
      id="asynchronous-demo"
      sx={{ width: 600 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.itemname === value.itemname}
      getOptionLabel={(option) => option.itemname}
      options={options}
      loading={loading}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.itemcode}>{option.itemname} - {option.onhand}</li>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Enter a item name"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
export default MyAutocomplete;