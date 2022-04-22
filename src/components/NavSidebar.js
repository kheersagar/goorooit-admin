import * as React from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import EventIcon from '@mui/icons-material/Event';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import VerifiedIcon from '@mui/icons-material/Verified';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import home from '../images/home.svg';
import homeActive from '../images/homeActive.svg';
import employee from '../images/employee.svg';
import employeeActive from '../images/employeeActive.svg';
import user from '../images/user.svg';
import userActive from '../images/userActive.svg';
import payment from '../images/payment.svg';
import paymentActive from '../images/paymentActive.svg';
import useStyles from '../styles/NavSidebar';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: '#fff',
  color: '#1C7EBF',
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiTypography-body1': {
    fontFamily: 'Montserrat !important',
  },
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    height: '100vh',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    fontFamily: 'Montserrat',
    backgroundColor: '#155B89',
    color: '#C4C4C4',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

const NavSidebar = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const history = useHistory();

  const handleLogout = () => {
    Cookies.remove('fanstarAdmin');
    history.push('/');
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position='absolute' open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge='start'
              color='inherit'
              aria-label='open drawer'
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component='h1'
              variant='h6'
              color='inherit'
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {/**Dashboard */}
            </Typography>
            <div className={classes.logoutBtnDiv}>
              <button className={classes.logoutBtn} onClick={handleLogout}>
                Log out
              </button>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer variant='permanent' open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: [1],
            }}
          >
            <div className={classes.navHeader}>
              <h3>Goorooit</h3>
            </div>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon className={classes.closeDrawer} />
            </IconButton>
          </Toolbar>
          <Divider />
          <List className={classes.listDiv}>
            <ListItem
              button
              className={
                props.location.pathname.includes('/home')
                  ? classes.selectedList
                  : ''
              }
              onClick={() => history.push('/home')}
            >
              <ListItemIcon>
                {props.location.pathname.includes('/home') ? (
                  <img
                    src={homeActive}
                    className={classes.iconColor}
                    alt='home'
                  />
                ) : (
                  <img src={home} className={classes.iconColor} alt='home' />
                )}
              </ListItemIcon>
              <ListItemText primary='Bookings' />
            </ListItem>

            <ListItem
              button
              className={
                props.location.pathname.includes('/gurus')
                  ? classes.selectedList
                  : ''
              }
              onClick={() => history.push('/gurus')}
            >
              <ListItemIcon>
                {props.location.pathname.includes('/gurus') ? (
                  <img
                    src={employeeActive}
                    className={classes.iconColor}
                    alt='employee'
                  />
                ) : (
                  <img
                    src={employee}
                    className={classes.iconColor}
                    alt='employee'
                  />
                )}
              </ListItemIcon>
              <ListItemText primary='Gurus' />
            </ListItem>
            <ListItem
              button
              className={
                props.location.pathname.includes('/users')
                  ? classes.selectedList
                  : ''
              }
              onClick={() => history.push('/users')}
            >
              <ListItemIcon>
                {props.location.pathname.includes('/users') ? (
                  <img
                    src={userActive}
                    className={classes.iconColor}
                    alt='users'
                  />
                ) : (
                  <img src={user} className={classes.iconColor} alt='users' />
                )}
              </ListItemIcon>
              <ListItemText primary='Users' />
            </ListItem>
            <ListItem
              button
              className={
                props.location.pathname.includes('/events')
                  ? classes.selectedList
                  : ''
              }
              onClick={() => history.push('/events')}
            >
              <ListItemIcon>
                {props.location.pathname.includes('/events') ? (
                  <EventIcon className={classes.activeIcon} />
                ) : (
                  <EventIcon className={classes.inactiveIcon} />
                )}
              </ListItemIcon>
              <ListItemText primary='Events' />
            </ListItem>
            <ListItem
              button
              className={
                props.location.pathname.includes('/event-transaction')
                  ? classes.selectedList
                  : ''
              }
              onClick={() => history.push('/event-transaction')}
            >
              <ListItemIcon>
                {props.location.pathname.includes('/event-transaction') ? (
                  <AnalyticsOutlinedIcon className={classes.activeIcon} />
                ) : (
                  <AnalyticsOutlinedIcon className={classes.inactiveIcon} />
                )}
              </ListItemIcon>
              <ListItemText primary='Event Transaction' />
            </ListItem>
            <ListItem
              button
              className={
                props.location.pathname.includes('/bid-purchase')
                  ? classes.selectedList
                  : ''
              }
              onClick={() => history.push('/bid-purchase')}
            >
              <ListItemIcon>
                {props.location.pathname.includes('/bid-purchase') ? (
                  <ReceiptLongIcon className={classes.activeIcon} />
                ) : (
                  <ReceiptLongIcon className={classes.inactiveIcon} />
                )}
              </ListItemIcon>
              <ListItemText primary='Bid Purchase' />
            </ListItem>
            {/* <ListItem
              button
              className={
                props.location.pathname.includes('/banner')
                  ? classes.selectedList
                  : ''
              }
              onClick={() => history.push('/banner')}
            >
              <ListItemIcon>
                {props.location.pathname.includes('/banner') ? (
                  <ViewCarouselIcon className={classes.activeIcon} />
                ) : (
                  <ViewCarouselIcon className={classes.inactiveIcon} />
                )}
              </ListItemIcon>
              <ListItemText primary='Banner' />
            </ListItem> */}
            {/* <ListItem
              button
              className={
                props.location.pathname.includes('/referrals')
                  ? classes.selectedList
                  : ''
              }
              onClick={() => history.push('/referrals')}
            >
              <ListItemIcon>
                {props.location.pathname.includes('/referrals') ? (
                  <LocalActivityIcon className={classes.activeIcon} />
                ) : (
                  <LocalActivityIcon className={classes.inactiveIcon} />
                )}
              </ListItemIcon>
              <ListItemText primary='Referrals' />
            </ListItem> */}
            <ListItem
              button
              className={
                props.location.pathname.includes('/all-questions')
                  ? classes.selectedList
                  : ''
              }
              onClick={() => history.push('/all-questions')}
            >
              <ListItemIcon>
                {props.location.pathname.includes('/all-questions') ? (
                  <QuizOutlinedIcon className={classes.activeIcon} />
                ) : (
                  <QuizOutlinedIcon className={classes.inactiveIcon} />
                )}
              </ListItemIcon>
              <ListItemText primary='All Questions' />
            </ListItem>
            <ListItem
              button
              className={
                props.location.pathname.includes('/verification-request')
                  ? classes.selectedList
                  : ''
              }
              onClick={() => history.push('/verification-request')}
            >
              <ListItemIcon>
                {props.location.pathname.includes('/verification-request') ? (
                  <VerifiedIcon className={classes.activeIcon} />
                ) : (
                  <VerifiedIcon className={classes.inactiveIcon} />
                )}
              </ListItemIcon>
              <ListItemText primary='Verification' />
            </ListItem>
            {/* <ListItem
              button
              className={
                props.location.pathname.includes('/professional-payment')
                  ? classes.selectedList
                  : ''
              }
              onClick={() => history.push('/professional-payment')}
            >
              <ListItemIcon>
                {props.location.pathname.includes('/professional-payment') ? (
                  <AccountBalanceIcon className={classes.activeIcon} />
                ) : (
                  <AccountBalanceIcon className={classes.inactiveIcon} />
                )}
              </ListItemIcon>
              <ListItemText primary='Profs Payout' />
            </ListItem> */}

            {/* <ListItem
              button
              className={
                props.location.pathname.includes('/payments')
                  ? classes.selectedList
                  : ''
              }
              onClick={() => history.push('/payments')}
            >
              <ListItemIcon>
                {props.location.pathname.includes('/payments') ? (
                  <img
                    src={paymentActive}
                    className={classes.iconColor}
                    alt='payments'
                  />
                ) : (
                  <img
                    src={payment}
                    className={classes.iconColor}
                    alt='payments'
                  />
                )}
              </ListItemIcon>
              <ListItemText primary='Payments ' />
            </ListItem> */}
          </List>
        </Drawer>
        <Box
          component='main'
          sx={{
            backgroundColor: (theme) =>
              props.location.pathname.includes('/add')
                ? '#fff'
                : theme.palette.grey[100],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          {props.children}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default NavSidebar;
