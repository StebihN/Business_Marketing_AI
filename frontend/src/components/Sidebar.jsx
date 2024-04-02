import { Grid, List, ListItemButton, ListItemText, Box, Avatar, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import CampaignIcon from '@mui/icons-material/Campaign';
import BadgeIcon from '@mui/icons-material/Badge';
import CameraIcon from '@mui/icons-material/Camera';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Sidebar() {
    const navigate = useNavigate();
    let timestamp = Math.floor(Date.now() / 1000);

    useEffect(() => {
        if (sessionStorage.getItem("expires") < timestamp) {
            handleLogout()
            console.log("not logged in, redirecting...")
        }
    })

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("expires");
        navigate('/login')
    }

    return (
        <Grid display='flex' flexDirection="column" justifyContent="space-between" height='95vh' sx={{backgroundColor:"#C4DFDF", boxShadow:'3px 3px 3px black'}} item xs={3}>
            <Box>
                <Box display="flex" alignItems="flex-end" sx={{ padding: "8px 16px" }}>
                    <Avatar src={require('../img/logo192.png')} alt="Logo" variant="square" />
                    <Typography variant="subtitle1" component="h3" sx={{ maxWidth: '15ch', lineHeight: '1rem', color: '#1976d2' }}>
                        Business Marketing AI
                    </Typography>
                </Box>
                <List>
                    <ListItemButton component={Link} to="/">
                        <HomeIcon/>
                        <ListItemText primary="Domov" />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/generator-idej">
                        <LightbulbIcon/>
                        <ListItemText primary="Generator idej" />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/generator-imen">
                        <BadgeIcon/>
                        <ListItemText primary="Generator imen" />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/generator-sloganov">
                        <CampaignIcon/>
                        <ListItemText primary="Generator sloganov" />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/generator-oglasov">
                        <CameraIcon/>
                        <ListItemText primary="Generator oglasov" />
                    </ListItemButton>
                </List>
            </Box>
            <List>
                <ListItemButton component={Link} to="/generirane-ideje">
                    <LightbulbOutlinedIcon/>
                    <ListItemText primary="Generirane ideje" />
                </ListItemButton>
                <ListItemButton component={Link} to="/nastavitve-profila">
                    <PersonOutlineOutlinedIcon/>
                    <ListItemText primary="Nastavitve profila" />
                </ListItemButton>
                <ListItemButton onClick={handleLogout}>
                    <LogoutOutlinedIcon/>
                    <ListItemText primary="Odjava" />
                </ListItemButton>
            </List>
        </Grid>
    )
}