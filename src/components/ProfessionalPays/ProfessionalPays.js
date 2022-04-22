import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { getMonthlyPayout, confirmMonthlyPayout } from '../../redux/api';

import '../../styles/ProfessionalPays.css';

const ProfessionalPays = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [monthOption, setMonthOption] = useState([]);
  const [loading, setLoading] = useState(false);
  let allMonths = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const [selectedDate, setSelectedData] = useState(
    moment(new Date()).format('YYYY-MM')
  );

  // console.log(new Date().getMonth());

  const lastThreeMonths = () => {
    setLoading(true);
    let curr = new Date().getMonth(),
      count = 4;
    let optionArray = [];
    while (count) {
      if (curr >= 0) {
        optionArray.push({
          monthName: allMonths[curr],
          value: `${new Date().getFullYear()}-${
            curr + 1 <= 9 ? `0${curr + 1}` : curr + 1
          }`,
        });
      } else {
        optionArray.push({
          monthName: allMonths[12 + curr],
          value: `${new Date().getFullYear() - 1}-${
            13 + curr <= 9 ? `0${13 + curr}` : 13 + curr
          }`,
        });
      }
      curr -= 1;
      count--;
    }
    if (count === 0) {
      setLoading(false);
      setMonthOption(optionArray);
      // console.log(optionArray);
    }
  };

  const fetchPayout = async (date) => {
    // console.log(date);
    setLoading(true);
    try {
      const { data } = await getMonthlyPayout(date);
      // console.log(typeof data);
      let keys = Object.keys(data);
      let arrayData = [],
        count = 0,
        total = keys.length;
      if (keys.length > 0) {
        keys.forEach((k) => {
          arrayData.push(data[k]);
          count += 1;
          if (count === total) {
            setMonthlyData(arrayData);
          }
        });
      } else {
        setMonthlyData(arrayData);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const markPaymentComplete = async (id) => {
    try {
      const { data } = await confirmMonthlyPayout({
        id: id,
        month: selectedDate,
      });
      console.log(data);
      fetchPayout(selectedDate);
    } catch (error) {
      alert('Something went wrong, please try later!');
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPayout(moment(new Date()).format('YYYY-MM'));
    lastThreeMonths();
  }, []);

  const handleSelectMonth = (e) => {
    setSelectedData(e.target.value);
    fetchPayout(e.target.value);
  };

  return (
    <div className='payout-container'>
      <div className='payout-headerDiv'>
        <h3>Professional Payout</h3>
        <select
          className='monthDropDown'
          value={selectedDate}
          onChange={handleSelectMonth}
        >
          {monthOption?.map((opt) => (
            <option value={opt.value}>{opt.monthName}</option>
          ))}
        </select>
      </div>
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <div className='table-wrapper' id='#scrollBar'>
          <table className='fl-table'>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Prof Id</th>
                <th>Professionals</th>
                <th>UPI Id</th>

                <th>Amount</th>

                {/**<th>Type</th> */}
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {monthlyData?.map((data, i) => {
                // console.log(data?.prof?.payoutRecievedMonths);
                return (
                  <tr key={data?.prof?._id}>
                    <td>{i + 1}</td>
                    <td>{data?.prof?.HKTID}</td>
                    <td style={{ textTransform: 'capitalize' }}>
                      {data?.prof?.name ? data?.prof?.name : 'NA'}
                    </td>
                    <td>{data?.prof?.upiid ? data?.prof?.upiid : 'NA'}</td>
                    <td>{`Rs. ${data.amount}`}</td>
                    {/**<td>{`20`}</td> */}
                    <td style={{ textTransform: 'capitalize' }}>
                      {/**<button className='data-blockBtn'>Block</button> */}
                      {data?.prof?.payoutRecievedMonths?.includes(
                        selectedDate
                      ) ? (
                        <button className='artist-blockBtn disableBtn' disabled>
                          Completed
                        </button>
                      ) : (
                        <button
                          className='artist-blockBtn'
                          onClick={() => markPaymentComplete(data?.prof?._id)}
                        >
                          Pending
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProfessionalPays;
