import { makeStyles, withStyles  } from '@material-ui/core/styles';
import {InputBase} from '@material-ui/core';

export const useStyles = makeStyles ((theme) => ({
    buttonDiv: {
        justifyContent: "center",
        display: "flex",
    },
    viewButton : {
        margin: "2% 2%",
    },
    postButton : {
        margin: "2% 2%",
    },
    root: {
        maxWidth: 345,
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '40ch',
        },
    },
    media: {
        height: 180,
    },
    homeMedia: {
        height: 250,
    },
    cardDiv:{
        padding: "0 10px",
        width:"25%",
        margin: "2% 2%",
        display: "inline-block",
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    applyBtn:{
        float:"right",
    },
    formDiv:{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border:"1px solid lightgray",
        padding: "20px",
    },

    postButtonDiv: {
        justifyContent: "center",
        display: "flex",
    },
    homeRoot:{
        width:"50%",
    },
    cardAction:{
        justifyContent:"center",
    },
    typoTheme:{
        color:"#3d3660"
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        //marginTop:"50px",
    },
    formControlPost: {
        margin: theme.spacing(1),
        width: "93%",
    },
    header:{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backgroundColor: "lavender"
    }
}));

export const BootstrapInput = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }))(InputBase);