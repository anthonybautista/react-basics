import { IconButton, Typography, Box } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Badge from '@mui/material/Badge';
import React, { useState } from 'react';

const Medal = (props) => {

  const { bg, count, name, increment, decrement, id, canPatch } = props;
  const shapeStyles = { bgcolor: bg, width: 40, height: 40 };
  const shapeCircleStyles = { borderRadius: '50%' };

  const [originalCount] = useState(count);

  const addButtons = () => {
    return  <div>
              <IconButton onClick={() => increment(id, name)} aria-label="add" color='black' sx={{ml : 2, top: 20}}>
                <AddCircleRoundedIcon/>
              </IconButton>
              <IconButton onClick={() => decrement(id, name)} disabled={count < 1} aria-label="sub" color='black' sx={{mr : 9.5, bottom: 20}}>
                <RemoveCircleIcon/>
              </IconButton>
            </div>;
  }

  const valueChanged = () => {
    if (originalCount === count) {
      return 'black';
    } else {
      return '#9F1716';
    }
  }
    
  return (
    <div>
      <Badge overlap="circular" badgeContent={canPatch && addButtons()}>
        <Box component="span" sx={{ ...shapeStyles, ...shapeCircleStyles, boxShadow: 3 }}>
            <Typography sx={{ fontWeight: 'bold', mx: 'auto', mt: 1, color: valueChanged() }}>
                {count}
            </Typography>
        </Box>
      </Badge>
      <Typography sx={{ fontWeight: 'bold' }}>{name}</Typography>
    </div>
  );
}

export default Medal