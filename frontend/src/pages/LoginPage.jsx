import { Grid, Box, Typography, TextField, Button } from '@mui/material';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import jwt from 'jwt-decode'
import axios from 'axios';

function LoginPage() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [errors, setErrors] = useState('');
	const navigate = useNavigate();
	const url = "http://localhost:3000/auth/login"

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
		if (password.trim() === '') {
			return 'Geslo ne sme biti prazno';
		}
		return '';
	}

	const onSubmit = async (e) => {
		e.preventDefault();

		const emailError = validateEmail(email);
		const passwordError = validatePassword(password)
		let incorrectCredsError = '';

		if (emailError || passwordError) {
			setErrors({ emailError, passwordError });
			return;
		}

		const creds = {
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
			if (error.response.status === 401) {
				incorrectCredsError = 'Geslo ali email je napačen';
				setErrors({ incorrectCredsError });
			} else {
				console.log(error.message);
			}
		}
	}

	return (
		<Grid item xs={12} display="flex" alignItems="center" justifyContent="center" height='95vh'>

			<Box display="flex" flexDirection="column" alignItems='center' justifyContent="space-between" minHeight="85vh" sx={{ backgroundColor: '#F8F6F4', textAlign: 'center', border: '2px solid black', borderRadius: '20px', padding: '10px', boxShadow: 'inset 3px 0px 3px gray' }}>
				<Box>
					<img src={require('../img/logo192.png')} alt="logo" width="30%" />
					<Typography variant="h4" sx={{ mt: 2 }} >Bussiness Marketing AI</Typography>
				</Box>

				<Box
					component="form"
					onSubmit={onSubmit}
					display="flex"
					flexDirection="column"
					alignItems='center'
					sx={{ mt: 2 }}
				>
					{errors.incorrectCredsError && (
						<Typography sx={{ color: 'red' }}>{errors.incorrectCredsError}</Typography>
					)}

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
						Vpiši se!
					</Button>
				</Box>

				<Typography sx={{ mt: 2, alignSelf: 'center' }}>
					Še nimate računa? <Link to="/register">Registrirajte</Link> se tukaj
				</Typography>
			</Box>
		</Grid>
	);
}

export default LoginPage;
