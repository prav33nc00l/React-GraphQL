import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useStyles} from './styles';

export const LoadingIcon = ( { open }) => {
  const classes = useStyles();
  return (
    <>
    <Backdrop className={classes.backdrop} open={open} >
        <CircularProgress color="inherit" />
    </Backdrop>
    </>
  );
}
