import React, { useEffect, useState } from 'react';
import { getReferralList, completeReferralPay } from '../../redux/api';

const ReferralTable = () => {
  const [referralData, setReferralData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchReferralList = async () => {
    setLoading(true);
    try {
      const { data } = await getReferralList();
      console.log(data.data);
      setReferralData(data.data);
      setLoading(false);
    } catch (error) {
      alert('Something went wrong, please try later!');
      console.log(error);
      setLoading(false);
    }
  };

  const markPaymentComplete = async (id) => {
    setLoading(true);
    try {
      const { data } = await completeReferralPay(id);
      console.log(data);
      setLoading(false);
      fetchReferralList();
    } catch (error) {
      alert('Something went wrong, please try later!');
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReferralList();
  }, []);

  return (
    <div style={{ width: '90%', margin: '3rem auto' }}>
      <h2>Referrals</h2>
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <div className='table-wrapper' id='#scrollBar'>
          <table className='fl-table'>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>User Id</th>
                <th>Username</th>
                <th>Referrer Id</th>
                <th>Referrer Name</th>
                <th>Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {referralData?.map((ref, i) => (
                <tr key={i}>
                  <td className='cursor'>{i + 1}</td>
                  <td className='cursor'>
                    {ref?.user?.HKTID ? ref?.user?.HKTID : ''}
                  </td>
                  <td className='cursor'>
                    {ref?.user?.name ? ref?.user?.name : ''}
                  </td>
                  <td className='cursor'>
                    {ref?.refferer?.HKTID ? ref?.refferer?.HKTID : ''}
                  </td>
                  <td className='cursor'>
                    {ref?.refferer?.name ? ref?.refferer?.name : ''}
                  </td>
                  {/**<td className='cursor'>
                  {event?.closed === 'yes' ? 'Closed' : 'Open'}
                </td> */}
                  <td>
                    {ref?.user?.refferalAdminPaymentStatus === 'false' ? (
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
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReferralTable;
