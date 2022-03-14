import React from 'react'
import { CssBaseline, AppBar, Container, Toolbar, Typography, Fab } from '@mui/material'
import {PhotoCamera, Add} from '@mui/icons-material';
import CreateDialog from './CreateDialog';

const Layout = ({children}) => {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
        <CssBaseline />
        <AppBar position='relative' >
          <Toolbar >
            <img src='/Photo.png' width={80} alt='' />
            {/* <PhotoCamera /> */}
            {/* <Typography marginX={2.0} variant='h6'>Photo Album</Typography> */}
          </Toolbar>
        </AppBar>
        <main>
          <Container style={{margin:'2em auto'}} maxWidth={'md'} >
            {children}
          </Container>
          <Container style={{textAlign:'right'}} >
            <Fab sx={{
                  position: "fixed",
                  bottom: (theme) => theme.spacing(6),
                  right: (theme) => theme.spacing(10)
                }} color="primary" size='medium' aria-label="add" onClick={handleClickOpen}>
              <Add />
            </Fab>
          </Container>
        </main>
        <CreateDialog open={open} handleClose={handleClose} />
    </>
  )
}

export default Layout