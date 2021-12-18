/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState, useCallback } from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TimePicker from '@mui/lab/TimePicker';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { Input, InputCheckBox, InputDetail } from '@/components';
import { fetchAuthorizedTeams, fetchTotalMembers, createMatch, fetchLocation } from '@/api';
import style from './NewMatch.module.scss';
import { RootState } from '@/store';
import { match } from '@/store/match/match';
import { SPORTS, SPORTS_PLAYER, AGE_GROUP } from '@/consts';
import { TeamSimple, TeamMemberInfo, Locations } from '@/types';
import { getItemFromStorage } from '@/utils/storage';

const { newMatchContainer, inputLocationBox, inputDateBox, buttonBox, submitButton } = style;

interface CheckboxOptions {
  [key: string]: boolean;
}

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

const NewMatch = () => {
  const dispatch = useDispatch();
  const { locations } = useSelector((store: RootState) => store.match.data);
  const [locationInfo, setLocationInfo] = useState<Locations>(locations);

  const getLocations = useCallback(async () => {
    const locationData = await fetchLocation();
    setLocationInfo(locationData);
    dispatch(match.actions.setLocations({ locations: locationData }));
  }, []);

  useEffect(() => {
    if (locationInfo.cities.length < 1) {
      getLocations();
    }
  }, []);

  const [formattedDate, setFormattedDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    startTime: new Date(),
    endTime: new Date(),
  });

  const placeholder = '선택';
  const [sports, setSports] = useState(placeholder);
  const [ageGroup, setAgeGroup] = useState(placeholder);
  const [city, setCity] = useState(defaultCity);
  const [region, setRegion] = useState(defaultRegion);
  const [ground, setGround] = useState(defaultGround);
  const [cost, setCost] = useState(0);
  const [detail, setDetail] = useState('');
  const [team, setTeam] = useState(placeholder);
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

  const [userTeams, setUserTeams] = useState<TeamSimple[]>([]);

  const token = getItemFromStorage('accessToken');

  const getAuhorizedTeams = useCallback(async () => {
    if (token) {
      const authorizedTeams = await fetchAuthorizedTeams();
      setUserTeams(authorizedTeams);
      dispatch(match.actions.setUserTeams({ userTeams: authorizedTeams }));
    }
  }, []);

  useEffect(() => {
    getAuhorizedTeams();
  }, []);

  const userLimit = SPORTS_PLAYER[sports] || 0;
  const teamNames = userTeams.map((userTeam) => userTeam.teamName);
  const [teamMembersInfo, setTeamMembersInfo] = useState<TeamMemberInfo[]>([]);
  const [teamMembers, setTeamMembers] = useState<CheckboxOptions>({});

  const getSelectedTeamMembers = useCallback(async () => {
    const selectedTeamInfo = userTeams.filter((userTeam) => userTeam.teamName === team)[0];
    if (selectedTeamInfo) {
      const selectedTeamId = selectedTeamInfo.teamId;
      const selectedTeamUsers = await fetchTotalMembers(selectedTeamId);
      setTeamMembersInfo(selectedTeamUsers);

      const teamUsersOptions: CheckboxOptions = {};
      selectedTeamUsers.forEach((user: TeamMemberInfo) => {
        if (user.userName) teamUsersOptions[user.userName] = false;
      });
      setTeamMembers(teamUsersOptions);
    }
  }, [team, userTeams]);

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
    if (category === 'cost') {
      const targetInputNumber: number = parseInt((e.target as HTMLInputElement).value, 10);
      if (Number.isNaN(targetInputNumber)) return;
      setCost(targetInputNumber);
      return;
    }
    if (category === 'team') {
      setTeam(targetInput);
    }
  };

  const handleOnChangeTeamMembers = (e: React.ChangeEvent) => {
    const target: string = (e.target as HTMLInputElement).value;
    const newTeamMembers: CheckboxOptions = { ...teamMembers };
    newTeamMembers[target] = !newTeamMembers[target];
    setTeamMembers({ ...newTeamMembers });
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
      endDate: newDate,
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

    setFormattedDate({ ...formattedDate, endDate: newDate, endTime: newDate });
  };

  const handleSubmitMatchInfo = async () => {
    if (sports === placeholder) {
      window.alert('종목을 선택해주세요');
      return;
    }
    if (team === placeholder) {
      window.alert('올바른 팀을 선택해주세요');
      return;
    }

    const selectedTeamWithUsers = {
      teamId: userTeams.filter((userTeam) => userTeam.teamName === team)[0].teamId,
      players: teamMembersInfo
        .filter((user) => user.userName && teamMembers[user.userName])
        .map((user) => user.userId),
    };

    if (selectedTeamWithUsers.players.length < userLimit) {
      window.alert('인원미달');
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

    const { startDate, endDate, startTime, endTime } = formattedDate;

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

    const todayString = new Date().toLocaleDateString('fr-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    if (dateResult.date < todayString) {
      window.alert('오늘보다 이른 날짜는 선택할 수 없습니다');
      return;
    }
    if (startDate > endDate) {
      window.alert('종료일자가 시작일자보다 빠를 수 없습니다');
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
      registerTeamId: selectedTeamWithUsers.teamId,
      sports,
      ageGroup,
      city: city.cityId,
      region: region.regionId,
      ground: ground.groundId,
      cost,
      detail,
      players: selectedTeamWithUsers.players,
    };

    const newMatchId = await createMatch(requestData);
    window.location.replace(`/matches/post/${newMatchId}`);
  };

  useEffect(() => {
    const today = new Date();
    const defaultStartDate = today;
    const defaultStartTime = today;

    const nextDayTime = new Date(new Date().getTime() + 120 * 60000);
    const defaultEndTime = nextDayTime;

    let defaultEndDate = defaultStartDate;
    const startHour = defaultStartTime.getHours();
    if (startHour + 2 >= 24) {
      const nextDayDate = new Date(defaultEndDate);
      nextDayDate.setDate(nextDayDate.getDate() + 1);
      defaultEndDate = nextDayDate;
    }

    setFormattedDate({
      startDate: defaultStartDate,
      endDate: defaultEndDate,
      startTime: defaultStartTime,
      endTime: defaultEndTime,
    });

    getSelectedTeamMembers();
  }, [setTeamMembers, getSelectedTeamMembers, setFormattedDate]);

  return (
    <div className={classNames(newMatchContainer)}>
      <Input
        inputId="inputSports"
        labelName="종목*"
        type="dropbox"
        options={[placeholder, ...SPORTS]}
        onChange={(e) => handleInput(e, 'sports')}
      />
      <Input
        inputId="inputTeam"
        labelName="팀*"
        type="dropbox"
        options={[placeholder, ...teamNames]}
        onChange={(e) => handleInput(e, 'team')}
      />
      {Object.keys(teamMembers).length > 0 && (
        <InputCheckBox
          labelName={`${team}(${
            Object.values(teamMembers).filter((member) => member).length
          }/${userLimit})`}
          options={teamMembers}
          onChange={handleOnChangeTeamMembers}
          icon="far fa-check-square"
        />
      )}
      <Input
        inputId="inputAgeGroup"
        labelName="연령대*"
        type="dropbox"
        options={[placeholder, ...AGE_GROUP]}
        onChange={(e) => handleInput(e, 'ageGroup')}
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
              value={formattedDate.startDate}
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
      <InputDetail
        labelName="상세정보"
        placeholder="텍스트를 입력하세요"
        onChange={(e) => handleDetail(e)}
      />
      <div className={classNames(buttonBox)}>
        <button className={classNames(submitButton)} type="button" onClick={handleSubmitMatchInfo}>
          매칭 등록
        </button>
      </div>
    </div>
  );
};

export default NewMatch;
