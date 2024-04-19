import React from 'react';
import { Container, Typography } from '@material-ui/core';
import CitySelector from './components/CitySelector';

const App: React.FC = () => {
    return (
        <Container maxWidth="md" style={{ marginTop: '50px' }}>
            <Typography variant="h3" gutterBottom>
                Encuentra Ciudades Cercanas
            </Typography>
            <CitySelector />
        </Container>
    );
};

export default App;
