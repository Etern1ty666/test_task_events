import React from 'react';
import { observer } from 'mobx-react-lite';

function CardPhoto ({photo}) {
  return (
    <img
        className='card-photo'
        src={photo}
        onError={(e) => {e.target.src = 'https://www.investmango.com/img/project_soon_img.jpg';}} // Картинка если не получилось загрузить указанную
    />
  )
};
export default observer(CardPhoto);