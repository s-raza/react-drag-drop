import React, {useState} from 'react'
import CampaignTabs from './CampaignTabs.js'
import InfluencerApp from './InfluencerApp.js'
import {transformForDND} from '../utils/DragNDropTransform.js'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    centerPage: {
        'height': '100%',
        'width': '100%',
        'position': 'fixed',
        'align-items': 'center',
        'justify-content': 'center',
        'display': 'flex',
        'flex-direction': 'column',
    },
    contentPath: {
        'position': 'sticky',
        'top': 0,
        'background-color': 'green',
        'padding': '2px',
        'color': 'white',
        'border': '8px solid',
    },
  }));

function EmptyCampaigns ({getCampaigns}) {
    const classes = useStyles();

    return (
        <div className={classes.centerPage}>
            <Button variant="outlined" color="primary" onClick={getCampaigns}>
                Click here after adding Campaigns to the Content folder
            </Button>
        </div>
    )
}

function Campaigns ({campaigns, getCampaigns, setCampaignsSent}) {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.contentPath}>Path to Content Folder: {campaigns.base_path}</div>
            { campaigns !== 0 && (campaigns.campaigns.length !== 0 ? <>
                                <InfluencerApp 
                                campaign_data={transformForDND(campaigns.campaigns)}
                                setCampaignsSent={setCampaignsSent}/>
                                <CampaignTabs
                                updateCampaigns={getCampaigns}
                                campaigns={campaigns.campaigns} />
                                </>:
                                <><EmptyCampaigns getCampaigns={getCampaigns}/></>)
            }
        </div>
    )
}

function SentConfirmation ({setCampaignsSent, getCampaigns}) {
    const classes = useStyles();
    return (
        <div className={classes.centerPage}>
            <Typography variant="h3" gutterBottom>Campaigns Sent!</Typography>
            <Button variant="outlined" color="primary" onClick={() => {setCampaignsSent(false); getCampaigns();}}>
                New Session
            </Button>
        </div>
    )
}

function Main ({campaigns, getCampaigns}) {
    const [campaignsSent, setCampaignsSent] = useState(false)

    return (
        !campaignsSent ?
        <Campaigns
        campaigns={campaigns}
        getCampaigns={getCampaigns}
        setCampaignsSent={setCampaignsSent}/> :
        <SentConfirmation setCampaignsSent={setCampaignsSent}
        getCampaigns={getCampaigns}/>
    )

}

export default Main