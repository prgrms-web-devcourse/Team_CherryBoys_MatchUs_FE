/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';

const useUnMount = (func: () => void) => {
  return useEffect(() => {
    return func();
  }, []);
};

export default useUnMount;
