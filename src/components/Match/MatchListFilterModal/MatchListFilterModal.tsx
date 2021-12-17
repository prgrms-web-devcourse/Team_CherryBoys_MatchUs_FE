/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import styles from './MatchListFilterModal.module.scss';
import { Input } from '@/components';
import { RootState } from '@/store';
import { match } from '@/store/match/match';
import useMount from '@/hooks/useMount';
import { MatchListFilter } from '@/types';
import { SPORTS, LOCATIONS, AGE_GROUP } from '@/consts';

const {
  modalBackground,
  modalContainer,
  showModal,
  modalName,
  inputLocationBox,
  inputDateBox,
  buttonBox,
  submitButton,
} = styles;

interface ModalState {
  showMatchListFilterModal: boolean;
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

const MatchListFilterModal = ({ showMatchListFilterModal }: ModalState) => {
  const dispatch = useDispatch();
  const { matchListFilter } = useSelector((store: RootState) => store.match.data);

  const placeholder = '선택';
  const [ageGroup, setAgeGroup] = useState(placeholder);
  const [city, setCity] = useState(defaultCity);
  const [region, setRegion] = useState(defaultRegion);
  const [ground, setGround] = useState(defaultGround);
  const [sports, setSports] = useState(placeholder);
  const [date, setDate] = useState({
    date: new Date(),
    isSetted: false,
  });
  const [size, setSize] = useState(10);
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

  const handleCloseModal = (e: React.MouseEvent<HTMLElement>) => {
    if ((e.target as Element).classList.contains('modalBackground')) {
      dispatch(match.actions.toggleModal({ modalName: 'matchListFilter' }));
    }
  };

  const setInitialValue = () => {
    if (matchListFilter) {
      setSports(matchListFilter.sports || placeholder);
      setAgeGroup(matchListFilter.ageGroup || placeholder);

      const prevCity = LOCATIONS.cities.filter(
        (cityInfo) => cityInfo.cityId === matchListFilter.cityId
      )[0];
      setCity(prevCity || defaultCity);
      const prevRegion = LOCATIONS.regions.filter(
        (regionInfo) => regionInfo.regionId === matchListFilter.regionId
      )[0];
      setRegion(prevRegion || defaultRegion);
      const prevGround = LOCATIONS.grounds.filter(
        (groundInfo) => groundInfo.groundId === matchListFilter.groundId
      )[0];
      setGround(prevGround || defaultGround);
      setSize(matchListFilter.size || 10);
      setDate(
        matchListFilter.date
          ? {
              date: new Date(matchListFilter.date),
              isSetted: true,
            }
          : {
              date: new Date(),
              isSetted: false,
            }
      );
    }
  };

  useMount(() => {
    setInitialValue();
  });

  const handleMatchInputs = (e: React.ChangeEvent, category: string) => {
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
  };

  const handleChangeDate = (selectedDate: React.SetStateAction<Date | null>) => {
    const newDate = selectedDate ? new Date(selectedDate.toString()) : new Date();
    setDate({ date: newDate, isSetted: true });
  };

  const handleApplyListFilter = () => {
    const requestBody: MatchListFilter = {
      size,
    };
    if (sports !== placeholder) {
      requestBody.sports = sports;
    }
    if (ageGroup !== placeholder) {
      requestBody.ageGroup = ageGroup;
    }
    if (city.cityId > 0) {
      requestBody.cityId = city.cityId;
    }
    if (region.regionId > 0) {
      requestBody.regionId = region.regionId;
    }
    if (ground.groundId > 0) {
      requestBody.groundId = ground.groundId;
    }
    if (date.isSetted) {
      requestBody.date = date.date.toLocaleDateString('fr-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    }

    dispatch(match.actions.setMatchListFilter({ matchListFilter: requestBody }));
    dispatch(match.actions.toggleModal({ modalName: 'matchListFilter' }));
  };

  return (
    <div
      className={classNames('modalBackground', modalBackground, {
        [showModal]: showMatchListFilterModal,
      })}
      onClick={handleCloseModal}
      role="presentation"
    >
      <div className={classNames(modalContainer)}>
        <div className={classNames(modalName)}>
          <h3>필터 선택</h3>
        </div>
        <Input
          inputId="inputSports"
          labelName="종목"
          type="dropbox"
          options={[placeholder, ...SPORTS]}
          onChange={(e) => handleMatchInputs(e, 'sports')}
          value={sports}
        />
        <Input
          inputId="inputAgeGroup"
          labelName="연령대"
          type="dropbox"
          options={[placeholder, ...AGE_GROUP]}
          onChange={(e) => handleMatchInputs(e, 'ageGroup')}
          value={ageGroup}
        />
        <div className={classNames(inputLocationBox)}>
          <h3>위치</h3>
          <div>
            <Input
              inputId="inputCity"
              type="dropbox"
              options={cityOptions}
              onChange={(e) => handleMatchInputs(e, 'city')}
              styleProps={{ inputContentHeight: 'fit-content' }}
              value={city.cityName}
            />
            <Input
              inputId="inputRegion"
              type="dropbox"
              options={regionOptions}
              onChange={(e) => handleMatchInputs(e, 'region')}
              styleProps={{ inputContentHeight: 'fit-content' }}
              value={region.regionName}
            />
            <Input
              inputId="inputGround"
              type="dropbox"
              options={groundOptions}
              onChange={(e) => handleMatchInputs(e, 'ground')}
              styleProps={{ inputContentHeight: 'fit-content' }}
              value={ground.groundName}
            />
          </div>
        </div>
        <div className={classNames(inputDateBox)}>
          <h3>날짜</h3>
          <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={date.date}
                onChange={handleChangeDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
        </div>
        <div className={classNames(buttonBox)}>
          <button
            className={classNames(submitButton)}
            type="button"
            onClick={handleApplyListFilter}
          >
            적용
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchListFilterModal;
