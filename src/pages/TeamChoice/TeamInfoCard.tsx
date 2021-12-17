import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import style from './teamChoice.module.scss';

export interface TeamCardInfo {
  mannerTemperature: number;

  tagNames: string[];
  teamCreatedAt: string;
  teamId: number;
  teamName: string;
}

const { cardContainer } = style;

const TeamInfoCard = ({
  teamId,
  teamName,
  teamCreatedAt,
  tagNames,
  mannerTemperature,
}: TeamCardInfo) => {
  return (
    <div className={classNames(cardContainer)}>
      <div key={`teamCard-${teamId}`}>
        {/* TODO: API를 통해 로고가 넘어오면, 채울 예정 */}
        <div>
          <Link to={`/team/${teamId}`}>{/* <img src={} /> */}</Link>
        </div>
      </div>
      <div>
        <p>
          <span>{teamName}</span>
          <span>{teamCreatedAt}</span>
        </p>
        <div>
          <article>
            {tagNames.map((tag) => {
              return <span>{tag}</span>;
            })}
          </article>
          <div>{mannerTemperature}</div>
        </div>
      </div>
    </div>
  );
};

export default TeamInfoCard;
