import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllMatch } from '@/store/posts/posts';
import { Posts } from '@/components';

const MatchesPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllMatch());
  }, [dispatch]);

  return <Posts isMatch />;
};

export default MatchesPage;
