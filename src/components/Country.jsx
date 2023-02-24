import { Typography, Box, Divider } from '@mui/material';
import React from 'react';
import Medal from './Medal';

const Country = (props) => {

    const { country, increment, decrement, deleteCountry } = props;

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
                count={country.goldMedalCount}
                name='Gold'
                increment={increment}
                decrement={decrement}
                id={country.id}
              />
            </div>
            <div id='silver' sx={{ gridColumn: '2/3' }}>
              <Medal
                bg='#bfc1c2'
                count={country.silverMedalCount}
                name='Silver'
                increment={increment}
                decrement={decrement}
                id={country.id}
              />
            </div>
            <div id='bronze' sx={{ gridColumn: '3/4' }}>
              <Medal
                  bg='#B85E1A'
                  count={country.bronzeMedalCount}
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
            gridTemplateColumns: '25% 50% 25%',
            gridTemplateRows: 'repeat(1, 25px)',
            gap: 1,
            pt: 1,
            pb: 1
        }}
        >
          <div sx={{ gridColumn: '1/2' }}>
            <Typography 
              sx={{ cursor: 'pointer', textAlign: 'left', color: 'red', pl: 1}}
              onClick={() => deleteCountry(country.id)}
              >
                Delete
              </Typography>
          </div>
          <div sx={{ gridColumn: '2/3' }}>
            <Typography sx={{ fontWeight: 'bold', textAlign: 'right'}}>Total Medals:</Typography>
          </div>
          <div sx={{ gridColumn: '3/4' }}>
            <Typography sx={{ fontWeight: 'bold' }}>{country.goldMedalCount + country.silverMedalCount + country.bronzeMedalCount}</Typography>
          </div>
        </Box>
      </div>
    );

}

export default Country