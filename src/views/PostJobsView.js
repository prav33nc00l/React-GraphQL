import React from 'react'
import {useMutation} from '@apollo/react-hooks'
import {CREATE_POST_JOB} from '../API';
import { Typography, IconButton, TextField, Button, Snackbar } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useHistory } from 'react-router-dom';
import {LoadingIcon } from '../components';
import {useStyles} from './styles';


export const PostJobsView = () => {
    const history = useHistory();
    const classes = useStyles();
    const [snackOpen, setSnackOpen] = React.useState(false);
    const [titleValue, setTitleValue] = React.useState('');
    const [companyValue, setcompanyValue] = React.useState('');
    const [locationValue, setLocationValue] = React.useState('');
    const [emailValue, setEmailValue] = React.useState('');
    const [descriptionValue, setDescriptionValue] = React.useState('');
    const [applyUrlValue, setApplyUrlValue] = React.useState('');
    const [commitmentId] = React.useState('cjuvc2urp01cf0735lk9j0e87');

    const [postJob, { loading,error}] = useMutation(CREATE_POST_JOB);
    const handleBackClick = () => {
        history.push("/");
    };

    const handleTitleChange = (event) => {
      setTitleValue(event.target.value);
    };
    const handleCompanyChange = (event) => {
      setcompanyValue(event.target.value);
    };
    const handleLocationChange = (event) => {
      setLocationValue(event.target.value);
    };
    const handleEmailChange = (event) => {
      setEmailValue(event.target.value);
    };
    const handleDescriptionChange = (event) => {
      setDescriptionValue(event.target.value);
    };
    const handleApplyUrlChange = (event) => {
      setApplyUrlValue(event.target.value);
    };
    
    const handleResetButton = () => {
      setLocationValue('');
      setTitleValue('');
      setApplyUrlValue('');
      setEmailValue('');
      setcompanyValue('');
      setDescriptionValue('');
    }
  
    const handleSubmitButton = (event) => {
        event.preventDefault();
        postJob({ variables: { title : titleValue,commitmentId, companyName: companyValue, locationNames: locationValue,userEmail: emailValue,description: descriptionValue, applyUrl: applyUrlValue} });
        handleResetButton();
        if(!error){
          setSnackOpen(true);
        }
        
    }

    if(loading){
      return <LoadingIcon open={loading}/>
    }

    if(error){
      return <Typography variant="h4" align="center"> Could not process your request! Please Try again.</Typography>
    }

  return (
    <>
    <div >
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
          autoHideDuration={2000}
      />
    </>
  );
}

