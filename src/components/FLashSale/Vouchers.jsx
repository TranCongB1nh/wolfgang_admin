import React, { useEffect, useState } from 'react';
import './FlashSale.css';

export const Vouchers = () => {
  const [data, setData] = useState([]);
  const [condition, setCondition] = useState();
  const [price, setPrice] = useState();
  const [expDate, setExpDate] = useState();
  const [quantity, setQuantity] = useState();

  const getData = async () => {
    await fetch(process.env.REACT_APP_API_URL  + '/vouchers')
    .then((res) => res.json())
    .then((res) => {
      setData(res);
    })
    .catch(err => {
      console.log(err);
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log({
    //   condition,
    //   price,
    //   expDate,
    //   quantity
    // })
    await fetch(process.env.REACT_APP_API_URL + '/vouchers', {
      method: "POST",
      body: JSON.stringify({
        condition,
        price,
        expDate,
        quantity
      }),
      headers: { 'Content-type': 'application/json' }
    })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
    await getData();
  }

  useEffect(() => {
    getData();
  }, [])
  return (
    <div className='section flashsale'>
        <form onSubmit={handleSubmit} className='fs-left'>
          <h1>Thêm voucher mới</h1>
          <div className='group-input'>
            <span>Đơn tối thiểu</span>
            <input type='number' step={10000} value={condition} onChange={(e) => setCondition(e.target.value)} placeholder='0' min={0} required/>
          </div>
          <div className='group-input'>
            <span>Số tiền giảm:</span>
            <input type='number' placeholder='0' value={price} onChange={(e) => setPrice(e.target.value)}  min={0} required/>
          </div>
          <div className='group-input'>
            <span>Số lượng</span>
            <input type='number' placeholder='0'  value={quantity} onChange={(e) => setQuantity(e.target.value)}  min={0} required/>
          </div>
          <div className='group-input'>
            <span>Ngày hết hạn</span>
            <input type='datetime-local' value={expDate} onChange={(e) => setExpDate(e.target.value)}  required/>
          </div>
          <button>Tạo mới</button>
        </form>
        <div className='FlashSale'>
          {data?.map(item =>   
            <div key={item._id} className='voucher'>
              <div className='content-voucher'>
                <div className='voucher-top'>
                  <span>Mã giảm giá {item.price/1000}K</span>
                  <span className='condition'>Đơn tối thiểu {item.condition/1000}K</span>
                </div>
                <div className='voucher-bottom'>
                  <span>Hết hạn vào {(new Date(item.expDate)).toLocaleString('vi-VN')}</span>
                </div>
              </div>
            </div>
          )}
        </div>
    </div>
  )
}
