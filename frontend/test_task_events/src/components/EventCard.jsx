import React from 'react';
import { Card, Divider, Flex, Space, Typography } from 'antd';
import Title from 'antd/es/typography/Title';
import { Statistic } from 'antd';
import dayjs from "dayjs"
const { Countdown } = Statistic;


const { Meta } = Card;
function EventCard ({title, description, photo, date, time, onClick}) {
  return (
    <Card
      className='card'
      onClick={onClick}
      hoverable
      loading={false}
      cover={
        <>
          <div className='card-cover'>
            {/* Картинка */}
            <img
              className='card-photo'
              src={photo}
              onError={(e) => {e.target.src = 'https://www.investmango.com/img/project_soon_img.jpg';}}
            />
            {/* Полупрозрачный текст */}
            <div className='countdown'>
              {
                dayjs(`${date} ${time}`, "DD.MM.YYYY HH:mm") > dayjs()?
                <Countdown title="До начала" value={dayjs(`${date} ${time}`, "DD.MM.YYYY HH:mm")} />
                :
                <>
                {
                  dayjs().startOf('day').isSame(dayjs(date, 'DD.MM.YYYY').startOf('day'))?
                  <Title level={5}>Сегодня</Title>
                  :
                  <Title level={5}>Прошло</Title>
                }
                </>
              }
            </div>
          </div>
        </>
      }
    >
      <Title level={4}>{dayjs(date, 'DD.MM.YYYY').format('D MMMM')} {time}</Title>
      <Divider/>
      <Title level={5}>{title}</Title>
      <Meta description={description} />
    </Card>    
  )
};
export default EventCard;