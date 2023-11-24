import React, { useEffect, useState } from 'react';
import ArticleIcon from '@mui/icons-material/Article';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ChecklistRoundedIcon from '@mui/icons-material/ChecklistRounded';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';

export const OrderWidgets = ({data}) => {
    
    return (
        <div className='orders-widgets'>
            <div className='order-widget'>
                <ArticleIcon className='icon'/>
                <span>Tổng số đơn hàng</span>
                <span>{data.length}</span>
            </div> 
            <div className='order-widget'>
                <AddBoxIcon className='icon'  style={{backgroundColor: '#9b59b6'}} />
                <span>Đơn hàng mới</span>
                <span>{data.filter(item => item.status === 0).length}</span>
            </div>
            <div className='order-widget'>
                <ChecklistRoundedIcon className='icon'  style={{backgroundColor: '#f1c40f'}} />
                <span>Đơn hàng đã duyệt</span>
                <span>{data.filter(item => item.status === 1).length}</span>
            </div>
            <div className='order-widget'>
                <CheckBoxIcon className='icon'  style={{backgroundColor: '#2ecc71'}} />
                <span>Đơn hàng thành công</span>
                <span>{data.filter(item => item.status === 3).length}</span>
            </div>
            <div className='order-widget'>
                <DisabledByDefaultRoundedIcon style={{backgroundColor: '#e74c3c'}} className='icon'/>
                <span>Đơn hàng bị hủy</span>
                <span>{data.filter(item => item.status === 4).length}</span>
            </div>
        </div>
    )
}
