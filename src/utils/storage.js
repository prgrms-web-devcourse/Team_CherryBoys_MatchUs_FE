const STORAGE = window.localStorage;

const getItemFromStorage = (key) => {
  return JSON.parse(STORAGE.getItem(key));
};

const setItemFromStorage = (key, item) => {
  STORAGE.setItem(key, JSON.stringify(item));
};

const removeItemFromStorage = (key) => {
  STORAGE.removeItem(key);
};

export { getItemFromStorage, setItemFromStorage, removeItemFromStorage };
