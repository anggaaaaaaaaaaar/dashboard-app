/* eslint-disable no-empty */
import { useState } from "react";
import { Functions } from "../utils";

export const useLocalStorage = (keyName, defaultValue) => {
  const ttl = 86400000 * 1; // days
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = Functions.getWithExpiry(keyName);
      if (value) {
        return JSON.parse(value);
      } else {
        Functions.setWithExpiry(keyName, JSON.stringify(defaultValue), ttl);
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue = (newValue, ttls) => {
    try {
      Functions.setWithExpiry(keyName, JSON.stringify(newValue), ttls || ttl);
    } catch (err) {}
    setStoredValue(newValue);
  };
  return [storedValue, setValue];
};
