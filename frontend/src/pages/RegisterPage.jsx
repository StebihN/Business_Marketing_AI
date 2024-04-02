import { Grid, Box, Typography, TextField, Button } from '@mui/material';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import jwt from 'jwt-decode'
import axios from 'axios';

function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState('');
    const navigate = useNavigate();
    const url = "http://localhost:3000/auth/register"

    const validateUsername = (username) => {
        if (username.trim() === '') {
            return 'Uporabniško ime ne sme biti prazen';
        }
        return '';
    };

    const validateEmail = (email) => {
        const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
        if (email.trim() === '') {
            return 'Email ne sme biti prazen';
        } else if (!regex.test(email)) {
            return 'Email nima pravilne oblike';
        }
        return '';
    };

    const validatePassword = (password) => {
        const regex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g)
        if (password.trim() === '') {
            return 'Geslo ne sme biti prazno';
        }
        else if (!regex.test(password)) {
            return 'Geslo mora imeti vsaj 8 znakov, vsaj eno črko in vsaj eno število';
        }
        return '';
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const emailError = validateEmail(email);
        const usernameError = validateUsername(username);
        const passwordError = validatePassword(password)
        let existingUserError;

        if (emailError || usernameError || passwordError) {
            setErrors({ emailError, usernameError, passwordError });
            return;
        }

        const creds = {
            username,
            email,
            password
        };
        try {
            const response = await axios.post(url, creds)
            sessionStorage.setItem("user", jwt(response.data.token).user);
            sessionStorage.setItem("expires", jwt(response.data.token).exp);
            sessionStorage.setItem("token", response.data.token);
            navigate('/');
        } catch (error) {
            if (error.response.status === 409) {
                existingUserError = 'Uporabnik z tem elektronskim naslovom že obstaja';
                setErrors({ existingUserError });
            } else {
                console.log(error.message);
            }
        }
    };

    return (
        <Grid item xs={12} display="flex" alignItems="center" justifyContent="center" height='95vh'>

            <Box display="flex" flexDirection="column" alignItems='center' justifyContent="space-between" minHeight="85vh" sx={{ backgroundColor: '#F8F6F4', textAlign: 'center', border: '2px solid black', borderRadius: '20px', padding: '10px', boxShadow: 'inset 3px 0px 3px gray' }}>
                <Box>
                    <img src={require('../img/logo192.png')} width="30%" alt="logo" />
                    <Typography variant="h4" sx={{ mt: 2 }}>Bussiness Marketing AI</Typography>
                </Box>
                <Box
                    component="form"
                    onSubmit={onSubmit}
                    display="flex"
                    flexDirection="column"
                    alignItems='center'
                    sx={{ mt: 2 }}
                >
                    {errors.existingUserError && (
                        <Typography>{errors.existingUserError}</Typography>
                    )}

                    <TextField
                        label="Uporabniško ime"
                        value={username}
                        error={errors.usernameError}
                        helperText={errors.usernameError}
                        onChange={(event) => setUsername(event.target.value)}

                        sx={{ marginBlock: '.5rem' }}
                    />

                    <TextField
                        label="Email"
                        value={email}
                        error={errors.emailError}
                        helperText={errors.emailError}
                        onChange={(event) => setEmail(event.target.value)}

                        sx={{ marginBlock: '.5rem' }}
                    />

                    <TextField
                        type="password"
                        label="Geslo"
                        value={password}
                        error={errors.passwordError}
                        helperText={errors.passwordError}
                        onChange={(event) => setPassword(event.target.value)}

                        sx={{ marginBlock: '.5rem' }}
                    />

                    <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                        Registracija
                    </Button>
                </Box>

                <Typography sx={{ mt: 2, alignSelf: 'center' }}>
                    že imate račun? <Link to="/login">Vpis</Link>
                </Typography>
            </Box>
        </Grid>
    );
}

export default RegisterPage;
