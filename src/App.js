import React, { useState, useEffect } from 'react';
import Country from './components/Country';
import NewCountry from './components/NewCountry';
import './App.css';
import { Card, Toolbar, Typography, AppBar, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';


const theme = createTheme({
  palette: {
    secondary: {
      main: '#fef6c9'
    }
  }
});

const App = () => {
  const [countries, setCountries] = useState([]);
  const [apiEndpoint] = useState('https://olympic-api.azurewebsites.net/Api/country/');

  useEffect(() => {
    const fetchData = async () => {
      const { data: mutableCountries } = await axios.get(apiEndpoint);
      setCountries(mutableCountries);
    }
    fetchData();
  }, [apiEndpoint]);

  const increment = (countryId, medal) => {
    let countriesMutable = [...countries ];
    const idx = countriesMutable.findIndex((c) => c.id === countryId);
    const medalType = medal.toLowerCase() + 'MedalCount';
    countriesMutable[idx][medalType] += 1;
    setCountries(countriesMutable);
  }

  const decrement = (countryId, medal) => {
    let countriesMutable = [...countries ];
    const idx = countriesMutable.findIndex((c) => c.id === countryId);
    const medalType = medal.toLowerCase() + 'MedalCount';
    countriesMutable[idx][medalType] -= 1;
    setCountries(countriesMutable)
  }

  const deleteCountry = async (countryId) => {
    await axios.delete(apiEndpoint + countryId)
    setCountries(countries.filter(c => c.id !== countryId));
  }

  const addCountry = async (name) => {
    const { data: post } = await axios.post(apiEndpoint, { name: name, goldMedalCount: 0, silverMedalCount: 0, bronzeMedalCount: 0 });
    setCountries(countries.concat(post));
  } 

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AppBar position="static" sx={{px: 2}} color="secondary">
          <Toolbar disableGutters>
            <img src="/logo.png" alt="Olympic Logo" />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                mr: 2,
                ml: 2,
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              The Olympics
            </Typography>
            <Box sx={{textAlign: 'right', flex: 1}}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                Total Medals: {countries.reduce((a, b) => a + (b.goldMedalCount + b.silverMedalCount + b.bronzeMedalCount), 0)}
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
        <Box sx={{p: 1}} className="countryContainer">
          { countries.map(country => 
            <Card key={ country.id } sx={{ width: 300, minWidth: 300, mx: 'auto', mt: 2, boxShadow: 3 }}>
              <Country 
                country={ country } 
                increment={increment}
                decrement={decrement}
                deleteCountry={deleteCountry}
              />
            </Card>
          )}
        </Box>
        <NewCountry onAdd={addCountry} />
      </div>
    </ThemeProvider>  
  );
}

export default App;
