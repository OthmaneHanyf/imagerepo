import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import React, {useState, useEffect} from 'react'
import httpClient from '../httpClient';

const Home = () => {

    const [images, setImages] = useState('')
  
    useEffect(() => {
      const fetchFiles = async () => {
        try {
            const {data} = await httpClient.get('photos');
            setImages(data);
            console.log(data);
        } catch (error) {
          console.log(error);
        }
      }
      
      fetchFiles();
    }, [])
    
  
    return (
      
        <div >
          <Grid container marginX={'auto'} spacing={4} >
          {
            images ? images.map(i => <Grid xs={12} sm={6} md={4} item key={i.id}>
              <Card sx={{ maxWidth: 345 }} >
                <CardMedia
                  component="img"
                  height={"160"}
                  image={i.image}
                  alt={`Photo ${i+1}`}
                />
                <CardContent >
                  <Typography gutterBottom variant='h5' component={'div'} >
                    Photo Title
                  </Typography>
                  <Typography variant="body2" color="text.secondary" >
                    This is the description about the Photo
                  </Typography>
                  <CardActions >
                    <Button size="small" color="primary" >View</Button>
                    <Button size="small" color="primary" >Edit</Button>  
                  </CardActions>                  
                </CardContent>
              </Card>
            </Grid> ) : ''
          }
          </Grid>
        </div>
      )
}

export default Home