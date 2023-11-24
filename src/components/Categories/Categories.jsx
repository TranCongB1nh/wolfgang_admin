import React, { useEffect, useState } from 'react';
import DriveFileMoveRoundedIcon from '@mui/icons-material/DriveFileMoveRounded';
import BrowserUpdatedRoundedIcon from '@mui/icons-material/BrowserUpdatedRounded';
import './Categories.css';
import { DataGrid } from '@mui/x-data-grid';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

export const Categories = () => {
    const [rows, setRows] = useState([]);
    const [category, setCategory] = useState({});
    const [name, setName] = useState('');
    const [selected, setSelected] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isAdd, setIsAdd] = useState(true);
    const columns = [
        { field: '_id', headerName: 'ID', width: 130 },
        { field: 'name', headerName: 'Tên loại sản phẩm', width: 250 },
        {
            field: 'slug', headerName: 'Đường dẫn SEO', width: 250, renderCell: (params) => {
                return (
                    <span>/{params.row.slug}</span>
                )
            }
        },
        {
            field: 'createdAt', headerName: 'Ngày tạo', width: 170, renderCell: (params) => {
                return (
                    <span>{(new Date(params.row.createdAt)).toLocaleString('vi-VN')}</span>
                )
            }
        },
        {
            field: 'updatedAt', headerName: 'Lần cập nhật cuối', width: 170, renderCell: (params) => {
                return (
                    <span>{(new Date(params.row.updatedAt)).toLocaleString('vi-VN')}</span>
                )
            }
        },
        {
            field: '', headerName: '', width: 50, renderCell: (params) => {
                return (
                    <div onClick={() => {
                        setIsAdd(false)
                        setCategory(params.row)
                        setName(params.row.name)

                    }} className='editbutton' style={{ width: '30px', height: '30px', cursor: 'pointer' }}>
                        <CreateRoundedIcon />
                    </div>
                );
            }
        },
    ];

    const getData = async () => {
        await fetch(process.env.REACT_APP_API_URL + '/categories')
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

        setLoading(true);

        if (isAdd) {
            // 'http://localhost:3001/v1'
            // process.env.REACT_APP_API_URL
            await fetch(process.env.REACT_APP_API_URL + '/categories', {
                method: "POST",
                body: JSON.stringify({ name }),
                headers: { 'Content-type': 'application/json' }
            })
                .then((res) => res.json())
                .then((res) => {
                    console.log(res);
                    setName('');
                    setLoading(false);
                })
                .catch((err) => {
                    setLoading(false);
                    console.log(err);
                })
        }
        else {
            await fetch(process.env.REACT_APP_API_URL + '/categories/' + category._id, {
                method: "PUT",
                body: JSON.stringify({ name }),
                headers: { 'Content-type': 'application/json' }
            })
                .then((res) => res.json())
                .then((res) => {
                    console.log(res);
                    setIsAdd(true);
                    setCategory({});
                    setName('');
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
        for (var i = 0; i < selected.length; i++) {
            setLoading(true);

            // 'http://localhost:3001/v1'
            // process.env.REACT_APP_API_URL
            await fetch(process.env.REACT_APP_API_URL + '/categories/' + selected[i]._id, {
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
            setCategory({});
            setName('');
        }
    }, [selected])

    return (
        <div className='section category-section'>
            {loading ? (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className='loader'></div>
                </div>
            ) : (
                <div className={`wrapper`} style={{ width: '100%' }}>
                    <div className='top-section'>
                        <div className='left'>
                            <div className='button'><DriveFileMoveRoundedIcon className='icon' /> Nhập danh sách</div>
                            <div className='button export'><BrowserUpdatedRoundedIcon className='icon' /> Xuất excel</div>
                        </div>
                        <div className='right'>
                            {Object.keys(selected).length !== 0 &&
                                <div onClick={handleDelete} className='myicon'><DeleteForeverRoundedIcon className='icon' /></div>
                            }
                        </div>
                    </div>

                    <div className='body-section'>
                        <form onSubmit={handleSubmit} className='data-form'>
                            <h1>Loại sản phẩm</h1>
                            <div className='input-wrapper'>
                                <label htmlFor='name'>Tên loại sản phẩm*</label>
                                <input type='text' required value={name} onChange={(e) => setName(e.target.value)} placeholder='Áo khoác, Quần jean...' />
                            </div>
                            {!isAdd && <>
                                <div className='input-wrapper'>
                                    <label htmlFor='name'>Mã loại</label>
                                    <input type='text' disabled value={category?.id} />
                                </div>
                                <div className='input-wrapper'>
                                    <label htmlFor='name'>Đường dẫn SEO</label>
                                    <input type='text' disabled value={category?.slug} />
                                </div>
                                <div className='input-wrapper'>
                                    <label htmlFor='name'>Ngày tạo</label>
                                    <input type='text' disabled value={category?.createdAt} />
                                </div>
                                <div className='input-wrapper'>
                                    <label htmlFor='name'>Lần cập nhật cuối</label>
                                    <input type='text' disabled value={category?.updatedAt} />
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
