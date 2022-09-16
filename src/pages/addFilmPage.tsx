import React from 'react';
import {
  Autocomplete, Box, Button, Chip, Container, TextField, Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddFilmPage = () => {
  const navigate = useNavigate();

  return (
        <Container maxWidth="sm">
            <Typography variant="h3" margin="normal" component="h2">
                Add film
            </Typography>
            <Box
                component="form"
                noValidate
                autoComplete="off"
            >
                <TextField fullWidth margin="normal" label="Title" variant="outlined"/>
                <TextField fullWidth margin="normal" label="Year" type="number" variant="outlined"/>
                <TextField fullWidth margin="normal" label="Format" variant="outlined"/>
                <Autocomplete
                    multiple
                    id="tags-filled"
                    freeSolo
                    options={[]}
                    renderTags={(value: readonly string[], getTagProps) => value.map((option: string, index: number) => (
                        <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                    ))
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            margin="normal"
                            label="Actors"
                            placeholder="Enter to add"
                        />
                    )}
                />

                <Button variant="contained" >Add</Button>
                <Button onClick={() => {
                  navigate('/import');
                }}>Import File</Button>
            </Box>
        </Container>
  );
};

export default AddFilmPage;
