import React from 'react';
import { Box, CircularProgress, Typography, IconButton, LinearProgress, Button, Grid, FilledInput, Select, MenuItme, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Close as CloseIcon } from '@material-ui/icons';
import { useState } from 'react';
import { storage } from '/Users/simrankanda/Desktop/kanda-careers/kanda_careers/src/firebase/config';

export default (props) => {

const [loading, setLoading] = useState(false)

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
        variant:"contained",
        color:"secondary"
    },
    skillChip:{
        margin: theme.spacing(0.5),
        padding: theme.spacing(0.75),
        fontSize: "15px",
        borderRadius: "5px",
        fontWeight: 600,
        color: "white",
        backgroundColor: theme.palette.primary.main,
        display: "inline-block",
    },
    titleText:{
        fontSize: "22px",
    },
    redText:{
        fontSize: "15px;"
    }
  }));

  const classes = useStyles();

  const initState = {
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    province: "Ontario",
    postalCode: "",
    phoneNumber: "",
  }


  const [resumeDetails, setResumeDetails] = useState(initState);
  const jobTitle = {
    jobTitle: props.job.title,
    jobId: props.job.id
  }

  const [resume, setResume] = useState(``);

  const upload = () => {
    if (resume == ``) return;
    const resumeref = storage.ref(`/${props.job.title}/${resumeDetails.firstName} ${resumeDetails.lastName}/${resume.name}`).put(resume)
    .on("state_changed", alert("success"), alert);
    
    resumeref();
  }

  const handleChange = e => {
    e.persist();
    setResumeDetails(oldState => ({ ...oldState, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async () => {
    for (const field in resumeDetails){
        if (((resumeDetails.firstName) == "") || ((resumeDetails.lastName)=="") || ((resumeDetails.emaild)== "" )|| (resume == ``)) {
            return;
        }
    }
    upload();
    setLoading(true);
    await props.applyJob(resumeDetails, jobTitle);
    closeModal();
  } 
  const closeModal = () =>{
    setResumeDetails(initState)
    setLoading(false)
    props.closeModal();
  }

    return(
        <Dialog open={!!Object.keys(props.job).length} fullWidth>
            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center" className={classes.titleText} mt={0.5}>
                    Apply Now  
                    <IconButton onClick={closeModal}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box mt={2} mb={-2}>
                    <Typography className={classes.skillChip}>{props.job.title}</Typography>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <FilledInput 
                            onChange= {handleChange}
                            name="firstName"
                            value={setResumeDetails.firstName}
                            autoComplete="off" 
                            placeholder="First Name *" 
                            disableUnderline 
                            fullWidth>

                        </FilledInput>
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput 
                            onChange= {handleChange}
                            name="lastName"
                            value={setResumeDetails.lastName}
                            autoComplete="off" 
                            placeholder="Last Name *" 
                            disableUnderline 
                            fullWidth>

                        </FilledInput>
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput 
                            onChange= {handleChange}
                            name="email"
                            value={setResumeDetails.email}
                            autoComplete="off" 
                            placeholder="Email *" 
                            disableUnderline 
                            fullWidth>
                            
                        </FilledInput>
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput 
                            onChange= {handleChange}
                            name="address"
                            value={setResumeDetails.address}
                            autoComplete="off"  
                            placeholder="Address" 
                            disableUnderline 
                            fullWidth>

                        </FilledInput>
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput
                            onChange= {handleChange} 
                            name="city"
                            value={setResumeDetails.city}
                            autoComplete="off" 
                            placeholder="City" 
                            disableUnderline 
                            fullWidth
                        ></FilledInput>
                    </Grid>
                    <Grid item xs={6}>
                        <Select onChange= {handleChange} fullWidth name="province" value={setResumeDetails.province} disableUnderline variant="filled" defaultValue="Province">
                            <MenuItem value="Province">Province</MenuItem>
                            <MenuItem value="Ontario">Ontario</MenuItem>
                            <MenuItem value="Quebec">Quebec</MenuItem>
                            <MenuItem value="Alberta">Alberta</MenuItem>
                            <MenuItem value="British Columbia">British Columbia</MenuItem>
                            <MenuItem value="Manitoba">Manitoba</MenuItem>
                            <MenuItem value="New Brunswick">New Brunswick</MenuItem>
                            <MenuItem value="Newfoundland">Newfoundland</MenuItem>
                            <MenuItem value="Nova Scotia">Nova Scotia</MenuItem>
                            <MenuItem value="Prince Edward Island">Prince Edward Island</MenuItem>
                            <MenuItem value="Saskatchewan">Saskatchewan</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput 
                            onChange= {handleChange}
                            name="postalCode"
                            value={setResumeDetails.postalCode}
                            autoComplete="off" 
                            placeholder="Postal Code" 
                            disableUnderline 
                            fullWidth>

                        </FilledInput>
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput 
                            onChange= {handleChange}
                            name="phoneNumber"
                            value={setResumeDetails.phoneNumber}
                            autoComplete="off" 
                            placeholder="Phone Number" 
                            disableUnderline 
                            fullWidth>
                                
                        </FilledInput>
                    </Grid>
                    <Grid item xs={6} className={classes.root}>
                        <Button variant="contained" color="secondary">
                            *
                            <input
                                className={classes.input}
                                type="file"
                                onChange={(e) => {setResume(e.target.files[0])
                                }}
                            />
                        </Button>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Box color="red" alignItems="center" width="100%" display="flex" justifyContent="space-between" >
                    <Typography variant="caption" className={classes.redText}>*Required Fields</Typography>
                    <Button 
                        onClick={handleSubmit} 
                        variant="contained" 
                        disableElevation 
                        color="primary" 
                        disabled={loading}
                    >
                        {loading ? (
                            <CircularProgress color="secondary" size={22} />
                        ) : (
                            "Submit"
                        )}
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>

    )
}