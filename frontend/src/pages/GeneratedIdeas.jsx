import { Grid, Box, Typography, Link, Divider } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';


function GeneratedIdeas({ component: Component }) {
    const location = useLocation();
    const isActiveLink = (path) => {
        return location.pathname === path;
    };
    return (
        <Grid item xs={9} padding='20px' height='95vh' overflow='auto' sx={{overflowX:'hidden'}}>
            <Box >
                <Box marginBottom='1rem'>
                    <Typography variant="h3" >Generirane ideje</Typography>
                    <Divider  sx={{ borderBottomWidth: '5px', borderColor: "1976d2", borderRadius:'5px', boxShadow:'0px 3px 3px gray', marginRight:'40%', marginBottom:'.5rem'}}/>
                    <Link
                        component={RouterLink}
                        to="/generirane-ideje"
                        underline={isActiveLink('/generirane-ideje') ? 'always' : 'none'}
                        sx={{color:"black", marginRight:"1rem"}}
                    >
                        Imena
                    </Link>

                    <Link
                        component={RouterLink}
                        to="/generirane-ideje/slogani"
                        underline={isActiveLink('/generirane-ideje/slogani') ? 'always' : 'none'}
                        sx={{color:"black", marginRight:"1rem"}}
                    >
                        Slogani
                    </Link>

                    <Link
                        component={RouterLink}
                        to="/generirane-ideje/oglasi"
                        underline={isActiveLink('/generirane-ideje/oglasi') ? 'always' : 'none'}
                        sx={{color:"black", marginRight:"1rem"}}
                    >
                        Oglasi
                    </Link>
                </Box>
                <Component />
            </Box>
        </Grid>
    );
}

export default GeneratedIdeas;