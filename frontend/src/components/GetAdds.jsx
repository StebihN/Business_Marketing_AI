import { Box, Typography, Button } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function GetAdds() {
    const [adds, setAdds] = useState([]);
    const navigate = useNavigate();
    const url = "http://localhost:3000/adds/"

    useEffect(() => {
        get()
    }, [])

    const get = async () => {
        try {
            const response = await axios.get(`${url}/get/${sessionStorage.getItem("user")}`, { headers: { token: sessionStorage.getItem("token") } })
            console.log(response.data)
            setAdds(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const remove = async (id) => {
        try {
            const response = await axios.delete(`${url}/delete/${id}`, { headers: { token: sessionStorage.getItem("token") } })
            get()
        } catch (error) {
            console.log(error)
        }

    }

    function MapAdds() {
        let elements = []
        if (adds.length !== 0) {
            adds.map((add, index) => {
                elements.push(
                    <Box display='flex' flexDirection='row' justifyContent='space-between' id={"name" + index} key={index} sx={{ backgroundColor: '#F8F6F4', padding: '1rem', marginBlock: '1rem', borderRadius: '20px', boxShadow: 'inset 3px 0px 3px gray' }}>
                        <Box maxWidth='80%'>
                            <Typography variant="h5">Naslov oglasa:</Typography>
                            <Typography variant="body1"> {add.title}</Typography>
                            <Typography variant="h5">Tip oglasa:</Typography>
                            <Typography variant="body1">{add.type}</Typography>
                            <Typography variant="h5">Besedilo oglasa:</Typography>
                            <Typography variant="body1">{add.text}</Typography>
                            <Typography variant="h5">Dodatno: </Typography>
                            <Typography variant="body1">{add.extra}</Typography>
                        </Box>
                        <Button variant='contained' sx={{ marginBlock: '1rem', height: 'fit-content' }} onClick={() => remove(add._id)}>izbriši</Button>
                    </Box>
                )
                return null
            });
            return (<>{elements}</>)
        }
        else {
            return (
                <Box display='flex' flexDirection='column' justifyContent='center' alignItems="center" height="60vh">
                    <HighlightOffIcon />
                    <Typography variant="body1">Ni Oglasov</Typography>
                    <Button onClick={() => navigate('../../generator-oglasov')} >Generiraj!</Button>
                </Box>)
        }
    }
    return (
        <>
            <MapAdds />
        </>
    );
}
