// InputField.js

import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function InputField({ setNomeOperadorTransacao }) {
  const handleInputChange = (event) => {
    setNomeOperadorTransacao(event.target.value);
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label="Nome Do Operador Transacionado"
        variant="outlined"
        onChange={handleInputChange}
        style={{width: '400px', height: '40px', borderRadius: '4px'}}

      />
    </Box>
  );
}

