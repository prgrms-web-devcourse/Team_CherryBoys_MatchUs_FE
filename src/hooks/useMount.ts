/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';

export default (fn: () => void) => {
  return useEffect(() => {
    fn();
  }, []);
};
