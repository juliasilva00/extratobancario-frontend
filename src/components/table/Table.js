// ContentTable.js

import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  {
    id: 'dataTransferencia',
    label: 'Dados',
    minWidth: 170,
    format: (value) => new Intl.NumberFormat('pt-BR').format(value),
  },
  {
    id: 'valor',
    label: 'Valência',
    minWidth: 170,
    format: (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value),
  },
  {
    id: 'tipo',
    label: 'Tipo',
    minWidth: 170,
  },
  {
    id: 'nomeOperadorTransacao',
    label: 'Nome Operador Transacionado',
    minWidth: 170,
  },
];

const formatDate = (value) => {
  const date = new Date(value);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  return `${day}/${month}/${year}`;
};

export default function ContentTable({ rows, setRows }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filterRows = () => {
    if (rows.length === 0) {
      return [];
    }

    let filteredData = rows;

    if (nomeOperadorTransacao) {
      filteredData = filteredData.filter(
        (row) => row.nomeOperadorTransacao === nomeOperadorTransacao
      );
    }

    if (dataInicial && dataFinal) {
      filteredData = filteredData.filter(
        (row) =>
          row.dataTransferencia >= dataInicial && row.dataTransferencia <= dataFinal
      );
    }

    return filteredData;
  };

  const [nomeOperadorTransacao, setNomeOperadorTransacao] = useState('');
  const [dataInicial, setDataInicial] = useState(null);
  const [dataFinal, setDataFinal] = useState(null);
  const [filteredRows, setFilteredRows] = useState(filterRows());

  useEffect(() => {
    setFilteredRows(filterRows());
  }, [rows, nomeOperadorTransacao, dataInicial, dataFinal]);

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align="left"
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align="left">
                          {column.id === 'dataTransferencia'
                            ? formatDate(value)
                            : column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
