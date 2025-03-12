import React from 'react';
import { observer } from 'mobx-react-lite';

function DemoPhoto ({photo}) {
  return (
    <img
        className='demo-photo'
        alt='Проверьте ссылку'
        onError={(e) => e.target.src='https://www.investmango.com/img/project_soon_img.jpg'} // Картинка если не получилось загрузить указанную
        src={photo}
    />
  )
};
export default observer(DemoPhoto);