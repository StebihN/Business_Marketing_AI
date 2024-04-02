import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function NamesResult(props) {
    const user = sessionStorage.getItem('user');
    const namesUrl = "http://localhost:3000/names"
    const navigate = useNavigate();

    console.log(props)
    const handleSave = async () => {
        const names = {
            user: user,
            name1: props.namesResult.name1,
            name2: props.namesResult.name2,
            name3: props.namesResult.name3,
            name4: props.namesResult.name4,
            name5: props.namesResult.name5,
        }

        try {
            const response = await axios.post(`${namesUrl}/save`, names, { headers: { token: sessionStorage.getItem("token") } })
        } catch (error) {
            console.log(error)
        }


        navigate('/')
    }
    return (
        <Box display='flex' flexDirection='column'>
            <Box sx={{ backgroundColor: '#F8F6F4', padding: '1rem', marginBlock: '1rem', borderRadius: '20px', boxShadow: 'inset 3px 0px 3px gray' }}>
                <Typography variant="h5" >Imena:</Typography>
                <Typography variant="body1">Ime 1: {props.namesResult.name1}</Typography>
                <Typography variant="body1">Ime 2: {props.namesResult.name2}</Typography>
                <Typography variant="body1">Ime 3: {props.namesResult.name3}</Typography>
                <Typography variant="body1">Ime 4: {props.namesResult.name4}</Typography>
                <Typography variant="body1">Ime 5: {props.namesResult.name5}</Typography>
            </Box>
            <Button variant="contained" sx={{ marginBlock: ".5rem" }} onClick={handleSave} className="form-button">Shrani</Button>
            <Button variant="contained" sx={{ marginBlock: ".5rem" }} onClick={() => navigate('/')} className="form-button">Domov</Button>
        </Box>
    );
}
