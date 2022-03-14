import React from 'react'
import httpClient from '../httpClient';
import { useMutation, useQuery, useQueryClient } from 'react-query'; 
import { Alert, AlertTitle, Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Grid, Snackbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
const HomeContent = () => {

    const fetchFiles = async () => {
      const {data} = await httpClient.get('photos');
      return data;
    }

    const [open, setOpen] = React.useState(true);
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

    const {data, status} = useQuery('photo_items', fetchFiles);

    const queryClient = useQueryClient();

    const mutation = useMutation(id => {
      return httpClient.delete(`photos/delete/${id}`);
    }, {
      onSuccess: () => {
        queryClient.invalidateQueries('photo_items');
      },
    });
    
    
    if ( status === 'loading' ) {
      return ([...Array(6).keys()].map(i => <Grid xs={12} sm={6} md={4} item key={i.id}>
            <Box marginX={'auto'} sx={{ display: 'flex', justifyContent:'center', alignItems:'center', height:"17rem" }}>
                <CircularProgress />
            </Box>
        </Grid>))
    } 
    else if ( status === 'error' ) {
      return (<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            This service is not available for now!, please comeback later.
            </Alert>
        </Snackbar>)
    } 
    else if ( status === 'success' ) {
      return (data.map(i => <Grid xs={12} sm={6} md={4} item key={i.id}>
        <Card sx={{ maxWidth: 345 }} >
          <CardMedia
            component="img"
            height={"160"}
            image={i.image}
            alt={`Photo ${i+1}`}
          />
          <CardContent >
            <Typography gutterBottom variant='h5' component={'div'} >
              {i.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" >
              {i.description}
            </Typography>
            <CardActions >
              <Button size="small" color="primary" >View</Button>
              <Button size="small" color="success" >Edit</Button>  
              { mutation.isLoading && mutation.variables === i.id ? (<CircularProgress style={{margin:'auto'}} size={20} />) 
                  : <Button size="small" disabled={mutation.isLoading} onClick={() => mutation.mutate(i.id)} color="error" >Delete</Button>}
            </CardActions>               
          </CardContent>
        </Card>
      </Grid> ))
    }
}

export default HomeContent;