import './Header.css';

import React from 'react';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';

export const Header = () => {
  return (
    <div className='header'> 
        <div className='input'>
            <input type='text' placeholder='Bạn đang tìm gì...?'/>
        </div>
        <div className='actions'>
            <div className='notify'>
                <NotificationsRoundedIcon className='icon' />
            </div>
            <div className='user'>
                
            </div>
        </div>
    </div>
  )
}
