import React from 'react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';

interface Props {
  value: Date | null;
  maxDate: Date | null;
  minDate: Date | null;
  onChange: React.ChangeEventHandler<any>;
  params: string;
}

// Todo(홍중) : type오류로 인하여 추후 작성(2021-12-18)
const Date = ({ value, maxDate, minDate, onChange, params }: Props) => {
  return (
    <>
      {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          value={value}
          maxDate={maxDate}
          minDate={minDate}
          onChange={onChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider> */}
    </>
  );
};

export default Date;
