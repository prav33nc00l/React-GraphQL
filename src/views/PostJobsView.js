import React, {useState, useCallback}from 'react'
import {useMutation,useQuery} from '@apollo/react-hooks'
import {CREATE_POST_JOB,FETCH_COMMITMENTS_LIST} from '../API';
import { Typography, IconButton,MenuItem, Select, FormControl, InputLabel, TextField, Button, Snackbar } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useHistory } from 'react-router-dom';
import {LoadingIcon } from '../components';
import {useStyles, BootstrapInput} from './styles';


export const PostJobsView = () => {
    const history = useHistory();
    const classes = useStyles();
    const [snackOpen, setSnackOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [titleValue, setTitleValue] = useState('');
    const [companyValue, setCompanyValue] = useState('');
    const [locationValue, setLocationValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');
    const [applyUrlValue, setApplyUrlValue] = useState('');
    const [commitmentId,setCommitmentId] = useState('cjtu8esth000z0824x00wtp1i');

    const [postJob, { loading,error}] = useMutation(CREATE_POST_JOB);
    const {data} = useQuery(FETCH_COMMITMENTS_LIST);

    const handleBackClick = useCallback(() => {
        history.push("/");
    },[history]);

    const handleClose = useCallback(() => {
      setOpen(false);
    },[setOpen]);
  
    const handleOpen = useCallback(() => {
      setOpen(true);
    },[setOpen]);

    const handleChange = useCallback((event) => {
      setCommitmentId(event.target.value);
    },[setCommitmentId]);

    const handleTitleChange = useCallback((event) => {
      setTitleValue(event.target.value);
    },[setTitleValue]);

    const handleCompanyChange = (event) => {
      setCompanyValue(event.target.value);
    };
    const handleLocationChange = useCallback((event) => {
      setLocationValue(event.target.value);
    },[setLocationValue]);

    const handleEmailChange = useCallback((event) => {
      setEmailValue(event.target.value);
    },[setEmailValue]);

    const handleDescriptionChange = useCallback((event) => {
      setDescriptionValue(event.target.value);
    },[setDescriptionValue]);

    const handleApplyUrlChange = useCallback((event) => {
      setApplyUrlValue(event.target.value);
    },[setApplyUrlValue]);
    
    const handleResetButton = useCallback(() => {
      setLocationValue('');
      setTitleValue('');
      setApplyUrlValue('');
      setEmailValue('');
      setCompanyValue('');
      setDescriptionValue('');
    },[setLocationValue,setTitleValue,setApplyUrlValue,setEmailValue,setCompanyValue,setDescriptionValue]);
  
    const handleSubmitButton = useCallback((event) => {
        event.preventDefault();
        postJob({ variables: { title : titleValue,commitmentId, companyName: companyValue, locationNames: locationValue,userEmail: emailValue,description: descriptionValue, applyUrl: applyUrlValue} });
        handleResetButton();
        if(!error){
          setSnackOpen(true);
        }
        
    },[titleValue,commitmentId,companyValue,locationValue,emailValue,descriptionValue,applyUrlValue,error,postJob,setSnackOpen,handleResetButton]);

    if(loading){
      return <LoadingIcon open={loading}/>
    }

    if(error){
      return <Typography variant="h4" align="center"> Could not process your request! Please Try again.</Typography>
    }

  return (
    <>
    <div className={classes.header} >
    <Typography variant="h4" className={classes.typoTheme} align="center"> Job Form </Typography>
      <IconButton onClick={handleBackClick}>
        <ArrowBackIosIcon/> Back 
      </IconButton>
      </div>
      <div className={classes.formDiv} >
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="standard-title"
          label="Position Title"
          value={titleValue}
          variant="outlined"
          onChange={handleTitleChange}
        />
        <TextField
          id="standard-companyName"
          label="Company Name"
          value={companyValue}
          variant="outlined"
          onChange={handleCompanyChange}
        />
        <TextField
          id="standard-location"
          label="Location"
          value={locationValue}
          variant="outlined"
          onChange={handleLocationChange}
        />
        <TextField
          id="standard-email"
          label="Email"
          value={emailValue}
          variant="outlined"
          onChange={handleEmailChange}
        />
        <TextField
          id="standard-description"
          label="Description"
          value={descriptionValue}
          variant="outlined"
          rows={4}
          multiline
          onChange={handleDescriptionChange}
        />
        <FormControl className={classes.formControlPost}>
        <InputLabel id="demo-controlled-open-select-label">Commitment</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={commitmentId}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          {data&& data.commitments.map((item,index) => (
            <MenuItem key={index} value={item.id}>{item.title}</MenuItem>
          ))}
        </Select>
        </FormControl>
        <TextField
          id="standard-applyUrl"
          label="Apply Url"
          value={applyUrlValue}
          variant="outlined"
          onChange={handleApplyUrlChange}
        />
        <div className={classes.postButtonDiv}>
          <Button className={classes.viewButton} size="medium" color="primary" disableElevation variant="contained" onClick={handleResetButton} > Reset </Button>
          <Button className={classes.postButton} size="medium" color="secondary" disableElevation variant="contained" onClick={handleSubmitButton} > Submit </Button>
        </div>
        </form>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          message={"Sucessfully Posted the Job Details."}
          open={snackOpen}
          autoHideDuration={200}
      />
    </>
  );
}

