import { IconButton, Typography, Box, Divider } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Badge from '@mui/material/Badge';
import React, { Component } from 'react';

class Country extends Component {
  state = {
    name: this.props.country.name,
    gold: this.props.country.goldMedalCount,
    silver: this.props.country.silverMedalCount,
    bronze: this.props.country.bronzeMedalCount
  }
  // helper methods
  incrementGold = () => {
    this.setState({ gold: (this.state.gold + 1) })
  }

  incrementSilver = () => {
    this.setState({ silver: (this.state.silver + 1) })
  }

  incrementBronze = () => {
    this.setState({ bronze: (this.state.bronze + 1) })
  }

  decrementGold = () => {
    this.setState({ gold: (this.state.gold - 1) })
  }

  decrementSilver = () => {
    this.setState({ silver: (this.state.silver - 1) })
  }

  decrementBronze = () => {
    this.setState({ bronze: (this.state.bronze - 1) })
  }

  addButtons = (type) => {
    if (type === "gold") {
        return  <div>
                  <IconButton onClick={this.incrementGold} aria-label="add" color='black' sx={{ml : 2, top: 20}}>
                    <AddCircleRoundedIcon/>
                  </IconButton>
                  <IconButton onClick={this.decrementGold} disabled={this.allowDecrement("gold")} aria-label="sub" color='black' sx={{mr : 9.5, bottom: 20}}>
                    <RemoveCircleIcon/>
                  </IconButton>
                </div>;
    } else if (type === "silver") {
        return  <div>
                  <IconButton onClick={this.incrementSilver} aria-label="add" color='black' sx={{ml : 2, top: 20}}>
                    <AddCircleRoundedIcon/>
                  </IconButton>
                  <IconButton onClick={this.decrementSilver} disabled={this.allowDecrement("silver")} aria-label="sub" color='black' sx={{mr : 9.5, bottom: 20}}>
                    <RemoveCircleIcon/>
                  </IconButton>
                </div>;
    } 

    return  <div>
              <IconButton onClick={this.incrementBronze} aria-label="add" color='black' sx={{ml : 2, top: 20}}>
                <AddCircleRoundedIcon/>
              </IconButton>
              <IconButton onClick={this.decrementBronze} disabled={this.allowDecrement("bronze")} aria-label="sub" color='black' sx={{mr : 9.5, bottom: 20}}>
                <RemoveCircleIcon/>
              </IconButton>
            </div>;
    
  }

  allowDecrement = (type) => {
    if (type === "gold") {
      if (this.state.gold > 0) {
        return false;
      } else {
        return true;
      }
    } else if (type === "silver") {
      if (this.state.silver > 0) {
        return false;
      } else {
        return true;
      }
    }

    if (this.state.bronze > 0) {
      return false;
    } 

    return true;
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
                <Badge overlap="circular" badgeContent={this.addButtons("gold")}>
                    {this.totalGold()}
                </Badge>
                <Typography sx={{ fontWeight: 'bold' }}>Gold</Typography>
            </div>
            <div id='silver' sx={{ gridColumn: '2/3' }}>
                <Badge overlap="circular" badgeContent={this.addButtons("silver")}>
                    {this.totalSilver()}
                </Badge>
                <Typography sx={{ fontWeight: 'bold' }}>Silver</Typography>
            </div>
            <div id='bronze' sx={{ gridColumn: '3/4' }}>
                <Badge overlap="circular" badgeContent={this.addButtons("bronze")}>
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