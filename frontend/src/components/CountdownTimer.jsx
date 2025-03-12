import React from 'react';
import { Statistic } from 'antd';
import { observer } from 'mobx-react-lite';
import Title from 'antd/es/typography/Title';
import dayjs from "dayjs"

const { Countdown } = Statistic;


function CountdownTimer ({date, time}) {
  return (
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
  )
};
export default observer(CountdownTimer);