import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import NoAssignmentsAlert from './NoAssignmentsAlert.js';
import ConfirmationPreview from './ConfirmationPreview.js';
import ConfirmationSubmit from './ConfirmationSubmit.js';
import {arrayItemsSame} from '../utils/Sets.js'

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  submitButton: {
    'margin': '8px',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function FullScreenDialog({influencer_assignments, setCampaignsSent}) {
  const classes = useStyles();
  const [openPreview, setOpenPreview] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [openNoAssignmentsAlert, setOpenNoAssignmentsAlert] = useState(false);
  

  const handleOpenPreview = () => {
    if (arrayItemsSame(influencer_assignments.all_campaigns,
      influencer_assignments.droppables['initial-campaigns'].draggableIds)) {
        setOpenNoAssignmentsAlert(true);
      }
    else {
      setOpenPreview(true);
      setOpenNoAssignmentsAlert(false);
    }
    };

  const handleClosePreview = () => {
    setOpenPreview(false);
  };

  const handleSubmit = () => {
    fetch( '/campaigns', {
      headers: {
        'Content-Type': 'application/json'
      }, 
      method: 'POST',
      body: JSON.stringify(influencer_assignments['droppables']),
    }).then(res => res.json()).then(data => {
      return(data);
    });
    setOpenConfirmation(false)
    setOpenPreview(false)
    setCampaignsSent(true)
  };

  const handleCancel = () => {
    setOpenConfirmation(false)
    setOpenPreview(false)
  };

  const handleConfirm = () => {
    setOpenConfirmation(true);
  };

  const handleNoAssignmentsGoBack = () => {
    setOpenNoAssignmentsAlert(false);
  }

  return (
    <div>
      <NoAssignmentsAlert
          handleNoAssignmentsGoBack={handleNoAssignmentsGoBack}
          openNoAssignmentsAlert={openNoAssignmentsAlert}
        />
      <Button variant="outlined" color="primary" onClick={handleOpenPreview} className={classes.submitButton}>
        Submit
      </Button>
      <Dialog fullScreen open={openPreview} onClose={handleClosePreview} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClosePreview} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Confirm Campaign Assignments
            </Typography>
            <Button color="primary" variant="contained" onClick={handleConfirm}>
              Confirm
            </Button>
            <Button autoFocus color="secondary" variant="contained" onClick={handleClosePreview}>
              Modify
            </Button>
          </Toolbar>
        </AppBar>
        <ConfirmationSubmit
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
          openConfirmation={openConfirmation}
          campaigns_not_sent={influencer_assignments.droppables['initial-campaigns'].draggableIds}
        />
        <ConfirmationPreview assignments={influencer_assignments} />
      </Dialog>
    </div>
  );
}

export default FullScreenDialog