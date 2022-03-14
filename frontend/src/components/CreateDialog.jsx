import React, {useState} from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Alert, AlertTitle, CircularProgress, Grid, Input, InputLabel, Typography } from '@mui/material';
import httpClient from '../httpClient';
import { useMutation, useQueryClient } from 'react-query';
import { Box } from '@mui/system';

const CreateDialog = ({open, handleClose}) => {

    return (
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Photo Item</DialogTitle>
        <CostumeDialogContent open={open} handleClose={handleClose} />
    </Dialog>
  )
}

const CostumeDialogContent = ({open, handleClose}) => {
    const [image, setImage] = useState('')
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')

    const queryClient = useQueryClient();

    const mutation = useMutation(formData => {
        return httpClient.post('photos/upload', formData);
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('photo_items');
        },
    });
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (image && title) {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('title', title);
            formData.append('description', desc);

            mutation.mutate(formData);
        } 
    }

    const {data, status} = mutation;
    
    if ( status == 'idle' ) {
        return (<form onSubmit={handleSubmit}>
            <DialogContent>
                <Box display={'flex'} flexDirection={'row'} justifyContent="space-between" alignItems={'center'}>
                    <Typography variant='p' >{image ? `${image.name.substring(0, 30)}${image.name.length > 30 ? '...' : '' }` : "Choose a file to upload : "}</Typography>
                    <InputLabel style={{textAlign:'left'}} htmlFor='photo-file' >
                        <Button color="primary" variant="contained" component="span">Browse</Button>
                        <Input
                            accept="image/*"
                            required
                            style={{display:'none'}}
                            id='photo-file'
                            name='photo-file'
                            type='file'
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </InputLabel>
                </Box>
                <TextField
                    required
                    margin="dense"
                    label={"Title"}
                    type="text"
                    variant="outlined"
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Description"
                    type="text"
                    fullWidth
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    variant="outlined"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type='submit'>Create</Button>
            </DialogActions>
        </form>)
    }

    if ( status == 'loading' ) {
        return (<Grid xs={12} sm={12} md={12} item >
            <Box marginX={'auto'} sx={{ display: 'flex', justifyContent:'center', alignItems:'center', height:"17rem" }}>
                <CircularProgress />
            </Box>
        </Grid>)
    }

    if ( status == 'error' ) {
        return (<Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {data}
        </Alert>)
    }

    if ( status == 'success' ) {
        return (<Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            File Uploaded Successfully
        </Alert>)
    }
}

export default CreateDialog