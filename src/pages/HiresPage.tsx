import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllPost } from '@/store/posts';
import Posts from '@/components/Posts';

// Todo(홍중) : 임시 데이터, 팀 정보 관리하는곳에서 가져오기(12/13)
const selectedTeam = { teamId: 3, grade: 'GENERAL' };

const HiresPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPost());
  }, [dispatch]);

  return <Posts isMatch={false} selectedTeam={selectedTeam} />;
};

export default HiresPage;
