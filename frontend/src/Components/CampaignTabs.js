import React, { useState } from 'react';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import VidTypeGrid from './VidTypeGrid.js'

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  tabContent: {
    padding: theme.spacing(2),
    color: 'black'
  }
});

function TabContent({campaign}){
  return(
    <VidTypeGrid vid_types={campaign.vid_types} />
  )
}

function CampaignTabs({ classes, campaigns, ...props}) {
  const [value, setValue] = useState(0);

  const onChange = (e, value) => {
    if (props.updateCampaigns) props.updateCampaigns();
    setValue(value);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={onChange} >
          {
            campaigns.map((campaign, idx) => {
              return (<Tab key={campaign.id} label={campaign.id} />)
          })}
        </Tabs>
      </AppBar>
      {campaigns.map(
        (campaign, idx) =>
          {
            return (
              value === idx && (
                <Typography key={idx} component="div" className={classes.tabContent}>
                  <TabContent campaign={campaign}/>
                </Typography>
                )
              )
          }
        )
      }
    </div>
  );
}

export default withStyles(styles)(CampaignTabs);
