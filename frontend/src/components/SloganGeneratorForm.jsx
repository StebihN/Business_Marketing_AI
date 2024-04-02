import { Box, TextField, Button, CircularProgress, Backdrop, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
const { ipcRenderer } = window.require("electron");

export default function NameGeneratorForm({ setSlogansResult, setSlogansEntry, slogansEntry, buttonText }) {
    const [isPending, setIsPending] = useState(false);
    const [field, setField] = useState("")
    const [products, setProducts] = useState("")
    const [target, setTarget] = useState("")
    const [length, setLength] = useState("")
    const [errors, setErrors] = useState('');
    const slogansUrl = "http://localhost:3000/slogans"
    const navigate = useNavigate();
    const location = useLocation();
    const ipc = ipcRenderer;

    useEffect(() => {
        if (slogansEntry) {
            setField(slogansEntry.field)
            setProducts(slogansEntry.products)
            setTarget(slogansEntry.target)
            setLength(slogansEntry.length)
        }
    }, [])

    const isActiveLink = (path) => {
        return location.pathname === path;
    };

    const validateField = (field) => {
        if (field.trim() === '') {
            return 'Področje podjetja ne sme biti prazno.';
        }
        return '';
    };

    const validateProducts = (products) => {
        if (products.trim() === '') {
            return 'Izdelki oz. storitve ne smejo biti prazni.';
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
            return 'Dolžina slogana ne sme biti prazna.';
        }
        else if (length > 10 || length < 4) {
            return 'Dolžina slogana mora biti med 4 in 10 besedami';
        }
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const fieldError = validateField(field);
        const productsError = validateProducts(products);
        const targetError = validateTarget(target);
        const lengthError = validateLength(length);
        let requestError = "";

        if (fieldError || productsError || targetError || lengthError) {
            setErrors({ fieldError, productsError, targetError, lengthError });
            return;
        }

        const entry = {
            field,
            products,
            target,
            length
        };
        if (isActiveLink("/generator-sloganov")) {
            setIsPending(true);
            try {
                const response = await axios.post(`${slogansUrl}/generate`, entry, { headers: { token: sessionStorage.getItem("token") } })
                console.log(response.data)
                setSlogansResult(response.data)
                setIsPending(false);
                ipc.send('done')
                navigate('/generator-sloganov/rezultati')
            } catch (error) {
                console.log(error.response.data.message)
                requestError = "Prišlo je do napake pri generiranju sloganov:" + error.response.data.message
                setErrors({ requestError })
                setIsPending(false)
            }
        }
        else {
            setSlogansEntry(entry)
            navigate('/generator-idej/oglasi')
        }
    };
    return (
        <Box display="flex" flexDirection="column" component="form" onSubmit={handleSubmit}>

            {errors.requestError && (
                <Typography sx={{ color: 'red' }}>{errors.requestError}</Typography>
            )}

            <TextField
                label="Področje podjetja"
                type="text"
                value={field}
                error={errors.fieldError}
                helperText={errors.fieldError}
                onChange={(event) => setField(event.target.value)}

                sx={{ marginBlock: '.5rem' }}
            />

            <TextField
                label="Izdelki oz. storitve, ki jih podjetje ponuja"
                type="text"
                value={products}
                error={errors.productsError}
                helperText={errors.productsError}
                onChange={(event) => setProducts(event.target.value)}

                sx={{ marginBlock: '.5rem' }}
            />

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
                label="Željena dolžina (Vnesite število besed)"
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
