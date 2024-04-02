import { Box, Typography, TextField, Button } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

export default function ChangePasswordForm(props) {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [errors, setErrors] = useState('');
    const url = "http://localhost:3000/users/"

    const validateNewPassword = (password) => {
        const regex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g)
        if (password.trim() === '') {
            return 'Geslo ne sme biti prazno';
        }
        else if (!regex.test(password)) {
            return 'Geslo mora imeti vsaj 8 znakov, vsaj eno črko in vsaj eno število';
        }
        return '';
    }
    const validateOldPassword = (password) => {
        if (password.trim() === '') {
            return 'Geslo ne sme biti prazno';
        }
        return '';
    }

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const newPasswordError = validateNewPassword(newPassword);
        const oldPasswordError = validateOldPassword(oldPassword);
        let incorrectPasswordError = '';

        if (newPasswordError || oldPasswordError) {
            setErrors({ newPasswordError, oldPasswordError });
            return;
        }

        const password = {
            oldPassword: oldPassword,
            newPassword: newPassword
        };

        try {
            const response = await axios.put(`${url}/${sessionStorage.getItem("user")}/password`, password, { headers: { token: sessionStorage.getItem("token") } });
            setNewPassword('')
            setOldPassword('')
        }
        catch (error) {
            if (error.response.status === 401) {
                incorrectPasswordError = 'Geslo je napačno';
                setErrors({ incorrectPasswordError });
            } else {
                console.log(error.message);
            }
        }
    };
    return (
        <Box display="flex" flexDirection="column" component="form" onSubmit={handlePasswordSubmit}>


            <TextField
                label="Staro geslo"
                type="password"
                value={oldPassword}
                error={errors.oldPasswordError || errors.incorrectPasswordError}
                helperText={errors.oldPasswordError || errors.incorrectPasswordError}
                onChange={(event) => setOldPassword(event.target.value)}

                sx={{marginBlock:'1rem'}}
            />

            <TextField
                label="Novo Geslo"
                type="password"
                value={newPassword}
                error={errors.newPasswordError}
                helperText={errors.newPasswordError}
                onChange={(event) => setNewPassword(event.target.value)}

                sx={{marginBlock:'1rem'}}
            />


            <Button variant="contained" type="submit">Posodobi</Button>
        </Box>
    );
}