/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';

import classNames from 'classnames';
import { LocationSelect, HiresPosition, AgeGroup, Place } from '@/components/selects';
import { fetchAuthorizedTeams, fetchLocation } from '@/api';
import { Locations, TeamSimple } from '@/types';
import { RootState } from '@/store';
import { match } from '@/store/match/match';
import { getItemFromStorage } from '@/utils/storage';
import { Input } from '@/components';
import { SPORTS } from '@/consts';
import styles from './HiresFilter.module.scss';

const { inputLocationBox, inputDateBox, buttonBox, submitButton } = styles;

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

// Todo(홍중) : 기능, 기존 구현한 달력 적용하기, input 개선 -> 다른 브랜치에서 작업한 컴포넌트를 이용하여 수정 (2021-12-17)
const HiresFilter = () => {
  const [position, setPosition] = useState<string>('윙백');
  const [ageGroup, setAgeGroup] = useState<string>('20대');
  const [maximumDate, setMaximumDateDate] = useState<Date>(new Date());
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [date, setDate] = useState<Date | null>(new Date());
  const [formattedDate, setFormattedDate] = useState<string>('');
  const [city, setCity] = useState(defaultCity);
  const [region, setRegion] = useState(defaultRegion);
  const [ground, setGround] = useState(defaultGround);
  const [userTeams, setUserTeams] = useState<TeamSimple[]>([]);
  const [sports, setSports] = useState('');

  const token = getItemFromStorage('accessToken');

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

  const handleInput = (e: React.ChangeEvent, category: string) => {
    const targetInput: string = (e.target as HTMLInputElement).value;

    if (category === 'sports') {
      setSports(targetInput);
      return;
    }
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
  };

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
      <Input
        inputId="inputSports"
        labelName="종목"
        type="dropbox"
        options={['선택', ...SPORTS]}
        onChange={(e) => handleInput(e, 'sports')}
        value={sports}
      />
      <AgeGroup handleChangeAge={handleChangeAge} />
      <div className={classNames(inputLocationBox)}>
        <h3>위치</h3>
        <div>
          <LocationSelect
            locationInfo={locationInfo}
            city={city}
            region={region}
            ground={ground}
            handleInput={handleInput}
          />
        </div>
      </div>
      <div className={classNames(inputDateBox)}>
        <h3>날짜</h3>
        <div>
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
        </div>
      </div>
      <div className={classNames(buttonBox)}>
        <button type="button" className={classNames(submitButton)} onClick={handleClickSelectDone}>
          선택 완료
        </button>
      </div>
    </div>
  );
};

export default HiresFilter;
