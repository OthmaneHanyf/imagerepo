import React from 'react'
import { Grid } from '@mui/material';
import HomeContent from '../components/HomeContent';

const Home = () => {
    return (
      <Grid justifyContent={'center'} alignItems={'center'} paddingX={1} container marginX={'auto'} rowSpacing={4} columnSpacing={2} >
        <HomeContent />
      </Grid>
    )
}

export default Home