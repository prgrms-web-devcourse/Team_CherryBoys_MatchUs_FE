import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllPost } from '@/store/posts';
import Posts from '@/components/Posts';

const HiresPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPost());
  }, [dispatch]);

  return <Posts isMatch={false} />;
};

export default HiresPage;
