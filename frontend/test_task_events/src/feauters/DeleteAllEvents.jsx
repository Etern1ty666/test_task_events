import React from 'react';
import { Button} from 'antd';
import eventsStore from '../store/EventsStore';
import { observer } from 'mobx-react-lite';



function DeleteAllEvents () {
    async function deleteAll () {
        eventsStore.deleteAllEvents().then(
            (response) => {
              console.log(response); // Success!
            },
            (error) => {
              console.error(error); // Error!
            },
          );
    }

    return (
        <Button loading={eventsStore.isLoading} onClick={deleteAll}>Удалить все мероприятия</Button>
    )
};
export default observer(DeleteAllEvents);