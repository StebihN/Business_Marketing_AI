import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function AddsResults(props) {
    const user = sessionStorage.getItem('user');
    const navigate = useNavigate();
    const addsUrl = "http://localhost:3000/adds"

    const handleSave = async () => {

        const adds = {
            user: user,
            title: props.addsResult.title,
            type: props.addsResult.type,
            text: props.addsResult.text,
            extra: props.addsResult.extra
        }

        try {
            const response = await axios.post(`${addsUrl}/save`, adds, { headers: { token: sessionStorage.getItem("token") } })
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }

        navigate('/')
    }
    return (
        <Box display='flex' flexDirection='column'>
            <Box sx={{ backgroundColor: '#F8F6F4', padding: '1rem', marginBlock: '1rem', borderRadius: '20px', boxShadow: 'inset 3px 0px 3px gray' }}>
                <Typography variant="h5">Oglasi:</Typography>
                <Typography variant="body1">Naslov: {props.addsResult.title}</Typography>
                <Typography variant="body1">Tip oglasa: {props.addsResult.type}</Typography>
                <Typography variant="body1">Besedio oglasa: {props.addsResult.text}</Typography>
                <Typography variant="body1">Dodatno: {props.addsResult.extra}</Typography>
            </Box>
            <Button variant="contained" sx={{ marginBlock: ".5rem" }} onClick={handleSave}>Shrani</Button>
            <Button variant="contained" sx={{ marginBlock: ".5rem" }} onClick={() => navigate('/')}>Domov</Button>
        </Box>
    );
}
