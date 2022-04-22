import React from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { closeTheEvent, generateLinkForEvent } from '../../redux/api';

import '../../styles/ArtistsTable.css';

const EventsTable = (props) => {
  const history = useHistory();
  const { eventList, fetchEventList } = props;

  const closeEvent = async (id) => {
    try {
      await closeTheEvent(id);
      alert('Event closed');
      fetchEventList();
    } catch (error) {
      console.log(error);
    }
  };

  const createMeetingLink = async (id) => {
    try {
      await generateLinkForEvent(id);
      alert('Link sent to all registered aspirants');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='table-wrapper' id='#scrollBar'>
      <table className='fl-table'>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Event Title</th>
            <th>Date</th>
            <th>Timing</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {eventList?.map((event, i) => (
            <tr key={i}>
              <td
                className='cursor'
                onClick={() =>
                  history.push(`/events/event-detail/${event._id}`)
                }
              >
                {i + 1}
              </td>
              <td
                className='cursor'
                onClick={() =>
                  history.push(`/events/event-detail/${event._id}`)
                }
              >
                {event?.title ? event?.title : ''}
              </td>
              <td
                className='cursor'
                onClick={() =>
                  history.push(`/events/event-detail/${event._id}`)
                }
              >
                {event?.date ? moment(event?.date).format('DD-MM-YYYY') : ''}
              </td>
              <td
                className='cursor'
                onClick={() =>
                  history.push(`/events/event-detail/${event._id}`)
                }
              >
                {event.startTime && event.endTime
                  ? `${event.startTime}-${event.endTime}`
                  : ''}
              </td>
              <td
                className='cursor'
                onClick={() =>
                  history.push(`/events/event-detail/${event._id}`)
                }
              >
                {event?.price ? event?.price : '0'}
              </td>
              <td
                className='cursor'
                onClick={() =>
                  history.push(`/events/event-detail/${event._id}`)
                }
              >
                {event?.description
                  ? event?.description?.length > 30
                    ? `${event?.description?.substring(0, 27)}...`
                    : event?.description
                  : ''}
              </td>
              <td className='cursor' style={{ textTransform: 'capitalize' }}>
                {event?.status ? event?.status : ''}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventsTable;
