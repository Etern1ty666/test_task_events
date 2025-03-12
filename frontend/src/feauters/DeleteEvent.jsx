import React from 'react';
import { Button, Popconfirm } from 'antd';
import eventsStore from '../store/EventsStore';
import { observer } from 'mobx-react-lite';
import { deleteEvent } from '../api/api';


const DeleteEvent = ({eventId, onFinish=()=>{}}) => {

    async function removeEvent () {
        eventsStore.setLoading(true);
        try{
            await deleteEvent(eventId);
            eventsStore.delete(eventId);
        }catch(error){
            console.error(error.message);
        }
        eventsStore.setLoading(false);
        onFinish();
    }

    return (
        <Popconfirm
            title="Удалить мероприятие"
            description="Удалить мероприятие? Это действие отменить нельзя"
            onConfirm={removeEvent}
            disabled={eventsStore.isLoading}
            okText="Да"
            cancelText="Нет"
        >
            <Button loading={eventsStore.isLoading} color="danger" variant="solid">Удалить мероприятие</Button>
        </Popconfirm>
    );
};
export default observer(DeleteEvent);