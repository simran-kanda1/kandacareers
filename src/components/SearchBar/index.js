import React, {useState} from "react";
import { Box, Grid, CircularProgress, Button, Select, MenuItem, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles({
    wrapper:{
        fontSize: "18px",
        backgroundColor: "fff",
        display: "flex",
        "& > *": {
            flex: 1,
            fontSize: "18px",
            height: "45px",
            margin: "8px",
        },
    },
});

export default (props) => {
    const [loading, setLoading] = useState(false)
    const [jobSearch, setJobSearch] = useState({
        type: 'Job Type',
        category: 'Category',
    });
    const [errorMessage, setErrorMessage] = useState("")

    const handleChange = e => {
        e.persist();
        setJobSearch(oldState => ({ ...oldState, [e.target.name]: e.target.value}));
    };

    const search = async () => {
        setLoading(true);
        if ((jobSearch.type)=='Job Type' ||(jobSearch.category)=='Category'){
            setLoading(false);
            setErrorMessage("Select a value for all fields")
            return;
        }
        await props.fetchJobsCustom(jobSearch);
        setErrorMessage("")
        setLoading(false);

    }

    const classes= useStyles()
    return (
        <Box borderRadius= "5px" boxShadow= "0px 1px 5px rgba(0,0,0,0.1)" p={2} mt={-5} mb={2} bgcolor="white">
            <Box className={classes.wrapper}>
                <Select placeHolder="Job Type" onChange={handleChange} value={jobSearch.type} name="type" disableUnderline variant="filled">
                    <MenuItem value="Job Type">Job Type</MenuItem>
                    <MenuItem value="Full Time">Full Time</MenuItem>
                    <MenuItem value="Part Time">Part Time</MenuItem>
                    <MenuItem value ="Contract">Contract</MenuItem>
                </Select>
                <Select onChange={handleChange} value={jobSearch.category} name="category"disableUnderline variant="filled">
                    <MenuItem value="Category">Category</MenuItem>
                    <MenuItem value="BA">BA</MenuItem>
                    <MenuItem value="QA">QA</MenuItem>
                    <MenuItem value ="Software Developement">Software Developement</MenuItem>
                </Select>
                <Button disabled={loading} variant="contained" color="primary" disableElevation onClick={search}>
                    {loading ? (<CircularProgress color="secondary" size={22} />) : ("Search")}
                </Button>
            </Box>
            <Box color="red" alignItems="center" justifyContent="center" >
                <Typography >{errorMessage}</Typography>
            </Box>
        </Box>
    )
}