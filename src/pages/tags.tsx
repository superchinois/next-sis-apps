import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import ConfigApi    from '../config.json';
import MyAutocomplete from '../components/Autocomplete';
import Link         from '../components/Link';
import ProTip       from '../components/ProTip';
import Copyright    from '../components/Copyright';
import {fetcher}    from '../utils/helpers';

const Tags: NextPage = ({data}) => {
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
        <MyAutocomplete items={data}></MyAutocomplete>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
};

export async function getServerSideProps(context) {
    const url = `${ConfigApi.API_URL}/items`;
    const data = await fetcher(url)
    return {
      props: {data:data.filter(_=>_.sellitem !=='N')}, // will be passed to the page component as props
    }
  }
export default Tags;