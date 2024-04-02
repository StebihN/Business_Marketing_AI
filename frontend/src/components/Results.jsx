import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Results({ namesResult, slogansResult, addsResult }) {
    const user = sessionStorage.getItem('user');
    const namesUrl = "http://localhost:3000/names"
    const slogansUrl = "http://localhost:3000/slogans"
    const addsUrl = "http://localhost:3000/adds"
    const navigate = useNavigate();
    console.log(namesResult)

    const handleSave = async () => {
        const names = {
            user: user,
            name1: namesResult.name1,
            name2: namesResult.name2,
            name3: namesResult.name3,
            name4: namesResult.name4,
            name5: namesResult.name5,
        }
        const slogans = {
            user: user,
            slogan1: slogansResult.slogan1,
            slogan2: slogansResult.slogan2,
            slogan3: slogansResult.slogan3,
            slogan4: slogansResult.slogan4,
            slogan5: slogansResult.slogan5,
        }
        const adds = {
            user: user,
            title: addsResult.title,
            type: addsResult.type,
            text: addsResult.text,
            extra: addsResult.extra
        }
        try {
            const namesResponse = await axios.post(`${namesUrl}/save`, names, { headers: { token: sessionStorage.getItem("token") } })
            const slogansResponse = await axios.post(`${slogansUrl}/save`, slogans, { headers: { token: sessionStorage.getItem("token") } })
            const addsResponse = await axios.post(`${addsUrl}/save`, adds, { headers: { token: sessionStorage.getItem("token") } })
            console.log(namesResponse.data)
            console.log(slogansResponse.data)
            console.log(addsResponse.data)
        } catch (error) {
            console.log(error)
        }


        navigate('/')
    }
    return (
        <Box display='flex' flexDirection='column'>
            <Box sx={{ backgroundColor: '#F8F6F4', padding: '1rem', marginBlock: '1rem', borderRadius: '20px', boxShadow: 'inset 3px 0px 3px gray' }}>
                <Typography variant="h5" className="form-label">Imena:</Typography>
                <Typography variant="body1">Ime 1: {namesResult.name1}</Typography>
                <Typography variant="body1">Ime 2: {namesResult.name2}</Typography>
                <Typography variant="body1">Ime 3: {namesResult.name3}</Typography>
                <Typography variant="body1">Ime 4: {namesResult.name4}</Typography>
                <Typography variant="body1">Ime 5: {namesResult.name5}</Typography>
            </Box>
            <Box sx={{ backgroundColor: '#F8F6F4', padding: '1rem', marginBlock: '1rem', borderRadius: '20px', boxShadow: 'inset 3px 0px 3px gray' }}>
                <Typography variant="h5" className="form-label">Slogani:</Typography>
                <Typography variant="body1">Slogan 1: {slogansResult.slogan1}</Typography>
                <Typography variant="body1">Slogan 2: {slogansResult.slogan2}</Typography>
                <Typography variant="body1">Slogan 3: {slogansResult.slogan3}</Typography>
                <Typography variant="body1">Slogan 4: {slogansResult.slogan4}</Typography>
                <Typography variant="body1">Slogan 5: {slogansResult.slogan5}</Typography>
            </Box>
            <Box sx={{ backgroundColor: '#F8F6F4', padding: '1rem', marginBlock: '1rem', borderRadius: '20px', boxShadow: 'inset 3px 0px 3px gray' }}>
                <Typography variant="h5" className="form-label">Oglasi:</Typography>
                <Typography variant="body1">Naslov: {addsResult.title}</Typography>
                <Typography variant="body1">Tip: {addsResult.type}</Typography>
                <Typography variant="body1">Besedilo: {addsResult.text}</Typography>
                <Typography variant="body1">Extra: {addsResult.extra}</Typography>
            </Box>

            <Button variant="contained" sx={{marginBlock:".5rem"}} onClick={() => handleSave()} className="form-button">Shrani</Button>
            <Button variant="contained" sx={{marginBlock:".5rem"}} onClick={() => navigate('/')} className="form-button">Domov</Button>
        </Box>
    );
}
