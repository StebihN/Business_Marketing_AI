import { Box, TextField, Button, CircularProgress, Backdrop, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
const { ipcRenderer } = window.require("electron");

export default function NameGeneratorForm({ setNamesResult, setNamesEntry, namesEntry, buttonText }) {
  const [isPending, setIsPending] = useState(false);
  const [field, setField] = useState("")
  const [products, setProducts] = useState("")
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const namesUrl = "http://localhost:3000/names"
  const ipc = ipcRenderer;

  useEffect(() => {
    if (namesEntry) {
      setField(namesEntry.field)
      setProducts(namesEntry.products)
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const fieldError = validateField(field);
    const productsError = validateProducts(products)
    let requestError = "";

    if (fieldError || productsError) {
      setErrors({ fieldError, productsError });
      return;
    }

    const entry = {
      field,
      products
    };
    if (isActiveLink("/generator-imen")) {
      setIsPending(true);
      try {
        const response = await axios.post(`${namesUrl}/generate`, entry, { headers: { token: sessionStorage.getItem("token") } })
        console.log(response.data)
        setNamesResult(response.data)
        setIsPending(false)
        ipc.send('done')
        navigate('/generator-imen/rezultati')
      } catch (error) {
        console.log(error.response.data.message)
        requestError = "Prišlo je do napake pri generiranju imen:" + error.response.data.message
        setErrors({requestError})
        setIsPending(false)
      }
    }
    else {
      setNamesEntry(entry);
      navigate('/generator-idej/slogani')
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


      <Button type="submit" variant="contained" >{buttonText}</Button>

      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isPending}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}