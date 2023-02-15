import React, { useState, useEffect } from 'react';
import { Button, Box, Fab, TextField } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

const NewCountry = (props) => {
    const [showForm, setShowForm] = useState(false);
    const [countryName, setCountryName] = useState('');

    useEffect(() => {
        setCountryName('');
    }, [showForm]) 

    const saveCountry = () => {
        props.onAdd(countryName);
        setShowForm(false);
    } 

    return (
        <Box sx={{ width: 300, mx: 'auto', mt: 2 }}>
            {
                (showForm) ? 
                    <form>
                        <TextField 
                            id="countryName"
                            placeholder="Country Name"
                            autoFocus
                            name="countryName"
                            value={ countryName }
                            onChange={ (e) => setCountryName(e.target.value) }
                            autoComplete="off" 
                            sx={{ height: 1 }}
                            fullWidth
                            color="secondary"
                        />
                        <Button 
                            variant="contained"
                            disabled={ countryName.trim().length === 0 } 
                            onClick={ saveCountry } 
                            sx={{ mx: 1, mt: 1 }}
                            color="secondary"
                        >
                            Save
                        </Button>
                        <Button variant="contained" onClick={ () => setShowForm(false) } sx={{ mx: 1, mt: 1 }} color="error">Cancel</Button>
                    </form>
                :
                    <Box>
                        <Fab variant="extended" onClick={ () => setShowForm(true) }>
                            <AddCircleRoundedIcon sx={{ mr: 1 }} />
                            Add Country
                        </Fab>
                    </Box>  
            }
        </Box>
    );
}

export default NewCountry;