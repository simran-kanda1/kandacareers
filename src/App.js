import React, { useState, useEffect } from "react";
import { Box , Button, CircularProgress, Grid, ThemeProvider } from "@material-ui/core";
import theme from "./theme/theme";
import SearchBar from "./components/SearchBar";
import Header from "./components/Header";
import JobCard from "./components/Job/JobCard";
import NewJobModal from "./components/Job/NewJobModal";
import { firestore, app } from './firebase/config';
import { Close as CloseIcon, PinDropSharp } from '@material-ui/icons';
import ViewJobModal from "./components/Job/ViewJobModal";

export default () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [customSearch, setCustomSearch] = useState(false)
  const [newJobModal, setNewJobModal] = useState({})
  const [viewJob, setViewJob]= useState({});

  const fetchJobs = async () => {
    setCustomSearch(false)
    setLoading(true)
    const req = await firestore
      .collection("jobs")
      .orderBy('postedOn','desc')
      .get();
    const tempJobs = req.docs.map((job) => ({ ...job.data() , 
      id: job.id , 
      postedOn: job.data().postedOn.toDate() }));
    setJobs(tempJobs);
    setLoading(false)
  };

  const fetchJobsCustom = async (jobSearch) => {
    setLoading(true);
    setCustomSearch(true);
    const req = await firestore
      .collection("jobs")
      .orderBy('postedOn','desc')
      .where("type", '==', jobSearch.type)
      .where("category", '==', jobSearch.category)
      .get();
    const tempJobs = req.docs.map((job) => ({ ...job.data() , 
      id: job.id , 
      postedOn: job.data().postedOn.toDate() }));
    setJobs(tempJobs);
    setLoading(false)
  }

  const applyJob = async (resumeDetails, jobTitle) => {
    await firestore.collection("resumes")
      .add({...resumeDetails, ...jobTitle})
  }


  useEffect(() => {
    fetchJobs();
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Header/>
      <ViewJobModal job={viewJob} closeModal={() => setViewJob({})} ></ViewJobModal>
      <NewJobModal job={newJobModal} closeModal= {() => setNewJobModal({})} newJobModal={newJobModal} applyJob={applyJob}/>
      <Box mb={3}>
        <Grid container justifyContent="center">
          <Grid item xs={10}>
            <SearchBar fetchJobsCustom={fetchJobsCustom} ></SearchBar>

            {loading ? (
              <Box display="flex" justifyContent="center"> <CircularProgress /> 
              </Box>

            ) : (
              <>
              {customSearch && (   
                <Box my={2} display="flex" justifyContent="flex-end">
                  <Button onClick={fetchJobs}>
                    <CloseIcon size={20} />
                    Custom Search
                  </Button>
                  </Box>
              )}
              {jobs.map((job) => (
                <JobCard 
                  open={() => setViewJob(job)} key={job.id} {...job} 
                  openNewJobModal= {() => setNewJobModal(job)} key1={job.id} {...job}
                
                />
              ))}
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};
