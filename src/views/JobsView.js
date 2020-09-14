import React, {useState, useCallback} from 'react';
import {useQuery} from '@apollo/react-hooks'
import {FETCH_JOBS_LIST} from '../API';
import {Typography , Card , MenuItem, InputLabel, Select,FormControl, CardActionArea , CardActions , CardContent, CardMedia , Button, IconButton } from '@material-ui/core';
import {useStyles, BootstrapInput} from './styles';
import {useHistory} from 'react-router-dom';
import {LoadingIcon} from '../components';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import image1 from '../assets/card_back.png';
import image2 from '../assets/card_image.png';
import image3 from '../assets/card_image2.png';
import image4 from '../assets/card_image3.png';
import FailedToLoad from '../assets/failedtoload_image.png';


export const JobsView = () => {
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState('bangalore');
  const classes = useStyles();
  const history = useHistory();
  const {loading ,error, data, refetch  } = useQuery(FETCH_JOBS_LIST,{ 
    variables: { type: "city", slug: location} 
  });
  const images= [
    image1,
    image2,
    image3,
    image4,
    ];
  
  // const [expanded, setExpanded] = useState(false);
  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };
  
  const handleChange = useCallback((event) => {
      setLocation(event.target.value);
      refetch();
  },[setLocation,refetch]);

  const handleClose = useCallback(() => {
    setOpen(false);
  },[setOpen]);

  const handleOpen = useCallback(() => {
    setOpen(true);
  },[setOpen]);
  
  const handleBackClick = useCallback(() => {
    history.push("/");
  },[history]);

  const handleApply = useCallback((applyUrl) => {
    window.open(applyUrl);
  },[]);


  if(loading){
    return <LoadingIcon open={loading}/>
  }
  
  // if(error){
  //   console.log(error.message)
  //   return <Error/>;
  // }

    return (
      <>
      <div className={classes.header} >
      <Typography variant="h4" className={classes.typoTheme} align="center"> Jobs View </Typography>
      <IconButton onClick={handleBackClick}>
        <ArrowBackIosIcon/> Back 
      </IconButton>
      </div>
      {!error ? 
      <React.Fragment>
      <div  align="center">
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Location</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={location}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          {data&& data.cities.map((item,index) => (
            <MenuItem key={index} value={item.slug}>{item.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      </div>
      <div align="center">
      { (data && data.jobs.length) ? data.jobs.map((item, index) => (
        <div key={item.id} className={classes.cardDiv}>
         <Card className={classes.root}>
         <CardActionArea>
           <CardMedia
             className={classes.media}
             image={images[Math.floor(Math.random() * images.length)]}
             title="Job_View_Image"
           />
           <CardContent>
             <Typography className={classes.typoTheme} gutterBottom variant="h5" component="h2">
              {item.title}
             </Typography>
             <Typography className={classes.typoTheme} gutterBottom variant="subtitle2" >
              Company : {item.company.name}
             </Typography>
             <Typography className={classes.typoTheme} gutterBottom variant="subtitle2" >
              Commitment : {item.commitment.title}
             </Typography>
             <Typography className={classes.typoTheme} gutterBottom variant="subtitle2" >
              Location : {item.cities[0]?.name}
             </Typography>
           </CardContent>
         </CardActionArea>
         <CardActions className={classes.applyBtn}>
           <Button size="small" color="primary" disableElevation variant="contained" onClick={(applyUrl) => handleApply(item.applyUrl) }>
             Apply
           </Button>
           {/* <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton> */}
         </CardActions>
         {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Description</Typography>
          <Typography paragraph>
              {item.description}
          </Typography>
          </CardContent>
        </Collapse> */}
       </Card>
       </div>
        )) : 
        <Typography className={classes.typoTheme} gutterBottom variant="h6" >
        Jobs not available at {location}. Please try different location.
       </Typography>
       }
        </div>
        </React.Fragment>
        :
        <div align="center"> 
        <img  src={FailedToLoad} alt="Failed To Load"/>  
        <Typography className={classes.typoTheme} variant="h4" > {error.message} </Typography>
        </div> 
        }
      </>
    );
  }