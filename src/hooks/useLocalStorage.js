import { useState, useEffect } from 'react';

export function useLocalStorage(nameKey, defaultName) {
  const [nameImage, setNameImage] = useState(() => {
    try {
      const savedQuery = JSON.parse(window.localStorage.getItem(nameKey));
      return savedQuery ?? defaultName;
    } catch ({ message }) {
      console.error('Set state error: ', message);
      return defaultName;
    }
  });
  useEffect(() => {
    try {
      window.localStorage.setItem(nameKey, JSON.stringify(nameImage));
    } catch ({ message }) {
      console.error('Set state error: ', message);
    }
  }, [nameImage, nameKey]);

  return [nameImage, setNameImage];
}
