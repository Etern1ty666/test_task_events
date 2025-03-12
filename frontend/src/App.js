import React, { useEffect, useState } from 'react';
import { Flex } from 'antd';
import EventCard from './components/EventCard';
import { observer } from 'mobx-react-lite';
import eventsStore from './store/EventsStore';
import EventSettings from './feauters/EventSettings';
import { LoadingOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import './assets/App.css'

function App () {

  useEffect(() => {
    eventsStore.getEvents();
  }, []);

  const [selectedEvent, setSelectedEvent] = useState(null)

  return (
    <>
      <Flex justify='center' wrap gap='large'>
        {
          eventsStore.isLoading?<LoadingOutlined />:
          <>
          {eventsStore.data.length === 0?
          <Title level={5}>Нет мероприятий</Title>
          :
          eventsStore.data.map(event => {
            return <EventCard {...event} onClick={()=>{setSelectedEvent(event);}}/>
          })
          }
          </>
        }
      </Flex>

      <EventSettings event={selectedEvent} open={selectedEvent?true:false} onFinish={()=>{setSelectedEvent(null)}}/>
    </>
  )
};
export default observer(App);