import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
});

const Container = props => <Grid container direction="row" justify="flex-start" {...props} />;
const Item = props => <Grid item xs='auto' sm='auto' md='auto' {...props} />;

const Vids = withStyles(styles) (
  ({vids_array, classes}) => {
    return (
      vids_array.map( (vid, idx) => {
        return (
          <div key={idx}>{vid}</div>
        )
      }
      )
    )
  }
)

const VidTypesItems = withStyles(styles) (
  ({vid_type_dict, classes}) => {
    return (
      <div>
      <h2>{vid_type_dict.id}</h2>
      <Vids vids_array={vid_type_dict.vids} />
      </div>
    )
  })

const GridItem = withStyles(styles)(
  ({vid_types, classes}) => {
  return(
    vid_types.map((vid_type) => {
      return (
        <Item key={vid_type.id}>
          <Paper className={classes.paper}><VidTypesItems vid_type_dict={vid_type} /></Paper>
        </Item>
      )
  })
  )
});


function VidTypeGrid({ classes, vid_types }) {

  return (
    <div className={classes.root}>
      <Container spacing={vid_types.length}>
        <GridItem vid_types={vid_types} classes={classes}/>
      </Container>
    </div>
  )
}

export default withStyles(styles)(VidTypeGrid);
