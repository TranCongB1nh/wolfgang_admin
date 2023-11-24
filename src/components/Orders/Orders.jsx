import React, { useEffect, useRef, useState } from 'react'; 
import { DataGrid } from '@mui/x-data-grid'; 
import DriveFileMoveRoundedIcon from '@mui/icons-material/DriveFileMoveRounded';
import BrowserUpdatedRoundedIcon from '@mui/icons-material/BrowserUpdatedRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded'; 
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import { CustomToolbar } from '../../utils';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import ReactToPrint from "react-to-print";  
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { ComponentToPrint } from '../ComponentToPrint';

export const Orders = () => {
  const [rows, setRows] = useState([]);
  const [order, setOrder] = useState({});
  const [product, setProduct] = useState({});
  const [selected, setSelected] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const componentRef = useRef();

  const getData = async () => {
    // process.env.REACT_APP_API_URL
    await fetch(process.env.REACT_APP_API_URL + '/orders')
    .then((res) => res.json())
    .then((data) => {
      
      setRows(data.sort((a , b ) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      setLoading(false);
    })
    .catch((err) => { 
      setLoading(false);
    })
  } 
  const handleClickOk = async (_id) => {
    // http://localhost:3001/v1
    // process.env.REACT_APP_API_URL
    await fetch(process.env.REACT_APP_API_URL + '/orders/' + _id, {
        method: "PUT",
        body: JSON.stringify({status: 1}),
        headers: { 'Content-type': 'application/json' }
    })
    .then((res) => res.json())
    .then((res) => {
        var array = rows;
        for (var i = 0 ; i < array.length ; i++) {
            if (array[i]._id === _id) {
                array[i].status = 1;
                break;
            }
        }
        setRows(rows => [...array]);
    })
    .catch((err) => {
        console.log(err);
    });
  }
  const handleClickOpen = async (_id) => {

  }
 
  const columns = [
    { field: '_id', headerName: 'ID', width: 130 },
    { field: 'customerEmail', headerName: 'Email khách hàng', width: 150 }, 
    { field: 'customerName', headerName: 'Khách hàng', width: 150 }, 
    { field: 'customerPhoneNumber', headerName: 'Số điện thoại', width: 130,  }, 
    { field: 'customerAddress', headerName: 'Địa chỉ', width: 210, }, 
    { field: 'payment', headerName: 'Phương thức thanh toán', width: 180, }, 
    // { field: 'isPaid', headerName: 'Thanh toán', width: 100, }, 
    { field: 'status', headerName: 'Trạng thái', width: 130,
        renderCell: (params) => {
            return (
                <span style={{width: '100%', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '7px 10px', borderRadius: '10px', color: '#000', fontWeight: '700',backgroundColor: `${params.row.status === 0 ? '#e84393' : params.row.status === 1 ? '#f1c40f' : params.row.status === 2 ? '#9b59b6' : params.row.status === 3 ? '#2ecc71' : '#e74c3c'}`}}>
                    {params.row.status === 0 ? 'Mới' : params.row.status === 1 ? 'Đang xử lý' : params.row.status === 2 ? 'Đang giao' : params.row.status === 3 ? 'Thành công' : 'Hủy'}
                </span>
            );
        }
    }, 
    { field: 'totalCost', headerName: 'Tổng tiền', width: 130, 
        renderCell: (params) => {
            return (
                <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(params.row.totalCost)}</span>
            );
        }
    }, 
    { field: 'rated', headerName: 'Đánh giá', width: 100, 
        renderCell: (params) => { 
            return ( 
                <span style={{display: 'flex', alignItems: 'center'}}><StarRoundedIcon style={{color: '#f1c40f', marginRight: '5px'}} />{params.row.rated ? params.row.rated : '0'}</span>
            );
        }
    }, 
    { 
        field: 'createdAt',  
        headerName: 'Ngày tạo', 
        width: 130, 
        type: 'dateTime',
        valueGetter: ({ value }) => value && new Date(value),  
    },    
    {
        field: '',
        headerName: 'Hành động',
        width: 150,
        renderCell: (params) => {
            return (
                <div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    {params.row.status === 0 &&
                    
                        <button onClick={() => handleClickOk(params.row._id)} style={{cursor: 'pointer', width: '65%', height: '100%', padding: '5px', fontSize: '13px', fontWeight: '800', borderRadius: '100px', outline: 'none', border: 'none', backgroundColor: '#f1c40f',display: 'flex', alignItems: 'center', justifyContent: 'center'}}><AssignmentTurnedInRoundedIcon style={{fontSize: '20px'}} /> Duyệt</button>
                    } 
                    {Object.keys(order).length !== 0 && order._id === params.row._id && 
                        <span onClick={() => setIsOpen(true)} style={{cursor: 'pointer', margin: '0 5px', width: '30%', height: '100%', padding: '5px', fontSize: '13px', fontWeight: '800', borderRadius: '100px', outline: 'none', border: 'none', backgroundColor: '#2c3e50',display: 'flex', alignItems: 'center', justifyContent: 'center'}}><OpenInNewRoundedIcon style={{fontSize: '20px', color: '#fff'}} /></span>  
                    } 
                </div>
            );
        }
    } 
  ];


    useEffect(() => { 
        setLoading(true);
        getData();
    }, []) 

    return (
        <div className='section product-section'>
        {loading ? (
            <div style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div className='loader'></div>
            </div>
        ) : (
            <> 
            <div className={`wrapper false`}>

                {/* <div className='top-section'>
                <div className='left'> 
                </div>
                <div className='right'> 
                </div> 
                </div> */}

                <div className='body-section'  style={{position: 'relative', height: 'calc(100% - 20px)'}}> 
                    <DataGrid
                        getRowId={(row) => row._id} 
                        rowHeight={80}
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[5, 10, 25, 50, 100]} 
                        slots={{ toolbar: CustomToolbar }} 
                        onRowClick={(params) => {
                            setOrder(params.row)
                        }}
                    /> 
                    {isOpen && 
                    
                        <div className='componenttoprint'> 
                            <div style={{width: '100%', padding: '10px 0', display: 'flex', alignItems: 'center',  justifyContent: 'space-between'}}> 
                                <span onClick={() => {
                                    setIsOpen(false);
                                    setOrder({})
                                }} style={{fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center'}}><ArrowBackRoundedIcon style={{marginRight: '5px', fontSize: '20px'}} />Trở lại</span>
                                <ReactToPrint 
                                    trigger={() => { 
                                        return ( 
                                            <button style={{width: '100px', fontWeight: 'bold', padding: '5px 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',borderRadius: '20px', border: 'none', outline: 'none', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px'}}><OpenInNewRoundedIcon style={{fontSize: '20px', color: '#000', marginRight: '5px'}} />In</button>  
                                        )
                                    }} 
                                    content={() => componentRef.current}
                                />
                            </div>
                            <ComponentToPrint data={order} ref={componentRef} />
                        </div> 
                    }
                </div>
            </div>
 
            </>
        )}
        </div>
    )
}
