import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MatchList } from '@/components/Match';
import { fetchAllMatch } from '@/store/match';

const Matches = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllMatch());
  }, [dispatch]);

  return (
    <div>
      <h1>Matches</h1>
      <MatchList />
    </div>
  );
};

export default Matches;
