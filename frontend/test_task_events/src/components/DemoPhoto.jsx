import React from 'react';

function DemoPhoto ({photo}) {
  return (
    <img
        className='demo-photo'
        alt='Проверьте ссылку'
        onError={(e) => e.target.src='https://www.investmango.com/img/project_soon_img.jpg'}
        src={photo}
    />
  )
};
export default DemoPhoto;