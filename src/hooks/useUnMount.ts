/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';

const useUnMount = (fn: () => void) => {
  return useEffect(() => {
    return fn();
  }, []);
};

export default useUnMount;
