import { atom } from "recoil";

export const authState = atom({
  key: "authState",
  default: {
    isAuth: false,
    token: "",
    userId: 1,
  },
});
