import {diff} from './Sets.js'

function getVidTypes(vid_types){
    return (
        vid_types.map( vidtype => {
            return ({
                    "id": vidtype.id,
                    "vids": vidtype.vids,
            })
        })
    )
}

function getDraggables (campaigns) {
    const campaign_objects = {}
    campaigns.forEach((campaign) => {
        campaign_objects[campaign.id] = {
            "id": campaign.id,
            "desc": campaign.desc,
            "vid_types": getVidTypes(campaign.vid_types)
        }
    })
    return(campaign_objects)
}

function transformForDND (campaigns)  {

    const active_droppables = ["initial-campaigns", "Infleuncer-1","Infleuncer-2", "Infleuncer-3"]
    const all_campaigns = campaigns.map( (campaign) => campaign.id)
    const droppables = {
        "initial-campaigns": {
            "id": "initial-campaigns",
            "name": "Available Campaigns",
            "draggableIds": all_campaigns,
        },
        "Infleuncer-1": {
            "id": "Infleuncer-1",
            "name": "Infleuncer-1-name",
            "draggableIds": [],
        },
        "Infleuncer-2": {
            "id": "Infleuncer-2",
            "name": "Infleuncer-2-name",
            "draggableIds": [],
        },
        "Infleuncer-3": {
            "id": "Infleuncer-3",
            "name": "Infleuncer-3-name",
            "draggableIds": [],
        },
    }

    const draggables = getDraggables(campaigns)

    return (
        {
            "active_droppables": active_droppables,
            "all_campaigns": all_campaigns,
            "droppables": droppables,
            "draggables": draggables
        }
    )

  }

function addedCampaigns(previous, current) {

    return (diff(current, previous))

}

function removedCampaigns(previous, current) {

    return (diff(previous, current))

}

function getMergedData(previous, current) {

    if (previous === 0){
        return current
    }

    const previous_campaigns = previous.all_campaigns
    const current_campaigns = current.all_campaigns
    const campaigns_added = addedCampaigns(previous_campaigns, current_campaigns)
    const campaigns_removed = removedCampaigns(previous_campaigns, current_campaigns)

    if (campaigns_added.length !== 0) {

        const new_available_campaigns = Array.from([...previous.droppables["initial-campaigns"].draggableIds, ...campaigns_added])
        const new_all_campaigns = Array.from([...previous.all_campaigns, ...campaigns_added])

        const newDraggables = {}
        campaigns_added.forEach((campaign) => {
            newDraggables[campaign] = {
                "id": campaign,
                "desc": current.draggables[campaign].desc,
                "vid_types": [...current.draggables[campaign].vid_types]
            }
        })

        const newCampaigns = {
            ...previous,
            all_campaigns: new_all_campaigns,
            droppables: {
                ...previous.droppables,
                "initial-campaigns": {
                    ...previous.droppables["initial-campaigns"],
                    draggableIds: new_available_campaigns

                }
            },
            draggables: {
                ...previous.draggables,
                ...newDraggables,
            },
        }
        return(newCampaigns)
    }

    if (campaigns_removed.length !== 0) {

        const newDroppables = {}
        const newDraggables = previous.draggables
        const new_all_campaigns = Array.from(previous.all_campaigns)
        
        campaigns_removed.forEach( (campaign) => {
            new_all_campaigns.splice(new_all_campaigns.indexOf(campaign), 1)
            delete newDraggables[campaign]
        })

        previous.active_droppables.forEach( (droppable) => {
            const newDraggableIds = Array.from(previous.droppables[droppable].draggableIds)
            campaigns_removed.forEach( (campaign) => {
                if (newDraggableIds.includes(campaign)) {
                    newDraggableIds.splice(newDraggableIds.indexOf(campaign), 1)
                }
                newDroppables[droppable] = {
                    ...previous.droppables[droppable],
                    draggableIds: newDraggableIds
                }
            })
        })

        const newCampaigns = {
            ...previous,
            all_campaigns: new_all_campaigns,
            droppables : {
                ...previous.droppables,
                ...newDroppables,
    
                },
            draggables: {
                ...previous.draggables,
                ...newDraggables,
            },
            }
        return(newCampaigns)
    }
    return previous
}

export {transformForDND, getMergedData}