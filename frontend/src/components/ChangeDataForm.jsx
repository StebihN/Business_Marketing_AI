import { Box, Typography, TextField, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ChangeDataForm() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [errors, setErrors] = useState('');
    const url = "http://localhost:3000/users/"

    useEffect(() => {
        get()
    }, [])

    const get = async () => {
        try {
            const response = await axios.get(`${url}/${sessionStorage.getItem("user")}`, { headers: { token: sessionStorage.getItem("token") } })
            console.log(response.data)
            setEmail(response.data.email)
            setUsername(response.data.username)
        }
        catch (error) {
            console.log(error)
        }
    }


    const validateEmail = (email) => {
        const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
        if (email.trim() === '') {
            return 'Email ne sme biti prazen';
        } else if (!regex.test(email)) {
            return 'Email nima pravilne oblike';
        }
        return '';
    };

    const validateUsername = (username) => {
        if (username.trim() === '') {
            return 'Uporabniško ime ne sme biti prazno';
        }
        return '';
    };

    const handleDataSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const emailError = validateEmail(email);
        const usernameError = validateUsername(username);

        if (emailError || usernameError) {
            setErrors({ emailError, usernameError });
            return;
        }

        const user = {
            username: username,
            email: email
        };

        try {
            const response = await axios.put(`${url}/${sessionStorage.getItem("user")}`, user, { headers: { token: sessionStorage.getItem("token") } });
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Box display="flex" flexDirection="column" component="form" onSubmit={handleDataSubmit}>
            <TextField
                label="Uporabniško ime"
                type="text"
                value={username}
                error={errors.usernameError}
                helperText={errors.usernameError}
                onChange={(event) => setUsername(event.target.value)}

                sx={{marginBlock:'1rem'}}
            />
       
            <TextField
                label="Email"
                type="text"
                value={email}
                error={errors.emailError}
                helperText={errors.emailError}
                onChange={(event) => setEmail(event.target.value)}
                
                sx={{marginBlock:'1rem'}}
            />

            <Button variant="contained" type="submit">Posodobi</Button>
        </Box>
    );
}