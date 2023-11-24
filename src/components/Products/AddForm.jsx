import { TextField } from '@mui/material'
import React, { useEffect, useState } from 'react';
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export const AddForm = ({ setLoading, setIsAdd }) => {
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [unit, setUnit] = useState('');
    const [desc, setDesc] = useState('');
    const [config, setConfig] = useState('');
    const [imageUrl, setImageUrl] = useState(null);
    const [imageList, setImageList] = useState(null);
    const [costPrice, setCostPrice] = useState(0);
    const [normalPrice, setNormalPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [size, setSize] = useState([]);

    const [previewSource, setPreviewSource] = useState();
    const [previewSources, setPreviewSources] = useState([]);

    const [isAddCategory, setIsAddCategory] = useState(false);
    const [isDesc, setIsDesc] = useState(true);
    const [error, setError] = useState('');

    const [configName, setConfigName] = useState('');
    const [configDetail, setConfigDetail] = useState('');
    const [configObjects, setConfigObjects] = useState([]);

    const [addCategory, setAddCategory] = useState('');

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
    }
    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        }
    }

    const handleFilesInputChange = (e) => {
        const files = e.target.files;
        previewFiles(files);
    }
    const previewFiles = (files) => {
        // setPreviewSources([]);
        for (var i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.readAsDataURL(files[i]);
            reader.onloadend = () => {
                setPreviewSources(previewSources => [...previewSources, reader.result])
                // array.push(reader.result);
            }
        }
        // console.log(array); 
        // setPreviewSources(array); 
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!previewSource || previewSources.length === 0) return;
        await uploadImage(previewSource, previewSources);
    }
    const uploadImage = async (base64EncodedImage, base64EncodedImages) => {
        // console.log({ name, description: desc, config: document.getElementById('mytable3').innerHTML.toString(), category, brand, costPrice, normalPrice, quantity, unit, imageUrl: base64EncodedImage, imageList: base64EncodedImages })  

        setLoading(true);
        // 'http://localhost:3001/v1'
        await fetch(process.env.REACT_APP_API_URL + '/products', {
            method: "POST",
            body: JSON.stringify({ name, description: desc, config: document.getElementById('mytable3').innerHTML.toString(), category, brand, costPrice, normalPrice, quantity, unit, imageUrl: base64EncodedImage, imageList: base64EncodedImages, size }),
            headers: { 'Content-type': 'application/json' }
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.status === 500) {
                    alert(res.message);
                    setLoading(false);
                }
                else {
                    setIsAdd(false);
                    setLoading(false);
                }
            })
            .catch((err) => {
                setError(err.message);
                setIsAdd(false);
                setLoading(false);
            })
    }

    const handleSelectSize = (value) => {
        const arr = size;
        const index = arr.indexOf(value);
        if (index > -1) {
            arr.splice(index, 1);
        }
        else {
            arr.push(value)
        }
        console.log(arr);
        setSize(arr);
    }

    useEffect(() => {
        const getCategories = async () => {
            await fetch(process.env.REACT_APP_API_URL + '/categories')
                .then((res) => res.json())
                .then((data) => {
                    setCategories(data);
                })
                .catch((err) => {
                    console.log(err);
                })
        };
        const getBrands = async () => {
            await fetch(process.env.REACT_APP_API_URL + '/brands')
                .then((res) => res.json())
                .then((data) => {
                    setBrands(data);
                })
                .catch((err) => {
                    console.log(err);
                })
        };

        getCategories();
        getBrands();
    }, []);

    return (
        <form onSubmit={handleSubmit} className='body-form'>
            <div className='body-form_left'>
                <h1>Sản phẩm mới</h1>
                <div className='input-group img'>
                    <div className='imageUrl'>
                        {previewSource ? (
                            <img src={previewSource} className='previewImg' alt='chosen' />
                        ) : (
                            <ImageRoundedIcon className='icon' />
                        )}
                        <input type='file' className='imgFile' value={imageUrl} onChange={handleFileInputChange} required />
                    </div>
                </div>
                <div className='input-group'>
                    <label htmlFor='name'>Thư viện ảnh*</label>
                    <input type='file' multiple value={imageList} onChange={handleFilesInputChange} required />
                </div>
                <div className='previewFiles'>
                    {previewSources && previewSources.map((item) => (
                        <img key={item} src={item} alt='chosen' className='previewImg' />
                    ))}
                </div>
                <div className='input-group'>
                    <label htmlFor='name'>Tên sản phẩm*</label>
                    <input type='text' placeholder='Bàn phím ABCXYZ ...' value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className='input-group'>
                    <label htmlFor='category' style={{ width: '100%', display: 'flex', alignItems: 'center', paddingRight: '10px', justifyContent: 'space-between' }}>
                        Loại sản phẩm*
                        {isAddCategory ?
                            <span onClick={() => setIsAddCategory(false)} style={{ cursor: 'pointer', fontWeight: '700', color: '#9980FA' }}>Quay lại</span>
                            :
                            <span onClick={() => setIsAddCategory(true)} style={{ cursor: 'pointer', fontWeight: '700', color: '#9980FA' }}>Thêm</span>
                        }
                    </label>
                    {isAddCategory ? (
                        <div style={{ width: '100%', marginTop: '5px', display: 'flex', alignItems: 'center' }}>
                            <input type='text' style={{ flex: '3', margin: '0' }} value={addCategory} onChange={(e) => setAddCategory(e.target.value)} placeholder='Tên loại sản phẩm' />
                            <span style={{ cursor: 'pointer', fontWeight: '700', color: '#9980FA', flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '10px', padding: '5px 10px', borderRadius: '7px', backgroundColor: '#fff' }}>Thêm</span>
                        </div>

                    ) : (

                        <select onChange={(e) => setCategory(e.target.value)} defaultValue={'Chọn loại sản phẩm'} required>
                            <option value='' selected disabled>Chọn loại sản phẩm</option>
                            {categories.map(item =>
                                <option key={item._id} value={item._id} >{item.name}</option>
                            )}
                        </select>
                    )}
                </div>
                <div className='input-group'>
                    <label htmlFor='category'>Hãng sản xuất*</label>
                    <select onChange={(e) => setBrand(e.target.value)} defaultValue={'Chọn hãng'} required>
                        <option value='' selected disabled>Chọn hãng</option>
                        {brands.map(item =>
                            <option key={item._id} value={item._id} >{item.name}</option>
                        )}
                    </select>
                </div>

                <div style={{ flexDirection: 'row' }} className='input-group'>
                    <label>
                        <input type="checkbox" onChange={() => handleSelectSize('S')} />
                        S
                    </label>
                    <label>
                        <input type="checkbox" onChange={() => handleSelectSize('M')} />
                        M
                    </label>
                    <label>
                        <input type="checkbox" onChange={() => handleSelectSize('L')} />
                        L
                    </label>
                    <label>
                        <input type="checkbox" onChange={() => handleSelectSize('XL')} />
                        XL
                    </label>
                    <label>
                        <input type="checkbox" onChange={() => handleSelectSize('2XL')} />
                        2XL
                    </label>
                </div>

                <div className='input-group-flex' >
                    <div style={{ width: '49.5%' }} className='input-group'>
                        <label htmlFor='category'>Giá nhập*</label>
                        <input type='number' placeholder='0' value={costPrice} min={0} onChange={(e) => setCostPrice(e.target.value)} required />
                    </div>
                    <div style={{ width: '49.5%' }} className='input-group'>
                        <label htmlFor='category'>Giá bán*</label>
                        <input type='number' placeholder='0' value={normalPrice} min={0} onChange={(e) => setNormalPrice(e.target.value)} required />
                    </div>
                </div>
                <div className='input-group-flex' >
                    <div style={{ width: '49.5%' }} className='input-group'>
                        <label htmlFor='category'>Đơn vị</label>
                        <select value={unit} onChange={(e) => setUnit(e.target.value)} required>
                            <option value='cái' >Cái</option>
                            <option value='bộ' >Bộ</option>
                            <option value='hộp'>Hộp</option>
                        </select>
                    </div>
                    <div style={{ width: '49.5%' }} className='input-group'>
                        <label htmlFor='category'>Số lượng*</label>
                        <input type='number' placeholder='0' value={quantity} min={0} onChange={(e) => setQuantity(e.target.value)} required />
                    </div>
                </div>
                <span style={{ fontSize: '15px', color: '#e74c3c', fontStyle: 'italic', marginTop: '10px', display: 'block' }}>{error}</span>
            </div>

            <div className='body-form_right'>
                {/* <div className='button-top'>
                    <button style={{margin: '10px', borderRadius: '5px', padding: '5px 20px', border: 'none', outline: 'none'}}><CheckCircleRoundedIcon /> Tạo mới</button>
                </div> */}
                <div className='button-top'>
                    <div className='tabs'>
                        <div onClick={() => setIsDesc(true)} className={`tab ${isDesc}`}>Mô tả sản phẩm</div>
                        <div onClick={() => setIsDesc(false)} className={`tab ${!isDesc}`}>Chi tiết sản phẩm</div>
                    </div>
                    <button style={{ margin: '10px', borderRadius: '5px', padding: '5px 20px', border: 'none', outline: 'none' }}><CheckCircleRoundedIcon /> Tạo mới</button>
                </div>
                <div className='desc' style={{ height: 'calc(100% - 50px)' }}>

                    <div className={`editor ${isDesc}`} style={{ height: 'calc(100%)', overflowY: 'auto' }}>
                        <CKEditor
                            editor={
                                ClassicEditor
                            }
                            config={{
                                toolbar: [
                                    'heading',
                                    '|',
                                    'bold',
                                    'italic',
                                    'underline',
                                    'strikethrough',
                                    '|',
                                    'fontSize',
                                    'fontColor',
                                    'fontBackgroundColor',
                                    '|',
                                    'alignment',
                                    'outdent',
                                    'indent',
                                    'bulletedList',
                                    'numberedList',
                                    'blockQuote',
                                    '|',
                                    'link',
                                    'insertTable',
                                    'imageUpload',
                                    'mediaEmbed',
                                    '|',
                                    'undo',
                                    'redo',
                                ],

                            }}
                            data={desc}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setDesc(data);
                            }}
                        />
                    </div>
                    <div id="myedittable" className={`${isDesc}`}>

                        <div id='mytable3'>
                            <table>
                                <tbody>
                                    {configObjects?.map(item =>
                                        <tr key={item.configName}>
                                            <th>{item.configName}</th>
                                            <td>{item.configDetail}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className='inputs'>
                            <div className='inputs-buttons'>
                                <input type='text' value={configName} onChange={(e) => setConfigName(e.target.value)} />
                                <span>:</span>
                                <input type='text' value={configDetail} onChange={(e) => setConfigDetail(e.target.value)} />
                                <span onClick={() => {
                                    setConfigObjects(configObjects => [...configObjects, { configName, configDetail }])
                                    setConfigName('');
                                    setConfigDetail('');
                                }} className='button'>Thêm dòng</span>
                                <span onClick={() => {
                                    setConfigObjects([])
                                }} className='f5button'><RefreshRoundedIcon /></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
