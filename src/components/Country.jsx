import { IconButton, Typography, Box, Divider } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import Badge from '@mui/material/Badge';
import React, { Component } from 'react';

class Country extends Component {
  state = {
    name: 'USA',
    gold: 0,
    silver: 0,
    bronze: 0
  }
  // helper method
  incrementGold = () => {
    this.setState({ gold: (this.state.gold + 1) })
  }

  incrementSilver = () => {
    this.setState({ silver: (this.state.silver + 1) })
  }

  incrementBronze = () => {
    this.setState({ bronze: (this.state.bronze + 1) })
  }

  incrementButton = (type) => {
    if (type === "gold") {
        return  <IconButton onClick={this.incrementGold} aria-label="add" color='black' sx={{ml : 2}}>
                <AddCircleRoundedIcon/>
            </IconButton>;
    } else if (type === "silver") {
        return  <IconButton onClick={this.incrementSilver} aria-label="add" color='black' sx={{ml : 2}}>
                <AddCircleRoundedIcon/>
            </IconButton>;
    } 

    return  <IconButton onClick={this.incrementBronze} aria-label="add" color='black' sx={{ml : 2}}>
                <AddCircleRoundedIcon/>
            </IconButton>;
    
  }

  totalGold = () => {
    const shapeStyles = { bgcolor: '#F7FF11', width: 40, height: 40 };
    const shapeCircleStyles = { borderRadius: '50%' };
    const circle = (
        <Box component="span" sx={{ ...shapeStyles, ...shapeCircleStyles, boxShadow: 3 }}>
            <Typography sx={{ fontWeight: 'bold', mx: 'auto', mt: 1}}>
                {this.state.gold}
            </Typography>
        </Box>
    );

    return circle;
  }

  totalSilver = () => {
    const shapeStyles = { bgcolor: '#bfc1c2', width: 40, height: 40 };
    const shapeCircleStyles = { borderRadius: '50%' };
    const circle = (
        <Box component="span" sx={{ ...shapeStyles, ...shapeCircleStyles, boxShadow: 3 }}>
            <Typography sx={{ fontWeight: 'bold', mx: 'auto', mt: 1}}>
                {this.state.silver}
            </Typography>
        </Box>
    );

    return circle;
  }

  totalBronze = () => {
    const shapeStyles = { bgcolor: '#B85E1A', width: 40, height: 40 };
    const shapeCircleStyles = { borderRadius: '50%' };
    const circle = (
        <Box component="span" sx={{ ...shapeStyles, ...shapeCircleStyles, boxShadow: 3 }}>
            <Typography sx={{ fontWeight: 'bold', mx: 'auto', mt: 1}}>
                {this.state.bronze}
            </Typography>
        </Box>
    );

    return circle;
  }

  totalMedals = () => {
    return this.state.gold + this.state.silver + this.state.bronze;
  }

  render() { 
    return (
      <div>
        <div>
            <Typography variant="h3" sx={{ mb: 2}}>{this.state.name}</Typography>
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
                <Badge overlap="circular" badgeContent={this.incrementButton("gold")}>
                    {this.totalGold()}
                </Badge>
                <Typography sx={{ fontWeight: 'bold' }}>Gold</Typography>
            </div>
            <div id='silver' sx={{ gridColumn: '2/3' }}>
                <Badge overlap="circular" badgeContent={this.incrementButton("silver")}>
                    {this.totalSilver()}
                </Badge>
                <Typography sx={{ fontWeight: 'bold' }}>Silver</Typography>
            </div>
            <div id='bronze' sx={{ gridColumn: '3/4' }}>
                <Badge overlap="circular" badgeContent={this.incrementButton("bronze")}>
                    {this.totalBronze()}
                </Badge>
                <Typography sx={{ fontWeight: 'bold' }}>Bronze</Typography>
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
                <Typography sx={{ fontWeight: 'bold' }}>{this.totalMedals()}</Typography>
            </div>
        </Box>
      </div>
    );
  }
}

export default Country