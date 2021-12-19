/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState, useCallback } from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TimePicker from '@mui/lab/TimePicker';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Input, InputDetail } from '@/components';
import { RootState } from '@/store';
import { match } from '@/store/match/match';
import { fetchMatchById, modifyMatch, fetchLocation } from '@/api';
import style from './EditMatch.module.scss';
import { SPORTS, AGE_GROUP } from '@/consts';
import { Match as MatchType, Locations } from '@/types';

const { editMatchContainer, inputLocationBox, inputDateBox, buttonBox, submitButton } = style;

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

const EditMatch = () => {
  const dispatch = useDispatch();

  const matchId = parseInt(useParams<{ postId: string }>().postId, 10);
  const { locations } = useSelector((store: RootState) => store.match.data);
  const [locationInfo, setLocationInfo] = useState<Locations>(locations);

  const getLocations = useCallback(async () => {
    const locationData = await fetchLocation();
    setLocationInfo(locationData);
    dispatch(match.actions.setLocations({ locations: locationData }));
  }, []);

  const [prevMatchInfo, setPrevMatchInfo] = useState<MatchType>();

  const getMatchInfo = useCallback(async () => {
    const matchInfoById = await fetchMatchById(matchId);
    setPrevMatchInfo(matchInfoById);
  }, [matchId]);

  useEffect(() => {
    getMatchInfo();
    if (locationInfo.cities.length < 1) {
      getLocations();
    }
  }, []);

  const [formattedDate, setFormattedDate] = useState({
    startDate: new Date(),
    startTime: new Date(),
    endTime: new Date(),
  });
  const [date, setDate] = useState({
    date: '',
    startTime: '',
    endTime: '',
  });

  const placeholder = '선택';
  const [sports, setSports] = useState(placeholder);
  const [ageGroup, setAgeGroup] = useState(placeholder);
  const [city, setCity] = useState(defaultCity);
  const [region, setRegion] = useState(defaultRegion);
  const [ground, setGround] = useState(defaultGround);
  const [cost, setCost] = useState(0);
  const [detail, setDetail] = useState(placeholder);
  const cityOptions = [
    '행정구역',
    ...locationInfo.cities.reduce((acc: string[], cityInfo) => {
      if (cityInfo.cityName) acc.push(cityInfo.cityName || '');
      return acc;
    }, []),
  ];
  const regionOptions = [
    '시/군/구',
    ...locationInfo.regions.reduce((acc: string[], regionInfo) => {
      if (regionInfo.cityId === city.cityId) acc.push(regionInfo.regionName || '');
      return acc;
    }, []),
  ];
  const groundOptions = [
    '구장',
    ...locationInfo.grounds.reduce((acc: string[], groundInfo) => {
      if (groundInfo.regionId === region.regionId) acc.push(groundInfo.groundName || '');
      return acc;
    }, []),
  ];

  const setInitialValue = useCallback(() => {
    if (prevMatchInfo) {
      setSports(prevMatchInfo.sports || placeholder);
      setAgeGroup(prevMatchInfo.ageGroup);

      const prevCity = locationInfo.cities.filter(
        (cityInfo) => cityInfo.cityName === prevMatchInfo.city
      )[0];
      setCity({
        cityId: prevCity?.cityId || 0,
        cityName: prevCity?.cityName || '',
      });
      const prevRegion = locationInfo.regions.filter(
        (regionInfo) => regionInfo.regionName === prevMatchInfo.region
      )[0];
      setRegion({
        cityId: prevRegion?.cityId || 0,
        regionId: prevRegion?.regionId || 0,
        regionName: prevRegion?.regionName || '',
      });
      const prevGround = locationInfo.grounds.filter(
        (groundInfo) => groundInfo.groundName === prevMatchInfo.ground
      )[0];
      setGround({
        regionId: prevGround?.regionId || 0,
        groundId: prevGround?.groundId || 0,
        groundName: prevGround?.groundName || '',
      });
      setCost(prevMatchInfo.cost || 0);
      setDetail(prevMatchInfo.detail || placeholder);
      const prevStartTime = new Date(`${prevMatchInfo.date} ${prevMatchInfo.startTime}`);
      const prevEndTime = new Date(`${prevMatchInfo.date} ${prevMatchInfo.endTime}`);

      setFormattedDate({
        startDate: prevStartTime,
        startTime: prevStartTime,
        endTime: prevEndTime,
      });
    }
  }, [prevMatchInfo]);

  const handleInput = (e: React.ChangeEvent, category: string) => {
    const targetInput: string = (e.target as HTMLInputElement).value;
    if (category === 'sports') {
      setSports(targetInput);
      return;
    }
    if (category === 'ageGroup') {
      setAgeGroup(targetInput);
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
      return;
    }
    if (category === 'cost') {
      const targetInputNumber: number = parseInt((e.target as HTMLInputElement).value, 10);
      if (Number.isNaN(targetInputNumber)) return;
      setCost(targetInputNumber);
    }
  };

  const handleDetail = (e: React.SetStateAction<string>) => {
    const targetInput = e;
    setDetail(targetInput);
  };

  const handleChangeStartDate = (selectedDate: React.SetStateAction<Date | null>) => {
    const newDate = selectedDate ? new Date(selectedDate.toString()) : new Date();

    const endTime = new Date(newDate.getTime() + 120 * 60000);

    setFormattedDate({
      startDate: newDate,
      startTime: newDate,
      endTime,
    });
  };

  const handleChangeStartTime = (selectedDate: React.SetStateAction<Date | null>) => {
    const newDate = selectedDate ? new Date(selectedDate.toString()) : new Date();

    const endTime = new Date(newDate.getTime() + 120 * 60000);

    setFormattedDate({ ...formattedDate, startTime: newDate, endTime });
  };

  const handleChangEndTime = (selectedDate: React.SetStateAction<Date | null>) => {
    const newDate = selectedDate ? new Date(selectedDate.toString()) : new Date();

    setFormattedDate({ ...formattedDate, endTime: newDate });
  };

  const handleSubmitMatchInfo = async () => {
    const { startDate, startTime, endTime } = formattedDate;

    const dateResult = {
      date: startDate.toLocaleDateString('fr-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
      startTime: startTime.toLocaleTimeString('fr-BE', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
      endTime: endTime.toLocaleTimeString('fr-BE', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    };

    const today = new Date();
    const todayResult = {
      date: today.toLocaleDateString('fr-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
      startTime: today.toLocaleTimeString('fr-BE', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
      endTime: today.toLocaleTimeString('fr-BE', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    };

    if (sports === '선택') {
      window.alert('종목을 선택해주세요');
      return;
    }
    if (ageGroup === placeholder) {
      window.alert('연령대를 선택해주세요');
      return;
    }
    if (city.cityId === 0) {
      window.alert('행정구역을 선택해주세요');
      return;
    }
    if (region.regionId === 0) {
      window.alert('시/군/구를 선택해주세요');
      return;
    }
    if (ground.groundId === 0) {
      window.alert('구장을 선택해주세요');
      return;
    }
    if (dateResult.date < todayResult.date) {
      window.alert('오늘보다 이른 날짜는 선택할 수 없습니다');
      return;
    }
    if (startTime > endTime) {
      window.alert('시작시간이 종료시간보다 빠를 수 없습니다');
      return;
    }
    if (Number.isNaN(cost)) {
      window.alert('참가비는 숫자만 입력할 수 있습니다');
      return;
    }

    const requestData = {
      date: dateResult.date,
      startTime: dateResult.startTime,
      endTime: dateResult.endTime,
      matchId,
      sports,
      ageGroup,
      city: city.cityId,
      region: region.regionId,
      ground: ground.groundId,
      cost,
      detail,
    };

    modifyMatch(requestData);
    await window.location.replace(`/matches/post/${matchId}`);
  };

  useEffect(() => {
    setInitialValue();
  }, [setInitialValue]);

  return (
    <div className={classNames(editMatchContainer)}>
      <Input
        inputId="inputSports"
        labelName="종목*"
        type="dropbox"
        options={['선택', ...SPORTS]}
        onChange={(e) => handleInput(e, 'sports')}
        value={sports}
      />
      <Input
        inputId="inputAgeGroup"
        labelName="연령대*"
        type="dropbox"
        options={['선택', ...AGE_GROUP]}
        onChange={(e) => handleInput(e, 'ageGroup')}
        value={ageGroup}
      />
      <div className={classNames(inputLocationBox)}>
        <h3>위치*</h3>
        <div>
          <Input
            inputId="inputCity"
            type="dropbox"
            options={cityOptions}
            onChange={(e) => handleInput(e, 'city')}
            styleProps={{ inputContentHeight: 'fit-content' }}
            value={city.cityName}
          />
          <Input
            inputId="inputRegion"
            type="dropbox"
            options={regionOptions}
            onChange={(e) => handleInput(e, 'region')}
            styleProps={{ inputContentHeight: 'fit-content' }}
            value={region.regionName}
          />
          <Input
            inputId="inputGround"
            type="dropbox"
            options={groundOptions}
            onChange={(e) => handleInput(e, 'ground')}
            styleProps={{ inputContentHeight: 'fit-content' }}
            value={ground.groundName}
          />
        </div>
      </div>
      <div className={classNames(inputDateBox)}>
        <h3>날짜*</h3>
        <div>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              value={formattedDate.startTime}
              onChange={handleChangeStartDate}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              value={formattedDate.startTime}
              onChange={handleChangeStartTime}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              value={formattedDate.endTime}
              onChange={handleChangEndTime}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
      </div>
      <Input
        inputId="inputCost"
        labelName="참가비"
        type="text"
        value={cost}
        onChange={(e) => handleInput(e, 'cost')}
      />
      <InputDetail labelName="상세정보" placeholder={detail} onChange={(e) => handleDetail(e)} />
      <div className={classNames(buttonBox)}>
        <button className={classNames(submitButton)} type="button" onClick={handleSubmitMatchInfo}>
          매칭 수정
        </button>
      </div>
    </div>
  );
};

export default EditMatch;
