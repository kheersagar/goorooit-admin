import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import addIcon from '../../images/addIcon.svg';
import ContactPreviewScreen from '../utils/ContactPreviewScreen';
import { getCurrentBanner, deleteCurrentBanner } from '../../redux/api';

const BannerTable = () => {
  const history = useHistory();
  const [bannerList, setBannerList] = useState([]);
  const [openPop, setOpenPop] = useState(false);
  const [imageLink, setImageLink] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchBannerList = async () => {
    setLoading(true);
    try {
      const { data } = await getCurrentBanner();
      setBannerList(data.banner);
      setLoading(false);
      console.log(data.banner);
    } catch (error) {
      alert('Something went wrong, please try later!');
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBannerList();
  }, []);

  const handleDeleteImage = async (id) => {
    try {
      const { data } = await deleteCurrentBanner(id);
      alert('Banner deleted');
      fetchBannerList();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ width: '90%', margin: '3rem auto' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2>Banners</h2>
        <div className='artist-addArtistDiv'>
          <button
            className='artist-addBtn'
            onClick={() => history.push('/banner/add')}
          >
            <img src={addIcon} alt='add' className='artist-addIcon' />
            <span>Add Banner</span>
          </button>
        </div>
      </div>
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <div className='table-wrapper' id='#scrollBar'>
          <table className='fl-table'>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Banner Image</th>
                <th>Active</th>
              </tr>
            </thead>
            <tbody>
              {bannerList?.map((banner, i) => (
                <tr key={banner._id}>
                  <td className='cursor'>{i + 1}</td>
                  <td
                    className='cursor viewParaLink'
                    onClick={() => {
                      setOpenPop(true);
                      setImageLink(banner.imgUrl);
                    }}
                  >
                    View
                  </td>
                  <td className='cursor'>
                    <button
                      className={`artist-blockBtn`}
                      onClick={() => handleDeleteImage(banner._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {openPop && (
        <ContactPreviewScreen
          previewImage={imageLink}
          setOpenPop={setOpenPop}
        />
      )}
    </div>
  );
};

export default BannerTable;
