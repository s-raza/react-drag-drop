import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function NoAssignmentsAlert({...props}) {

  return (
    <div>
      <Dialog
        open={props.openNoAssignmentsAlert}
        onClose={props.handleNoAssignmentsGoBack}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Nothing to send"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Nothing assigned to Infleuncers
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleNoAssignmentsGoBack} color="primary" autoFocus>
            Go back
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default NoAssignmentsAlert