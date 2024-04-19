import React, { useState } from 'react';
import { FormControl, TextField, List, ListItem, ListItemText } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import City from '../types/City';
import cityService from '../services/cityService';

const CitySelector: React.FC = () => {
    const [selectedCity, setSelectedCity] = useState<City | null>(null);
    const [closestCities, setClosestCities] = useState<City[]>([]);

    const handleCityChange = (
        event: React.ChangeEvent<{}>,
        value: City | null,
        reason: string,
        details?: any
    ) => {
        if (value) {
            setSelectedCity(value);
            const foundClosestCities = cityService.findClosestCities(value.name);
            if (foundClosestCities) {
                setClosestCities(foundClosestCities);
            } else {
                setClosestCities([]);
            }
        }
    };

    const cities = cityService.getAllCities();

    return (
        <div>
            <Autocomplete
                options={cities}
                getOptionLabel={(city: City) => city.name}
                value={selectedCity}
                onChange={handleCityChange}
                renderInput={(params: any) => ( // Especifica el tipo de params como any o TextFieldProps
                    <TextField
                        {...params}
                        label="Seleccionar Ciudad"
                        variant="outlined"
                    />
                )}
            />

            {closestCities.length > 0 && (
                <div>
                    <h2>Ciudades más cercanas a {selectedCity?.name}:</h2>
                    <List>
                        {closestCities.map(city => (
                            <ListItem key={city.name}>
                                <ListItemText primary={city.name} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            )}
        </div>
    );
};

export default CitySelector;
