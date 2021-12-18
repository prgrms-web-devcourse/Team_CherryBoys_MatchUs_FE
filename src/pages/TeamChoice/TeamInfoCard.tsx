import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import style from './teamChoice.module.scss';
import { AttitueTag } from '@/components';
import baseTeamLogo from '@/assets/images/baseTeamLogo.png';

export interface TeamCardInfo {
  mannerTemperature: number;
  teamLogo: string;
  tagNames: string[];
  teamCreatedAt: string;
  teamId: number;
  teamName: string;
}

const {
  cardContainer,
  cardLogo,
  teamSubInfoContainer,
  teamBaseInfo,
  teamNameSpan,
  ContainerAboutTeamManner,
  tagContainer,
  mannerLow,
  mannerMiddle,
  mannerHigh,
  teamLogoImage,
} = style;

const TeamInfoCard = ({
  teamId,
  teamLogo,
  teamName,
  teamCreatedAt,
  tagNames,
  mannerTemperature,
}: TeamCardInfo) => {
  const teamCreatedTime = teamCreatedAt.split('T');
  const yearMonthDay = teamCreatedTime[0].split('-');
  // TODO: 예시 코드 삭제 예정
  const taggNames = ['timeKeeper', 'violent', 'fastFoot'];
  return (
    <div className={classNames(cardContainer)}>
      <div className={classNames(cardLogo)}>
        <Link to={`/team/${teamId}`}>
          <img
            className={classNames(teamLogoImage)}
            src={teamLogo === '' || teamLogo === '팀로고' ? baseTeamLogo : teamLogo}
            alt="팀 로고"
          />
        </Link>
      </div>
      <div className={classNames(teamSubInfoContainer)}>
        <p className={classNames(teamBaseInfo)}>
          <span className={classNames(teamNameSpan)}>{teamName}</span>
          <span>
            팀 생성일자: {yearMonthDay[0]}년 {yearMonthDay[1]}월 {yearMonthDay[2]}일
          </span>
        </p>
        <div className={classNames(ContainerAboutTeamManner)}>
          <div className={tagContainer}>
            {taggNames.map((tag) => {
              return <AttitueTag tagType={tag} />;
            })}
          </div>
          <span
            className={classNames(mannerMiddle, {
              [mannerLow]: mannerTemperature < 20,
              [mannerHigh]: mannerTemperature > 40,
            })}
          >
            {mannerTemperature}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TeamInfoCard;
