import { Typography, Box, Divider } from '@mui/material';
import React, { Component } from 'react';
import Medal from './Medal';

class Country extends Component {

  // helper methods

  render() { 
    const { country, increment, decrement } = this.props;
    return (
      <div>
        <div>
            <Typography variant="h3" sx={{ mb: 2}}>{country.name}</Typography>
        </div>
        <Box
        sx={{
            display: 'grid',
            gridAutoFlow: 'row',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'repeat(1, 75px)',
            gap: 1,
        }}
        >
            <div id='gold' sx={{ gridColumn: '1/2' }}>
              <Medal
                bg='#F7FF11'
                count={country.gold}
                name='Gold'
                increment={increment}
                decrement={decrement}
                id={country.id}
              />
            </div>
            <div id='silver' sx={{ gridColumn: '2/3' }}>
              <Medal
                bg='#bfc1c2'
                count={country.silver}
                name='Silver'
                increment={increment}
                decrement={decrement}
                id={country.id}
              />
            </div>
            <div id='bronze' sx={{ gridColumn: '3/4' }}>
              <Medal
                  bg='#B85E1A'
                  count={country.bronze}
                  name='Bronze'
                  increment={increment}
                  decrement={decrement}
                  id={country.id}
                />
            </div>
        </Box>
        <Divider/>
        <Box
        sx={{
            display: 'grid',
            gridAutoFlow: 'row',
            gridTemplateColumns: '75% 25%',
            gridTemplateRows: 'repeat(1, 25px)',
            gap: 1,
            pt: 1,
            pb: 1
        }}
        >
            <div sx={{ gridColumn: '1/2' }}>
                <Typography sx={{ fontWeight: 'bold', textAlign: 'right'}}>Total Medals:</Typography>
            </div>
            <div sx={{ gridColumn: '2/3' }}>
                <Typography sx={{ fontWeight: 'bold' }}>{country.gold + country.silver + country.bronze}</Typography>
            </div>
        </Box>
      </div>
    );
  }
}

export default Country