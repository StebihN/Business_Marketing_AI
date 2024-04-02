import React from 'react';
import { Grid, Box, Typography, Divider } from '@mui/material';


function HomePage() {
	return (
		<Grid item xs={9} padding='20px' height='95vh' overflow='auto' sx={{ overflowX: 'hidden' }}>
			<Box >
				<Typography variant="h3" >Business Marketing AI</Typography>
				<Divider sx={{ borderBottomWidth: '5px', borderColor: "1976d2", borderRadius: '5px', boxShadow: '0px 3px 3px gray', marginRight: '40%', marginBottom: '1rem' }} />
				<Typography variant="h6" >Dobrodošli v Business Marketing AI - vašemu inovativnemu partnerju za start-upe!</Typography>
			</Box>
			<Box display="flex" flexDirection='column' sx={{ backgroundColor: '#F8F6F4', padding: '1rem', marginBlock: '1rem', borderRadius: '20px', boxShadow: 'inset 3px 0px 3px gray' }}>
				<Typography variant="p" >
					Potrebujete sveže ideje, privlačna imena, povedne slogane in učinkovit promocijski material za vašo novo podjetniško idejo? Business Marketing AI je tukaj, da vam pomaga!
				</Typography>
			</Box>
			<Box display="flex" flexDirection='column' sx={{ backgroundColor: '#F8F6F4', padding: '1rem', marginBlock: '1rem', borderRadius: '20px', boxShadow: 'inset 3px 0px 3px gray' }}>
				<Typography variant="p" >
					Svet podjetništva je poln izzivov, vendar z ustvarjalnostjo in pravo podporo lahko dosežete izjemne rezultate. Business Marketing AI je vaša napredna aplikacija, ki uporablja moč umetne inteligence, da vam zagotovi vse potrebne elemente za uspeh.
				</Typography>
				<Typography variant="p" >
					Dobrodošli v Business Marketing AI - vašemu inovativnemu partnerju za start-upe!
				</Typography>
				<Typography variant="p" >
					Potrebujete sveže ideje, privlačna imena, povedne slogane in učinkovit promocijski material za vašo novo podjetniško idejo? Idejamator je tukaj, da vam pomaga!
				</Typography>
				<Typography variant="p" >
					Svet podjetništva je poln izzivov, vendar z ustvarjalnostjo in pravo podporo lahko dosežete izjemne rezultate. Idejamator je vaša napredna aplikacija, ki uporablja moč umetne inteligence, da vam zagotovi vse potrebne elemente za uspeh.
				</Typography>
			</Box>
		</Grid>
	);
}

export default HomePage;