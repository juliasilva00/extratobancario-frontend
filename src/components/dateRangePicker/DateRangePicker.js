// BasicDateRangePicker.js

import React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

export default function BasicDateRangePicker({ setDataInicial, setDataFinal }) {
  const handleDateChange = (date) => {
    const startDate = date[0]?.toISOString();
    const endDate = date[1]?.toISOString();
    setDataInicial(startDate);
    setDataFinal(endDate);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateRangePicker']}>
        <DateRangePicker
          localeText={{ start: 'Data de início', end: 'Data de fim' }}
          onChange={handleDateChange}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

