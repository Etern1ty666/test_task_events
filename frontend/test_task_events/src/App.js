import React, { useEffect, useState } from 'react';
import { Divider, Flex, Space } from 'antd';
import EventCard from './components/EventCard';
import { observer } from 'mobx-react-lite';
import eventsStore from './store/EventsStore';
import EventDetails from './feauters/EventDetails';
import DeleteAllEvents from './feauters/DeleteAllEvents';
import AddTestEvents from './feauters/AddTestEvents';
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
      <Flex justify='space-around' >
        <Space>
          {eventsStore.data.length === 0 && !eventsStore.isLoading?
          <AddTestEvents/>
          :
          <DeleteAllEvents/>
          }
        </Space>
      </Flex>

      <Divider/>
      
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

      <EventDetails event={selectedEvent} open={selectedEvent?true:false} onFinish={()=>{setSelectedEvent(null)}}/>
    </>
  )
};
export default observer(App);