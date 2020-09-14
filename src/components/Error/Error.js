import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Error404 from '../../assets/404_image.png';
import {useStyles} from './styles';

export const Error = () => {
  const classes = useStyles();
  const history = useHistory();

  const handleReturnButton = () => {
    history.push("/");
  }
  return (
    <>
    <div align="center">
        <img  src={Error404} alt="404 Not Found"/>  
        <Typography className={classes.typoTheme} variant="h3"> 404 Not Found </Typography>
        <Typography className={classes.typoTheme} variant="h6"> Opps! Lost Somewhere? </Typography>
        <Button size="medium" color="primary" disableElevation variant="contained" onClick={handleReturnButton} > Return Home </Button>
    </div>
    </>
  );
}

