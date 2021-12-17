import React from 'react';

import { SPORTS_CATEGORY, AGE_GROUP, CITY, REGION, GROUND_NAME } from '@/consts';

const HiresFilter = () => {
  return (
    <>
      <div>
        <section>
          <div>종목</div>
          <select id="hiresSport">
            <option>{SPORTS_CATEGORY[0]?.name}</option>
            {SPORTS_CATEGORY.map((category) => (
              <option id="hiresCategory" key={`hires-${category.id}`}>
                {category.name}
              </option>
            ))}
          </select>
        </section>
      </div>
      <div>
        <div>연령대</div>
        <select id="hiresAgeGroup">
          <option>{`${AGE_GROUP[0]}`}</option>
          {AGE_GROUP.map((group) => (
            <option id={`${group}s`} key={`hires-${group}`}>
              {group}
            </option>
          ))}
        </select>
      </div>
      <div>
        <section>
          <div>장소</div>
          <div>
            <select id="place">
              <option>행정구역</option>
              {CITY.map((city) => (
                <option id={`${city}`} key={`hires-${city}`}>
                  {city}
                </option>
              ))}
            </select>
            <select id="region">
              <option>시/군/구</option>
              {REGION.map((region) => (
                <option id={`${region}`} key={`hires-${region}`}>
                  {region}
                </option>
              ))}
            </select>
          </div>
          <select id="region">
            <option>구장</option>
            {GROUND_NAME.map((ground) => (
              <option id={`${ground}`} key={`hires-${ground}`}>
                {ground}
              </option>
            ))}
          </select>
        </section>
      </div>

      <div>
        <section>
          <div>날짜</div>
          <select id="region">
            <option>연 / 월 / 일</option>
            {GROUND_NAME.map((ground) => (
              <option id={`${ground}`} key={`hires-${ground}`}>
                {ground}
              </option>
            ))}
          </select>
        </section>
      </div>
      <button type="button">선택 완료</button>
    </>
  );
};

export default HiresFilter;
