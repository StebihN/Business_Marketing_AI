import { Box, Typography, Button } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function GetNames(props) {
    const [names, setNames] = useState([]);
    const navigate = useNavigate();
    const url = "http://localhost:3000/names/"

    useEffect(() => {
        get()
    }, [])

    const get = async () => {
        try {
            const response = await axios.get(`${url}/get/${sessionStorage.getItem("user")}`, { headers: { token: sessionStorage.getItem("token") } })
            console.log(response.data)
            setNames(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const remove = async (id) => {
        try {
            const response = await axios.delete(`${url}/delete/${id}`, { headers: { token: sessionStorage.getItem("token") } })
            get()
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    function MapNames() {
        let elements = []
        if (names.length !== 0) {
            names.map((name, index) => {
                elements.push(
                    <Box display='flex' flexDirection='row' justifyContent='space-between' id={"name" + index} key={index} sx={{ backgroundColor: '#F8F6F4', padding: '1rem', marginBlock: '1rem', borderRadius: '20px', boxShadow: 'inset 3px 0px 3px gray' }}>
                        <Box maxWidth='80%'>
                            <Typography variant="body1">1. {name.names.name1}</Typography>
                            <Typography variant="body1">2. {name.names.name2}</Typography>
                            <Typography variant="body1">3. {name.names.name3}</Typography>
                            <Typography variant="body1">4. {name.names.name4}</Typography>
                            <Typography variant="body1">5. {name.names.name5}</Typography>
                        </Box>
                        <Button variant='contained' sx={{ marginBlock: '1rem', height: 'fit-content' }} onClick={() => remove(name._id)}>izbriši</Button>
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
                    <Typography variant="body1">Ni Imen</Typography>
                    <Button onClick={() => navigate('../../generator-imen')} >Generiraj!</Button>
                </Box>)
        }
    }
    return (
        <>
            <MapNames />
        </>
    );
}
