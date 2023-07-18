

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { amber, orange } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import './App.css';
import BasicDateRangePicker from './components/dateRangePicker/DateRangePicker';
import InputField from './components/inputfields/InputField';
import ContentTable from './components/table/Table';

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(amber[500]),
  backgroundColor: orange[500],
  '&:hover': {
    backgroundColor: orange[700],
  },
}));

function App() {
  const [operatorName, setOperatorName] = useState('');
  const [dataInicial, setDataInicial] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  const [allRows, setAllRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/transferencia`,
        {
          headers: {
            dataInicial: dataInicial,
            dataFinal: dataFinal,
            nomeOperadorTransacao: operatorName
          }
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setFilteredRows(data);
      } else {
        console.error('Falha ao obter os dados da API');
      }
    } catch (error) {
      console.error('Erro na solicitação da API', error);
    }
  };

  useEffect(() => {
    const fetchAllRows = async () => {
      try {
        const response = await fetch('http://localhost:8080/transferencia');
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setAllRows(data);
          setFilteredRows(data);
        } else {
          console.error('Falha ao obter os dados da API');
        }
      } catch (error) {
        console.error('Erro na solicitação da API', error);
      }
    };

    fetchAllRows();
  }, []);


  return (
    <div className='page-container'>
      <form className='filter-form'>
      <TextField
        id="outlined-basic"
        label="Nome Do Operador Transacionado"
        variant="outlined"
        style={{width: '400px', height: '40px', borderRadius: '4px', marginBottom: '32px'}}
        value={operatorName}
        onInput= {(e)=> setOperatorName(e.target.value)}
      />
        <BasicDateRangePicker setDataInicial={setDataInicial} setDataFinal={setDataFinal} />
        <ColorButton variant="contained" size="small" onClick={handleSearch} type="button" style={{height:'40px', margin:'32px 0px'}}>
          Pesquisar
        </ColorButton>
      </form>

      <ContentTable rows={filteredRows} setRows={setFilteredRows} />

    </div>

  );
}

export default App;
