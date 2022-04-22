import React, { useState, useEffect } from 'react';
import moment from 'moment';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { createEvent, getProfessionals } from '../../redux/api';
import '../../styles/AddArtistForm.css';

const initialState = {
  meetingTime: moment(new Date().getTime()).format('HH:mm'),
  Date: moment(new Date()).format('YYYY-MM-DD'),
  title: '',
  amount: '',
  eventDescription: '',
  duration: '',
  profs: [],
  maxSeats: '',
};

const AddEventForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [professionalList, setProfessionalList] = useState([]);
  const [boolVal, setBoolVal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [eventImage, setEventImage] = useState(null);
  const [tempImage, setTempImage] = useState(null);
  const [selectedProf, setSelectedProf] = useState([]);
  const [selectedProfName, setSelectedProfName] = useState([]);
  const [openDrowDown, setOpenDropDown] = useState(false);

  const fetchProfessionList = async () => {
    setLoading(true);
    try {
      const { data } = await getProfessionals();
      // console.log(data);
      setLoading(false);
      setProfessionalList(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (!boolVal) {
      fetchProfessionList();
      setBoolVal(true);
    }
  }, [boolVal]);

  const handleChange = (e) => {
    const { name } = e.target;
    setFormData({ ...formData, [name]: e.target.value });
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleImageUpload = async (e) => {
    const fileUploaded = e.target.files[0];
    // const base64 = await convertBase64(fileUploaded);
    const link = URL.createObjectURL(fileUploaded);
    setTempImage(link);
    setEventImage(fileUploaded);
  };

  const handleSubmit = () => {
    let inputData = new FormData();
    inputData.append('meetingTime', formData.meetingTime);
    inputData.append('Date', moment(formData.Date).format('YYYY/MM/DD'));
    inputData.append('title', formData.title);
    inputData.append('amount', formData.amount);
    inputData.append('eventDescription', formData.eventDescription);
    inputData.append('duration', formData.duration);
    inputData.append('eventPic', eventImage);
    inputData.append(
      'maxSeats',
      formData.maxSeats > 100 ? 100 : formData.maxSeats
    );
    let count = 0,
      total = selectedProf.length;
    selectedProf.forEach(async (prof) => {
      count += 1;
      inputData.append('profs', prof);
      if (count === total) {
        try {
          await createEvent(inputData);
          setFormData(initialState);
          setEventImage(null);
          setTempImage(null);
          setSelectedProf([]);
          setSelectedProfName([]);
          alert('Event created');
          // console.log(data);
        } catch (error) {
          alert('Something went wrong, please try later!');
          console.log(error);
        }
      }
    });
    console.log(inputData);
    // try {
    //   await createEvent(inputData);
    //   setFormData(initialState);
    //   setEventImage(null);
    //   setTempImage(null);
    //   setSelectedProf([]);
    //   setSelectedProfName([]);
    //   alert('Event created');
    //   // console.log(data);
    // } catch (error) {
    //   alert('Something went wrong, please try later!');
    //   console.log(error);
    // }
  };

  const handleSelectProf = (id, name) => {
    // let id = e.target.value;
    const selectedIndex = selectedProf.indexOf(id);
    let newSelected = [];
    let newSelectedName = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedProf, id);
      newSelectedName = newSelectedName.concat(selectedProfName, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedProf.slice(1));
      newSelectedName = newSelectedName.concat(selectedProfName.slice(1));
    } else if (selectedIndex === selectedProf.length - 1) {
      newSelected = newSelected.concat(selectedProf.slice(0, -1));
      newSelectedName = newSelectedName.concat(selectedProfName.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedProf.slice(0, selectedIndex),
        selectedProf.slice(selectedIndex + 1)
      );
      newSelectedName = newSelectedName.concat(
        selectedProfName.slice(0, selectedIndex),
        selectedProfName.slice(selectedIndex + 1)
      );
    }
    setSelectedProf(newSelected);
    setSelectedProfName(newSelectedName);
    // console.log(newSelectedName);
  };

  return (
    <div className='addArtist-container'>
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <div className='addArtist-personalDetails'>
          {tempImage && (
            <div className='addEvent-imageDiv'>
              <img src={tempImage} alt='event' className='addEvent-image' />
            </div>
          )}
          <div className='addArtist-alignRow imageInput'>
            <div className='addArtist-inputFieldDiv'>
              <div className='addEvent-imageSection'>
                <label className='addArtist-inputLabel'>Event Image</label>
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleImageUpload}
                  className='addArtist-inputField'
                />
              </div>
            </div>
            <div className='addArtist-inputFieldDiv'>
              <label className='addArtist-inputLabel'>Title</label>
              <input
                type='text'
                name='title'
                value={formData.title}
                onChange={handleChange}
                placeholder='Title'
                className='addArtist-inputField'
              />
            </div>
          </div>
          <div className='addArtist-alignRow'>
            <div className='addArtist-inputFieldDiv'>
              <label className='addArtist-inputLabel'>Date</label>
              <input
                type='date'
                name='Date'
                value={formData.Date}
                onChange={handleChange}
                placeholder='Date'
                className='addArtist-inputField'
              />
            </div>
            <div className='addArtist-inputFieldDiv'>
              <label className='addArtist-inputLabel'>Meeting Time</label>
              <input
                type='time'
                name='meetingTime'
                value={formData.meetingTime}
                onChange={handleChange}
                placeholder='Time'
                className='addArtist-inputField'
              />
            </div>
          </div>
          <div className='addArtist-alignRow'>
            <div className='addArtist-inputFieldDiv'>
              <label className='addArtist-inputLabel'>Duration</label>
              <select
                className='addArtist-selectField'
                name='duration'
                value={formData.duration}
                onChange={handleChange}
              >
                <option value={'30 mins'}>30 minutes</option>
                <option value={'1 hr'}>1 hour</option>
                <option value={'1hr 30 mins'}>1hour 30 minutes</option>
                <option value={'2 hrs'}>2 hours</option>
                <option value={'2 hrs 30mins'}>2 hours 30 minutes</option>
                <option value={'3 hrs'}>3 hours</option>
              </select>
            </div>
            <div className='addArtist-inputFieldDiv'>
              <label className='addArtist-inputLabel'>Amount</label>
              <input
                type='number'
                min='1'
                name='amount'
                value={formData.amount}
                onChange={handleChange}
                placeholder='Amount'
                className='addArtist-inputField'
              />
            </div>
          </div>
          <div className='addArtist-alignRow'>
            <div className='addArtist-inputFieldDiv selectMenu'>
              <label className='addArtist-inputLabel'>Professionals</label>
              <div
                className='select-profDiv'
                onClick={() => setOpenDropDown(!openDrowDown)}
              >
                <p className='select-profNames'>
                  {selectedProf.length > 0
                    ? selectedProfName.join(', ')
                    : 'Select one or more professionals'}
                </p>
                <KeyboardArrowDownIcon className='downArrow-icon' />
              </div>
              {openDrowDown && (
                <div className='selectedProf-optionDiv'>
                  {professionalList?.map((prof) => (
                    <p
                      className={
                        selectedProf.includes(prof._id)
                          ? 'selectedOption select-options'
                          : 'select-options'
                      }
                      onClick={() => handleSelectProf(prof._id, prof.name)}
                      key={prof._id}
                    >
                      {prof.name}
                    </p>
                  ))}
                </div>
              )}
            </div>
            <div className='addArtist-inputFieldDiv'>
              <label className='addArtist-inputLabel'>Seats</label>
              <input
                type='number'
                max='100'
                name='maxSeats'
                value={formData.maxSeats}
                onChange={handleChange}
                placeholder='Seats (max 100)'
                className='addArtist-inputField'
              />
            </div>
          </div>
          <div className='addArtist-alignRow'>
            <div className='addArtist-inputFieldDiv textArea-div'>
              <label className='addArtist-inputLabel'>Event Description</label>
              <textarea
                rows='3'
                name='eventDescription'
                value={formData.eventDescription}
                onChange={handleChange}
                placeholder='Description'
                className='addArtist-inputField'
              />
            </div>
          </div>
          <div className='addArtist-submitDetailDiv'>
            <button
              className='addArtist-submitDetailBtn'
              onClick={handleSubmit}
            >
              Add Event
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddEventForm;
