import React, { useEffect } from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { verifyProf, unVerifyGuru } from '../../redux/api';
import '../../styles/ArtistsTable.css';

const GurusTable = (props) => {
  const { guruList, fetchGuruList } = props;
  const history = useHistory();

  const verifyProfessional = async (id) => {
    try {
      await verifyProf(id);
      fetchGuruList();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnverify = async (id) => {
    try {
      await unVerifyGuru(id);
      fetchGuruList();
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
            <th>Guru</th>
            <th>Username</th>
            <th>Phone Number</th>
            <th>Tagline</th>
            <th>Total Experience</th>
            <th>Rating</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {guruList?.map((guru, i) => (
            <tr key={guru._id}>
              <td
                className='cursor'
                onClick={() => history.push(`/gurus/detail/${guru._id}`)}
              >
                {i + 1}
              </td>
              <td
                className='cursor'
                onClick={() => history.push(`/gurus/detail/${guru._id}`)}
              >
                {guru.name ? guru.name : ''}
              </td>
              <td
                className='cursor'
                onClick={() => history.push(`/gurus/detail/${guru._id}`)}
              >
                {guru.username ? guru.username : ''}
              </td>
              <td
                className='cursor'
                onClick={() => history.push(`/gurus/detail/${guru._id}`)}
              >
                {guru.number ? guru.number : ''}
              </td>
              <td
                className='cursor'
                onClick={() => history.push(`/gurus/detail/${guru._id}`)}
              >
                {guru.tagline ? guru.tagline : '0'}
              </td>
              <td>{guru.totalExperience ? guru.totalExperience : '0'}</td>
              
              <td
                className='cursor'
                onClick={() => history.push(`/gurus/detail/${guru._id}`)}
              >
                {guru.rating ? guru.rating : '0'}
              </td>
              <td
                className='cursor'
                onClick={() => history.push(`/gurus/detail/${guru._id}`)}
              >
                {guru.verified === 'false' ? 'Unverified' : 'Verified'}
              </td>
              {/**<td
                className='cursor'
              >{`20`}</td> */}
              <td>
                {guru.verified === 'false' ? (
                  <button
                    className={'artist-blockBtn'}
                    // onClick={() => verifyProfessional(prof._id)}
                  >
                    Verify
                  </button>
                ) : (
                  <button
                    className={'disableBtn'}
                    onClick={() => handleUnverify(guru._id)}
                  >
                    Unverify
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GurusTable;
