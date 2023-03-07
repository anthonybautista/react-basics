import React, { useState, useEffect, useRef } from 'react';
import Country from './components/Country';
import NewCountry from './components/NewCountry';
import './App.css';
import { Card, Toolbar, Typography, AppBar, Box, Fab } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import SaveIcon from '@mui/icons-material/Save';
import { HubConnectionBuilder } from '@microsoft/signalr';


const theme = createTheme({
  palette: {
    secondary: {
      main: '#fef6c9'
    }
  }
});

const App = () => {
  const [countries, setCountries] = useState([]);
  const [reload, setReload] = useState(0); 
  const [ connection, setConnection] = useState(null);
  const apiEndpoint = "https://localhost:5001/api/country/";
  //const apiEndpoint = 'https://olympic-api.azurewebsites.net/Api/country/';
  const hubEndpoint = "https://localhost:5001/medalsHub"
  //const hubEndpoint = "https://olympic-api.azurewebsites.net/medalsHub"

  let originalCountries = useRef(null);
  let originalMedals = useRef(null);

  const latestCountries = useRef(null);
  // latestCountries.current is a ref variable to countries
  // this is needed to access state variable in useEffect w/o dependency
  latestCountries.current = countries;

  const reloadCounter = useRef(null);

  reloadCounter.current = reload;

  useEffect(() => {
    const fetchData = async () => {
      const { data: mutableCountries } = await axios.get(apiEndpoint);
      setCountries(mutableCountries);

      if (originalCountries.current === null) {
        originalCountries.current = mutableCountries;
      }

      if (originalMedals.current === null) {
        originalMedals.current = mutableCountries.reduce((a, b) => a + (b.goldMedalCount + b.silverMedalCount + b.bronzeMedalCount), 0);
      }
    }
    fetchData();

    // signalR
    const newConnection = new HubConnectionBuilder()
      .withUrl(hubEndpoint)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  // componentDidUpdate (changes to connection)
  useEffect(() => {
    if (connection) {
      connection.start()
      .then(() => {
        console.log('Connected!')

        connection.on('ReceiveAddMessage', country => {
          console.log(`Add: ${country.name}`);

          let newCountry = { 
            id: country.id, 
            name: country.name,
            goldMedalCount: 0,
            silverMedalCount: 0,
            bronzeMedalCount: 0,
          };

          let mutableCountries = [...latestCountries.current];
          mutableCountries = mutableCountries.concat(newCountry);
          setCountries(mutableCountries);
          originalCountries.current = originalCountries.current.concat({ 
            id: country.id, 
            name: country.name,
            goldMedalCount: 0,
            silverMedalCount: 0,
            bronzeMedalCount: 0,
          });
        });

        connection.on('ReceiveDeleteMessage', id => {
          console.log(`Delete id: ${id}`);

          let mutableCountries = [...latestCountries.current];
          mutableCountries = mutableCountries.filter(c => c.id !== id);
          setCountries(mutableCountries);
          originalCountries.current = originalCountries.current.filter(c => c.id !== id);
          originalMedals.current = latestCountries.current.filter(c => c.id !== id).reduce((a, b) => a + (b.goldMedalCount + b.silverMedalCount + b.bronzeMedalCount), 0);
        });

        connection.on('ReceivePatchMessage', country => {
          console.log(`Patch: ${country.name}`);

          let updatedCountry = {
            id: country.id,
            name: country.name,
            goldMedalCount: country.goldMedalCount,
            silverMedalCount: country.silverMedalCount,
            bronzeMedalCount: country.bronzeMedalCount,
          }

          let mutableCountries = [...latestCountries.current];
          const idx = mutableCountries.findIndex(c => c.id === country.id);
          mutableCountries[idx] = updatedCountry;

          setCountries(mutableCountries);
          
          const idx2 = originalCountries.current.findIndex(c => c.id === country.id);

          originalCountries.current[idx2] = { 
            id: country.id,
            name: country.name,
            goldMedalCount: country.goldMedalCount,
            silverMedalCount: country.silverMedalCount,
            bronzeMedalCount: country.bronzeMedalCount,
          };
          
          originalMedals.current = mutableCountries.reduce((a, b) => a + (b.goldMedalCount + b.silverMedalCount + b.bronzeMedalCount), 0);
          setReload(reloadCounter.current + 1);
        });

      })
      .catch(e => console.log('Connection failed: ', e));
    }
  // useEffect is dependent on changes connection
  }, [connection]);

  const totalMedals = () => {
    return countries.reduce((a, b) => a + (b.goldMedalCount + b.silverMedalCount + b.bronzeMedalCount), 0);
  }

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
    setCountries(countriesMutable);
  }

  const deleteCountry = async (countryId) => {
    await axios.delete(apiEndpoint + countryId)
    //setCountries(countries.filter(c => c.id !== countryId));
    //originalCountries.current = originalCountries.current.filter(c => c.id !== countryId);
    //originalMedals.current = countries.filter(c => c.id !== countryId).reduce((a, b) => a + (b.goldMedalCount + b.silverMedalCount + b.bronzeMedalCount), 0);
  }

  const addCountry = async (name) => {
    await axios.post(apiEndpoint, { name: name });
  } 

  const countriesNotEqual = (country1, country2) => {
    if (country1.goldMedalCount !== country2.goldMedalCount) {
      return true;
    }
    if (country1.silverMedalCount !== country2.silverMedalCount) {
      return true;
    }
    if (country1.bronzeMedalCount !== country2.bronzeMedalCount) {
      return true;
    }
    return false;
  }

  const handleSave = async () => {
    countries.forEach(async country => {
      let jsonPatch = [];
      let originalCountry = originalCountries.current.filter(c => c.name === country.name)[0]
      
      if (countriesNotEqual(country,originalCountry))  {
        if (country.goldMedalCount !== originalCountry.goldMedalCount) {
          jsonPatch.push({ op: "replace", path: 'goldMedalCount', value: country.goldMedalCount });
        }
        if (country.silverMedalCount !== originalCountry.silverMedalCount) {
          jsonPatch.push({ op: "replace", path: 'silverMedalCount', value: country.silverMedalCount });
        }
        if (country.bronzeMedalCount !== originalCountry.bronzeMedalCount) {
          jsonPatch.push({ op: "replace", path: 'bronzeMedalCount', value: country.bronzeMedalCount });
        }
        
        try {
          await axios.patch(`${apiEndpoint}${country.id}`, jsonPatch);
          console.log(`json patch for id: ${country.id}: ${JSON.stringify(jsonPatch)}`);
        } catch (ex) {
          if (ex.response && ex.response.status === 404) {
            // country already deleted
            console.log("The record does not exist - it may have already been deleted");
          } else { 
            alert('An error occurred while updating');
          }
        }
      }  
      
    });
    
    // update state
    //originalCountries.current = countries;
    //originalMedals.current = totalMedals();
    
  }

  const valueChanged = () => {
    return originalMedals.current !== totalMedals();
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
                  color: valueChanged() ? '#9F1716' : 'black',
                  textDecoration: 'none',
                }}
              >
                Total Medals: {totalMedals()}
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
        <Fab 
          variant='extended'
          disabled={!valueChanged()}
          sx={{mt: 2}}
          onClick={ () => handleSave() }
          color='error'
        >
          <SaveIcon sx={{ mr: 1 }} />
          Save Changes
        </Fab>
        <Box sx={{p: 1}} className="countryContainer">
          { countries.map(country => 
            <Card key={ country.id } sx={{ width: 300, minWidth: 300, mx: 'auto', mt: 2, boxShadow: 3 }}>
              <Country 
                country={ country } 
                key={ reload }
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
