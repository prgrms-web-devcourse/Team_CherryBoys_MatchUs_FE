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

const { cardContainer } = style;

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
      <div key={`teamCard-${teamId}`}>
        <div>
          <Link to={`/team/${teamId}`}>
            <img src={teamLogo} alt="팀 로고" />
          </Link>
        </div>
      </div>
      <div>
        <p>
          <span>{teamName}</span>
          <span>{teamCreatedTime[0]}</span>
        </p>
        <div>
          <article>
            {tagNames.map((tag) => {
              return <span key={`tagName-${tag}`}>{tag}</span>;
            })}
          </article>
          <div>{mannerTemperature}</div>
        </div>
      </div>
    </div>
  );
};

export default TeamInfoCard;
