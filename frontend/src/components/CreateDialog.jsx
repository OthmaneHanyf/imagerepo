import React, {useState} from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Alert, AlertTitle, Input, InputLabel, Typography } from '@mui/material';
import httpClient from '../httpClient';

const CreateDialog = ({open, handleClose}) => {
  
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [image, setImage] = useState('')
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
  
    const handleSubmit = async () => {
      if (image) {
          setSuccess(false);
          setError(false);
          setLoading(true);
  
          const formData = new FormData();
          formData.append('image', image);
  
          try {
              await httpClient.post('photos/upload', formData);
              setSuccess(true);
          } catch (error) {
              setError(error);
          }
          setLoading(false);
      } else {
        alert('Oops!, you forgot to select an image.');
      }
    }

    return (
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Photo Item</DialogTitle>
        
        {loading ? (<Alert severity="info">
                    <AlertTitle>Info</AlertTitle>
                    Loading...
                </Alert>)
            : error ? (<Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {error.message}
                </Alert>) 
            : success ? (<Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    File Uploaded Successfully
                </Alert>)
            : <form onSubmit={handleSubmit}>
                <DialogContent>
                    <InputLabel style={{textAlign:'left'}} htmlFor='photo-file' >
                        <Typography variant='p' >{image ? `${image.name.substring(0, 30)}${image.name.length > 30 ? '...' : '' }` : "Choose a file to upload : "}</Typography>
                        <Button color="primary" variant="contained" component="span">Browse</Button>
                        <Input
                            required
                            style={{display:'none'}}
                            id='photo-file'
                            name='photo-file'
                            type='file'
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </InputLabel>
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.value)}
                        variant="outlined"
                    />
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        id="desc"
                        label="Description"
                        type="text"
                        fullWidth
                        value={desc}
                        onChange={(e) => setDesc(e.value)}
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type='submit'>Create</Button>
                </DialogActions>
            </form>}
    </Dialog>
  )
}

export default CreateDialog