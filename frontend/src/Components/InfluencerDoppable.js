import React from 'react';
import styled from 'styled-components'
import { Droppable } from 'react-beautiful-dnd'
import CampaignDraggable from './CampaignDraggable.js'

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 220px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  padding: 8px;
`;
const CampaignList = styled.div`
  padding: 8px;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
  transition: background-color 0.2s ease;
  flex-grow: 1;
  min-height: 50px;
`;

function InfluencerDroppable ({influencer, campaigns}) {
    return (
        <Container>
            <Title>{influencer.name}</Title>
            <Droppable droppableId={influencer.id}>
                {(provided, snapshot) => (
                    <CampaignList
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    isDraggingOver={snapshot.isDraggingOver}
                    >
                        {campaigns.map( (campaign, index) => <CampaignDraggable key={campaign.id} campaign={campaign} index={index}/>)}
                        {provided.placeholder}
                    </CampaignList>
                )}
            </Droppable>
        </Container>
    );
}

export default InfluencerDroppable