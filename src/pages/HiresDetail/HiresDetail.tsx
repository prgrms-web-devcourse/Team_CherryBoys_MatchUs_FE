import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useHistory, useParams } from 'react-router-dom';

import style from './hiresDetail.module.scss';
import { getHiresDetail, deleteHiresPosting } from '@/api/hires';
import { InputDetail } from '@/components';
import { hireItemType } from '@/types';

const {
  hires_container,
  card__gameInfos,
  card__teamInfos,
  card__teamInfos__logo,
  card__teamInfos__content,
  card__teamInfos__leader,
  card__gameInfos__tags,
  card__gameInfos__gameSchedule,
  card__gameInfos__location,
  card__detailInfos,
  card__detailInfos__tab,
  card__detailInfos__content,
  matchDetailContent,
  buttonBox,
  hires_buttonBox,
} = style;

const HiresDetail = () => {
  const history = useHistory();
  const [hireItem, setHireItem] = useState<hireItemType>();

  const { postId } = useParams<{ postId: string }>();
  const currentPostId = parseInt(postId, 10);

  useEffect(() => {
    const getHiresDetailInfo = async () => {
      const res = await getHiresDetail(currentPostId);
      setHireItem(res);
    };

    getHiresDetailInfo();
  }, [currentPostId]);

  const handleClickRemove = async () => {
    const res = await deleteHiresPosting(currentPostId);
  };

  // Todo(홍중) : 팀원이 onChange함수를 필수로 하는것이 이해되는데 input말고 다른 형태로 세부설명을 다시 구현할지 고민하기(2021-12-19)
  const handleChangeDetail = (input: React.SetStateAction<string>) => {};

  const handleClickEdit = () => {
    history.push({
      pathname: `/hires/edit/${postId}`,
      state: { hireItem },
    });
  };

  return (
    <div className={classNames(hires_container)}>
      {hireItem && (
        <>
          <article className={classNames(card__gameInfos)}>
            <section className={classNames(card__gameInfos__gameSchedule)}>
              <div>{`${hireItem.date} ${hireItem.startTime}`}</div>
              <div>{`${hireItem.hirePlayerNumber}명`}</div>
            </section>
            <section className={classNames(card__gameInfos__location)}>
              <div>{`${hireItem.city} ${hireItem.region} ${hireItem.groundName}`}</div>
            </section>
            <section className={classNames(card__gameInfos__tags)}>
              <div>{hireItem.position}</div>
              <div>{hireItem.ageGroup}</div>
              <div>{`${hireItem.teamMannerTemperature}도`}</div>
            </section>
          </article>
          <article className={classNames(card__teamInfos)}>
            <section className={classNames(card__teamInfos__logo)}>
              <img src={hireItem.teamLogo} alt="team logo" />
            </section>
            <section className={classNames(card__teamInfos__content)}>
              <div>{hireItem.teamName}</div>
            </section>
            <section className={classNames(card__teamInfos__leader)}>
              <span>{hireItem.teamCaptainName}</span>
              <button type="button">
                <i className="fas fa-user" />
              </button>
            </section>
          </article>
          <article className={classNames(card__detailInfos)}>
            <section className={classNames(card__detailInfos__tab)}>
              <h3>상세 정보</h3>
              <div className={classNames(buttonBox)}>
                <button type="button" onClick={handleClickEdit}>
                  <i className="fas fa-pen" />
                </button>
                <button type="button" onClick={handleClickRemove}>
                  <i className="fas fa-times" />
                </button>
              </div>
            </section>
            <section className={classNames(card__detailInfos__content)}>
              <div
                dangerouslySetInnerHTML={{ __html: hireItem.detail || '' }}
                className={classNames(matchDetailContent)}
              />
            </section>
          </article>
          <article className={classNames(hires_buttonBox)}>
            <button type="button">신청 용병 확인</button>
          </article>
        </>
      )}
    </div>
  );
};

export default HiresDetail;
