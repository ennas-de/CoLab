import { atom } from "recoil";

const localStorageEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue) => {
      // if (newValue instanceof DefaultValue) {
      //     localStorage.removeItem(key);
      // } else {
      localStorage.setItem(key, JSON.stringify(newValue));
      // }
    });
  };

export const language = atom({
  key: "language",
  default: "javaScript",
  effects_UNSTABLE: [localStorageEffect("langauge")],
});

export const cmtheme = atom({
  key: "cmtheme",
  default: "monokai",
  effects_UNSTABLE: [localStorageEffect("cmtheme")],
});
