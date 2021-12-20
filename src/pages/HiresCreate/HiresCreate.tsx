/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TimePicker from '@mui/lab/TimePicker';
import DatePicker from '@mui/lab/DatePicker';
import { useHistory } from 'react-router-dom';

import { editHiresPosting, createHiresPosting, hiresPosting } from '@/api/hires';
import { fetchAuthorizedTeams, fetchLocation } from '@/api';

import { InputDetail, Input } from '@/components';
import { LocationSelect, AgeGroup, HiresPosition } from '@/components/selects';
import { previousHiresInfo, Locations, TeamSimple } from '@/types';
import { RootState } from '@/store';
import { match } from '@/store/match/match';
import { getItemFromStorage } from '@/utils/storage';

const HIRED_NUMBER = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const DETAIL_PLACEHOLDER = '약속 잘지키고 유쾌하신분과 즐겁게 경기하고 싶습니다';

const defaultCity = {
  cityId: 0,
  cityName: '',
};

const defaultRegion = {
  cityId: 0,
  regionId: 0,
  regionName: '',
};

const defaultGround = {
  regionId: 0,
  groundId: 0,
  groundName: '',
};

const HiresCreate = ({
  // Todo(홍중) : 디폴트값을 매칭에서도 사용가능하도록 추후 consts로 분리
  prevHiredNumber = 1,
  prevDate = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
  prevStartTime = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
  prevEndTime = `${
    new Date().getHours() >= 22 ? new Date().getHours() - 22 + 2 : new Date().getHours() + 2
  }:${new Date().getMinutes()}:${new Date().getSeconds()}`,
  prevCity = '행정구역',
  prevRegion = '시/군/구',
  prevGroundName = '구장',
  prevPosition = '포지션 선택',
  prevAgeGroup = '20대',
  prevDetail = '즐겁게 합시다',
  postId,
}: previousHiresInfo) => {
  const [startTime, setStartTime] = useState<Date | null>(new Date(`${prevDate} ${prevStartTime}`));
  const [endTime, setEndTime] = useState<Date | null>(new Date(`${prevDate} ${prevEndTime}`));
  const [formatedStartTime, setFormatedStartTime] = useState<string>('');
  const [formatedEndTime, setFormatedEndTime] = useState<string>('');
  const [maximumDate, setMaximumDateDate] = useState<Date>(new Date());
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
  const [date, setDate] = useState<Date | null>(new Date(prevDate));
  const [formattedDate, setFormattedDate] = useState<string>('');
  const [hirePlayerNumber, sethirePlayerNumber] = useState<number>(prevHiredNumber);
  const [position, setPosition] = useState<string>(prevPosition);
  const [ageGroup, setAgeGroup] = useState<string>(prevAgeGroup);
  const [detail, setDetail] = useState<string>(prevDetail || DETAIL_PLACEHOLDER);
  const [city, setCity] = useState(defaultCity);
  const [region, setRegion] = useState(defaultRegion);
  const [ground, setGround] = useState(defaultGround);
  const [team, setTeam] = useState('선택');
  const [userTeams, setUserTeams] = useState<TeamSimple[]>([]);
  const teamNames = userTeams.map((userTeam) => userTeam.teamName);

  const token = getItemFromStorage('accessToken');

  const history = useHistory();

  const dispatch = useDispatch();
  const { locations } = useSelector((store: RootState) => store.match.data);
  const [locationInfo, setLocationInfo] = useState<Locations>(locations);

  const getAuhorizedTeams = useCallback(async () => {
    if (token) {
      const { teamSimpleInfos } = await fetchAuthorizedTeams();
      setUserTeams(teamSimpleInfos);
      dispatch(match.actions.setUserTeams({ userTeams: teamSimpleInfos }));
    }
  }, []);

  useEffect(() => {
    getAuhorizedTeams();
  }, []);

  const getLocations = useCallback(async () => {
    const locationData = await fetchLocation();
    setLocationInfo(locationData);
    dispatch(match.actions.setLocations({ locations: locationData }));
  }, []);

  useEffect(() => {
    if (locationInfo.cities.length < 1) {
      getLocations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locations]);

  useEffect(() => {
    const newDate = new Date();

    const startHour = newDate.getHours();
    const endHour = startHour >= 22 ? startHour - 22 : startHour;
    const minute = newDate.getMinutes();
    const initialSeconds = newDate.getSeconds();
    const seconds = initialSeconds < 10 ? `0${initialSeconds}` : initialSeconds;

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

  const handleInput = (e: React.ChangeEvent, category: string) => {
    const targetInput: string = (e.target as HTMLInputElement).value;

    if (category === 'city') {
      const selectedCity = locationInfo.cities.filter(
        (cityInfo) => cityInfo.cityName === targetInput
      )[0];
      setCity({
        cityId: selectedCity?.cityId || 0,
        cityName: selectedCity?.cityName || '',
      });
      setRegion(defaultRegion);
      setGround(defaultGround);
      return;
    }
    if (category === 'region') {
      const selectedRegion = locationInfo.regions.filter(
        (regionInfo) => regionInfo.regionName === targetInput
      )[0];
      setRegion({
        cityId: selectedRegion?.cityId || 0,
        regionId: selectedRegion?.regionId || 0,
        regionName: selectedRegion?.regionName || '',
      });
      setGround(defaultGround);
      return;
    }
    if (category === 'ground') {
      const selectedGround = locationInfo.grounds.filter(
        (groundInfo) => groundInfo.groundName === targetInput
      )[0];
      setGround({
        regionId: selectedGround?.regionId || 0,
        groundId: selectedGround?.groundId || 0,
        groundName: selectedGround?.groundName || '',
      });
    }
    if (category === 'team') {
      setTeam(targetInput);
    }
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

    const endHour = newDate.getHours();
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

    setAgeGroup(`${ageNumber}대`);
  };

  const handleClickCreatePosting = async (data: hiresPosting) => {
    await createHiresPosting(data);
    history.push(`/hires`);
  };

  const handleClickSelectDone = () => {
    const data = {
      ageGroup,
      cityId: city.cityId,
      date: formattedDate || prevDate,
      detail,
      endTime: formatedEndTime,
      groundId: ground.groundId,
      hirePlayerNumber,
      position,
      regionId: region.regionId,
      startTime: formatedStartTime,
      teamId: userTeams.filter((userTeam) => userTeam.teamName === team)[0].teamId,
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

    if (position === '포지션 선택') {
      alert('포지션을 선택해주세요');
      return;
    }
    // Todo(홍중) : am일때 올바름에도 다시 입력 요구하는것 수정하기(2021-12-19)
    if (isStartHourBigger || (!isStartHourBigger && isStartMinuteBigger)) {
      alert('시간을 다시 입력해주세요');
    }

    // Todo(홍중) : 입력된 데이터 서버에 보내기
    handleClickCreatePosting(data);
    // console.log(data);
  };

  const handleChangePosition = (event: React.ChangeEvent) => {
    event.preventDefault();
    const input: string = (event.target as HTMLInputElement).value;
    setPosition(input);
  };

  const handleChangeDetail = (input: React.SetStateAction<string>) => {
    setDetail(input);
  };

  const handleClickEditPosting = async () => {
    const editHires = async () => {
      const data = {
        ageGroup: '30대',
        cityId: 1,
        date: '2021-12-15',
        detail: '수정내용입니다~',
        endTime: '19:30:00',
        groundId: 1,
        hirePlayerNumber: 3,
        position: '윙백',
        regionId: 1,
        startTime: '17:30:00',
        teamId: 1,
      };
      await editHiresPosting({ postId, data });
      history.push(`/hires/${postId}`);
    };

    editHires();
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

      <LocationSelect
        locationInfo={locationInfo}
        city={city}
        region={region}
        ground={ground}
        handleInput={handleInput}
        firstLabelName="장소"
      />
      <Input
        inputId="inputTeam"
        labelName="팀"
        type="dropbox"
        options={['선택', ...teamNames]}
        onChange={(e) => handleInput(e, 'team')}
      />
      <InputDetail labelName="상세정보" placeholder={detail} onChange={handleChangeDetail} />
      {prevCity === '행정구역' ? (
        <button type="button" onClick={handleClickSelectDone}>
          생성
        </button>
      ) : (
        <button type="button" onClick={handleClickEditPosting}>
          수정
        </button>
      )}
    </>
  );
};

export default HiresCreate;
