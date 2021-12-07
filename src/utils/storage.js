const STORAGE = window.localStorage;

const getItemFromStorage = (key, defaultValue) => {
  try {
    return JSON.parse(STORAGE.getItem(key));
  } catch (e) {
    STORAGE.removeItem(key);
    // 에러 처리하기
    return defaultValue;
  }
};

const setItemFromStorage = (key, item) => {
  STORAGE.setItem(key, JSON.stringify(item));
};

const removeItemFromStorage = (key) => {
  STORAGE.removeItem(key);
};

export { getItemFromStorage, setItemFromStorage, removeItemFromStorage };
