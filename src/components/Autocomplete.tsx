import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import Item from '../types/Item';

type AutocompleteProps = {
    items: Item;
};

const MyAutocomplete: React.FC<AutocompleteProps> = (props) => {
  const {items, handleSelectedItem} = props;
  const [options, setOptions] = useState<readonly Item[]>(items);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleOpen = () => {
    handleSelectedItem(null);
    if (inputValue.length > 0) {
      setOpen(true);
    }
  };
  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
    if (newInputValue.length > 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };
  const onChange = (event: React.SyntheticEvent, value: Item | Array<Item>, reason: string, details?: string)=>{
     handleSelectedItem(value);
  };

  const loading = open && options.length === 0;

  return (
    <Autocomplete
      id="asynchronous-demo"
      sx={{ width: '100%' }}
      open={open}
      onOpen={handleOpen}
      onClose={() => {
        setOpen(false);
      }}
      onChange={onChange}
      isOptionEqualToValue={(option, value) => option.itemname === value.itemname}
      getOptionLabel={(option) => option.itemname}
      options={options}
      loading={loading}
      inputValue={inputValue}
      onChange={onChange}
      onInputChange={handleInputChange}
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