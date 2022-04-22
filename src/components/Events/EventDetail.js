import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import {
  getEventData,
  generateLinkForEvent,
  closeTheEvent,
  stopEventBooking,
} from '../../redux/api';
import EditEventForm from './EditEventForm';
import '../../styles/EventDetails.css';
import { Fragment } from 'react';

const EventDetail = () => {
  const { id } = useParams();
  const [eventData, setEventData] = useState({});
  const [loading, setLoading] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);

  const fetchEventDetail = async (id) => {
    setLoading(true);
    try {
      const { data } = await getEventData(id);
      // console.log(data);
      setLoading(false);
      setEventData(data.event);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const closeEvent = async () => {
    try {
      await closeTheEvent(id);
      alert('Event closed');
    } catch (error) {
      alert('Something went wrong, please try later!');
      console.log(error);
    }
  };

  const stopBooking = async () => {
    try {
      await stopEventBooking(id);
      alert('Booking stopped!');
    } catch (error) {
      alert('Something went wrong, please try later!');
      console.log(error);
    }
  };

  const sendLink = async () => {
    try {
      await generateLinkForEvent(id);
      alert('Link sent to all registered aspirants');
    } catch (error) {
      console.log(error);
      alert('Something went wrong, please try later!');
    }
  };

  useEffect(() => {
    fetchEventDetail(id);
  }, [id]);

  const closeToggle = () => {
    fetchEventDetail(id);
    setToggleEdit(false);
  };

  return (
    <div className='eventDetail-container'>
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <Fragment>
          {toggleEdit ? (
            <EditEventForm
              eventData={eventData}
              closeToggle={closeToggle}
              setToggleEdit={setToggleEdit}
              id={id}
            />
          ) : (
            <div className='eventDetail-cardDiv'>
              <div className='eventHeaderDiv'>
                <h2 className='eventDetail-pageTitle'>Event Details</h2>
                <span
                  className='eventDetail-editSpan'
                  onClick={() => setToggleEdit(true)}
                >
                  Edit
                </span>
              </div>
              <div className='eventDetail-rowWise'>
                <div className='eventDetail-contentDiv'>
                  <label className='eventDetail-label'>Event Title</label>
                  <p className='eventDetail-para'>
                    {eventData.title ? eventData.title : 'NA'}
                  </p>
                </div>
                <div className='eventDetail-contentDiv'>
                  <label className='eventDetail-label'>Max Seats</label>
                  <p className='eventDetail-para'>
                    {eventData.maxSeats ? `${eventData.maxSeats}` : 'NA'}
                  </p>
                </div>
                <div className='eventDetail-contentDiv'>
                  <label className='eventDetail-label'>Event Fees</label>
                  <p className='eventDetail-para'>
                    {eventData.amount ? `Rs ${eventData.amount} /-` : 'NA'}
                  </p>
                </div>
              </div>
              <div className='eventDetail-rowWise'>
                <div className='eventDetail-contentDiv'>
                  <label className='eventDetail-label'>Date</label>
                  <p className='eventDetail-para'>
                    {eventData.Date
                      ? moment(eventData.Date).format('DD-MM-YYYY')
                      : 'NA'}
                  </p>
                </div>
                <div className='eventDetail-contentDiv'>
                  <label className='eventDetail-label'>Time</label>
                  <p className='eventDetail-para'>
                    {eventData.meetingTime ? eventData.meetingTime : 'NA'}
                  </p>
                </div>
                <div className='eventDetail-contentDiv'>
                  <label className='eventDetail-label'>Duration</label>
                  <p className='eventDetail-para'>
                    {eventData.duration ? eventData.duration : 'NA'}
                  </p>
                </div>
              </div>
              <div className='eventDetail-columnWise'>
                <div className='eventDetail-contentDiv '>
                  <label className='eventDetail-label'>Professionals</label>
                  <div className='rowWise'>
                    {eventData?.profs?.map((profs) => (
                      <p className='eventDetail-profs' key={profs._id}>
                        {profs.name}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              <div className='eventDetail-rowWise'>
                <div className='eventDetail-contentDiv'>
                  <label className='eventDetail-label'>Event Description</label>
                  <p className='eventDetail-para'>
                    {eventData?.eventDescription
                      ? eventData?.eventDescription
                      : 'NA'}
                  </p>
                </div>
              </div>
              <div className='eventDetail-btnDiv'>
                <button className='eventDetail-btn red' onClick={closeEvent}>
                  Close Event
                </button>
                <button className='eventDetail-btn blue' onClick={stopBooking}>
                  Stop Booking
                </button>
                <button className='eventDetail-btn green' onClick={sendLink}>
                  Send Link
                </button>
              </div>
            </div>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default EventDetail;
