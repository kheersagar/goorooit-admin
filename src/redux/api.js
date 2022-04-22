import axios from 'axios';
import Cookies from 'js-cookie';

// for live server
const API = axios.create({
  baseURL: 'https://goorooitapp.herokuapp.com',
});

API.interceptors.request.use((req) => {
  if (Cookies.get('goorooitAdmin')) {
    req.headers['x-access-token'] = `${Cookies.get('goorooitAdmin')}`;
  }
  return req;
});

export const login = (loginData) => API.post('/api/admin/login', loginData);

export const getBookings = (query = '', date = '') =>
  API.get(`/api/admin/allPayments?search=${query}&yearMonth=${date}`);

export const getProfessionals = (query = '') =>
  API.get(`/api/admin/allProf?search=${query}`);
export const getGurus = (query = '') => API.get(`/api/admin/allGurus`);

export const getAspirants = (query = '') =>
  API.get(`/api/admin/allAspirant?search=${query}`);

export const getUsers = (query = '') => API.get(`/api/admin/allUsers`);

export const getTransactions = (query = '', date = '') =>
  API.get(`/api/admin/allTransactions`);
export const getAspirantDetails = (id) =>
  API.post('/api/admin/userById', {
    id,
  });

export const getProfDetails = (id) =>
  API.post('/api/admin/userById', {
    id,
  });

export const getGuruDetails = (id) =>
  API.post('/api/admin/guruById', {
    guruId: id,
  });

export const getProfOrders = (id) =>
  API.post('/api/admin/profOrders', {
    id,
  });
export const getAspirantOrders = (id) =>
  API.post('/api/admin/aspirantOrders', {
    id,
  });

export const getEventList = (query = '') => API.get(`/api/admin/allEvents`);

export const createEvent = (formData) =>
  API.post('/api/admin/createEvent', formData);

export const editEvent = (formData) =>
  API.post('/api/admin/editEvent', formData);

export const getEventTransList = (query = '') =>
  API.get(`/api/admin/allEventPurchases`);
export const closeTheEvent = (id) =>
  API.post('/api/admin/closeEvent', {
    id,
  });

export const stopEventBooking = (id) =>
  API.post('/api/stopBookings', {
    id,
  });

export const generateLinkForEvent = (id) =>
  API.post('/api/admin/createMeetingforEvent  ', {
    id,
  });

export const getVerificationReqs = () =>
  API.get('/api/admin/getVerificationsRequested ');

export const verifyProf = (id) =>
  API.post('/api/admin/verifyuser', {
    id,
  });

export const getAllQuestions = () => API.get('/api/admin/allQuestions');
export const getAllBidPurchase = () => API.get('/api/admin/allBidPurchases');


export const VerifyGuru = (id,level,accId) =>
  API.post('/api/admin/verifyGuru', {
    guruId: id,
    level:level,
    accId:accId
  });
  export const unVerifyGuru = (id) =>
  API.post('/api/admin/unverifyGuru', {
    guruId: id,
  });
export const editProfessionalSkills = (formData) =>
  API.post('/api/admin/updateSkillPrice', formData);

export const getEventData = (id) => API.post('/api/eventById', { id });

export const getMonthlyPayout = (date) =>
  API.post('/api/admin/getMonthWisePayout', { month: date });

export const confirmMonthlyPayout = (formData) =>
  API.post('/api/admin/confirmMonthlyPaymentMade', formData);

export const getReferralList = () => API.get('/api/admin/getReffers');
export const completeReferralPay = (id) =>
  API.post('/api/admin/confirmRefferPayment', { id });

export const uploadBanner = (data) => API.post('/api/admin/createBanner', data);
export const getCurrentBanner = () => API.get('/api/admin/getBanner');
export const deleteCurrentBanner = (id) =>
  API.post('/api/admin/deleteBanner', {
    id: id,
  });
