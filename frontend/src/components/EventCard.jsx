import React from 'react';
import { Card, Divider } from 'antd';
import Title from 'antd/es/typography/Title';
import dayjs from "dayjs"
import { observer } from 'mobx-react-lite';
import CountdownTimer from './CountdownTimer';
import CardPhoto from './CardPhoto';

const { Meta } = Card;




function EventCard ({title, description, photo, date, time, onClick}) {

  //Обложка карточки
  const Cover = (
    <>
      <div className='card-cover'>
        {/* Картинка */}
        <CardPhoto photo={photo} />
        {/* Отсчет времени */}
        <CountdownTimer date={date} time={time} />
      </div>
    </>
  )


  return (
    <Card
      className='card'
      onClick={onClick}
      hoverable
      loading={false}
      cover={Cover}
    >
      {/* Описание */}
      <Title level={4}>{dayjs(date, 'DD.MM.YYYY').format('D MMMM')} {time}</Title>

      <Divider/>

      <Title level={5}>{title}</Title>
      <Meta description={description} />
    </Card>    
  )
};
export default observer(EventCard);