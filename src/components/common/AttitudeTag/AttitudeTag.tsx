import React from 'react';
import classNames from 'classnames';
import style from './attitudeTag.module.scss';

const { kindTag, badTag, excellentTag } = style;

// TODO: 백엔드 데이터 변경이 되면 삭제할 예정
const TagTypeCollection: Record<string, string> = {
  mannerPlay: 'kind',
  timeKeeper: 'kind',
  talkNicely: 'kind',
  fastResponse: 'kind',
  violent: 'bad',
  slang: 'bad',
  timeLate: 'bad',
  breakMatch: 'bad',
  hydra: 'bad',
  twoHeart: 'excellent',
  fastFoot: 'excellent',
  fastDribble: 'excellent',
  passMaster: 'excellent',
  distanceShoot: 'excellent',
};

const TagMessageCollection: Record<string, string> = {
  mannerPlay: '매너 좋은',
  timeKeeper: '시간을 잘 지키는',
  talkNicely: '친절한',
  fastResponse: '응답이 빠른',
  violent: '폭력적인',
  slang: '욕을 하는',
  timeLate: '약속에 늦는',
  breakMatch: '경기에 불참하는',
  hydra: '침을 뱉는.',
  twoHeart: '두 개의 심장',
  fastFoot: '발이 빠른',
  excellentDribble: '드리블이 엄청나요',
  passMaster: '패스가 정확해요',
  distanceShoot: '장거리 슟을 잘해요',
};

// TODO: 백엔드 데이터 변경 후, 타입에 맞춰서 버튼 또는 div로 변경되도록 수정
const AttitueTag = ({ tagType }: { tagType: string }) => {
  return (
    <div
      className={classNames(kindTag, {
        [badTag]: TagTypeCollection[tagType] === 'bad',
        [excellentTag]: TagTypeCollection[tagType] === 'excellent',
      })}
    >
      {TagMessageCollection[tagType]}
    </div>
  );
};

export default AttitueTag;
