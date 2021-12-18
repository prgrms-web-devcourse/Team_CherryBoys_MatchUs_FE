/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TimePicker from '@mui/lab/TimePicker';
import DatePicker from '@mui/lab/DatePicker';

import { InputDetail } from '@/components';
import { createHiresPosting } from '@/api/hires';
import { Place, AgeGroup, HiresPosition } from '@/components/selects';

const HIRED_NUMBER = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const DETAIL_PLACEHOLDER = '약속 잘지키고 유쾌하신분과 즐겁게 경기하고 싶습니다';

interface previousHiresInfo {
  prevHiredNumber?: number;
  prevDate?: string;
  prevStartTime?: string;
  prevEndTime?: string;
  prevCity?: string;
  prevRegion?: string;
  prevGroundName?: string;
  prevPosition?: string;
  prevAgeGroup?: string;
  prevDetail?: string;
}

interface previousHiresInfoWrapper {
  initialHiresInfo: previousHiresInfo;
}
const HiresCreate = ({ initialHiresInfo }: previousHiresInfoWrapper) => {
  const {
    prevHiredNumber = 1,
    prevDate = '2021-12-28',
    prevStartTime = '15:20:35',
    prevEndTime = '21:42:35',
    prevCity = '행정구역',
    prevRegion = '시/군/구',
    prevGroundName = '구장',
    prevPosition = '윙백',
    prevAgeGroup = '20대',
    prevDetail = '즐겁게 합시다',
  } = initialHiresInfo;

  const [startTime, setStartTime] = useState<Date | null>(new Date(`${prevDate} ${prevStartTime}`));
  const [endTime, setEndTime] = useState<Date | null>(new Date(`${prevDate} ${prevEndTime}`));
  const [formatedStartTime, setFormatedStartTime] = useState<string>('');
  const [formatedEndTime, setFormatedEndTime] = useState<string>('');
  const [maximumDate, setMaximumDateDate] = useState<any>(new Date());
  const [currentDate, setCurrentDate] = useState<any>(new Date());
  const [currentMonth, setCurrentMonth] = useState<any>(new Date().getMonth());
  const [date, setDate] = useState<Date | null>(new Date(prevDate));
  const [formattedDate, setFormattedDate] = useState<string>('');
  const [hirePlayerNumber, sethirePlayerNumber] = useState<number>(prevHiredNumber);
  const [position, setPosition] = useState<string>(prevPosition);
  const [ageGroup, setAgeGroup] = useState<string>(prevAgeGroup);
  const [city, setCity] = useState<string>(prevCity);
  const [region, setRegion] = useState<string>(prevRegion);
  const [groundName, setGroundName] = useState<string>(prevGroundName);
  const [detail, setDetail] = useState<string>(prevDetail || DETAIL_PLACEHOLDER);

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

  // Todo(홍중) : api 통신 추후 추가 (2021-12-17)
  // const handleClickCreatePosting = async () => {
  //   const data = {
  //     ageGroup: '20대',
  //     cityId: 1,
  //     date: '2021-12-15',
  //     detail: '상세내용입니다~',
  //     endTime: '19:30:00',
  //     groundId: 1,
  //     hirePlayerNumber: 3,
  //     position: '윙백',
  //     regionId: 1,
  //     startTime: '17:30:00',
  //     teamId: 1,
  //   };

  //   const res = await createHiresPosting(data);
  // };

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

    if (!formattedDate) {
      alert('날짜를 입력해주세요');
      return;
    }

    if (!(formatedStartTime && formatedEndTime)) {
      alert('시간을 입력해주세요');
      return;
    }

    if (isStartHourBigger || (!isStartHourBigger && isStartMinuteBigger)) {
      alert('시간을 다시 입력해주세요');
      return;
    }

    if (!city || !region || !groundName) {
      alert('장소를 입력해주세요');
      return;
    }
    // Todo : 입력된 데이터 서버에 보내기
    // handleClickCreatePosting(data);
    console.log(data);
  };

  const handleChangePosition = (event: React.ChangeEvent) => {
    event.preventDefault();
    const input: string = (event.target as HTMLInputElement).value;
    setPosition(input);
  };

  const handleChangeDetail = (input: React.SetStateAction<string>) => {
    setDetail(input);
  };

  return (
    <>
      <section>
        <div>용병수</div>
        <select id="hiredPlayerNumber" onChange={handleChangeHiredPlayerNumber}>
          <option>{`${hirePlayerNumber}명`}</option>
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
      <HiresPosition hiringPosition={position} handleChangePosition={handleChangePosition} />
      <AgeGroup
        ageGroup={parseInt(prevAgeGroup.slice(0, 2), 10)}
        handleChangeAge={handleChangeAge}
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          value={date}
          maxDate={maximumDate}
          minDate={currentDate}
          onChange={hanldeChangeDate}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TimePicker
          value={startTime}
          onChange={handleChangeStartDate}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TimePicker
          value={endTime}
          onChange={handleChangEndDate}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <Place
        handleChangeCity={handleChangeCity}
        handleChangeRegion={handleChangeRegion}
        handleChangeGroundName={handleChangeGroundName}
      />
      <InputDetail labelName="상세정보" placeholder={detail} onChange={handleChangeDetail} />
      {prevCity === '행정구역' ? (
        <button type="button" onClick={handleClickSelectDone}>
          생성
        </button>
      ) : (
        ''
      )}
    </>
  );
};

export default HiresCreate;
