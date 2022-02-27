import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd'

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${props => (props.isDragDisabled ? 
    'lightgrey' : props.isDragging ? 'lightgreen': 'white')};
  display: flex;
`;

function CampaignDraggable ({campaign, index}) {
    return (
        <Draggable draggableId={campaign.id} index={index}>
            { (provided, snapshot) => (
                <Container
                ref={provided.innerRef}
                {...provided.draggableProps}
                isDragging={snapshot.isDragging}
                {...provided.dragHandleProps}
                >
                    {campaign.id}
                </Container>
            )}
        </Draggable>
    );
}

export default CampaignDraggable