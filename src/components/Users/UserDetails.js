import React, { useState, useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import AspirantOrdersTable from './AspirantOrdersTable';
import { getAspirantDetails, getAspirantOrders } from '../../redux/api';
// import { CopyToClipboard } from 'react-copy-to-clipboard';
// import paymentIcon from '../../images/paymentIcon.svg';
// import editIcon from '../../images/editIcon.svg';
// import shareIcon from '../../images/shareIcon.svg';
import '../../styles/AspirantDetails.css';

const UserDetails = (props) => {
  const history = useHistory();
  const [aspirantData, setAspirantData] = useState({});
  const [companies, setCompanies] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [boolVal, setBoolVal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const id = props.match.params.id;

  const fetchAspirant = async (id) => {
    setIsLoading(true);
    try {
      const { data } = await getAspirantDetails(id);
      // console.log(data.user);
      setAspirantData(data.user);
      setCompanies(data.user.company);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const fetchAspirantOrders = async (id) => {
    setIsLoading(true);
    try {
      const { data } = await getAspirantOrders(id);
      // console.log(data);
      setAllOrders(data.orders);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const renderSkills = (skills) => {
    var skillsArray = [];
    skills.forEach((skill) => {
      skillsArray.push(skill.name);
    });
    return skillsArray.join(', ');
  };

  useEffect(() => {
    if (!boolVal) {
      fetchAspirant(id);
      fetchAspirantOrders(id);
      setBoolVal(true);
    }
  }, [boolVal, id]);

  // const blockOrUnblock = async () => {
  //   try {
  //     await blockAndUnBlockArtist(id);
  //     fetchArtist(id);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const deleteArtist = async () => {
  //   try {
  //     await deleteAnArtist(id);
  //     history.push('/artists');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleEdit = async () => {
  //   try {
  //     const { data } = await EditArtist(id);
  //     // window.localStorage.setItem('fanstarToken', data);
  //     window.open(
  //       `https://fanstar-app.netlify.app/artist/landing/${data}`,
  //       '_blank'
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className='aspirantDetails-container'>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <Fragment>
          <div className='aspirantDetails-personalInfoDiv'>
            <div className='aspirantDetails-leftDiv'>
              <div className='aspirantDetails-imageDiv'>
                <img
                  src={aspirantData.profilePic}
                  alt='profilePic'
                  className='aspirantDetails-image'
                />
              </div>
              <div className='aspirantDetails-infoDiv'>
                <p className='aspirantDetails-infoPara'>
                  {aspirantData.name ? aspirantData.name : ''},{' '}
                  <span className='aspirantDetails-infoSpan'>
                    {aspirantData.gender ? aspirantData.gender : ''}
                  </span>
                </p>
                <p className='aspirantDetails-infoPara'>
                  {aspirantData.phone ? aspirantData.phone : ''}
                </p>
                <p className='aspirantDetails-infoPara'>
                  {aspirantData.email ? aspirantData.email : ''}
                </p>
              </div>
            </div>
            <div className='aspirantDetails-rightDiv'>
              <div className='aspirantDetails-infoDiv'>
                <p className='aspirantDetails-infoPara'>
                  {aspirantData.HKTID ? 'HKTID : ' : ''}
                  <span className='aspirantDetails-infoSpan'>
                    {aspirantData.HKTID ? aspirantData.HKTID : ''}
                  </span>
                </p>
                <p className='aspirantDetails-infoPara'>
                  {aspirantData?.languages?.length > 0 ? 'Language : ' : ''}
                  <span className='aspirantDetails-infoSpan'>
                    {aspirantData?.languages?.length > 0
                      ? aspirantData?.languages.join(', ')
                      : ''}
                  </span>
                </p>
                <p className='aspirantDetails-infoPara'>
                  {aspirantData.university ? aspirantData.university : ''}
                </p>
                <p className='aspirantDetails-infoPara'>
                  {'Sessions Taken : '}
                  <span className='aspirantDetails-infoSpan'>
                    {aspirantData?.successful_session
                      ? aspirantData?.successful_session
                      : '0'}
                  </span>
                </p>
              </div>
            </div>
            {/**<div className='aspirantDetails-rightDiv'>
              <div className='aspirantDetails-rightBtnDiv'>
                {pendingWithdraw.length > 0 && (
                  <button
                    className='aspirantDetails-rightBtn block paymentBtn'
                    onClick={() =>
                      history.push({
                        pathname: `/artists/detail/${id}/pay`,
                        state: {
                          requests: pendingWithdraw,
                          artistName: aspirantData.username,
                        },
                      })
                    }
                  >
                    <img
                      src={paymentIcon}
                      alt='payment'
                      className='paymentIcon'
                    />
                    <span>Payment</span>
                    {pendingWithdraw.length > 0 && (
                      <span className='notification'>
                        {pendingWithdraw.length}
                      </span>
                    )}
                  </button>
                )}
                <button
                  className='aspirantDetails-rightBtn block'
                  onClick={blockOrUnblock}
                >
                  {aspirantData.blocked ? 'Unblock' : 'Block'}
                </button>
                <button
                  className='aspirantDetails-rightBtn delete'
                  onClick={deleteArtist}
                >
                  Delete Account
                </button>
              </div>
              <div className='artist-orderDetailDiv'>
                <div className='aspirantDetails-ordersDiv'>
                  <h4 className='aspirantDetails-orderTitle'>Total Orders</h4>
                  <p className='aspirantDetails-order'>{orderData.totalOrders}</p>
                </div>
                <div className='aspirantDetails-ordersDiv'>
                  <h4 className='aspirantDetails-orderTitle'>Pending Orders</h4>
                  <p className='aspirantDetails-order'>
                    {orderData.pendingOrders}
                  </p>
                </div>
              </div>
            </div> */}
          </div>
          <div className='aspirantDetails-incomeSection'>
            <div className='aspirantDetails-incomeCardDiv companyCard'>
              <p className='aspirantDetails-incomeCardLabel'>Experience</p>
              <div className='aspirantDetails-incomeCard aspirantDetails-company'>
                {companies.length > 0 ? (
                  <Fragment>
                    {companies?.map((c, i) => (
                      <div className='aspirantDetails-companyDetails' key={i}>
                        <h3 className='aspirantDetails-companyTitle'>
                          {c.company_name}
                        </h3>
                        <p className='aspirantDetails-date'>
                          {c.title ? c.title : ''}
                        </p>
                        <p className='aspirantDetails-date'>{`${
                          c.start_date
                            ? moment(c.start_date).format('DD/MM/YYYY')
                            : 'NA'
                        }-${
                          c.end_date
                            ? moment(c.end_date).format('DD/MM/YYYY')
                            : 'NA'
                        }`}</p>
                      </div>
                    ))}
                  </Fragment>
                ) : (
                  <h4
                    style={{
                      fontSize: '16px',
                      color: '#fff',
                      textAlign: 'center',
                    }}
                  >
                    No Experience
                  </h4>
                )}
              </div>
            </div>
            {/**<div className='aspirantDetails-incomeCardDiv'>
              <p className='aspirantDetails-incomeCardLabel'>Weekly Income</p>
              <div className='aspirantDetails-incomeCard'>
                <h3 className='aspirantDetails-incomeCardTitle'>
                  Weekly Income
                </h3>
                <p className='aspirantDetails-income'>{`Rs ${0}/-`}</p>
              </div>
            </div> */}
            <div className='aspirantDetails-incomeCardDiv skillsCard'>
              <p className='aspirantDetails-incomeCardLabel '>Skills</p>
              <div className='aspirantDetails-incomeCard'>
                <h3 className='aspirantDetails-incomeCardTitle skills'>
                  Skills
                </h3>
                <p className='aspirantDetails-income allSkills'>
                  {aspirantData?.skills?.length > 0
                    ? renderSkills(aspirantData?.skills)
                    : ''}
                </p>
              </div>
            </div>
          </div>
          <div className='aspirantDetails-tableSection'>
            <AspirantOrdersTable allOrders={allOrders} />
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default UserDetails;
