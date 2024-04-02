import { Box, Typography, Button } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function GetSlogans(props) {
    const [slogans, setSlogans] = useState([]);
    const navigate = useNavigate();
    const url = "http://localhost:3000/slogans/"

    useEffect(() => {
        get()
    }, [])

    const get = async () => {
        try {
            const response = await axios.get(`${url}/get/${sessionStorage.getItem("user")}`, { headers: { token: sessionStorage.getItem("token") } })
            console.log(response.data)
            setSlogans(response.data)
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

    function MapSlogans() {
        let elements = []
        if (slogans.length !== 0) {
            slogans.map((slogan, index) => {
                elements.push(
                    <Box display='flex' flexDirection='row' justifyContent='space-between' id={"name" + index} key={index} sx={{ backgroundColor: '#F8F6F4', padding: '1rem', marginBlock: '1rem', borderRadius: '20px', boxShadow: 'inset 3px 0px 3px gray' }}>
                        <Box maxWidth='80%'>
                            <Typography variant="body1">1. {slogan.slogans.slogan1}</Typography>
                            <Typography variant="body1">2. {slogan.slogans.slogan2}</Typography>
                            <Typography variant="body1">3. {slogan.slogans.slogan3}</Typography>
                            <Typography variant="body1">4. {slogan.slogans.slogan4}</Typography>
                            <Typography variant="body1">5. {slogan.slogans.slogan5}</Typography>
                        </Box>
                        <Button variant='contained' sx={{ marginBlock: '1rem', height: 'fit-content', alignSelf: "baseline" }} onClick={() => remove(slogan._id)}>izbriši</Button>
                    </Box>
                )
                return null
            });
            return (<>{elements}</>)
        }
        else {
            return (
                <Box display='flex' flexDirection='column' justifyContent='center' alignItems="center" height="60vh">
                    <HighlightOffIcon/>
                    <Typography variant="body1">Ni Sloganov</Typography>
                    <Button onClick={() => navigate('../../generator-sloganov')} >Generiraj!</Button>
                </Box>
            )
        }
    }
    return (
        <MapSlogans />
    );
}
