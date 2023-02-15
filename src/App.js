import React, { useState, useEffect } from 'react';
import Country from './components/Country';
import NewCountry from './components/NewCountry';
import './App.css';
import { Card, Toolbar, Typography, AppBar, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    secondary: {
      main: '#fef6c9'
    }
  }
});

const App = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    let mutableCountries = [
      { id: 1, name: 'United States', gold: 4, silver: 1, bronze: 2 },
      { id: 2, name: 'China', gold: 3, silver: 0, bronze: 1 },
      { id: 3, name: 'Germany', gold: 0, silver: 1, bronze: 2 },
    ]
    setCountries(mutableCountries);
  }, []);

  // helper methods
  const increment = (countryId, medal) => {
    let countriesMutable = [...countries ];
    const idx = countriesMutable.findIndex((c) => c.id === countryId);
    const medalType = medal.toLowerCase();
    countriesMutable[idx][medalType] += 1;
    setCountries(countriesMutable);
  }

  const decrement = (countryId, medal) => {
    let countriesMutable = [...countries ];
    const idx = countriesMutable.findIndex((c) => c.id === countryId);
    const medalType = medal.toLowerCase();
    countriesMutable[idx][medalType] -= 1;
    setCountries(countriesMutable)
  }

  const deleteCountry = (countryId) => {
    setCountries(countries.filter(c => c.id !== countryId));
  }

  const addCountry = (name) => {
    const id = countries.length === 0 ? 1 : Math.max(...countries.map(country => country.id)) + 1;
    setCountries(countries.concat({ id: id, name: name, gold: 0, silver: 0, bronze: 0 }));
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
                Total Medals: {countries.reduce((a, b) => a + (b.gold + b.silver + b.bronze), 0)}
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
