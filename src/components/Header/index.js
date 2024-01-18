import React, { useState } from 'react';
import { Box, Grid, Typography, Button, makeStyles } from '@material-ui/core'
import greylogo from '../Header/greylogo.png';
import blacklogo from '../Header/blacklogo.png'
import backEdited from '../Header/backEdited.jpg';

const useStyles = makeStyles((theme) => ({
    homeButton: {
        fontSize: "15.5px",
    },
}));

export default (props) => {
const classes= useStyles()

return(
    <Box py={8} bgcolor="secondary.main" sx={{
        backgroundImage:`url(${backEdited})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "250px",
        }}
        color="white">
        <Grid container justifyContent= "center">
            <Grid item xs={10}> 
                <Box display="flex" justifyContent= "right" mt={2}>
                    <a href="https://www.kandaconsulting.net" target='_self'>
                    <Button variant= "contained" color="primary" disableElevation className={classes.homeButton}>
                        Back to Home Page
                    </Button>
                    </a>
                </Box>
                <Box display="flex" justifyContent= "center" mt={-5}>
                    <img src={greylogo} alt="logo" height={200} width= {410} />
                </Box>
            </Grid>
        </Grid>
    </Box>
)}