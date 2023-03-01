import { Typography, Box, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from 'react';
import Medal from './Medal';

const Country = (props) => {

    const { country, increment, decrement, deleteCountry } = props;
    const [originalCount] = useState(country.goldMedalCount + country.silverMedalCount + country.bronzeMedalCount);
    
    const totalMedals = () => {
      return country.goldMedalCount + country.silverMedalCount + country.bronzeMedalCount;
    }

    const valueChanged = () => {
      if (originalCount === (totalMedals())) {
        return 'black';
      } else {
        return '#9F1716';
      }
    }

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
            gridTemplateColumns: '30% 55% 15%',
            gridTemplateRows: 'repeat(1, 25px)',
            gap: 1,
            pt: 1,
            pb: 1
        }}
        >
          <div sx={{ gridColumn: '1/2' }}>
            <Typography 
              sx={{ cursor: 'pointer', textAlign: 'left', color: '#9F1716', position: 'relative', top: -5, pl: 1 }}
              onClick={() => deleteCountry(country.id)}
              >
                <DeleteIcon sx={{ position: 'relative', top: 5 }} />
                Delete
              </Typography>
          </div>
          <div sx={{ gridColumn: '2/3' }}>
            <Typography sx={{ fontWeight: 'bold', textAlign: 'right', position: 'relative', top: 1 }}>Total Medals:</Typography>
          </div>
          <div sx={{ gridColumn: '3/4' }}>
            <Typography sx={{ fontWeight: 'bold', color: valueChanged(), textAlign: 'left', position: 'relative', top: 1 }}>{totalMedals()}</Typography>
          </div>
        </Box>
      </div>
    );

}

export default Country