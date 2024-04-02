import { Grid, Box, Typography, Divider } from '@mui/material';
import { useState } from 'react';

function AddGenerator({ component: Component }) {
    const [addsResult, setAddsResult] = useState();

    return (
        <Grid item xs={9} padding='20px' height='95vh' overflow='auto' sx={{overflowX:'hidden'}}>
            <Box >
                <Typography variant="h3" >Generator oglasov</Typography>
                <Divider  sx={{ borderBottomWidth: '5px', borderColor: "1976d2", borderRadius:'5px', boxShadow:'0px 3px 3px gray', marginRight:'40%', marginBottom:'1rem'}}/>
                <Component setAddsResult={setAddsResult} addsResult={addsResult} buttonText="Generiraj" />
            </Box>
        </Grid>
    );
}

export default AddGenerator;
