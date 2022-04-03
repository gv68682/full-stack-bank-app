
import { HashRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/Auth/authContext'
import { BrowserRouter } from 'react-router-dom'
import { NavBar } from './components/NavBar/navbar';
import { Home as HomeComponent } from './components/home'
import { AppRoutes } from './components/AppRoutes'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import {NavLogin} from '../src/components/navlogin'


//FF7661
const theme = createTheme({
  palette: {
    primary: {
      main: '#dc3545',
      contrastText: '#fff',
    },
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          textTransform: 'none',
          backgroundColor: '#a31f34',
          color: 'white',
          fontWeight: '40px',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: { color: '#a31f34', fontWeight: 'normal' },
      },
    },
    MuiInput: {
      styleOverrides: {
        input: {
          color: '#fff'
        },
        underline: {
          '&:before': {
            borderBottom: '1px solid #FF7661',
          },
          '&:hover': {
            borderBottom: '1px solid #FF7661',
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: '#fff',
          fontWeight: 600,
          paddingBottom: '16px',
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: '#fff',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        label: { color: '#FF7661' },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1C2633',
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          color: 'white',
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: 'white',
        },
      },
    },
  },
})

function Spa() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <div className="navbar">
            <NavBar />
          </div>
          <div className="maincontent" style={{ padding: "20px" }}>
            <AppRoutes />
          </div>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default Spa;
