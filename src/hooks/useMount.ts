/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';

export default (func: () => void) => {
  return useEffect(() => {
    func();
  }, []);
};
