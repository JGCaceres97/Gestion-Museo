// @ts-check
import { useState } from 'react';

/**
 * Custom hook para guardar datos en el Local Storage.
 * @param {string} key Clave que identifica el valor almacenado.
 * @param {any} initialValue Valor inicial que tendrá el registro en caso de no existir.
 */
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (e) {
      return initialValue;
    }
  });

  /**
   * Método para guardar el valor en el Local Storage.
   * @param {any} value Valor a ser almacenado.
   */
  const setValue = value => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(e);
    }
  }

  return [storedValue, setValue];
}

export default useLocalStorage;
