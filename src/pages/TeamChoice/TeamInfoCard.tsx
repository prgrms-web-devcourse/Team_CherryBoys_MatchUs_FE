import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import style from './teamChoice.module.scss';
import { AttitueTag } from '@/components';
import baseTeamLogo from '@/assets/images/baseTeamLogo.png';
import { TagType } from '@/types/Team/Team';

interface TeamCardInfo {
  mannerTemperature: number;
  teamLogo: string;
  tags: TagType[];
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
  tags,
  mannerTemperature,
}: TeamCardInfo) => {
  const teamCreatedTime = teamCreatedAt.split('T');
  const yearMonthDay = teamCreatedTime[0].split('-');
  const limitedTags = tags.slice(0, 3);

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
        <div className={classNames(teamBaseInfo)}>
          <h3 className={classNames(teamNameSpan)}>{teamName}</h3>
          <div>
            <p>팀 창립일</p>
            <span>
              {yearMonthDay[0]}년 {yearMonthDay[1]}월 {yearMonthDay[2]}일
            </span>
          </div>
        </div>
        <div className={classNames(ContainerAboutTeamManner)}>
          <span
            className={classNames(mannerMiddle, {
              [mannerLow]: mannerTemperature < 20,
              [mannerHigh]: mannerTemperature > 40,
            })}
          >
            {`${mannerTemperature}℃`}
          </span>
        </div>
        <div className={classNames(tagContainer)}>
          {limitedTags.map(({ tagId, tagName, tagType }) => (
            <AttitueTag key={tagId} tagId={tagId} tagName={tagName} tagType={tagType} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamInfoCard;
