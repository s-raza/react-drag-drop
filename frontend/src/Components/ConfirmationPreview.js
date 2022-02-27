import React from 'react';
import CampaignTabs from './CampaignTabs.js'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    influencer: {
        background: '#2196f3',
        border: 0,
        'padding-left': '8px',
    },
  });

function ConfirmationPreview({assignments}) {
    const classes = useStyles();

    return (
        assignments.active_droppables.map((droppable) => {
        const influencer_campaigns = [] 
                
        return (
            droppable !== 'initial-campaigns' && (<div key={assignments.droppables[droppable].id}>
            
            {
                assignments.droppables[droppable].draggableIds.forEach((draggable) => 
                    influencer_campaigns.push(assignments.draggables[draggable])
                )
            }
            {influencer_campaigns.length !== 0 && <Typography color="inherit" className={classes.influencer} variant="h6" noWrap>{assignments.droppables[droppable].name}</Typography>}
            {influencer_campaigns.length !== 0 && <CampaignTabs campaigns={influencer_campaigns} />}
            </div>)
        )
        })
    )

}

export default ConfirmationPreview