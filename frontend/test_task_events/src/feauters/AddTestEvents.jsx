import React from 'react';
import { Button} from 'antd';
import eventsStore from '../store/EventsStore';



function AddTestEvents () {
    async function add () {
            eventsStore.addTest().then(
                (response) => {
                  console.log(response); // Success!
                },
                (error) => {
                  console.error(error); // Error!
                },
              );
        }

    return (
        <Button loading={eventsStore.isLoading} onClick={add}>Добавить тестовые мероприятия</Button>
    )
};
export default AddTestEvents;