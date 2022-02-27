import React, {useState, useEffect, useCallback } from 'react';
import styled from 'styled-components'
import InfluencerDroppable from './InfluencerDoppable.js'
import { DragDropContext } from 'react-beautiful-dnd'
import {getMergedData} from '../utils/DragNDropTransform.js'
import FullScreenDialog from './FullScreenDialog.js'

const Container = styled.div`
  display: flex;
`;

function InfluencerApp ({campaign_data, setCampaignsSent}) {
    
    const [data, setData] = useState(0)

    useEffect(() => {
        
        setData(getMergedData(data, campaign_data))
        // eslint-disable-next-line
      }, [campaign_data])

    const onDragEndHandler = useCallback((result) => {
        // console.log("result", JSON.stringify(result))

        const {destination, source, draggableId} = result;

        if (!destination){
            return;
        }

        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) {
            return;
        }


        const droppableStart = data.droppables[source.droppableId];

        const droppableFinish = data.droppables[destination.droppableId];

        if (droppableStart === droppableFinish) {

            const newDraggableIds = Array.from(droppableStart.draggableIds);
        
        
            newDraggableIds.splice(source.index, 1);
        
            newDraggableIds.splice(destination.index, 0, draggableId);
        
            const newDraggable = {
            ...droppableStart,
            draggableIds : newDraggableIds,
            }
        
            const newData ={
            ...data,
            droppables: {
                ...data.droppables,
                [newDraggable.id]: newDraggable,
        
            },
            };
        
            setData(newData)
        
            return;
        }


          const startDraggableIds = Array.from(droppableStart.draggableIds);

          startDraggableIds.splice(source.index, 1);

          const newStartDraggables = {
            ...droppableStart,
            draggableIds: startDraggableIds,
          };

          const finishDraggableIds = Array.from(droppableFinish.draggableIds);

          finishDraggableIds.splice(destination.index, 0, draggableId)

          const newFinishDraggables = {
            ...droppableFinish,
            draggableIds: finishDraggableIds,
          };

          const newData = {
            ...data,
            droppables: {
              ...data.droppables,
              [newStartDraggables.id]: newStartDraggables,
              [newFinishDraggables.id]: newFinishDraggables,
            },
          };

          setData(newData)

        }, [data]);

    return (
        <DragDropContext
        onDragEnd={onDragEndHandler}>
          {data !== 0 && <FullScreenDialog
                        influencer_assignments={data}
                        setCampaignsSent={setCampaignsSent}/>}
        <Container>
            { data !== 0 &&
                data.active_droppables.map( (droppableId) => {
                const droppable = data.droppables[droppableId]
                const draggables = droppable.draggableIds.map(draggableId => data.draggables[draggableId])
                
                return (
                <InfluencerDroppable key={droppable.id} 
                            influencer={droppable}
                            campaigns={draggables}/>
                )
            })
            }
            
        </Container>
        </DragDropContext>
        )
}

export default InfluencerApp