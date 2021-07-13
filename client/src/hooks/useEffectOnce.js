/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

export const useEffectOnce = (func) => useEffect(func, []);