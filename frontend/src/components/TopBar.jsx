import React from 'react';
import { IconButton, Typography, Grid, Box } from '@mui/material';
import { Close, Minimize, CropSquare } from '@mui/icons-material';
const { ipcRenderer } = window.require("electron");

const TopBar = () => {
    const ipc = ipcRenderer;

    const closeApp = () => {
        ipc.send('closeApp')
    }
    const windowApp = () => {
        ipc.send('windowApp')
    }
    const minimizeApp = () => {
        ipc.send('minimizeApp')
    }
    return (
        <Grid item xs={12} display='flex' flexDirection='row' alignItems="center" justifyContent='space-between' height='5vh' backgroundColor='#1976d2' sx={{ paddingInline: '10px' }}>
            <Box sx={{ WebkitAppRegion: 'drag',flexGrow:1 }}>
                <Box display="flex" alignItems="flex-end">
                    <img src={require('../img/logo192.png')} alt="App Logo" width='25px' sx={{ marginInline: 5 }} />
                    <Typography variant="body1" fontSize='.7rem' color='white'>Bussiness Marketing AI</Typography>
                </Box>
            </Box>
            <Box display="flex" alignItems="center">
                <IconButton onClick={() => minimizeApp()} color="inherit" sx={{ marginRight: 1 }}>
                    <Minimize />
                </IconButton>
                <IconButton onClick={() => windowApp()} color="inherit" sx={{ marginRight: 1 }}>
                    <CropSquare />
                </IconButton>
                <IconButton onClick={() => closeApp()} color="inherit" sx={{ marginRight: 1 }}>
                    <Close />
                </IconButton>
            </Box>

        </Grid>
    );
};

export default TopBar;