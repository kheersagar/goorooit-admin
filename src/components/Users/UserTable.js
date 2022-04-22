import React from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { getAspirantDetails } from '../../redux/api';
import '../../styles/ArtistsTable.css';

const UserTable = (props) => {
  const { allUsers } = props;
  const history = useHistory();

  const goToAspirant = async (id) => {
    history.push(`/aspirant/detail/${id}`);
    // try {
    //   const { data } = await getAspirantDetails(id);
    //   console.log(data);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  // const blockOrUnblock = async (id) => {
  //   try {
  //     await blockAndUnBlockArtist(id);
  //     fetchArtistList();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className='table-wrapper' id='#scrollBar'>
      <table className='fl-table'>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>User</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Username</th>
            {/* {<th>Action</th>} */}
          </tr>
        </thead>
        <tbody>
          {allUsers?.map((aspirant, i) => (
            <tr key={aspirant._id}>
              <td onClick={() => goToAspirant(aspirant._id)} className='cursor'>
                {i + 1}
              </td>
              <td onClick={() => goToAspirant(aspirant._id)} className='cursor'>
                {aspirant.name ? aspirant.name : ''}
              </td>
              <td onClick={() => goToAspirant(aspirant._id)} className='cursor'>
                {aspirant.number ? aspirant.number : ''}
              </td>
              <td onClick={() => goToAspirant(aspirant._id)} className='cursor'>
                {aspirant.email ? aspirant.email : ''}
              </td>
              <td onClick={() => goToAspirant(aspirant._id)} className='cursor'>
                {aspirant.username ? aspirant.username : 'NA'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
