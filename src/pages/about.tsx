import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import JsBarcode from 'jsbarcode';
import React, {useEffect, useState} from 'react';
import useSWR from 'swr';

import Link         from '../components/Link';
import ProTip       from '../components/ProTip';
import Copyright    from '../components/Copyright';
import RackTag      from '../components/TagRack';
import {fetcher}    from '../utils/helpers';
import PageStyle    from '../../styles/PageStyle';
import CustomFooter from '../components/DataGridDemo';


const pageStyle = PageStyle.css.pageStyle;

const About: NextPage = () => {
  const [tags, setTags] = useState([]);
  useEffect(()=>{
    fetcher('/api/items').then(setTags)
  },[]);
  useEffect(()=>{
    if (tags.length > 0) {
      JsBarcode(".svgbarcode").init();
    }
  }, [tags]);
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          marginTop:"0px",
          marginBottom:"0px",
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box sx={{displayPrint:'none'}}>
            <Typography variant="h4" component="h1" gutterBottom>
              Test Etiquettes and stuff
            </Typography>
        </Box>
        <Box maxWidth="sm" sx={{displayPrint:'none'}}>
          <Button variant="contained" component={Link} noLinkStyle href="/">
            Go to the home page
          </Button>
        </Box>
        <CustomFooter/>
        {tags.length>0?
          (
            <Box sx={pageStyle}>
              <RackTag tag={tags[0]}/>
            </Box>
          )
        :null}

        <Box sx={{displayPrint:'none'}}>
          <ProTip />
          <Copyright />
        </Box>
      </Box>
    </Container>
  );
};

export default About;
