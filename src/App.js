import React, { Component } from 'react';
import Country from './components/Country';
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

class App extends Component {
  state = {
    countries: [
      { id: 1, name: 'United States', gold: 4, silver: 1, bronze: 2 },
      { id: 2, name: 'China', gold: 3, silver: 0, bronze: 1 },
      { id: 3, name: 'Germany', gold: 0, silver: 1, bronze: 2 },
    ]
  }

  // helper methods
  increment = (countryId, medal) => {
    const countriesMutable = [...this.state.countries];
    const idx = countriesMutable.findIndex((c) => c.id === countryId);
    const medalType = medal.toLowerCase();
    countriesMutable[idx][medalType] += 1;
    this.setState({ countries: countriesMutable })
  }

  decrement = (countryId, medal) => {
    const countriesMutable = [...this.state.countries];
    const idx = countriesMutable.findIndex((c) => c.id === countryId);
    const medalType = medal.toLowerCase();
    countriesMutable[idx][medalType] -= 1;
    this.setState({ countries: countriesMutable })
  }

  render() {
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
                  Total Medals: {this.state.countries.reduce((a, b) => a + (b.gold + b.silver + b.bronze), 0)}
                </Typography>
              </Box>
            </Toolbar>
          </AppBar>
          <Box sx={{p: 1}} className="countryContainer">
            { this.state.countries.map(country => 
              <Card key={ country.id } sx={{ width: 300, minWidth: 300, mx: 'auto', mt: 2, boxShadow: 3 }}>
                <Country 
                  country={ country } 
                  increment={this.increment}
                  decrement={this.decrement}
                />
              </Card>
            )}
          </Box>  
        </div>
      </ThemeProvider>  
    );
  }
}

export default App;
