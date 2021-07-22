/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

export const useEffectOnce = (func, dep) => useEffect(func, dep);
