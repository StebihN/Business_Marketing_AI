import { Grid, Box, Typography, Link, Divider } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';


function ProfileSettings({ component: Component }) {
    const location = useLocation();

    const isActiveLink = (path) => {
        return location.pathname === path;
    };
    return (
        <Grid item xs={9} padding='20px' height='95vh' overflow='auto' sx={{overflowX:'hidden'}}>
            <Box >
                <Typography variant="h2" >Nastavitve profila</Typography>
                <Divider  sx={{ borderBottomWidth: '5px', borderColor: "1976d2", borderRadius:'5px', boxShadow:'0px 3px 3px gray', marginRight:'40%'}}/>
                <Box>
                    <Link
                        component={RouterLink}
                        to='/nastavitve-profila'
                        underline={isActiveLink('/nastavitve-profila') ? 'always' : 'none'}

                        sx={{color:"black", marginRight:"1rem"}}
                    >
                        Podatki
                    </Link>
                    <Link
                        component={RouterLink}
                        to='/nastavitve-profila/geslo'
                        underline={isActiveLink('/nastavitve-profila/geslo') ? 'always' : 'none'}

                        sx={{color:"black", marginRight:"1rem"}}
                    >
                        Geslo
                    </Link>
                </Box>
                <Component />
            </Box>
        </Grid>
    );
}

export default ProfileSettings;