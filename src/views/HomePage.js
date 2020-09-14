import React from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Button, Card ,CardActionArea , CardActions , CardMedia, CardContent  } from '@material-ui/core';
import {useStyles} from './styles';

export const HomePage =()=> {
  const history = useHistory();
  const classes=useStyles();

  const handleViewButton = () => {
    history.push("/jobs");
  }

  const handlePostButton = () => {
    history.push("/postJobs");
  }
  return (
    <>
    <Typography className={classes.typoTheme} variant="h4" align="center"> Job-O-Finder </Typography>
    <div className={classes.buttonDiv}>
    <Card className={classes.homeRoot}>
         <CardActionArea>
           <CardMedia
             className={classes.homeMedia}
             image={require("../assets/wallpaper.png")}
             title="Job_Home_Image"
           />
         </CardActionArea>
         <CardContent>
          <Typography className={classes.typoTheme}  variant="h5" align="center" >
              One place for all your future endevours!
          </Typography>
          </CardContent>
         <CardActions className={classes.cardAction} >
          <Button className={classes.viewButton} size="large" disableElevation color="primary" variant="contained" onClick={handleViewButton} > View Jobs </Button>
          <Button className={classes.postButton} size="large" disableElevation color="secondary" variant="contained" onClick={handlePostButton} > Post a Job </Button>
         </CardActions>
       </Card>
    
    </div>

    </>
  );
}

