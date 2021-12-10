import React, { useEffect, useState } from 'react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TimePicker from '@mui/lab/TimePicker';
import DatePicker from '@mui/lab/DatePicker';

import { AGE_GROUP } from '@/consts';

const HIRED_NUMBER = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const CITY = ['서울시'];

const REGION = ['금천구', '강서구'];

const GROUND_NAME = ['유제두 체육관', '제1 체육관', '제2체육관'];

const POSITION = ['윙백', '윙포워드'];

const DETAIL_PLACEHOLDER = '약속 잘지키고 유쾌하신분과 즐겁게 경기하고 싶습니다';

const HiresWritePage = () => {
  const [startTime, setStartTime] = useState<Date | null>(new Date());
  const [endTime, setEndTime] = useState<Date | null>(new Date());
  const [formatedStartTime, setFormatedStartTime] = useState<string>('');
  const [formatedEndTime, setFormatedEndTime] = useState<string>('');
  const [maximumDate, setMaximumDateDate] = useState<any>(new Date());
  const [currentDate, setCurrentDate] = useState<any>(new Date());
  const [currentMonth, setCurrentMonth] = useState<any>(new Date().getMonth());
  const [date, setDate] = useState<Date | null>(new Date());
  const [formattedDate, setFormattedDate] = useState<string>('');
  const [hirePlayerNumber, sethirePlayerNumber] = useState<number>(1);
  const [position, setPosition] = useState<string>('윙백');
  const [ageGroup, setAgeGroup] = useState<string>('20s');
  const [city, setCity] = useState<string>('');
  const [region, setRegion] = useState<string>('');
  const [groundName, setGroundName] = useState<string>('');
  const [detail, setDetail] = useState<string>('');

  useEffect(() => {
    const newDate = new Date();

    const startHour = newDate.getHours();
    const endHour = startHour >= 22 ? startHour - 22 : startHour;
    const minute = newDate.getMinutes();
    const seconds = newDate.getSeconds();

    const formettedStartTime = `${startHour}:${minute}:${seconds}`;
    const formettedEndTime = `${endHour + 2}:${minute}:${seconds}`;

    setFormatedStartTime(formettedStartTime);
    setFormatedEndTime(formettedEndTime);
  }, []);

  useEffect(() => {
    const newDate = new Date();
    setCurrentMonth(newDate.getMonth());
    maximumDate.setMonth(newDate.getMonth() + 1);
    setMaximumDateDate(maximumDate);
    setCurrentDate(currentDate);
    currentDate.setMonth(newDate.getMonth());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMonth]);

  const hanldeChangeDate = (selectedDate: React.SetStateAction<Date | null>) => {
    const newDate = selectedDate ? new Date(selectedDate.toString()) : new Date();
    setDate(newDate);

    const year = newDate.getFullYear();
    const month = newDate.getMonth();
    const day = newDate.getDate();
    const formedDate = `${year}-${month + 1}-${day}`;
    setFormattedDate(formedDate);
  };

  const handleChangeStartDate = (selectedDate: React.SetStateAction<Date | null>) => {
    const newDate = selectedDate ? new Date(selectedDate.toString()) : new Date();

    const startHour = newDate.getHours();
    const minute = newDate.getMinutes();
    const seconds = newDate.getSeconds();

    const formettedStartTime = `${startHour}:${minute}:${seconds}`;

    setFormatedStartTime(formettedStartTime);
    setStartTime(selectedDate);
  };

  const handleChangEndDate = (selectedDate: React.SetStateAction<Date | null>) => {
    const newDate = selectedDate ? new Date(selectedDate.toString()) : new Date();

    const startHour = newDate.getHours();
    const endHour = startHour >= 22 ? startHour - 22 : startHour;
    const minute = newDate.getMinutes();
    const seconds = newDate.getSeconds();

    const formettedEndTime = `${endHour}:${minute}:${seconds}`;

    setFormatedEndTime(formettedEndTime);
    setEndTime(selectedDate);
  };

  const handleChangeHiredPlayerNumber = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    sethirePlayerNumber(parseInt(value, 10));
  };

  const handleChangePosition = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPosition(value);
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

  const handleKeyUp = () => {
    // Todo : 세부설명 글 작성
  };

  const handleClickSelectDone = () => {
    const data = {
      city,
      region,
      groundName,
      date: formattedDate,
      startTime: formatedStartTime,
      endTime: formatedEndTime,
      hirePlayerNumber,
      position,
      ageGroup,
      detail,
    };

    const startHour = startTime?.getHours();
    const endHour = endTime?.getHours();
    const calculatedStartHour = startHour && startHour >= 12 ? startHour - 12 : startTime;
    const calculatedEndHour = endHour && endHour >= 12 ? endHour - 12 : endHour;

    const startMinute = startTime?.getMinutes();
    const endMinute = endTime?.getMinutes();

    const isStartHourBigger =
      calculatedStartHour && calculatedEndHour && calculatedStartHour > calculatedEndHour;
    const isStartMinuteBigger = startMinute && endMinute && startMinute > endMinute;

    if (isStartHourBigger || (!isStartHourBigger && isStartMinuteBigger)) {
      alert('시간을 다시 입력해주세요');
      return;
    }
    // Todo : 서버에 입력된 데이터 보내기
    console.log(data);
  };

  return (
    <>
      <section>
        <div>용병수</div>
        <select id="hiredPlayerNumber" onChange={handleChangeHiredPlayerNumber}>
          <option>{`${HIRED_NUMBER[0]}명`}</option>
          {HIRED_NUMBER.map(
            (num, index) =>
              index > 0 && (
                <option id="hiresWriteCategory" key={`hired-${num}`}>
                  {`${num}명`}
                </option>
              )
          )}
        </select>
      </section>
      <section>
        <div>포지션</div>
        <input type="text" placeholder={`${POSITION[0]}`} onChange={handleChangePosition} />
      </section>
      <div>
        <div>연령대</div>
        <select id="hiresAgeGroup" onChange={handleChangeAge}>
          <option>{`${AGE_GROUP[0]}대`}</option>
          {AGE_GROUP.map(
            (group, index) =>
              index > 0 && (
                <option id={`${group}s`} key={`age-${group}`}>
                  {group}대
                </option>
              )
          )}
        </select>
      </div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          value={date}
          onChange={hanldeChangeDate}
          // eslint-disable-next-line react/jsx-props-no-spreading
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TimePicker
          value={startTime}
          onChange={handleChangeStartDate}
          // eslint-disable-next-line react/jsx-props-no-spreading
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TimePicker
          value={endTime}
          onChange={handleChangEndDate}
          // eslint-disable-next-line react/jsx-props-no-spreading
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <div>
        <section>
          <div>장소</div>
          <div>
            <select id="city" onChange={handleChangeCity}>
              <option>행정구역</option>
              {CITY.map((value) => (
                <option id={`${value}`} key={`city-${value}`}>
                  {value}
                </option>
              ))}
            </select>
            <select id="region" onChange={handleChangeRegion}>
              <option>시/군/구</option>
              {REGION.map((value) => (
                <option id={`${value}`} key={`region-${value}`}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <select id="groundName" onChange={handleChangeGroundName}>
            <option>구장</option>
            {GROUND_NAME.map((value) => (
              <option id={`${value}`} key={`groundName-${value}`}>
                {value}
              </option>
            ))}
          </select>
        </section>
      </div>

      <div>세부 설명</div>
      <textarea placeholder={DETAIL_PLACEHOLDER} onKeyUp={handleKeyUp} />
      <button type="button" onClick={handleClickSelectDone}>
        선택 완료
      </button>
    </>
  );
};

export default HiresWritePage;
