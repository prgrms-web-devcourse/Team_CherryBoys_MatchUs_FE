import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllMatch } from '@/store/posts';
import Posts from '@/components/Posts';

// Todo(홍중) : 임시 데이터, 팀 정보 관리하는곳에서 가져오기(12/13)
const selectedTeam = { teamId: 3, grade: 'GENERAL' };

const MatchesPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllMatch());
  }, [dispatch]);

  return <Posts isMatch selectedTeam={selectedTeam} />;
};

export default MatchesPage;
