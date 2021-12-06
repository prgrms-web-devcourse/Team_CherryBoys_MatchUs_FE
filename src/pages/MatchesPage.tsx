import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllMatch } from '@/store/posts';
import Posts from '@/components/Posts';

const MatchesPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllMatch());
  }, [dispatch]);

  return <Posts isMatch />;
};

export default MatchesPage;
