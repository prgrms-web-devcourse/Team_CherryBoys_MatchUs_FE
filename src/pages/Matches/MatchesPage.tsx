import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllMatch } from '@/store/match/match';
import { MatchPosts } from '@/components';

const MatchesPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllMatch());
  }, [dispatch]);

  return <MatchPosts />;
};

export default MatchesPage;
