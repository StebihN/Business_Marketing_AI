import React from 'react';

import { createHashRouter, Outlet, RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

import { Grid } from '@mui/material';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

import HomePage from './pages/HomePage';
import Sidebar from './components/Sidebar';
import ErrorPage from './pages/ErrorPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import IdeaGenerator from './pages/IdeaGenerator';
import NameGenerator from './pages/NameGenerator';
import SloganGenerator from './pages/SloganGenerator';
import AddGenerator from './pages/AddGenerator';
import GeneratedIdeas from './pages/GeneratedIdeas';
import ProfileSettings from './pages/ProfileSettings';

import NameGeneratorForm from './components/NameGeneratorForm';
import SloganGeneratorForm from './components/SloganGeneratorForm';
import AddGeneratorForm from './components/AddGeneratorForm';
import Summary from './components/Summary';
import Results from './components/Results';
import NamesResult from './components/NamesResult';
import SlogansResult from './components/SlogansResult';
import AddsResult from './components/AddsResult';
import GetNames from './components/GetNames';
import GetSlogans from './components/GetSlogans';
import GetAdds from './components/GetAdds';
import ChangeDataForm from './components/ChangeDataForm';
import ChangePasswordForm from './components/ChangePasswordForm';
import TopBar from './components/TopBar';
import RedRose from './fonts/RedRose.ttf'

const theme = createTheme({
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                "@font-face": {
                    fontFamily: "RedRose",
                    src: `url(${RedRose})`
                },
                '*': {
                    fontFamily: 'RedRose !important',
                    margin: 0,
                    scrollbarColor: '#C4DFDF',
                    ' *::-webkit-scrollbar': {
                        width: '6px',
                        backgroundColor: '#C4DFDF',
                    },
                    '*::-webkit-scrollbar-thumb': {
                        borderRadius: '3px',
                        backgroundColor: '#1976d2',
                        border: 'none',
                        boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 4px',
                    },
                },
            },
        },
    },
});



const AppLayout = () => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Grid container sx={{ backgroundColor: "#E3F4F4" }}>
            <TopBar />
            <Sidebar />
            <Outlet />
        </Grid>
    </ThemeProvider>
)

const router = createHashRouter([
    {
        element: <AppLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <HomePage />
            },
            {
                path: '/generator-idej',
                children: [
                    {
                        path: '/generator-idej',
                        element: <IdeaGenerator component={NameGeneratorForm} />
                    },
                    {
                        path: '/generator-idej/slogani',
                        element: <IdeaGenerator component={SloganGeneratorForm} />
                    },
                    {
                        path: '/generator-idej/oglasi',
                        element: <IdeaGenerator component={AddGeneratorForm} />
                    },
                    {
                        path: '/generator-idej/pregled',
                        element: <IdeaGenerator component={Summary} />
                    },
                    {
                        path: '/generator-idej/rezultati',
                        element: <IdeaGenerator component={Results} />
                    }
                ]
            },
            {
                path: '/generator-imen',
                children: [
                    {
                        path: '/generator-imen',
                        element: <NameGenerator component={NameGeneratorForm} />
                    },
                    {
                        path: '/generator-imen/rezultati',
                        element: <NameGenerator component={NamesResult} />
                    }
                ]
            },
            {
                path: '/generator-sloganov',
                children: [
                    {
                        path: '/generator-sloganov',
                        element: <SloganGenerator component={SloganGeneratorForm} />
                    },
                    {
                        path: '/generator-sloganov/rezultati',
                        element: <SloganGenerator component={SlogansResult} />
                    }
                ]
            },
            {
                path: '/generator-oglasov',
                children: [
                    {
                        path: '/generator-oglasov',
                        element: <AddGenerator component={AddGeneratorForm} />
                    },
                    {
                        path: '/generator-oglasov/rezultati',
                        element: <AddGenerator component={AddsResult} />
                    }
                ]
            },
            {
                path: '/generirane-ideje',
                children: [
                    {
                        path: '/generirane-ideje',
                        element: <GeneratedIdeas component={GetNames} />
                    },
                    {
                        path: '/generirane-ideje/slogani',
                        element: <GeneratedIdeas component={GetSlogans} />
                    },
                    {
                        path: '/generirane-ideje/oglasi',
                        element: <GeneratedIdeas component={GetAdds} />
                    }
                ]
            },
            {
                path: '/nastavitve-profila',
                children: [
                    {
                        path: '/nastavitve-profila',
                        element: <ProfileSettings component={ChangeDataForm} />
                    },
                    {
                        path: '/nastavitve-profila/geslo',
                        element: <ProfileSettings component={ChangePasswordForm} />
                    }
                ]
            }
        ]
    },
    {
        path: '/login',
        element:
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Grid container sx={{ backgroundColor: '#C4DFDF' }}>
                    <TopBar />
                    <LoginPage />
                </Grid>
            </ThemeProvider>
    },
    {
        path: '/register',
        element:
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Grid container sx={{ backgroundColor: '#C4DFDF' }}>
                    <TopBar />
                    <RegisterPage />
                </Grid>
            </ThemeProvider>
    }
])


createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
