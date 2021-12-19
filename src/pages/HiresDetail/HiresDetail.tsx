import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useHistory, useParams } from 'react-router-dom';

// import style from './hiresDetail.module.scss';
import { getHiresDetail, deleteHiresPosting } from '@/api/hires';
import { InputDetail } from '@/components';
import { hireItemType } from '../HiresEdit/HiresEdit';
import styles from '@/components/Match/MatchPostCard/MatchPostCard.module.scss';
import style from '@/components/Match/MatchInfo/MatchInfo.module.scss';
import hiresDetailStyle from '@/pages/HiresDetail/hiresDetail.module.scss';

const { buttonWrapper, infoCard, removePostButton, editPostButton, buttonConent, checkButton } =
  hiresDetailStyle;

const { matchInfo } = style;

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

  const { postInfos, postTags } = styles;

  return (
    <>
      {hireItem && (
        <>
          <div className={classNames(buttonConent)}>
            <div className={classNames(buttonWrapper)}>
              <button
                type="button"
                onClick={handleClickRemove}
                className={classNames(removePostButton)}
              >
                <i className="fas fa-times" />
              </button>
              <button
                type="button"
                onClick={handleClickEdit}
                className={classNames(editPostButton)}
              >
                <i className="fas fa-pen" />
              </button>
            </div>
          </div>
          <article className={classNames(infoCard)}>
            <section>
              <div>
                <div className={classNames(matchInfo)}>
                  <div>{`${hireItem.date} ${hireItem.startTime}`}</div>
                  <div>{`${hireItem.hirePlayerNumber}명`}</div>
                </div>
                <div>{`${hireItem.city} ${hireItem.region} ${hireItem.groundName}`}</div>
              </div>
            </section>
            <section className={classNames(postInfos)}>
              <div className={classNames(postTags)}>
                <span>{hireItem.position}</span>
                <span>{`${hireItem.ageGroup?.slice(0, hireItem.ageGroup.length - 1)}대`}</span>
                <span>{`${hireItem.teamMannerTemperature}도`}</span>
              </div>
            </section>
          </article>
          <div className={classNames(infoCard)}>
            <h3>팀 정보</h3>
            <article>
              <article>
                <img src={hireItem.teamLogo} alt="team logo" />
                <div>
                  <div>{hireItem.teamName}</div>
                  <section>
                    <span>{hireItem.teamManagerName}</span>
                    <button type="button">채팅</button>
                  </section>
                </div>
              </article>
            </article>
          </div>
          <InputDetail
            labelName="상세정보"
            placeholder={hireItem.detail}
            onChange={handleChangeDetail}
          />
        </>
      )}
      <div className={classNames(checkButton)}>
        <button type="button">신청 용병 확인</button>
      </div>
    </>
  );
};

export default HiresDetail;
