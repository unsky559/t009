import React from 'react';
import {
    Button, ButtonGroup, Container, Stack, Typography,
} from '@mui/material';

const ImportFilmsPage = () => (
        <Container maxWidth="sm">
            <Typography margin="normal" variant="h3" component="h2">
                Import file
            </Typography>
            <Stack>
                <ButtonGroup
                    disableElevation
                    variant="contained"
                    aria-label="Disabled elevation buttons"
                >
                    <Button>Select file</Button>
                    <Button disabled>filename</Button>
                </ButtonGroup>
                <Button variant="contained" disabled>Upload</Button>
            </Stack>

        </Container>
);

export default ImportFilmsPage;
