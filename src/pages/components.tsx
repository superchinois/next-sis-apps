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

import React, {useState} from 'react';

import ConfigApi    from '../config.json';

import Link         from '../components/Link';
import ProTip       from '../components/ProTip';
import Copyright    from '../components/Copyright';
import {fetcher, customers_data}    from '../utils/helpers';
import Item from '../types/Item';

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

const MyComponents: NextPage = ({data}) => {
  let headers = ["code", "client", "heure", "Facture HT"];
  let total_factures = data.reduce((total, invoice)=>total+invoice.linetotal, 0);
  let total_clients = data.filter((invoice)=>invoice.linetotal>0).length;
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
          Test page for leaderboard
        </Typography>
        <Box sx={{
          mb: '6pt'
        }}>
        {displayCard(total_factures, total_clients)}
        </Box>
        <Divider/>
        <Box>
          {BasicTable(headers, data)}
        </Box>
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
  const update_url = `${ConfigApi.API_URL}/cache/update`;
  const url = `${ConfigApi.API_URL}/leaderboards/customers`;
  let response = await fetch(update_url, options);
  const data = customers_data;//await fetcher(url);
  const output_data = await fetcher(url);
  return {
    props: {data:output_data // will be passed to the page component as props
    }
  }
}

export default MyComponents;