import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function slogansResult(props) {
    const user = sessionStorage.getItem('user');
    const slogansUrl = "http://localhost:3000/slogans"
    const navigate = useNavigate();

    const handleSave = async () => {

        const slogans = {
            user: user,
            slogan1: props.slogansResult.slogan1,
            slogan2: props.slogansResult.slogan2,
            slogan3: props.slogansResult.slogan3,
            slogan4: props.slogansResult.slogan4,
            slogan5: props.slogansResult.slogan5,
        }

        try {
            const response = await axios.post(`${slogansUrl}/save`, slogans, { headers: { token: sessionStorage.getItem("token") } })
        } catch (error) {
            console.log(error)
        }


        navigate('/')
    }
    return (
        <Box display='flex' flexDirection='column'>
            <Box sx={{ backgroundColor: '#F8F6F4', padding: '1rem', marginBlock: '1rem', borderRadius: '20px', boxShadow: 'inset 3px 0px 3px gray' }}>
                <Typography variant="h5">Slogani:</Typography>
                <Typography variant="body1">Slogan 1: {props.slogansResult.slogan1}</Typography>
                <Typography variant="body1">Slogan 2: {props.slogansResult.slogan2}</Typography>
                <Typography variant="body1">Slogan 3: {props.slogansResult.slogan3}</Typography>
                <Typography variant="body1">Slogan 4: {props.slogansResult.slogan4}</Typography>
                <Typography variant="body1">Slogan 5: {props.slogansResult.slogan5}</Typography>
            </Box>
            <Button variant="contained" sx={{ marginBlock: ".5rem" }} onClick={handleSave} className="form-button">Shrani</Button>
            <Button variant="contained" sx={{ marginBlock: ".5rem" }} onClick={() => navigate('/')} className="form-button">Domov</Button>
        </Box>
    );
}
