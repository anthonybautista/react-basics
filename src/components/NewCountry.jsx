import React, { Component } from 'react';
import { Button, Box, Fab, TextField } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

class NewCountry extends Component {
    state = {
        showForm: false,
        name: '',
    }

    toggleForm = () => {
        const { showForm } = this.state;
        this.setState({ showForm : !showForm });
        if (showForm) {
          this.setState({ name: '' });
        }
    }

    handleChange = (e) => this.setState({ [e.target.name]: e.target.value});

    saveCountry = () => {
        const { name } = this.state;
        this.props.onAdd(name);
        this.toggleForm();
    } 

    render() { 
        const { showForm, name } = this.state;

        return (
            <Box sx={{ width: 300, mx: 'auto', mt: 2 }}>
                {
                    (showForm) ? 
                        <form>
                            <TextField 
                                id="name"
                                placeholder="Country Name"
                                autoFocus
                                name="name"
                                value={ name }
                                onChange={ this.handleChange }
                                autoComplete="off" 
                                sx={{ height: 1 }}
                                fullWidth
                                color="secondary"
                            />
                            <Button 
                                variant="contained"
                                disabled={ name.trim().length === 0 } 
                                onClick={ this.saveCountry } 
                                sx={{ mx: 1, mt: 1 }}
                                color="secondary"
                            >
                                Save
                            </Button>
                            <Button variant="contained" onClick={this.toggleForm} sx={{ mx: 1, mt: 1 }} color="error">Cancel</Button>
                        </form>
                    :
                        <Box>
                            <Fab variant="extended" onClick={this.toggleForm}>
                                <AddCircleRoundedIcon sx={{ mr: 1 }} />
                                Add Country
                            </Fab>
                        </Box>  
                }
            </Box>
        );
    }
}

export default NewCountry;