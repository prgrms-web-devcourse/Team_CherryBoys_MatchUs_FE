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
import { RootState } from '@/store';
import { fetchTeamWithUser, fetchMatchById } from '@/store/match/match';
import useMount from '@/hooks/useMount';
import style from './EditMatch.module.scss';
import { SPORTS, SPORTS_PLAYER, AGE_GROUP, LOCATIONS } from '@/consts';

const { editMatchContainer, inputLocationBox, inputDateBox, buttonBox, submitButton } = style;

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

const EditMatch = () => {
  const dispatch = useDispatch();
  // 작성자(유저) 더미 데이터 이용
  const tokenDummy = 123;
  const { matchId } = useSelector((store: RootState) => store.match.data);
  useMount(() => {
    dispatch(fetchMatchById(matchId));
    dispatch(fetchTeamWithUser(tokenDummy));
  });
  const editedMatch = useSelector((store: RootState) => store.match.data.match[0]);

  const [nowDate, setNowDate] = useState<Date>(new Date());
  const [formattedDate, setFormattedDate] = useState({
    startDate: new Date(),
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
  const [detail, setDetail] = useState(placeholder);
  const [team, setTeam] = useState(placeholder);
  const cityOptions = ['행정구역', ...LOCATIONS.cities.map((cityInfo) => cityInfo.cityName)];
  const regionOptions = [
    '시/군/구',
    ...LOCATIONS.regions.reduce((acc: string[], regionInfo) => {
      if (regionInfo.cityId === city.cityId) acc.push(regionInfo.regionName);
      return acc;
    }, []),
  ];
  const groundOptions = [
    '구장',
    ...LOCATIONS.grounds.reduce((acc: string[], groundInfo) => {
      if (groundInfo.regionId === region.regionId) acc.push(groundInfo.groundName);
      return acc;
    }, []),
  ];
  const { userTeams } = useSelector((store: RootState) => store.match).data;
  const userLimit = SPORTS_PLAYER[sports] || 0;
  const teamNames = userTeams.map((userTeam) => userTeam.teamName);
  const [teamMembers, setTeamMembers] = useState<CheckboxOptions>({});

  const setInitialValue = useCallback(() => {
    if (editedMatch) {
      setSports(editedMatch.sports || placeholder);
      setAgeGroup(editedMatch.ageGroup);

      const prevCity = LOCATIONS.cities.filter(
        (cityInfo) => cityInfo.cityName === editedMatch.city
      )[0];
      setCity(prevCity || defaultCity);
      const prevRegion = LOCATIONS.regions.filter(
        (regionInfo) => regionInfo.regionName === editedMatch.region
      )[0];
      setRegion(prevRegion || defaultRegion);
      const prevGround = LOCATIONS.grounds.filter(
        (groundInfo) => groundInfo.groundName === editedMatch.ground
      )[0];
      setGround(prevGround || defaultGround);
      setCost(editedMatch.cost || 0);
      setTeam(editedMatch.registerTeamInfo?.teamName || placeholder);
      setDetail(editedMatch.detail || placeholder);
      const prevStartTime = new Date(
        `${editedMatch.date} ${editedMatch.startTime.hour}:${editedMatch.startTime.minute}:${editedMatch.startTime.second}`
      );
      const prevEndTime = new Date(
        `${editedMatch.date} ${editedMatch.endTime.hour}:${editedMatch.endTime.minute}:${editedMatch.endTime.second}`
      );

      setFormattedDate({
        startDate: prevStartTime,
        startTime: prevStartTime,
        endTime: prevEndTime,
      });
    }
  }, [editedMatch]);

  const setSelectedTeamUsers = useCallback(() => {
    const selectedTeamInfo = userTeams.filter((userTeam) => userTeam.teamName === team)[0];
    const selectedTeamUsers = selectedTeamInfo ? selectedTeamInfo.teamUsers : [];
    const teamUsersOptions: CheckboxOptions = {};
    selectedTeamUsers.forEach((user) => {
      if (user.userName) teamUsersOptions[user.userName] = false;
    });
    return teamUsersOptions;
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
      const selectedCity = LOCATIONS.cities.filter(
        (cityInfo) => cityInfo.cityName === targetInput
      )[0];
      setCity(selectedCity || defaultCity);
      setRegion(defaultRegion);
      setGround(defaultGround);
      return;
    }
    if (category === 'region') {
      const selectedRegion = LOCATIONS.regions.filter(
        (regionInfo) => regionInfo.regionName === targetInput
      )[0];
      setRegion(selectedRegion || defaultRegion);
      setGround(defaultGround);
      return;
    }
    if (category === 'ground') {
      const selectedGround = LOCATIONS.grounds.filter(
        (groundInfo) => groundInfo.groundName === targetInput
      )[0];
      setGround(selectedGround || defaultGround);
    }
    if (category === 'cost') {
      const targetInputNumber: number = parseInt((e.target as HTMLInputElement).value, 10);
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
    setNowDate(newDate);

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

  const submitDate = () => {
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

    const todayString = new Date().toLocaleDateString('fr-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    if (dateResult.date < todayString) {
      window.alert('오늘보다 이른 날짜는 선택할 수 없습니다');
      return {};
    }
    if (startTime > endTime) {
      window.alert('시작시간이 종료시간보다 빠를 수 없습니다');
      return {};
    }

    return dateResult;
  };

  const handleSubmitMatchInfo = () => {
    if (sports === '선택') {
      window.alert('종목을 선택해주세요');
      return;
    }
    if (team === placeholder) {
      window.alert('올바른 팀을 선택해주세요');
      return;
    }

    const selectedTeamInfo = userTeams.filter((userTeam) => userTeam.teamName === team)[0];
    const selectedTeamUsers = selectedTeamInfo ? selectedTeamInfo.teamUsers : [];

    const selectedTeamWithUsers = {
      teamId: userTeams.filter((userTeam) => userTeam.teamName === team)[0].teamId,
      players: selectedTeamUsers
        .filter((user) => user.userName && teamMembers[user.userName])
        .map((user) => user.userId),
    };
    const matchDate = submitDate();

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
    if (Number.isNaN(cost)) {
      window.alert('참가비는 숫자만 입력할 수 있습니다');
      return;
    }

    const requestData = {
      ...matchDate,
      matchId, // path
      registerTeamId: selectedTeamWithUsers.teamId,
      sports,
      ageGroup,
      city,
      region,
      groundName: ground,
      cost,
      detail,
      players: selectedTeamWithUsers.players,
    };

    // TODO: api 요청 바디
    console.log(requestData);
  };

  useEffect(() => {
    const newTeamUsers = setSelectedTeamUsers();
    setTeamMembers({ ...newTeamUsers });
    setInitialValue();
  }, [setTeamMembers, setSelectedTeamUsers, setFormattedDate, setInitialValue]);

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
        inputId="inputTeam"
        labelName="팀*"
        type="dropbox"
        options={['선택', ...teamNames]}
        onChange={(e) => handleInput(e, 'team')}
        value={team}
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
