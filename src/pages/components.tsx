import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';

import React, {useState} from 'react';

import ConfigApi    from '../config.json';

import Link         from '../components/Link';
import ProTip       from '../components/ProTip';
import Copyright    from '../components/Copyright';
import {fetcher}    from '../utils/helpers';
import Item from '../types/Item';
import * as R from 'ramda';

function displayCard(total_factures, total_clients){
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          CA HT des factures du jour
        </Typography>
        <Typography variant="h5" component="div">
          {total_factures.toFixed(2)}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Nombre de clients
        </Typography>
        <Typography variant="body2">
          {total_clients}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
function BasicTable(headers, data) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow key="1axi2">
            {headers.map((header) => (
              <TableCell key={header}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={`${row.cardcode}-${row.time}-${row.linetotal}`}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.cardcode}
              </TableCell>
              <TableCell>{row.cardname}</TableCell>
              <TableCell>{row.time}</TableCell>
              <TableCell>{row.linetotal.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function build_affluence_table(headers, data) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
        <TableHead>
          <TableRow key="1abi2">
            {headers.map((header) => (
              <TableCell align={header!="plages"?"right":"left"} key={header}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={`${row.plage}-${row.count}-${row.revenue}`}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
            >
              <TableCell component="th" scope="row">{row.plage}</TableCell>
              <TableCell align="right">{row.count}</TableCell>
              <TableCell align="right">{row.revenue.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const acc_extracted_fields= (map_x, label_y)=>{
  let init_val = {count:0, revenue:0};
  let [plage, revenue] = label_y;
  if (!map_x.has(plage)) map_x.set(plage, init_val);
  let current = map_x.get(plage);
  return map_x.set(plage,{count:current["count"]+1, revenue:current["revenue"]+revenue});
};
const to_array = _=>Array.from(_);
const to_values = _=>_.values();
const sort_keys = (input_map)=>{
  let functions = [
    R.reduce((acc, label)=>acc.set(label, input_map.get(label)), new Map()),
    R.sort(R.comparator(R.lt)),
    to_array]
  return R.compose(...functions)(input_map.keys())
};
const extract_time = (date) => date.toISOString().split("T")[1].slice(0,5);
const get_plage_indexOf_now = (plages)=>{
  let now = extract_time(new Date());
  return plages.map(R.slice(0,5)).findIndex(R.lt(now))-1;
};
const get_total_for_field = field => data => {
  return R.reduce(R.add,0)(R.compose(R.map(R.prop(field)),to_array, to_values)(data))
};
const MyComponents: NextPage = ({data}) => {
  let headers = ["code", "client", "heure", "Facture HT"];
  let total_factures = data.reduce((total, invoice)=>total+invoice.linetotal, 0);
  let total_clients = data.filter((invoice)=>invoice.linetotal>0).length;
  let extracted_f = ["plage", "linetotal"]
  let counts = R.compose(sort_keys, R.reduce(acc_extracted_fields, new Map()), R.map(R.props(extracted_f)))(data);
  const aff_headers = ["plages", "affluence", "CA HT"];
  const affluence_data = to_array(counts.entries()).map(entry=>{
    let [plage, values] = entry;
    return {plage: plage, ...values};
  });
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
          Test page for leaderboard {new Date().toLocaleTimeString("fr-FR").slice(0,5)}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Box sx={{
                  mb: '6pt'
                }}>
              {displayCard(total_factures, total_clients)}
            </Box>
          </Grid>
          <Grid item xs={8}>
            {build_affluence_table(aff_headers, affluence_data)}
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Box>
            {BasicTable(headers, data)}
          </Box>
        </Grid>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );

};
export async function getServerSideProps(context) {
  const options = {
    method: 'POST',
}
  const url = `${ConfigApi.API_URL}/leaderboards/customers`;
  const output_data = await fetcher(url);
  return {
    props: {data:output_data // will be passed to the page component as props
    }
  }
}

export default MyComponents;