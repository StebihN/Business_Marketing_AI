import { Box, TextField, Button, MenuItem, CircularProgress, Backdrop, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
const { ipcRenderer } = window.require("electron");

export default function AddGeneratorForm({ setAddsResult, setAddsEntry, addsEntry, buttonText }) {
    const [isPending, setIsPending] = useState(false);
    const [product, setProduct] = useState("")
    const [description, setDescription] = useState("")
    const [target, setTarget] = useState("")
    const [type, setType] = useState("video")
    const [length, setLength] = useState("")
    const [errors, setErrors] = useState('');
    const addsUrl = "http://localhost:3000/adds"
    const navigate = useNavigate();
    const location = useLocation();
    const ipc = ipcRenderer;

    useEffect(() => {
        if (addsEntry) {
            setProduct(addsEntry.product)
            setDescription(addsEntry.description)
            setTarget(addsEntry.target)
            setType(addsEntry.type)
            setLength(addsEntry.length)
        }
    }, [])

    const isActiveLink = (path) => {
        return location.pathname === path;
    };

    const validateProduct = (product) => {
        if (product.trim() === '') {
            return 'Izdelek ne sme biti prazen.';
        }
        return '';
    };

    const validateDescription = (description) => {
        if (description.trim() === '') {
            return 'Opis izdelka ne sme biti prazen.';
        }
        return '';
    };

    const validateTarget = (target) => {
        if (target.trim() === '') {
            return 'Ciljna publika ne sme biti prazna.';
        }
        return '';
    };

    const validateLength = (length) => {
        if (length.trim() === '') {
            return 'Dolžina oglasa ne sme biti prazen.';
        }
        else if (length > 40 || length < 10) {
            return 'Dolžina oglasa mora biti med 10 in 40 besedami';
        }
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const productError = validateProduct(product);
        const descriptionError = validateDescription(description);
        const targetError = validateTarget(target);
        const lengthError = validateLength(length);
        let requestError = "";

        if (productError || descriptionError || targetError || lengthError) {
            setErrors({ productError, descriptionError, targetError, lengthError });
            return;
        }

        const entry = {
            product,
            description,
            target,
            type,
            length
        };
        if (isActiveLink("/generator-oglasov")) {
            setIsPending(true);
            try {
                const response = await axios.post(`${addsUrl}/generate`, entry, { headers: { token: sessionStorage.getItem("token") } })
                setAddsResult(response.data)
                setIsPending(false);
                ipc.send('done')
                navigate('/generator-oglasov/rezultati')
            } catch (error) {
                console.log(error.response.data.message)
                requestError = "Prišlo je do napake pri generiranju oglasa:" + error.response.data.message
                setErrors({ requestError })
                setIsPending(false)
            }
        }
        else {
            setAddsEntry(entry);
            navigate('/generator-idej/pregled')
        }
    };
    return (
        <Box display="flex" flexDirection="column" component="form" onSubmit={handleSubmit}>

            {errors.requestError && (
                <Typography sx={{ color: 'red' }}>{errors.requestError}</Typography>
            )}

            <TextField
                label="Izdelek oz. storitev"
                type="text"
                value={product}
                error={errors.productError}
                helperText={errors.productError}
                onChange={(event) => setProduct(event.target.value)}

                sx={{ marginBlock: '.5rem' }}
            />
            <TextField
                label="Opis izdelka oz. storitve"
                type="text"
                value={description}
                error={errors.descriptionError}
                helperText={errors.descriptionError}
                onChange={(event) => setDescription(event.target.value)}

                sx={{ marginBlock: '.5rem' }}
            />
            <TextField
                select
                value={type}
                label="Tip oglasa"
                onChange={(event) => setType(event.target.value)}
                sx={{ marginBlock: '.5rem' }}
            >
                <MenuItem value="video">video</MenuItem>
                <MenuItem value="poster">plakat</MenuItem>
                <MenuItem value="post">Objava na družbenih omrežjih</MenuItem>
            </TextField>

            <TextField
                label="Ciljna publika"
                type="text"
                value={target}
                error={errors.targetError}
                helperText={errors.targetError}
                onChange={(event) => setTarget(event.target.value)}

                sx={{ marginBlock: '.5rem' }}
            />

            <TextField
                label="Željena dolžina besedila (vnesite število besed)"
                type="number"
                value={length}
                error={errors.lengthError}
                helperText={errors.lengthError}
                onChange={(event) => setLength(event.target.value)}

                sx={{ marginBlock: '.5rem' }}
            />

            <Button type="submit" variant="contained" >{buttonText}</Button>

            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isPending}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    );
}
