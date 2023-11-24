import React, { useEffect, useState } from 'react';
import DriveFileMoveRoundedIcon from '@mui/icons-material/DriveFileMoveRounded';
import BrowserUpdatedRoundedIcon from '@mui/icons-material/BrowserUpdatedRounded';
import './Users.css';
import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarExportContainer,
    GridCsvExportMenuItem, } from '@mui/x-data-grid';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { CustomToolbar } from '../../utils';

export const Users = () => {
    const [rows, setRows] = useState([]);
    const [user, setUser] = useState({});  

    const [fullName, setFullName] = useState('');  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState(''); 
    const [address, setAddress] = useState('');
    const [type, setType] = useState();
    const [salary, setSalary] = useState(0);
    const [role, setRole] = useState(-1);


    const [selected, setSelected] = useState([]);  
    const [loading, setLoading] = useState(false);
    const [isAdd, setIsAdd] = useState(true);  
 

    const columns = [
        { field: '_id', headerName: 'ID', width: 170 }, 
        { field: 'fullName', headerName: 'Họ tên', width: 170 }, 
        { field: 'email', headerName: 'Email', width: 170 }, 
        { field: 'gender', headerName: 'Giới tính', width: 130, renderCell: (params) => {
            return (
                <span>{params.row.gender === 0 ? 'Nam' : params.row.gender === 1 ? 'Nữ' : 'Chưa xác định'}</span>
            )
        } },  
        { field: 'role', headerName: 'Vị trí', width: 120, renderCell: (params) => {
            return (
                <span>{params.row.role === 0 ? 'Khách hàng' : params.row.role === 1 ? 'Shipper' : params.row.role === 2 ? 'Nhân viên' : params.row.role === 3 ? 'Quản lý' : 'Admin'} ({params.row.role})</span>
            )
        } },  
        { 
            field: 'createdAt',  
            headerName: 'Ngày tạo', 
            width: 170, 
            type: 'dateTime',
            valueGetter: ({ value }) => value && new Date(value),  
        },  
        { field: 'updatedAt', headerName: 'Lần cập nhật cuối', width: 170,
        type: 'dateTime', valueGetter: ({ value }) => value && new Date(value),  },   
        { field: '', headerName: '', width: 50, renderCell: (params) => { 
          return ( 
            <>
                {params.row.role !== 0 &&
                    <div onClick={() => {
                        setIsAdd(false)
                        setUser(params.row) 
                    }} className='editbutton' style={{width: '30px', height: '30px', cursor: 'pointer'}}>
                    <CreateRoundedIcon />
                    </div>
                }
            </>
          );
        }}, 
    ];

    const getData = async () => {
        await fetch(process.env.REACT_APP_API_URL + '/users')
        .then((res) => res.json())
        .then((data) => { 
            setLoading(false);
            setRows(data); 
        })
        .catch((err) => {
          // alert(err); 
            setLoading(false);
        })
    }; 
     
    
    const handleSubmit = async event => {
        event.preventDefault(); 
        // console.log({ 
        //     fullName,
        //     email,
        //     password,
        //     gender,
        //     phoneNumber,
        //     addresses: [{
        //         province,
        //         district,
        //         ward,
        //         address 
        //     }],
        //     role,
        //     type,
        //     salary
        // })
        setLoading(true);

        if (isAdd) {
            // 'http://localhost:3001/v1'
            // process.env.REACT_APP_API_URL
            await fetch( process.env.REACT_APP_API_URL + '/auth/signup', {
                method: "POST",
                body: JSON.stringify({ 
                    fullName,
                    email,
                    password,
                    gender,
                    phoneNumber,
                    address,
                    role,
                    type,
                    salary
                }),
                headers: { 'Content-type': 'application/json' }
            })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                setFullName()
                setEmail()
                setGender();
                setPhoneNumber(); 
                setPassword();
                setAddress();
                setRole();
                setType();
                setSalary();
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            })
        }
        else {
            await fetch(process.env.REACT_APP_API_URL + '/users/' + user._id, {
                method: "PUT",
                body: JSON.stringify({ 
                    fullName,
                    email,
                    gender,
                    phoneNumber,
                    address,
                    role,
                    type,
                    salary
                }),
                headers: { 'Content-type': 'application/json' }
            })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                setFullName()
                setEmail()
                setGender();
                setPassword();
                setPhoneNumber(); 
                setAddress();
                setRole();
                setType();
                setSalary();
                setIsAdd(false);    
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            })
        }
        await getData();
    };
    const handleDelete = async () => {
        for (var i = 0 ; i < selected.length ; i++) {
          setLoading(true);

          // 'http://localhost:3001/v1'
          // process.env.REACT_APP_API_URL
          await fetch( process.env.REACT_APP_API_URL + '/users/' + selected[i]._id, {
            method: "DELETE",
          })
          .then((res) => res.json())
          .then((data) => { 
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          }) 
        }
        setSelected([]);
        await getData();
    } 

    useEffect(() => {
        setLoading(true)
        getData();  
    }, []) 

    useEffect(() => {
        if (selected.length === 0) {
            setIsAdd(true);
            setFullName('')
            setEmail('')
            setGender(0);
            setPhoneNumber(''); 
            setPassword('');
            setAddress('');
            setRole(-1);
            setType('');
            setSalary(0);
            setUser({}); 
        }
        else {
            setFullName(user.fullName)
            setEmail(user.email)
            setGender(user.gender);
            setPhoneNumber(user.phoneNumber); 
            setAddress(user.address);
            setRole(user.role);
            setType(user.type);
            setSalary(user.salary);
             
        }
    }, [selected])
  
    

    return (
        <div className='section category-section'>
            {loading ? (
                <div style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                 <div className='loader'></div>
               </div>
            ) : ( 
                <div className={`wrapper`} style={{width: '100%'}}> 
                    <div className='top-section'>
                        <div className='left'>
                            {/* <div className='button'><DriveFileMoveRoundedIcon className='icon' /> Nhập danh sách</div>
                            <div className='button export'><BrowserUpdatedRoundedIcon className='icon' /> Xuất excel</div> */}
                        </div>
                        <div className='right'>
                            {Object.keys(selected).length !== 0 && 
                                <div onClick={handleDelete} className='myicon'><DeleteForeverRoundedIcon className='icon' /></div>
                            } 
                        </div> 
                    </div>

                    <div className='body-section'> 
                        <form onSubmit={handleSubmit} className='data-form'> 
                            <h1>Thông tin tài khoản</h1>
                            <div className='input-wrapper'> 
                                <label htmlFor='name'>Họ tên*</label>
                                <input type='text' required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder='Nguyễn Văn A' />
                            </div> 
                            <div className='input-wrapper'> 
                                <label htmlFor='name'>Email*</label>
                                <input type='email' required value={email} onChange={(e) => setEmail(e.target.value)} placeholder='abc@gmail.com' />
                            </div> 
                            <div className='input-wrapper'> 
                                <label htmlFor='name'>Giới tính*</label>
                                {/* <input type='text' required value={name} onChange={(e) => setName(e.target.value)} placeholder='Bàn phím custom...' /> */}
                                <div className='checkbox' style={{display: 'flex'}}> 
                                    <label htmlFor='male'>
                                        {gender === 0 ? (
                                            <input type="radio" id='male' checked onChange={(e) => setGender(e.target.value)} name='gender' value={0}  />   
                                        ) : ( 
                                            <input type="radio" id='male' onChange={(e) => setGender(e.target.value)} name='gender' value={0}  />   
                                        )} 
                                        Nam
                                    </label>
                                    <label htmlFor='female'>
                                        {gender === 1 ? (
                                            <input type="radio" id='female' checked onChange={(e) => setGender(e.target.value)} name='gender' value={1}  />   
                                        ) : ( 
                                            <input type="radio" id='female' onChange={(e) => setGender(e.target.value)} name='gender' value={1}  />   
                                        )}    
                                        Nữ
                                    </label> 
                                </div>
                            </div>
                            <div className='input-wrapper'> 
                                <label htmlFor='name'>Số điện thoại*</label>
                                <input type='text' required value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder='090xxxxxx' />
                            </div> 
                            <div className='input-wrapper'> 
                                <label htmlFor='name'>Địa chỉ*</label> 
                                
                                <input type='text' required value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Số 1 hẻm 2 đường abc...' /> 
                            </div>
                            <div className='input-wrapper'> 
                                <label htmlFor='name'>Vị trí*</label> 
                                <select onChange={(e) => setRole(Number(e.target.value))} defaultChecked={role}>
                                    <option value={-1} selected={`${role === -1 ? 'selected' : ''}`} disabled >Chọn vị trí</option>
                                    <option value={1} selected={`${role === 1 ? 'selected' : ''}`}>Shipper</option>
                                    <option value={2} selected={`${role === 2 ? 'selected' : ''}`}>Nhân viên</option>
                                    <option value={3} selected={`${role === 3 ? 'selected' : ''}`}>Quản lý</option>
                                    <option value={4} selected={`${role === 4 ? 'selected' : ''}`}>Admin</option>
                                </select>
                            </div>
                            <div className='input-wrapper flex'>
                                <div className='input-wrapper'> 
                                    <label htmlFor='name'>Hình thức</label> 
                                    <select onChange={(e) => setType(e.target.value)}  defaultValue={''}>
                                        <option value='' selected={`${type === '' ? 'selected' : ''}`} disabled >Chọn hình thức</option>
                                        <option value={'Part-time'} selected={`${type === 'Part-time' ? 'selected' : ''}`}>Part-time</option>
                                        <option value={'Full-time'} selected={`${type === 'Full-time' ? 'selected' : ''}`}>Full-time</option>
                                    </select>
                                </div>
                                <div className='input-wrapper'> 
                                    <label htmlFor='name'>Lương (đồng/h)*</label> 
                                    
                                    <input type='number' required value={salary} step="1000" onChange={(e) => setSalary(e.target.value)} min={0} placeholder='' />
                                </div>
                            </div>
                            <div className='input-wrapper'> 
                                <label htmlFor='name'>Mật khẩu*</label>
                                <input type='text' required='' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='xxxxxxx' />
                            </div> 
                            {!isAdd && <>  
                                <div className='input-wrapper'> 
                                    <label htmlFor='name'>Ngày tạo</label>
                                    <input type='text' disabled value={user?.createdAt} />
                                </div>
                                <div className='input-wrapper'> 
                                    <label htmlFor='name'>Lần cập nhật cuối</label>
                                    <input type='text' disabled value={user?.updatedAt} />
                                </div>
                            </>}
                            <div className='input-wrapper'>
                                {isAdd ? (
                                    <button className='button'>Thêm</button>
                                ) : (
                                    <button className='button'>Cập nhật</button>
                                )}
                            </div>
                        </form>

                        <div className='table-form'> 
                            <DataGrid
                                getRowId={(row) => row._id}
                                rows={rows}
                                columns={columns}
                                rowHeight={70}
                                slots={{ toolbar: CustomToolbar }}
                                initialState={{
                                    pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                    },
                                }}
                                pageSizeOptions={[5, 10, 25, 50, 100]}
                                checkboxSelection
                                onRowSelectionModelChange={(id) => { 
                                    const selectedIDs = new Set(id);
                                    const selectedRowData = rows.filter((row) => 
                                        selectedIDs.has(row._id.toString()),
                                    ); 
                                    setSelected(selectedRowData); 
                                }}      
                            /> 
                        </div>
                    </div>
                </div> 
            )}
        </div>
    )
}
