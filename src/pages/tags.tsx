import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import React, {useState} from 'react';

import ConfigApi    from '../config.json';
import MyAutocomplete from '../components/Autocomplete';
import Link         from '../components/Link';
import ProTip       from '../components/ProTip';
import Copyright    from '../components/Copyright';
import {fetcher}    from '../utils/helpers';
import Item from '../types/Item';

const Tags: NextPage = ({data}) => {
  let [selectedItem, setSelectedItem] = useState<Item>(null);
  const handleSelectedItem = (event: React.SyntheticEvent, value: Item | Array<Item>, reason: string, details?: string)=>{
    console.log(reason);
    setSelectedItem(value);
  };
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Test page for different components to be used in next-sis-apps
        </Typography>
        <MyAutocomplete items={data} handleSelectedItem={setSelectedItem}></MyAutocomplete>
        {selectedItem?
          (<Container>
            <Box 
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            >
            <div>
            <TextField
            id="itemcode-read-only"
            label="Code SAP"
            defaultValue={selectedItem.itemcode}
            InputProps={{
              readOnly: true,
            }}           
            />
            <TextField
            id="onhand-read-only"
            label="Stock SAP"
            defaultValue={selectedItem.onhand}
            InputProps={{
              readOnly: true,
            }}           
            />
            </div>
          </Box>
          </Container>)
          :null}
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
};

export async function getStaticProps(context) {
    const url = `${ConfigApi.API_URL}/items`;
    const data = await fetcher(url);
    //const fields=["itemcode", "itemname", "onhand", "vente", "rate", "codebars", "pcb_achat", "pcb_vente"];
    const fields=["itemcode", "itemname", "onhand", "sellitem"];
    const output_data = data.map(i=>fields.reduce((acc, f)=>Object.assign(acc, {[f]:i[f]}), {}));
    return {
      props: {data:output_data.filter(_=>_.sellitem !='N')}, // will be passed to the page component as props
      revalidate: 600,
    }
  }
export default Tags;