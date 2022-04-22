import React from 'react';
import moment from 'moment';
import '../../styles/ArtistsTable.css';

const ArtistOrdersTable = (props) => {
  const { allOrders } = props;
  // console.log(allOrders);
  return (
    <div className='table-wrapper' id='#scrollBar'>
      <table className='fl-table'>
        <thead>
          <tr>
            <th>Order id</th>
            <th>Professional</th>
            <th>Topic</th>
            <th>Amount</th>
            <th>Meeting Date</th>
            <th>Txn Date</th>
            <th>Txn Status</th>
            {/**<th>Action</th> */}
          </tr>
        </thead>
        <tbody>
          {allOrders?.map((order) => (
            <tr key={order._id}>
              <td>{order?.orderId ? order?.orderId : 'NA'}</td>
              <td>
                {/* {order?.userId?.username ? payment?.userId?.username : 'NA'} */}
                Professional
              </td>
              <td>{order?.topic ? order?.topic : 'NA'}</td>
              <td>{order?.amount ? order?.amount : '0'}</td>
              <td>
                {order?.Date
                  ? moment(order?.Date).format('MMMM Do YYYY, h:mm a')
                  : ''}
              </td>
              <td>
                {order?.txndate
                  ? moment(order?.txndate).format('MMMM Do YYYY, h:mm a')
                  : ''}
              </td>
              <td>{order?.status}</td>
              {/**<td>
                <button className='artist-blockBtn'>Block</button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArtistOrdersTable;
