import React, { useEffect, useState } from 'react';
import './Slides.css';

import { Swiper, SwiperSlide } from 'swiper/react'; 
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
 
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';
import { NavLink } from 'react-router-dom';

export const Slides = () => {
  
  const [data, setData] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewSource, setPreviewSource] = useState();

  const getData = async () => {
    setLoading(true);

    // 'http://localhost:3001/v1'
    // rocess.env.REACT_APP_API_URL
    await fetch(process.env.REACT_APP_API_URL + '/slides')
    .then((res) => res.json())
    .then((res) => {
      setLoading(false)
      setData(res);
    })
    .catch((err) => {
      setLoading(false)
      console.log(err);
    })
  }
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

  const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      if (!previewSource) return;
      await uploadImage(previewSource); 
  }
  const uploadImage = async (base64EncodedImage) => {    
      // 'http://localhost:3001/v1'
      // process.env.REACT_APP_API_URL
      await fetch(process.env.REACT_APP_API_URL + '/slides', {
          method: "POST",
          body: JSON.stringify({ url: '/', image: base64EncodedImage}),
          headers: { 'Content-type': 'application/json' }
      })
      .then((res) => res.json())
      .then((res) => {
          setPreviewSource();
          setIsOpen(false);
          setLoading(false);
      })
      .catch((err) => { 
        console.log(err);
        setLoading(false);
      }) 
      await getData();
  }
  const handleDelete = async (id) => {
    setLoading(true);
    await fetch(process.env.REACT_APP_API_URL + '/slides/' + id, {
        method: "DELETE", 
    })
    .then((res) => res.json())
    .then((res) => {
      setLoading(false);
    })
    .catch((err) => {
      setLoading(false);
    })
    await getData();
  } 

  useEffect(() => {
    getData();
  }, [])

  return (
    <div className='section slides-section'>
      <div className='top-slides'>
        <div onClick={() => setIsOpen(true)} className='widget-add-slide'>
          <AddCircleRoundedIcon className='myicon' />
        </div>
        {data?.map(item =>  
          <div key={item._id} className='widget-add-slide'>
              <div className='img-wrapper'> 
                <img
                  src={item.image}
                  alt='slide'
                />
              </div>
              <button onClick={() => handleDelete(item._id)}><CancelRoundedIcon className='close-btn' /></button>
          </div>
        )}
      </div>
      <Swiper
        spaceBetween={30}
        loop={true}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {data?.map(item =>  
          <SwiperSlide key={item._id + 1}>
            <img
              src={item.image}
              alt='slide'
            />
          </SwiperSlide>    
        )} 
      </Swiper>
      <div className={`layer ${isOpen}`}></div>
      <div className={`slides-form ${isOpen}`}>
        {loading ? (
          <div style={{width: '100%', height: '400px', aspectRatio: '1/1', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div className='loader'></div>
          </div>
        ) : (
          <> 
            <div onClick={() => setIsOpen(false)} style={{width: '100%', textAlign: 'right'}}>
              <CancelRoundedIcon className='close-btn' />
            </div>
            <div>
              <div className='image-wrapper'>
                <div className='img-placeholder'> 
                  {!previewSource ? (
                    <ImageRoundedIcon className='icon'/>
                  ) : (
                    <img src={previewSource} className='previewImg' alt='chosen'/>
                  )}
                </div>
                <input type='file' value={imageUrl} onChange={handleFileInputChange}/>
              </div>
              <span onClick={handleSubmit} style={{marginTop: '20px', marginBottom: '30px', cursor: 'pointer', width: '100%', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '1000px', backgroundColor: '#9b59b6', fontSize: '16px', fontWeight: '700', color: '#000'}}>Thêm</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
