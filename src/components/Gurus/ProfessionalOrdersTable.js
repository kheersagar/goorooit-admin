import React from 'react';
import moment from 'moment';
import { blockAndUnBlockArtist } from '../../redux/api';
import '../../styles/ArtistsTable.css';

const ProfessionalOrdersTable = (props) => {
  const { allOrders } = props;

  // const handleBlockArtist = async (id) => {
  //   try {
  //     await blockAndUnBlockArtist(id);
  //     setBoolVal(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className='table-wrapper' id='#scrollBar'>
      <table className='fl-table'>
        <thead>
          <tr>
            <th>Order id</th>
            <th>Aspirants</th>
            <th>Topic</th>
            <th>Amount</th>
            <th>Meeting Date</th>
            <th>Txn Date</th>
            <th>Txn Status</th>
          </tr>
        </thead>
        <tbody>
          {allOrders?.map((order) => (
            <tr key={order._id}>
              <td>{order?.orderId ? order?.orderId : 'NA'}</td>
              <td>
                {/* {order?.userId?.username ? payment?.userId?.username : 'NA'} */}
                Aspirants
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

export default ProfessionalOrdersTable;
