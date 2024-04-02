import { Box, Typography, Button, CircularProgress, Backdrop } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
const { ipcRenderer } = window.require("electron");

export default function Summary({ namesEntry, slogansEntry, addsEntry, setNamesResult, setSloganResult, setAddsResult }) {
    const [errors, setErrors] = useState('');
    const [isPending, setIsPending] = useState(false);
    const ipc = ipcRenderer;

    const navigate = useNavigate();
    const namesUrl = "http://localhost:3000/names"
    const slogansUrl = "http://localhost:3000/slogans"
    const addsUrl = "http://localhost:3000/adds"

    const validateNames = (names) => {
        if (!names) {
            return 'Za generacijo imen morate izpolniti obrazec';
        }
    }

    const validateSlogans = (slogans) => {
        if (!slogans) {
            return 'Za generacijo sloganov morate izpolniti obrazec';
        }
    }

    const validateAdds = (adds) => {
        if (!adds) {
            return 'Za generacijo oglasov morate izpolniti obrazec';
        }
    }

    const handleSubmit = async () => {
        setErrors({});

        const namesError = validateNames(namesEntry);
        const slogansError = validateSlogans(slogansEntry);
        const addsError = validateAdds(addsEntry);
        let requestError = "";

        if (namesError || slogansError || addsError) {
            setErrors({ namesError, slogansError, addsError });
            return;
        }

        setIsPending(true)

        try {
            const namesResponse = await axios.post(`${namesUrl}/generate`, namesEntry, { headers: { token: sessionStorage.getItem("token") } })
            const slogansResposne = await axios.post(`${slogansUrl}/generate`, slogansEntry, { headers: { token: sessionStorage.getItem("token") } })
            const addsResponse = await axios.post(`${addsUrl}/generate`, addsEntry, { headers: { token: sessionStorage.getItem("token") } })

            console.log(namesResponse.data)
            console.log(slogansResposne.data)
            console.log(addsResponse.data)

            setNamesResult(namesResponse.data)
            setSloganResult(slogansResposne.data)
            setAddsResult(addsResponse.data)

            setIsPending(false)
            ipc.send('done')
            navigate('/generator-idej/rezultati')
        } catch (error) {
            console.log(error.response.data.message)
            requestError = "Prišlo je do napake pri generiranju sloganov:" + error.response.data.message
            setErrors({ requestError })
            setIsPending(false)
        }

    }
    return (
        <Box display='flex' flexDirection='column'>
            {errors.requestError && (
                <Typography sx={{ color: 'red' }}>{errors.requestError}</Typography>
            )}
            <Box sx={{ backgroundColor: '#F8F6F4', padding: '1rem', marginBlock: '1rem', borderRadius: '20px', boxShadow: 'inset 3px 0px 3px gray' }}>
                <Typography variant="h5" >Generator imen:</Typography>
                {namesEntry ?
                    <>
                        <Typography variant="body1">Področje podjetja: {namesEntry.field}</Typography>
                        <Typography variant="body1">Produkti oz. storitve podjetja: {namesEntry.products}</Typography>
                    </>
                    :
                    < >
                        <Typography variant="body1">izpolnite obrazec</Typography>
                        {errors.namesError && <Typography sx={{ color: 'red' }}>{errors.namesError}</Typography>}
                    </>
                }
            </Box>
            <Box sx={{ backgroundColor: '#F8F6F4', padding: '1rem', marginBlock: '1rem', borderRadius: '20px', boxShadow: 'inset 3px 0px 3px gray' }}>
                <Typography variant="h5" >Generator sloganov:</Typography>
                {slogansEntry ?
                    <>
                        <Typography variant="body1">Področje podjetja: {slogansEntry.field}</Typography>
                        <Typography variant="body1">Produkti oz. storitve podjetja: {slogansEntry.products}</Typography>
                        <Typography variant="body1">Ciljna publika: {slogansEntry.target}</Typography>
                        <Typography variant="body1">Željena dolžina slogana: {slogansEntry.length}</Typography>
                    </>
                    :
                    <>
                        <Typography variant="body1">izpolnite obrazec</Typography>
                        {errors.slogansError && <Typography sx={{ color: 'red' }}>{errors.slogansError}</Typography>}
                    </>
                }
            </Box>
            <Box sx={{ backgroundColor: '#F8F6F4', padding: '1rem', marginBlock: '1rem', borderRadius: '20px', boxShadow: 'inset 3px 0px 3px gray' }}>
                <Typography variant="h5" >Generator oglasov:</Typography>
                {addsEntry ?
                    <>
                        <Typography variant="body1">Področje podjetja: {addsEntry.description}</Typography>
                        <Typography variant="body1">Tip oglasa: {addsEntry.type}</Typography>
                        <Typography variant="body1">Ciljna publika: {addsEntry.target}</Typography>
                        <Typography variant="body1">Željena dolžina besedila oglasa: {addsEntry.length}</Typography>
                    </>
                    :
                    <>
                        <Typography variant="body1">izpolnite obrazec</Typography>
                        {errors.addsError && <Typography sx={{ color: 'red' }}>{errors.addsError}</Typography>}
                    </>
                }
            </Box>
            <Button variant="contained" onClick={() => handleSubmit()}>Generiraj</Button>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isPending}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    );
}
