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

import classNames from 'classnames';
import { editHiresPosting, createHiresPosting, hiresPosting } from '@/api/hires';
import { fetchAuthorizedTeams, fetchLocation } from '@/api';

import { InputDetail, Input, CustomModalDialog } from '@/components';
import { LocationSelect, AgeGroup, HiresPosition } from '@/components/selects';
import { previousHiresInfo, Locations, TeamSimple } from '@/types';
import { RootState } from '@/store';
import { match } from '@/store/match/match';
import { getItemFromStorage } from '@/utils/storage';
import style from './HiresCreate.module.scss';
import styles from '@/pages/HiresDetail/hiresDetail.module.scss';

const { hiresCreateContainer, inputBox, inputDateBox, buttonBox, submitButton } = style;
const { modalMainTitle } = styles;
const HIRED_NUMBER = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const DETAIL_PLACEHOLDER = '약속 잘지키고 유쾌하신분과 즐겁게 경기하고 싶습니다';

const defaultCity = {
  cityId: 0,
  cityName: '행정구역',
};

const defaultRegion = {
  cityId: 0,
  regionId: 0,
  regionName: '시/군/구',
};

const defaultGround = {
  regionId: 0,
  groundId: 0,
  groundName: '구장',
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
  prevPosition = '윙백',
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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editModalMessage, setEditModalMessage] = useState('수정이 완료되었습니다.');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createModalMessage, setCreateModalMessage] = useState('생성이 완료되었습니다.');
  const teamNames = userTeams.map((userTeam) => userTeam.teamName);
  const [requestData, setRequestData] = useState<hiresPosting>({
    ageGroup: '',
    cityId: 0,
    date: '',
    detail: '',
    endTime: '',
    groundId: 0,
    hirePlayerNumber: 0,
    position: '',
    regionId: 0,
    startTime: '',
    teamId: 0,
  });

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
    const initialMinute = newDate.getMinutes();
    const minute = initialMinute < 10 ? `0${initialMinute}` : initialMinute;
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
    const res = await createHiresPosting(data);
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

    // if (position === '포지션 선택') {
    //   setCreateModalMessage('포지션을 선택해주세요');
    //   setIsCreateModalOpen(true);
    //   return;
    // }
    // Todo(홍중) : am일때 올바름에도 다시 입력 요구하는것 수정하기(2021-12-19)
    if (isStartHourBigger || (!isStartHourBigger && isStartMinuteBigger)) {
      setCreateModalMessage('시간을 다시 입력해주세요');
      setIsCreateModalOpen(true);
      return;
    }

    if (
      city.cityName === '행정구역' ||
      region.regionName === '시/군/구' ||
      ground.groundName === '구장'
    ) {
      setCreateModalMessage('장소를 선택해주세요');
      setIsCreateModalOpen(true);
      return;
    }

    setRequestData(data);
    setIsCreateModalOpen(true);
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
      if (
        city.cityName === '행정구역' ||
        region.regionName === '시/군/구' ||
        ground.groundName === '구장'
      ) {
        // alert('장소를 선택해주세요');
        setEditModalMessage('장소를 선택해주세요');
        setIsEditModalOpen(true);
        return;
      }

      if (team === '선택') {
        // alert('팀을 선택해주세요');
        setEditModalMessage('팀을 선택해주세요');
        setIsEditModalOpen(true);
        return;
      }

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
      // setEditModalMessage('수정이 완료되었습니다.');
      await editHiresPosting({ postId, data });
      // setIsEditModalOpen(true);
      // history.push(`/hires`);
    };

    editHires();
  };

  return (
    <div className={classNames(hiresCreateContainer)}>
      <section className={classNames(inputBox)}>
        <h3>용병 수</h3>
        <div>
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
        </div>
      </section>
      <HiresPosition hiringPosition={position} handleChangePosition={handleChangePosition} />
      <AgeGroup
        ageGroup={parseInt(prevAgeGroup.slice(0, 2), 10)}
        handleChangeAge={handleChangeAge}
      />
      <div className={classNames(inputDateBox)}>
        <h3>날짜</h3>
        <div>
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
        </div>
      </div>
      <LocationSelect
        locationInfo={locationInfo}
        city={city}
        region={region}
        ground={ground}
        handleInput={handleInput}
      />
      <Input
        inputId="inputTeam"
        labelName="팀"
        type="dropbox"
        options={['선택', ...teamNames]}
        onChange={(e) => handleInput(e, 'team')}
      />
      <InputDetail labelName="상세정보" placeholder={detail} onChange={handleChangeDetail} />
      <div className={classNames(buttonBox)}>
        {prevCity === '행정구역' ? (
          <button
            className={classNames(submitButton)}
            type="button"
            onClick={handleClickSelectDone}
          >
            생성
          </button>
        ) : (
          <button
            className={classNames(submitButton)}
            type="button"
            // onClick={handleClickEditPosting}
            onClick={() => setIsEditModalOpen(true)}
          >
            수정
          </button>
        )}
      </div>
      {isCreateModalOpen && (
        <CustomModalDialog
          buttonLabel="확인"
          handleCancel={() => setIsCreateModalOpen(false)}
          handleApprove={() => {
            setCreateModalMessage('생성이 완료되었습니다.');
            setIsCreateModalOpen(true);
            handleClickCreatePosting(requestData);
          }}
        >
          <span className={classNames('whiteSpace', modalMainTitle)}>{createModalMessage}</span>
        </CustomModalDialog>
      )}
      {isEditModalOpen && (
        <CustomModalDialog
          buttonLabel="확인"
          handleCancel={() => setIsEditModalOpen(false)}
          handleApprove={() => {
            setCreateModalMessage('수정이 완료되었습니다.');
            setIsCreateModalOpen(true);
            handleClickEditPosting();
            history.push('/hires');
          }}
        >
          <span className={classNames('whiteSpace', modalMainTitle)}>{editModalMessage}</span>
        </CustomModalDialog>
      )}
    </div>
  );
};

export default HiresCreate;
