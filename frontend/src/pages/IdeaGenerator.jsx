import { Grid, Box, Typography, Link, Divider } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useState } from 'react';



function IdeaGenerator({ component: Component }) {
    const [namesEntry, setNamesEntry] = useState();
    const [slogansEntry, setSlogansEntry] = useState();
    const [addsEntry, setAddsEntry] = useState();
    const [namesResult, setNamesResult] = useState();
    const [slogansResult, setSloganResult] = useState();
    const [addsResult, setAddsResult] = useState();
    const location = useLocation();

    const isActiveLink = (path) => {
        return location.pathname === path;
    };

    return (
        <Grid item xs={9} padding='20px' height='95vh' overflow='auto' sx={{overflowX:'hidden'}}>
            <Box >
                <Box marginBottom='1rem'>
                    <Typography variant="h3" >Generator idej</Typography>
                    <Divider  sx={{ borderBottomWidth: '5px', borderColor: "1976d2", borderRadius:'5px', boxShadow:'0px 3px 3px gray', marginRight:'40%', marginBottom:'.5rem'}}/>
                    <Link
                        component={RouterLink}
                        to="/generator-idej"
                        underline={isActiveLink('/generator-idej') ? 'always' : 'none'}
                        sx={{color:"black", marginRight:"1rem"}}
                    >
                        Imena
                    </Link>

                    <Link
                        component={RouterLink}
                        to="/generator-idej/slogani"
                        underline={isActiveLink('/generator-idej/slogani') ? 'always' : 'none'}
                        sx={{color:"black", marginRight:"1rem"}}
                    >
                        Slogani
                    </Link>

                    <Link
                        component={RouterLink}
                        to="/generator-idej/oglasi"
                        underline={isActiveLink('/generator-idej/oglasi') ? 'always' : 'none'}
                        sx={{color:"black", marginRight:"1rem"}}
                    >
                        Oglasi
                    </Link>

                    <Link
                        component={RouterLink}
                        to="/generator-idej/pregled"
                        underline={isActiveLink('/generator-idej/pregled') ? 'always' : 'none'}
                        sx={{color:"black", marginRight:"1rem"}}
                    >
                        Pregled
                    </Link>
                </Box>
                <Component
                    setNamesEntry={setNamesEntry}
                    namesEntry={namesEntry}
                    setSlogansEntry={setSlogansEntry}
                    slogansEntry={slogansEntry}
                    setAddsEntry={setAddsEntry}
                    addsEntry={addsEntry}

                    setNamesResult={setNamesResult}
                    namesResult={namesResult}
                    setSloganResult={setSloganResult}
                    slogansResult={slogansResult}
                    setAddsResult={setAddsResult}
                    addsResult={addsResult}

                    buttonText="Naprej" />

            </Box>
        </Grid>
    );
}

export default IdeaGenerator;
