/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Locations } from '@/types';
import { Input } from '..';

interface cityType {
  cityId: number;
  cityName: string;
}

interface groundType {
  regionId: number;
  groundId: number;
  groundName: string;
}

interface regionType {
  cityId: number;
  regionId: number;
  regionName: string;
}

interface locationInfoTypeWrapper {
  locationInfo: Locations;
  city: cityType;
  region: regionType;
  ground: groundType;
  handleInput: (e: React.ChangeEvent, category: string) => void;
}

const LocationSelect = ({
  locationInfo,
  city,
  region,
  ground,
  handleInput,
}: locationInfoTypeWrapper) => {
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

  return (
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
  );
};

export default LocationSelect;
