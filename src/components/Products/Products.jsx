import React, { useEffect, useState } from 'react';
import './Products.css'; 
import { DataGrid } from '@mui/x-data-grid';
import { Avatar } from '@mui/material';
import DriveFileMoveRoundedIcon from '@mui/icons-material/DriveFileMoveRounded';
import BrowserUpdatedRoundedIcon from '@mui/icons-material/BrowserUpdatedRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import { AddForm } from './AddForm';
import { EditForm } from './EditForm';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import { CustomToolbar } from '../../utils';

export const Products = () => {
  const [rows, setRows] = useState([]);
  const [product, setProduct] = useState({});
  const [selected, setSelected] = useState([]); 
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    await fetch(process.env.REACT_APP_API_URL + '/products')
    .then((res) => res.json())
    .then((data) => {
      for (var i = 0 ; i < data.length ; i++) {
        data[i].category = data[i].category.name;
        data[i].brand = data[i].brand.name;
      } 
      setRows(data);
      setLoading(false);
    })
    .catch((err) => {
      // alert(err);
      setLoading(false);
    })
  }

  const handleDelete = async () => {
    for (var i = 0 ; i < selected.length ; i++) {
      setLoading(true);
      // process.env.REACT_APP_API_URL
      await fetch(process.env.REACT_APP_API_URL + '/products/' + selected[i]._id, {
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
  }
 
  const columns = [
    { field: 'id', headerName: 'ID', width: 130 },
    { 
      field: 'imageUrl', 
      headerName: 'Hình ảnh', 
      width: 130, 
      renderCell: (params) => { 
        return ( 
          <div className='cell-image'>
            <img src={params.row.imageUrl} alt='' /> 
          </div>
        );
      }
    },
    { field: 'name', headerName: 'Tên sản phẩm', width: 250 }, 
    { field: 'category', headerName: 'Loại sản phẩm', width: 160, 
    renderCell: (params) => { 
      return ( 
        <span>{params.row.category}</span>
      );
    }}, 
    { field: 'brand', headerName: 'Hãng', width: 80, }, 
    { field: 'costPrice', headerName: 'Giá nhập', width: 100, }, 
    { field: 'salePrice', headerName: 'Giá bán', width: 130, }, 
    { field: 'quantity', headerName: 'Số lượng', width: 130, }, 
    { field: 'sold', headerName: 'Đã bán', width: 100, }, 
    { field: 'rated', headerName: 'Đánh giá', width: 100, }, 
    { 
        field: 'createdAt',  
        headerName: 'Ngày tạo', 
        width: 170, 
        type: 'dateTime',
        valueGetter: ({ value }) => value && new Date(value),  
    },    
    { field: '', headerName: '', width: 50, renderCell: (params) => { 
      return ( 
        <div onClick={() => {
          setIsEdit(true)
          setProduct(params.row)
        }} className='editbutton' style={{width: '30px', height: '30px', cursor: 'pointer'}}>
          <CreateRoundedIcon />
        </div>
      );
    }}, 
  ];


  useEffect(() => { 
    setLoading(true);
    getData();
  }, [])

  useEffect(() => { 
    getData();
  }, [isAdd, isEdit, loading])

  useEffect(() => {
    if (Object.keys(selected).length !== 0) {
      console.log(selected);
    }
  }, [selected])

  return (
    <div className='section product-section'>
      {loading ? (
        <div style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div className='loader'></div>
        </div>
      ) : (
        <> 
          <div className={`wrapper ${isAdd} ${isEdit}`}>

            <div className='top-section'>
              <div className='left'>
                {/* <div className='button'><DriveFileMoveRoundedIcon className='icon' /> Nhập danh sách</div>
                <div className='button export'><BrowserUpdatedRoundedIcon className='icon' /> Xuất excel</div> */}
              </div>
              <div className='right'>
                {Object.keys(selected).length !== 0 && 
                  <div onClick={handleDelete} className='myicon'><DeleteForeverRoundedIcon className='icon' /></div>
                }
                <div onClick={(e) => setIsAdd(true)} className='button'><AddRoundedIcon className='icon' /> Tạo</div>
              </div> 
            </div>

            <div className='body-section'> 
                <DataGrid
                  rows={rows}
                  rowHeight={50}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                    },
                  }}
                  pageSizeOptions={[5, 10, 25, 50, 100]}
                  checkboxSelection
                  slots={{ toolbar: CustomToolbar }}
                  onRowSelectionModelChange={(id) => {
                    const selectedIDs = new Set(id);
                    const selectedRowData = rows.filter((row) => 
                      selectedIDs.has(row.id.toString()),
                    );
                    setSelected(selectedRowData);
                  }}      
                /> 
            </div>
          </div>

          <div className={`add-form ${isAdd} ${isEdit}`}>
            {!loading ? ( 
              <> 
                <div className='top-form'>
                    {isAdd &&  
                      <span onClick={(e) => setIsAdd(false)}> 
                        <KeyboardBackspaceRoundedIcon className='icon' />
                        Trở lại
                      </span>
                    }
                     {isEdit &&  
                     <>
                        <span onClick={(e) => setIsEdit(false)}> 
                          <KeyboardBackspaceRoundedIcon className='icon' />
                          Trở lại
                        </span>
                        <div style={{display: 'flex', alignItems: 'center'}}> 
                          <span>Ngày tạo: {(new Date(product?.createdAt)).toLocaleString('vi-VN')}</span>
                          <span>Lần cập nhật cuối: {(new Date(product?.updatedAt)).toLocaleString('vi-VN')}</span>
                        </div>
                     </>
                    }
                </div>

                {isAdd && 
                  <AddForm setLoading={setLoading} setIsAdd={setIsAdd} />
                }
                {isEdit && 
                  <EditForm setLoading={setLoading} setIsEdit={setIsEdit} product={product}/>
                }
              </>
            ) : (
              <div style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div className="loader2"></div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
