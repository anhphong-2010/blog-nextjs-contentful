import React from "react";

const useLocalStorage = (key, defVal) => {
  const [value, $value] = React.useState(() => {
    let itemVal = defVal;
    try {
      const str = localStorage.getItem(key);
      const parsed = JSON.parse(str);
      itemVal = parsed === null ? defVal : parsed;
      itemVal = itemVal instanceof Function ? itemVal() : itemVal;
    } catch (err) {
      console.log({ "@useLocalStorage:": err });
    }
    return itemVal;
  });
  const setValue = (newVal) => {
    try {
      localStorage.setItem(key, JSON.stringify(newVal));
      $value(newVal);
    } catch (err) {
      console.log({ "@useLocalStorage:": err });
    }
  };
  return [value, setValue];
};
export default useLocalStorage;
