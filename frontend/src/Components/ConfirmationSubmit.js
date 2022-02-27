import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function NotSentCampaigns ({campaigns}) {
    return (<>Following Campaigns are not assigned to any Infleuncer<br/>
        {campaigns.map((campaign, idx) => {
            return (
            <div key={idx}>{campaign}</div>
            )
        })}</>
    )
}

function ConfirmationSubmit({...props}) {

  return (
    <div>
      <Dialog
        open={props.openConfirmation}
        onClose={props.handleCloseConfirmation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Send Videos to Infleuncers?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" component={'div'}>
            {props.campaigns_not_sent.length !== 0 && <NotSentCampaigns campaigns={props.campaigns_not_sent} />}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleSubmit} color="primary">
            Start Sending
          </Button>
          <Button onClick={props.handleCancel} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConfirmationSubmit