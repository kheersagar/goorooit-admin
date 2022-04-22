import moment from 'moment';
import React from 'react';
import '../../styles/ArtistsTable.css';

const DashboardTable = (props) => {
  const { bookingList } = props;
  // console.log(bookingList);
  return (
    <div className='table-wrapper' id='#scrollBar'>
      <table className='fl-table'>
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Aspirant</th>
            <th>Professional</th>
            <th>Amount</th>
            <th>Order Date</th>
            <th>Status</th>
            {/**<th>Location</th> */}
            {/**<th>Due Date</th> */}
          </tr>
        </thead>
        <tbody>
          {bookingList.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.orderId}</td>
              <td style={{ textTransform: 'capitalize' }}>
                {booking.Aspirant ? booking.Aspirant.name : 'NA'}
              </td>
              <td style={{ textTransform: 'capitalize' }}>
                {booking.Professional ? booking.Professional.name : ''}
              </td>
              <td style={{ textTransform: 'capitalize' }}>{booking.amount}</td>
              <td>
                {booking.Date
                  ? moment(booking.Date).format('MMMM Do YYYY, h:mm a')
                  : ''}
              </td>
              <td>{booking.paymentstatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardTable;
