import { Grid, Box, Typography,Divider } from '@mui/material';
import { useState } from 'react';

function SloganGenerator({ component: Component }) {
    const [slogansResult, setSlogansResult] = useState();
    return (
        <Grid item xs={9} padding='20px' maxHeight='95vh' overflow='auto' sx={{overflowX:'hidden'}}>
            <Box >
                <Typography variant="h3" >Generator sloganov</Typography>
                <Divider  sx={{ borderBottomWidth: '5px', borderColor: "1976d2", borderRadius:'5px', boxShadow:'0px 3px 3px gray', marginRight:'40%', marginBottom:'1rem'}}/>
                <Component setSlogansResult={setSlogansResult} slogansResult={slogansResult} buttonText="Generiraj" />
            </Box>
        </Grid>
    );
}

export default SloganGenerator;
