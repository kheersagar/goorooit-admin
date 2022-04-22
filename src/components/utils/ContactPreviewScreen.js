import React from 'react';
import '../../styles/PreviewScreen.css';

const ContactPreviewScreen = (props) => {
  const { previewImage, setOpenPop } = props;
  return (
    <div className='preview-popup-container'>
      <div className='preview-popup-grid'>
        <button className='preview-closeBtn' onClick={() => setOpenPop(false)}>
          +
        </button>
        <div className='preview-imageDiv'>
          <img src={previewImage} alt='preview' className='preview-image' />
        </div>
      </div>
    </div>
  );
};

export default ContactPreviewScreen;
