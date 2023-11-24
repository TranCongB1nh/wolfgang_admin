import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import StarRoundedIcon from '@mui/icons-material/StarRounded';

export const OrdersTable = ({data, cate, products}) => {
    const [topCate, setTopCate] = useState([]); 
    const [total, setTotal] = useState(0); 

    const countTopCate = async () => {
        const array = [];
        for (let i = 0 ; i < cate.length ; i++) {
            const sum = products.reduce((accumulator, object) => {
                if (object.category._id === cate[i]._id)
                    return accumulator + (Number(object.sold) * Number(object.salePrice));
                return accumulator + 0;
            }, 0);
            array.push({name: cate[i].name, sum}); 
        }  
        await array.sort((a, b) => b.sum - a.sum);
        const sum = await array.reduce((accumulator, object) => { 
            return accumulator + object.sum; 
        }, 0);
        await setTotal(sum);
        await setTopCate([...array.slice(0, 3)])  
    }

    useEffect(() => {   
        countTopCate();
    }, [topCate])

    return (
        <div className='orders-table'>
            <div className='left'>
                <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                    <span>Các đơn hàng gần đây</span>
                    <NavLink to="/admin/orders">Tất cả</NavLink>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th align='left'>ID</th>
                            <th align='left'>Email</th>
                            <th align='left'>Khách hàng</th>
                            <th align='center'>Đánh giá</th>
                            <th align='center'>Trạng thái</th>
                            <th align='right'>Ngày tạo</th>
                            <th align='right'>Tổng tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.sort((a, b) => (new Date(b.createdAt)).getTime() - (new Date(a.createdAt)).getTime()).map(item => 
                            <tr>
                                <td>{item._id}</td>
                                <td>{item.customerEmail}</td>
                                <td>{item.customerName}</td>
                                <td align='center'>
                                    <span style={{display: 'flex',fontSize: '13px', alignItems: 'center',  fontWeight: '600', justifyContent: 'center'}}><StarRoundedIcon style={{color: '#f1c40f',  marginRight: '5px',}} />({item.rated ? item.rated : '0'})</span>
                                </td>
                                <td align='center'>
                                    <span style={{width: '100%', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '7px 10px', borderRadius: '10px', color: '#000', fontWeight: '700',backgroundColor: `${item.status === 0 ? '#e84393' : item.status === 1 ? '#f1c40f' : item.status === 2 ? '#9b59b6' : '#fff'}`}}>
                                        {item.status === 0 ? 'Mới' : item.status === 1 ? 'Đang xử lý' : item.status === 2 ? 'Đang giao' : item.status === 3 ? 'Thành công' : 'Hủy'}
                                    </span>
                                </td>
                                <td align='right'>
                                    {(new Date(item.createdAt)).toLocaleString('vi-VN')}
                                </td>
                                <td align='right'>
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.totalCost)}
                                </td>
                            </tr>    
                        )}
                    </tbody>
                </table>
            </div>

            <div className='right'>
                <div className='right-top'>
                    <div style={{width: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between'}}>
                        <span>Top danh mục sản phẩm</span>
                        <span style={{fontWeight: '500', fontSize: '18px'}}>
                            {topCate.reduce((accumulator, object) => { 
                                return accumulator + object.sum; 
                            }, 0)/1000}k VND
                        </span>
                    </div>
                    <div style={{width: '100%', marginTop: '10px'}}>
                        <div style={{width: '100%', marginTop: '10px'}}>
                            <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}> 
                                <span style={{fontSize: '14px', fontWeight: '700'}}>{topCate[0]?.name}</span>
                                <span style={{fontSize: '14px', fontWeight: '700'}}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(topCate[0]?.sum)}</span>
                            </div>
                            <div style={{width: '100%', height: '20px', position: 'relative', marginTop: '10px', borderRadius: '1000px', backgroundColor: 'rgb(35,35,51)'}}>
                                <div style={{position: 'absolute', borderRadius: '1000px', left: 0, height: '100%', top: 0, width: `${(topCate[0]?.sum * 100)/total}%`, backgroundColor: '#9b59b6', zIndex: '2'}}>

                                </div>
                            </div>
                        </div>
                        <div style={{width: '100%', marginTop: '25px'}}>
                            <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}> 
                                <span style={{fontSize: '14px', fontWeight: '700'}}>{topCate[1]?.name}</span>
                                <span style={{fontSize: '14px', fontWeight: '700'}}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(topCate[1]?.sum)}</span>
                            </div>
                            <div style={{width: '100%', height: '20px', position: 'relative', marginTop: '10px', borderRadius: '1000px', backgroundColor: 'rgb(35,35,51)'}}>
                                <div style={{position: 'absolute', borderRadius: '1000px', left: 0, height: '100%', top: 0, width: `${(topCate[1]?.sum * 100)/total}%`, backgroundColor: '#f1c40f', zIndex: '2'}}>

                                </div>
                            </div>
                        </div>
                        <div style={{width: '100%', marginTop: '25px'}}>
                            <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}> 
                                <span style={{fontSize: '14px', fontWeight: '700'}}>{topCate[2]?.name}</span>
                                <span style={{fontSize: '14px', fontWeight: '700'}}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(topCate[2]?.sum)}</span>
                            </div>
                            <div style={{width: '100%', height: '20px', position: 'relative', marginTop: '10px', borderRadius: '1000px', backgroundColor: 'rgb(35,35,51)'}}>
                                <div style={{position: 'absolute', borderRadius: '1000px', left: 0, height: '100%', top: 0, width: `${(topCate[2]?.sum * 100)/total}%`, backgroundColor: '#e74c3c', zIndex: '2'}}>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='right-bottom'>
                    <div style={{width: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between'}}>
                        <span>Sản phẩm bán chạy</span>
                        <NavLink to="/admin/products">Tất cả</NavLink>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th align='left'>ID</th>
                                <th align='left'>Hình ảnh</th> 
                                <th align='left'>Sản phẩm</th> 
                                <th align='center'>Đánh giá</th>  
                                <th align='right'>Đã bán</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products?.map(item => 
                                <tr key={item._id}>
                                    <td>{item.id}</td>
                                    <td align='center'>
                                        <img
                                            src={item.imageUrl}
                                            alt="product"
                                            width={50}
                                            height={50}
                                            style={{borderRadius: '10px'}}
                                        />
                                    </td>
                                    <td>{item.name}</td> 
                                    <td align='center'>
                                        <span style={{display: 'flex',fontSize: '13px', alignItems: 'center',  fontWeight: '600', justifyContent: 'center'}}><StarRoundedIcon style={{color: '#f1c40f',  marginRight: '5px',}} />({item.rated ? item.rated : '0'})</span>
                                    </td>  
                                    <td align='right'>
                                        {item.sold}
                                    </td>
                                </tr>    
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
