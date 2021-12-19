import React, { useState } from 'react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';

import { HiresPosition, AgeGroup, Place } from '@/components/selects';

import { SPORTS_CATEGORY, AGE_GROUP, CITY, REGION, GROUND_NAME } from '@/consts';

// Todo(홍중) : 기능, 기존 구현한 달력 적용하기, input 개선 -> 다른 브랜치에서 작업한 컴포넌트를 이용하여 수정 (2021-12-17)
const HiresFilter = () => {
  const [position, setPosition] = useState<string>('윙백');
  const [ageGroup, setAgeGroup] = useState<string>('20대');
  const [city, setCity] = useState<string>('');
  const [region, setRegion] = useState<string>('');
  const [groundName, setGroundName] = useState<string>('');
  const [maximumDate, setMaximumDateDate] = useState<Date>(new Date());
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [date, setDate] = useState<Date | null>(new Date());
  const [formattedDate, setFormattedDate] = useState<string>('');

  const handleChangePosition = (event: React.ChangeEvent) => {
    event.preventDefault();
    const input: string = (event.target as HTMLInputElement).value;
    setPosition(input);
  };

  const handleChangeAge = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    const ageNumber = value.slice(0, 2);

    setAgeGroup(`${ageNumber}s`);
  };

  const handleChangeCity = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setCity(value);
  };

  const handleChangeRegion = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setRegion(value);
  };

  const handleChangeGroundName = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setGroundName(value);
  };

  const hanldeChangeDate = (selectedDate: React.SetStateAction<Date | null>) => {
    const newDate = selectedDate ? new Date(selectedDate.toString()) : new Date();
    setDate(newDate);

    const year = newDate.getFullYear();
    const month = newDate.getMonth();
    const day = newDate.getDate();
    const formedDate = `${year}-${month + 1}-${day}`;
    setFormattedDate(formedDate);
  };

  // Todo(홍중) : 모달 추가후 작성(2021-12-18), Date는 추후 컴포넌트화 된것을 적용(현재 maxDate적용 안되는것도 등록페이지는 가능하여서 추후 그것을 컴포넌트화할 예정)
  const handleClickSelectDone = () => {};

  return (
    <div>
      <HiresPosition handleChangePosition={handleChangePosition} />
      <AgeGroup handleChangeAge={handleChangeAge} />
      <Place
        handleChangeCity={handleChangeCity}
        handleChangeRegion={handleChangeRegion}
        handleChangeGroundName={handleChangeGroundName}
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          value={date}
          maxDate={maximumDate}
          minDate={currentDate}
          onChange={hanldeChangeDate}
          // eslint-disable-next-line react/jsx-props-no-spreading
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <button type="button" onClick={handleClickSelectDone}>
        선택 완료
      </button>
    </div>
  );
};

export default HiresFilter;
