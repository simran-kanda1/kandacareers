import React, { useState } from 'react';
import { Box, CircularProgress, Typography, IconButton, makeStyles, LinearProgress, Button, Grid, FilledInput, Select, MenuItme, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem } from '@material-ui/core';
import { Close as CloseIcon} from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
    skillChip:{
        margin: theme.spacing(0.5),
        padding: theme.spacing(0.75),
        fontSize: "14.5px",
        borderRadius: "5px",
        fontWeight: 600,
        color: "white",
        backgroundColor: theme.palette.secondary.main,
        display: "inline-block",
    },
    jobType:{
        fontSize: "18px",
        backgroundColor: theme.palette.primary.main,
        padding: theme.spacing(0.75),
        borderRadius: "5px",
        display: "inline-block",
        fontWeight: 600,
        color: "white",
    },
    descriptionText:{
        fontWeight: 600,
        marginTop: 12,
    },

    roleText: {
        marginLeft: 25,
    }
}))

export default (props) => {
    const classes = useStyles()
    const [loading, setLoading] = useState(false)

    const closeModal = () =>{
        setLoading(false)
        props.closeModal();
      }

    return(
    <Dialog open={!!Object.keys(props.job).length} fullWidth >
        <DialogTitle>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h5">Job Information</Typography>   
            <IconButton onClick={closeModal}>
                <CloseIcon />
            </IconButton>
            </Box>
            <Box>
                <Typography className={classes.jobType} variant="h6">{props.job.title}</Typography>
            </Box>
        </DialogTitle>
        <DialogContent>
            <Box mb={4} display="flex"justifyContent="center" alignItems="center">
                <Typography className={classes.skillChip} variant="h6"> {props.job.title} </Typography>
                <Typography className={classes.skillChip} variant="h6"> {props.job.type} </Typography>
                <Typography className={classes.skillChip} variant="h6"> {props.job.location} </Typography>
            </Box>
            <Box justifyContent="space-between" alignItems="center">
                <Typography className={classes.descriptionText} >Description: </Typography>
                <Typography>{props.job.description}</Typography>
            </Box>
            <Box mt={3} justifyContent="space-between" alignItems="center">
                <Typography className={classes.descriptionText} >How you will make an impact:</Typography>
                <Grid container alignItems="center">
                    {props.job.role && 
                        props.job.role.map((role) => (
                        <Grid item key={role}>
                            <Typography className={classes.roleText}> • {role}</Typography>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Box mt={3} justifyContent="space-between" alignItems="center">
                <Typography className={classes.descriptionText} >What you will bring to the team:</Typography>
                <Grid container alignItems="center">
                    {props.job.requirements && 
                        props.job.requirements.map((requirements) => (
                        <Grid item key={requirements}>
                            <Typography className={classes.roleText}> • {requirements}</Typography>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </DialogContent>
    </Dialog>
)}