import React from 'react';

const CITY = ['서울시'];

const REGION = ['금천구', '강서구'];

const GROUND_NAME = ['유제두 체육관', '제1 체육관', '제2 체육관'];

interface Props {
  handleChangeCity: React.ChangeEventHandler<HTMLSelectElement>;
  handleChangeRegion: React.ChangeEventHandler<HTMLSelectElement>;
  handleChangeGroundName: React.ChangeEventHandler<HTMLSelectElement>;
}

const Place = ({ handleChangeCity, handleChangeRegion, handleChangeGroundName }: Props) => {
  return (
    <>
      <div>
        <section>
          <div>장소</div>
          <div>
            <select id="city" onChange={handleChangeCity}>
              <option>행정구역</option>
              {CITY.map((value) => (
                <option id={`${value}`} key={`city-${value}`}>
                  {value}
                </option>
              ))}
            </select>
            <select id="region" onChange={handleChangeRegion}>
              <option>시/군/구</option>
              {REGION.map((value) => (
                <option id={`${value}`} key={`region-${value}`}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <select id="groundName" onChange={handleChangeGroundName}>
            <option>구장</option>
            {GROUND_NAME.map((value) => (
              <option id={`${value}`} key={`groundName-${value}`}>
                {value}
              </option>
            ))}
          </select>
        </section>
      </div>
    </>
  );
};

export default Place;
