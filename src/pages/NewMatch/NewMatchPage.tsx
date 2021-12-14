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
import { fetchTeamWithUser } from '@/store/match/match';
import useMount from '@/hooks/useMount';
import style from './NewMatch.module.scss';
import { SPORTS, SPORTS_PLAYER, AGE_GROUP, CITIES, REGIONS, INPUT_DICITIONARY } from '@/consts';

const { newMatchContainer, inputLocationBox, inputDateBox, buttonBox, submitButton } = style;

interface CheckboxOptions {
  [key: string]: boolean;
}

interface StringKey {
  [key: string]: number | string;
}

const NewMatch = () => {
  const dispatch = useDispatch();
  // 작성자(유저) 더미 데이터 이용
  const tokenDummy = 123;
  useMount(() => {
    dispatch(fetchTeamWithUser(tokenDummy));
  });

  const [nowDate, setNowDate] = useState<Date>(new Date());
  const [formattedDate, setFormattedDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    startTime: new Date(),
    endTime: new Date(),
  });

  const placeholder = '선택';
  const [sports, setSports] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [city, setCity] = useState('');
  const [region, setRegion] = useState('');
  const [ground, setGround] = useState('');
  const [cost, setCost] = useState(0);
  const [detail, setDetail] = useState('');
  const [team, setTeam] = useState(placeholder);
  const cityOptions = ['행정구역', ...Object.keys(CITIES).map((cityName) => cityName)] || [];
  const regionOptions = ['시/군/구', ...(CITIES[city] || [])];
  const groundOptions = ['구장', ...(REGIONS[region] || [])];
  const { userTeams } = useSelector((store: RootState) => store.match).data;
  const userLimit = SPORTS_PLAYER[sports] || 0;
  const teamNames = userTeams.map((userTeam) => userTeam.teamName);
  const [teamMembers, setTeamMembers] = useState<CheckboxOptions>({});

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
      setCity(targetInput);
      setRegion('');
      setGround('');
      return;
    }
    if (category === 'region') {
      setRegion(targetInput);
      setGround('');
      return;
    }
    if (category === 'ground') {
      setGround(targetInput);
      return;
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

  const submitDate = () => {
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
      return {};
    }
    if (startDate > endDate) {
      window.alert('종료일자가 시작일자보다 빠를 수 없습니다');
      return {};
    }
    if (startTime > endTime) {
      window.alert('시작시간이 종료시간보다 빠를 수 없습니다');
      return {};
    }

    return dateResult;
  };

  const handleSubmitMatchInfo = () => {
    if (team === '' || team === placeholder) {
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
    }

    const inputs: StringKey = {
      sports,
      ageGroup,
      city,
      region,
      ground,
      cost,
      detail,
    };

    const inputsKeys = Object.keys(inputs);

    const badValues = [placeholder, '행정구역', '시/군/구', '구장', ''];
    console.log(inputs);
    for (let i = 0; i < inputsKeys.length; i += 1) {
      if (badValues.includes(inputs[inputsKeys[i]] as string) && inputsKeys[i] !== 'detail') {
        window.alert(`${INPUT_DICITIONARY[inputsKeys[i]]}을(를) 입력해주세요`);
        return;
      }
    }

    const requestData = {
      ...matchDate,
      registerTeamId: selectedTeamWithUsers.teamId,
      sports,
      ageGroup,
      city,
      region,
      ground,
      cost,
      detail,
      players: selectedTeamWithUsers.players,
    };

    if (Number.isNaN(cost)) {
      window.alert('참가비는 숫자만 입력할 수 있습니다');
      return;
    }
    // api 요청 바디
    console.log(requestData);
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

    const newTeamUsers = setSelectedTeamUsers();
    setTeamMembers({ ...newTeamUsers });
  }, [setTeamMembers, setSelectedTeamUsers, setFormattedDate]);

  return (
    <div className={classNames(newMatchContainer)}>
      <Input
        inputId="inputSports"
        labelName="종목"
        type="dropbox"
        options={[placeholder, ...SPORTS]}
        onChange={(e) => handleInput(e, 'sports')}
      />
      <Input
        inputId="inputTeam"
        labelName="팀"
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
        labelName="연령대"
        type="dropbox"
        options={[placeholder, ...AGE_GROUP]}
        onChange={(e) => handleInput(e, 'ageGroup')}
      />
      <div className={classNames(inputLocationBox)}>
        <h3>위치</h3>
        <div>
          <Input
            inputId="inputCity"
            type="dropbox"
            options={cityOptions}
            onChange={(e) => handleInput(e, 'city')}
            styleProps={{ inputContentHeight: 'fit-content' }}
          />
          <Input
            inputId="inputRegion"
            type="dropbox"
            options={regionOptions}
            onChange={(e) => handleInput(e, 'region')}
            styleProps={{ inputContentHeight: 'fit-content' }}
          />
          <Input
            inputId="inputGround"
            type="dropbox"
            options={groundOptions}
            onChange={(e) => handleInput(e, 'ground')}
            styleProps={{ inputContentHeight: 'fit-content' }}
          />
        </div>
      </div>
      <div className={classNames(inputDateBox)}>
        <h3>날짜</h3>
        <div>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              value={nowDate}
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
