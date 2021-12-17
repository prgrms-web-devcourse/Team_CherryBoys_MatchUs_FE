import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import style from './teamChoice.module.scss';

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
  mannerLow,
  mannerMiddle,
  mannerHigh,
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

  return (
    <div className={classNames(cardContainer)}>
      <div className={classNames(cardLogo)}>
        <Link to={`/team/${teamId}`}>
          <img src={teamLogo} alt="팀 로고" />
        </Link>
      </div>
      <div className={classNames(teamSubInfoContainer)}>
        <p className={classNames(teamBaseInfo)}>
          <span className={classNames(teamNameSpan)}>{teamName}</span>
          <span>팀 생성일자: {teamCreatedTime[0]}</span>
        </p>
        <div className={classNames(ContainerAboutTeamManner)}>
          <article>
            {tagNames.map((tag) => {
              return <span key={`tagName-${tag}`}>{tag}</span>;
            })}
          </article>
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
