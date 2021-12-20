/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState, useCallback, useRef } from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TimePicker from '@mui/lab/TimePicker';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { Input, InputCheckBox, CustomModalDialog } from '@/components';
import { fetchAuthorizedTeams, fetchTotalMembers, createMatch, fetchLocation } from '@/api';
import style from './NewMatch.module.scss';
import { RootState } from '@/store';
import { match } from '@/store/match/match';
import { SPORTS, SPORTS_PLAYER, AGE_GROUP } from '@/consts';
import { TeamSimple, TeamMemberInfo, Locations, MatchPostNew } from '@/types';
import { getItemFromStorage } from '@/utils/storage';

const {
  newMatchContainer,
  inputLocationBox,
  inputDateBox,
  matchDetailInputBox,
  inputName,
  inputContent,
  inputText,
  inputTextContent,
  buttonBox,
  submitButton,
  modalMainTitle,
} = style;

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
  const [newMatchId, setNewMatchId] = useState(0);
  const [requestData, setRequestData] = useState<MatchPostNew>({
    date: '',
    startTime: '',
    endTime: '',
    registerTeamId: 0,
    sports: '',
    ageGroup: '',
    city: 0,
    region: 0,
    ground: 0,
    cost: 0,
    detail: '',
    players: [],
  });
  const [isModal1Open, setIsModal1Open] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [isModal3Open, setIsModal3Open] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    '예상치 못한 에러가 발생했습니다! 다시 시도해주세요'
  );
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
  const detailRef = useRef<HTMLDivElement>(null);
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
      const { teamSimpleInfos } = await fetchAuthorizedTeams();
      setUserTeams(teamSimpleInfos);
      dispatch(match.actions.setUserTeams({ userTeams: teamSimpleInfos }));
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
      const { members } = await fetchTotalMembers(selectedTeamId);
      setTeamMembersInfo(members);

      const teamUsersOptions: CheckboxOptions = {};
      members.forEach((user: TeamMemberInfo) => {
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
      let targetInputNumber: number = parseInt((e.target as HTMLInputElement).value, 10);
      if (Number.isNaN(targetInputNumber)) {
        targetInputNumber = 0;
      }
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

  const handleValidation = async () => {
    setDetail(detailRef.current ? detailRef.current.innerHTML : '');

    if (sports === placeholder) {
      setErrorMessage('종목을 선택해주세요');
      setIsModal3Open(true);
      return;
    }
    if (team === placeholder) {
      setErrorMessage('올바른 팀을 선택해주세요');
      setIsModal3Open(true);
      return;
    }

    const selectedTeamWithUsers = {
      teamId: userTeams.filter((userTeam) => userTeam.teamName === team)[0].teamId,
      players: teamMembersInfo
        .filter((user) => user.userName && teamMembers[user.userName])
        .map((user) => user.userId),
    };

    if (selectedTeamWithUsers.players.length < userLimit) {
      setErrorMessage('인원미달');
      setIsModal3Open(true);
      return;
    }

    if (ageGroup === placeholder) {
      setErrorMessage('연령대를 선택해주세요');
      setIsModal3Open(true);
      return;
    }
    if (city.cityId === 0) {
      setErrorMessage('행정구역을 선택해주세요');
      setIsModal3Open(true);
      return;
    }
    if (region.regionId === 0) {
      setErrorMessage('시/군/구를 선택해주세요');
      setIsModal3Open(true);
      return;
    }
    if (ground.groundId === 0) {
      setErrorMessage('구장을 선택해주세요');
      setIsModal3Open(true);
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

    if (dateResult.date <= todayString) {
      setErrorMessage('경기 날짜는 오늘 이후부터 선택할 수 있습니다');
      setIsModal3Open(true);
      return;
    }
    if (startDate > endDate) {
      setErrorMessage('종료일자가 시작일자보다 빠를 수 없습니다');
      setIsModal3Open(true);
      return;
    }
    if (startTime > endTime) {
      setErrorMessage('시작시간이 종료시간보다 빠를 수 없습니다');
      setIsModal3Open(true);
      return;
    }

    if (Number.isNaN(cost)) {
      setErrorMessage('참가비는 숫자만 입력할 수 있습니다');
      setIsModal3Open(true);
      return;
    }

    if (cost <= 10) {
      setErrorMessage('참가비는 10원 이하로 책정될 수 없습니다');
      setIsModal3Open(true);
      return;
    }

    setRequestData({
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
      detail: detailRef.current?.innerHTML || '',
      players: selectedTeamWithUsers.players,
    });

    setIsModal1Open(true);
  };

  const handleSubmit = async () => {
    const cretedMatchId = await createMatch(requestData);
    if (cretedMatchId) {
      setNewMatchId(cretedMatchId.matchId);
      setIsModal2Open(true);
    } else {
      setErrorMessage(
        '매칭 등록에 실패했습니다. 일시적인 네트워크 오류일 수 있으니, 다시 한 번 시도해주세요.'
      );
      setIsModal3Open(true);
    }
  };

  useEffect(() => {
    const today = new Date();
    const defaultStartDate = new Date(today.setDate(today.getDate() + 1));
    const defaultStartTime = new Date(new Date().getTime() + 120 * 60000);
    const defaultEndTime = new Date(new Date().getTime() + 240 * 60000);

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
      <div className={classNames(matchDetailInputBox)}>
        <div className={classNames(inputName)}>
          <h3>상세 정보</h3>
        </div>
        <div className={classNames(inputContent)}>
          <div className={classNames(inputText)}>
            <div
              contentEditable
              dangerouslySetInnerHTML={{ __html: detail || '' }}
              ref={detailRef}
              className={classNames(inputTextContent)}
            />
          </div>
        </div>
      </div>
      <div className={classNames(buttonBox)}>
        <button className={classNames(submitButton)} type="button" onClick={handleValidation}>
          매칭 등록
        </button>
      </div>
      {isModal1Open && (
        <CustomModalDialog
          modalType="confirm"
          buttonLabel="확인"
          handleCancel={() => setIsModal1Open(false)}
          handleApprove={() => {
            setIsModal1Open(false);
            handleSubmit();
          }}
        >
          <span className={classNames('whiteSpace', modalMainTitle)}>매칭을 등록하시겠습니까?</span>
        </CustomModalDialog>
      )}
      {isModal2Open && (
        <CustomModalDialog
          buttonLabel="확인"
          handleCancel={() => {
            setIsModal2Open(false);
            window.location.replace(`/matches/post/${newMatchId}`);
          }}
          handleApprove={() => {
            setIsModal2Open(false);
            window.location.replace(`/matches/post/${newMatchId}`);
          }}
        >
          <span className={classNames('whiteSpace', modalMainTitle)}>
            성공적으로 매칭을 등록했습니다!
          </span>
        </CustomModalDialog>
      )}
      {isModal3Open && (
        <CustomModalDialog
          buttonLabel="확인"
          handleCancel={() => setIsModal3Open(false)}
          handleApprove={() => {
            setIsModal3Open(false);
          }}
        >
          <span className={classNames('whiteSpace', modalMainTitle)}>{errorMessage}</span>
        </CustomModalDialog>
      )}
    </div>
  );
};

export default NewMatch;
