import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { VerifyGuru, getVerificationReqs } from '../../redux/api';
import BasicSelect from '../Select/BasicSelect';

const VerificationRequestList = () => {
  const [verificationList, setVerificationList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortedValue, setSortedValue] = useState([]);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const { data } = await getVerificationReqs();
      console.log(data);
      setVerificationList(data.gurus);
      setSortedValue(data.gurus);
      console.log(data.gurus)
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert('Something went wrong, please try later!');
      console.log(error);
    }
  };

  const verifyGurus = async (id,level,accId) => {
    try {
      await VerifyGuru(id,level,accId);
      fetchRequests();
      // alert('Api needed');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);
  function TEFilter(value) {
    if (value === 6) {
      return setSortedValue([...verificationList]);
    } else if (value === 0) {
      const res = verificationList.filter((item) => {
        if ((item.totalExperience || 0) !== 0) return false;
        return true;
      });
      setSortedValue([...res]);
    } else {
      const res = verificationList.filter((item) => {
        if ((item.totalExperience || 0) < value) return false;
        return true;
      });
      setSortedValue([...res]);
    }
  }

  function TELowToHigh() {
    const res = sortedValue.sort((a, b) => {
      console.log((a.totalExperience || 0) < (b.totalExperience || 0));
      if ((a.totalExperience || 0) < (b.totalExperience || 0)) {
        return -1;
      }
      return 0;
    });
    setSortedValue([...res]);
  }
  function TEHighToLow() {
    const res = sortedValue.sort((a, b) => {
      console.log((a.totalExperience || 0) < (b.totalExperience || 0));
      if ((a.totalExperience || 0) > (b.totalExperience || 0)) {
        return -1;
      }
      return 0;
    });
    setSortedValue([...res]);
  }
  function RLowToHigh() {
    const res = sortedValue.sort((a, b) => {
      console.log((a.rating || 0) < (b.rating || 0));
      if ((a.rating || 0) < (b.rating || 0)) {
        return -1;
      }
      return 0;
    });
    setSortedValue([...res]);
  }
  function RHighToLow() {
    const res = sortedValue.sort((a, b) => {
      console.log((a.rating || 0) < (b.rating || 0));
      if ((a.rating || 0) > (b.rating || 0)) {
        return -1;
      }
      return 0;
    });
    setSortedValue([...res]);
  }
  const valuesArr = [
    "Total Experience: Low to High",
    "Total Experience: High to Low",
    "Rating:Low to High",
    "Rating:High to Low",
  ];
  const filterValuesArr = [
    "Total Experience: 0",
    "Total Experience: 1+",
    "Total Experience: 2+",
    "Total Experience: 3+",
    "Total Experience: 4+",
    "Total Experience: 5+",
    "ALL",
  ];

  function sort(value) {
    console.log(value);
    switch (value) {
      case valuesArr[0]:
        TELowToHigh();
        break;
      case valuesArr[1]:
        TEHighToLow();
        break;
      case valuesArr[2]:
        RLowToHigh();
        break;
      case valuesArr[3]:
        RHighToLow();
        break;
    }
  }

  function filter(value) {
    switch (value) {
      case filterValuesArr[0]:
        TEFilter(0);
        break;
      case filterValuesArr[1]:
        TEFilter(1);
        break;
      case filterValuesArr[2]:
        TEFilter(2);
        break;
      case filterValuesArr[3]:
        TEFilter(3);
        break;
      case filterValuesArr[4]:
        TEFilter(4);
        break;
      case filterValuesArr[5]:
        TEFilter(5);
        break;
      case filterValuesArr[6]:
        TEFilter(6);
        break;
    }
  }
  return (
    <div style={{ width: '90%', margin: '3rem auto' }}>
          {loading ? (
        <h3>Loading...</h3>
      ) : (
        <>
      <h2>Verification Requests</h2>
      <div className="employee-firstSection">
      <div>
              <BasicSelect
                handleChange={sort}
                values={valuesArr}
                label="Sort"
              />
            </div>
            <div>
              <BasicSelect
                handleChange={filter}
                values={filterValuesArr}
                label="Filter"
              />
      </div>
            </div>

        <div className='table-wrapper' id='#scrollBar'>
          <table className='fl-table'>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Guru</th>
                <th>Username</th>
                <th>email</th>
                <th>experience</th>
                <th>Rating</th>
                <th>Tagline</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedValue?.map((ver, i) => (
                <tr key={ver._id}>
                  <td>{i + 1}</td>
                  <td>{ver?.name ? ver.name : ''}</td>
                  <td>{ver?.username ? ver.username : ''}</td>
                  <td>{ver?.email ? ver.email : ''}</td>
                  <td>{ver?.totalExperience ? ver.totalExperience : '0'}</td>
                  <td>{ver?.rating ? ver.rating : '0'}</td>
                  <td>{ver?.tagline ? ver.tagline : ''}</td>
                  <td>
                    {/* {ref?.user?.refferalAdminPaymentStatus === 'false' ? (
                    <button
                      className={`artist-blockBtn`}
                      onClick={() => markPaymentComplete(ref?.user?._id)}
                    >
                      Pending
                    </button>
                  ) : (
                    <button className={`artist-blockBtn disableBtn`} disabled>
                      Completed
                    </button>
                  )} */}
                    <button
                      className={`artist-blockBtn`}
                      onClick={() => verifyGurus(ver._id,ver.level,ver.razorpayAccNumber)}
                    >
                      Verify
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </>
      )}
    </div>
  );
};

export default VerificationRequestList;
