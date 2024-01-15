import React from "react";
import { Box, Grid, Typography, Button, makeStyles } from "@material-ui/core"
import { differenceInMinutes } from 'date-fns';

const skills=["Javascript", "React.js", "Node.js", "Angular"]

const useStyles = makeStyles((theme) => ({
    wrapper: {
        border: '1px solid #e8e8e8',
        cursor: "pointer",
        transition: ".3s",

        "&:hover": {
            boxShadow: "0px 5px 25px rgba(0,0,0,0.1)",
            borderLeft: "6px solid #4D64E4",
        },
    },
    jobTitle:{
        fontSize: "19px",
    },
    jobType:{
        fontSize: "17px",
        margin: theme.spacing(0.5),
        backgroundColor: theme.palette.primary.main,
        padding: theme.spacing(0.75),
        borderRadius: "5px",
        display: "inline-block",
        fontWeight: 600,
        color: "white",
    },
    skillChip:{
        margin: theme.spacing(0.5),
        padding: theme.spacing(0.75),
        fontSize: "14.5px",
        borderRadius: "5px",
        fontWeight: 600,
        fontFamily:"Cinzel",
        color: "white",
        backgroundColor: theme.palette.secondary.main,
        display: "inline-block",
    },
    category:{
        margin: theme.spacing(0.5),
        padding: theme.spacing(0.75),
        fontSize: "14.5px",
        borderRadius: "5px",
        fontWeight: 600,
        color: "white",
        backgroundColor: theme.palette.secondary.main,
        display: "flex",
        justifyContent: "center",
    },
    applyButton:{
        fontSize: "14.5px"
    },
}));

export default props => {
    const classes= useStyles()
    return (
        <Box p={2} className={classes.wrapper}>
            <Grid container alignItems="center">
                <Grid item xs>
                    <Typography variant="subtitle1" className={classes.jobTitle}>{props.title}</Typography>
                    <Typography className={classes.jobType} variant="subtitle2">{props.type}</Typography>
                    <Grid item>
                        <Typography variant ="caption">
                            {differenceInMinutes(Date.now(),props.postedOn)} min ago | {props.location}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item contianer xs>
                    <Grid>
                        <Typography className={classes.jobType}> {props.category} </Typography>
                    </Grid>
                    {props.skills.map((skill) => (
                    <Grid key= {skills} className={classes.skillChip} item>
                        {skill}
                    </Grid>
                ))}
                </Grid>
                <Grid item container direction="column" alignItems="flex-end" xs>
                    <Grid item>
                        <Box mt={1.5} >
                            <Button onClick={props.open} variant= "outlined" className={classes.applyButton}>More Info</Button>
                        </Box>
                        <Box mt={0.75}>
                            <Button onClick={props.openNewJobModal} variant= "outlined" className={classes.applyButton} >Apply Now</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )

}