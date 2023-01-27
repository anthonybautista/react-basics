import React, { Component } from 'react';
import Country from './components/Country';
import './App.css';
import { Card } from '@mui/material';

class App extends Component {
  state = {
    countries: [
      { id: 1, name: 'United States', goldMedalCount: 4, silverMedalCount: 1, bronzeMedalCount: 2 },
      { id: 2, name: 'China', goldMedalCount: 3, silverMedalCount: 0, bronzeMedalCount: 1 },
      { id: 3, name: 'Germany', goldMedalCount: 0, silverMedalCount: 1, bronzeMedalCount: 2 },
    ]
  }

  render() {
    return (
      <div className="App">
        { this.state.countries.map(country => 
          <Card key={ country.id } sx={{ maxWidth: 300, mx: 'auto', mt: 2, boxShadow: 3 }}>
            <Country country={ country }/>
          </Card>
        )}
      </div>
    );
  }
}

export default App;
