/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState, useCallback, useRef } from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TimePicker from '@mui/lab/TimePicker';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { useHistory, useParams } from 'react-router-dom';
import { Input, CustomModalDialog } from '@/components';
import { RootState } from '@/store';
import { match } from '@/store/match/match';
import { fetchMatchById, modifyMatch, fetchLocation } from '@/api';
import style from './EditMatch.module.scss';
import { SPORTS, AGE_GROUP } from '@/consts';
import { Match as MatchType, Locations, MatchPostEdit } from '@/types';

const {
  editMatchContainer,
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

const toTimeString = (date: Date) =>
  date.toLocaleTimeString('fr-BE', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

const EditMatch = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [requestData, setRequestData] = useState<MatchPostEdit>({
    matchId: 0,
    date: '',
    startTime: '',
    endTime: '',
    sports: '',
    ageGroup: '',
    city: 0,
    region: 0,
    ground: 0,
    cost: 0,
    detail: '',
  });
  const [isModal1Open, setIsModal1Open] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [isModal3Open, setIsModal3Open] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    'μμμΉ λͺ»ν μλ¬κ° λ°μνμ΅λλ€! λ€μ μλν΄μ£ΌμΈμ'
  );

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
    const teamSimpleInfo = await fetchMatchById(matchId);
    setPrevMatchInfo(teamSimpleInfo);
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

  const placeholder = 'μ ν';
  const [sports, setSports] = useState(placeholder);
  const [ageGroup, setAgeGroup] = useState(placeholder);
  const [city, setCity] = useState(defaultCity);
  const [region, setRegion] = useState(defaultRegion);
  const [ground, setGround] = useState(defaultGround);
  const [cost, setCost] = useState(0);
  const [detail, setDetail] = useState(placeholder);
  const detailRef = useRef<HTMLDivElement>(null);
  const cityOptions = [
    'νμ κ΅¬μ­',
    ...locationInfo.cities.reduce((acc: string[], cityInfo) => {
      if (cityInfo.cityName) acc.push(cityInfo.cityName || '');
      return acc;
    }, []),
  ];
  const regionOptions = [
    'μ/κ΅°/κ΅¬',
    ...locationInfo.regions.reduce((acc: string[], regionInfo) => {
      if (regionInfo.cityId === city.cityId) acc.push(regionInfo.regionName || '');
      return acc;
    }, []),
  ];
  const groundOptions = [
    'κ΅¬μ₯',
    ...locationInfo.grounds.reduce((acc: string[], groundInfo) => {
      if (groundInfo.regionId === region.regionId) acc.push(groundInfo.groundName || '');
      return acc;
    }, []),
  ];

  const setInitialValue = useCallback(() => {
    if (prevMatchInfo) {
      setSports(prevMatchInfo.sportName || placeholder);
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
      let targetInputNumber: number = parseInt((e.target as HTMLInputElement).value, 10);
      if (Number.isNaN(targetInputNumber)) {
        targetInputNumber = 0;
      }
      setCost(targetInputNumber);
    }
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

  const checkValidation = async () => {
    setDetail(detailRef.current ? detailRef.current.innerHTML : '');

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
    const todayString = today.toLocaleDateString('fr-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    if (sports === 'μ ν') {
      setErrorMessage('μ’λͺ©μ μ νν΄μ£ΌμΈμ');
      setIsModal3Open(true);
      return;
    }
    if (ageGroup === placeholder) {
      setErrorMessage('μ°λ Ήλλ₯Ό μ νν΄μ£ΌμΈμ');
      setIsModal3Open(true);
      return;
    }
    if (city.cityId === 0) {
      setErrorMessage('νμ κ΅¬μ­μ μ νν΄μ£ΌμΈμ');
      setIsModal3Open(true);
      return;
    }
    if (region.regionId === 0) {
      setErrorMessage('μ/κ΅°/κ΅¬λ₯Ό μ νν΄μ£ΌμΈμ');
      setIsModal3Open(true);
      return;
    }
    if (ground.groundId === 0) {
      setErrorMessage('κ΅¬μ₯μ μ νν΄μ£ΌμΈμ');
      setIsModal3Open(true);
      return;
    }
    if (dateResult.date <= todayString) {
      setErrorMessage('κ²½κΈ° λ μ§λ μ€λ μ΄νλΆν° μ νν  μ μμ΅λλ€');
      setIsModal3Open(true);
      return;
    }
    if (toTimeString(startTime) > toTimeString(endTime)) {
      setErrorMessage('μμμκ°μ΄ μ’λ£μκ°λ³΄λ€ λΉ λ₯Ό μ μμ΅λλ€');
      setIsModal3Open(true);
      return;
    }
    if (Number.isNaN(cost)) {
      setErrorMessage('μ°Έκ°λΉλ μ«μλ§ μλ ₯ν  μ μμ΅λλ€');
      setIsModal3Open(true);
      return;
    }

    setRequestData({
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
      detail: detailRef.current?.innerHTML || '',
    });

    setIsModal1Open(true);
  };

  const handleSubmit = async () => {
    const result = await modifyMatch(requestData);
    if (result) {
      setIsModal2Open(true);
    } else {
      setErrorMessage(
        'λ§€μΉ­ μμ μ μ€ν¨νμ΅λλ€. μΌμμ μΈ λ€νΈμν¬ μ€λ₯μΌ μ μμΌλ, λ€μ ν λ² μλν΄μ£ΌμΈμ.'
      );
      setIsModal3Open(true);
    }
  };

  useEffect(() => {
    setInitialValue();
  }, [setInitialValue]);

  return (
    <div className={classNames(editMatchContainer)}>
      <Input
        inputId="inputSports"
        labelName="μ’λͺ©*"
        type="dropbox"
        options={['μ ν', ...SPORTS]}
        onChange={(e) => handleInput(e, 'sports')}
        value={sports}
      />
      <Input
        inputId="inputAgeGroup"
        labelName="μ°λ Ήλ*"
        type="dropbox"
        options={['μ ν', ...AGE_GROUP]}
        onChange={(e) => handleInput(e, 'ageGroup')}
        value={ageGroup}
      />
      <div className={classNames(inputLocationBox)}>
        <h3>μμΉ*</h3>
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
        <h3>λ μ§*</h3>
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
        labelName="μ°Έκ°λΉ"
        type="text"
        value={cost}
        onChange={(e) => handleInput(e, 'cost')}
      />
      <div className={classNames(matchDetailInputBox)}>
        <div className={classNames(inputName)}>
          <h3>μμΈ μ λ³΄</h3>
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
        <button className={classNames(submitButton)} type="button" onClick={checkValidation}>
          λ§€μΉ­ μμ 
        </button>
      </div>
      {isModal1Open && (
        <CustomModalDialog
          modalType="confirm"
          buttonLabel="νμΈ"
          handleCancel={() => setIsModal1Open(false)}
          handleApprove={() => {
            setIsModal1Open(false);
            handleSubmit();
          }}
        >
          <span className={classNames('whiteSpace', modalMainTitle)}>λ§€μΉ­μ μμ νμκ² μ΅λκΉ?</span>
        </CustomModalDialog>
      )}
      {isModal2Open && (
        <CustomModalDialog
          buttonLabel="νμΈ"
          handleCancel={() => {
            setIsModal2Open(false);
            history.push(`/matches/post/${matchId}`);
          }}
          handleApprove={() => {
            setIsModal2Open(false);
            history.push(`/matches/post/${matchId}`);
          }}
        >
          <span className={classNames('whiteSpace', modalMainTitle)}>
            μ±κ³΅μ μΌλ‘ λ§€μΉ­μ μμ νμ΅λλ€!
          </span>
        </CustomModalDialog>
      )}
      {isModal3Open && (
        <CustomModalDialog
          buttonLabel="νμΈ"
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

export default EditMatch;
