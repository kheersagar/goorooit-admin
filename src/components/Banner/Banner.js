import React, { useState, useRef, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import LoadingPage from '../utils/LoadingPage';
import {
  uploadBanner,
  getCurrentBanner,
  deleteCurrentBanner,
} from '../../redux/api';
import '../../styles/Banner.css';

const Banner = () => {
  const history = useHistory();
  const [imageFile, setImageFile] = useState(null);
  const [tempFile, setTempFile] = useState(null);
  const [currentFile, setCurrentFile] = useState(false);
  const [bannerList, setBannerList] = useState([]);
  const [loading, setLoading] = useState(false);
  const imageInput = useRef(null);

  const handleOpenSelector = () => {
    imageInput.current.click();
  };

  const handleImageChange = (event) => {
    const fileUploaded = event.target.files[0];
    setImageFile(fileUploaded);
    setTempFile(URL.createObjectURL(fileUploaded));
  };

  const handleSubmit = async () => {
    if (imageFile) {
      try {
        // console.log(imageFile);
        setLoading(true);
        let formData = new FormData();
        formData.append('bannerPic', imageFile);
        await uploadBanner(formData);
        setImageFile(null);
        setTempFile(null);
        setLoading(false);
        alert('Banner added!');
      } catch (error) {
        alert('Something went wrong, please try later!');
        console.log(error);
        setLoading(false);
      }
    } else {
      alert('Please add image');
    }
  };

  const handleCurrentBanner = async () => {
    try {
      setLoading(true);
      const { data } = await getCurrentBanner();
      console.log(data);
      if (data?.banner?.length > 0) {
        setCurrentFile(true);
        setBannerList(data.banner);
      } else {
        alert('Presently no banner added!');
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert('Something went wrong, please try later!');
      console.log(error);
    }
  };

  const deleteBanner = async () => {
    try {
      setLoading(true);
      const { data } = await deleteCurrentBanner();
      console.log(data);
      setLoading(false);
      alert('Banner deleted!');
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert('Something went wrong, please try later!');
    }
  };

  const removeCurrent = () => {
    setCurrentFile(null);
  };

  return (
    <div className='banner-container'>
      <div className='banner-headerDiv'>
        <h3>Add Banner Image</h3>
        {tempFile && (
          <p
            onClick={() => {
              setTempFile(null);
              setImageFile(null);
            }}
          >
            Remove
          </p>
        )}

        <p onClick={() => history.push('/banner')}>Back</p>
      </div>
      <div className='banner-contentDiv'>
        <div className='banner-imgDiv'>
          {!tempFile && !currentFile ? (
            <p className='banner-imgPara'>Click Upload to add image</p>
          ) : (
            <img
              src={tempFile ? tempFile : bannerList?.[0]?.imgUrl}
              alt='banner'
              className='banner-img'
            />
          )}
        </div>
        <div className='banner-imageUpload'>
          {!tempFile ? (
            !currentFile ? (
              <Fragment>
                <button
                  className='banner-uploadBtn'
                  type='button'
                  onClick={handleOpenSelector}
                >
                  Upload
                </button>
                <input
                  type='file'
                  accept='image/*'
                  ref={imageInput}
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
              </Fragment>
            ) : (
              ''
            )
          ) : (
            <button
              className='banner-uploadBtn'
              type='button'
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
        </div>
      </div>
      {loading && <LoadingPage />}
    </div>
  );
};

export default Banner;
