import { useEffect } from 'react';
import { useAppDispatch } from '@/store';
import { reAuth } from '@/store/userSlice';
import { getItemFromStorage } from '@/utils/storage';

const useReAuth = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const accessToken = getItemFromStorage('accessToken');

    if (!accessToken) {
      return;
    }

    dispatch(reAuth());
  }, [dispatch]);
};

export default useReAuth;
